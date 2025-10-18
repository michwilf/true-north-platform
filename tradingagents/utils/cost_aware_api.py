"""
Cost-aware API wrapper for the True North Trading Platform.
Provides rate limiting, cost tracking, and profile-based controls.
"""

import time
import asyncio
from typing import Dict, Any, Optional, Callable
from functools import wraps
from datetime import datetime, timedelta
import threading
from collections import defaultdict, deque

from config.cost_profiles import get_cost_manager, CostProfile


class RateLimiter:
    """Rate limiter for API calls."""

    def __init__(self, requests_per_minute: int, requests_per_day: int):
        self.requests_per_minute = requests_per_minute
        self.requests_per_day = requests_per_day

        # Track requests in the last minute
        self.minute_requests = deque()

        # Track requests in the last day
        self.daily_requests = 0
        self.daily_reset_time = datetime.now() + timedelta(days=1)

        self.lock = threading.Lock()

    def can_make_request(self) -> bool:
        """Check if we can make a request within rate limits."""
        with self.lock:
            now = datetime.now()

            # Reset daily counter if needed
            if now >= self.daily_reset_time:
                self.daily_requests = 0
                self.daily_reset_time = now + timedelta(days=1)

            # Clean old minute requests
            minute_ago = now - timedelta(minutes=1)
            while self.minute_requests and self.minute_requests[0] < minute_ago:
                self.minute_requests.popleft()

            # Check limits
            if len(self.minute_requests) >= self.requests_per_minute:
                return False

            if self.daily_requests >= self.requests_per_day:
                return False

            return True

    def record_request(self):
        """Record a successful request."""
        with self.lock:
            now = datetime.now()
            self.minute_requests.append(now)
            self.daily_requests += 1

    def wait_time(self) -> float:
        """Get time to wait before next request is allowed."""
        with self.lock:
            if self.daily_requests >= self.requests_per_day:
                # Wait until daily reset
                return (self.daily_reset_time - datetime.now()).total_seconds()

            if len(self.minute_requests) >= self.requests_per_minute:
                # Wait until oldest request is > 1 minute old
                oldest_request = self.minute_requests[0]
                wait_until = oldest_request + timedelta(minutes=1)
                return max(0, (wait_until - datetime.now()).total_seconds())

            return 0


class CostAwareAPI:
    """Cost-aware API wrapper with rate limiting and spending controls."""

    def __init__(self, api_name: str):
        self.api_name = api_name
        self.cost_manager = get_cost_manager()

        # Get limits for this API
        limits = self.cost_manager.get_api_limits(api_name)
        self.rate_limiter = RateLimiter(
            limits.requests_per_minute, limits.requests_per_day
        )

        # Cost tracking
        self.total_requests = 0
        self.total_cost = 0.0
        self.last_request_time = None

    def can_make_request(self) -> tuple[bool, str]:
        """Check if we can make a request. Returns (can_make, reason)."""
        # Check cost manager limits
        if not self.cost_manager.can_make_request(self.api_name):
            return False, f"Monthly budget exceeded for {self.api_name}"

        # Check rate limits
        if not self.rate_limiter.can_make_request():
            wait_time = self.rate_limiter.wait_time()
            return False, f"Rate limit exceeded. Wait {wait_time:.1f} seconds"

        return True, "OK"

    def make_request(self, request_func: Callable, *args, **kwargs) -> Any:
        """Make an API request with cost and rate limiting."""
        # Check if we can make the request
        can_make, reason = self.can_make_request()
        if not can_make:
            raise Exception(f"Request blocked: {reason}")

        # Record request timing
        start_time = time.time()

        try:
            # Make the actual request
            result = request_func(*args, **kwargs)

            # Calculate cost (simplified estimation)
            request_time = time.time() - start_time
            estimated_cost = self._estimate_cost(
                request_func.__name__, request_time, result
            )

            # Record successful request
            self.rate_limiter.record_request()
            self.cost_manager.record_request(self.api_name, estimated_cost)

            self.total_requests += 1
            self.total_cost += estimated_cost
            self.last_request_time = datetime.now()

            return result

        except Exception as e:
            # Still count failed requests for rate limiting
            self.rate_limiter.record_request()
            raise e

    def _estimate_cost(
        self, function_name: str, request_time: float, result: Any
    ) -> float:
        """Estimate the cost of an API request."""
        # Base cost estimates by API
        base_costs = {
            "openai": 0.002,  # ~$0.002 per request (gpt-4o-mini)
            "alpha_vantage": 0.0,  # Free tier
            "polygon": 0.001,  # ~$0.001 per request
            "news_api": 0.0,  # Free tier
            "twitter": 0.0,  # Free tier (rate limited)
            "reddit": 0.0,  # Free
        }

        base_cost = base_costs.get(self.api_name, 0.001)

        # Adjust based on response size (rough estimate)
        if hasattr(result, "__len__"):
            size_multiplier = min(len(str(result)) / 1000, 5.0)  # Cap at 5x
            base_cost *= 1 + size_multiplier * 0.1

        # Adjust based on request time (longer = more expensive)
        time_multiplier = min(request_time / 1.0, 3.0)  # Cap at 3x
        base_cost *= 1 + time_multiplier * 0.2

        return base_cost

    def get_stats(self) -> Dict[str, Any]:
        """Get API usage statistics."""
        return {
            "api_name": self.api_name,
            "total_requests": self.total_requests,
            "total_cost": self.total_cost,
            "average_cost": self.total_cost / max(self.total_requests, 1),
            "last_request": (
                self.last_request_time.isoformat() if self.last_request_time else None
            ),
            "rate_limit_status": {
                "requests_per_minute": self.rate_limiter.requests_per_minute,
                "requests_per_day": self.rate_limiter.requests_per_day,
                "current_minute_usage": len(self.rate_limiter.minute_requests),
                "current_daily_usage": self.rate_limiter.daily_requests,
            },
        }


