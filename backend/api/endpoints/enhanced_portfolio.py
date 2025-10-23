"""
Enhanced Portfolio Analysis Endpoint
Multi-agent deep analysis of portfolio performance and recommendations
"""

from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from typing import Dict, Any, List
from pydantic import BaseModel
import asyncio

from backend.api.dependencies import (
    get_portfolio_tracker,
    get_discovery_engine,
    get_cache_manager,
)
from backend.core.portfolio import PortfolioTracker
from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.cache_manager import CacheManager
from backend.core.trading_agents.portfolio_agents import (
    PortfolioManagerAgent,
    RiskAnalystAgent,
    PerformanceAnalystAgent,
)

router = APIRouter(prefix="/api", tags=["enhanced_portfolio"])


class AgentPerspective(BaseModel):
    """Individual agent's analysis."""

    agent_name: str
    analysis: str
    confidence: float
    key_insights: Dict[str, Any]


class PositionRecommendation(BaseModel):
    """Recommendation for a specific position."""

    symbol: str
    action: str  # HOLD, TRIM, ADD, SELL
    reasoning: str
    target_price: float | None = None
    stop_loss: float | None = None


class EnhancedPortfolioResponse(BaseModel):
    """Response from enhanced portfolio analysis."""

    # Executive Summary
    portfolio_health: str  # EXCELLENT, GOOD, FAIR, POOR
    overall_grade: str  # A, B, C, D, F
    overall_confidence: float

    # Current Portfolio Metrics
    current_metrics: Dict[str, Any]

    # Agent Analyses
    portfolio_manager_analysis: AgentPerspective
    risk_analyst_analysis: AgentPerspective
    performance_analyst_analysis: AgentPerspective

    # Synthesis & Recommendations
    top_recommendations: List[str]
    position_specific_recommendations: List[PositionRecommendation]
    risk_factors: List[str]

    # Metadata
    analysis_timestamp: str
    cached: bool = False


