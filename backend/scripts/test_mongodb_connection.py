#!/usr/bin/env python3
"""
Test MongoDB Connection

Quick script to verify MongoDB connection is working.
"""

import asyncio
import sys
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from backend.core.database.mongodb_manager import get_mongodb_manager
from backend.config.mongodb import get_mongodb_config


async def test_connection():
    """Test MongoDB connection and print status."""
    print("🔌 Testing MongoDB connection...")
    print(f"   Database: {get_mongodb_config().get_database_name()}")
    print(
        f"   Connection string: {get_mongodb_config().get_connection_string()[:50]}...\n"
    )

    try:
        # Get MongoDB manager
        manager = get_mongodb_manager()

        # Test ping
        ping_result = await manager.ping()

        if ping_result:
            print("✅ MongoDB ping successful!")

            # Get health check
            health = await manager.health_check()
            print(f"\n📊 Health Check Results:")
            print(f"   Status: {health['status']}")
            print(f"   Database: {health.get('database', 'unknown')}")
            print(f"   Server Version: {health.get('server_version', 'unknown')}")
            print(f"   Collections: {health.get('total_collections', 0)}")

            if health.get("collections"):
                print(f"\n   Collections & Document Counts:")
                for collection, count in health["collections"].items():
                    print(f"      • {collection}: {count} documents")

            return True
        else:
            print("❌ MongoDB ping failed")
            return False

    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        return False


if __name__ == "__main__":
    try:
        result = asyncio.run(test_connection())
        sys.exit(0 if result else 1)
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        sys.exit(1)
