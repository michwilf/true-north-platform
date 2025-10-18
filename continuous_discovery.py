#!/usr/bin/env python3
"""
True North Trading Platform - Continuous Investment Discovery
Runs periodic scans and maintains a watchlist of discovered opportunities.
"""

import os
import sys
import json
import time
from pathlib import Path
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()


class ContinuousDiscovery:
    """Continuous investment discovery with watchlist management."""

    def __init__(self):
        self.watchlist_file = Path("discovered_watchlist.json")
        self.watchlist = self.load_watchlist()

    def load_watchlist(self):
        """Load existing watchlist from file."""
        if self.watchlist_file.exists():
            try:
                with open(self.watchlist_file, "r") as f:
                    return json.load(f)
            except:
                return {}
        return {}

    def save_watchlist(self):
        """Save watchlist to file."""
        with open(self.watchlist_file, "w") as f:
            json.dump(self.watchlist, f, indent=2, default=str)

    def quick_discovery_scan(self):
        """Quick discovery scan focusing on high-signal sources."""
        print(f"🔍 Quick Discovery Scan - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        print("=" * 60)

        discovered = {}

        # 1. Technical momentum screening
        print("📊 Screening for technical momentum...")
        momentum_stocks = self.momentum_screening()

        # 2. News sentiment analysis
        print("📰 Analyzing recent financial news...")
        news_stocks = self.news_sentiment_scan()

        # 3. Combine and score
        all_stocks = set(momentum_stocks + news_stocks)

        for symbol in all_stocks:
            score = 0
            sources = []

            if symbol in momentum_stocks:
                score += 10
                sources.append("Technical")

            if symbol in news_stocks:
                score += 15
                sources.append("News")

            discovered[symbol] = {
                "score": score,
                "sources": sources,
                "discovered_at": datetime.now(),
                "last_updated": datetime.now(),
            }

        # Update watchlist
        for symbol, data in discovered.items():
            if symbol in self.watchlist:
                # Update existing entry
                self.watchlist[symbol]["score"] = max(
                    self.watchlist[symbol]["score"], data["score"]
                )
                self.watchlist[symbol]["last_updated"] = data["last_updated"]
                if data["sources"][0] not in self.watchlist[symbol]["sources"]:
                    self.watchlist[symbol]["sources"].extend(data["sources"])
            else:
                # New discovery
                self.watchlist[symbol] = data

        self.save_watchlist()

        print(f"✅ Scan complete: {len(discovered)} new opportunities found")
        return discovered

    def momentum_screening(self):
        """Screen for stocks with strong momentum."""
        momentum_stocks = []

        try:
            import yfinance as yf

            # Expanded stock universe
            stock_universe = [
                # US Large Cap
                "AAPL",
                "MSFT",
                "GOOGL",
                "AMZN",
                "TSLA",
                "NVDA",
                "META",
                "BRK-B",
                "JNJ",
                "V",
                "JPM",
                "PG",
                "UNH",
                "HD",
                "MA",
                "DIS",
                "ADBE",
                "NFLX",
                "CRM",
                "PYPL",
                # International
                "ASML",
                "TSM",
                "NESN.SW",
                "RHHBY",
                "TM",
                "UL",
                "NVO",
                "BABA",
                "TCEHY",
                "SAP",
                "SHOP.TO",
                "MC.PA",
                "LVMH.PA",
                "OR.PA",
                "AIR.PA",
                "SAN.PA",
                "BNP.PA",
                # Growth/Tech
                "ROKU",
                "PLTR",
                "SNOW",
                "CRWD",
                "ZM",
                "SHOP",
                "DDOG",
                "OKTA",
                "TWLO",
                "ZS",
                # ETFs for sector momentum
                "QQQ",
                "SPY",
                "IWM",
                "EFA",
                "EEM",
                "VTI",
                "ARKK",
                "XLK",
                "XLF",
                "XLE",
            ]

            for symbol in stock_universe:
                try:
                    ticker = yf.Ticker(symbol)
                    hist = ticker.history(period="30d")

                    if len(hist) < 10:
                        continue

                    current_price = hist["Close"].iloc[-1]
                    price_10d_ago = hist["Close"].iloc[-10]

                    # Calculate momentum metrics
                    momentum_10d = (
                        (current_price - price_10d_ago) / price_10d_ago
                    ) * 100

                    # Volume surge check
                    avg_volume = hist["Volume"].rolling(window=10).mean().iloc[-1]
                    recent_volume = hist["Volume"].iloc[-1]
                    volume_ratio = recent_volume / avg_volume

                    # Momentum criteria
                    if (
                        momentum_10d > 5 and volume_ratio > 1.5
                    ):  # 5% gain + volume surge
                        momentum_stocks.append(symbol)

                except:
                    continue

        except Exception as e:
            print(f"   ❌ Momentum screening error: {e}")

        print(f"   📈 Found {len(momentum_stocks)} momentum stocks")
        return momentum_stocks

    def news_sentiment_scan(self):
        """Scan news for positive sentiment stocks."""
        news_stocks = []

        try:
            import requests

            news_api_key = os.getenv("NEWS_API_KEY")
            if not news_api_key:
                print("   ⚠️  News API key not configured")
                return []

            # Positive sentiment keywords
            positive_keywords = [
                "analyst upgrade",
                "price target raised",
                "buy rating",
                "earnings beat",
                "revenue growth",
                "strong guidance",
                "breakthrough",
                "partnership",
                "acquisition",
            ]

            for keyword in positive_keywords[:3]:  # Limit to avoid rate limits
                try:
                    url = "https://newsapi.org/v2/everything"
                    params = {
                        "q": keyword,
                        "language": "en",
                        "sortBy": "publishedAt",
                        "pageSize": 10,
                        "from": (datetime.now() - timedelta(days=1)).isoformat(),
                        "apiKey": news_api_key,
                    }

                    response = requests.get(url, params=params, timeout=10)

                    if response.status_code == 200:
                        data = response.json()

                        for article in data.get("articles", []):
                            title = article["title"]
                            description = article.get("description", "")

                            # Extract stock symbols
                            import re

                            symbols = re.findall(
                                r"\b([A-Z]{2,5})\b", f"{title} {description}"
                            )

                            # Filter valid symbols
                            valid_symbols = [
                                s
                                for s in symbols
                                if len(s) <= 5
                                and s
                                not in [
                                    "THE",
                                    "AND",
                                    "FOR",
                                    "ARE",
                                    "BUT",
                                    "NOT",
                                    "YOU",
                                    "ALL",
                                    "CAN",
                                    "NEW",
                                    "NOW",
                                    "WAY",
                                    "MAY",
                                    "SAY",
                                    "SEE",
                                    "HIM",
                                    "TWO",
                                    "HOW",
                                    "ITS",
                                    "WHO",
                                    "USA",
                                    "CEO",
                                    "CFO",
                                    "CTO",
                                    "IPO",
                                    "SEC",
                                    "FDA",
                                    "GDP",
                                ]
                            ]

                            news_stocks.extend(valid_symbols)

                    time.sleep(1)  # Rate limiting

                except Exception as e:
                    continue

        except Exception as e:
            print(f"   ❌ News scanning error: {e}")

        # Remove duplicates
        news_stocks = list(set(news_stocks))
        print(f"   📰 Found {len(news_stocks)} news-mentioned stocks")
        return news_stocks

    def get_top_opportunities(self, limit=10):
        """Get top opportunities from watchlist."""

        # Sort by score and recency
        sorted_opportunities = sorted(
            self.watchlist.items(),
            key=lambda x: (x[1]["score"], x[1]["last_updated"]),
            reverse=True,
        )

        return sorted_opportunities[:limit]

    def display_watchlist(self, limit=10):
        """Display current watchlist."""

        print(f"\n📊 INVESTMENT WATCHLIST - Top {limit}")
        print("=" * 60)

        if not self.watchlist:
            print("❌ No opportunities in watchlist yet.")
            print("💡 Run a discovery scan to populate the watchlist.")
            return

        top_opportunities = self.get_top_opportunities(limit)

        for i, (symbol, data) in enumerate(top_opportunities, 1):
            print(f"\n🏆 #{i}. {symbol} (Score: {data['score']})")
            print(f"   📊 Sources: {', '.join(data['sources'])}")
            print(f"   🕒 Discovered: {data['discovered_at']}")
            print(f"   🔄 Updated: {data['last_updated']}")

            # Get current price if possible
            try:
                import yfinance as yf

                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="1d")
                if not hist.empty:
                    current_price = hist["Close"].iloc[-1]
                    print(f"   💰 Current Price: ${current_price:.2f}")
            except:
                pass

    def cleanup_watchlist(self, days_old=7):
        """Remove old entries from watchlist."""

        cutoff_date = datetime.now() - timedelta(days=days_old)

        to_remove = []
        for symbol, data in self.watchlist.items():
            last_updated = data["last_updated"]
            if isinstance(last_updated, str):
                last_updated = datetime.fromisoformat(last_updated)

            if last_updated < cutoff_date:
                to_remove.append(symbol)

        for symbol in to_remove:
            del self.watchlist[symbol]

        if to_remove:
            self.save_watchlist()
            print(f"🧹 Cleaned up {len(to_remove)} old entries from watchlist")

    def export_watchlist_csv(self):
        """Export watchlist to CSV for external analysis."""

        import csv

        csv_file = "investment_watchlist.csv"

        with open(csv_file, "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(
                ["Symbol", "Score", "Sources", "Discovered", "Last Updated"]
            )

            for symbol, data in self.watchlist.items():
                writer.writerow(
                    [
                        symbol,
                        data["score"],
                        ", ".join(data["sources"]),
                        data["discovered_at"],
                        data["last_updated"],
                    ]
                )

        print(f"📄 Watchlist exported to {csv_file}")


def main():
    """Main function for continuous discovery."""

    import argparse

    parser = argparse.ArgumentParser(
        description="True North Continuous Investment Discovery"
    )
    parser.add_argument("--scan", action="store_true", help="Run discovery scan")
    parser.add_argument("--watch", action="store_true", help="Show watchlist")
    parser.add_argument("--cleanup", action="store_true", help="Cleanup old entries")
    parser.add_argument("--export", action="store_true", help="Export to CSV")
    parser.add_argument("--limit", type=int, default=10, help="Limit results")

    args = parser.parse_args()

    discovery = ContinuousDiscovery()

    if args.scan:
        discovery.quick_discovery_scan()
        discovery.display_watchlist(args.limit)
    elif args.cleanup:
        discovery.cleanup_watchlist()
    elif args.export:
        discovery.export_watchlist_csv()
    else:
        discovery.display_watchlist(args.limit)


if __name__ == "__main__":
    main()