@router.get("/enhanced-portfolio-analysis", response_model=EnhancedPortfolioResponse)
async def get_enhanced_portfolio_analysis(
    portfolio_tracker: PortfolioTracker = Depends(get_portfolio_tracker),
    discovery_engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
    cache: CacheManager = Depends(get_cache_manager),
):
    """
    Get deep multi-agent analysis of your portfolio.

    This endpoint provides comprehensive portfolio analysis from three specialist agents:
    - **Portfolio Manager**: Allocation, diversification, position sizing
    - **Risk Analyst**: Concentration, correlation, VAR, stop-losses
    - **Performance Analyst**: Returns, benchmarking, winners/losers

    **Example Use Cases:**
    - "How is my portfolio doing?"
    - "What should I do with my current positions?"
    - "Is my portfolio too risky?"
    - "Which positions should I trim or add to?"

    **Performance:** First call takes ~15 seconds (3 LLM calls), then cached for 5 minutes.
    """
    cache_key = "enhanced_portfolio_analysis"

    # Try cache first
    if cache:
        cached_data = cache.get(cache_key)
        if cached_data:
            print(f"✅ Serving enhanced portfolio analysis from cache")
            cached_data["cached"] = True
            return EnhancedPortfolioResponse(**cached_data)

    print(f"\n{'='*80}")
    print("💼 ENHANCED PORTFOLIO ANALYSIS INITIATED")
    print(f"{'='*80}\n")

    start_time = datetime.now()

    try:
        # Step 1: Get portfolio data
        print("📊 Step 1: Fetching portfolio data...")
        positions = portfolio_tracker.get_positions()
        metrics = portfolio_tracker.calculate_metrics()

        print(f"   Portfolio Value: ${metrics.get('total_value', 0):,.2f}")
        print(f"   Active Positions: {metrics.get('active_positions', 0)}")
        print(
            f"   Daily P&L: ${metrics.get('daily_pnl', 0):+,.2f} ({metrics.get('daily_pnl_percent', 0):+.2f}%)"
        )

        if not positions or len(positions) == 0:
            raise HTTPException(
                status_code=400,
                detail="Portfolio is empty. Add positions to get analysis.",
            )

        # Step 2: Get market regime for context
        print(f"\n🌍 Step 2: Getting market regime context...")
        try:
            market_regime = (
                await discovery_engine.regime_detector.detect_market_regime()
            )
            print(
                f"   Market Regime: {market_regime.get('volatility_regime', 'UNKNOWN')} / {market_regime.get('market_trend', 'UNKNOWN')}"
            )
        except Exception as e:
            print(f"   ⚠️  Could not fetch market regime: {e}")
            market_regime = None

        # Step 3: Initialize agents
        print(f"\n🤖 Step 3: Launching 3 portfolio specialist agents...")
        portfolio_manager = PortfolioManagerAgent()
        risk_analyst = RiskAnalystAgent()
        performance_analyst = PerformanceAnalystAgent()

        print(f"   [1/3] Portfolio Manager analyzing allocation, diversification...")
        print(f"   [2/3] Risk Analyst analyzing concentration, correlation, VAR...")
        print(f"   [3/3] Performance Analyst analyzing returns, winners/losers...")

        # Step 4: Run agents in parallel
        manager_result, risk_result, performance_result = await asyncio.gather(
            portfolio_manager.analyze(metrics, market_regime),
            risk_analyst.analyze(metrics, positions),
            performance_analyst.analyze(metrics, positions),
        )

        print(f"   ✅ All agents completed analysis")

        # Step 5: Synthesize recommendations
        print(f"\n📋 Step 4: Synthesizing portfolio recommendations...")

        # Combine top recommendations from all agents
        all_recommendations = []
        all_recommendations.extend(manager_result.get("key_recommendations", []))
        all_recommendations.extend(risk_result.get("risk_factors", []))
        all_recommendations.extend(performance_result.get("key_insights", []))

        # Get top 5 unique recommendations
        top_recommendations = list(dict.fromkeys(all_recommendations))[:5]

        # Build position-specific recommendations
        position_recommendations = _build_position_recommendations(
            positions,
            manager_result["analysis"],
            risk_result["analysis"],
            performance_result["analysis"],
        )

        # Extract risk factors
        risk_factors = risk_result.get("risk_factors", [])
        if not risk_factors:
            risk_factors = [
                "Moderate portfolio risk",
                "Monitor position sizes",
                "Review stop-losses",
            ]

        # Determine overall health
        performance_rating = performance_result.get("performance_rating", "FAIR")
        risk_level = risk_result.get("risk_level", "MEDIUM RISK")
        portfolio_grade = manager_result.get("portfolio_grade", "B")

        portfolio_health = _determine_portfolio_health(performance_rating, risk_level)

        # Calculate overall confidence
        overall_confidence = (
            manager_result["confidence"] * 0.35
            + risk_result["confidence"] * 0.30
            + performance_result["confidence"] * 0.35
        )

        response_data = {
            "portfolio_health": portfolio_health,
            "overall_grade": portfolio_grade,
            "overall_confidence": round(overall_confidence, 2),
            "current_metrics": {
                "total_value": metrics.get("total_value", 0),
                "daily_pnl": metrics.get("daily_pnl", 0),
                "daily_pnl_percent": metrics.get("daily_pnl_percent", 0),
                "active_positions": metrics.get("active_positions", 0),
                "win_rate": metrics.get("win_rate", 0),
                "total_trades": metrics.get("total_trades", 0),
            },
            "portfolio_manager_analysis": AgentPerspective(
                agent_name=manager_result["agent_name"],
                analysis=manager_result["analysis"],
                confidence=manager_result["confidence"],
                key_insights={
                    "portfolio_grade": manager_result.get("portfolio_grade", "B"),
                    "sector_exposure": manager_result.get("sector_exposure", {}),
                    "key_recommendations": manager_result.get(
                        "key_recommendations", []
                    ),
                },
            ),
            "risk_analyst_analysis": AgentPerspective(
                agent_name=risk_result["agent_name"],
                analysis=risk_result["analysis"],
                confidence=risk_result["confidence"],
                key_insights={
                    "risk_level": risk_result.get("risk_level", "MEDIUM RISK"),
                    "concentration_metrics": risk_result.get(
                        "concentration_metrics", {}
                    ),
                    "risk_factors": risk_result.get("risk_factors", []),
                },
            ),
            "performance_analyst_analysis": AgentPerspective(
                agent_name=performance_result["agent_name"],
                analysis=performance_result["analysis"],
                confidence=performance_result["confidence"],
                key_insights={
                    "performance_rating": performance_result.get(
                        "performance_rating", "FAIR"
                    ),
                    "winners_losers": performance_result.get("winners_losers", {}),
                    "key_insights": performance_result.get("key_insights", []),
                },
            ),
            "top_recommendations": top_recommendations,
            "position_specific_recommendations": position_recommendations,
            "risk_factors": risk_factors,
            "analysis_timestamp": datetime.now().isoformat(),
            "cached": False,
        }

        # Cache for 5 minutes (portfolio changes frequently)
        if cache:
            cache.set(cache_key, response_data, ttl=300)

        end_time = datetime.now()
        execution_time = (end_time - start_time).total_seconds()

        print(f"\n{'='*80}")
        print("✅ ENHANCED PORTFOLIO ANALYSIS COMPLETE")
        print(f"💼 Portfolio Health: {portfolio_health} (Grade: {portfolio_grade})")
        print(f"📊 Value: ${metrics.get('total_value', 0):,.2f}")
        print(f"📈 Daily P&L: {metrics.get('daily_pnl_percent', 0):+.2f}%")
        print(
            f"🎯 Top Recommendation: {top_recommendations[0] if top_recommendations else 'N/A'}"
        )
        print(f"💡 Confidence: {overall_confidence:.0%}")
        print(f"⏱️  Execution Time: {execution_time:.1f}s")
        print(f"{'='*80}\n")

        return EnhancedPortfolioResponse(**response_data)

    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error in enhanced portfolio analysis: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Error analyzing portfolio: {str(e)}"
        )


