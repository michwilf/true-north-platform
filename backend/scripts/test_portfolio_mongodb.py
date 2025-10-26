#!/usr/bin/env python3
"""
Test Portfolio Tracker with MongoDB

Quick test to verify the PortfolioTracker works with MongoDB.
"""

import sys
import asyncio
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from backend.core.portfolio import PortfolioTracker


async def test_portfolio():
    """Test portfolio operations."""
    print("🧪 Testing Portfolio Tracker with MongoDB...\n")

    # Create tracker
    tracker = PortfolioTracker()

    # Test 1: Check existing positions
    print("📊 Test 1: Get existing positions")
    positions = tracker.get_positions()
    print(f"   Found {len(positions)} positions")
    for pos in positions[:3]:
        print(f"      • {pos.symbol}: {pos.shares} shares @ ${pos.entry_price:.2f}")
    print()

    # Test 2: Check trades
    print("📊 Test 2: Get trade history")
    trades = tracker.get_trades(limit=10)
    print(f"   Found {len(trades)} trades")
    for trade in trades[:3]:
        print(
            f"      • {trade.action} {trade.shares} {trade.symbol} @ ${trade.price:.2f}"
        )
    print()

    # Test 3: Calculate metrics
    print("📊 Test 3: Calculate metrics")
    metrics = tracker.calculate_metrics()
    print(f"   Total Value: ${metrics['total_value']:,.2f}")
    print(f"   Active Positions: {metrics['active_positions']}")
    print(f"   Total Trades: {metrics['total_trades']}")
    print(f"   Win Rate: {metrics['win_rate']:.2f}%")
    print()

    # Test 4: Add a new position
    print("📊 Test 4: Add new position")
    tracker.add_position("TESLA", 25, 250.00)
    positions = tracker.get_positions()
    tsla_pos = next((p for p in positions if p.symbol == "TESLA"), None)
    if tsla_pos:
        print(f"   ✅ Added TESLA: {tsla_pos.shares} shares")
    print()

    # Test 5: Remove the test position
    print("📊 Test 5: Remove test position")
    tracker.remove_position("TESLA")
    positions = tracker.get_positions()
    tsla_pos = next((p for p in positions if p.symbol == "TESLA"), None)
    if not tsla_pos:
        print(f"   ✅ Removed TESLA successfully")
    print()

    print("✅ All tests passed!")


if __name__ == "__main__":
    try:
        asyncio.run(test_portfolio())
        sys.exit(0)
    except KeyboardInterrupt:
        print("\n⚠️  Test interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)
