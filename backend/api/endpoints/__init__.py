"""API endpoint routers."""

from .market import router as market_router
from .opportunities import router as opportunities_router
from .traders import router as traders_router
from .portfolio import router as portfolio_router
from .analysis import router as analysis_router
from .autonomous import router as autonomous_router
from .enhanced_opportunities import router as enhanced_opportunities_router

__all__ = [
    "market_router",
    "opportunities_router",
    "traders_router",
    "portfolio_router",
    "analysis_router",
    "autonomous_router",
    "enhanced_opportunities_router",
]
