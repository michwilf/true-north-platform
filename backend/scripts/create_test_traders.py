#!/usr/bin/env python3
"""
Create Test Traders and Trades

Creates sample trader data in MongoDB to test the system.
"""

import sys
from datetime import datetime, timedelta
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from backend.core.trader_following.system import (
    TraderProfile,
    TraderTrade,
    TraderPlatform,
    TradeType,
)
from backend.core.trader_following.trader_database_mongo import TraderDatabase


def create_test_traders():
    """Create test traders and their trades."""
    print("🚀 Creating test traders in MongoDB...\n")

    # Initialize database
    db = TraderDatabase()

    # Create test traders
    traders = [
        TraderProfile(
            trader_id="trader_001",
            name="WallStreetWarrior",
            platform=TraderPlatform.REDDIT,
            username="wallstreet_warrior",
            win_rate=72.5,
            avg_return=15.3,
            total_followers=8542,
            verified=True,
            primary_strategy="momentum",
            typical_hold_time="hours",
            risk_level="medium",
            confidence_score=0.85,
            auto_follow=False,
            notification_enabled=True,
            added_date=datetime.now() - timedelta(days=30),
            last_activity=datetime.now() - timedelta(hours=2),
            total_trades_tracked=142,
        ),
        TraderProfile(
            trader_id="trader_002",
            name="TheCryptoKing",
            platform=TraderPlatform.TWITTER,
            username="crypto_king",
            win_rate=58.0,
            avg_return=22.1,
            total_followers=15000,
            verified=True,
            primary_strategy="swing",
            typical_hold_time="days",
            risk_level="high",
            confidence_score=0.70,
            auto_follow=False,
            notification_enabled=True,
            added_date=datetime.now() - timedelta(days=60),
            last_activity=datetime.now() - timedelta(hours=5),
            total_trades_tracked=98,
        ),
        TraderProfile(
            trader_id="trader_003",
            name="GrowthGuru",
            platform=TraderPlatform.REDDIT,
            username="growth_guru",
            win_rate=65.0,
            avg_return=18.5,
            total_followers=3200,
            verified=False,
            primary_strategy="value",
            typical_hold_time="weeks",
            risk_level="low",
            confidence_score=0.65,
            auto_follow=True,
            notification_enabled=True,
            added_date=datetime.now() - timedelta(days=15),
            last_activity=datetime.now() - timedelta(minutes=30),
            total_trades_tracked=56,
        ),
    ]

    # Save traders
    trader_count = 0
    for trader in traders:
        try:
            db.add_trader(trader)
            trader_count += 1
            print(f"✅ Created trader: {trader.name} ({trader.trader_id})")
        except Exception as e:
            print(f"❌ Failed to create trader {trader.trader_id}: {e}")

    print(f"\n📊 Created {trader_count} traders")

    # Create test trades for each trader
    trades = [
        # Trades for trader_001 (WallStreetWarrior)
        TraderTrade(
            trade_id="trade_001",
            trader_id="trader_001",
            symbol="AAPL",
            trade_type=TradeType.LONG,
            entry_price=180.50,
            entry_time=datetime.now() - timedelta(days=2),
            entry_confidence=0.75,
            exit_price=185.20,
            exit_time=datetime.now() - timedelta(days=1),
            position_size=10000.0,
            stop_loss=175.0,
            take_profit=190.0,
            pnl_percent=2.6,
            pnl_dollar=47.0,
            is_closed=True,
            source_post_id="post_123",
            source_text="Going long AAPL after earnings",
            platform=TraderPlatform.REDDIT,
            sentiment_score=0.8,
            conviction_level="high",
        ),
        TraderTrade(
            trade_id="trade_002",
            trader_id="trader_001",
            symbol="TSLA",
            trade_type=TradeType.LONG,
            entry_price=245.00,
            entry_time=datetime.now() - timedelta(hours=4),
            entry_confidence=0.65,
            exit_price=None,
            exit_time=None,
            position_size=5000.0,
            stop_loss=240.0,
            take_profit=260.0,
            pnl_percent=None,
            pnl_dollar=None,
            is_closed=False,
            source_post_id="post_124",
            source_text="TSLA momentum play",
            platform=TraderPlatform.REDDIT,
            sentiment_score=0.7,
            conviction_level="medium",
        ),
        # Trades for trader_002 (TheCryptoKing)
        TraderTrade(
            trade_id="trade_003",
            trader_id="trader_002",
            symbol="NVDA",
            trade_type=TradeType.LONG,
            entry_price=485.00,
            entry_time=datetime.now() - timedelta(days=3),
            entry_confidence=0.80,
            exit_price=510.00,
            exit_time=datetime.now() - timedelta(days=1),
            position_size=15000.0,
            stop_loss=470.0,
            take_profit=530.0,
            pnl_percent=5.15,
            pnl_dollar=375.0,
            is_closed=True,
            source_post_id="tweet_456",
            source_text="NVDA breaking out!",
            platform=TraderPlatform.TWITTER,
            sentiment_score=0.9,
            conviction_level="very_high",
        ),
        # Trades for trader_003 (GrowthGuru)
        TraderTrade(
            trade_id="trade_004",
            trader_id="trader_003",
            symbol="MSFT",
            trade_type=TradeType.LONG,
            entry_price=405.00,
            entry_time=datetime.now() - timedelta(days=7),
            entry_confidence=0.70,
            exit_price=415.50,
            exit_time=datetime.now() - timedelta(days=3),
            position_size=8000.0,
            stop_loss=395.0,
            take_profit=425.0,
            pnl_percent=2.59,
            pnl_dollar=84.0,
            is_closed=True,
            source_post_id="post_789",
            source_text="MSFT steady growth play",
            platform=TraderPlatform.REDDIT,
            sentiment_score=0.6,
            conviction_level="medium",
        ),
    ]

    # Save trades
    trade_count = 0
    for trade in trades:
        try:
            db.add_trade(trade)
            trade_count += 1
            print(f"✅ Created trade: {trade.symbol} ({trade.trade_id})")
        except Exception as e:
            print(f"❌ Failed to create trade {trade.trade_id}: {e}")

    print(f"📊 Created {trade_count} trades")

    # Show summary
    print("\n📈 Database Summary:")
    all_traders = db.get_traders()
    print(f"   Total Traders: {len(all_traders)}")
    for trader in all_traders:
        print(
            f"      • {trader.name} - {trader.win_rate}% win rate, {trader.total_trades_tracked} trades"
        )

    all_trades = db.get_recent_trades(days=7)
    print(f"\n   Recent Trades (last 7 days): {len(all_trades)}")
    for trade in all_trades[:5]:
        status = "✅ Closed" if trade.is_closed else "🔴 Open"
        print(
            f"      [{status}] {trade.symbol} {trade.trade_type.value} @ ${trade.entry_price}"
        )


if __name__ == "__main__":
    try:
        create_test_traders()
        print("\n✅ Test traders and trades creation complete!")
        sys.exit(0)
    except KeyboardInterrupt:
        print("\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Error creating traders: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)
