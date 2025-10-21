"""
FastAPI dependencies for dependency injection.

Provides access to global system instances.
"""

from fastapi import HTTPException
from typing import Optional
from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.monitoring import RobustMonitoringSystem
from backend.core.trader_following import TraderFollowingSystem
from backend.core.backtesting import ComprehensiveBacktestingFramework
from backend.core.portfolio import PortfolioTracker
from backend.core.cache_manager import CacheManager
from backend.core.trading_agents.graph.trading_graph import TradingAgentsGraph


# Global instances (set during startup)
_discovery_engine: Optional[EnhancedDiscoveryEngine] = None
_monitoring_system: Optional[RobustMonitoringSystem] = None
_trader_system: Optional[TraderFollowingSystem] = None
_backtesting_framework: Optional[ComprehensiveBacktestingFramework] = None
_trading_agents_graph: Optional[TradingAgentsGraph] = None
_portfolio_tracker: Optional[PortfolioTracker] = None
_cache_manager: Optional[CacheManager] = None


def set_discovery_engine(engine: EnhancedDiscoveryEngine):
    """Set the global discovery engine instance."""
    global _discovery_engine
    _discovery_engine = engine


def set_monitoring_system(system: RobustMonitoringSystem):
    """Set the global monitoring system instance."""
    global _monitoring_system
    _monitoring_system = system


def set_trader_system(system: TraderFollowingSystem):
    """Set the global trader system instance."""
    global _trader_system
    _trader_system = system


def set_backtesting_framework(framework: ComprehensiveBacktestingFramework):
    """Set the global backtesting framework instance."""
    global _backtesting_framework
    _backtesting_framework = framework


def set_trading_agents_graph(graph: TradingAgentsGraph):
    """Set the global trading agents graph instance."""
    global _trading_agents_graph
    _trading_agents_graph = graph


def set_portfolio_tracker(tracker: PortfolioTracker):
    """Set the global portfolio tracker instance."""
    global _portfolio_tracker
    _portfolio_tracker = tracker


def set_cache_manager(manager: CacheManager):
    """Set the global cache manager instance."""
    global _cache_manager
    _cache_manager = manager


# Dependency functions for FastAPI
def get_discovery_engine() -> EnhancedDiscoveryEngine:
    """Get discovery engine instance."""
    if _discovery_engine is None:
        raise HTTPException(status_code=503, detail="Discovery engine not initialized")
    return _discovery_engine


def get_monitoring_system() -> RobustMonitoringSystem:
    """Get monitoring system instance."""
    if _monitoring_system is None:
        raise HTTPException(status_code=503, detail="Monitoring system not initialized")
    return _monitoring_system


def get_trader_system() -> TraderFollowingSystem:
    """Get trader system instance."""
    if _trader_system is None:
        raise HTTPException(status_code=503, detail="Trader system not initialized")
    return _trader_system


def get_backtesting_framework() -> ComprehensiveBacktestingFramework:
    """Get backtesting framework instance."""
    if _backtesting_framework is None:
        raise HTTPException(
            status_code=503, detail="Backtesting framework not initialized"
        )
    return _backtesting_framework


def get_trading_agents_graph() -> TradingAgentsGraph:
    """Get trading agents graph instance."""
    if _trading_agents_graph is None:
        raise HTTPException(
            status_code=503, detail="Trading agents system not initialized"
        )
    return _trading_agents_graph


def get_portfolio_tracker() -> PortfolioTracker:
    """Get portfolio tracker instance."""
    if _portfolio_tracker is None:
        raise HTTPException(status_code=503, detail="Portfolio tracker not initialized")
    return _portfolio_tracker


def get_cache_manager() -> Optional[CacheManager]:
    """Get cache manager instance (optional, returns None if not set)."""
    return _cache_manager
