"""
Market-related endpoints.

Handles market regime analysis, sector rotation, and market indicators.
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any
from datetime import datetime

from backend.api.models import MarketRegime
from backend.api.dependencies import get_discovery_engine, get_cache_manager
from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.cache_manager import CacheManager

router = APIRouter(prefix="/api", tags=["market"])


@router.get("/market-regime", response_model=MarketRegime)
async def get_market_regime(
    engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
):
    """Get current market regime analysis."""
    try:
        # Get market regime from discovery engine
        regime_data = await engine.regime_detector.detect_market_regime()

        return MarketRegime(
            regime=regime_data.get("regime", "Unknown"),
            trend=regime_data.get("trend", "Unknown"),
            sentiment=regime_data.get("sentiment", "Unknown"),
            strategy=regime_data.get("recommended_strategy", "DEFENSIVE_VALUE"),
            confidence=regime_data.get("confidence", 0.5),
        )
    except Exception as e:
        return MarketRegime(
            regime="Unknown",
            trend="Unknown",
            sentiment="Unknown",
            strategy="DEFENSIVE_VALUE",
            confidence=0.0,
        )


@router.get("/market-regime/detailed")
async def get_detailed_market_regime(
    engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
) -> Dict[str, Any]:
    """Get detailed market regime analysis with all components."""
    try:
        # Get detailed regime data
        regime_data = await engine.regime_detector.detect_market_regime()

        # Get the correct key names from regime detector
        spy_vs_sma = regime_data.get("spy_vs_sma", 0.0)
        yield_change_5d = regime_data.get("yield_change_5d", 0.0)
        vix_level = regime_data.get("vix_level", 0.0)

        # Calculate confidence based on data quality (0.7-0.9 range for real data)
        confidence = 0.85 if vix_level > 0 else 0.5

        return {
            "volatility_regime": regime_data.get("volatility_regime", "UNKNOWN"),
            "market_trend": regime_data.get("market_trend", "UNKNOWN"),
            "risk_sentiment": regime_data.get("risk_sentiment", "UNKNOWN"),
            "recommended_strategy": regime_data.get(
                "recommended_strategy", "DEFENSIVE_VALUE"
            ),
            "confidence": confidence,
            "vix_level": vix_level,
            "spy_trend": spy_vs_sma,  # Use correct key
            "yield_10y": regime_data.get("yield_10y", 0.0),
            "yield_change": yield_change_5d,  # Use correct key
            "analysis_timestamp": datetime.now().isoformat(),
            "market_indicators": {
                "vix": {
                    "current": vix_level,
                    "threshold_low": 20,
                    "threshold_high": 30,
                    "status": (
                        "LOW"
                        if vix_level < 20
                        else ("HIGH" if vix_level > 30 else "MEDIUM")
                    ),
                },
                "spy": {
                    "current_vs_sma20": spy_vs_sma,  # Use correct value
                    "trend": ("BULLISH" if spy_vs_sma > 0 else "BEARISH"),
                },
                "treasury": {
                    "yield_10y": regime_data.get("yield_10y", 0.0),
                    "yield_change_5d": yield_change_5d,  # Use correct value
                },
            },
        }
    except Exception as e:
        return {
            "volatility_regime": "UNKNOWN",
            "market_trend": "UNKNOWN",
            "risk_sentiment": "UNKNOWN",
            "recommended_strategy": "DEFENSIVE_VALUE",
            "confidence": 0.0,
            "error": str(e),
        }


@router.get("/sector-rotation")
async def get_sector_rotation(
    engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
    cache: CacheManager = Depends(get_cache_manager),
) -> Dict[str, Any]:
    """Get sector rotation analysis with caching."""
    cache_key = "sector_rotation"

    # Try cache first
    if cache:
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            cached_data["cached"] = True
            return cached_data

    try:
        # Get sector rotation data
        sector_data = await engine.sector_analyzer.analyze_sector_rotation()

        result = {
            "sectors": sector_data.get("sectors", []),
            "rotation_strength": sector_data.get("rotation_strength", 0.0),
            "trending_sectors": sector_data.get("trending_sectors", []),
            "lagging_sectors": sector_data.get("lagging_sectors", []),
            "analysis_timestamp": datetime.now().isoformat(),
            "cached": False,
        }

        # Cache for 10 minutes (sector data doesn't change rapidly)
        if cache:
            cache.set(cache_key, result, ttl=600)

        return result

    except Exception as e:
        # Return error instead of mock data
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching sector rotation data: {str(e)}. Please try again later.",
        )
