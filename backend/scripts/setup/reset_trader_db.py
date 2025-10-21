#!/usr/bin/env python3
"""
Reset Trader Database

This script resets the trader database and creates sample data with correct schema.
"""

import sys
import os
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from backend.systems.trader_following_system import (
    TraderFollowingSystem,
    TraderProfile,
    TraderPlatform,
)
from datetime import datetime


def reset_database():
    """Reset and populate trader database with sample data."""

    print("🔄 Resetting trader database...")

    # Initialize system (this will create fresh database)
    trader_system = TraderFollowingSystem()

    # Create sample traders with correct schema
    sample_traders = [
        TraderProfile(
            trader_id="market_wizard_001",
            name="Market Wizard",
            platform=TraderPlatform.TWITTER,
            username="marketwizard",
            win_rate=0.75,
            avg_return=0.12,
            total_followers=15420,  # Using correct attribute name
            verified=True,
            primary_strategy="swing_trading",
            typical_hold_time="days",
            risk_level="medium",
            confidence_score=0.8,
            auto_follow=False,
            notification_enabled=True,
            last_activity=datetime.now(),
            total_trades_tracked=156,
        ),
        TraderProfile(
            trader_id="crypto_king_002",
            name="Crypto King",
            platform=TraderPlatform.DISCORD,
            username="cryptoking",
            win_rate=0.68,
            avg_return=0.18,
            total_followers=8930,
            verified=True,
            primary_strategy="momentum",
            typical_hold_time="hours",
            risk_level="high",
            confidence_score=0.7,
            auto_follow=False,
            notification_enabled=True,
            last_activity=datetime.now(),
            total_trades_tracked=89,
        ),
        TraderProfile(
            trader_id="value_hunter_003",
            name="Value Hunter",
            platform=TraderPlatform.REDDIT,
            username="valuehunter",
            win_rate=0.82,
            avg_return=0.09,
            total_followers=12650,
            verified=False,
            primary_strategy="value_investing",
            typical_hold_time="weeks",
            risk_level="low",
            confidence_score=0.9,
            auto_follow=True,
            notification_enabled=True,
            last_activity=datetime.now(),
            total_trades_tracked=234,
        ),
    ]

    # Add sample traders to database
    for trader in sample_traders:
        try:
            trader_system.database.add_trader(trader)
            print(f"✅ Added trader: {trader.name} (@{trader.username})")
        except Exception as e:
            print(f"❌ Error adding {trader.name}: {e}")

    print(f"\n🎉 Database reset complete!")
    print(f"📊 Added {len(sample_traders)} sample traders")
    print("🔄 Restart the dashboard to see changes")


if __name__ == "__main__":
    reset_database()
