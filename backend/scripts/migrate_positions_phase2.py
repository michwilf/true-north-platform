"""
Migration script to add new fields to existing positions.
Adds: side, target_price, stop_loss, reasoning, confidence, strategy, timeframe, risk_level
"""

from pymongo import MongoClient
from backend.config.mongodb import get_mongodb_config


def migrate_positions():
    """Add Phase 2 fields to existing positions with default values."""
    config = get_mongodb_config()
    client = MongoClient(
        config.get_connection_string(),
        **config.get_connection_options(),
    )
    db = client[config.get_database_name()]
    collection = db[config.get_collection_name("PORTFOLIO_POSITIONS")]

    # Update all positions with default values for new fields
    # Only update fields that don't already exist
    result = collection.update_many(
        {
            "$or": [
                {"side": {"$exists": False}},
                {"target_price": {"$exists": False}},
                {"stop_loss": {"$exists": False}},
                {"reasoning": {"$exists": False}},
                {"confidence": {"$exists": False}},
                {"strategy": {"$exists": False}},
                {"timeframe": {"$exists": False}},
                {"risk_level": {"$exists": False}},
            ]
        },
        {
            "$set": {
                "side": "long",
                "target_price": None,
                "stop_loss": None,
                "reasoning": None,
                "confidence": None,
                "strategy": None,
                "timeframe": None,
                "risk_level": None,
            }
        },
        upsert=False,
    )

    print(f"✅ Migrated {result.modified_count} positions with Phase 2 fields")

    # Verify migration
    total = collection.count_documents({})
    migrated = collection.count_documents({"side": {"$exists": True}})
    print(f"📊 Total positions: {total}, With new fields: {migrated}")

    client.close()


if __name__ == "__main__":
    migrate_positions()
