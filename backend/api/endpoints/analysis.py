"""
Analysis-related endpoints.

Handles stock analysis using the TradingAgents multi-agent system.
"""

from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from typing import List, Dict, Any

from backend.api.models import StockAnalysisResponse, AgentAnalysis
from backend.api.dependencies import get_trading_agents_graph
from backend.core.trading_agents.graph.trading_graph import TradingAgentsGraph

router = APIRouter(prefix="/api", tags=["analysis"])


@router.post("/analyze-stock/{symbol}")
async def analyze_stock(
    symbol: str,
    graph: TradingAgentsGraph = Depends(get_trading_agents_graph),
):
    """Analyze a stock using the REAL TradingAgents multi-agent system."""
    try:
        # Run the actual multi-agent analysis
        result = await graph.propagate(
            {
                "symbol": symbol.upper(),
                "analysis_type": "comprehensive",
                "request_timestamp": datetime.now().isoformat(),
            }
        )

        # Extract data from the graph result
        final_decision = result.get("final_decision", {})
        agent_reports = result.get("agent_reports", {})
        debate_summary = result.get("debate_summary", "")

        # Build agent analyses
        agents_data: List[AgentAnalysis] = []

        for agent_name, report in agent_reports.items():
            if isinstance(report, dict):
                agents_data.append(
                    AgentAnalysis(
                        agent_name=agent_name.replace("_", " ").title(),
                        recommendation=report.get("recommendation", "HOLD"),
                        confidence=report.get("confidence", 0.5),
                        reasoning=report.get("reasoning", "No reasoning provided"),
                        key_points=report.get("key_points", []),
                        source_data=report.get("source_data", {}),
                    )
                )

        # Get price targets
        target_price = final_decision.get("target_price", 0.0)
        stop_loss = final_decision.get("stop_loss", 0.0)
        bull_case = final_decision.get("bull_case_price")
        base_case = final_decision.get("base_case_price")
        bear_case = final_decision.get("bear_case_price")

        return StockAnalysisResponse(
            symbol=symbol.upper(),
            overall_recommendation=final_decision.get("recommendation", "HOLD"),
            confidence=final_decision.get("confidence", 0.5),
            target_price=target_price,
            stop_loss=stop_loss,
            timeframe=final_decision.get("timeframe", "medium-term"),
            analysis_timestamp=datetime.now().isoformat(),
            agents=agents_data,
            debate_summary=debate_summary if debate_summary else None,
            bull_case_price=bull_case,
            base_case_price=base_case,
            bear_case_price=bear_case,
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing stock {symbol}: {str(e)}. Please try again later.",
        )
