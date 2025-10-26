"""
MongoDB Connection Manager

Provides a singleton MongoDB client with async support using Motor.
Handles connection pooling, retries, and error recovery.
"""

import logging
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from backend.config.mongodb import get_mongodb_config

logger = logging.getLogger(__name__)


class MongoDBManager:
    """Singleton MongoDB connection manager."""

    _instance: Optional["MongoDBManager"] = None
    _client: Optional[AsyncIOMotorClient] = None
    _database: Optional[AsyncIOMotorDatabase] = None

    def __new__(cls):
        """Create singleton instance."""
        if cls._instance is None:
            cls._instance = super(MongoDBManager, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        """Initialize MongoDB connection manager."""
        if self._client is None:
            self._config = get_mongodb_config()
            self._connect()

    def _connect(self):
        """Connect to MongoDB."""
        try:
            logger.info("🔌 Connecting to MongoDB...")
            logger.info(f"   Database: {self._config.get_database_name()}")
            logger.info(
                f"   Connection string: {self._config.get_connection_string()[:50]}..."
            )

            # Create async motor client
            self._client = AsyncIOMotorClient(
                self._config.get_connection_string(),
                **self._config.get_connection_options(),
            )

            # Get database
            self._database = self._client[self._config.get_database_name()]

            logger.info("✅ MongoDB connection established successfully!")

        except Exception as e:
            logger.error(f"❌ Failed to connect to MongoDB: {e}")
            raise

    async def ping(self) -> bool:
        """Check if MongoDB connection is alive."""
        try:
            if self._client is None:
                return False

            await self._client.admin.command("ping")
            logger.debug("✅ MongoDB ping successful")
            return True

        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            logger.error(f"❌ MongoDB ping failed: {e}")
            return False
        except Exception as e:
            logger.error(f"❌ Unexpected error during ping: {e}")
            return False

    def get_database(self) -> AsyncIOMotorDatabase:
        """Get the database instance."""
        if self._database is None:
            raise RuntimeError("MongoDB database not initialized")
        return self._database

    def get_client(self) -> AsyncIOMotorClient:
        """Get the MongoDB client."""
        if self._client is None:
            raise RuntimeError("MongoDB client not initialized")
        return self._client

    async def close(self):
        """Close MongoDB connection."""
        if self._client:
            logger.info("🔌 Closing MongoDB connection...")
            self._client.close()
            self._client = None
            self._database = None
            logger.info("✅ MongoDB connection closed")

    async def health_check(self) -> dict:
        """Perform a comprehensive health check."""
        try:
            db = self.get_database()

            # Check connection
            ping_result = await self.ping()

            # Get server info
            server_info = await self._client.server_info()

            # Count documents in each collection
            collections = await db.list_collection_names()
            collection_counts = {}
            for collection_name in collections:
                collection = db[collection_name]
                count = await collection.count_documents({})
                collection_counts[collection_name] = count

            return {
                "status": "healthy" if ping_result else "unhealthy",
                "ping": ping_result,
                "database": self._config.get_database_name(),
                "server_version": server_info.get("version", "unknown"),
                "collections": collection_counts,
                "total_collections": len(collections),
            }

        except Exception as e:
            logger.error(f"❌ Health check failed: {e}")
            return {"status": "unhealthy", "ping": False, "error": str(e)}


# Singleton instance
_mongodb_manager: Optional[MongoDBManager] = None


def get_mongodb_manager() -> MongoDBManager:
    """Get the singleton MongoDB manager instance."""
    global _mongodb_manager
    if _mongodb_manager is None:
        _mongodb_manager = MongoDBManager()
    return _mongodb_manager


async def init_mongodb() -> MongoDBManager:
    """Initialize MongoDB connection."""
    manager = get_mongodb_manager()
    await manager.ping()  # Test connection
    return manager


async def close_mongodb():
    """Close MongoDB connection."""
    if _mongodb_manager:
        await _mongodb_manager.close()
