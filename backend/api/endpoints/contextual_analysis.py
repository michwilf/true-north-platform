"""
Contextual Analysis Endpoint
Routes analysis requests to appropriate workflows based on context
"""

from fastapi import APIRouter, Depends
from typing import Dict, Any, Literal
from pydantic import BaseModel
from datetime import date

from backend.api.dependencies import get_trading_agents_graph
from backend.core.trading_agents.graph.trading_graph import TradingAgentsGraph
from backend.api.streaming_text import stream_stock_analysis_with_text
from backend.api.streaming import stream_json_response

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

router = APIRouter(prefix="/api", tags=["contextual-analysis"])


class AnalysisContext(BaseModel):
    """Context for analysis request"""

    type: Literal[
        "stock", "portfolio", "market", "opportunity", "trader", "sector", "alert"
    ]
    symbol: str | None = None
    data: Dict[str, Any] | None = None
    page: str | None = None
    panel: str | None = None


@router.post("/analyze-contextual-stream")
async def analyze_contextual_stream(
    context: AnalysisContext,
    graph: TradingAgentsGraph = Depends(get_trading_agents_graph),
):
    """
    Context-aware streaming analysis.
    Routes to appropriate analysis workflow based on context type.
    """
    trade_date = date.today().isoformat()

    logger.info(
        f"🎯 Contextual Analysis Request: type={context.type}, symbol={context.symbol}, page={context.page}, panel={context.panel}"
    )

    # Route based on context type
    if context.type == "stock" or context.type == "opportunity":
        # Stock/Opportunity analysis - deep dive on specific ticker
        symbol = context.symbol or "SPY"
        logger.info(f"📊 Routing to STOCK analysis for {symbol}")
        return stream_json_response(
            stream_stock_analysis_with_text(symbol, graph, trade_date)
        )

    elif context.type == "market":
        # Market regime analysis - focus on SPY + macro indicators
        logger.info(f"🌍 Routing to MARKET analysis (SPY proxy)")
        return stream_json_response(
            stream_market_regime_analysis(graph, trade_date, context.data)
        )

    elif context.type == "portfolio":
        # Portfolio analysis - analyze all holdings
        logger.info(f"💼 Routing to PORTFOLIO analysis")
        return stream_json_response(
            stream_portfolio_analysis(graph, trade_date, context.data)
        )

    elif context.type == "trader":
        # Trader strategy analysis
        trader_id = context.data.get("trader_id") if context.data else None
        logger.info(f"👤 Routing to TRADER analysis for {trader_id}")
        return stream_json_response(
            stream_trader_analysis(graph, trade_date, context.data)
        )

    elif context.type == "sector":
        # Sector analysis
        sector_name = context.data.get("sector") if context.data else None
        logger.info(f"🏭 Routing to SECTOR analysis for {sector_name}")
        return stream_json_response(
            stream_sector_analysis(graph, trade_date, context.data)
        )

    elif context.type == "alert":
        # Alert-based analysis
        symbol = context.symbol or "SPY"
        logger.info(f"🚨 Routing to ALERT analysis for {symbol}")
        return stream_json_response(
            stream_alert_analysis(symbol, graph, trade_date, context.data)
        )

    else:
        # Default to stock analysis
        symbol = context.symbol or "SPY"
        logger.info(
            f"⚠️ Unknown context type, defaulting to STOCK analysis for {symbol}"
        )
        return stream_json_response(
            stream_stock_analysis_with_text(symbol, graph, trade_date)
        )


