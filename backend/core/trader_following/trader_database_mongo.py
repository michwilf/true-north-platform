"""
Trader Database - MongoDB Implementation

Simple sync PyMongo-based implementation for trader tracking.
"""

import logging
from datetime import datetime, timedelta
from typing import List, Optional
from pymongo import MongoClient

from backend.core.trader_following.system import (
    TraderProfile,
    TraderTrade,
    TraderPlatform,
    TradeType,
)
from backend.config.mongodb import get_mongodb_config

logger = logging.getLogger(__name__)


class TraderDatabase:
    """Database for storing trader and trade information using MongoDB."""

    def __init__(self):
        """Initialize trader database with MongoDB."""
        self._config = get_mongodb_config()
        self._client: MongoClient = None
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
            traders_col = self._get_collection("TRADERS")
            traders_col.create_index("trader_id", unique=True)
            traders_col.create_index("platform")
            traders_col.create_index("added_date")

            trades_col = self._get_collection("TRADER_TRADES")
            trades_col.create_index("trade_id", unique=True)
            trades_col.create_index("trader_id")
            trades_col.create_index("symbol")
            trades_col.create_index("entry_time")
            trades_col.create_index("is_closed")
            trades_col.create_index([("entry_time", -1)])

            logger.info("✅ Trader collections initialized")
        except Exception as e:
            logger.error(f"❌ Error initializing collections: {e}")

    def add_trader(self, trader: TraderProfile):
        """Add or update a trader profile."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("TRADERS")

            document = {
                "trader_id": trader.trader_id,
                "name": trader.name,
                "platform": trader.platform.value,
                "username": trader.username,
                "win_rate": trader.win_rate,
                "avg_return": trader.avg_return,
                "total_followers": trader.total_followers,
                "verified": trader.verified,
                "primary_strategy": trader.primary_strategy,
                "typical_hold_time": trader.typical_hold_time,
                "risk_level": trader.risk_level,
                "confidence_score": trader.confidence_score,
                "auto_follow": trader.auto_follow,
                "notification_enabled": trader.notification_enabled,
                "added_date": trader.added_date,
                "last_activity": trader.last_activity,
                "total_trades_tracked": trader.total_trades_tracked,
            }

            collection.update_one(
                {"trader_id": trader.trader_id}, {"$set": document}, upsert=True
            )

            logger.debug(f"✅ Trader saved: {trader.trader_id}")
        except Exception as e:
            logger.error(f"❌ Error adding trader: {e}")
            raise

    def add_trade(self, trade: TraderTrade):
        """Add a new trade."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("TRADER_TRADES")

            document = {
                "trade_id": trade.trade_id,
                "trader_id": trade.trader_id,
                "symbol": trade.symbol,
                "trade_type": trade.trade_type.value,
                "entry_price": trade.entry_price,
                "entry_time": trade.entry_time,
                "entry_confidence": trade.entry_confidence,
                "exit_price": trade.exit_price,
                "exit_time": trade.exit_time,
                "position_size": trade.position_size,
                "stop_loss": trade.stop_loss,
                "take_profit": trade.take_profit,
                "pnl_percent": trade.pnl_percent,
                "pnl_dollar": trade.pnl_dollar,
                "is_closed": trade.is_closed,
                "source_post_id": trade.source_post_id,
                "source_text": trade.source_text,
                "platform": trade.platform.value,
                "sentiment_score": trade.sentiment_score,
                "conviction_level": trade.conviction_level,
            }

            collection.update_one(
                {"trade_id": trade.trade_id}, {"$set": document}, upsert=True
            )

            logger.debug(f"✅ Trade saved: {trade.trade_id}")
        except Exception as e:
            logger.error(f"❌ Error adding trade: {e}")
            raise

    def get_traders(self) -> List[TraderProfile]:
        """Get all followed traders."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("TRADERS")
            cursor = collection.find({})
            rows = list(cursor)

            traders = []
            for row in rows:
                trader = TraderProfile(
                    trader_id=row["trader_id"],
                    name=row["name"],
                    platform=TraderPlatform(row["platform"]),
                    username=row["username"],
                    win_rate=row.get("win_rate", 0.0),
                    avg_return=row.get("avg_return", 0.0),
                    total_followers=row.get("total_followers", 0),
                    verified=row.get("verified", False),
                    primary_strategy=row.get("primary_strategy", "unknown"),
                    typical_hold_time=row.get("typical_hold_time", "unknown"),
                    risk_level=row.get("risk_level", "medium"),
                    confidence_score=row.get("confidence_score", 0.5),
                    auto_follow=row.get("auto_follow", False),
                    notification_enabled=row.get("notification_enabled", True),
                    added_date=row.get("added_date", datetime.now()),
                    last_activity=row.get("last_activity"),
                    total_trades_tracked=row.get("total_trades_tracked", 0),
                )
                traders.append(trader)

            return traders
        except Exception as e:
            logger.error(f"❌ Error getting traders: {e}")
            return []

    def get_recent_trades(
        self, trader_id: str = None, days: int = 7
    ) -> List[TraderTrade]:
        """Get recent trades, optionally filtered by trader."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("TRADER_TRADES")

            since = datetime.now() - timedelta(days=days)
            query = {"entry_time": {"$gte": since}}

            if trader_id:
                query["trader_id"] = trader_id

            cursor = collection.find(query).sort("entry_time", -1)
            rows = list(cursor)

            trades = []
            for row in rows:
                trade = TraderTrade(
                    trade_id=row["trade_id"],
                    trader_id=row["trader_id"],
                    symbol=row["symbol"],
                    trade_type=TradeType(row["trade_type"]),
                    entry_price=row.get("entry_price"),
                    entry_time=row.get("entry_time"),
                    entry_confidence=row.get("entry_confidence", 0.5),
                    exit_price=row.get("exit_price"),
                    exit_time=row.get("exit_time"),
                    position_size=row.get("position_size"),
                    stop_loss=row.get("stop_loss"),
                    take_profit=row.get("take_profit"),
                    pnl_percent=row.get("pnl_percent"),
                    pnl_dollar=row.get("pnl_dollar"),
                    is_closed=row.get("is_closed", False),
                    source_post_id=row.get("source_post_id", ""),
                    source_text=row.get("source_text", ""),
                    platform=TraderPlatform(row.get("platform", "twitter")),
                    sentiment_score=row.get("sentiment_score"),
                    conviction_level=row.get("conviction_level"),
                )
                trades.append(trade)

            return trades
        except Exception as e:
            logger.error(f"❌ Error getting trades: {e}")
            return []

    def get_trader_by_id(self, trader_id: str) -> Optional[TraderProfile]:
        """Get a specific trader by ID."""
        self._ensure_initialized()

        try:
            collection = self._get_collection("TRADERS")
            row = collection.find_one({"trader_id": trader_id})

            if not row:
                return None

            return TraderProfile(
                trader_id=row["trader_id"],
                name=row["name"],
                platform=TraderPlatform(row["platform"]),
                username=row["username"],
                win_rate=row.get("win_rate", 0.0),
                avg_return=row.get("avg_return", 0.0),
                total_followers=row.get("total_followers", 0),
                verified=row.get("verified", False),
                primary_strategy=row.get("primary_strategy", "unknown"),
                typical_hold_time=row.get("typical_hold_time", "unknown"),
                risk_level=row.get("risk_level", "medium"),
                confidence_score=row.get("confidence_score", 0.5),
                auto_follow=row.get("auto_follow", False),
                notification_enabled=row.get("notification_enabled", True),
                added_date=row.get("added_date", datetime.now()),
                last_activity=row.get("last_activity"),
                total_trades_tracked=row.get("total_trades_tracked", 0),
            )
        except Exception as e:
            logger.error(f"❌ Error getting trader: {e}")
            return None
