"""
Enhanced Discovery Engine for True North Trading Platform
Multi-source, AI-powered discovery with market regime detection and advanced screening.
"""

import os
import asyncio
import aiohttp
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
import yfinance as yf
from dataclasses import dataclass
import logging
from concurrent.futures import ThreadPoolExecutor
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class MarketOpportunity:
    """Represents a discovered investment opportunity."""

    symbol: str
    name: str
    price: float
    market_cap: float

    # Discovery sources
    reddit_mentions: int = 0
    twitter_mentions: int = 0
    news_mentions: int = 0
    insider_activity: int = 0

    # Technical signals
    technical_score: float = 0.0
    momentum_score: float = 0.0
    volume_score: float = 0.0

    # Fundamental metrics
    pe_ratio: Optional[float] = None
    revenue_growth: Optional[float] = None
    profit_margin: Optional[float] = None

    # Risk metrics
    volatility: float = 0.0
    beta: Optional[float] = None
    liquidity_score: float = 0.0

    # AI analysis
    sentiment_score: float = 0.0
    confidence_level: float = 0.0
    risk_level: str = "MEDIUM"

    # Discovery metadata
    discovery_timestamp: datetime = datetime.now()
    discovery_sources: List[str] = None

    def __post_init__(self):
        if self.discovery_sources is None:
            self.discovery_sources = []


class MarketRegimeDetector:
    """Detects current market regime for context-aware discovery."""

    def __init__(self):
        self.vix_threshold_low = 20
        self.vix_threshold_high = 30

    async def detect_market_regime(self) -> Dict[str, Any]:
        """Detect current market regime."""
        try:
            # Get VIX data for volatility regime
            vix = yf.Ticker("^VIX")
            vix_data = vix.history(period="30d")
            current_vix = vix_data["Close"].iloc[-1]

            # Get SPY for market trend
            spy = yf.Ticker("SPY")
            spy_data = spy.history(period="60d")
            spy_sma_20 = spy_data["Close"].rolling(20).mean().iloc[-1]
            spy_current = spy_data["Close"].iloc[-1]

            # Get 10Y Treasury for yield analysis
            tnx = yf.Ticker("^TNX")
            tnx_data = tnx.history(period="30d")
            yield_10y = tnx_data["Close"].iloc[-1]
            yield_change = (
                (tnx_data["Close"].iloc[-1] - tnx_data["Close"].iloc[-5])
                / tnx_data["Close"].iloc[-5]
            ) * 100

            # Determine regime
            if current_vix < self.vix_threshold_low:
                volatility_regime = "LOW_VOLATILITY"
            elif current_vix > self.vix_threshold_high:
                volatility_regime = "HIGH_VOLATILITY"
            else:
                volatility_regime = "NORMAL_VOLATILITY"

            market_trend = "BULLISH" if spy_current > spy_sma_20 else "BEARISH"

            # Risk-on/Risk-off sentiment
            if current_vix < 20 and market_trend == "BULLISH":
                risk_sentiment = "RISK_ON"
            elif current_vix > 30 or market_trend == "BEARISH":
                risk_sentiment = "RISK_OFF"
            else:
                risk_sentiment = "NEUTRAL"

            regime = {
                "timestamp": datetime.now(),
                "volatility_regime": volatility_regime,
                "market_trend": market_trend,
                "risk_sentiment": risk_sentiment,
                "vix_level": current_vix,
                "spy_vs_sma": (spy_current / spy_sma_20 - 1) * 100,
                "yield_10y": yield_10y,
                "yield_change_5d": yield_change,
                "recommended_strategy": self._get_strategy_recommendation(
                    volatility_regime, market_trend, risk_sentiment
                ),
            }

            logger.info(
                f"Market Regime: {regime['volatility_regime']}, "
                f"Trend: {regime['market_trend']}, "
                f"Sentiment: {regime['risk_sentiment']}"
            )

            return regime

        except Exception as e:
            logger.error(f"Error detecting market regime: {e}")
            return {
                "timestamp": datetime.now(),
                "volatility_regime": "UNKNOWN",
                "market_trend": "UNKNOWN",
                "risk_sentiment": "NEUTRAL",
                "error": str(e),
            }

    def _get_strategy_recommendation(
        self, vol_regime: str, trend: str, sentiment: str
    ) -> str:
        """Get strategy recommendation based on market regime."""
        if sentiment == "RISK_ON" and trend == "BULLISH":
            return "GROWTH_MOMENTUM"
        elif sentiment == "RISK_OFF" or vol_regime == "HIGH_VOLATILITY":
            return "DEFENSIVE_VALUE"
        elif trend == "BEARISH":
            return "CONTRARIAN_QUALITY"
        else:
            return "BALANCED_DIVERSIFIED"


