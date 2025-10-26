"""
Trader Following System for True North Trading Platform
Track and analyze successful traders across multiple platforms.
"""

import asyncio
import aiohttp
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, field
from enum import Enum
import logging
import json
import re
from pathlib import Path
import sqlite3
import yfinance as yf
from collections import defaultdict
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TraderPlatform(Enum):
    """Platforms where traders can be followed."""

    TWITTER = "twitter"
    REDDIT = "reddit"
    STOCKTWITS = "stocktwits"
    FINTWIT = "fintwit"
    DISCORD = "discord"
    TELEGRAM = "telegram"
    YOUTUBE = "youtube"
    SUBSTACK = "substack"
    SEEKING_ALPHA = "seeking_alpha"
    TRADINGVIEW = "tradingview"


class TradeType(Enum):
    """Types of trades."""

    LONG = "long"
    SHORT = "short"
    OPTIONS_CALL = "options_call"
    OPTIONS_PUT = "options_put"
    SWING = "swing"
    DAY_TRADE = "day_trade"
    SCALP = "scalp"


@dataclass
class TraderProfile:
    """Profile of a trader to follow."""

    trader_id: str
    name: str
    platform: TraderPlatform
    username: str

    # Performance metrics
    win_rate: float = 0.0
    avg_return: float = 0.0
    total_followers: int = 0
    verified: bool = False

    # Trading style
    primary_strategy: str = "unknown"
    typical_hold_time: str = "unknown"  # "minutes", "hours", "days", "weeks"
    risk_level: str = "medium"  # "low", "medium", "high"

    # Tracking settings
    confidence_score: float = 0.5  # How much we trust this trader
    auto_follow: bool = False  # Automatically mirror trades
    notification_enabled: bool = True

    # Metadata
    added_date: datetime = field(default_factory=datetime.now)
    last_activity: Optional[datetime] = None
    total_trades_tracked: int = 0

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for storage."""
        return {
            "trader_id": self.trader_id,
            "name": self.name,
            "platform": self.platform.value,
            "username": self.username,
            "win_rate": self.win_rate,
            "avg_return": self.avg_return,
            "total_followers": self.total_followers,
            "verified": self.verified,
            "primary_strategy": self.primary_strategy,
            "typical_hold_time": self.typical_hold_time,
            "risk_level": self.risk_level,
            "confidence_score": self.confidence_score,
            "auto_follow": self.auto_follow,
            "notification_enabled": self.notification_enabled,
            "added_date": self.added_date.isoformat(),
            "last_activity": (
                self.last_activity.isoformat() if self.last_activity else None
            ),
            "total_trades_tracked": self.total_trades_tracked,
        }


@dataclass
class TraderTrade:
    """A trade made by a followed trader."""

    trade_id: str
    trader_id: str
    symbol: str
    trade_type: TradeType

    # Entry details
    entry_price: Optional[float] = None
    entry_time: Optional[datetime] = None
    entry_confidence: float = 0.5

    # Exit details
    exit_price: Optional[float] = None
    exit_time: Optional[datetime] = None

    # Trade details
    position_size: Optional[float] = None  # % of portfolio or $ amount
    stop_loss: Optional[float] = None
    take_profit: Optional[float] = None

    # Performance
    pnl_percent: Optional[float] = None
    pnl_dollar: Optional[float] = None
    is_closed: bool = False

    # Source information
    source_post_id: str = ""
    source_text: str = ""
    platform: TraderPlatform = TraderPlatform.TWITTER

    # Analysis
    sentiment_score: float = 0.0
    conviction_level: str = "medium"  # "low", "medium", "high"

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for storage."""
        return {
            "trade_id": self.trade_id,
            "trader_id": self.trader_id,
            "symbol": self.symbol,
            "trade_type": self.trade_type.value,
            "entry_price": self.entry_price,
            "entry_time": self.entry_time.isoformat() if self.entry_time else None,
            "entry_confidence": self.entry_confidence,
            "exit_price": self.exit_price,
            "exit_time": self.exit_time.isoformat() if self.exit_time else None,
            "position_size": self.position_size,
            "stop_loss": self.stop_loss,
            "take_profit": self.take_profit,
            "pnl_percent": self.pnl_percent,
            "pnl_dollar": self.pnl_dollar,
            "is_closed": self.is_closed,
            "source_post_id": self.source_post_id,
            "source_text": self.source_text,
            "platform": self.platform.value,
            "sentiment_score": self.sentiment_score,
            "conviction_level": self.conviction_level,
        }


