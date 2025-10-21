"""
Simple in-memory cache manager for API responses.

Provides time-based expiration for expensive operations.
"""

from datetime import datetime, timedelta
from typing import Any, Optional, Dict, Callable
import asyncio
from functools import wraps
import json


class CacheManager:
    """Simple time-based cache for API responses."""

    def __init__(self):
        """Initialize cache storage."""
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._default_ttl = 300  # 5 minutes default

    def get(self, key: str) -> Optional[Any]:
        """Get value from cache if not expired."""
        if key not in self._cache:
            return None

        cache_entry = self._cache[key]
        if datetime.now() > cache_entry["expires_at"]:
            # Cache expired, remove it
            del self._cache[key]
            return None

        return cache_entry["value"]

    def set(self, key: str, value: Any, ttl: Optional[int] = None):
        """Set value in cache with TTL in seconds."""
        if ttl is None:
            ttl = self._default_ttl

        self._cache[key] = {
            "value": value,
            "expires_at": datetime.now() + timedelta(seconds=ttl),
            "cached_at": datetime.now(),
        }

    def delete(self, key: str):
        """Remove key from cache."""
        if key in self._cache:
            del self._cache[key]

    def clear(self):
        """Clear all cache."""
        self._cache.clear()

    def get_stats(self) -> Dict[str, Any]:
        """Get cache statistics."""
        total_keys = len(self._cache)
        expired_keys = sum(
            1 for entry in self._cache.values() if datetime.now() > entry["expires_at"]
        )

        return {
            "total_keys": total_keys,
            "active_keys": total_keys - expired_keys,
            "expired_keys": expired_keys,
        }

    def cleanup_expired(self):
        """Remove expired entries from cache."""
        now = datetime.now()
        expired_keys = [
            key for key, entry in self._cache.items() if now > entry["expires_at"]
        ]

        for key in expired_keys:
            del self._cache[key]

        return len(expired_keys)


# Global cache instance
_cache = CacheManager()


def get_cache() -> CacheManager:
    """Get global cache instance."""
    return _cache


def cached(ttl: int = 300, key_prefix: str = ""):
    """
    Decorator to cache function results.

    Args:
        ttl: Time to live in seconds (default: 300 = 5 minutes)
        key_prefix: Prefix for cache key

    Usage:
        @cached(ttl=600, key_prefix="sector_rotation")
        async def get_sector_data():
            # expensive operation
            return data
    """

    def decorator(func: Callable):
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            # Generate cache key from function name and args
            cache_key = f"{key_prefix}:{func.__name__}:{hash(str(args) + str(kwargs))}"

            # Try to get from cache
            cached_value = _cache.get(cache_key)
            if cached_value is not None:
                return cached_value

            # Call function and cache result
            result = await func(*args, **kwargs)
            _cache.set(cache_key, result, ttl=ttl)

            return result

        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            # Generate cache key
            cache_key = f"{key_prefix}:{func.__name__}:{hash(str(args) + str(kwargs))}"

            # Try to get from cache
            cached_value = _cache.get(cache_key)
            if cached_value is not None:
                return cached_value

            # Call function and cache result
            result = func(*args, **kwargs)
            _cache.set(cache_key, result, ttl=ttl)

            return result

        # Return appropriate wrapper based on whether function is async
        if asyncio.iscoroutinefunction(func):
            return async_wrapper
        else:
            return sync_wrapper

    return decorator


def cache_or_fallback(
    cache_key: str, fetch_func: Callable, fallback_data: Any, ttl: int = 300
) -> Any:
    """
    Try to get from cache, fetch if not available, use fallback on error.

    Args:
        cache_key: Key to use for caching
        fetch_func: Function to call to fetch data (can be async)
        fallback_data: Data to return if fetch fails
        ttl: Cache TTL in seconds

    Returns:
        Cached data, fetched data, or fallback data
    """
    cache = get_cache()

    # Try cache first
    cached_value = cache.get(cache_key)
    if cached_value is not None:
        return {
            "data": cached_value,
            "source": "cache",
            "cached_at": datetime.now().isoformat(),
        }

    # Try to fetch
    try:
        if asyncio.iscoroutinefunction(fetch_func):
            # For async functions, caller should await the result
            raise ValueError(
                "cache_or_fallback does not support async functions directly"
            )

        data = fetch_func()
        cache.set(cache_key, data, ttl=ttl)
        return {
            "data": data,
            "source": "live",
            "fetched_at": datetime.now().isoformat(),
        }

    except Exception as e:
        # Return fallback data but don't cache it
        return {
            "data": fallback_data,
            "source": "fallback",
            "error": str(e),
            "timestamp": datetime.now().isoformat(),
        }