def _build_position_recommendations(
    positions: List[Any],
    manager_analysis: str,
    risk_analysis: str,
    performance_analysis: str,
) -> List[PositionRecommendation]:
    """Build position-specific recommendations."""
    recommendations = []

    # Combine all analyses
    combined_text = f"{manager_analysis} {risk_analysis} {performance_analysis}".lower()

    for pos in positions[:5]:  # Top 5 positions
        symbol = pos.symbol if hasattr(pos, "symbol") else ""
        current_price = pos.current_price if hasattr(pos, "current_price") else 0
        entry_price = pos.entry_price if hasattr(pos, "entry_price") else 0
        pnl_pct = (
            ((current_price - entry_price) / entry_price * 100)
            if entry_price > 0
            else 0
        )

        # Determine action based on mentions in analyses
        action = "HOLD"  # Default
        reasoning = f"Current P&L: {pnl_pct:+.2f}%"

        symbol_mentions = combined_text.count(symbol.lower())

        if symbol_mentions > 0:
            if "trim" in combined_text and symbol.lower() in combined_text:
                action = "TRIM"
                reasoning = f"Consider taking partial profits (up {pnl_pct:+.2f}%)"
            elif "sell" in combined_text and symbol.lower() in combined_text:
                action = "SELL"
                reasoning = f"Consider exiting position"
            elif "add" in combined_text and symbol.lower() in combined_text:
                action = "ADD"
                reasoning = f"Consider adding on weakness"

        # Set target and stop based on action
        target_price = None
        stop_loss = None

        if action == "TRIM":
            target_price = current_price * 1.05  # 5% above current
            stop_loss = entry_price * 0.95  # 5% below entry
        elif action == "ADD":
            target_price = current_price * 1.15  # 15% above current
            stop_loss = current_price * 0.93  # 7% below current
        else:  # HOLD or SELL
            stop_loss = entry_price * 0.90  # 10% below entry

        recommendations.append(
            PositionRecommendation(
                symbol=symbol,
                action=action,
                reasoning=reasoning,
                target_price=target_price,
                stop_loss=stop_loss,
            )
        )

    return recommendations


def _determine_portfolio_health(performance_rating: str, risk_level: str) -> str:
    """Determine overall portfolio health."""

    # Performance score
    perf_score = {"EXCELLENT": 4, "GOOD": 3, "FAIR": 2, "NEEDS IMPROVEMENT": 1}.get(
        performance_rating, 2
    )

    # Risk score (lower is better)
    risk_score = {
        "LOW-MEDIUM RISK": 4,
        "MEDIUM RISK": 3,
        "MEDIUM-HIGH RISK": 2,
        "HIGH RISK": 1,
    }.get(risk_level, 2)

    # Average the scores
    avg_score = (perf_score + risk_score) / 2

    if avg_score >= 3.5:
        return "EXCELLENT"
    elif avg_score >= 2.5:
        return "GOOD"
    elif avg_score >= 1.5:
        return "FAIR"
    else:
        return "NEEDS ATTENTION"
