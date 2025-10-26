"""
MongoDB schemas for trader following collections.

Defines the document structure for traders and trader_trades in MongoDB.
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class TraderProfileSchema(BaseModel):
    """MongoDB schema for trader profiles."""

    trader_id: str = Field(..., description="Unique trader identifier")
    name: str = Field(..., description="Trader name")
    platform: str = Field(..., description="Platform (twitter, reddit, discord, etc.)")
    username: str = Field(..., description="Platform username")

    # Performance metrics
    win_rate: float = Field(default=0.0, description="Win rate percentage")
    avg_return: float = Field(default=0.0, description="Average return percentage")
    total_followers: int = Field(default=0, description="Total follower count")
    verified: bool = Field(default=False, description="Whether trader is verified")

    # Trading style
    primary_strategy: str = Field(
        default="unknown", description="Primary trading strategy"
    )
    typical_hold_time: str = Field(default="unknown", description="Typical hold time")
    risk_level: str = Field(
        default="medium", description="Risk level (low, medium, high)"
    )

    # Tracking settings
    confidence_score: float = Field(default=0.5, description="Confidence score")
    auto_follow: bool = Field(default=False, description="Auto-follow trades")
    notification_enabled: bool = Field(
        default=True, description="Notifications enabled"
    )

    # Metadata
    added_date: datetime = Field(default_factory=datetime.now, description="Date added")
    last_activity: Optional[datetime] = Field(
        None, description="Last activity timestamp"
    )
    total_trades_tracked: int = Field(default=0, description="Total trades tracked")

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "trader_id": "trader_001",
                "name": "John Doe",
                "platform": "reddit",
                "username": "johntrades",
                "win_rate": 65.5,
                "avg_return": 15.2,
                "total_followers": 1234,
                "verified": False,
                "primary_strategy": "momentum",
                "typical_hold_time": "days",
                "risk_level": "medium",
                "confidence_score": 0.75,
                "auto_follow": False,
                "notification_enabled": True,
                "added_date": "2025-10-20T12:00:00",
                "last_activity": "2025-10-26T10:00:00",
                "total_trades_tracked": 42,
            }
        }


class TraderTradeSchema(BaseModel):
    """MongoDB schema for trader trades."""

    trade_id: str = Field(..., description="Unique trade identifier")
    trader_id: str = Field(..., description="Trader who made the trade")
    symbol: str = Field(..., description="Stock symbol")
    trade_type: str = Field(..., description="Trade type (long, short)")

    # Entry details
    entry_price: Optional[float] = Field(None, description="Entry price")
    entry_time: Optional[datetime] = Field(None, description="Entry timestamp")
    entry_confidence: float = Field(default=0.5, description="Entry confidence")

    # Exit details
    exit_price: Optional[float] = Field(None, description="Exit price")
    exit_time: Optional[datetime] = Field(None, description="Exit timestamp")

    # Trade details
    position_size: Optional[float] = Field(None, description="Position size")
    stop_loss: Optional[float] = Field(None, description="Stop loss price")
    take_profit: Optional[float] = Field(None, description="Take profit price")

    # Performance
    pnl_percent: Optional[float] = Field(None, description="P&L percentage")
    pnl_dollar: Optional[float] = Field(None, description="P&L in dollars")
    is_closed: bool = Field(default=False, description="Whether trade is closed")

    # Source information
    source_post_id: str = Field(default="", description="Source post ID")
    source_text: str = Field(default="", description="Source text")
    platform: str = Field(default="twitter", description="Platform")
    sentiment_score: Optional[float] = Field(None, description="Sentiment score")
    conviction_level: Optional[str] = Field(None, description="Conviction level")

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "trade_id": "trade_001",
                "trader_id": "trader_001",
                "symbol": "AAPL",
                "trade_type": "long",
                "entry_price": 180.50,
                "entry_time": "2025-10-20T10:00:00",
                "entry_confidence": 0.75,
                "exit_price": 185.20,
                "exit_time": "2025-10-21T15:30:00",
                "position_size": 1000.0,
                "stop_loss": 175.0,
                "take_profit": 190.0,
                "pnl_percent": 2.6,
                "pnl_dollar": 47.0,
                "is_closed": True,
                "source_post_id": "post_123",
                "source_text": "Going long AAPL",
                "platform": "reddit",
                "sentiment_score": 0.8,
                "conviction_level": "high",
            }
        }


def trader_to_dict(trader_data: dict) -> dict:
    """Convert trader to MongoDB document."""
    return {
        "trader_id": trader_data.get("trader_id"),
        "name": trader_data.get("name"),
        "platform": trader_data.get("platform"),
        "username": trader_data.get("username"),
        "win_rate": trader_data.get("win_rate", 0.0),
        "avg_return": trader_data.get("avg_return", 0.0),
        "total_followers": trader_data.get("total_followers", 0),
        "verified": trader_data.get("verified", False),
        "primary_strategy": trader_data.get("primary_strategy", "unknown"),
        "typical_hold_time": trader_data.get("typical_hold_time", "unknown"),
        "risk_level": trader_data.get("risk_level", "medium"),
        "confidence_score": trader_data.get("confidence_score", 0.5),
        "auto_follow": trader_data.get("auto_follow", False),
        "notification_enabled": trader_data.get("notification_enabled", True),
        "added_date": trader_data.get("added_date", datetime.now()),
        "last_activity": trader_data.get("last_activity"),
        "total_trades_tracked": trader_data.get("total_trades_tracked", 0),
    }


def trader_trade_to_dict(trade_data: dict) -> dict:
    """Convert trader trade to MongoDB document."""
    return {
        "trade_id": trade_data.get("trade_id"),
        "trader_id": trade_data.get("trader_id"),
        "symbol": trade_data.get("symbol"),
        "trade_type": trade_data.get("trade_type"),
        "entry_price": trade_data.get("entry_price"),
        "entry_time": trade_data.get("entry_time"),
        "entry_confidence": trade_data.get("entry_confidence", 0.5),
        "exit_price": trade_data.get("exit_price"),
        "exit_time": trade_data.get("exit_time"),
        "position_size": trade_data.get("position_size"),
        "stop_loss": trade_data.get("stop_loss"),
        "take_profit": trade_data.get("take_profit"),
        "pnl_percent": trade_data.get("pnl_percent"),
        "pnl_dollar": trade_data.get("pnl_dollar"),
        "is_closed": trade_data.get("is_closed", False),
        "source_post_id": trade_data.get("source_post_id", ""),
        "source_text": trade_data.get("source_text", ""),
        "platform": trade_data.get("platform", "twitter"),
        "sentiment_score": trade_data.get("sentiment_score"),
        "conviction_level": trade_data.get("conviction_level"),
    }
