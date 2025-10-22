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
        # Get current date for analysis
        from datetime import date
        trade_date = date.today().isoformat()
        
        # Run the actual multi-agent analysis with correct parameters
        final_state, final_decision = graph.propagate(symbol.upper(), trade_date)

        # Extract data from the final state
        agent_reports = {
            "market_analyst": final_state.get("market_report", ""),
            "social_analyst": final_state.get("sentiment_report", ""),
            "news_analyst": final_state.get("news_report", ""),
            "fundamentals_analyst": final_state.get("fundamentals_report", ""),
        }
        
        debate_summary = final_state.get("investment_plan", "")

        # Build agent analyses from reports
        agents_data: List[AgentAnalysis] = []

        for agent_name, report in agent_reports.items():
            if report and isinstance(report, str):
                # Extract key insights from the text report
                reasoning = report[:500] + "..." if len(report) > 500 else report
                agents_data.append(
                    AgentAnalysis(
                        agent_name=agent_name.replace("_", " ").title(),
                        recommendation=final_decision if final_decision in ["BUY", "SELL", "HOLD"] else "HOLD",
                        confidence=0.75,  # Default confidence
                        reasoning=reasoning,
                        key_points=[],
                        source_data={"report": report},
                    )
                )

        # Parse the final decision string (e.g., "BUY", "SELL", "HOLD")
        recommendation = final_decision if final_decision in ["BUY", "SELL", "HOLD"] else "HOLD"
        
        # Get current price for targets (simplified for now)
        import yfinance as yf
        ticker_data = yf.Ticker(symbol.upper())
        current_price = ticker_data.history(period="1d")['Close'].iloc[-1] if not ticker_data.history(period="1d").empty else 100.0
        
        # Calculate simple targets based on recommendation
        target_price = current_price * 1.15 if recommendation == "BUY" else current_price
        stop_loss = current_price * 0.95 if recommendation == "BUY" else current_price * 0.90

        return StockAnalysisResponse(
            symbol=symbol.upper(),
            overall_recommendation=recommendation,
            confidence=0.75,
            target_price=float(target_price),
            stop_loss=float(stop_loss),
            timeframe="medium-term",
            analysis_timestamp=datetime.now().isoformat(),
            agents=agents_data,
            debate_summary=debate_summary if debate_summary else None,
            bull_case_price=float(target_price * 1.10),
            base_case_price=float(target_price),
            bear_case_price=float(current_price * 0.90),
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing stock {symbol}: {str(e)}. Please try again later.",
        )