# Global API instances
_api_instances: Dict[str, CostAwareAPI] = {}


def get_cost_aware_api(api_name: str) -> CostAwareAPI:
    """Get or create a cost-aware API instance."""
    if api_name not in _api_instances:
        _api_instances[api_name] = CostAwareAPI(api_name)
    return _api_instances[api_name]


def cost_controlled(api_name: str):
    """Decorator to add cost control to API functions."""

    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            api = get_cost_aware_api(api_name)
            return api.make_request(func, *args, **kwargs)

        return wrapper

    return decorator


class CostAwareOpenAI:
    """Cost-aware wrapper for OpenAI API."""

    def __init__(self, client):
        self.client = client
        self.api = get_cost_aware_api("openai")
        self.cost_manager = get_cost_manager()

    def chat_completions_create(self, **kwargs):
        """Create chat completion with cost control."""
        # Adjust parameters based on cost profile
        if self.cost_manager.current_profile == CostProfile.LEAN:
            # Use cheaper model and reduce tokens
            kwargs["model"] = kwargs.get("model", "gpt-4o-mini")
            kwargs["max_tokens"] = min(kwargs.get("max_tokens", 1000), 1000)
        elif self.cost_manager.current_profile == CostProfile.STANDARD:
            kwargs["model"] = kwargs.get("model", "gpt-4o-mini")
            kwargs["max_tokens"] = min(kwargs.get("max_tokens", 2000), 2000)
        # PRO profile uses full parameters

        def make_request():
            return self.client.chat.completions.create(**kwargs)

        return self.api.make_request(make_request)


class CostAwareAlphaVantage:
    """Cost-aware wrapper for Alpha Vantage API."""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api = get_cost_aware_api("alpha_vantage")

    def get_quote(self, symbol: str):
        """Get stock quote with cost control."""
        import requests

        def make_request():
            url = "https://www.alphavantage.co/query"
            params = {
                "function": "GLOBAL_QUOTE",
                "symbol": symbol,
                "apikey": self.api_key,
            }
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            return response.json()

        return self.api.make_request(make_request)


def get_all_api_stats() -> Dict[str, Any]:
    """Get statistics for all API instances."""
    stats = {}
    for api_name, api_instance in _api_instances.items():
        stats[api_name] = api_instance.get_stats()

    # Add cost manager summary
    stats["cost_summary"] = get_cost_manager().get_spending_summary()

    return stats


def print_cost_summary():
    """Print a formatted cost summary."""
    print("\n💰 Cost Management Summary")
    print("=" * 50)

    cost_manager = get_cost_manager()
    summary = cost_manager.get_spending_summary()

    print(f"📊 Profile: {summary['profile'].upper()}")
    print(f"💰 Monthly Budget: ${summary['monthly_budget']:.2f}")
    print(f"💸 Monthly Spend: ${summary['monthly_spend']:.2f}")
    print(f"📈 Budget Used: {summary['budget_used_percent']:.1f}%")
    print(
        f"🔧 Features: {summary['features_enabled']}/{summary['total_features']} enabled"
    )

    # Check for alerts
    alerts = cost_manager.check_spending_alerts()
    if alerts:
        print(f"\n🚨 Alerts:")
        for alert in alerts:
            print(f"   {alert}")

    # API usage
    if summary["daily_usage"]:
        print(f"\n📊 Today's API Usage:")
        for api, count in summary["daily_usage"].items():
            limits = cost_manager.get_api_limits(api)
            usage_percent = (count / limits.requests_per_day) * 100
            print(f"   {api}: {count}/{limits.requests_per_day} ({usage_percent:.1f}%)")


if __name__ == "__main__":
    # Demo the cost-aware API system
    print("🔧 Cost-Aware API Demo")
    print("=" * 40)

    # Create a demo API
    demo_api = get_cost_aware_api("demo")

    # Simulate some requests
    def dummy_request():
        time.sleep(0.1)  # Simulate API call
        return {"status": "success", "data": "dummy response"}

    print("Making 5 demo requests...")
    for i in range(5):
        try:
            result = demo_api.make_request(dummy_request)
            print(f"✅ Request {i+1}: {result['status']}")
        except Exception as e:
            print(f"❌ Request {i+1}: {e}")

    # Show stats
    stats = demo_api.get_stats()
    print(f"\n📊 Demo API Stats:")
    print(f"   Total Requests: {stats['total_requests']}")
    print(f"   Total Cost: ${stats['total_cost']:.4f}")
    print(f"   Average Cost: ${stats['average_cost']:.4f}")

    # Show cost summary
    print_cost_summary()