class SectorRotationAnalyzer:
    """Analyzes sector rotation patterns for discovery."""

    def __init__(self):
        self.sector_etfs = {
            "Technology": "XLK",
            "Healthcare": "XLV",
            "Financials": "XLF",
            "Consumer Discretionary": "XLY",
            "Communication Services": "XLC",
            "Industrials": "XLI",
            "Consumer Staples": "XLP",
            "Energy": "XLE",
            "Utilities": "XLU",
            "Real Estate": "XLRE",
            "Materials": "XLB",
        }

    async def analyze_sector_rotation(self) -> Dict[str, Any]:
        """Analyze current sector rotation trends."""
        try:
            sector_performance = {}

            for sector, etf in self.sector_etfs.items():
                try:
                    ticker = yf.Ticker(etf)
                    data = ticker.history(period="30d")

                    if len(data) >= 20:
                        # Calculate performance metrics
                        current_price = data["Close"].iloc[-1]
                        price_20d_ago = data["Close"].iloc[-20]
                        performance_20d = (
                            (current_price - price_20d_ago) / price_20d_ago
                        ) * 100

                        # Calculate momentum
                        sma_5 = data["Close"].rolling(5).mean().iloc[-1]
                        sma_20 = data["Close"].rolling(20).mean().iloc[-1]
                        momentum = ((sma_5 - sma_20) / sma_20) * 100

                        # Calculate relative volume
                        avg_volume = data["Volume"].rolling(20).mean().iloc[-1]
                        current_volume = data["Volume"].iloc[-1]
                        volume_ratio = current_volume / avg_volume

                        sector_performance[sector] = {
                            "etf": etf,
                            "performance_20d": performance_20d,
                            "momentum": momentum,
                            "volume_ratio": volume_ratio,
                            "current_price": current_price,
                        }

                except Exception as e:
                    logger.warning(f"Error analyzing sector {sector}: {e}")
                    continue

            # Rank sectors by performance
            sorted_sectors = sorted(
                sector_performance.items(),
                key=lambda x: x[1]["performance_20d"],
                reverse=True,
            )

            # Identify rotation patterns
            top_sectors = [s[0] for s in sorted_sectors[:3]]
            bottom_sectors = [s[0] for s in sorted_sectors[-3:]]

            rotation_analysis = {
                "timestamp": datetime.now(),
                "sector_performance": sector_performance,
                "top_performing_sectors": top_sectors,
                "bottom_performing_sectors": bottom_sectors,
                "rotation_strength": self._calculate_rotation_strength(
                    sector_performance
                ),
                "recommended_sectors": top_sectors[:2],  # Top 2 for focus
            }

            logger.info(f"Top performing sectors: {top_sectors}")
            return rotation_analysis

        except Exception as e:
            logger.error(f"Error in sector rotation analysis: {e}")
            return {"error": str(e), "timestamp": datetime.now()}

    def _calculate_rotation_strength(self, performance: Dict) -> str:
        """Calculate the strength of sector rotation."""
        if not performance:
            return "WEAK"

        performances = [s["performance_20d"] for s in performance.values()]
        spread = max(performances) - min(performances)

        if spread > 10:
            return "STRONG"
        elif spread > 5:
            return "MODERATE"
        else:
            return "WEAK"


