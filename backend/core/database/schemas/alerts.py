"""
MongoDB schema for alerts collection.

Defines the document structure for alerts in MongoDB.
"""

from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class AlertSchema(BaseModel):
    """MongoDB schema for alerts."""

    alert_id: str = Field(..., description="Unique alert identifier")
    alert_type: str = Field(
        ..., description="Type of alert (e.g., price_alert, risk_alert)"
    )
    severity: str = Field(..., description="Alert severity (info, warning, critical)")
    symbol: Optional[str] = Field(None, description="Stock symbol if applicable")
    title: str = Field(..., description="Alert title")
    message: str = Field(..., description="Alert message")
    timestamp: datetime = Field(
        default_factory=datetime.now, description="Alert timestamp"
    )
    data: Dict[str, Any] = Field(
        default_factory=dict, description="Additional alert data"
    )
    channels: List[str] = Field(
        default_factory=list, description="Notification channels"
    )
    acknowledged: bool = Field(
        default=False, description="Whether alert was acknowledged"
    )
    resolved: bool = Field(default=False, description="Whether alert was resolved")

    class Config:
        """Pydantic config."""

        json_schema_extra = {
            "example": {
                "alert_id": "alert_123",
                "alert_type": "price_alert",
                "severity": "warning",
                "symbol": "AAPL",
                "title": "Price Drop Alert",
                "message": "AAPL dropped 5%",
                "timestamp": "2025-10-20T12:00:00",
                "data": {"price_change": -5.0},
                "channels": ["email", "push"],
                "acknowledged": False,
                "resolved": False,
            }
        }


def alert_to_dict(alert_data: dict) -> dict:
    """Convert alert to MongoDB document."""
    return {
        "alert_id": alert_data.get("id"),
        "alert_type": alert_data.get("alert_type"),
        "severity": alert_data.get("severity"),
        "symbol": alert_data.get("symbol"),
        "title": alert_data.get("title"),
        "message": alert_data.get("message"),
        "timestamp": alert_data.get("timestamp") or datetime.now(),
        "data": alert_data.get("data", {}),
        "channels": alert_data.get("channels", []),
        "acknowledged": alert_data.get("acknowledged", False),
        "resolved": alert_data.get("resolved", False),
    }
