"""
Cost management profiles for the True North Trading Platform.
Provides configurable spending limits and API usage controls.
"""

import os
from typing import Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum


class CostProfile(Enum):
    """Available cost profiles."""

    LEAN = "lean"
    STANDARD = "standard"
    PRO = "pro"


@dataclass
class APILimits:
    """API usage limits for a cost profile."""

    requests_per_minute: int
    requests_per_day: int
    monthly_budget: float  # USD
    max_tokens_per_request: Optional[int] = None
    max_concurrent_requests: int = 1


@dataclass
class ProfileConfig:
    """Complete configuration for a cost profile."""

    name: str
    description: str
    monthly_budget: float
    api_limits: Dict[str, APILimits]
    features: Dict[str, bool]


# Cost profile definitions
COST_PROFILES = {
    CostProfile.LEAN: ProfileConfig(
        name="Lean",
        description="Minimal cost profile for testing and light usage ($0-10/mo)",
        monthly_budget=10.0,
        api_limits={
            "openai": APILimits(
                requests_per_minute=3,
                requests_per_day=100,
                monthly_budget=5.0,
                max_tokens_per_request=1000,
                max_concurrent_requests=1,
            ),
            "alpha_vantage": APILimits(
                requests_per_minute=5,  # Free tier: 25/day
                requests_per_day=25,
                monthly_budget=0.0,  # Free
                max_concurrent_requests=1,
            ),
            "polygon": APILimits(
                requests_per_minute=5,
                requests_per_day=100,
                monthly_budget=0.0,  # Use free tier only
                max_concurrent_requests=1,
            ),
            "news_api": APILimits(
                requests_per_minute=10,
                requests_per_day=100,
                monthly_budget=0.0,  # Use free tier only
                max_concurrent_requests=1,
            ),
            "twitter": APILimits(
                requests_per_minute=1,  # Very conservative for free tier
                requests_per_day=50,
                monthly_budget=0.0,  # Free tier only
                max_concurrent_requests=1,
            ),
            "reddit": APILimits(
                requests_per_minute=10,
                requests_per_day=1000,
                monthly_budget=0.0,  # Free
                max_concurrent_requests=1,
            ),
        },
        features={
            "multi_agent_debate": False,  # Disable expensive features
            "deep_thinking_llm": False,  # Use only fast LLM
            "social_sentiment": True,  # Keep free features
            "technical_analysis": True,
            "news_analysis": True,
            "risk_management": False,  # Simplified risk checks
            "backtesting": False,  # Disable compute-heavy features
            "real_time_data": False,  # Use delayed data only
        },
    ),
    CostProfile.STANDARD: ProfileConfig(
        name="Standard",
        description="Balanced profile for regular trading ($10-50/mo)",
        monthly_budget=50.0,
        api_limits={
            "openai": APILimits(
                requests_per_minute=10,
                requests_per_day=500,
                monthly_budget=30.0,
                max_tokens_per_request=2000,
                max_concurrent_requests=2,
            ),
            "alpha_vantage": APILimits(
                requests_per_minute=12,  # Premium tier
                requests_per_day=500,
                monthly_budget=15.0,  # Premium subscription
                max_concurrent_requests=2,
            ),
            "polygon": APILimits(
                requests_per_minute=10,
                requests_per_day=1000,
                monthly_budget=0.0,  # Still use free tier
                max_concurrent_requests=2,
            ),
            "news_api": APILimits(
                requests_per_minute=20,
                requests_per_day=500,
                monthly_budget=0.0,  # Free tier sufficient
                max_concurrent_requests=2,
            ),
            "twitter": APILimits(
                requests_per_minute=5,
                requests_per_day=300,
                monthly_budget=5.0,  # Basic tier if needed
                max_concurrent_requests=1,
            ),
            "reddit": APILimits(
                requests_per_minute=30,
                requests_per_day=5000,
                monthly_budget=0.0,  # Free
                max_concurrent_requests=2,
            ),
        },
        features={
            "multi_agent_debate": True,  # Enable debates with limits
            "deep_thinking_llm": True,  # Use both fast and deep LLMs
            "social_sentiment": True,
            "technical_analysis": True,
            "news_analysis": True,
            "risk_management": True,  # Full risk management
            "backtesting": True,  # Limited backtesting
            "real_time_data": True,  # Real-time where available
        },
    ),
    CostProfile.PRO: ProfileConfig(
        name="Pro",
        description="Full-featured profile for serious trading ($50+/mo)",
        monthly_budget=200.0,
        api_limits={
            "openai": APILimits(
                requests_per_minute=30,
                requests_per_day=2000,
                monthly_budget=100.0,
                max_tokens_per_request=4000,
                max_concurrent_requests=5,
            ),
            "alpha_vantage": APILimits(
                requests_per_minute=60,  # Premium tier with higher limits
                requests_per_day=2000,
                monthly_budget=50.0,  # Premium subscription
                max_concurrent_requests=5,
            ),
            "polygon": APILimits(
                requests_per_minute=30,
                requests_per_day=5000,
                monthly_budget=25.0,  # Paid tier for real-time data
                max_concurrent_requests=5,
            ),
            "news_api": APILimits(
                requests_per_minute=50,
                requests_per_day=2000,
                monthly_budget=15.0,  # Business tier
                max_concurrent_requests=3,
            ),
            "twitter": APILimits(
                requests_per_minute=20,
                requests_per_day=2000,
                monthly_budget=10.0,  # Pro tier
                max_concurrent_requests=3,
            ),
            "reddit": APILimits(
                requests_per_minute=60,
                requests_per_day=20000,
                monthly_budget=0.0,  # Free
                max_concurrent_requests=5,
            ),
        },
        features={
            "multi_agent_debate": True,  # Full debates
            "deep_thinking_llm": True,  # All LLM models
            "social_sentiment": True,
            "technical_analysis": True,
            "news_analysis": True,
            "risk_management": True,  # Advanced risk management
            "backtesting": True,  # Full backtesting
            "real_time_data": True,  # Real-time everything
            "advanced_analytics": True,  # Pro-only features
            "custom_models": True,  # Local model deployment
        },
    ),
}


