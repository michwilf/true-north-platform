"""
Autonomous Trading Pipeline - Fully Automated Stock Discovery and Analysis

This endpoint orchestrates the complete autonomous workflow:
1. Discovery Engine finds top opportunities
2. Trading Agents analyze each one in detail
3. Results are ranked and returned
4. Optional: Add to monitoring watchlist
"""

from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import List, Dict, Any, Optional
from datetime import datetime, date
import asyncio

from backend.api.dependencies import (
    get_discovery_engine,
    get_trading_agents_graph,
    get_monitoring_system,
)
from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.trading_agents.graph.trading_graph import TradingAgentsGraph
from backend.core.monitoring import RobustMonitoringSystem
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["autonomous"])


class AutonomousAnalysisRequest(BaseModel):
    """Request for autonomous analysis."""
    max_opportunities: int = 5
    min_confidence: float = 0.6
    analyze_with_agents: bool = True
    add_to_watchlist: bool = False
    risk_levels: Optional[List[str]] = ["LOW", "MEDIUM"]


class AgentAnalysisResult(BaseModel):
    """Result from agent analysis."""
    symbol: str
    recommendation: str
    confidence: float
    target_price: float
    stop_loss: float
    reasoning: str
    analysis_time: str


class AutonomousDiscoveryResponse(BaseModel):
    """Response from autonomous discovery."""
    discovered_count: int
    analyzed_count: int
    top_recommendations: List[AgentAnalysisResult]
    market_regime: Dict[str, Any]
    execution_time: float
    timestamp: str


