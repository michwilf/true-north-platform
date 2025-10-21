"""
Portfolio Tracking System

Tracks portfolio positions, performance metrics, and trade history.
"""

import sqlite3
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Optional, Any
from dataclasses import dataclass
import json


@dataclass
class Position:
    """Represents a portfolio position."""

    symbol: str
    shares: float
    entry_price: float
    current_price: float
    entry_date: datetime
    position_value: float
    unrealized_pnl: float
    unrealized_pnl_percent: float


@dataclass
class Trade:
    """Represents a completed trade."""

    id: int
    symbol: str
    action: str  # 'BUY' or 'SELL'
    shares: float
    price: float
    timestamp: datetime
    pnl: Optional[float] = None
    pnl_percent: Optional[float] = None


class PortfolioTracker:
    """Tracks portfolio positions and performance metrics."""

    def __init__(self, db_path: Optional[Path] = None):
        """Initialize portfolio tracker with database."""
        if db_path is None:
            # Default to backend/data/portfolio.db
            project_root = Path(__file__).parent.parent.parent.parent
            db_path = project_root / "backend" / "data" / "portfolio.db"

        self.db_path = db_path
        self._init_database()

    def _init_database(self):
        """Initialize database tables."""
        self.db_path.parent.mkdir(parents=True, exist_ok=True)

        conn = sqlite3.connect(str(self.db_path))
        cursor = conn.cursor()

        # Positions table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS positions (
                symbol TEXT PRIMARY KEY,
                shares REAL NOT NULL,
                entry_price REAL NOT NULL,
                entry_date TEXT NOT NULL,
                last_updated TEXT NOT NULL
            )
        """
        )

        # Trades table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS trades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                symbol TEXT NOT NULL,
                action TEXT NOT NULL,
                shares REAL NOT NULL,
                price REAL NOT NULL,
                timestamp TEXT NOT NULL,
                pnl REAL,
                pnl_percent REAL
            )
        """
        )

        # Portfolio metrics cache table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS portfolio_metrics (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                total_value REAL NOT NULL,
                cash_balance REAL NOT NULL,
                total_invested REAL NOT NULL,
                last_updated TEXT NOT NULL
            )
        """
        )

        conn.commit()
        conn.close()

    def add_position(
        self,
        symbol: str,
        shares: float,
        entry_price: float,
        entry_date: Optional[datetime] = None,
    ):
        """Add or update a position."""
        if entry_date is None:
            entry_date = datetime.now()

        conn = sqlite3.connect(str(self.db_path))
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT OR REPLACE INTO positions (symbol, shares, entry_price, entry_date, last_updated)
            VALUES (?, ?, ?, ?, ?)
        """,
            (
                symbol,
                shares,
                entry_price,
                entry_date.isoformat(),
                datetime.now().isoformat(),
            ),
        )

        conn.commit()
        conn.close()

    def remove_position(self, symbol: str):
        """Remove a position."""
        conn = sqlite3.connect(str(self.db_path))
        cursor = conn.cursor()

        cursor.execute("DELETE FROM positions WHERE symbol = ?", (symbol,))

        conn.commit()
        conn.close()

    def record_trade(
        self,
        symbol: str,
        action: str,
        shares: float,
        price: float,
        pnl: Optional[float] = None,
        pnl_percent: Optional[float] = None,
    ):
        """Record a trade."""
        conn = sqlite3.connect(str(self.db_path))
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO trades (symbol, action, shares, price, timestamp, pnl, pnl_percent)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
            (
                symbol,
                action,
                shares,
                price,
                datetime.now().isoformat(),
                pnl,
                pnl_percent,
            ),
        )

        conn.commit()
        conn.close()

    def get_positions(
        self, current_prices: Optional[Dict[str, float]] = None
    ) -> List[Position]:
        """Get all current positions with P&L calculations."""
        conn = sqlite3.connect(str(self.db_path))
        cursor = conn.cursor()

        cursor.execute("SELECT symbol, shares, entry_price, entry_date FROM positions")
        rows = cursor.fetchall()
        conn.close()

        positions = []
        for symbol, shares, entry_price, entry_date in rows:
            # Get current price (from provided dict or use entry price as fallback)
            current_price = (
                current_prices.get(symbol, entry_price)
                if current_prices
                else entry_price
            )

            position_value = shares * current_price
            cost_basis = shares * entry_price
            unrealized_pnl = position_value - cost_basis
            unrealized_pnl_percent = (
                (unrealized_pnl / cost_basis * 100) if cost_basis > 0 else 0
            )

            positions.append(
                Position(
                    symbol=symbol,
                    shares=shares,
                    entry_price=entry_price,
                    current_price=current_price,
                    entry_date=datetime.fromisoformat(entry_date),
                    position_value=position_value,
                    unrealized_pnl=unrealized_pnl,
                    unrealized_pnl_percent=unrealized_pnl_percent,
                )
            )

        return positions

    def get_trades(
        self, limit: int = 100, days_back: Optional[int] = None
    ) -> List[Trade]:
        """Get trade history."""
        conn = sqlite3.connect(str(self.db_path))
        cursor = conn.cursor()

        if days_back:
            cutoff_date = datetime.now() - timedelta(days=days_back)
            cursor.execute(
                """
                SELECT id, symbol, action, shares, price, timestamp, pnl, pnl_percent
                FROM trades
                WHERE timestamp >= ?
                ORDER BY timestamp DESC
                LIMIT ?
            """,
                (cutoff_date.isoformat(), limit),
            )
        else:
            cursor.execute(
                """
                SELECT id, symbol, action, shares, price, timestamp, pnl, pnl_percent
                FROM trades
                ORDER BY timestamp DESC
                LIMIT ?
            """,
                (limit,),
            )

        rows = cursor.fetchall()
        conn.close()

        trades = []
        for row in rows:
            trades.append(
                Trade(
                    id=row[0],
                    symbol=row[1],
                    action=row[2],
                    shares=row[3],
                    price=row[4],
                    timestamp=datetime.fromisoformat(row[5]),
                    pnl=row[6],
                    pnl_percent=row[7],
                )
            )

        return trades

    def calculate_metrics(
        self, current_prices: Optional[Dict[str, float]] = None
    ) -> Dict[str, Any]:
        """Calculate portfolio performance metrics."""
        positions = self.get_positions(current_prices)
        trades = self.get_trades(days_back=1)  # Last 24 hours

        # Calculate total portfolio value
        total_value = sum(pos.position_value for pos in positions)
        total_cost_basis = sum(pos.shares * pos.entry_price for pos in positions)
        total_unrealized_pnl = total_value - total_cost_basis

        # Calculate daily P&L from today's trades
        daily_pnl = sum(trade.pnl for trade in trades if trade.pnl is not None)

        # If no trades today, use unrealized P&L change (simplified)
        if not trades:
            daily_pnl = 0.0

        daily_pnl_percent = (
            (daily_pnl / total_cost_basis * 100) if total_cost_basis > 0 else 0.0
        )

        # Calculate win rate from all trades
        all_trades = self.get_trades(limit=1000)
        winning_trades = [t for t in all_trades if t.pnl and t.pnl > 0]
        win_rate = (len(winning_trades) / len(all_trades) * 100) if all_trades else 0.0

        return {
            "total_value": round(total_value, 2),
            "daily_pnl": round(daily_pnl, 2),
            "daily_pnl_percent": round(daily_pnl_percent, 2),
            "active_positions": len(positions),
            "win_rate": round(win_rate, 2),
            "total_trades": len(all_trades),
            "total_unrealized_pnl": round(total_unrealized_pnl, 2),
            "total_cost_basis": round(total_cost_basis, 2),
        }

    def seed_demo_data(self):
        """Seed database with demo portfolio data for testing."""
        demo_positions = [
            ("AAPL", 50, 245.30, datetime.now() - timedelta(days=30)),
            ("MSFT", 30, 405.20, datetime.now() - timedelta(days=45)),
            ("GOOGL", 25, 140.50, datetime.now() - timedelta(days=20)),
            ("NVDA", 40, 450.75, datetime.now() - timedelta(days=15)),
            ("META", 20, 485.60, datetime.now() - timedelta(days=60)),
        ]

        for symbol, shares, entry_price, entry_date in demo_positions:
            self.add_position(symbol, shares, entry_price, entry_date)

        # Add some demo trades
        demo_trades = [
            ("TSLA", "BUY", 10, 242.50, None, None),
            ("TSLA", "SELL", 10, 255.30, 128.0, 5.3),
            ("AMZN", "BUY", 15, 145.20, None, None),
            ("AMZN", "SELL", 15, 151.80, 99.0, 4.5),
        ]

        for symbol, action, shares, price, pnl, pnl_percent in demo_trades:
            self.record_trade(symbol, action, shares, price, pnl, pnl_percent)

        print("✅ Portfolio seeded with demo data")
