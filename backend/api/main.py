"""
FastAPI Backend for True North Trading Platform

Clean, modular API with separated concerns and dependency injection.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os
from pathlib import Path

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

# Import dependencies and routers
from backend.api import dependencies
from backend.api.endpoints import (
    market_router,
    opportunities_router,
    traders_router,
    portfolio_router,
    analysis_router,
    autonomous_router,
    enhanced_opportunities_router,
    enhanced_market_regime_router,
    enhanced_portfolio_router,
    contextual_analysis_router,
    monitoring_router,
)
from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.monitoring import RobustMonitoringSystem
from backend.core.trader_following import TraderFollowingSystem
from backend.core.backtesting import ComprehensiveBacktestingFramework
from backend.core.portfolio import PortfolioTracker
from backend.core.cache_manager import get_cache
from backend.core.trading_agents.graph.trading_graph import TradingAgentsGraph
from backend.core.trading_agents.default_config import DEFAULT_CONFIG

# Initialize FastAPI app
app = FastAPI(
    title="True North Trading API",
    description="AI-Powered Trading Platform with Multi-Agent Analysis",
    version="2.0.0",
)

# Configure CORS - allow frontend access
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3002,http://127.0.0.1:3002")
allowed_origins = [origin.strip() for origin in cors_origins.split(",")]
# For development, also allow Vercel preview deployments
allowed_origins.append("http://localhost:3002")
allowed_origins.append("http://127.0.0.1:3002")
print(f"🌐 CORS enabled for origins: {allowed_origins}")

# CORS middleware - allow all origins for development (fix this for production!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins temporarily
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initialize all trading systems on startup."""
    try:
        print("🚀 Initializing True North Trading API...")

        # Initialize cache manager
        cache_manager = get_cache()
        dependencies.set_cache_manager(cache_manager)

        # Initialize portfolio tracker
        portfolio_tracker = PortfolioTracker()
        # Seed with demo data if empty
        if not portfolio_tracker.get_positions():
            portfolio_tracker.seed_demo_data()
        dependencies.set_portfolio_tracker(portfolio_tracker)

        # Initialize systems
        discovery_engine = EnhancedDiscoveryEngine()
        dependencies.set_discovery_engine(discovery_engine)

        monitoring_system = RobustMonitoringSystem()
        dependencies.set_monitoring_system(monitoring_system)

        trader_system = TraderFollowingSystem()
        dependencies.set_trader_system(trader_system)

        backtesting_framework = ComprehensiveBacktestingFramework()
        dependencies.set_backtesting_framework(backtesting_framework)

        # Initialize TradingAgents multi-agent system
        print("🤖 Initializing TradingAgents multi-agent system...")
        config = DEFAULT_CONFIG.copy()
        config["deep_think_llm"] = "gpt-4o-mini"
        config["quick_think_llm"] = "gpt-4o-mini"
        config["max_debate_rounds"] = 2
        trading_agents_graph = TradingAgentsGraph(debug=False, config=config)
        dependencies.set_trading_agents_graph(trading_agents_graph)

        print("✅ All systems initialized successfully!")

    except Exception as e:
        print(f"❌ Error initializing systems: {e}")


# Register routers
app.include_router(market_router)
app.include_router(opportunities_router)
app.include_router(traders_router)
app.include_router(portfolio_router)
app.include_router(analysis_router)
app.include_router(autonomous_router)
app.include_router(enhanced_opportunities_router)
app.include_router(enhanced_market_regime_router)
app.include_router(enhanced_portfolio_router)
app.include_router(contextual_analysis_router)  # Context-aware analysis routing
app.include_router(monitoring_router)  # Monitoring and alerts


@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "message": "True North Trading API is running",
        "status": "healthy",
        "version": "2.0.0",
    }


@app.get("/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "systems": {
            "discovery_engine": dependencies._discovery_engine is not None,
            "monitoring_system": dependencies._monitoring_system is not None,
            "trader_system": dependencies._trader_system is not None,
            "portfolio_tracker": dependencies._portfolio_tracker is not None,
            "trading_agents": dependencies._trading_agents_graph is not None,
            "cache_manager": dependencies._cache_manager is not None,
        },
    }
