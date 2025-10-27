"""
Portfolio-related endpoints.

Handles portfolio metrics and performance tracking.
"""

from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from datetime import datetime

from backend.api.models import (
    PortfolioMetrics,
    OpenPositionRequest,
    UpdatePositionRequest,
    PositionResponse,
)
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
                "title": f"{pos.side.capitalize()} {pos.symbol}",
                "type": "active",
                "side": pos.side,
                "entry_price": pos.entry_price,
                "current_price": pos.current_price,
                "quantity": pos.shares,
                "pnl": pos.unrealized_pnl,
                "pnl_percentage": pos.unrealized_pnl_percent,
                "timestamp": (
                    pos.entry_date.isoformat()
                    if isinstance(pos.entry_date, datetime)
                    else pos.entry_date
                ),
                "status": "active",
                "position_value": pos.position_value,
                # Phase 2: Now populated from enhanced Position model
                "target_price": pos.target_price,
                "stop_loss": pos.stop_loss,
                "reasoning": pos.reasoning,
                "confidence": pos.confidence,
            }
            for pos in positions
        ]
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching portfolio positions: {str(e)}"
        )


@router.post("/portfolio/positions", response_model=PositionResponse)
async def open_position(
    request: OpenPositionRequest,
    tracker: PortfolioTracker = Depends(get_portfolio_tracker),
) -> PositionResponse:
    """
    Open a new portfolio position.

    Used by "Execute Trade" button in research modal and opportunities page.
    Creates a new position with comprehensive metadata including targets, stops, reasoning, and confidence.
    """
    try:
        success = tracker.add_position(
            symbol=request.symbol,
            shares=request.shares,
            entry_price=request.entry_price,
            side=request.side,
            target_price=request.target_price,
            stop_loss=request.stop_loss,
            reasoning=request.reasoning,
            confidence=request.confidence,
            strategy=request.strategy,
            timeframe=request.timeframe,
            risk_level=request.risk_level,
        )

        if success:
            # Get the newly created position
            positions = tracker.get_positions()
            new_position = next(
                (p for p in positions if p.symbol == request.symbol), None
            )

            position_data = (
                {
                    "symbol": new_position.symbol,
                    "shares": new_position.shares,
                    "entry_price": new_position.entry_price,
                    "current_price": new_position.current_price,
                    "side": new_position.side,
                    "target_price": new_position.target_price,
                    "stop_loss": new_position.stop_loss,
                    "reasoning": new_position.reasoning,
                    "confidence": new_position.confidence,
                }
                if new_position
                else None
            )

            return PositionResponse(
                success=True,
                message=f"Position opened successfully: {request.shares} shares of {request.symbol}",
                position=position_data,
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to open position")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error opening position: {str(e)}")


@router.patch("/portfolio/positions/{symbol}", response_model=PositionResponse)
async def update_position(
    symbol: str,
    request: UpdatePositionRequest,
    tracker: PortfolioTracker = Depends(get_portfolio_tracker),
) -> PositionResponse:
    """
    Update an existing position.

    Allows updating specific fields like stop loss, target price, or adding reasoning.
    Used by "Update Alert" functionality.
    """
    try:
        updates = {}
        if request.target_price is not None:
            updates["target_price"] = request.target_price
        if request.stop_loss is not None:
            updates["stop_loss"] = request.stop_loss
        if request.reasoning is not None:
            updates["reasoning"] = request.reasoning
        if request.shares is not None:
            updates["shares"] = request.shares

        if not updates:
            raise HTTPException(
                status_code=400, detail="No valid update fields provided"
            )

        success = tracker.update_position(symbol, updates)

        if success:
            return PositionResponse(
                success=True,
                message=f"Position updated successfully: {symbol}",
                position={"symbol": symbol, **updates},
            )
        else:
            raise HTTPException(status_code=404, detail=f"Position not found: {symbol}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error updating position: {str(e)}"
        )


@router.delete("/portfolio/positions/{symbol}", response_model=PositionResponse)
async def close_position(
    symbol: str,
    close_price: float = None,
    tracker: PortfolioTracker = Depends(get_portfolio_tracker),
) -> PositionResponse:
    """
    Close an existing position and record the trade.

    Calculates final P&L based on close_price (or current price if not provided)
    and moves position to trade history.
    """
    try:
        # Get the position before closing
        positions = tracker.get_positions()
        position = next((p for p in positions if p.symbol == symbol), None)

        if not position:
            raise HTTPException(status_code=404, detail=f"Position not found: {symbol}")

        # Use provided close price or current price
        exit_price = close_price if close_price is not None else position.current_price

        # Calculate final P&L
        cost_basis = position.shares * position.entry_price
        final_value = position.shares * exit_price
        final_pnl = final_value - cost_basis
        final_pnl_percent = (final_pnl / cost_basis * 100) if cost_basis > 0 else 0

        # Record the trade
        tracker.record_trade(
            symbol=symbol,
            action="SELL",
            shares=position.shares,
            price=exit_price,
            pnl=final_pnl,
            pnl_percent=final_pnl_percent,
        )

        # Remove the position
        success = tracker.remove_position(symbol)

        if success:
            return PositionResponse(
                success=True,
                message=f"Position closed successfully: {symbol}. Final P&L: ${final_pnl:.2f} ({final_pnl_percent:.2f}%)",
                position={
                    "symbol": symbol,
                    "pnl": final_pnl,
                    "pnl_percent": final_pnl_percent,
                    "exit_price": exit_price,
                },
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to close position")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error closing position: {str(e)}")
