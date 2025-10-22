"""
Traders-related endpoints.

Handles trader following, signals, and leaderboard.
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from datetime import datetime
from pydantic import BaseModel

from backend.api.models import TraderSignal, Alert
from backend.api.dependencies import (
    get_trader_system,
    get_monitoring_system,
    get_cache_manager,
)
from backend.core.trader_following import TraderFollowingSystem, TraderPlatform
from backend.core.monitoring import RobustMonitoringSystem, AlertSeverity
from backend.core.cache_manager import CacheManager

router = APIRouter(prefix="/api", tags=["traders"])


class FollowTraderRequest(BaseModel):
    """Request model for following a trader."""

    name: str
    platform: str
    username: str
    verified: bool = False


@router.get("/trader-signals", response_model=List[TraderSignal])
async def get_trader_signals(
    system: TraderFollowingSystem = Depends(get_trader_system),
):
    """Get recent trading signals from followed traders."""
    try:
        # Get signals from trader following system (last 24 hours)
        signals = system.get_recent_signals(hours=24)

        result = []
        for signal in signals:
            result.append(
                TraderSignal(
                    id=str(signal.get("id", "")),
                    trader_name=signal.get("trader_name", "Unknown"),
                    symbol=signal.get("symbol", ""),
                    action=signal.get("action", "UNKNOWN"),
                    confidence=signal.get("confidence", 0.5),
                    entry_price=signal.get("entry_price"),
                    time=signal.get("timestamp", datetime.now()),
                    platform=signal.get("platform", "Unknown"),
                )
            )

        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching trader signals: {str(e)}. Please try again later.",
        )


@router.get("/traders")
async def get_traders(
    system: TraderFollowingSystem = Depends(get_trader_system),
):
    """Get list of followed traders with their performance metrics."""
    try:
        # Get traders from system
        traders = system.get_followed_traders()

        result = []
        for trader in traders:
            result.append(
                {
                    "id": trader.get("id"),
                    "name": trader.get("name", "Unknown"),
                    "platform": trader.get("platform", "Unknown"),
                    "win_rate": trader.get("win_rate", 0.0),
                    "total_trades": trader.get("total_trades", 0),
                    "followers": trader.get("followers", 0),
                    "avg_return": trader.get("avg_return", 0.0),
                    "confidence_score": trader.get("confidence_score", 0.5),
                    "verified": trader.get("verified", False),
                }
            )

        return {"traders": result, "total": len(result)}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching traders: {str(e)}. Please try again later.",
        )


@router.get("/trader-leaderboard")
async def get_trader_leaderboard(
    system: TraderFollowingSystem = Depends(get_trader_system),
    cache: CacheManager = Depends(get_cache_manager),
) -> Dict[str, Any]:
    """Get trader performance leaderboard with caching."""
    cache_key = "trader_leaderboard"

    # Try cache first
    if cache:
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            cached_data["cached"] = True
            return cached_data

    try:
        # Get trader leaderboard
        leaderboard = system.get_trader_leaderboard()

        result = {
            "leaderboard": leaderboard,
            "total_traders": len(leaderboard),
            "analysis_timestamp": datetime.now().isoformat(),
            "cached": False,
        }

        # Cache for 5 minutes (leaderboard updates periodically)
        if cache:
            cache.set(cache_key, result, ttl=300)

        return result

    except Exception as e:
        # Return error instead of mock data
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching trader leaderboard: {str(e)}. Please try again later.",
        )


@router.get("/consensus-signals")
async def get_consensus_signals(
    min_traders: int = 2,
    system: TraderFollowingSystem = Depends(get_trader_system),
) -> Dict[str, Any]:
    """Get trading signals where multiple traders agree on the same position."""
    try:
        # Get consensus signals
        signals = system.get_consensus_signals(min_traders=min_traders)

        return {
            "signals": signals,
            "total_consensus": len(signals),
            "min_traders_required": min_traders,
            "timestamp": datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching consensus signals: {str(e)}. Please try again later.",
        )


@router.get("/alerts", response_model=List[Alert])
async def get_alerts(
    system: RobustMonitoringSystem = Depends(get_monitoring_system),
):
    """Get recent alerts and notifications."""
    try:
        # Get alerts from monitoring system's database (last 24 hours)
        alerts = system.alert_database.get_recent_alerts(hours=24)

        result = []
        for alert in alerts:
            # Map severity from enum
            severity_str = (
                alert.severity.name
                if hasattr(alert.severity, "name")
                else str(alert.severity)
            )

            result.append(
                Alert(
                    id=str(alert.id),
                    title=alert.title,
                    message=alert.message,
                    severity=severity_str.lower(),
                    timestamp=alert.timestamp,
                    symbol=alert.symbol if hasattr(alert, "symbol") else None,
                )
            )

        return result
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching alerts: {str(e)}. Please try again later.",
        )


@router.post("/traders/follow")
async def follow_trader(
    request: FollowTraderRequest,
    system: TraderFollowingSystem = Depends(get_trader_system),
):
    """Follow a new trader."""
    try:
        # Map platform string to TraderPlatform enum
        platform_map = {
            "twitter": TraderPlatform.TWITTER,
            "reddit": TraderPlatform.REDDIT,
            "discord": TraderPlatform.DISCORD,
        }

        platform = platform_map.get(request.platform.lower(), TraderPlatform.TWITTER)

        # Add trader to the system
        trader_id = system.add_trader(
            name=request.name,
            platform=platform,
            username=request.username,
            verified=request.verified,
        )

        return {
            "success": True,
            "trader_id": trader_id,
            "message": f"Successfully followed {request.name}",
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error following trader: {str(e)}",
        )


@router.delete("/traders/{trader_id}")
async def unfollow_trader(
    trader_id: str,
    system: TraderFollowingSystem = Depends(get_trader_system),
):
    """Unfollow a trader."""
    try:
        # Remove trader from the system
        system.remove_trader(trader_id)

        return {
            "success": True,
            "message": f"Successfully unfollowed trader",
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error unfollowing trader: {str(e)}",
        )