class CostManager:
    """Manages cost profiles and spending tracking."""

    def __init__(self, profile: CostProfile = None):
        """Initialize cost manager with a profile."""
        self.current_profile = profile or self._get_profile_from_env()
        self.config = COST_PROFILES[self.current_profile]
        self.daily_usage = {}  # Track daily API usage
        self.monthly_spend = 0.0  # Track monthly spending

    def _get_profile_from_env(self) -> CostProfile:
        """Get cost profile from environment variable."""
        profile_name = os.getenv("COST_PROFILE", "standard").lower()
        try:
            return CostProfile(profile_name)
        except ValueError:
            print(f"⚠️  Invalid cost profile '{profile_name}', using 'standard'")
            return CostProfile.STANDARD

    def get_api_limits(self, api_name: str) -> APILimits:
        """Get API limits for the current profile."""
        return self.config.api_limits.get(
            api_name,
            APILimits(requests_per_minute=1, requests_per_day=10, monthly_budget=0.0),
        )

    def is_feature_enabled(self, feature: str) -> bool:
        """Check if a feature is enabled in the current profile."""
        return self.config.features.get(feature, False)

    def can_make_request(self, api_name: str) -> bool:
        """Check if we can make an API request within limits."""
        limits = self.get_api_limits(api_name)

        # Check daily usage
        daily_count = self.daily_usage.get(api_name, 0)
        if daily_count >= limits.requests_per_day:
            return False

        # Check monthly budget
        api_monthly_spend = self._get_api_monthly_spend(api_name)
        if api_monthly_spend >= limits.monthly_budget:
            return False

        return True

    def record_request(self, api_name: str, cost: float = 0.0):
        """Record an API request and its cost."""
        # Update daily usage
        self.daily_usage[api_name] = self.daily_usage.get(api_name, 0) + 1

        # Update monthly spend
        self.monthly_spend += cost

    def _get_api_monthly_spend(self, api_name: str) -> float:
        """Get monthly spending for a specific API."""
        # In a real implementation, this would query a database
        # For now, return a simple estimate
        return self.monthly_spend * 0.1  # Assume 10% of total spend per API

    def get_spending_summary(self) -> Dict[str, Any]:
        """Get current spending summary."""
        return {
            "profile": self.current_profile.value,
            "monthly_budget": self.config.monthly_budget,
            "monthly_spend": self.monthly_spend,
            "budget_used_percent": (self.monthly_spend / self.config.monthly_budget)
            * 100,
            "daily_usage": self.daily_usage,
            "features_enabled": sum(
                1 for enabled in self.config.features.values() if enabled
            ),
            "total_features": len(self.config.features),
        }

    def switch_profile(self, new_profile: CostProfile):
        """Switch to a different cost profile."""
        old_profile = self.current_profile
        self.current_profile = new_profile
        self.config = COST_PROFILES[new_profile]

        print(f"🔄 Switched from {old_profile.value} to {new_profile.value} profile")
        print(f"💰 New monthly budget: ${self.config.monthly_budget}")

        # Update environment variable
        os.environ["COST_PROFILE"] = new_profile.value

    def get_cost_estimate(self, operation: str, **kwargs) -> float:
        """Estimate cost for a specific operation."""
        estimates = {
            "single_stock_analysis": 0.05,  # Basic analysis
            "multi_agent_debate": 0.25,  # Full debate cycle
            "portfolio_analysis": 0.15,  # Portfolio-wide analysis
            "backtesting": 0.50,  # Backtesting operation
            "real_time_monitoring": 0.02,  # Per minute of monitoring
        }

        base_cost = estimates.get(operation, 0.01)

        # Adjust based on profile
        if self.current_profile == CostProfile.LEAN:
            return base_cost * 0.5  # Reduced functionality
        elif self.current_profile == CostProfile.PRO:
            return base_cost * 1.5  # Enhanced functionality

        return base_cost

    def check_spending_alerts(self) -> list:
        """Check for spending alerts."""
        alerts = []

        budget_used = (self.monthly_spend / self.config.monthly_budget) * 100

        if budget_used >= 90:
            alerts.append("🚨 CRITICAL: 90% of monthly budget used!")
        elif budget_used >= 80:
            alerts.append("⚠️  WARNING: 80% of monthly budget used")
        elif budget_used >= 60:
            alerts.append("📊 INFO: 60% of monthly budget used")

        return alerts