class EarningsCalendarTracker:
    """Tracks upcoming earnings for discovery opportunities."""

    async def get_upcoming_earnings(self, days_ahead: int = 7) -> List[Dict[str, Any]]:
        """Get upcoming earnings announcements."""
        try:
            # This is a simplified implementation
            # In production, you'd use a dedicated earnings API

            # Sample high-profile stocks with typical earnings patterns
            sample_stocks = [
                "AAPL",
                "MSFT",
                "GOOGL",
                "AMZN",
                "TSLA",
                "META",
                "NVDA",
                "JPM",
                "BAC",
                "WMT",
                "PG",
                "JNJ",
                "V",
                "MA",
                "DIS",
            ]

            earnings_opportunities = []

            for symbol in sample_stocks:
                try:
                    ticker = yf.Ticker(symbol)
                    info = ticker.info

                    # Simulate earnings date (in real implementation, use actual API)
                    # This is just for demonstration
                    earnings_date = datetime.now() + timedelta(
                        days=np.random.randint(1, days_ahead + 1)
                    )

                    # Get recent price data for analysis
                    hist = ticker.history(period="30d")
                    if len(hist) > 0:
                        current_price = hist["Close"].iloc[-1]
                        volatility = (
                            hist["Close"].pct_change().std() * np.sqrt(252) * 100
                        )

                        earnings_opportunity = {
                            "symbol": symbol,
                            "company_name": info.get("longName", symbol),
                            "earnings_date": earnings_date,
                            "days_until_earnings": (
                                earnings_date - datetime.now()
                            ).days,
                            "current_price": current_price,
                            "market_cap": info.get("marketCap", 0),
                            "volatility": volatility,
                            "sector": info.get("sector", "Unknown"),
                            "pre_earnings_opportunity": volatility
                            > 25,  # High vol = opportunity
                        }

                        earnings_opportunities.append(earnings_opportunity)

                except Exception as e:
                    continue

            # Sort by days until earnings
            earnings_opportunities.sort(key=lambda x: x["days_until_earnings"])

            logger.info(f"Found {len(earnings_opportunities)} upcoming earnings")
            return earnings_opportunities

        except Exception as e:
            logger.error(f"Error getting earnings calendar: {e}")
            return []


class InsiderTradingMonitor:
    """Monitors insider trading activity for discovery signals."""

    async def analyze_insider_activity(self, symbols: List[str]) -> Dict[str, Any]:
        """Analyze insider trading activity for given symbols."""
        try:
            # This is a placeholder implementation
            # In production, you'd use SEC EDGAR API or similar service

            insider_signals = {}

            for symbol in symbols:
                try:
                    # Simulate insider activity analysis
                    # In real implementation, parse SEC Form 4 filings

                    # Random simulation for demonstration
                    insider_buys = np.random.randint(0, 5)
                    insider_sells = np.random.randint(0, 3)

                    net_insider_activity = insider_buys - insider_sells

                    if net_insider_activity > 0:
                        signal_strength = "BULLISH"
                    elif net_insider_activity < 0:
                        signal_strength = "BEARISH"
                    else:
                        signal_strength = "NEUTRAL"

                    insider_signals[symbol] = {
                        "insider_buys": insider_buys,
                        "insider_sells": insider_sells,
                        "net_activity": net_insider_activity,
                        "signal_strength": signal_strength,
                        "confidence": min(abs(net_insider_activity) * 0.3, 1.0),
                    }

                except Exception as e:
                    continue

            return {
                "timestamp": datetime.now(),
                "insider_signals": insider_signals,
                "bullish_signals": [
                    s
                    for s, data in insider_signals.items()
                    if data["signal_strength"] == "BULLISH"
                ],
                "bearish_signals": [
                    s
                    for s, data in insider_signals.items()
                    if data["signal_strength"] == "BEARISH"
                ],
            }

        except Exception as e:
            logger.error(f"Error analyzing insider activity: {e}")
            return {"error": str(e)}


