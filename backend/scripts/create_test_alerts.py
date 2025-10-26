#!/usr/bin/env python3
"""
Create Test Alerts

Creates sample alerts in MongoDB to test the system.
"""

import sys
from datetime import datetime, timedelta
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from backend.core.monitoring.system import (
    Alert,
    AlertType,
    AlertSeverity,
    NotificationChannel,
)
from backend.core.monitoring.alert_database_mongo import AlertDatabase


def create_test_alerts():
    """Create a series of test alerts."""
    print("🚀 Creating test alerts in MongoDB...\n")

    # Initialize database
    db = AlertDatabase()

    # Create test alerts
    alerts = [
        Alert(
            id="alert_001",
            alert_type=AlertType.PRICE_BREAKOUT,
            severity=AlertSeverity.HIGH,
            symbol="AAPL",
            title="AAPL Price Breakout Detected",
            message="AAPL broke above $180 resistance level with 2.5% gain.",
            timestamp=datetime.now() - timedelta(hours=2),
            data={"price": 182.50, "change_percent": 2.5, "volume": 45000000},
            channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
            acknowledged=False,
            resolved=False,
        ),
        Alert(
            id="alert_002",
            alert_type=AlertType.VOLUME_SPIKE,
            severity=AlertSeverity.MEDIUM,
            symbol="TSLA",
            title="TSLA Volume Spike",
            message="TSLA trading volume increased 150% above average.",
            timestamp=datetime.now() - timedelta(hours=5),
            data={"volume_ratio": 2.5, "average_volume": 50000000},
            channels=[NotificationChannel.EMAIL],
            acknowledged=True,
            resolved=False,
        ),
        Alert(
            id="alert_003",
            alert_type=AlertType.TECHNICAL_SIGNAL,
            severity=AlertSeverity.LOW,
            symbol="MSFT",
            title="MSFT RSI Overbought",
            message="MSFT RSI reached 72.5 (overbought territory).",
            timestamp=datetime.now() - timedelta(hours=1),
            data={"rsi": 72.5, "signal": "overbought"},
            channels=[NotificationChannel.CONSOLE],
            acknowledged=False,
            resolved=False,
        ),
        Alert(
            id="alert_004",
            alert_type=AlertType.NEWS_EVENT,
            severity=AlertSeverity.CRITICAL,
            symbol="NVDA",
            title="NVDA Major News Event",
            message="NVDA announces new AI chip partnership with major cloud provider.",
            timestamp=datetime.now() - timedelta(minutes=30),
            data={"news_type": "partnership", "impact": "positive"},
            channels=[
                NotificationChannel.EMAIL,
                NotificationChannel.SLACK,
                NotificationChannel.CONSOLE,
            ],
            acknowledged=False,
            resolved=False,
        ),
        Alert(
            id="alert_005",
            alert_type=AlertType.SYSTEM_ERROR,
            severity=AlertSeverity.CRITICAL,
            symbol=None,
            title="Data Feed Connection Lost",
            message="Primary data feed disconnected. Using backup feed.",
            timestamp=datetime.now() - timedelta(minutes=10),
            data={"error_code": "DF_001", "status": "backup_active"},
            channels=[NotificationChannel.EMAIL, NotificationChannel.SLACK],
            acknowledged=False,
            resolved=False,
        ),
        Alert(
            id="alert_006",
            alert_type=AlertType.COST_ALERT,
            severity=AlertSeverity.MEDIUM,
            symbol=None,
            title="API Cost Threshold Reached",
            message="Monthly API costs exceeded $500 budget.",
            timestamp=datetime.now() - timedelta(hours=12),
            data={"cost_this_month": 525.00, "budget": 500.00},
            channels=[NotificationChannel.EMAIL],
            acknowledged=True,
            resolved=True,
        ),
    ]

    # Save all alerts
    count = 0
    for alert in alerts:
        try:
            db.save_alert(alert)
            count += 1
            print(f"✅ Created alert: {alert.id} - {alert.title}")
        except Exception as e:
            print(f"❌ Failed to create alert {alert.id}: {e}")

    print(f"\n📊 Created {count} alerts successfully!")

    # Show recent alerts
    print("\n🔔 Recent Alerts (Last 24 Hours):")
    recent = db.get_recent_alerts(hours=24)
    for alert in recent:
        status = (
            "✅ Resolved"
            if alert.resolved
            else ("📧 Acknowledged" if alert.acknowledged else "🔴 Active")
        )
        print(f"   [{status}] [{alert.severity.value.upper()}] {alert.title}")
        print(
            f"      Symbol: {alert.symbol or 'N/A'} | Time: {alert.timestamp.strftime('%Y-%m-%d %H:%M')}"
        )

    print(f"\n📈 Unresolved Alerts: {len(db.get_unresolved_alerts())}")


if __name__ == "__main__":
    try:
        create_test_alerts()
        print("\n✅ Test alerts creation complete!")
        sys.exit(0)
    except KeyboardInterrupt:
        print("\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error creating alerts: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)
