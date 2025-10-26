#!/usr/bin/env python3
"""
Migrate Portfolio Data from SQLite to MongoDB

This script migrates portfolio positions, trades, and metrics from SQLite to MongoDB.
"""

import sys
import asyncio
import logging
import sqlite3
from pathlib import Path
from datetime import datetime
from typing import List, Dict

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from backend.core.database.mongodb_manager import get_mongodb_manager
from backend.config.mongodb import get_mongodb_config

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


def read_sqlite_positions(db_path: Path) -> List[Dict]:
    """Read positions from SQLite database."""
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()

    cursor.execute(
        "SELECT symbol, shares, entry_price, entry_date, last_updated FROM positions"
    )
    rows = cursor.fetchall()

    positions = []
    for row in rows:
        positions.append(
            {
                "symbol": row[0],
                "shares": row[1],
                "entry_price": row[2],
                "entry_date": datetime.fromisoformat(row[3]),
                "last_updated": (
                    datetime.fromisoformat(row[4]) if row[4] else datetime.now()
                ),
            }
        )

    conn.close()
    return positions


def read_sqlite_trades(db_path: Path) -> List[Dict]:
    """Read trades from SQLite database."""
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, symbol, action, shares, price, timestamp, pnl, pnl_percent
        FROM trades
        ORDER BY timestamp
    """
    )
    rows = cursor.fetchall()

    trades = []
    for row in rows:
        trades.append(
            {
                "id": row[0],
                "symbol": row[1],
                "action": row[2],
                "shares": row[3],
                "price": row[4],
                "timestamp": datetime.fromisoformat(row[5]),
                "pnl": row[6],
                "pnl_percent": row[7],
            }
        )

    conn.close()
    return trades


def read_sqlite_metrics(db_path: Path) -> Dict:
    """Read portfolio metrics from SQLite database."""
    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()

    cursor.execute(
        "SELECT total_value, cash_balance, total_invested, last_updated FROM portfolio_metrics LIMIT 1"
    )
    row = cursor.fetchone()

    conn.close()

    if row:
        return {
            "total_value": row[0],
            "cash_balance": row[1],
            "total_invested": row[2],
            "last_updated": (
                datetime.fromisoformat(row[3]) if row[3] else datetime.now()
            ),
        }
    return None


async def migrate_positions_to_mongo(positions: List[Dict]):
    """Migrate positions to MongoDB."""
    manager = get_mongodb_manager()
    db = manager.get_database()
    config = get_mongodb_config()

    collection = db[config.get_collection_name("PORTFOLIO_POSITIONS")]

    # Count existing documents
    existing_count = await collection.count_documents({})

    logger.info(f"📊 Migrating {len(positions)} positions to MongoDB...")
    logger.info(f"   Existing documents: {existing_count}")

    if existing_count > 0:
        logger.warning("⚠️  Collection already has data. Skipping migration.")
        return

    # Insert all positions
    for position in positions:
        await collection.update_one(
            {"symbol": position["symbol"]},
            {
                "$set": {
                    "symbol": position["symbol"],
                    "shares": position["shares"],
                    "entry_price": position["entry_price"],
                    "entry_date": position["entry_date"],
                    "last_updated": position["last_updated"],
                }
            },
            upsert=True,
        )

    new_count = await collection.count_documents({})
    logger.info(f"✅ Migrated {new_count} positions to MongoDB")


async def migrate_trades_to_mongo(trades: List[Dict]):
    """Migrate trades to MongoDB."""
    manager = get_mongodb_manager()
    db = manager.get_database()
    config = get_mongodb_config()

    collection = db[config.get_collection_name("PORTFOLIO_TRADES")]

    # Count existing documents
    existing_count = await collection.count_documents({})

    logger.info(f"📊 Migrating {len(trades)} trades to MongoDB...")
    logger.info(f"   Existing documents: {existing_count}")

    if existing_count > 0:
        logger.warning("⚠️  Collection already has data. Skipping migration.")
        return

    # Insert all trades
    for trade in trades:
        await collection.insert_one(
            {
                "symbol": trade["symbol"],
                "action": trade["action"],
                "shares": trade["shares"],
                "price": trade["price"],
                "timestamp": trade["timestamp"],
                "pnl": trade["pnl"],
                "pnl_percent": trade["pnl_percent"],
            }
        )

    new_count = await collection.count_documents({})
    logger.info(f"✅ Migrated {new_count} trades to MongoDB")


async def migrate_metrics_to_mongo(metrics: Dict):
    """Migrate portfolio metrics to MongoDB."""
    if not metrics:
        logger.info("⚠️  No metrics to migrate")
        return

    manager = get_mongodb_manager()
    db = manager.get_database()
    config = get_mongodb_config()

    collection = db[config.get_collection_name("PORTFOLIO_METRICS")]

    # Count existing documents
    existing_count = await collection.count_documents({})

    logger.info(f"📊 Migrating portfolio metrics to MongoDB...")
    logger.info(f"   Existing documents: {existing_count}")

    if existing_count > 0:
        logger.warning("⚠️  Collection already has data. Skipping migration.")
        return

    # Insert metrics
    await collection.insert_one(
        {
            "total_value": metrics["total_value"],
            "cash_balance": metrics["cash_balance"],
            "total_invested": metrics["total_invested"],
            "last_updated": metrics["last_updated"],
        }
    )

    new_count = await collection.count_documents({})
    logger.info(f"✅ Migrated portfolio metrics to MongoDB")


async def verify_migration():
    """Verify the migration was successful."""
    manager = get_mongodb_manager()
    db = manager.get_database()
    config = get_mongodb_config()

    # Check positions collection
    positions_col = db[config.get_collection_name("PORTFOLIO_POSITIONS")]
    positions_count = await positions_col.count_documents({})

    # Check trades collection
    trades_col = db[config.get_collection_name("PORTFOLIO_TRADES")]
    trades_count = await trades_col.count_documents({})

    # Check metrics collection
    metrics_col = db[config.get_collection_name("PORTFOLIO_METRICS")]
    metrics_count = await metrics_col.count_documents({})

    logger.info("\n📊 Migration Verification:")
    logger.info(f"   Positions: {positions_count} documents")
    logger.info(f"   Trades: {trades_count} documents")
    logger.info(f"   Metrics: {metrics_count} documents")


async def main():
    """Main migration function."""
    logger.info("🚀 Starting Portfolio Migration: SQLite → MongoDB\n")

    # Find SQLite database
    db_path = project_root / "backend" / "data" / "portfolio.db"

    if not db_path.exists():
        logger.error(f"❌ SQLite database not found: {db_path}")
        sys.exit(1)

    logger.info(f"📂 Reading from: {db_path}")

    # Read SQLite data
    positions = read_sqlite_positions(db_path)
    trades = read_sqlite_trades(db_path)
    metrics = read_sqlite_metrics(db_path)

    logger.info(f"\n📊 Read from SQLite:")
    logger.info(f"   Positions: {len(positions)}")
    logger.info(f"   Trades: {len(trades)}")
    logger.info(f"   Metrics: {'Yes' if metrics else 'No'}")

    # Migrate to MongoDB
    logger.info(f"\n🔄 Migrating to MongoDB...")
    await migrate_positions_to_mongo(positions)
    await migrate_trades_to_mongo(trades)
    await migrate_metrics_to_mongo(metrics)

    # Verify migration
    await verify_migration()

    logger.info("\n✅ Migration completed successfully!")


if __name__ == "__main__":
    try:
        asyncio.run(main())
        sys.exit(0)
    except KeyboardInterrupt:
        logger.info("\n⚠️  Migration interrupted by user")
        sys.exit(1)
    except Exception as e:
        logger.error(f"\n❌ Migration failed: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)
