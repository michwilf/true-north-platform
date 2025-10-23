"""
Server-Sent Events (SSE) streaming support for FastAPI
Enables progressive rendering of multi-agent analyses
"""

from fastapi.responses import StreamingResponse
from typing import AsyncGenerator, Dict, Any
import json
import asyncio


async def stream_json_response(data_generator: AsyncGenerator[Dict[str, Any], None]) -> StreamingResponse:
    """
    Stream JSON data as Server-Sent Events (SSE).
    
    Usage:
        async def generate_data():
            yield {"event": "start", "data": "Starting analysis..."}
            yield {"event": "agent_complete", "data": {...}}
            yield {"event": "done", "data": {...}}
        
        return stream_json_response(generate_data())
    """
    async def event_stream():
        try:
            async for data in data_generator:
                # Format as SSE: data: {json}\n\n
                json_data = json.dumps(data)
                yield f"data: {json_data}\n\n"
                
                # Small delay to ensure client receives data
                await asyncio.sleep(0.01)
        except Exception as e:
            # Send error event
            error_data = json.dumps({
                "event": "error",
                "message": str(e)
            })
            yield f"data: {error_data}\n\n"
    
    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disable nginx buffering
        }
    )


async def stream_multi_agent_analysis(
    symbol: str,
    trading_agents_graph,
    trade_date: str
) -> AsyncGenerator[Dict[str, Any], None]:
    """
    Stream multi-agent stock analysis progressively.
    
    Emits events:
    - start: Analysis beginning
    - agent_start: Individual agent starting
    - agent_complete: Individual agent finished
    - synthesis_start: Synthesis beginning
    - done: Final result
    """
    try:
        yield {
            "event": "start",
            "symbol": symbol,
            "message": f"Starting multi-agent analysis for {symbol}",
            "timestamp": trade_date
        }
        
        # Mock individual agent updates (we'll enhance this later)
        agents = ["Market Analyst", "Social Analyst", "News Analyst", "Fundamentals Analyst"]
        
        for i, agent_name in enumerate(agents):
            yield {
                "event": "agent_start",
                "agent": agent_name,
                "progress": (i / len(agents)) * 100
            }
            
            # Simulate agent work (replace with actual agent execution)
            await asyncio.sleep(0.5)
            
            yield {
                "event": "agent_complete",
                "agent": agent_name,
                "progress": ((i + 1) / len(agents)) * 100,
                "status": "complete"
            }
        
        # Run actual analysis
        yield {
            "event": "synthesis_start",
            "message": "Synthesizing agent reports..."
        }
        
        final_state, final_decision = trading_agents_graph.propagate(symbol.upper(), trade_date)
        
        # Extract analysis results
        agent_reports = {
            "market_analyst": final_state.get("market_report", ""),
            "social_analyst": final_state.get("sentiment_report", ""),
            "news_analyst": final_state.get("news_report", ""),
            "fundamentals_analyst": final_state.get("fundamentals_report", ""),
        }
        
        debate_summary = final_state.get("investment_plan", "")
        
        # Get price data
        import yfinance as yf
        ticker_data = yf.Ticker(symbol.upper())
        current_price = (
            ticker_data.history(period="1d")["Close"].iloc[-1]
            if not ticker_data.history(period="1d").empty
            else 100.0
        )
        
        recommendation = (
            final_decision if final_decision in ["BUY", "SELL", "HOLD"] else "HOLD"
        )
        
        target_price = current_price * 1.15 if recommendation == "BUY" else current_price
        stop_loss = current_price * 0.95 if recommendation == "BUY" else current_price * 0.90
        
        # Send final result
        yield {
            "event": "done",
            "symbol": symbol.upper(),
            "recommendation": recommendation,
            "confidence": 0.75,
            "target_price": float(target_price),
            "stop_loss": float(stop_loss),
            "current_price": float(current_price),
            "agent_reports": agent_reports,
            "debate_summary": debate_summary,
            "timestamp": trade_date
        }
        
    except Exception as e:
        yield {
            "event": "error",
            "symbol": symbol,
            "message": str(e)
        }


async def stream_market_regime_analysis(
    regime_detector,
    macro_agent,
    technical_agent,
    sentiment_agent
) -> AsyncGenerator[Dict[str, Any], None]:
    """
    Stream market regime analysis progressively.
    """
    try:
        yield {
            "event": "start",
            "message": "Starting market regime analysis"
        }
        
        # Step 1: Get regime data
        yield {
            "event": "fetching_data",
            "message": "Fetching market regime data..."
        }
        
        regime_data = await regime_detector.detect_market_regime()
        
        yield {
            "event": "data_ready",
            "regime": regime_data.get("volatility_regime"),
            "trend": regime_data.get("market_trend")
        }
        
        # Step 2: Run agents
        agents = [
            ("Macro Economist", macro_agent),
            ("Market Technician", technical_agent),
            ("Sentiment Analyst", sentiment_agent)
        ]
        
        agent_results = []
        
        for i, (name, agent) in enumerate(agents):
            yield {
                "event": "agent_start",
                "agent": name,
                "progress": (i / len(agents)) * 100
            }
            
            result = await agent.analyze(regime_data)
            agent_results.append(result)
            
            yield {
                "event": "agent_complete",
                "agent": name,
                "progress": ((i + 1) / len(agents)) * 100,
                "confidence": result.get("confidence", 0.75)
            }
        
        # Step 3: Synthesis
        yield {
            "event": "synthesis",
            "message": "Synthesizing insights..."
        }
        
        # Send final result
        yield {
            "event": "done",
            "regime_data": regime_data,
            "agent_analyses": agent_results
        }
        
    except Exception as e:
        yield {
            "event": "error",
            "message": str(e)
        }


async def stream_portfolio_analysis(
    portfolio_tracker,
    portfolio_manager,
    risk_analyst,
    performance_analyst
) -> AsyncGenerator[Dict[str, Any], None]:
    """
    Stream portfolio analysis progressively.
    """
    try:
        yield {
            "event": "start",
            "message": "Starting portfolio analysis"
        }
        
        # Get portfolio data
        positions = portfolio_tracker.get_positions()
        metrics = portfolio_tracker.calculate_metrics()
        
        yield {
            "event": "data_ready",
            "total_value": metrics.get("total_value", 0),
            "positions_count": len(positions)
        }
        
        # Run agents
        agents = [
            ("Portfolio Manager", portfolio_manager, metrics, None, positions),
            ("Risk Analyst", risk_analyst, metrics, positions),
            ("Performance Analyst", performance_analyst, metrics, positions)
        ]
        
        agent_results = []
        
        for i, agent_data in enumerate(agents):
            name = agent_data[0]
            agent = agent_data[1]
            
            yield {
                "event": "agent_start",
                "agent": name,
                "progress": (i / len(agents)) * 100
            }
            
            # Call appropriate analyze method based on agent
            if name == "Portfolio Manager":
                result = await agent.analyze(agent_data[2], agent_data[3], agent_data[4])
            else:
                result = await agent.analyze(agent_data[2], agent_data[3])
            
            agent_results.append(result)
            
            yield {
                "event": "agent_complete",
                "agent": name,
                "progress": ((i + 1) / len(agents)) * 100,
                "confidence": result.get("confidence", 0.75)
            }
        
        # Send final result
        yield {
            "event": "done",
            "metrics": metrics,
            "agent_analyses": agent_results
        }
        
    except Exception as e:
        yield {
            "event": "error",
            "message": str(e)
        }