@router.post("/autonomous-discovery", response_model=AutonomousDiscoveryResponse)
async def run_autonomous_discovery(
    request: AutonomousAnalysisRequest,
    background_tasks: BackgroundTasks,
    discovery_engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
    trading_agents: TradingAgentsGraph = Depends(get_trading_agents_graph),
    monitoring_system: RobustMonitoringSystem = Depends(get_monitoring_system),
):
    """
    **Autonomous Trading Pipeline**
    
    Fully automated workflow:
    1. **Discovery:** Scans market for opportunities (technical, earnings, insider activity)
    2. **Analysis:** Runs 4-agent deep analysis on top opportunities
    3. **Ranking:** Ranks by confidence and recommendation
    4. **Monitoring:** Optionally adds to watchlist for alerts
    
    This is the "set it and forget it" endpoint - it finds and analyzes stocks for you!
    
    **Example:**
    ```bash
    curl -X POST https://backend.com/api/autonomous-discovery \\
      -H "Content-Type: application/json" \\
      -d '{"max_opportunities": 5, "analyze_with_agents": true}'
    ```
    """
    start_time = datetime.now()
    
    try:
        print(f"\n{'='*80}")
        print("🤖 AUTONOMOUS TRADING PIPELINE INITIATED")
        print(f"{'='*80}\n")
        
        # Step 1: Discovery Engine finds opportunities
        print("📊 STEP 1: Discovery Engine - Finding Opportunities...")
        opportunities = await discovery_engine.discover_opportunities()
        
        # Filter by risk level if specified
        if request.risk_levels:
            opportunities = [
                opp for opp in opportunities 
                if opp.risk_level in request.risk_levels
            ]
        
        # Rank by confidence and technical scores
        opportunities.sort(
            key=lambda x: (x.confidence_level + x.technical_score) / 2,
            reverse=True
        )
        
        top_opportunities = opportunities[:request.max_opportunities]
        
        print(f"   ✅ Found {len(opportunities)} opportunities")
        print(f"   🎯 Top {len(top_opportunities)} selected for analysis:")
        for opp in top_opportunities:
            print(f"      • {opp.symbol}: Score {opp.confidence_level:.2f}")
        
        # Get market regime
        market_regime = await discovery_engine.regime_detector.detect_market_regime()
        
        # Step 2: Multi-Agent Analysis (if enabled)
        agent_results = []
        
        if request.analyze_with_agents and top_opportunities:
            print(f"\n🤖 STEP 2: Trading Agents - Deep Analysis...")
            print(f"   Running 4-agent analysis on {len(top_opportunities)} stocks...")
            print("   (This takes ~30-60 seconds per stock)\n")
            
            trade_date = date.today().isoformat()
            
            for i, opp in enumerate(top_opportunities, 1):
                try:
                    print(f"   [{i}/{len(top_opportunities)}] Analyzing {opp.symbol}...")
                    
                    # Run the full agent workflow
                    final_state, final_decision = trading_agents.propagate(
                        opp.symbol,
                        trade_date
                    )
                    
                    # Extract key info
                    market_report = final_state.get("market_report", "")
                    reasoning = market_report[:300] + "..." if len(market_report) > 300 else market_report
                    
                    # Get current price for targets
                    import yfinance as yf
                    ticker_data = yf.Ticker(opp.symbol)
                    hist = ticker_data.history(period="1d")
                    current_price = hist['Close'].iloc[-1] if not hist.empty else opp.price
                    
                    # Calculate targets based on recommendation
                    recommendation = final_decision if final_decision in ["BUY", "SELL", "HOLD"] else "HOLD"
                    
                    if recommendation == "BUY":
                        target_price = current_price * 1.15
                        stop_loss = current_price * 0.95
                        confidence = 0.80
                    elif recommendation == "SELL":
                        target_price = current_price * 0.85
                        stop_loss = current_price * 1.05
                        confidence = 0.75
                    else:  # HOLD
                        target_price = current_price
                        stop_loss = current_price * 0.90
                        confidence = 0.60
                    
                    agent_results.append(
                        AgentAnalysisResult(
                            symbol=opp.symbol,
                            recommendation=recommendation,
                            confidence=confidence,
                            target_price=float(target_price),
                            stop_loss=float(stop_loss),
                            reasoning=reasoning,
                            analysis_time=datetime.now().isoformat(),
                        )
                    )
                    
                    print(f"       → {recommendation} (confidence: {confidence:.0%})")
                    
                except Exception as e:
                    print(f"       ✗ Error analyzing {opp.symbol}: {str(e)[:100]}")
                    continue
        
        # Step 3: Add to watchlist (if enabled)
        if request.add_to_watchlist and agent_results:
            buy_symbols = [r.symbol for r in agent_results if r.recommendation == "BUY"]
            if buy_symbols:
                print(f"\n📡 STEP 3: Adding {len(buy_symbols)} BUY recommendations to watchlist...")
                for symbol in buy_symbols:
                    monitoring_system.add_to_watchlist(symbol)
                print(f"   ✅ Watchlist updated")
        
        # Calculate execution time
        end_time = datetime.now()
        execution_time = (end_time - start_time).total_seconds()
        
        # Sort results by confidence
        agent_results.sort(key=lambda x: x.confidence, reverse=True)
        
        print(f"\n{'='*80}")
        print("✨ AUTONOMOUS PIPELINE COMPLETE")
        print(f"{'='*80}")
        print(f"📊 Discovered: {len(opportunities)} opportunities")
        print(f"🤖 Analyzed: {len(agent_results)} stocks with AI agents")
        print(f"🎯 Top Recommendations:")
        for r in agent_results[:3]:
            print(f"   • {r.symbol}: {r.recommendation} ({r.confidence:.0%} confidence)")
        print(f"⏱️  Execution Time: {execution_time:.1f}s")
        print(f"{'='*80}\n")
        
        return AutonomousDiscoveryResponse(
            discovered_count=len(opportunities),
            analyzed_count=len(agent_results),
            top_recommendations=agent_results,
            market_regime=market_regime,
            execution_time=execution_time,
            timestamp=datetime.now().isoformat(),
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error in autonomous discovery: {str(e)}"
        )


@router.post("/autonomous-discovery/schedule")
async def schedule_autonomous_discovery(
    schedule: str = "daily",  # daily, hourly, weekly
    background_tasks: BackgroundTasks = None,
):
    """
    Schedule autonomous discovery to run automatically.
    
    **Options:**
    - `daily`: Run once per day at market close
    - `hourly`: Run every hour during market hours
    - `weekly`: Run once per week on Sunday
    
    **Example:**
    ```bash
    curl -X POST "https://backend.com/api/autonomous-discovery/schedule?schedule=daily"
    ```
    """
    # This would integrate with a task scheduler (Celery, APScheduler, etc.)
    # For now, return the configuration
    return {
        "status": "scheduled",
        "schedule": schedule,
        "message": f"Autonomous discovery will run {schedule}",
        "next_run": "Scheduling system not yet implemented",
        "note": "For now, call /autonomous-discovery manually or set up a cron job"
    }


@router.get("/autonomous-discovery/results")
async def get_autonomous_results():
    """
    Get results from the last autonomous discovery run.
    
    **Returns:** Cached results from the most recent analysis.
    """
    # This would fetch from a cache or database
    # For now, return a placeholder
    return {
        "status": "not_implemented",
        "message": "Results caching not yet implemented",
        "suggestion": "Call /autonomous-discovery to run a new analysis"
    }

