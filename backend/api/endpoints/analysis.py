"""
Analysis-related endpoints.

Handles stock analysis using the TradingAgents multi-agent system.
"""

from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime, date
from typing import List, Dict, Any

from backend.api.models import StockAnalysisResponse, AgentAnalysis
from backend.api.dependencies import get_trading_agents_graph
from backend.core.trading_agents.graph.trading_graph import TradingAgentsGraph
from backend.api.streaming import stream_json_response, stream_multi_agent_analysis
from backend.api.streaming_text import stream_stock_analysis_with_text

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
                        recommendation=(
                            final_decision
                            if final_decision in ["BUY", "SELL", "HOLD"]
                            else "HOLD"
                        ),
                        confidence=0.75,  # Default confidence
                        reasoning=reasoning,
                        key_points=[],
                        source_data={"report": report},
                    )
                )

        # Parse the final decision string (e.g., "BUY", "SELL", "HOLD")
        recommendation = (
            final_decision if final_decision in ["BUY", "SELL", "HOLD"] else "HOLD"
        )

        # Get current price for targets (simplified for now)
        import yfinance as yf

        ticker_data = yf.Ticker(symbol.upper())
        current_price = (
            ticker_data.history(period="1d")["Close"].iloc[-1]
            if not ticker_data.history(period="1d").empty
            else 100.0
        )

        # Calculate simple targets based on recommendation
        target_price = (
            current_price * 1.15 if recommendation == "BUY" else current_price
        )
        stop_loss = (
            current_price * 0.95 if recommendation == "BUY" else current_price * 0.90
        )

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


@router.get("/analyze-stock-stream/{symbol}")
async def analyze_stock_stream(
    symbol: str,
    graph: TradingAgentsGraph = Depends(get_trading_agents_graph),
):
    """
    Stream stock analysis using Server-Sent Events (SSE).

    Returns progressive updates as each agent completes its analysis.

    Events:
    - start: Analysis beginning
    - agent_start: Individual agent starting
    - agent_complete: Individual agent completed
    - synthesis_start: Synthesis phase
    - done: Final results
    - error: Error occurred

    Usage:
        const eventSource = new EventSource('/api/analyze-stock-stream/AAPL');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        };
    """
    trade_date = date.today().isoformat()
    return stream_json_response(stream_multi_agent_analysis(symbol, graph, trade_date))


@router.get("/analyze-stock-stream-text/{symbol}")
async def analyze_stock_stream_text(
    symbol: str,
    graph: TradingAgentsGraph = Depends(get_trading_agents_graph),
):
    """
    Stream stock analysis with REAL-TIME TEXT STREAMING (like ChatGPT).

    Returns progressive updates including:
    - Progress events (agent starting/completing)
    - **Text chunks as they're generated by LLMs**
    - Final results

    Events:
    - start: Analysis beginning
    - agent_start: Agent starting
    - agent_text_start: Agent begins generating text
    - agent_text_chunk: Individual text chunk (word-by-word streaming)
    - agent_text_complete: Agent finished writing
    - agent_complete: Agent done
    - synthesis_start: Synthesis phase
    - done: Final results

    Usage:
        const eventSource = new EventSource('/api/analyze-stock-stream-text/AAPL');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.event === 'agent_text_chunk') {
                // Append chunk to display (streaming text!)
                textElement.textContent += data.chunk;
            }
        };
    """
    trade_date = date.today().isoformat()
    return stream_json_response(
        stream_stock_analysis_with_text(symbol, graph, trade_date)
    )
