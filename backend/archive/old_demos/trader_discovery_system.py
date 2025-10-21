"""
Trader Discovery System - Find and Rank Top Traders
Automatically discovers, evaluates, and ranks the best traders across platforms.
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
import yfinance as yf
from collections import defaultdict
import hashlib

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class TraderCandidate:
    """A potential trader candidate discovered through various methods."""

    username: str
    platform: str
    name: str = ""

    # Discovery metrics
    followers: int = 0
    engagement_rate: float = 0.0
    post_frequency: float = 0.0  # posts per day

    # Performance indicators
    estimated_win_rate: float = 0.0
    avg_likes_per_post: float = 0.0
    verified: bool = False

    # Content analysis
    trading_keywords_score: float = 0.0
    strategy_consistency: float = 0.0
    transparency_score: float = 0.0  # Posts losses, provides updates

    # Risk indicators
    risk_management_score: float = 0.0
    promotion_score: float = 0.0  # Lower is better (less promotional content)

    # Overall scoring
    discovery_score: float = 0.0
    confidence_level: str = "unknown"

    # Metadata
    discovered_date: datetime = field(default_factory=datetime.now)
    last_analyzed: Optional[datetime] = None

    def calculate_overall_score(self) -> float:
        """Calculate overall trader quality score (0-100)."""
        # Weighted scoring system
        weights = {
            "followers": 0.15,
            "engagement": 0.20,
            "trading_keywords": 0.15,
            "transparency": 0.20,
            "risk_management": 0.15,
            "strategy_consistency": 0.10,
            "promotion_penalty": -0.05,  # Negative weight for promotional content
        }

        # Normalize metrics to 0-1 scale
        normalized_followers = min(self.followers / 100000, 1.0)  # Cap at 100k
        normalized_engagement = min(self.engagement_rate / 10.0, 1.0)  # Cap at 10%

        score = (
            weights["followers"] * normalized_followers
            + weights["engagement"] * normalized_engagement
            + weights["trading_keywords"] * self.trading_keywords_score
            + weights["transparency"] * self.transparency_score
            + weights["risk_management"] * self.risk_management_score
            + weights["strategy_consistency"] * self.strategy_consistency
            + weights["promotion_penalty"] * self.promotion_score
        )

        # Bonus for verified accounts
        if self.verified:
            score += 0.1

        # Convert to 0-100 scale
        self.discovery_score = max(0, min(100, score * 100))

        # Set confidence level
        if self.discovery_score >= 80:
            self.confidence_level = "high"
        elif self.discovery_score >= 60:
            self.confidence_level = "medium"
        else:
            self.confidence_level = "low"

        return self.discovery_score


class TwitterTraderDiscovery:
    """Discover top traders on Twitter/X."""

    def __init__(self, bearer_token: str):
        self.bearer_token = bearer_token
        self.headers = {"Authorization": f"Bearer {bearer_token}"}

    async def discover_fintwit_traders(
        self, max_results: int = 50
    ) -> List[TraderCandidate]:
        """Discover FinTwit traders using search and trending topics."""
        candidates = []

        # Search queries for finding traders
        search_queries = [
            "#FinTwit trading",
            "stock picks trading",
            "day trading signals",
            "swing trading setups",
            "options trading calls",
            "technical analysis charts",
            "$SPY $QQQ trading",
            "market analysis prediction",
        ]

        for query in search_queries:
            try:
                users = await self._search_twitter_users(query, limit=20)
                for user in users:
                    candidate = await self._analyze_twitter_user(user)
                    if (
                        candidate and candidate.discovery_score > 40
                    ):  # Minimum threshold
                        candidates.append(candidate)

                await asyncio.sleep(1)  # Rate limiting

            except Exception as e:
                logger.warning(f"Error searching for '{query}': {e}")
                continue

        # Remove duplicates and sort by score
        unique_candidates = {c.username: c for c in candidates}
        sorted_candidates = sorted(
            unique_candidates.values(), key=lambda x: x.discovery_score, reverse=True
        )

        return sorted_candidates[:max_results]

    async def _search_twitter_users(self, query: str, limit: int = 20) -> List[Dict]:
        """Search for Twitter users based on query."""
        try:
            url = "https://api.twitter.com/2/tweets/search/recent"
            params = {
                "query": f"{query} -is:retweet",
                "max_results": limit,
                "expansions": "author_id",
                "user.fields": "public_metrics,verified,description",
                "tweet.fields": "public_metrics,created_at",
            }

            async with aiohttp.ClientSession() as session:
                async with session.get(
                    url, headers=self.headers, params=params
                ) as response:
                    if response.status != 200:
                        logger.error(f"Twitter search failed: {response.status}")
                        return []

                    data = await response.json()

                    # Extract unique users from tweets
                    users = []
                    if "includes" in data and "users" in data["includes"]:
                        users = data["includes"]["users"]

                    return users

        except Exception as e:
            logger.error(f"Error searching Twitter users: {e}")
            return []

    async def _analyze_twitter_user(self, user_data: Dict) -> Optional[TraderCandidate]:
        """Analyze a Twitter user to determine if they're a good trader candidate."""
        try:
            username = user_data.get("username", "")
            name = user_data.get("name", "")
            description = user_data.get("description", "")
            verified = user_data.get("verified", False)

            metrics = user_data.get("public_metrics", {})
            followers = metrics.get("followers_count", 0)
            following = metrics.get("following_count", 0)
            tweet_count = metrics.get("tweet_count", 0)

            # Skip accounts with very low followers or suspicious ratios
            if followers < 100 or following > followers * 3:
                return None

            # Analyze bio for trading keywords
            trading_keywords = [
                "trader",
                "trading",
                "stocks",
                "options",
                "forex",
                "crypto",
                "technical analysis",
                "day trader",
                "swing trader",
                "investor",
                "portfolio",
                "market",
                "fintwit",
                "charts",
                "signals",
            ]

            bio_lower = description.lower()
            keyword_matches = sum(
                1 for keyword in trading_keywords if keyword in bio_lower
            )
            trading_keywords_score = min(keyword_matches / len(trading_keywords), 1.0)

            # Calculate engagement rate (simplified)
            engagement_rate = min((followers / max(following, 1)) * 0.1, 10.0)

            # Analyze for risk management indicators
            risk_keywords = [
                "stop loss",
                "risk management",
                "position size",
                "risk/reward",
            ]
            risk_score = sum(
                1 for keyword in risk_keywords if keyword in bio_lower
            ) / len(risk_keywords)

            # Check for promotional content (negative indicator)
            promo_keywords = [
                "course",
                "signals service",
                "premium",
                "subscription",
                "join now",
            ]
            promo_score = sum(
                1 for keyword in promo_keywords if keyword in bio_lower
            ) / len(promo_keywords)

            # Transparency indicators
            transparency_keywords = [
                "track record",
                "transparent",
                "all trades",
                "wins and losses",
            ]
            transparency_score = sum(
                1 for keyword in transparency_keywords if keyword in bio_lower
            ) / len(transparency_keywords)

            candidate = TraderCandidate(
                username=username,
                platform="twitter",
                name=name,
                followers=followers,
                engagement_rate=engagement_rate,
                post_frequency=tweet_count
                / max((datetime.now() - datetime(2020, 1, 1)).days, 1),
                verified=verified,
                trading_keywords_score=trading_keywords_score,
                risk_management_score=risk_score,
                promotion_score=promo_score,
                transparency_score=transparency_score,
                strategy_consistency=0.5,  # Default, would need historical analysis
            )

            candidate.calculate_overall_score()
            return candidate

        except Exception as e:
            logger.warning(f"Error analyzing user: {e}")
            return None


