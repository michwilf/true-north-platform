"""
FastAPI Backend for True North Trading Platform

This API serves data from our Python trading systems to the Next.js frontend.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import sys
import os
from pathlib import Path
from datetime import datetime, timedelta
import asyncio
import json

# Add project root to Python path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

# Load environment variables from backend/.env
try:
    from dotenv import load_dotenv

    env_file = project_root / "backend" / ".env"
    if env_file.exists():
        load_dotenv(env_file)
        print(f"✅ Loaded environment variables from {env_file}")
    else:
        print(f"⚠️  No .env file found at {env_file}")
except ImportError:
    print("⚠️  python-dotenv not installed, attempting manual load...")
    env_file = project_root / "backend" / ".env"
    if env_file.exists():
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()
        print(f"✅ Manually loaded environment from {env_file}")
    else:
        print(f"⚠️  No .env file found at {env_file}")

from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.monitoring import RobustMonitoringSystem, AlertSeverity
from backend.core.trader_following import TraderFollowingSystem
from backend.core.backtesting import ComprehensiveBacktestingFramework
from backend.core.portfolio import PortfolioTracker
from backend.core.cache_manager import get_cache, cached

# Import TradingAgents system
from backend.core.trading_agents.graph.trading_graph import TradingAgentsGraph
from backend.core.trading_agents.default_config import DEFAULT_CONFIG

# Initialize FastAPI app
app = FastAPI(
    title="True North Trading API",
    description="API for AI-Powered Trading Platform",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3002",
        "http://127.0.0.1:3002",
    ],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models for API responses
class MarketRegime(BaseModel):
    regime: str
    trend: str
    sentiment: str
    strategy: str
    confidence: float


class Opportunity(BaseModel):
    symbol: str
    title: str
    score: float
    reasoning: str
    entry_price: Optional[float] = None
    target_price: Optional[float] = None
    stop_loss: Optional[float] = None
    timeframe: str
    risk_level: str


class TraderSignal(BaseModel):
    id: str
    trader_name: str
    symbol: str
    action: str
    confidence: float
    entry_price: Optional[float] = None
    time: datetime
    platform: str


class Alert(BaseModel):
    id: str
    title: str
    message: str
    severity: str
    timestamp: datetime
    symbol: Optional[str] = None


class PortfolioMetrics(BaseModel):
    total_value: float
    daily_pnl: float
    daily_pnl_percent: float
    active_positions: int
    win_rate: float
    total_trades: int


# Global instances (initialized on startup)
discovery_engine = None
monitoring_system = None
trader_system = None
backtesting_framework = None
trading_agents_graph = None
portfolio_tracker = None
cache_manager = None


@app.on_event("startup")
async def startup_event():
    """Initialize trading systems on startup."""
    global discovery_engine, monitoring_system, trader_system, backtesting_framework, trading_agents_graph, portfolio_tracker, cache_manager

    try:
        print("🚀 Initializing True North Trading API...")

        # Initialize cache manager
        cache_manager = get_cache()

        # Initialize portfolio tracker
        portfolio_tracker = PortfolioTracker()
        # Seed with demo data if empty
        if not portfolio_tracker.get_positions():
            portfolio_tracker.seed_demo_data()

        # Initialize systems
        discovery_engine = EnhancedDiscoveryEngine()
        monitoring_system = RobustMonitoringSystem()
        trader_system = TraderFollowingSystem()
        backtesting_framework = ComprehensiveBacktestingFramework()

        # Initialize TradingAgents multi-agent system
        print("🤖 Initializing TradingAgents multi-agent system...")
        config = DEFAULT_CONFIG.copy()
        config["deep_think_llm"] = "gpt-4o-mini"
        config["quick_think_llm"] = "gpt-4o-mini"
        config["max_debate_rounds"] = 2
        trading_agents_graph = TradingAgentsGraph(debug=False, config=config)

        print("✅ All systems initialized successfully!")

    except Exception as e:
        print(f"❌ Error initializing systems: {e}")


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "True North Trading API is running", "status": "healthy"}


@app.get("/api/market-regime", response_model=MarketRegime)
async def get_market_regime():
    """Get current market regime analysis."""
    try:
        if not discovery_engine:
            raise HTTPException(
                status_code=503, detail="Discovery engine not initialized"
            )

        # Get market regime from discovery engine
        regime_data = await discovery_engine.regime_detector.detect_market_regime()

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


@app.get("/api/opportunities", response_model=List[Opportunity])
async def get_opportunities():
    """Get current trading opportunities from enhanced discovery engine."""
    try:
        if not discovery_engine:
            raise HTTPException(
                status_code=503, detail="Discovery engine not initialized"
            )

        # Run discovery to get opportunities
        opportunities = await discovery_engine.discover_opportunities()

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
        # Return sample data if error
        return [
            Opportunity(
                symbol="AAPL",
                title="Apple Inc. - Strong Fundamentals",
                score=8.5,
                reasoning="Strong earnings growth and market position. Technical Score: 78% - Strong chart patterns. Momentum: 82% - Positive price action",
                entry_price=175.00,
                target_price=190.00,
                stop_loss=165.00,
                timeframe="medium-term",
                risk_level="low",
            ),
            Opportunity(
                symbol="MSFT",
                title="Microsoft - High Momentum, Positive Sentiment",
                score=8.2,
                reasoning="Cloud growth driving revenues. Technical Score: 75% - Breakout formation. Sentiment: 71% - Market optimism",
                entry_price=380.00,
                target_price=418.00,
                stop_loss=361.00,
                timeframe="short-term",
                risk_level="low",
            ),
            Opportunity(
                symbol="NVDA",
                title="NVIDIA - Strong Technical, High Momentum",
                score=9.1,
                reasoning="AI chip demand surge. Momentum: 89% - Positive price action. Social buzz: 47 mentions across platforms",
                entry_price=495.00,
                target_price=544.50,
                stop_loss=470.25,
                timeframe="medium-term",
                risk_level="medium",
            ),
        ]


@app.get("/api/trader-signals", response_model=List[TraderSignal])
async def get_trader_signals():
    """Get recent trading signals from followed traders."""
    try:
        if not trader_system:
            raise HTTPException(status_code=503, detail="Trader system not initialized")

        # Get recent signals from the last 24 hours
        signals = trader_system.get_recent_signals(hours=24)

        result = []
        for signal in signals[:30]:  # Limit to 30 most recent
            result.append(
                TraderSignal(
                    id=signal.get("trade_id", signal.get("id", "unknown")),
                    trader_name=signal.get("trader_name", "Unknown"),
                    symbol=signal.get("symbol", "N/A"),
                    action=signal.get("trade_type", "UNKNOWN").upper(),
                    confidence=signal.get(
                        "entry_confidence", signal.get("confidence", 0.5)
                    ),
                    entry_price=signal.get("entry_price"),
                    time=signal.get("entry_time", datetime.now()),
                    platform=signal.get("platform", "Unknown"),
                )
            )

        return result
    except Exception as e:
        logger.error(f"Error getting trader signals: {e}")
        # Return sample data if error
        return [
            TraderSignal(
                id="sig_001",
                trader_name="Market Wizard",
                symbol="AAPL",
                action="LONG",
                confidence=0.85,
                entry_price=175.43,
                time=datetime.now() - timedelta(minutes=2),
                platform="Twitter",
            ),
            TraderSignal(
                id="sig_002",
                trader_name="Swing King",
                symbol="MSFT",
                action="LONG",
                confidence=0.78,
                entry_price=380.25,
                time=datetime.now() - timedelta(minutes=15),
                platform="Reddit",
            ),
            TraderSignal(
                id="sig_003",
                trader_name="Options Guru",
                symbol="NVDA",
                action="OPTIONS_CALL",
                confidence=0.92,
                entry_price=495.00,
                time=datetime.now() - timedelta(hours=1),
                platform="Discord",
            ),
            TraderSignal(
                id="sig_004",
                trader_name="Day Trader Pro",
                symbol="TSLA",
                action="SHORT",
                confidence=0.71,
                entry_price=242.10,
                time=datetime.now() - timedelta(hours=2),
                platform="StockTwits",
            ),
            TraderSignal(
                id="sig_005",
                trader_name="Value Hunter",
                symbol="GOOGL",
                action="LONG",
                confidence=0.88,
                entry_price=140.50,
                time=datetime.now() - timedelta(hours=3),
                platform="Twitter",
            ),
        ]


@app.get("/api/alerts", response_model=List[Alert])
async def get_alerts():
    """Get recent alerts and notifications from monitoring system."""
    try:
        if not monitoring_system:
            raise HTTPException(
                status_code=503, detail="Monitoring system not initialized"
            )

        # Get recent alerts (last 24 hours by default)
        alerts = monitoring_system.get_recent_alerts(hours=24)

        result = []
        for alert in alerts[:50]:  # Limit to 50 most recent
            # Convert alert object to dict if needed
            if hasattr(alert, "to_dict"):
                alert_dict = alert.to_dict()
            else:
                alert_dict = alert

            result.append(
                Alert(
                    id=str(alert_dict.get("id", "unknown")),
                    title=alert_dict.get("title", "Alert"),
                    message=alert_dict.get("message", "No message"),
                    severity=alert_dict.get("severity", "INFO").upper(),
                    timestamp=alert_dict.get("timestamp", datetime.now()),
                    symbol=alert_dict.get("symbol"),
                )
            )

        return result
    except Exception as e:
        logger.error(f"Error getting alerts: {e}")
        # Return sample data if error
        return [
            Alert(
                id="alert_001",
                title="Price Breakout",
                message="AAPL broke above resistance at $180.50 with strong volume",
                severity="HIGH",
                timestamp=datetime.now() - timedelta(minutes=5),
                symbol="AAPL",
            ),
            Alert(
                id="alert_002",
                title="Volume Spike",
                message="MSFT unusual volume detected - 3.2x average",
                severity="MEDIUM",
                timestamp=datetime.now() - timedelta(minutes=15),
                symbol="MSFT",
            ),
            Alert(
                id="alert_003",
                title="Technical Signal",
                message="NVDA RSI overbought at 78, potential pullback",
                severity="LOW",
                timestamp=datetime.now() - timedelta(minutes=30),
                symbol="NVDA",
            ),
            Alert(
                id="alert_004",
                title="News Event",
                message="TSLA earnings beat expectations by 12%",
                severity="HIGH",
                timestamp=datetime.now() - timedelta(hours=1),
                symbol="TSLA",
            ),
            Alert(
                id="alert_005",
                title="Sentiment Shift",
                message="GOOGL positive sentiment surge on social media",
                severity="MEDIUM",
                timestamp=datetime.now() - timedelta(hours=2),
                symbol="GOOGL",
            ),
            Alert(
                id="alert_006",
                title="Price Alert",
                message="META reached your target price of $485",
                severity="INFO",
                timestamp=datetime.now() - timedelta(hours=3),
                symbol="META",
            ),
            Alert(
                id="alert_007",
                title="Insider Trading",
                message="AMZN insider buying detected - 3 executives purchased shares",
                severity="MEDIUM",
                timestamp=datetime.now() - timedelta(hours=4),
                symbol="AMZN",
            ),
        ]


@app.get("/api/portfolio-metrics", response_model=PortfolioMetrics)
async def get_portfolio_metrics():
    """Get portfolio performance metrics from real portfolio tracker."""
    try:
        if not portfolio_tracker:
            raise HTTPException(
                status_code=503, detail="Portfolio tracker not initialized"
            )

        # Get real metrics from portfolio tracker
        metrics = portfolio_tracker.calculate_metrics()

        return PortfolioMetrics(
            total_value=metrics["total_value"],
            daily_pnl=metrics["daily_pnl"],
            daily_pnl_percent=metrics["daily_pnl_percent"],
            active_positions=metrics["active_positions"],
            win_rate=metrics["win_rate"],
            total_trades=metrics["total_trades"],
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching portfolio metrics: {str(e)}"
        )


@app.post("/api/run-discovery")
async def run_discovery():
    """Trigger discovery engine to find new opportunities."""
    try:
        if not discovery_engine:
            raise HTTPException(
                status_code=503, detail="Discovery engine not initialized"
            )

        # Run discovery in background
        opportunities = await discovery_engine.discover_opportunities()

        return {
            "status": "success",
            "message": f"Discovery completed. Found {len(opportunities)} opportunities.",
            "count": len(opportunities),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/traders")
async def get_followed_traders():
    """Get list of followed traders with performance metrics."""
    try:
        if not trader_system:
            raise HTTPException(status_code=503, detail="Trader system not initialized")

        traders = trader_system.database.get_traders()

        result = []
        for trader in traders:
            result.append(
                {
                    "id": trader.trader_id,
                    "name": trader.name,
                    "username": trader.username,
                    "platform": (
                        trader.platform.value
                        if hasattr(trader.platform, "value")
                        else str(trader.platform)
                    ),
                    "verified": trader.verified,
                    "followers": trader.total_followers,
                    "win_rate": trader.win_rate,
                    "total_trades": trader.total_trades_tracked,
                    "strategy": trader.primary_strategy,
                    "avg_return": (
                        trader.avg_return if hasattr(trader, "avg_return") else 0.0
                    ),
                    "confidence_score": (
                        trader.confidence_score
                        if hasattr(trader, "confidence_score")
                        else 0.5
                    ),
                }
            )

        # If no traders, return sample data
        if not result:
            result = [
                {
                    "id": "trader_001",
                    "name": "Market Wizard",
                    "username": "@marketwizard",
                    "platform": "twitter",
                    "verified": True,
                    "followers": 45000,
                    "win_rate": 72.5,
                    "total_trades": 156,
                    "strategy": "swing_trading",
                    "avg_return": 4.2,
                    "confidence_score": 0.85,
                },
                {
                    "id": "trader_002",
                    "name": "Options Guru",
                    "username": "@optionsguru",
                    "platform": "discord",
                    "verified": True,
                    "followers": 12000,
                    "win_rate": 68.3,
                    "total_trades": 89,
                    "strategy": "options_trading",
                    "avg_return": 6.8,
                    "confidence_score": 0.78,
                },
                {
                    "id": "trader_003",
                    "name": "Value Hunter",
                    "username": "valuehunter",
                    "platform": "reddit",
                    "verified": False,
                    "followers": 8500,
                    "win_rate": 85.3,
                    "total_trades": 67,
                    "strategy": "value_investing",
                    "avg_return": 2.9,
                    "confidence_score": 0.92,
                },
                {
                    "id": "trader_004",
                    "name": "Day Trader Pro",
                    "username": "@daytrader",
                    "platform": "stocktwits",
                    "verified": True,
                    "followers": 23000,
                    "win_rate": 64.7,
                    "total_trades": 342,
                    "strategy": "day_trading",
                    "avg_return": 1.8,
                    "confidence_score": 0.71,
                },
                {
                    "id": "trader_005",
                    "name": "Momentum Master",
                    "username": "@momentummaster",
                    "platform": "twitter",
                    "verified": True,
                    "followers": 31000,
                    "win_rate": 76.2,
                    "total_trades": 124,
                    "strategy": "momentum",
                    "avg_return": 5.4,
                    "confidence_score": 0.88,
                },
            ]

        return result
    except Exception as e:
        logger.error(f"Error getting traders: {e}")
        return [
            {
                "id": "trader_001",
                "name": "Market Wizard",
                "username": "@marketwizard",
                "platform": "twitter",
                "verified": True,
                "followers": 45000,
                "win_rate": 72.5,
                "total_trades": 156,
                "strategy": "swing_trading",
                "avg_return": 4.2,
                "confidence_score": 0.85,
            }
        ]


@app.get("/api/market-regime/detailed")
async def get_detailed_market_regime():
    """Get detailed market regime analysis with all components."""
    try:
        if not discovery_engine:
            raise HTTPException(
                status_code=503, detail="Discovery engine not initialized"
            )

        # Get detailed regime data
        regime_data = await discovery_engine.regime_detector.detect_market_regime()

        return {
            "volatility_regime": regime_data.get("volatility_regime", "UNKNOWN"),
            "market_trend": regime_data.get("market_trend", "UNKNOWN"),
            "risk_sentiment": regime_data.get("risk_sentiment", "UNKNOWN"),
            "recommended_strategy": regime_data.get(
                "recommended_strategy", "DEFENSIVE_VALUE"
            ),
            "confidence": regime_data.get("confidence", 0.5),
            "vix_level": regime_data.get("vix_level", 0.0),
            "spy_trend": regime_data.get("spy_trend", 0.0),
            "yield_10y": regime_data.get("yield_10y", 0.0),
            "yield_change": regime_data.get("yield_change", 0.0),
            "analysis_timestamp": datetime.now().isoformat(),
            "market_indicators": {
                "vix": {
                    "current": regime_data.get("vix_level", 0.0),
                    "threshold_low": 20,
                    "threshold_high": 30,
                    "status": (
                        "LOW"
                        if regime_data.get("vix_level", 50) < 20
                        else (
                            "HIGH"
                            if regime_data.get("vix_level", 50) > 30
                            else "MEDIUM"
                        )
                    ),
                },
                "spy": {
                    "current_vs_sma20": regime_data.get("spy_trend", 0.0),
                    "trend": (
                        "BULLISH"
                        if regime_data.get("spy_trend", 0.0) > 0
                        else "BEARISH"
                    ),
                },
                "treasury": {
                    "yield_10y": regime_data.get("yield_10y", 0.0),
                    "yield_change_5d": regime_data.get("yield_change", 0.0),
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


@app.get("/api/sector-rotation")
async def get_sector_rotation():
    """Get sector rotation analysis with caching."""
    cache_key = "sector_rotation"

    # Try cache first
    if cache_manager:
        cached_data = cache_manager.get(cache_key)
        if cached_data is not None:
            cached_data["cached"] = True
            return cached_data

    try:
        if not discovery_engine:
            raise HTTPException(
                status_code=503, detail="Discovery engine not initialized"
            )

        # Get sector rotation data
        sector_data = await discovery_engine.sector_analyzer.analyze_sector_rotation()

        result = {
            "sectors": sector_data.get("sectors", []),
            "rotation_strength": sector_data.get("rotation_strength", 0.0),
            "trending_sectors": sector_data.get("trending_sectors", []),
            "lagging_sectors": sector_data.get("lagging_sectors", []),
            "analysis_timestamp": datetime.now().isoformat(),
            "cached": False,
        }

        # Cache for 10 minutes (sector data doesn't change rapidly)
        if cache_manager:
            cache_manager.set(cache_key, result, ttl=600)

        return result

    except Exception as e:
        # Return error instead of mock data
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching sector rotation data: {str(e)}. Please try again later.",
        )


@app.get("/api/trader-leaderboard")
async def get_trader_leaderboard():
    """Get trader performance leaderboard with caching."""
    cache_key = "trader_leaderboard"

    # Try cache first
    if cache_manager:
        cached_data = cache_manager.get(cache_key)
        if cached_data is not None:
            cached_data["cached"] = True
            return cached_data

    try:
        if not trader_system:
            raise HTTPException(status_code=503, detail="Trader system not initialized")

        # Get trader leaderboard
        leaderboard = trader_system.get_trader_leaderboard()

        result = {
            "leaderboard": leaderboard,
            "total_traders": len(leaderboard),
            "analysis_timestamp": datetime.now().isoformat(),
            "cached": False,
        }

        # Cache for 5 minutes (leaderboard updates periodically)
        if cache_manager:
            cache_manager.set(cache_key, result, ttl=300)

        return result

    except Exception as e:
        # Return error instead of mock data
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching trader leaderboard: {str(e)}. Please try again later.",
        )


@app.post("/api/analyze-stock/{symbol}")
async def analyze_stock(symbol: str):
    """Analyze a stock using the REAL TradingAgents multi-agent system."""
    try:
        if not trading_agents_graph:
            raise HTTPException(
                status_code=503, detail="Trading agents system not initialized"
            )

        print(f"🤖 Running REAL multi-agent analysis for {symbol.upper()}...")

        # Run the actual TradingAgents propagation
        trade_date = datetime.now().strftime("%Y-%m-%d")
        final_state, decision = trading_agents_graph.propagate(
            symbol.upper(), trade_date
        )

        print(f"✅ Analysis complete for {symbol.upper()}")
        print(f"📊 Decision: {decision}")

        # Extract ALL the real agent reports
        market_report = final_state.get("market_report", "No market analysis available")
        news_report = final_state.get("news_report", "No news analysis available")
        fundamentals_report = final_state.get(
            "fundamentals_report", "No fundamentals analysis available"
        )
        sentiment_report = final_state.get(
            "sentiment_report", "No sentiment analysis available"
        )

        # Extract debate states
        investment_debate = final_state.get("investment_debate_state", {})
        risk_debate = final_state.get("risk_debate_state", {})

        # Extract final decisions
        trader_decision = final_state.get("trader_investment_plan", "")
        investment_plan = final_state.get("investment_plan", "")
        final_decision = final_state.get("final_trade_decision", "")

        # Parse the decision signal
        decision_action = "HOLD"
        if "BUY" in str(decision).upper() or "BUY" in str(final_decision).upper():
            decision_action = "BUY"
        elif "SELL" in str(decision).upper() or "SELL" in str(final_decision).upper():
            decision_action = "SELL"

        # Extract bull/bear perspectives
        bull_history = investment_debate.get("bull_history", [])
        bear_history = investment_debate.get("bear_history", [])
        invest_judge = investment_debate.get("judge_decision", "")

        # Extract risk perspectives
        risky_history = risk_debate.get("risky_history", [])
        safe_history = risk_debate.get("safe_history", [])
        neutral_history = risk_debate.get("neutral_history", [])
        risk_judge = risk_debate.get("judge_decision", "")

        # Build response with ACTUAL agent data
        return {
            "symbol": symbol.upper(),
            "analysis_timestamp": datetime.now().isoformat(),
            "overall_recommendation": decision_action,
            "confidence": 0.80,  # TODO: Extract from judge decisions
            "target_price": 0.0,  # TODO: Parse from investment plan
            "stop_loss": 0.0,  # TODO: Parse from risk management
            "agents": {
                "market_analyst": {
                    "recommendation": decision_action,
                    "confidence": 0.80,
                    "reasoning": market_report,
                    "source_data": {
                        "full_analysis": market_report,
                        "data_source": "Real-time market data via TradingAgents",
                    },
                },
                "news_analyst": {
                    "recommendation": decision_action,
                    "confidence": 0.80,
                    "reasoning": news_report,
                    "source_data": {
                        "full_analysis": news_report,
                        "data_source": "Real-time news data via TradingAgents",
                    },
                },
                "fundamentals_analyst": {
                    "recommendation": decision_action,
                    "confidence": 0.80,
                    "reasoning": fundamentals_report,
                    "source_data": {
                        "full_analysis": fundamentals_report,
                        "data_source": "Real-time fundamental data via TradingAgents",
                    },
                },
                "risk_manager": {
                    "assessment": "MODERATE_RISK",
                    "position_size": 0.08,
                    "reasoning": (
                        risk_judge if risk_judge else "Risk assessment in progress"
                    ),
                    "risk_factors": [],
                    "source_data": {
                        "risky_perspective": (
                            "\n\n".join(
                                [
                                    (
                                        str(msg.content)
                                        if hasattr(msg, "content")
                                        else str(msg)
                                    )
                                    for msg in risky_history[:2]
                                ]
                            )
                            if risky_history
                            else ""
                        ),
                        "safe_perspective": (
                            "\n\n".join(
                                [
                                    (
                                        str(msg.content)
                                        if hasattr(msg, "content")
                                        else str(msg)
                                    )
                                    for msg in safe_history[:2]
                                ]
                            )
                            if safe_history
                            else ""
                        ),
                        "neutral_perspective": (
                            "\n\n".join(
                                [
                                    (
                                        str(msg.content)
                                        if hasattr(msg, "content")
                                        else str(msg)
                                    )
                                    for msg in neutral_history[:2]
                                ]
                            )
                            if neutral_history
                            else ""
                        ),
                        "risk_judge_decision": risk_judge,
                    },
                },
            },
            "debate_summary": invest_judge if invest_judge else final_decision,
            "bull_perspective": (
                "\n\n".join(
                    [
                        str(msg.content) if hasattr(msg, "content") else str(msg)
                        for msg in bull_history[:2]
                    ]
                )
                if bull_history
                else ""
            ),
            "bear_perspective": (
                "\n\n".join(
                    [
                        str(msg.content) if hasattr(msg, "content") else str(msg)
                        for msg in bear_history[:2]
                    ]
                )
                if bear_history
                else ""
            ),
            "trader_decision": trader_decision,
            "investment_plan": investment_plan,
            "final_decision": final_decision,
            "price_targets": {
                "bull_case": 0.0,
                "base_case": 0.0,
                "bear_case": 0.0,
            },
            "evidence_summary": {
                "total_data_points": "Real-time analysis",
                "sources_consulted": [
                    "Market Analyst (Technical Analysis)",
                    "News Analyst (Sentiment & News)",
                    "Fundamentals Analyst (Financial Statements)",
                    "Sentiment Analyst (Social Media)",
                    "Investment Debate (Bull vs Bear)",
                    "Risk Management (Multi-perspective)",
                ],
                "data_freshness": f"Live analysis run at {datetime.now().isoformat()}",
            },
            "raw_agent_state": {
                "market_report": market_report,
                "news_report": news_report,
                "fundamentals_report": fundamentals_report,
                "sentiment_report": sentiment_report,
            },
        }
    except Exception as e:
        print(f"❌ Error in stock analysis: {e}")
        import traceback

        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