class TwitterTraderTracker:
    """Track traders on Twitter/X."""

    def __init__(self, bearer_token: str):
        self.bearer_token = bearer_token
        self.headers = {"Authorization": f"Bearer {bearer_token}"}

    async def get_trader_tweets(
        self, username: str, max_results: int = 20
    ) -> List[Dict]:
        """Get recent tweets from a trader."""
        try:
            # First get user ID
            user_url = f"https://api.twitter.com/2/users/by/username/{username}"

            async with aiohttp.ClientSession() as session:
                async with session.get(user_url, headers=self.headers) as response:
                    if response.status != 200:
                        logger.error(
                            f"Failed to get user ID for {username}: {response.status}"
                        )
                        return []

                    user_data = await response.json()
                    user_id = user_data["data"]["id"]

                # Get user tweets
                tweets_url = f"https://api.twitter.com/2/users/{user_id}/tweets"
                params = {
                    "max_results": max_results,
                    "tweet.fields": "created_at,public_metrics,context_annotations",
                    "exclude": "retweets,replies",
                }

                async with session.get(
                    tweets_url, headers=self.headers, params=params
                ) as response:
                    if response.status != 200:
                        logger.error(
                            f"Failed to get tweets for {username}: {response.status}"
                        )
                        return []

                    tweets_data = await response.json()
                    return tweets_data.get("data", [])

        except Exception as e:
            logger.error(f"Error getting tweets for {username}: {e}")
            return []

    def extract_trades_from_tweets(
        self, tweets: List[Dict], trader_id: str
    ) -> List[TraderTrade]:
        """Extract trading signals from tweets."""
        trades = []

        for tweet in tweets:
            try:
                text = tweet["text"].upper()
                tweet_id = tweet["id"]
                created_at = datetime.fromisoformat(
                    tweet["created_at"].replace("Z", "+00:00")
                )

                # Extract stock symbols
                symbols = re.findall(r"\$([A-Z]{1,5})\b", text)

                for symbol in symbols:
                    trade = self._analyze_tweet_for_trade(
                        text, symbol, tweet_id, created_at, trader_id
                    )
                    if trade:
                        trades.append(trade)

            except Exception as e:
                logger.warning(f"Error processing tweet: {e}")
                continue

        return trades

    def _analyze_tweet_for_trade(
        self,
        text: str,
        symbol: str,
        tweet_id: str,
        created_at: datetime,
        trader_id: str,
    ) -> Optional[TraderTrade]:
        """Analyze a tweet to extract trade information."""

        # Trading keywords
        buy_keywords = ["BUY", "LONG", "BULLISH", "CALLS", "ENTRY", "BUYING"]
        sell_keywords = ["SELL", "SHORT", "BEARISH", "PUTS", "EXIT", "SELLING"]

        # Determine trade type
        trade_type = None
        if any(keyword in text for keyword in buy_keywords):
            if "CALL" in text or "CALLS" in text:
                trade_type = TradeType.OPTIONS_CALL
            else:
                trade_type = TradeType.LONG
        elif any(keyword in text for keyword in sell_keywords):
            if "PUT" in text or "PUTS" in text:
                trade_type = TradeType.OPTIONS_PUT
            else:
                trade_type = TradeType.SHORT

        if not trade_type:
            return None

        # Extract price information
        price_matches = re.findall(r"\$?(\d+\.?\d*)", text)
        entry_price = None
        if price_matches:
            # Take the first reasonable price (between $1 and $10000)
            for price_str in price_matches:
                try:
                    price = float(price_str)
                    if 1 <= price <= 10000:
                        entry_price = price
                        break
                except ValueError:
                    continue

        # Determine conviction level
        conviction_level = "medium"
        if any(word in text for word in ["STRONG", "CONVICTION", "ALL IN", "YOLO"]):
            conviction_level = "high"
        elif any(word in text for word in ["SMALL", "LIGHT", "CAUTIOUS", "MAYBE"]):
            conviction_level = "low"

        # Calculate confidence based on tweet engagement
        confidence = 0.5  # Base confidence

        # Generate unique trade ID
        trade_id = hashlib.md5(f"{trader_id}_{symbol}_{tweet_id}".encode()).hexdigest()[
            :12
        ]

        return TraderTrade(
            trade_id=trade_id,
            trader_id=trader_id,
            symbol=symbol,
            trade_type=trade_type,
            entry_price=entry_price,
            entry_time=created_at,
            entry_confidence=confidence,
            source_post_id=tweet_id,
            source_text=text,
            platform=TraderPlatform.TWITTER,
            conviction_level=conviction_level,
        )


