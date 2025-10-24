"""API endpoint routers."""

from .market import router as market_router
from .opportunities import router as opportunities_router
from .traders import router as traders_router
from .portfolio import router as portfolio_router
from .analysis import router as analysis_router
from .autonomous import router as autonomous_router
from .enhanced_opportunities import router as enhanced_opportunities_router
from .enhanced_market_regime import router as enhanced_market_regime_router
from .enhanced_portfolio import router as enhanced_portfolio_router
from .contextual_analysis import router as contextual_analysis_router

__all__ = [
    "market_router",
    "opportunities_router",
    "traders_router",
    "portfolio_router",
    "analysis_router",
    "autonomous_router",
    "enhanced_opportunities_router",
    "enhanced_market_regime_router",
    "enhanced_portfolio_router",
    "contextual_analysis_router",
]