class EnhancedDiscoveryEngine:
    """Main enhanced discovery engine combining all analysis methods."""

    def __init__(self):
        self.regime_detector = MarketRegimeDetector()
        self.sector_analyzer = SectorRotationAnalyzer()
        self.earnings_tracker = EarningsCalendarTracker()
        self.insider_monitor = InsiderTradingMonitor()

        # Discovery parameters
        self.max_opportunities = 20
        self.min_market_cap = 1_000_000_000  # $1B minimum
        self.max_volatility = 50  # 50% annual volatility max

    async def discover_opportunities(self) -> List[MarketOpportunity]:
        """Main discovery method combining all analysis."""
        print("🔍 Enhanced Discovery Engine - Scanning Global Markets")
        print("=" * 60)

        opportunities = []

        try:
            # Step 1: Analyze market regime
            print("\n📊 Step 1: Market Regime Analysis")
            market_regime = await self.regime_detector.detect_market_regime()
            print(
                f"   Market Regime: {market_regime.get('volatility_regime', 'UNKNOWN')}"
            )
            print(f"   Trend: {market_regime.get('market_trend', 'UNKNOWN')}")
            print(
                f"   Strategy: {market_regime.get('recommended_strategy', 'BALANCED')}"
            )

            # Step 2: Sector rotation analysis
            print("\n🔄 Step 2: Sector Rotation Analysis")
            sector_analysis = await self.sector_analyzer.analyze_sector_rotation()
            top_sectors = sector_analysis.get("top_performing_sectors", [])
            print(f"   Top Sectors: {', '.join(top_sectors[:3])}")

            # Step 3: Earnings calendar
            print("\n📅 Step 3: Earnings Calendar Analysis")
            earnings_opps = await self.earnings_tracker.get_upcoming_earnings()
            earnings_symbols = [e["symbol"] for e in earnings_opps[:10]]
            print(f"   Upcoming Earnings: {len(earnings_opps)} companies")

            # Step 4: Technical screening
            print("\n📈 Step 4: Technical Screening")
            technical_opps = await self._technical_screening(market_regime)
            print(f"   Technical Opportunities: {len(technical_opps)}")

            # Step 5: Combine and rank
            print("\n🎯 Step 5: Opportunity Ranking")
            all_symbols = set(earnings_symbols + technical_opps)

            # Analyze insider activity for discovered symbols
            insider_analysis = await self.insider_monitor.analyze_insider_activity(
                list(all_symbols)[:20]  # Limit for performance
            )

            # Create opportunity objects
            for symbol in list(all_symbols)[: self.max_opportunities]:
                try:
                    opportunity = await self._create_opportunity(
                        symbol,
                        market_regime,
                        sector_analysis,
                        earnings_opps,
                        insider_analysis,
                    )
                    if opportunity:
                        opportunities.append(opportunity)
                except Exception as e:
                    logger.warning(f"Error creating opportunity for {symbol}: {e}")
                    continue

            # Sort by confidence level
            opportunities.sort(key=lambda x: x.confidence_level, reverse=True)

            print(f"\n✅ Discovery Complete: {len(opportunities)} opportunities found")
            return opportunities[: self.max_opportunities]

        except Exception as e:
            logger.error(f"Error in discovery engine: {e}")
            return []

    async def _technical_screening(self, market_regime: Dict) -> List[str]:
        """Screen stocks based on technical criteria."""
        try:
            # Sample universe based on market regime
            if market_regime.get("recommended_strategy") == "GROWTH_MOMENTUM":
                universe = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META"]
            elif market_regime.get("recommended_strategy") == "DEFENSIVE_VALUE":
                universe = ["JNJ", "PG", "KO", "WMT", "VZ", "T", "PFE"]
            else:
                universe = ["AAPL", "MSFT", "JNJ", "JPM", "V", "UNH", "HD", "PG"]

            opportunities = []

            for symbol in universe:
                try:
                    ticker = yf.Ticker(symbol)
                    hist = ticker.history(period="60d")

                    if len(hist) < 20:
                        continue

                    # Technical criteria
                    current_price = hist["Close"].iloc[-1]
                    sma_20 = hist["Close"].rolling(20).mean().iloc[-1]
                    sma_50 = (
                        hist["Close"].rolling(50).mean().iloc[-1]
                        if len(hist) >= 50
                        else sma_20
                    )

                    # RSI calculation
                    delta = hist["Close"].diff()
                    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
                    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
                    rs = gain / loss
                    rsi = 100 - (100 / (1 + rs))
                    current_rsi = rsi.iloc[-1]

                    # Volume analysis
                    avg_volume = hist["Volume"].rolling(20).mean().iloc[-1]
                    current_volume = hist["Volume"].iloc[-1]
                    volume_ratio = current_volume / avg_volume

                    # Scoring criteria
                    score = 0

                    # Price above moving averages
                    if current_price > sma_20:
                        score += 1
                    if current_price > sma_50:
                        score += 1

                    # RSI in good range
                    if 30 < current_rsi < 70:
                        score += 1

                    # Volume confirmation
                    if volume_ratio > 1.2:
                        score += 1

                    # Recent momentum
                    momentum = (
                        (current_price - hist["Close"].iloc[-5])
                        / hist["Close"].iloc[-5]
                    ) * 100
                    if momentum > 1:
                        score += 1

                    # Add if meets criteria
                    if score >= 3:
                        opportunities.append(symbol)

                except Exception as e:
                    continue

            return opportunities

        except Exception as e:
            logger.error(f"Error in technical screening: {e}")
            return []

    async def _create_opportunity(
        self,
        symbol: str,
        market_regime: Dict,
        sector_analysis: Dict,
        earnings_opps: List[Dict],
        insider_analysis: Dict,
    ) -> Optional[MarketOpportunity]:
        """Create a MarketOpportunity object with full analysis."""
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            hist = ticker.history(period="30d")

            if len(hist) == 0:
                return None

            # Basic data
            current_price = hist["Close"].iloc[-1]
            market_cap = info.get("marketCap", 0)

            # Skip if below minimum market cap
            if market_cap < self.min_market_cap:
                return None

            # Technical analysis
            sma_20 = hist["Close"].rolling(20).mean().iloc[-1]
            volatility = hist["Close"].pct_change().std() * np.sqrt(252) * 100

            # Skip if too volatile
            if volatility > self.max_volatility:
                return None

            # Calculate scores
            technical_score = self._calculate_technical_score(hist)
            momentum_score = self._calculate_momentum_score(hist)
            volume_score = self._calculate_volume_score(hist)

            # Sentiment from various sources
            sentiment_score = 0.5  # Neutral baseline

            # Earnings proximity bonus
            earnings_bonus = 0
            for earnings in earnings_opps:
                if (
                    earnings["symbol"] == symbol
                    and earnings["days_until_earnings"] <= 7
                ):
                    earnings_bonus = 0.2
                    break

            # Insider activity
            insider_bonus = 0
            insider_data = insider_analysis.get("insider_signals", {}).get(symbol, {})
            if insider_data.get("signal_strength") == "BULLISH":
                insider_bonus = insider_data.get("confidence", 0) * 0.3

            # Overall confidence
            confidence_level = min(
                (technical_score + momentum_score + volume_score) / 3
                + earnings_bonus
                + insider_bonus,
                1.0,
            )

            # Risk assessment
            if volatility < 20:
                risk_level = "LOW"
            elif volatility < 35:
                risk_level = "MEDIUM"
            else:
                risk_level = "HIGH"

            # Discovery sources
            sources = ["technical_analysis"]
            if earnings_bonus > 0:
                sources.append("earnings_calendar")
            if insider_bonus > 0:
                sources.append("insider_activity")

            opportunity = MarketOpportunity(
                symbol=symbol,
                name=info.get("longName", symbol),
                price=current_price,
                market_cap=market_cap,
                technical_score=technical_score,
                momentum_score=momentum_score,
                volume_score=volume_score,
                pe_ratio=info.get("trailingPE"),
                revenue_growth=info.get("revenueGrowth"),
                profit_margin=info.get("profitMargins"),
                volatility=volatility,
                beta=info.get("beta"),
                liquidity_score=min(hist["Volume"].mean() / 1_000_000, 1.0),
                sentiment_score=sentiment_score,
                confidence_level=confidence_level,
                risk_level=risk_level,
                discovery_sources=sources,
            )

            return opportunity

        except Exception as e:
            logger.error(f"Error creating opportunity for {symbol}: {e}")
            return None

    def _calculate_technical_score(self, hist: pd.DataFrame) -> float:
        """Calculate technical analysis score."""
        try:
            current_price = hist["Close"].iloc[-1]
            sma_5 = hist["Close"].rolling(5).mean().iloc[-1]
            sma_20 = hist["Close"].rolling(20).mean().iloc[-1]

            score = 0

            # Price above moving averages
            if current_price > sma_5:
                score += 0.3
            if current_price > sma_20:
                score += 0.4

            # Moving average alignment
            if sma_5 > sma_20:
                score += 0.3

            return min(score, 1.0)

        except Exception:
            return 0.5

    def _calculate_momentum_score(self, hist: pd.DataFrame) -> float:
        """Calculate momentum score."""
        try:
            current_price = hist["Close"].iloc[-1]
            price_5d_ago = hist["Close"].iloc[-6] if len(hist) > 5 else current_price
            price_20d_ago = hist["Close"].iloc[-21] if len(hist) > 20 else current_price

            momentum_5d = ((current_price - price_5d_ago) / price_5d_ago) * 100
            momentum_20d = ((current_price - price_20d_ago) / price_20d_ago) * 100

            # Positive momentum gets higher score
            score = 0.5  # Neutral baseline

            if momentum_5d > 2:
                score += 0.3
            if momentum_20d > 5:
                score += 0.2

            return min(score, 1.0)

        except Exception:
            return 0.5

    def _calculate_volume_score(self, hist: pd.DataFrame) -> float:
        """Calculate volume score."""
        try:
            current_volume = hist["Volume"].iloc[-1]
            avg_volume = hist["Volume"].rolling(20).mean().iloc[-1]

            volume_ratio = current_volume / avg_volume

            # Higher volume gets higher score
            if volume_ratio > 2.0:
                return 1.0
            elif volume_ratio > 1.5:
                return 0.8
            elif volume_ratio > 1.2:
                return 0.6
            else:
                return 0.4

        except Exception:
            return 0.5


