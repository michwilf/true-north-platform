"""
Alert Database - MongoDB Implementation

Simple sync PyMongo-based implementation for alert storage and retrieval.
"""

import logging
import json
from datetime import datetime, timedelta
from typing import List
from pymongo import MongoClient

from backend.core.monitoring.system import (
    Alert,
    AlertType,
    AlertSeverity,
    NotificationChannel,
)
from backend.config.mongodb import get_mongodb_config

logger = logging.getLogger(__name__)


class AlertDatabase:
    """Manages alert storage and retrieval using MongoDB."""

    def __init__(self):
        """Initialize alert database with MongoDB."""
        self._config = get_mongodb_config()
        self._client: MongoClient = None
        self._initialized = False

    def _get_client(self) -> MongoClient:
        """Get or create MongoDB client."""
        if self._client is None:
            self._client = MongoClient(
                self._config.get_connection_string(),
                **self._config.get_connection_options(),
            )
        return self._client

    def _get_collection(self):
        """Get the alerts collection."""
        client = self._get_client()
        db = client[self._config.get_database_name()]
        return db[self._config.get_collection_name("ALERTS")]

    def _ensure_initialized(self):
        """Ensure MongoDB is initialized."""
        if not self._initialized:
            self._initialize()
            self._initialized = True

    def _initialize(self):
        """Initialize collections and indexes."""
        try:
            collection = self._get_collection()

            # Create indexes
            collection.create_index("alert_id", unique=True)
            collection.create_index("timestamp")
            collection.create_index("severity")
            collection.create_index("acknowledged")
            collection.create_index("resolved")
            collection.create_index([("timestamp", -1)])

            logger.info("✅ Alert collections initialized")
        except Exception as e:
            logger.error(f"❌ Error initializing collections: {e}")

    def save_alert(self, alert: Alert):
        """Save alert to database."""
        self._ensure_initialized()

        try:
            collection = self._get_collection()

            document = {
                "alert_id": alert.id,
                "alert_type": alert.alert_type.value,
                "severity": alert.severity.value,
                "symbol": alert.symbol,
                "title": alert.title,
                "message": alert.message,
                "timestamp": alert.timestamp,
                "data": alert.data,
                "channels": [c.value for c in alert.channels],
                "acknowledged": alert.acknowledged,
                "resolved": alert.resolved,
            }

            collection.update_one(
                {"alert_id": alert.id}, {"$set": document}, upsert=True
            )

            logger.debug(f"✅ Alert saved: {alert.id}")
        except Exception as e:
            logger.error(f"❌ Error saving alert: {e}")
            raise

    def get_recent_alerts(self, hours: int = 24) -> List[Alert]:
        """Get recent alerts from database."""
        self._ensure_initialized()

        try:
            collection = self._get_collection()

            since = datetime.now() - timedelta(hours=hours)

            cursor = collection.find({"timestamp": {"$gte": since}}).sort(
                "timestamp", -1
            )
            rows = list(cursor)

            alerts = []
            for row in rows:
                alert = Alert(
                    id=row["alert_id"],
                    alert_type=AlertType(row["alert_type"]),
                    severity=AlertSeverity(row["severity"]),
                    symbol=row.get("symbol"),
                    title=row["title"],
                    message=row["message"],
                    timestamp=row["timestamp"],
                    data=row.get("data", {}),
                    channels=[NotificationChannel(c) for c in row.get("channels", [])],
                    acknowledged=row.get("acknowledged", False),
                    resolved=row.get("resolved", False),
                )
                alerts.append(alert)

            return alerts
        except Exception as e:
            logger.error(f"❌ Error getting alerts: {e}")
            return []

    def acknowledge_alert(self, alert_id: str):
        """Mark an alert as acknowledged."""
        self._ensure_initialized()

        try:
            collection = self._get_collection()
            result = collection.update_one(
                {"alert_id": alert_id}, {"$set": {"acknowledged": True}}
            )

            if result.modified_count > 0:
                logger.debug(f"✅ Alert acknowledged: {alert_id}")
            else:
                logger.warning(f"⚠️  Alert not found: {alert_id}")
        except Exception as e:
            logger.error(f"❌ Error acknowledging alert: {e}")
            raise

    def resolve_alert(self, alert_id: str):
        """Mark an alert as resolved."""
        self._ensure_initialized()

        try:
            collection = self._get_collection()
            result = collection.update_one(
                {"alert_id": alert_id}, {"$set": {"resolved": True}}
            )

            if result.modified_count > 0:
                logger.debug(f"✅ Alert resolved: {alert_id}")
            else:
                logger.warning(f"⚠️  Alert not found: {alert_id}")
        except Exception as e:
            logger.error(f"❌ Error resolving alert: {e}")
            raise

    def get_unresolved_alerts(self) -> List[Alert]:
        """Get all unresolved alerts."""
        self._ensure_initialized()

        try:
            collection = self._get_collection()
            cursor = collection.find({"resolved": False}).sort("timestamp", -1)
            rows = list(cursor)

            alerts = []
            for row in rows:
                alert = Alert(
                    id=row["alert_id"],
                    alert_type=AlertType(row["alert_type"]),
                    severity=AlertSeverity(row["severity"]),
                    symbol=row.get("symbol"),
                    title=row["title"],
                    message=row["message"],
                    timestamp=row["timestamp"],
                    data=row.get("data", {}),
                    channels=[NotificationChannel(c) for c in row.get("channels", [])],
                    acknowledged=row.get("acknowledged", False),
                    resolved=False,
                )
                alerts.append(alert)

            return alerts
        except Exception as e:
            logger.error(f"❌ Error getting unresolved alerts: {e}")
            return []

    def clear_all_alerts(self):
        """Clear all alerts from database."""
        self._ensure_initialized()

        try:
            collection = self._get_collection()
            result = collection.delete_many({})
            logger.info(f"✅ Cleared {result.deleted_count} alerts")
        except Exception as e:
            logger.error(f"❌ Error clearing alerts: {e}")
            raise