async def stream_market_regime_analysis(
    graph, trade_date: str, context_data: Dict | None
):
    """Market-specific analysis with macro focus"""
    from backend.api.streaming_text import stream_agent_analysis

    logger.info("🌍 Starting MARKET REGIME analysis...")

    # Use SPY as market proxy
    symbol = "SPY"

    # Custom agents for market analysis
    agents_config = {
        "Macro Economist": {
            "system": "You are a macroeconomist analyzing overall market conditions, Fed policy, interest rates, and economic indicators.",
            "prompt": f"Analyze the current market regime using SPY as a proxy. Focus on: VIX levels, treasury yields, Fed policy, inflation, employment data, and overall economic health. Current context: {context_data}",
        },
        "Market Technician": {
            "system": "You are a technical analyst focused on broad market indices and market breadth indicators.",
            "prompt": f"Analyze SPY technical indicators and market breadth. Include: trend analysis, support/resistance, volume patterns, sector rotation, advance-decline line, and market sentiment indicators.",
        },
        "Risk Analyst": {
            "system": "You are a risk analyst evaluating market volatility and tail risks.",
            "prompt": f"Assess market risk using volatility indicators (VIX, VVIX), put/call ratios, credit spreads, and potential tail risks. Recommend position sizing and hedging strategies.",
        },
        "Sentiment Analyst": {
            "system": "You are a market sentiment analyst tracking investor psychology and positioning.",
            "prompt": f"Analyze market sentiment through: investor surveys, fund flows, insider activity, short interest, social media sentiment, and fear/greed indicators.",
        },
    }

    # Stream analysis
    agent_results = {}
    total_agents = len(agents_config)

    yield {
        "event": "start",
        "symbol": "MARKET",
        "message": "Starting market regime analysis",
        "timestamp": trade_date,
    }

    for i, (agent_name, config) in enumerate(agents_config.items()):
        progress = (i / total_agents) * 100
        yield {"event": "agent_start", "agent": agent_name, "progress": progress}

        logger.info(f"🤖 Running {agent_name} for market analysis...")

        full_text = ""
        async for text_event in stream_agent_analysis(
            agent_name=agent_name,
            system_prompt=config["system"],
            user_prompt=config["prompt"],
        ):
            yield text_event
            if text_event["event"] == "agent_text_complete":
                full_text = text_event["full_text"]

        agent_results[agent_name.lower().replace(" ", "_")] = full_text

        progress = ((i + 1) / total_agents) * 100
        yield {"event": "agent_complete", "agent": agent_name, "progress": progress}

    # Synthesis
    yield {"event": "synthesis_start", "message": "Synthesizing market outlook..."}

    synthesis_prompt = f"""
Based on analysis from Macro Economist, Market Technician, Risk Analyst, and Sentiment Analyst, provide:
1. Current market regime (Bull/Bear/Neutral)
2. Key risks and opportunities
3. Recommended strategy (Risk-On, Risk-Off, Balanced)
4. Position sizing guidance
5. Sectors to favor/avoid

Agent reports:
- Macro: {agent_results.get('macro_economist', '')[:300]}...
- Technical: {agent_results.get('market_technician', '')[:300]}...
- Risk: {agent_results.get('risk_analyst', '')[:300]}...
- Sentiment: {agent_results.get('sentiment_analyst', '')[:300]}...
"""

    synthesis_text = ""
    async for synthesis_event in stream_agent_analysis(
        agent_name="Chief Strategist",
        system_prompt="You are a Chief Market Strategist providing actionable market guidance.",
        user_prompt=synthesis_prompt,
    ):
        yield synthesis_event
        if synthesis_event["event"] == "agent_text_complete":
            synthesis_text = synthesis_event["full_text"]

    # Determine market stance
    recommendation = "NEUTRAL"
    if "RISK-ON" in synthesis_text.upper() or "BULLISH" in synthesis_text.upper():
        recommendation = "RISK_ON"
    elif "RISK-OFF" in synthesis_text.upper() or "BEARISH" in synthesis_text.upper():
        recommendation = "RISK_OFF"

    yield {
        "event": "done",
        "symbol": "MARKET",
        "recommendation": recommendation,
        "overall_recommendation": recommendation,
        "confidence": 0.75,
        "agent_reports": agent_results,
        "debate_summary": synthesis_text,
        "synthesis": synthesis_text,
        "timestamp": trade_date,
        "context_type": "market",
    }


async def stream_portfolio_analysis(graph, trade_date: str, context_data: Dict | None):
    """Portfolio-specific analysis"""
    logger.info("💼 Starting PORTFOLIO analysis...")

    # Get holdings from context
    holdings = context_data.get("holdings", []) if context_data else []

    yield {
        "event": "start",
        "symbol": "PORTFOLIO",
        "message": f"Analyzing portfolio with {len(holdings)} holdings",
        "timestamp": trade_date,
    }

    # Analyze portfolio composition, diversification, risk, etc.
    # For now, use generic analysis
    from backend.api.streaming_text import stream_stock_analysis_with_text

    # Analyze as a portfolio (could enhance with multi-stock analysis)
    async for event in stream_stock_analysis_with_text("SPY", graph, trade_date):
        # Modify context for portfolio
        if event.get("event") == "done":
            event["context_type"] = "portfolio"
            event["symbol"] = "PORTFOLIO"
        yield event


async def stream_trader_analysis(graph, trade_date: str, context_data: Dict | None):
    """Trader strategy analysis"""
    logger.info("👤 Starting TRADER analysis...")

    trader_info = context_data or {}

    yield {
        "event": "start",
        "symbol": "TRADER",
        "message": f"Analyzing trader strategy",
        "timestamp": trade_date,
    }

    # Analyze trader's performance, strategy, risk profile
    # For now, basic implementation
    from backend.api.streaming_text import stream_stock_analysis_with_text

    async for event in stream_stock_analysis_with_text("SPY", graph, trade_date):
        if event.get("event") == "done":
            event["context_type"] = "trader"
            event["symbol"] = "TRADER"
        yield event


async def stream_sector_analysis(graph, trade_date: str, context_data: Dict | None):
    """Sector-specific analysis"""
    logger.info("🏭 Starting SECTOR analysis...")

    sector_info = context_data or {}
    sector_name = sector_info.get("sector", "Technology")

    yield {
        "event": "start",
        "symbol": sector_name,
        "message": f"Analyzing {sector_name} sector",
        "timestamp": trade_date,
    }

    # Analyze sector trends, top stocks, rotation signals
    from backend.api.streaming_text import stream_stock_analysis_with_text

    async for event in stream_stock_analysis_with_text(
        "XLK", graph, trade_date
    ):  # Tech ETF as proxy
        if event.get("event") == "done":
            event["context_type"] = "sector"
            event["symbol"] = sector_name
        yield event


async def stream_alert_analysis(
    symbol: str, graph, trade_date: str, context_data: Dict | None
):
    """Alert-based analysis with context"""
    logger.info(f"🚨 Starting ALERT analysis for {symbol}...")

    alert_info = context_data or {}

    yield {
        "event": "start",
        "symbol": symbol,
        "message": f"Analyzing {symbol} alert: {alert_info.get('alert_type', 'Price Alert')}",
        "timestamp": trade_date,
    }

    # Analyze with alert context
    from backend.api.streaming_text import stream_stock_analysis_with_text

    async for event in stream_stock_analysis_with_text(symbol, graph, trade_date):
        if event.get("event") == "done":
            event["context_type"] = "alert"
            event["alert_info"] = alert_info
        yield event
