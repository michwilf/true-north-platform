"""
Monitoring and alerts endpoints.

Provides REST API access to the monitoring system and alerts.
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import logging

from backend.api.dependencies import get_monitoring_system
from backend.core.monitoring.system import (
    RobustMonitoringSystem,
    AlertType,
    AlertSeverity,
)

router = APIRouter(prefix="/api", tags=["monitoring"])
logger = logging.getLogger(__name__)


@router.get("/monitoring/alerts")
async def get_alerts(
    alert_type: Optional[str] = Query(None, description="Filter by alert type"),
    symbol: Optional[str] = Query(None, description="Filter by symbol"),
    severity: Optional[str] = Query(None, description="Filter by severity (HIGH, MEDIUM, LOW)"),
    acknowledged: bool = Query(False, description="Show only unacknowledged alerts"),
    resolved: bool = Query(False, description="Show only unresolved alerts"),
    limit: int = Query(50, ge=1, le=100),
    monitoring: RobustMonitoringSystem = Depends(get_monitoring_system),
) -> List[Dict[str, Any]]:
    """
    Get active alerts with optional filtering.
    
    Filters:
    - alert_type: PRICE_ALERT, POSITION_RISK, MARKET_REGIME, etc.
    - symbol: Filter by specific stock
    - severity: HIGH, MEDIUM, LOW
    - acknowledged: Show only unacknowledged alerts
    - resolved: Show only unresolved alerts
    
    Returns alerts in trade format for sidebar "Alert" filter.
    """
    try:
        # Get all alerts from monitoring system
        all_alerts = monitoring.system.get_all_alerts()
        
        filtered_alerts = []
        
        for alert in all_alerts:
            # Apply filters
            if alert_type and alert.alert_type.value != alert_type.upper():
                continue
            
            if symbol and alert.symbol != symbol:
                continue
            
            if severity and alert.severity.value != severity.upper():
                continue
            
            if acknowledged and alert.acknowledged:
                continue
            
            if resolved and alert.resolved:
                continue
            
            # Transform to trade format
            filtered_alerts.append({
                "id": alert.id,
                "symbol": alert.symbol or "SYSTEM",
                "title": alert.title,
                "type": "alert",
                "side": None,
                "entry_price": None,
                "current_price": None,
                "target_price": None,
                "stop_loss": None,
                "quantity": None,
                "pnl": None,
                "pnl_percentage": None,
                "timestamp": alert.timestamp.isoformat() if isinstance(alert.timestamp, datetime) else alert.timestamp,
                "status": f"{alert.severity.value} Alert",
                "reasoning": alert.message,
                "confidence": None,
                "alert_type": alert.alert_type.value,
                "severity": alert.severity.value,
                "acknowledged": alert.acknowledged,
                "resolved": alert.resolved,
            })
        
        # Sort by timestamp (newest first) and limit
        filtered_alerts.sort(key=lambda x: x["timestamp"], reverse=True)
        
        return filtered_alerts[:limit]
        
    except Exception as e:
        logger.error(f"Error getting alerts: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching alerts: {str(e)}"
        )


@router.post("/monitoring/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(
    alert_id: str,
    monitoring: RobustMonitoringSystem = Depends(get_monitoring_system),
):
    """Mark an alert as acknowledged."""
    try:
        # TODO: Implement acknowledge functionality
        return {"success": True, "message": f"Alert {alert_id} acknowledged"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error acknowledging alert: {str(e)}"
        )


@router.post("/monitoring/alerts/{alert_id}/resolve")
async def resolve_alert(
    alert_id: str,
    monitoring: RobustMonitoringSystem = Depends(get_monitoring_system),
):
    """Mark an alert as resolved."""
    try:
        # TODO: Implement resolve functionality
        return {"success": True, "message": f"Alert {alert_id} resolved"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error resolving alert: {str(e)}"
        )

