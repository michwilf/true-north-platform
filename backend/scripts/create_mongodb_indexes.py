#!/usr/bin/env python3
"""
Create MongoDB Indexes for Performance

Creates optimized indexes for all MongoDB collections.
"""

import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from pymongo import MongoClient
from backend.config.mongodb import get_mongodb_config


def create_indexes():
    """Create indexes for all MongoDB collections."""
    print("🔧 Creating MongoDB indexes for performance...\n")

    try:
        config = get_mongodb_config()
        client = MongoClient(config.get_connection_string())
        db = client[config.get_database_name()]

        # Portfolio Positions indexes
        print("1. Creating indexes for portfolio_positions...")
        positions_col = db[config.get_collection_name("PORTFOLIO_POSITIONS")]
        positions_col.create_index("symbol", unique=True, background=True)
        positions_col.create_index("entry_date", background=True)
        positions_col.create_index([("entry_date", -1)], background=True)
        print("   ✅ portfolio_positions indexes created")

        # Portfolio Trades indexes
        print("\n2. Creating indexes for portfolio_trades...")
        trades_col = db[config.get_collection_name("PORTFOLIO_TRADES")]
        trades_col.create_index("timestamp", background=True)
        trades_col.create_index("symbol", background=True)
        trades_col.create_index([("timestamp", -1)], background=True)
        trades_col.create_index("pnl", background=True)
        print("   ✅ portfolio_trades indexes created")

        # Alerts indexes
        print("\n3. Creating indexes for alerts...")
        alerts_col = db[config.get_collection_name("ALERTS")]
        alerts_col.create_index("alert_id", unique=True, background=True)
        alerts_col.create_index("timestamp", background=True)
        alerts_col.create_index("severity", background=True)
        alerts_col.create_index("symbol", background=True)
        alerts_col.create_index("acknowledged", background=True)
        alerts_col.create_index("resolved", background=True)
        alerts_col.create_index([("timestamp", -1)], background=True)
        print("   ✅ alerts indexes created")

        # Traders indexes
        print("\n4. Creating indexes for traders...")
        traders_col = db[config.get_collection_name("TRADERS")]
        traders_col.create_index("trader_id", unique=True, background=True)
        traders_col.create_index("platform", background=True)
        traders_col.create_index("added_date", background=True)
        traders_col.create_index("win_rate", background=True)
        traders_col.create_index("confidence_score", background=True)
        print("   ✅ traders indexes created")

        # Trader Trades indexes
        print("\n5. Creating indexes for trader_trades...")
        trader_trades_col = db[config.get_collection_name("TRADER_TRADES")]
        trader_trades_col.create_index("trade_id", unique=True, background=True)
        trader_trades_col.create_index("trader_id", background=True)
        trader_trades_col.create_index("symbol", background=True)
        trader_trades_col.create_index("entry_time", background=True)
        trader_trades_col.create_index("is_closed", background=True)
        trader_trades_col.create_index([("entry_time", -1)], background=True)
        trader_trades_col.create_index(
            [("trader_id", 1), ("entry_time", -1)], background=True
        )
        print("   ✅ trader_trades indexes created")

        # Portfolio Metrics indexes
        print("\n6. Creating indexes for portfolio_metrics...")
        metrics_col = db[config.get_collection_name("PORTFOLIO_METRICS")]
        metrics_col.create_index("last_updated", background=True)
        print("   ✅ portfolio_metrics indexes created")

        print("\n✅ All indexes created successfully!")

        # Show index summary
        print("\n📊 Index Summary:")
        for collection_name in [
            "PORTFOLIO_POSITIONS",
            "PORTFOLIO_TRADES",
            "ALERTS",
            "TRADERS",
            "TRADER_TRADES",
        ]:
            col = db[config.get_collection_name(collection_name)]
            indexes = list(col.list_indexes())
            index_names = [idx["name"] for idx in indexes]
            print(f"   • {collection_name}: {len(index_names)} indexes")
            for idx in index_names:
                print(f"      - {idx}")

        client.close()
        return True

    except Exception as e:
        print(f"\n❌ Error creating indexes: {e}")
        import traceback

        traceback.print_exc()
        return False


if __name__ == "__main__":
    try:
        success = create_indexes()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)
