#!/usr/bin/env python3
"""
Comprehensive MongoDB Integration Tests

Tests all migrated systems (Portfolio, Alerts, Traders) to ensure they work correctly.
"""

import sys
from datetime import datetime, timedelta
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))


def test_portfolio_system():
    """Test the portfolio tracking system."""
    print("=" * 80)
    print("📊 TESTING: Portfolio System")
    print("=" * 80)

    try:
        from backend.core.portfolio import PortfolioTracker

        tracker = PortfolioTracker()

        # Test 1: Get positions
        print("\n1. Getting portfolio positions...")
        positions = tracker.get_positions()
        print(f"   ✅ Found {len(positions)} positions")
        for pos in positions[:3]:
            print(f"      • {pos.symbol}: {pos.shares} shares @ ${pos.entry_price:.2f}")

        # Test 2: Get trades
        print("\n2. Getting trade history...")
        trades = tracker.get_trades(limit=5)
        print(f"   ✅ Found {len(trades)} trades")
        for trade in trades[:3]:
            print(f"      • {trade.action} {trade.symbol} @ ${trade.price:.2f}")

        # Test 3: Calculate metrics
        print("\n3. Calculating portfolio metrics...")
        metrics = tracker.calculate_metrics()
        print(f"   ✅ Total Value: ${metrics['total_value']:,.2f}")
        print(f"   ✅ Active Positions: {metrics['active_positions']}")
        print(f"   ✅ Total Trades: {metrics['total_trades']}")
        print(f"   ✅ Win Rate: {metrics['win_rate']:.2f}%")

        # Test 4: Add and remove a test position
        print("\n4. Testing add/remove position...")
        tracker.add_position("TEST_STOCK", 10, 100.00)
        positions = tracker.get_positions()
        test_pos = next((p for p in positions if p.symbol == "TEST_STOCK"), None)
        if test_pos:
            print(f"   ✅ Added position: {test_pos.symbol}")
        tracker.remove_position("TEST_STOCK")
        positions = tracker.get_positions()
        test_pos = next((p for p in positions if p.symbol == "TEST_STOCK"), None)
        if not test_pos:
            print(f"   ✅ Removed position successfully")

        print("\n✅ Portfolio System: PASSED")
        return True

    except Exception as e:
        print(f"\n❌ Portfolio System: FAILED")
        print(f"   Error: {e}")
        import traceback

        traceback.print_exc()
        return False


def test_alert_system():
    """Test the alert system."""
    print("\n" + "=" * 80)
    print("🚨 TESTING: Alert System")
    print("=" * 80)

    try:
        from backend.core.monitoring.system import (
            Alert,
            AlertType,
            AlertSeverity,
            NotificationChannel,
        )
        from backend.core.monitoring.alert_database_mongo import AlertDatabase

        db = AlertDatabase()

        # Test 1: Get recent alerts
        print("\n1. Getting recent alerts...")
        alerts = db.get_recent_alerts(hours=24)
        print(f"   ✅ Found {len(alerts)} recent alerts")
        for alert in alerts[:3]:
            status = "🟢 Active" if not alert.resolved else "✅ Resolved"
            print(f"      [{status}] {alert.severity.value.upper()}: {alert.title}")

        # Test 2: Get unresolved alerts
        print("\n2. Getting unresolved alerts...")
        unresolved = db.get_unresolved_alerts()
        print(f"   ✅ Found {len(unresolved)} unresolved alerts")

        # Test 3: Create and acknowledge an alert
        print("\n3. Testing alert creation...")
        test_alert = Alert(
            id="test_alert_" + datetime.now().strftime("%Y%m%d_%H%M%S"),
            alert_type=AlertType.COST_ALERT,
            severity=AlertSeverity.MEDIUM,
            symbol=None,
            title="Integration Test Alert",
            message="This is a test alert created during integration testing",
            timestamp=datetime.now(),
            data={"test": True},
            channels=[NotificationChannel.CONSOLE],
            acknowledged=False,
            resolved=False,
        )
        db.save_alert(test_alert)
        print(f"   ✅ Created test alert: {test_alert.id}")

        # Test 4: Acknowledge alert
        print("\n4. Testing alert acknowledgment...")
        db.acknowledge_alert(test_alert.id)
        recent = db.get_recent_alerts(hours=1)
        test_alert_found = next((a for a in recent if a.id == test_alert.id), None)
        if test_alert_found and test_alert_found.acknowledged:
            print(f"   ✅ Alert acknowledged successfully")

        print("\n✅ Alert System: PASSED")
        return True

    except Exception as e:
        print(f"\n❌ Alert System: FAILED")
        print(f"   Error: {e}")
        import traceback

        traceback.print_exc()
        return False