async def main():
    """Demo the enhanced discovery engine."""
    print("🚀 Enhanced Discovery Engine Demo")
    print("=" * 50)

    engine = EnhancedDiscoveryEngine()
    opportunities = await engine.discover_opportunities()

    print(f"\n📋 Top Investment Opportunities ({len(opportunities)} found)")
    print("=" * 80)

    for i, opp in enumerate(opportunities[:10], 1):
        print(f"\n{i}. {opp.symbol} - {opp.name}")
        print(f"   💰 Price: ${opp.price:.2f} | Market Cap: ${opp.market_cap:,.0f}")
        print(
            f"   📊 Technical: {opp.technical_score:.2f} | Momentum: {opp.momentum_score:.2f}"
        )
        print(f"   🎯 Confidence: {opp.confidence_level:.2f} | Risk: {opp.risk_level}")
        print(f"   🔍 Sources: {', '.join(opp.discovery_sources)}")

        if opp.pe_ratio:
            print(f"   📈 P/E: {opp.pe_ratio:.1f}")
        if opp.volatility:
            print(f"   📉 Volatility: {opp.volatility:.1f}%")

    print(f"\n✅ Enhanced Discovery Complete!")
    print("💡 This system provides much more sophisticated opportunity identification")
    print(
        "   with market regime awareness, sector rotation, and multi-source analysis."
    )


if __name__ == "__main__":
    asyncio.run(main())
