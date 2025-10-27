"""
Portfolio-related endpoints.

Handles portfolio metrics and performance tracking.
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from datetime import datetime

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


@router.get("/portfolio/positions")
async def get_portfolio_positions(
    tracker: PortfolioTracker = Depends(get_portfolio_tracker),
) -> List[Dict[str, Any]]:
    """
    Get all active portfolio positions with detailed P&L information.
    
    Returns list of positions for the trades sidebar, including:
    - Symbol and position details
    - Entry price and current price
    - P&L (dollars and percentage)
    - Position value and share count
    - Timestamp
    
    This endpoint is used by the global trades sidebar to display active positions.
    """
    try:
        # Get current positions from tracker
        positions = tracker.get_positions()
        
        # Transform to API format expected by frontend
        return [
            {
                "id": pos.symbol,
                "symbol": pos.symbol,
                "title": f"Long {pos.symbol}",  # TODO: Add side tracking
                "type": "active",
                "side": "long",  # TODO: Add side field to Position model
                "entry_price": pos.entry_price,
                "current_price": pos.current_price,
                "quantity": pos.shares,
                "pnl": pos.unrealized_pnl,
                "pnl_percentage": pos.unrealized_pnl_percent,
                "timestamp": pos.entry_date.isoformat() if isinstance(pos.entry_date, datetime) else pos.entry_date,
                "status": "active",
                "position_value": pos.position_value,
                # Optional fields (will be None for now)
                "target_price": None,  # TODO: Add to Position model
                "stop_loss": None,     # TODO: Add to Position model
                "reasoning": None,     # TODO: Add to Position model
                "confidence": None,    # TODO: Add to Position model
            }
            for pos in positions
        ]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching portfolio positions: {str(e)}"
        )
