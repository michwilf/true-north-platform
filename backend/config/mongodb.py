"""
MongoDB Configuration and Settings

This module provides MongoDB connection settings and database configuration
for the True North Trading platform.
"""

import os
from typing import Optional


class MongoDBConfig:
    """MongoDB connection and database configuration."""

    # Connection string from environment variable
    CONNECTION_STRING: str = os.getenv(
        "MONGODB_URI",
        "mongodb+srv://mikeywilfert_db_user:5Srlrkz1jjV0eGTy@true-north-data.kuj9zd3.mongodb.net/?appName=true-north-data",
    )

    # Database name
    DATABASE_NAME: str = os.getenv("MONGODB_DATABASE", "true_north_trading")

    # Collection names
    COLLECTIONS = {
        # Portfolio collections
        "PORTFOLIO_POSITIONS": "portfolio_positions",
        "PORTFOLIO_TRADES": "portfolio_trades",
        "PORTFOLIO_METRICS": "portfolio_metrics",
        # Monitoring collections
        "ALERTS": "alerts",
        # Trader following collections
        "TRADERS": "traders",
        "TRADER_TRADES": "trader_trades",
        # Discovery collections
        "OPPORTUNITIES": "opportunities",
        # Market data collections
        "MARKET_REGIME": "market_regime",
        "SECTOR_ROTATION": "sector_rotation",
    }

    # Connection settings
    MAX_POOL_SIZE: int = 50
    MIN_POOL_SIZE: int = 10
    CONNECT_TIMEOUT: int = 5000  # milliseconds
    SERVER_SELECTION_TIMEOUT: int = 5000  # milliseconds

    # Retry settings
    MAX_RETRY_ATTEMPTS: int = 3
    RETRY_DELAY: float = 1.0  # seconds

    @classmethod
    def get_connection_string(cls) -> str:
        """Get MongoDB connection string."""
        return cls.CONNECTION_STRING

    @classmethod
    def get_database_name(cls) -> str:
        """Get database name."""
        return cls.DATABASE_NAME

    @classmethod
    def get_collection_name(cls, key: str) -> str:
        """Get collection name by key."""
        return cls.COLLECTIONS.get(key, key.lower())

    @classmethod
    def get_connection_options(cls) -> dict:
        """Get connection options for MongoDB client."""
        return {
            "maxPoolSize": cls.MAX_POOL_SIZE,
            "minPoolSize": cls.MIN_POOL_SIZE,
            "connectTimeoutMS": cls.CONNECT_TIMEOUT,
            "serverSelectionTimeoutMS": cls.SERVER_SELECTION_TIMEOUT,
            "retryWrites": True,
            "retryReads": True,
        }


# Singleton instance
mongodb_config = MongoDBConfig()


def get_mongodb_config() -> MongoDBConfig:
    """Get MongoDB configuration instance."""
    return mongodb_config
