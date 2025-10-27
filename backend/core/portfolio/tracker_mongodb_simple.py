"""
Portfolio Tracking System - MongoDB Implementation (Simplified)

Uses sync Pymongo operations throughout for compatibility with FastAPI startup.
"""

import logging
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Any
from dataclasses import dataclass
from pymongo import MongoClient

from backend.config.mongodb import get_mongodb_config

logger = logging.getLogger(__name__)


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

    # New strategic fields for Phase 2
    side: str = "long"  # "long" or "short"
    target_price: Optional[float] = None
    stop_loss: Optional[float] = None
    reasoning: Optional[str] = None
    confidence: Optional[float] = None
    strategy: Optional[str] = None  # Which agent recommended
    timeframe: Optional[str] = None  # Expected holding period
    risk_level: Optional[str] = None  # LOW, MEDIUM, HIGH


@dataclass
class Trade:
    """Represents a completed trade."""

    id: str  # MongoDB ObjectId as string
    symbol: str
    action: str  # 'BUY' or 'SELL'
    shares: float
    price: float
    timestamp: datetime
    pnl: Optional[float] = None
    pnl_percent: Optional[float] = None


class PortfolioTracker:
    """Tracks portfolio positions and performance metrics using MongoDB."""

    def __init__(self):
        """Initialize portfolio tracker with MongoDB."""
        self._config = get_mongodb_config()
        self._client: Optional[MongoClient] = None
        self._initialized = False

    def _get_client(self) -> MongoClient:
        """Get or create MongoDB client."""
        if self._client is None:
            self._client = MongoClient(
                self._config.get_connection_string(),
                **self._config.get_connection_options(),
            )
        return self._client

    def _get_collection(self, collection_key: str):
        """Get a MongoDB collection."""
        client = self._get_client()
        db = client[self._config.get_database_name()]
        return db[self._config.get_collection_name(collection_key)]

    def _ensure_initialized(self):
        """Ensure MongoDB is initialized."""
        if not self._initialized:
            self._initialize()
            self._initialized = True

    def _initialize(self):
        """Initialize collections and indexes."""
        try:
            positions_col = self._get_collection("PORTFOLIO_POSITIONS")
            positions_col.create_index("symbol", unique=True)
            positions_col.create_index("entry_date")

            trades_col = self._get_collection("PORTFOLIO_TRADES")
            trades_col.create_index("timestamp")
            trades_col.create_index("symbol")
            trades_col.create_index([("timestamp", -1)])

            metrics_col = self._get_collection("PORTFOLIO_METRICS")
            metrics_col.create_index("last_updated")

            logger.info("✅ Portfolio collections initialized")
        except Exception as e:
            logger.error(f"❌ Error initializing collections: {e}")

    def add_position(
        self,
        symbol: str,
        shares: float,
        entry_price: float,
        entry_date: Optional[datetime] = None,
        side: str = "long",
        target_price: Optional[float] = None,
        stop_loss: Optional[float] = None,
        reasoning: Optional[str] = None,
        confidence: Optional[float] = None,
        strategy: Optional[str] = None,
        timeframe: Optional[str] = None,
        risk_level: Optional[str] = None,
    ) -> bool:
        """Add or update a position with comprehensive metadata."""
        self._ensure_initialized()

        if entry_date is None:
            entry_date = datetime.now()

        try:
            collection = self._get_collection("PORTFOLIO_POSITIONS")

            document = {
                "symbol": symbol,
                "shares": shares,
                "entry_price": entry_price,
                "entry_date": entry_date,
                "last_updated": datetime.now(),
                # Phase 2: Enhanced fields
                "side": side,
                "target_price": target_price,
                "stop_loss": stop_loss,
                "reasoning": reasoning,
                "confidence": confidence,
                "strategy": strategy,
                "timeframe": timeframe,
                "risk_level": risk_level,
            }

            collection.update_one({"symbol": symbol}, {"$set": document}, upsert=True)

            logger.debug(f"✅ Position updated: {symbol}")
            return True
        except Exception as e:
            logger.error(f"❌ Error adding position {symbol}: {e}")
            raise

    def update_position(self, symbol: str, updates: Dict[str, Any]) -> bool:
        """Update specific fields of an existing position."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("PORTFOLIO_POSITIONS")
            
            # Add last_updated timestamp
            updates["last_updated"] = datetime.now()
            
            result = collection.update_one(
                {"symbol": symbol},
                {"$set": updates}
            )

            if result.modified_count > 0:
                logger.debug(f"✅ Position updated: {symbol}")
                return True
            else:
                logger.warning(f"⚠️  Position not found for update: {symbol}")
                return False
        except Exception as e:
            logger.error(f"❌ Error updating position {symbol}: {e}")
            raise

    def remove_position(self, symbol: str) -> bool:
        """Remove a position."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("PORTFOLIO_POSITIONS")
            result = collection.delete_one({"symbol": symbol})

            if result.deleted_count > 0:
                logger.debug(f"✅ Position removed: {symbol}")
                return True
            else:
                logger.warning(f"⚠️  Position not found: {symbol}")
                return False
        except Exception as e:
            logger.error(f"❌ Error removing position {symbol}: {e}")
            raise

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
        self._ensure_initialized()

        try:
            collection = self._get_collection("PORTFOLIO_TRADES")

            document = {
                "symbol": symbol,
                "action": action,
                "shares": shares,
                "price": price,
                "timestamp": datetime.now(),
                "pnl": pnl,
                "pnl_percent": pnl_percent,
            }

            collection.insert_one(document)
            logger.debug(f"✅ Trade recorded: {action} {shares} shares of {symbol}")
        except Exception as e:
            logger.error(f"❌ Error recording trade: {e}")
            raise

    def get_positions(
        self, current_prices: Optional[Dict[str, float]] = None
    ) -> List[Position]:
        """Get all current positions with P&L calculations."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("PORTFOLIO_POSITIONS")
            rows = list(collection.find({}))

            positions = []
            for row in rows:
                symbol = row["symbol"]
                shares = row["shares"]
                entry_price = row["entry_price"]
                entry_date = row["entry_date"]

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

                # Phase 2: Extract new fields from MongoDB
                positions.append(
                    Position(
                        symbol=symbol,
                        shares=shares,
                        entry_price=entry_price,
                        current_price=current_price,
                        entry_date=entry_date,
                        position_value=position_value,
                        unrealized_pnl=unrealized_pnl,
                        unrealized_pnl_percent=unrealized_pnl_percent,
                        # Phase 2: New fields with defaults if not present
                        side=row.get("side", "long"),
                        target_price=row.get("target_price"),
                        stop_loss=row.get("stop_loss"),
                        reasoning=row.get("reasoning"),
                        confidence=row.get("confidence"),
                        strategy=row.get("strategy"),
                        timeframe=row.get("timeframe"),
                        risk_level=row.get("risk_level"),
                    )
                )

            return positions
        except Exception as e:
            logger.error(f"❌ Error getting positions: {e}")
            return []

    def get_trades(
        self, limit: int = 100, days_back: Optional[int] = None
    ) -> List[Trade]:
        """Get trade history."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("PORTFOLIO_TRADES")

            query = {}
            if days_back:
                cutoff_date = datetime.now() - timedelta(days=days_back)
                query = {"timestamp": {"$gte": cutoff_date}}

            cursor = collection.find(query).sort("timestamp", -1).limit(limit)
            rows = list(cursor)

            trades = []
            for row in rows:
                trades.append(
                    Trade(
                        id=str(row.get("_id", "")),
                        symbol=row["symbol"],
                        action=row["action"],
                        shares=row["shares"],
                        price=row["price"],
                        timestamp=row["timestamp"],
                        pnl=row.get("pnl"),
                        pnl_percent=row.get("pnl_percent"),
                    )
                )

            return trades
        except Exception as e:
            logger.error(f"❌ Error getting trades: {e}")
            return []

    def calculate_metrics(
        self, current_prices: Optional[Dict[str, float]] = None
    ) -> Dict[str, Any]:
        """Calculate portfolio performance metrics."""
        positions = self.get_positions(current_prices)
        trades = self.get_trades(days_back=1)

        total_value = sum(pos.position_value for pos in positions)
        total_cost_basis = sum(pos.shares * pos.entry_price for pos in positions)
        total_unrealized_pnl = total_value - total_cost_basis

        daily_pnl = sum(trade.pnl for trade in trades if trade.pnl is not None)
        if not trades:
            daily_pnl = 0.0

        daily_pnl_percent = (
            (daily_pnl / total_cost_basis * 100) if total_cost_basis > 0 else 0.0
        )

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

        demo_trades = [
            ("TSLA", "BUY", 10, 242.50, None, None),
            ("TSLA", "SELL", 10, 255.30, 128.0, 5.3),
            ("AMZN", "BUY", 15, 145.20, None, None),
            ("AMZN", "SELL", 15, 151.80, 99.0, 4.5),
        ]

        for symbol, action, shares, price, pnl, pnl_percent in demo_trades:
            self.record_trade(symbol, action, shares, price, pnl, pnl_percent)

        logger.info("✅ Portfolio seeded with demo data")