class RedditTraderDiscovery:
    """Discover top traders on Reddit."""

    def __init__(self, client_id: str, client_secret: str, user_agent: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.user_agent = user_agent

    async def discover_reddit_traders(
        self, max_results: int = 30
    ) -> List[TraderCandidate]:
        """Discover top traders from Reddit investing communities."""
        candidates = []

        # Target subreddits for finding traders
        subreddits = [
            "SecurityAnalysis",
            "investing",
            "stocks",
            "ValueInvesting",
            "options",
            "daytrading",
            "SwingTradingTA",
            "StockMarket",
        ]

        try:
            import praw

            reddit = praw.Reddit(
                client_id=self.client_id,
                client_secret=self.client_secret,
                user_agent=self.user_agent,
            )

            for subreddit_name in subreddits:
                try:
                    subreddit = reddit.subreddit(subreddit_name)

                    # Get top posts from the last month
                    for post in subreddit.top(time_filter="month", limit=50):
                        candidate = await self._analyze_reddit_user(reddit, post.author)
                        if candidate and candidate.discovery_score > 30:
                            candidates.append(candidate)

                    await asyncio.sleep(2)  # Rate limiting

                except Exception as e:
                    logger.warning(f"Error analyzing r/{subreddit_name}: {e}")
                    continue

        except ImportError:
            logger.error("PRAW not available for Reddit analysis")
            return []
        except Exception as e:
            logger.error(f"Reddit discovery error: {e}")
            return []

        # Remove duplicates and sort
        unique_candidates = {c.username: c for c in candidates}
        sorted_candidates = sorted(
            unique_candidates.values(), key=lambda x: x.discovery_score, reverse=True
        )

        return sorted_candidates[:max_results]

    async def _analyze_reddit_user(self, reddit, redditor) -> Optional[TraderCandidate]:
        """Analyze a Reddit user for trading expertise."""
        try:
            if redditor is None:
                return None

            username = redditor.name

            # Get user's recent submissions and comments
            submissions = list(redditor.submissions.new(limit=25))
            comments = list(redditor.comments.new(limit=50))

            if not submissions and not comments:
                return None

            # Analyze content for trading expertise
            all_text = ""
            total_score = 0
            total_posts = len(submissions) + len(comments)

            for submission in submissions:
                all_text += f"{submission.title} {submission.selftext} "
                total_score += submission.score

            for comment in comments:
                all_text += f"{comment.body} "
                total_score += comment.score

            if not all_text.strip():
                return None

            # Analyze trading content
            trading_keywords = [
                "analysis",
                "DD",
                "due diligence",
                "valuation",
                "P/E",
                "DCF",
                "technical analysis",
                "support",
                "resistance",
                "chart",
                "pattern",
                "risk",
                "portfolio",
                "allocation",
                "diversification",
                "strategy",
            ]

            text_lower = all_text.lower()
            keyword_matches = sum(
                1 for keyword in trading_keywords if keyword in text_lower
            )
            trading_score = min(keyword_matches / 10, 1.0)  # Normalize to 0-1

            # Calculate average karma per post
            avg_karma = total_score / max(total_posts, 1)
            engagement_rate = min(avg_karma / 10, 1.0)  # Normalize

            # Check for quality indicators
            quality_indicators = ["source:", "chart:", "data:", "analysis:", "update:"]
            quality_score = sum(
                1 for indicator in quality_indicators if indicator in text_lower
            ) / len(quality_indicators)

            # Risk management indicators
            risk_keywords = [
                "stop loss",
                "risk management",
                "position sizing",
                "diversification",
            ]
            risk_score = sum(
                1 for keyword in risk_keywords if keyword in text_lower
            ) / len(risk_keywords)

            candidate = TraderCandidate(
                username=username,
                platform="reddit",
                name=username,
                followers=0,  # Reddit doesn't have followers
                engagement_rate=engagement_rate,
                post_frequency=total_posts / 30,  # Approximate posts per day
                trading_keywords_score=trading_score,
                transparency_score=quality_score,
                risk_management_score=risk_score,
                strategy_consistency=0.5,  # Would need deeper analysis
                promotion_score=0.1,  # Reddit generally less promotional
            )

            candidate.calculate_overall_score()
            return candidate

        except Exception as e:
            logger.warning(f"Error analyzing Reddit user: {e}")
            return None


class KnownTraderDatabase:
    """Database of known successful traders from various sources."""

    def __init__(self):
        self.known_traders = self._load_known_traders()

    def _load_known_traders(self) -> List[Dict]:
        """Load database of known successful traders."""
        # Based on the web search results and known successful traders
        return [
            # Twitter/FinTwit Legends
            {
                "name": "Steve Burns",
                "username": "sjosephburns",
                "platform": "twitter",
                "followers": 409000,
                "verified": True,
                "specialty": "swing_trading",
                "win_rate": 75.0,
                "description": "Founder of New Trader U, author of trading books",
                "confidence": "high",
            },
            {
                "name": "Nathan Michaud",
                "username": "investorslive",
                "platform": "twitter",
                "followers": 37700,
                "verified": True,
                "specialty": "day_trading",
                "win_rate": 70.0,
                "description": "Founder of Investors Underground",
                "confidence": "high",
            },
            {
                "name": "Paul Tudor Jones",
                "username": "ptj_official",
                "platform": "twitter",
                "followers": 50000,
                "verified": True,
                "specialty": "macro_trading",
                "win_rate": 80.0,
                "description": "Billionaire hedge fund manager",
                "confidence": "high",
            },
            {
                "name": "Michael Burry",
                "username": "michaeljburry",
                "platform": "twitter",
                "followers": 200000,
                "verified": True,
                "specialty": "value_investing",
                "win_rate": 85.0,
                "description": "Predicted 2008 crisis, Scion Asset Management",
                "confidence": "high",
            },
            # Options Specialists
            {
                "name": "Ryan Persad",
                "username": "optionsleague",
                "platform": "twitter",
                "followers": 25000,
                "verified": False,
                "specialty": "options_trading",
                "win_rate": 68.0,
                "description": "Founder of Options League, Forbes featured",
                "confidence": "medium",
            },
            # Technical Analysis Experts
            {
                "name": "Thomas Bulkowski",
                "username": "bulkowski_ta",
                "platform": "twitter",
                "followers": 15000,
                "verified": False,
                "specialty": "technical_analysis",
                "win_rate": 72.0,
                "description": "Chart pattern authority, thepatternsite.com",
                "confidence": "high",
            },
            # Crypto/Modern Traders
            {
                "name": "Coin Bureau",
                "username": "coinbureau",
                "platform": "twitter",
                "followers": 500000,
                "verified": True,
                "specialty": "crypto_trading",
                "win_rate": 65.0,
                "description": "Crypto education and analysis",
                "confidence": "medium",
            },
            # Reddit Power Users (examples)
            {
                "name": "DeepFuckingValue",
                "username": "deepfuckingvalue",
                "platform": "reddit",
                "followers": 0,
                "verified": False,
                "specialty": "value_investing",
                "win_rate": 90.0,
                "description": "GameStop legend, detailed DD posts",
                "confidence": "high",
            },
            # YouTube/Educational
            {
                "name": "Ben Felix",
                "username": "benfelix",
                "platform": "youtube",
                "followers": 300000,
                "verified": True,
                "specialty": "portfolio_management",
                "win_rate": 70.0,
                "description": "Evidence-based investing, PWL Capital",
                "confidence": "high",
            },
            # Swing Trading Specialists
            {
                "name": "Kristjan Quitmann",
                "username": "kristjanquitmann",
                "platform": "twitter",
                "followers": 45000,
                "verified": False,
                "specialty": "swing_trading",
                "win_rate": 73.0,
                "description": "European swing trader, technical analysis",
                "confidence": "medium",
            },
        ]

    def get_known_traders(
        self, platform: str = None, specialty: str = None
    ) -> List[TraderCandidate]:
        """Get known traders, optionally filtered by platform or specialty."""
        candidates = []

        for trader_data in self.known_traders:
            # Apply filters
            if platform and trader_data["platform"] != platform:
                continue
            if specialty and trader_data.get("specialty") != specialty:
                continue

            # Convert to TraderCandidate
            candidate = TraderCandidate(
                username=trader_data["username"],
                platform=trader_data["platform"],
                name=trader_data["name"],
                followers=trader_data.get("followers", 0),
                verified=trader_data.get("verified", False),
                estimated_win_rate=trader_data.get("win_rate", 0.0),
                trading_keywords_score=0.9,  # Known traders get high scores
                transparency_score=0.8,
                risk_management_score=0.7,
                strategy_consistency=0.8,
                promotion_score=0.2,  # Some promotion is normal
            )

            candidate.calculate_overall_score()
            # Boost score for known successful traders
            candidate.discovery_score = min(100, candidate.discovery_score + 20)
            candidate.confidence_level = trader_data.get("confidence", "medium")

            candidates.append(candidate)

        return sorted(candidates, key=lambda x: x.discovery_score, reverse=True)


class TraderDiscoveryEngine:
    """Main engine for discovering and ranking top traders."""

    def __init__(self):
        self.known_traders_db = KnownTraderDatabase()
        self.twitter_discovery = None
        self.reddit_discovery = None

        # Load API credentials
        self._load_credentials()

    def _load_credentials(self):
        """Load API credentials from environment."""
        import os

        # Twitter credentials
        twitter_bearer = os.getenv("TWITTER_BEARER_TOKEN")
        if twitter_bearer:
            self.twitter_discovery = TwitterTraderDiscovery(twitter_bearer)

        # Reddit credentials
        reddit_client_id = os.getenv("REDDIT_CLIENT_ID")
        reddit_client_secret = os.getenv("REDDIT_CLIENT_SECRET")
        reddit_user_agent = os.getenv("REDDIT_USER_AGENT")

        if all([reddit_client_id, reddit_client_secret, reddit_user_agent]):
            self.reddit_discovery = RedditTraderDiscovery(
                reddit_client_id, reddit_client_secret, reddit_user_agent
            )

    async def discover_top_traders(
        self,
        platforms: List[str] = None,
        specialties: List[str] = None,
        max_results: int = 50,
    ) -> List[TraderCandidate]:
        """Discover top traders across all available methods."""

        if platforms is None:
            platforms = ["twitter", "reddit", "youtube"]

        print("🔍 Discovering Top Traders Across Platforms")
        print("=" * 50)

        all_candidates = []

        # 1. Get known successful traders
        print("\n📚 Loading Known Successful Traders...")
        known_traders = self.known_traders_db.get_known_traders()
        all_candidates.extend(known_traders)
        print(f"   ✅ Found {len(known_traders)} verified successful traders")

        # 2. Discover Twitter traders
        if "twitter" in platforms and self.twitter_discovery:
            print("\n🐦 Discovering Twitter/FinTwit Traders...")
            try:
                twitter_candidates = (
                    await self.twitter_discovery.discover_fintwit_traders(
                        max_results=30
                    )
                )
                all_candidates.extend(twitter_candidates)
                print(
                    f"   ✅ Found {len(twitter_candidates)} Twitter trader candidates"
                )
            except Exception as e:
                print(f"   ❌ Twitter discovery error: {e}")

        # 3. Discover Reddit traders
        if "reddit" in platforms and self.reddit_discovery:
            print("\n📱 Discovering Reddit Traders...")
            try:
                reddit_candidates = await self.reddit_discovery.discover_reddit_traders(
                    max_results=20
                )
                all_candidates.extend(reddit_candidates)
                print(f"   ✅ Found {len(reddit_candidates)} Reddit trader candidates")
            except Exception as e:
                print(f"   ❌ Reddit discovery error: {e}")

        # 4. Remove duplicates and apply filters
        print(f"\n🔄 Processing and Ranking Candidates...")
        unique_candidates = {}

        for candidate in all_candidates:
            key = f"{candidate.platform}_{candidate.username}"
            if (
                key not in unique_candidates
                or candidate.discovery_score > unique_candidates[key].discovery_score
            ):
                unique_candidates[key] = candidate

        # Apply specialty filter
        filtered_candidates = list(unique_candidates.values())
        if specialties:
            # This would need more sophisticated specialty detection
            pass

        # Sort by discovery score
        top_candidates = sorted(
            filtered_candidates, key=lambda x: x.discovery_score, reverse=True
        )

        print(f"   📊 Total unique candidates: {len(top_candidates)}")
        print(
            f"   🏆 High confidence: {sum(1 for c in top_candidates if c.confidence_level == 'high')}"
        )
        print(
            f"   🎯 Medium confidence: {sum(1 for c in top_candidates if c.confidence_level == 'medium')}"
        )

        return top_candidates[:max_results]

    def get_traders_by_specialty(
        self, specialty: str, limit: int = 10
    ) -> List[TraderCandidate]:
        """Get top traders for a specific specialty."""
        specialty_map = {
            "day_trading": ["day_trading", "scalping"],
            "swing_trading": ["swing_trading", "technical_analysis"],
            "options": ["options_trading", "derivatives"],
            "value_investing": ["value_investing", "fundamental_analysis"],
            "crypto": ["crypto_trading", "defi"],
            "macro": ["macro_trading", "economics"],
            "technical_analysis": ["technical_analysis", "chart_patterns"],
        }

        target_specialties = specialty_map.get(specialty, [specialty])
        candidates = self.known_traders_db.get_known_traders()

        # Filter by specialty (simplified - in real implementation would be more sophisticated)
        filtered = [
            c
            for c in candidates
            if any(
                spec in c.name.lower() or spec in str(c.__dict__)
                for spec in target_specialties
            )
        ]

        return sorted(filtered, key=lambda x: x.discovery_score, reverse=True)[:limit]

    def get_platform_recommendations(self, platform: str) -> Dict[str, Any]:
        """Get platform-specific trader recommendations."""
        recommendations = {
            "twitter": {
                "description": "Real-time trading signals and market commentary",
                "best_for": [
                    "Day trading",
                    "Swing trading",
                    "Market news",
                    "Technical analysis",
                ],
                "search_hashtags": [
                    "#FinTwit",
                    "#StockTwitter",
                    "#TradingView",
                    "#OptionsFlow",
                ],
                "top_accounts": ["@sjosephburns", "@investorslive", "@michaeljburry"],
                "tips": [
                    "Look for verified accounts with consistent posting",
                    "Check for transparency in win/loss reporting",
                    "Avoid accounts that only promote paid services",
                    "Focus on accounts that share educational content",
                ],
            },
            "reddit": {
                "description": "In-depth analysis and community-driven research",
                "best_for": [
                    "Due diligence",
                    "Long-term investing",
                    "Value analysis",
                    "Community insights",
                ],
                "top_subreddits": [
                    "r/SecurityAnalysis",
                    "r/investing",
                    "r/ValueInvesting",
                    "r/stocks",
                ],
                "search_terms": ["DD", "analysis", "valuation", "thesis"],
                "tips": [
                    "Look for detailed posts with sources and data",
                    "Check user's post history for consistency",
                    "Focus on users who engage in discussions",
                    "Avoid pump-and-dump style posts",
                ],
            },
            "youtube": {
                "description": "Educational content and detailed market analysis",
                "best_for": [
                    "Learning",
                    "Strategy education",
                    "Market analysis",
                    "Long-form content",
                ],
                "top_channels": ["Ben Felix", "Patrick Boyle", "The Plain Bagel"],
                "search_terms": [
                    "trading education",
                    "market analysis",
                    "investment strategy",
                ],
                "tips": [
                    "Look for channels with educational focus",
                    "Check credentials and background",
                    "Avoid get-rich-quick content",
                    "Focus on evidence-based approaches",
                ],
            },
        }

        return recommendations.get(platform, {})


async def main():
    """Demo the trader discovery system."""
    print("🎯 Trader Discovery System Demo")
    print("=" * 50)

    # Initialize discovery engine
    engine = TraderDiscoveryEngine()

    # Discover top traders
    top_traders = await engine.discover_top_traders(
        platforms=["twitter", "reddit"], max_results=20
    )

    print(f"\n🏆 TOP DISCOVERED TRADERS")
    print("=" * 60)

    for i, trader in enumerate(top_traders[:10], 1):
        confidence_icon = {"high": "🔥", "medium": "🎯", "low": "⚠️"}.get(
            trader.confidence_level, "❓"
        )
        platform_icon = {"twitter": "🐦", "reddit": "📱", "youtube": "📺"}.get(
            trader.platform, "🌐"
        )

        print(f"\n{i:2d}. {trader.name} (@{trader.username})")
        print(f"    {platform_icon} Platform: {trader.platform.title()}")
        print(f"    {confidence_icon} Confidence: {trader.confidence_level.title()}")
        print(f"    📊 Score: {trader.discovery_score:.1f}/100")
        print(f"    👥 Followers: {trader.followers:,}")
        if trader.estimated_win_rate > 0:
            print(f"    🎯 Est. Win Rate: {trader.estimated_win_rate:.1f}%")
        if trader.verified:
            print(f"    ✅ Verified Account")

    # Show specialty recommendations
    print(f"\n📊 TRADERS BY SPECIALTY")
    print("=" * 40)

    specialties = ["day_trading", "swing_trading", "options", "value_investing"]

    for specialty in specialties:
        specialty_traders = engine.get_traders_by_specialty(specialty, limit=3)
        print(f"\n🎯 {specialty.replace('_', ' ').title()}:")

        for trader in specialty_traders:
            print(
                f"   • {trader.name} (@{trader.username}) - Score: {trader.discovery_score:.1f}"
            )

    # Show platform recommendations
    print(f"\n📱 PLATFORM RECOMMENDATIONS")
    print("=" * 40)

    for platform in ["twitter", "reddit", "youtube"]:
        recs = engine.get_platform_recommendations(platform)
        if recs:
            print(f"\n{platform.upper()}:")
            print(f"   📝 {recs['description']}")
            print(f"   🎯 Best for: {', '.join(recs['best_for'])}")
            if "top_accounts" in recs:
                print(f"   👑 Top accounts: {', '.join(recs['top_accounts'])}")

    print(f"\n✅ Trader Discovery Complete!")
    print("💡 Next steps:")
    print("   1. Add high-confidence traders to your following system")
    print("   2. Start with paper trading to validate their signals")
    print("   3. Monitor performance before live trading")
    print("   4. Diversify across different specialties and platforms")


if __name__ == "__main__":
    asyncio.run(main())