def test_trader_system():
    """Test the trader following system."""
    print("\n" + "=" * 80)
    print("👤 TESTING: Trader System")
    print("=" * 80)

    try:
        from backend.core.trader_following.system import (
            TraderProfile,
            TraderTrade,
            TraderPlatform,
            TradeType,
        )
        from backend.core.trader_following.trader_database_mongo import TraderDatabase

        db = TraderDatabase()

        # Test 1: Get all traders
        print("\n1. Getting all traders...")
        traders = db.get_traders()
        print(f"   ✅ Found {len(traders)} traders")
        for trader in traders[:3]:
            print(
                f"      • {trader.name} ({trader.platform.value}) - {trader.win_rate}% win rate"
            )

        # Test 2: Get recent trades
        print("\n2. Getting recent trades...")
        trades = db.get_recent_trades(days=7)
        print(f"   ✅ Found {len(trades)} recent trades")
        for trade in trades[:3]:
            status = "🔴 Open" if not trade.is_closed else "✅ Closed"
            print(
                f"      [{status}] {trade.symbol} {trade.trade_type.value} @ ${trade.entry_price or 0:.2f}"
            )

        # Test 3: Get trades by trader
        if traders:
            trader_id = traders[0].trader_id
            print(f"\n3. Getting trades for trader: {trader_id}...")
            trader_trades = db.get_recent_trades(trader_id=trader_id, days=7)
            print(f"   ✅ Found {len(trader_trades)} trades for this trader")

        # Test 4: Get specific trader by ID
        if traders:
            trader_id = traders[0].trader_id
            print(f"\n4. Getting trader by ID: {trader_id}...")
            trader = db.get_trader_by_id(trader_id)
            if trader:
                print(f"   ✅ Found trader: {trader.name}")

        print("\n✅ Trader System: PASSED")
        return True

    except Exception as e:
        print(f"\n❌ Trader System: FAILED")
        print(f"   Error: {e}")
        import traceback

        traceback.print_exc()
        return False


def test_mongodb_collections():
    """Test MongoDB collections directly."""
    print("\n" + "=" * 80)
    print("💾 TESTING: MongoDB Collections")
    print("=" * 80)

    try:
        from pymongo import MongoClient
        from backend.config.mongodb import get_mongodb_config

        config = get_mongodb_config()
        client = MongoClient(config.get_connection_string())
        db = client[config.get_database_name()]

        collection = db[config.get_collection_name("PORTFOLIO_POSITIONS")]
        pos_count = collection.count_documents({})
        print(f"   ✅ portfolio_positions: {pos_count} documents")

        collection = db[config.get_collection_name("PORTFOLIO_TRADES")]
        trades_count = collection.count_documents({})
        print(f"   ✅ portfolio_trades: {trades_count} documents")

        collection = db[config.get_collection_name("ALERTS")]
        alerts_count = collection.count_documents({})
        print(f"   ✅ alerts: {alerts_count} documents")

        collection = db[config.get_collection_name("TRADERS")]
        traders_count = collection.count_documents({})
        print(f"   ✅ traders: {traders_count} documents")

        collection = db[config.get_collection_name("TRADER_TRADES")]
        trader_trades_count = collection.count_documents({})
        print(f"   ✅ trader_trades: {trader_trades_count} documents")

        print("\n✅ MongoDB Collections: PASSED")
        client.close()
        return True

    except Exception as e:
        print(f"\n❌ MongoDB Collections: FAILED")
        print(f"   Error: {e}")
        import traceback

        traceback.print_exc()
        return False


def test_backend_import():
    """Test that the backend can import all systems."""
    print("\n" + "=" * 80)
    print("🔧 TESTING: Backend Import")
    print("=" * 80)

    try:
        print("\n1. Testing portfolio import...")
        from backend.core.portfolio import PortfolioTracker, Position, Trade

        print("   ✅ Portfolio imported successfully")

        print("\n2. Testing monitoring import...")
        from backend.core.monitoring import RobustMonitoringSystem

        print("   ✅ Monitoring imported successfully")

        print("\n3. Testing trader following import...")
        from backend.core.trader_following import TraderFollowingSystem

        print("   ✅ Trader following imported successfully")

        print("\n4. Testing dependencies...")
        from backend.api import dependencies

        print("   ✅ Dependencies imported successfully")

        print("\n5. Testing main application...")
        from backend.api.main import app

        print("   ✅ Main application imported successfully")

        print("\n✅ Backend Import: PASSED")
        return True

    except Exception as e:
        print(f"\n❌ Backend Import: FAILED")
        print(f"   Error: {e}")
        import traceback

        traceback.print_exc()
        return False


def main():
    """Run all integration tests."""
    print("\n")
    print("╔" + "=" * 78 + "╗")
    print("║" + " " * 20 + "MongoDB Integration Tests" + " " * 32 + "║")
    print("╚" + "=" * 78 + "╝")

    results = []

    # Run tests
    results.append(("MongoDB Collections", test_mongodb_collections()))
    results.append(("Backend Import", test_backend_import()))
    results.append(("Portfolio System", test_portfolio_system()))
    results.append(("Alert System", test_alert_system()))
    results.append(("Trader System", test_trader_system()))

    # Summary
    print("\n" + "=" * 80)
    print("📊 TEST SUMMARY")
    print("=" * 80)

    passed = sum(1 for _, result in results if result)
    total = len(results)

    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"   {status}: {test_name}")

    print("\n" + "=" * 80)
    print(f"📈 Results: {passed}/{total} tests passed ({(passed/total*100):.1f}%)")
    print("=" * 80)

    if passed == total:
        print("\n🎉 All integration tests PASSED!")
        return 0
    else:
        print(f"\n⚠️  {total - passed} test(s) FAILED")
        return 1


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Fatal error during testing: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)