# Global cost manager instance
cost_manager = CostManager()


def get_cost_manager() -> CostManager:
    """Get the global cost manager instance."""
    return cost_manager


def with_cost_control(api_name: str):
    """Decorator to add cost control to API functions."""

    def decorator(func):
        def wrapper(*args, **kwargs):
            if not cost_manager.can_make_request(api_name):
                limits = cost_manager.get_api_limits(api_name)
                raise Exception(
                    f"API limit reached for {api_name}. "
                    f"Daily limit: {limits.requests_per_day}, "
                    f"Monthly budget: ${limits.monthly_budget}"
                )

            # Execute the function
            result = func(*args, **kwargs)

            # Record the request
            estimated_cost = cost_manager.get_cost_estimate(func.__name__)
            cost_manager.record_request(api_name, estimated_cost)

            return result

        return wrapper

    return decorator


if __name__ == "__main__":
    # Demo the cost management system
    print("💰 True North Trading Platform - Cost Management Demo")
    print("=" * 60)

    for profile in CostProfile:
        print(f"\n📊 {profile.value.upper()} Profile:")
        config = COST_PROFILES[profile]
        print(f"   Budget: ${config.monthly_budget}/mo")
        print(f"   Description: {config.description}")

        # Show key API limits
        openai_limits = config.api_limits.get("openai")
        if openai_limits:
            print(
                f"   OpenAI: {openai_limits.requests_per_day}/day, ${openai_limits.monthly_budget}/mo"
            )

        # Show enabled features
        enabled_features = [k for k, v in config.features.items() if v]
        print(f"   Features: {len(enabled_features)}/{len(config.features)} enabled")

    # Demo cost manager
    print(f"\n🔧 Current Profile: {cost_manager.current_profile.value}")
    summary = cost_manager.get_spending_summary()
    print(f"💰 Monthly Budget: ${summary['monthly_budget']}")
    print(
        f"📊 Features Enabled: {summary['features_enabled']}/{summary['total_features']}"
    )
