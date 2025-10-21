"""
Opportunities-related endpoints.

Handles trading opportunity discovery and analysis.
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List
import logging

from backend.api.models import Opportunity
from backend.api.dependencies import get_discovery_engine
from backend.core.discovery import EnhancedDiscoveryEngine

router = APIRouter(prefix="/api", tags=["opportunities"])
logger = logging.getLogger(__name__)


@router.get("/opportunities", response_model=List[Opportunity])
async def get_opportunities(
    engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
):
    """Get current trading opportunities from enhanced discovery engine."""
    try:
        # Run discovery to get opportunities
        opportunities = await engine.discover_opportunities()

        result = []
        for opp in opportunities[:20]:  # Top 20 opportunities
            # Calculate overall score based on multiple factors
            overall_score = (
                opp.technical_score * 0.3
                + opp.momentum_score * 0.2
                + opp.sentiment_score * 0.2
                + opp.confidence_level * 0.3
            ) * 10  # Scale to 0-10

            # Determine risk level
            risk_level = opp.risk_level if hasattr(opp, "risk_level") else "medium"

            # Create title from name and key signals
            signals = []
            if opp.technical_score > 0.7:
                signals.append("Strong Technical")
            if opp.momentum_score > 0.7:
                signals.append("High Momentum")
            if opp.sentiment_score > 0.6:
                signals.append("Positive Sentiment")

            title = f"{opp.name} - {', '.join(signals) if signals else 'Multi-Factor Opportunity'}"

            # Build reasoning
            reasoning_parts = []
            if opp.technical_score > 0.6:
                reasoning_parts.append(
                    f"Technical Score: {opp.technical_score:.1%} - Strong chart patterns"
                )
            if opp.momentum_score > 0.6:
                reasoning_parts.append(
                    f"Momentum: {opp.momentum_score:.1%} - Positive price action"
                )
            if opp.sentiment_score > 0.5:
                reasoning_parts.append(
                    f"Sentiment: {opp.sentiment_score:.1%} - Market optimism"
                )
            if opp.reddit_mentions > 0 or opp.twitter_mentions > 0:
                social = opp.reddit_mentions + opp.twitter_mentions
                reasoning_parts.append(
                    f"Social buzz: {social} mentions across platforms"
                )

            reasoning = (
                ". ".join(reasoning_parts)
                if reasoning_parts
                else "Multi-source AI discovery identified this opportunity"
            )

            # Estimate price targets (10% gain target, 5% stop loss by default)
            entry = opp.price
            target = entry * 1.10 if entry else None
            stop = entry * 0.95 if entry else None

            result.append(
                Opportunity(
                    symbol=opp.symbol,
                    title=title,
                    score=overall_score,
                    reasoning=reasoning,
                    entry_price=entry,
                    target_price=target,
                    stop_loss=stop,
                    timeframe="medium-term",
                    risk_level=risk_level.lower(),
                )
            )

        return result
    except Exception as e:
        logger.error(f"Error getting opportunities: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching opportunities: {str(e)}. Please try again later.",
        )


@router.post("/run-discovery")
async def run_discovery(
    engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
):
    """Trigger discovery engine to find new opportunities."""
    try:
        # Run discovery in background
        opportunities = await engine.discover_opportunities()

        return {
            "status": "success",
            "message": f"Discovery completed. Found {len(opportunities)} opportunities.",
            "count": len(opportunities),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
