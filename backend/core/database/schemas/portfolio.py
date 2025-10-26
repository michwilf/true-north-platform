"""
MongoDB schemas for portfolio collections.

Defines the document structure for portfolio_positions, portfolio_trades,
and portfolio_metrics collections in MongoDB.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class PositionSchema(BaseModel):
    """MongoDB schema for portfolio positions."""

    symbol: str = Field(..., description="Stock symbol")
    shares: float = Field(..., gt=0, description="Number of shares")
    entry_price: float = Field(..., gt=0, description="Entry price per share")
    entry_date: datetime = Field(
        default_factory=datetime.now, description="Date position was opened"
    )
    last_updated: datetime = Field(
        default_factory=datetime.now, description="Last update timestamp"
    )

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "symbol": "AAPL",
                "shares": 10.0,
                "entry_price": 150.00,
                "entry_date": "2025-10-20T12:00:00",
                "last_updated": "2025-10-20T12:00:00",
            }
        }


class TradeSchema(BaseModel):
    """MongoDB schema for portfolio trades."""

    symbol: str = Field(..., description="Stock symbol")
    action: str = Field(..., description="BUY or SELL")
    shares: float = Field(..., gt=0, description="Number of shares")
    price: float = Field(..., gt=0, description="Price per share")
    timestamp: datetime = Field(
        default_factory=datetime.now, description="Trade timestamp"
    )
    pnl: Optional[float] = Field(None, description="Realized profit/loss in dollars")
    pnl_percent: Optional[float] = Field(
        None, description="Realized profit/loss as percentage"
    )

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "symbol": "AAPL",
                "action": "BUY",
                "shares": 10.0,
                "price": 150.00,
                "timestamp": "2025-10-20T12:00:00",
                "pnl": None,
                "pnl_percent": None,
            }
        }


class PortfolioMetricsSchema(BaseModel):
    """MongoDB schema for portfolio metrics."""

    total_value: float = Field(..., ge=0, description="Total portfolio value")
    cash_balance: float = Field(..., ge=0, description="Available cash balance")
    total_invested: float = Field(..., ge=0, description="Total invested amount")
    last_updated: datetime = Field(
        default_factory=datetime.now, description="Last update timestamp"
    )

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "total_value": 10000.00,
                "cash_balance": 5000.00,
                "total_invested": 5000.00,
                "last_updated": "2025-10-20T12:00:00",
            }
        }


def position_to_dict(position: dict) -> dict:
    """Convert position to MongoDB document."""
    return {
        "symbol": position.get("symbol"),
        "shares": position.get("shares"),
        "entry_price": position.get("entry_price"),
        "entry_date": position.get("entry_date"),
        "last_updated": position.get("last_updated") or datetime.now(),
    }


def trade_to_dict(trade: dict) -> dict:
    """Convert trade to MongoDB document."""
    return {
        "symbol": trade.get("symbol"),
        "action": trade.get("action"),
        "shares": trade.get("shares"),
        "price": trade.get("price"),
        "timestamp": trade.get("timestamp") or datetime.now(),
        "pnl": trade.get("pnl"),
        "pnl_percent": trade.get("pnl_percent"),
    }


def metrics_to_dict(metrics: dict) -> dict:
    """Convert metrics to MongoDB document."""
    return {
        "total_value": metrics.get("total_value"),
        "cash_balance": metrics.get("cash_balance"),
        "total_invested": metrics.get("total_invested"),
        "last_updated": metrics.get("last_updated") or datetime.now(),
    }
