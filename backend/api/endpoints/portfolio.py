"""
Portfolio-related endpoints.

Handles portfolio metrics and performance tracking.
"""

from fastapi import APIRouter, Depends, HTTPException

from backend.api.models import PortfolioMetrics
from backend.api.dependencies import get_portfolio_tracker
from backend.core.portfolio import PortfolioTracker

router = APIRouter(prefix="/api", tags=["portfolio"])


@router.get("/portfolio-metrics", response_model=PortfolioMetrics)
async def get_portfolio_metrics(
    tracker: PortfolioTracker = Depends(get_portfolio_tracker),
):
    """Get portfolio performance metrics from real portfolio tracker."""
    try:
        # Get real metrics from portfolio tracker
        metrics = tracker.calculate_metrics()

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