class RedditTraderTracker:
    """Track traders on Reddit."""

    def __init__(self, client_id: str, client_secret: str, user_agent: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.user_agent = user_agent

    async def get_user_posts(self, username: str, limit: int = 25) -> List[Dict]:
        """Get recent posts from a Reddit user."""
        try:
            import praw

            reddit = praw.Reddit(
                client_id=self.client_id,
                client_secret=self.client_secret,
                user_agent=self.user_agent,
            )

            user = reddit.redditor(username)
            posts = []

            for submission in user.submissions.new(limit=limit):
                posts.append(
                    {
                        "id": submission.id,
                        "title": submission.title,
                        "text": submission.selftext,
                        "created_utc": submission.created_utc,
                        "score": submission.score,
                        "subreddit": submission.subreddit.display_name,
                    }
                )

            return posts

        except Exception as e:
            logger.error(f"Error getting Reddit posts for {username}: {e}")
            return []

    def extract_trades_from_posts(
        self, posts: List[Dict], trader_id: str
    ) -> List[TraderTrade]:
        """Extract trading signals from Reddit posts."""
        trades = []

        for post in posts:
            try:
                text = f"{post['title']} {post['text']}".upper()
                post_id = post["id"]
                created_at = datetime.fromtimestamp(post["created_utc"])

                # Extract stock symbols
                symbols = re.findall(r"\$?([A-Z]{1,5})\b", text)

                for symbol in symbols:
                    # Filter out common false positives
                    if symbol in [
                        "THE",
                        "AND",
                        "FOR",
                        "ARE",
                        "BUT",
                        "NOT",
                        "YOU",
                        "ALL",
                    ]:
                        continue

                    trade = self._analyze_post_for_trade(
                        text, symbol, post_id, created_at, trader_id, post["score"]
                    )
                    if trade:
                        trades.append(trade)

            except Exception as e:
                logger.warning(f"Error processing Reddit post: {e}")
                continue

        return trades

    def _analyze_post_for_trade(
        self,
        text: str,
        symbol: str,
        post_id: str,
        created_at: datetime,
        trader_id: str,
        score: int,
    ) -> Optional[TraderTrade]:
        """Analyze a Reddit post to extract trade information."""

        # Similar logic to Twitter but adapted for Reddit
        buy_keywords = ["BUY", "LONG", "BULLISH", "CALLS", "POSITION", "HOLDING"]
        sell_keywords = ["SELL", "SHORT", "BEARISH", "PUTS", "EXITING"]

        trade_type = None
        if any(keyword in text for keyword in buy_keywords):
            trade_type = TradeType.LONG
        elif any(keyword in text for keyword in sell_keywords):
            trade_type = TradeType.SHORT

        if not trade_type:
            return None

        # Use Reddit score to determine confidence
        confidence = min(0.9, 0.3 + (score / 100))  # Higher score = higher confidence

        trade_id = hashlib.md5(f"{trader_id}_{symbol}_{post_id}".encode()).hexdigest()[
            :12
        ]

        return TraderTrade(
            trade_id=trade_id,
            trader_id=trader_id,
            symbol=symbol,
            trade_type=trade_type,
            entry_time=created_at,
            entry_confidence=confidence,
            source_post_id=post_id,
            source_text=text[:500],  # Truncate long posts
            platform=TraderPlatform.REDDIT,
        )


class TraderDatabase:
    """Database for storing trader and trade information."""

    def __init__(self, db_path: str = "trader_following.db"):
        self.db_path = db_path
        self._init_database()

    def _init_database(self):
        """Initialize the database tables."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        # Traders table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS traders (
                trader_id TEXT PRIMARY KEY,
                name TEXT,
                platform TEXT,
                username TEXT,
                win_rate REAL,
                avg_return REAL,
                total_followers INTEGER,
                verified BOOLEAN,
                primary_strategy TEXT,
                typical_hold_time TEXT,
                risk_level TEXT,
                confidence_score REAL,
                auto_follow BOOLEAN,
                notification_enabled BOOLEAN,
                added_date TEXT,
                last_activity TEXT,
                total_trades_tracked INTEGER
            )
        """
        )

        # Trades table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS trades (
                trade_id TEXT PRIMARY KEY,
                trader_id TEXT,
                symbol TEXT,
                trade_type TEXT,
                entry_price REAL,
                entry_time TEXT,
                entry_confidence REAL,
                exit_price REAL,
                exit_time TEXT,
                position_size REAL,
                stop_loss REAL,
                take_profit REAL,
                pnl_percent REAL,
                pnl_dollar REAL,
                is_closed BOOLEAN,
                source_post_id TEXT,
                source_text TEXT,
                platform TEXT,
                sentiment_score REAL,
                conviction_level TEXT,
                FOREIGN KEY (trader_id) REFERENCES traders (trader_id)
            )
        """
        )

        conn.commit()
        conn.close()

    def add_trader(self, trader: TraderProfile):
        """Add or update a trader profile."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT OR REPLACE INTO traders 
            (trader_id, name, platform, username, win_rate, avg_return, total_followers,
             verified, primary_strategy, typical_hold_time, risk_level, confidence_score,
             auto_follow, notification_enabled, added_date, last_activity, total_trades_tracked)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (
                trader.trader_id,
                trader.name,
                trader.platform.value,
                trader.username,
                trader.win_rate,
                trader.avg_return,
                trader.total_followers,
                trader.verified,
                trader.primary_strategy,
                trader.typical_hold_time,
                trader.risk_level,
                trader.confidence_score,
                trader.auto_follow,
                trader.notification_enabled,
                trader.added_date.isoformat(),
                trader.last_activity.isoformat() if trader.last_activity else None,
                trader.total_trades_tracked,
            ),
        )

        conn.commit()
        conn.close()

    def add_trade(self, trade: TraderTrade):
        """Add a new trade."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT OR REPLACE INTO trades 
            (trade_id, trader_id, symbol, trade_type, entry_price, entry_time, entry_confidence,
             exit_price, exit_time, position_size, stop_loss, take_profit, pnl_percent,
             pnl_dollar, is_closed, source_post_id, source_text, platform, sentiment_score,
             conviction_level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (
                trade.trade_id,
                trade.trader_id,
                trade.symbol,
                trade.trade_type.value,
                trade.entry_price,
                trade.entry_time.isoformat() if trade.entry_time else None,
                trade.entry_confidence,
                trade.exit_price,
                trade.exit_time.isoformat() if trade.exit_time else None,
                trade.position_size,
                trade.stop_loss,
                trade.take_profit,
                trade.pnl_percent,
                trade.pnl_dollar,
                trade.is_closed,
                trade.source_post_id,
                trade.source_text,
                trade.platform.value,
                trade.sentiment_score,
                trade.conviction_level,
            ),
        )

        conn.commit()
        conn.close()

    def get_traders(self) -> List[TraderProfile]:
        """Get all followed traders."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM traders")
        rows = cursor.fetchall()

        traders = []
        for row in rows:
            trader = TraderProfile(
                trader_id=row[0],
                name=row[1],
                platform=TraderPlatform(row[2]),
                username=row[3],
                win_rate=row[4],
                avg_return=row[5],
                total_followers=row[6],
                verified=bool(row[7]),
                primary_strategy=row[8],
                typical_hold_time=row[9],
                risk_level=row[10],
                confidence_score=row[11],
                auto_follow=bool(row[12]),
                notification_enabled=bool(row[13]),
                added_date=datetime.fromisoformat(row[14]),
                last_activity=datetime.fromisoformat(row[15]) if row[15] else None,
                total_trades_tracked=row[16],
            )
            traders.append(trader)

        conn.close()
        return traders

    def get_recent_trades(
        self, trader_id: str = None, days: int = 7
    ) -> List[TraderTrade]:
        """Get recent trades, optionally filtered by trader."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        since = datetime.now() - timedelta(days=days)

        if trader_id:
            cursor.execute(
                """
                SELECT * FROM trades 
                WHERE trader_id = ? AND entry_time > ?
                ORDER BY entry_time DESC
            """,
                (trader_id, since.isoformat()),
            )
        else:
            cursor.execute(
                """
                SELECT * FROM trades 
                WHERE entry_time > ?
                ORDER BY entry_time DESC
            """,
                (since.isoformat(),),
            )

        rows = cursor.fetchall()

        trades = []
        for row in rows:
            trade = TraderTrade(
                trade_id=row[0],
                trader_id=row[1],
                symbol=row[2],
                trade_type=TradeType(row[3]),
                entry_price=row[4],
                entry_time=datetime.fromisoformat(row[5]) if row[5] else None,
                entry_confidence=row[6],
                exit_price=row[7],
                exit_time=datetime.fromisoformat(row[8]) if row[8] else None,
                position_size=row[9],
                stop_loss=row[10],
                take_profit=row[11],
                pnl_percent=row[12],
                pnl_dollar=row[13],
                is_closed=bool(row[14]),
                source_post_id=row[15],
                source_text=row[16],
                platform=TraderPlatform(row[17]),
                sentiment_score=row[18],
                conviction_level=row[19],
            )
            trades.append(trade)

        conn.close()
        return trades


class TraderPerformanceAnalyzer:
    """Analyze trader performance and generate insights."""

    def __init__(self, database: TraderDatabase):
        self.db = database

    def analyze_trader_performance(self, trader_id: str) -> Dict[str, Any]:
        """Comprehensive performance analysis for a trader."""
        trades = self.db.get_recent_trades(trader_id, days=90)  # Last 90 days

        if not trades:
            return {"error": "No trades found for analysis"}

        # Basic metrics
        total_trades = len(trades)
        closed_trades = [t for t in trades if t.is_closed and t.pnl_percent is not None]

        if not closed_trades:
            return {"error": "No closed trades for performance analysis"}

        # Calculate performance metrics
        returns = [t.pnl_percent for t in closed_trades]
        winning_trades = [r for r in returns if r > 0]
        losing_trades = [r for r in returns if r <= 0]

        win_rate = len(winning_trades) / len(closed_trades) * 100
        avg_return = np.mean(returns)
        avg_win = np.mean(winning_trades) if winning_trades else 0
        avg_loss = np.mean(losing_trades) if losing_trades else 0

        # Risk metrics
        volatility = np.std(returns) if len(returns) > 1 else 0
        max_drawdown = self._calculate_max_drawdown(
            [t.pnl_percent for t in closed_trades]
        )

        # Trading patterns
        symbols_traded = list(set(t.symbol for t in trades))
        most_traded_symbol = max(
            set(t.symbol for t in trades),
            key=lambda x: sum(1 for t in trades if t.symbol == x),
        )

        # Time analysis
        avg_hold_time = self._calculate_avg_hold_time(closed_trades)

        return {
            "trader_id": trader_id,
            "analysis_period": "90 days",
            "total_trades": total_trades,
            "closed_trades": len(closed_trades),
            "win_rate": win_rate,
            "avg_return": avg_return,
            "avg_win": avg_win,
            "avg_loss": avg_loss,
            "volatility": volatility,
            "max_drawdown": max_drawdown,
            "symbols_traded": len(symbols_traded),
            "most_traded_symbol": most_traded_symbol,
            "avg_hold_time_hours": avg_hold_time,
            "profit_factor": abs(avg_win / avg_loss) if avg_loss != 0 else float("inf"),
            "sharpe_ratio": avg_return / volatility if volatility > 0 else 0,
        }

    def _calculate_max_drawdown(self, returns: List[float]) -> float:
        """Calculate maximum drawdown from returns."""
        if not returns:
            return 0

        cumulative = np.cumprod([1 + r / 100 for r in returns])
        peak = np.maximum.accumulate(cumulative)
        drawdown = (cumulative - peak) / peak
        return np.min(drawdown) * 100

    def _calculate_avg_hold_time(self, trades: List[TraderTrade]) -> float:
        """Calculate average holding time in hours."""
        hold_times = []

        for trade in trades:
            if trade.entry_time and trade.exit_time:
                hold_time = (trade.exit_time - trade.entry_time).total_seconds() / 3600
                hold_times.append(hold_time)

        return np.mean(hold_times) if hold_times else 0

    def get_top_performers(
        self, metric: str = "win_rate", limit: int = 10
    ) -> List[Dict]:
        """Get top performing traders by specified metric."""
        traders = self.db.get_traders()
        performances = []

        for trader in traders:
            perf = self.analyze_trader_performance(trader.trader_id)
            if "error" not in perf:
                perf["trader_name"] = trader.name
                perf["platform"] = trader.platform.value
                performances.append(perf)

        # Sort by metric
        if metric in ["win_rate", "avg_return", "profit_factor", "sharpe_ratio"]:
            performances.sort(key=lambda x: x.get(metric, 0), reverse=True)
        elif metric == "max_drawdown":
            performances.sort(
                key=lambda x: abs(x.get(metric, 0))
            )  # Lower drawdown is better

        return performances[:limit]


class TraderFollowingSystem:
    """Main system for following and analyzing traders."""

    def __init__(self):
        # Use MongoDB TraderDatabase instead of SQLite
        from backend.core.trader_following.trader_database_mongo import TraderDatabase

        self.database = TraderDatabase()
        self.performance_analyzer = TraderPerformanceAnalyzer(self.database)

        # Initialize platform trackers
        self.twitter_tracker = None
        self.reddit_tracker = None

        # Load API credentials
        self._load_credentials()

    def _load_credentials(self):
        """Load API credentials from environment."""
        import os

        # Twitter credentials
        twitter_bearer = os.getenv("TWITTER_BEARER_TOKEN")
        if twitter_bearer:
            self.twitter_tracker = TwitterTraderTracker(twitter_bearer)

        # Reddit credentials
        reddit_client_id = os.getenv("REDDIT_CLIENT_ID")
        reddit_client_secret = os.getenv("REDDIT_CLIENT_SECRET")
        reddit_user_agent = os.getenv("REDDIT_USER_AGENT")

        if all([reddit_client_id, reddit_client_secret, reddit_user_agent]):
            self.reddit_tracker = RedditTraderTracker(
                reddit_client_id, reddit_client_secret, reddit_user_agent
            )

    def add_trader(
        self, name: str, platform: TraderPlatform, username: str, **kwargs
    ) -> str:
        """Add a new trader to follow."""
        trader_id = hashlib.md5(f"{platform.value}_{username}".encode()).hexdigest()[
            :12
        ]

        trader = TraderProfile(
            trader_id=trader_id,
            name=name,
            platform=platform,
            username=username,
            **kwargs,
        )

        self.database.add_trader(trader)
        logger.info(f"Added trader: {name} (@{username}) on {platform.value}")

        return trader_id

    async def sync_trader_activity(self, trader_id: str = None):
        """Sync activity for a specific trader or all traders."""
        traders = self.database.get_traders()

        if trader_id:
            traders = [t for t in traders if t.trader_id == trader_id]

        for trader in traders:
            try:
                await self._sync_single_trader(trader)
            except Exception as e:
                logger.error(f"Error syncing trader {trader.name}: {e}")

    async def _sync_single_trader(self, trader: TraderProfile):
        """Sync activity for a single trader."""
        logger.info(
            f"Syncing {trader.name} (@{trader.username}) on {trader.platform.value}"
        )

        new_trades = []

        if trader.platform == TraderPlatform.TWITTER and self.twitter_tracker:
            tweets = await self.twitter_tracker.get_trader_tweets(trader.username)
            new_trades.extend(
                self.twitter_tracker.extract_trades_from_tweets(
                    tweets, trader.trader_id
                )
            )

        elif trader.platform == TraderPlatform.REDDIT and self.reddit_tracker:
            posts = await self.reddit_tracker.get_user_posts(trader.username)
            new_trades.extend(
                self.reddit_tracker.extract_trades_from_posts(posts, trader.trader_id)
            )

        # Save new trades
        for trade in new_trades:
            self.database.add_trade(trade)

        # Update trader activity
        trader.last_activity = datetime.now()
        trader.total_trades_tracked += len(new_trades)
        self.database.add_trader(trader)

        logger.info(f"Found {len(new_trades)} new trades for {trader.name}")

    def get_followed_traders(self) -> List[Dict]:
        """Get all followed traders with their information."""
        traders = self.database.get_traders()
        result = []

        for trader in traders:
            result.append(
                {
                    "id": trader.trader_id,
                    "name": trader.name,
                    "platform": trader.platform.value,
                    "username": trader.username,
                    "win_rate": trader.win_rate,
                    "total_trades": trader.total_trades_tracked,
                    "followers": trader.total_followers,
                    "avg_return": trader.avg_return,
                    "confidence_score": trader.confidence_score,
                    "verified": trader.verified,
                    "primary_strategy": trader.primary_strategy,
                    "notification_enabled": trader.notification_enabled,
                    "last_activity": trader.last_activity,
                }
            )

        return result

    def get_trader_leaderboard(self) -> List[Dict]:
        """Get leaderboard of top performing traders."""
        return self.performance_analyzer.get_top_performers("win_rate", limit=20)

    def get_recent_signals(self, hours: int = 24) -> List[Dict]:
        """Get recent trading signals from followed traders."""
        since = datetime.now() - timedelta(hours=hours)
        all_trades = self.database.get_recent_trades(days=1)

        # Filter to recent signals
        recent_trades = [
            t
            for t in all_trades
            if t.entry_time and t.entry_time > since and not t.is_closed
        ]

        # Enrich with trader information
        traders = {t.trader_id: t for t in self.database.get_traders()}

        signals = []
        for trade in recent_trades:
            trader = traders.get(trade.trader_id)
            if trader:
                signal = {
                    "symbol": trade.symbol,
                    "trade_type": trade.trade_type.value,
                    "trader_name": trader.name,
                    "platform": trader.platform.value,
                    "confidence": trade.entry_confidence,
                    "conviction": trade.conviction_level,
                    "entry_time": trade.entry_time,
                    "entry_price": trade.entry_price,
                    "source_text": (
                        trade.source_text[:200] + "..."
                        if len(trade.source_text) > 200
                        else trade.source_text
                    ),
                }
                signals.append(signal)

        # Sort by confidence and recency
        signals.sort(key=lambda x: (x["confidence"], x["entry_time"]), reverse=True)

        return signals

    def get_consensus_signals(self, min_traders: int = 2) -> List[Dict]:
        """Get signals where multiple traders agree."""
        recent_trades = self.database.get_recent_trades(days=1)

        # Group by symbol and trade type
        consensus = defaultdict(list)

        for trade in recent_trades:
            if not trade.is_closed:
                key = (trade.symbol, trade.trade_type.value)
                consensus[key].append(trade)

        # Find consensus signals
        consensus_signals = []

        for (symbol, trade_type), trades in consensus.items():
            if len(trades) >= min_traders:
                # Get trader information
                traders = self.database.get_traders()
                trader_dict = {t.trader_id: t for t in traders}

                trader_names = [
                    trader_dict[t.trader_id].name
                    for t in trades
                    if t.trader_id in trader_dict
                ]

                avg_confidence = np.mean([t.entry_confidence for t in trades])

                consensus_signals.append(
                    {
                        "symbol": symbol,
                        "trade_type": trade_type,
                        "trader_count": len(trades),
                        "trader_names": trader_names,
                        "avg_confidence": avg_confidence,
                        "latest_signal": max(
                            t.entry_time for t in trades if t.entry_time
                        ),
                    }
                )

        # Sort by trader count and confidence
        consensus_signals.sort(
            key=lambda x: (x["trader_count"], x["avg_confidence"]), reverse=True
        )

        return consensus_signals


async def main():
    """Demo the trader following system."""
    print("🎯 Trader Following System Demo")
    print("=" * 50)

    # Initialize system
    system = TraderFollowingSystem()

    # Add some example traders
    print("\n👥 Adding Example Traders:")

    example_traders = [
        {
            "name": "Market Wizard",
            "platform": TraderPlatform.TWITTER,
            "username": "marketwizard",
            "primary_strategy": "swing_trading",
            "confidence_score": 0.8,
            "notification_enabled": True,
        },
        {
            "name": "Options King",
            "platform": TraderPlatform.TWITTER,
            "username": "optionsking",
            "primary_strategy": "options_trading",
            "confidence_score": 0.7,
            "notification_enabled": True,
        },
        {
            "name": "Reddit Trader",
            "platform": TraderPlatform.REDDIT,
            "username": "reddittrader",
            "primary_strategy": "momentum",
            "confidence_score": 0.6,
            "notification_enabled": True,
        },
    ]

    for trader_info in example_traders:
        trader_id = system.add_trader(**trader_info)
        print(f"   ✅ Added {trader_info['name']} (ID: {trader_id})")

    # Sync trader activity (would normally fetch real data)
    print(f"\n🔄 Syncing Trader Activity:")
    print("   📡 Fetching latest tweets and posts...")
    print("   📊 Analyzing trading signals...")
    print("   💾 Storing new trades...")

    # Simulate some trades for demo
    print(f"\n📈 Recent Trading Signals:")

    # In a real implementation, this would show actual signals
    demo_signals = [
        {
            "symbol": "AAPL",
            "trade_type": "long",
            "trader_name": "Market Wizard",
            "platform": "twitter",
            "confidence": 0.85,
            "conviction": "high",
            "entry_time": datetime.now() - timedelta(hours=2),
            "source_text": "Strong bullish setup on $AAPL, breaking resistance at $180...",
        },
        {
            "symbol": "TSLA",
            "trade_type": "options_call",
            "trader_name": "Options King",
            "platform": "twitter",
            "confidence": 0.75,
            "conviction": "medium",
            "entry_time": datetime.now() - timedelta(hours=1),
            "source_text": "$TSLA calls looking juicy for earnings run-up...",
        },
    ]

    for signal in demo_signals:
        print(f"\n   🎯 {signal['symbol']} - {signal['trade_type'].upper()}")
        print(f"      👤 Trader: {signal['trader_name']} ({signal['platform']})")
        print(f"      🎯 Confidence: {signal['confidence']:.0%}")
        print(f"      💪 Conviction: {signal['conviction']}")
        print(f"      ⏰ Time: {signal['entry_time'].strftime('%H:%M')}")
        print(f"      💬 Signal: {signal['source_text']}")

    # Show consensus signals
    print(f"\n🤝 Consensus Signals (Multiple Traders Agree):")
    print("   📊 NVDA - LONG (3 traders, 82% avg confidence)")
    print("   📊 SPY - PUT (2 traders, 75% avg confidence)")

    # Show leaderboard
    print(f"\n🏆 Top Performing Traders (Last 30 Days):")
    print("   🥇 Market Wizard - 78% win rate, +15.2% avg return")
    print("   🥈 Options King - 65% win rate, +12.8% avg return")
    print("   🥉 Swing Master - 72% win rate, +11.5% avg return")

    print(f"\n✅ Trader Following System Demo Complete!")
    print("💡 This system allows you to:")
    print("   • Follow successful traders across platforms")
    print("   • Get real-time trading signals")
    print("   • Analyze trader performance")
    print("   • Find consensus opportunities")
    print("   • Auto-follow top performers")


if __name__ == "__main__":
    asyncio.run(main())
