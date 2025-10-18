#!/usr/bin/env python3
"""
True North Trading Platform - Investment Discovery Engine
Automatically discovers investment opportunities by scanning:
- Reddit discussions (r/investing, r/stocks, r/SecurityAnalysis)
- Twitter sentiment and mentions
- Financial news and reports
- Market data and technical indicators
- International and domestic markets
"""

import os
import sys
import re
import time
from pathlib import Path
from datetime import datetime, timedelta
from collections import defaultdict, Counter
from dotenv import load_dotenv

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()


class InvestmentDiscoveryEngine:
    """Main engine for discovering investment opportunities."""

    def __init__(self):
        self.discovered_stocks = {}
        self.sentiment_scores = {}
        self.news_mentions = {}
        self.reddit_mentions = {}
        self.twitter_mentions = {}
        self.market_data = {}

        # Stock symbol patterns for extraction
        self.stock_pattern = re.compile(
            r"\$([A-Z]{1,5})\b|\b([A-Z]{1,5})\s+(?:stock|shares|ticker)"
        )

    def discover_investments(self, max_stocks=10):
        """Main discovery process."""
        print("🔍 True North Investment Discovery Engine")
        print("=" * 60)
        print("🌍 Scanning global markets for investment opportunities...")

        # Step 1: Scan Reddit for stock discussions
        print("\n📱 Step 1: Scanning Reddit Discussions")
        reddit_stocks = self.scan_reddit()

        # Step 2: Scan Twitter for trending stocks
        print("\n🐦 Step 2: Scanning Twitter Sentiment")
        twitter_stocks = self.scan_twitter()

        # Step 3: Scan financial news
        print("\n📰 Step 3: Scanning Financial News")
        news_stocks = self.scan_news()

        # Step 4: Technical market screening
        print("\n📊 Step 4: Technical Market Screening")
        technical_stocks = self.technical_screening()

        # Step 5: Combine and rank opportunities
        print("\n🎯 Step 5: Ranking Investment Opportunities")
        ranked_opportunities = self.rank_opportunities(
            reddit_stocks, twitter_stocks, news_stocks, technical_stocks
        )

        # Step 6: AI analysis of top opportunities
        print("\n🤖 Step 6: AI Analysis of Top Opportunities")
        final_recommendations = self.ai_analysis(ranked_opportunities[:max_stocks])

        return final_recommendations

    def scan_reddit(self):
        """Scan Reddit for stock discussions and sentiment."""
        discovered_stocks = set()

        try:
            import praw

            # Initialize Reddit API
            reddit = praw.Reddit(
                client_id=os.getenv("REDDIT_CLIENT_ID"),
                client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
                user_agent=os.getenv("REDDIT_USER_AGENT", "TrueNorthTrading/1.0"),
            )

            # Subreddits to monitor
            subreddits = [
                "investing",
                "stocks",
                "SecurityAnalysis",
                "ValueInvesting",
                "pennystocks",
                "StockMarket",
                "financialindependence",
            ]

            print(f"   📊 Scanning {len(subreddits)} investment subreddits...")

            for sub_name in subreddits:
                try:
                    subreddit = reddit.subreddit(sub_name)

                    # Get hot posts from the last 24 hours
                    for post in subreddit.hot(limit=20):
                        # Extract stock symbols from title and text
                        text = f"{post.title} {post.selftext}"
                        symbols = self.extract_stock_symbols(text)

                        for symbol in symbols:
                            discovered_stocks.add(symbol)
                            self.reddit_mentions[symbol] = (
                                self.reddit_mentions.get(symbol, 0) + 1
                            )

                    print(f"   ✅ r/{sub_name}: Found {len(symbols)} mentions")
                    time.sleep(1)  # Rate limiting

                except Exception as e:
                    print(f"   ⚠️  r/{sub_name}: {e}")

        except ImportError:
            print("   ❌ Reddit API not available (praw not installed)")
        except Exception as e:
            print(f"   ❌ Reddit scanning error: {e}")

        # Fallback: Use web scraping for Reddit
        if not discovered_stocks:
            discovered_stocks = self.scrape_reddit_fallback()

        print(f"   📈 Reddit Discovery: {len(discovered_stocks)} unique stocks found")
        return list(discovered_stocks)

    def scrape_reddit_fallback(self):
        """Fallback Reddit scraping using web requests."""
        discovered_stocks = set()

        try:
            import requests
            from bs4 import BeautifulSoup

            # Popular investment subreddits
            subreddits = ["investing", "stocks", "SecurityAnalysis"]

            for sub in subreddits:
                try:
                    url = f"https://www.reddit.com/r/{sub}/hot.json?limit=25"
                    headers = {"User-Agent": "TrueNorthTrading/1.0"}

                    response = requests.get(url, headers=headers, timeout=10)
                    if response.status_code == 200:
                        data = response.json()

                        for post in data["data"]["children"]:
                            title = post["data"]["title"]
                            text = post["data"].get("selftext", "")

                            symbols = self.extract_stock_symbols(f"{title} {text}")
                            discovered_stocks.update(symbols)

                        print(f"   ✅ r/{sub}: Scraped successfully")
                    else:
                        print(f"   ⚠️  r/{sub}: HTTP {response.status_code}")

                    time.sleep(2)  # Rate limiting

                except Exception as e:
                    print(f"   ❌ r/{sub}: {e}")

        except Exception as e:
            print(f"   ❌ Reddit fallback error: {e}")

        return discovered_stocks

    def scan_twitter(self):
        """Scan Twitter for trending stocks and sentiment."""
        discovered_stocks = set()

        try:
            import requests

            bearer_token = os.getenv("TWITTER_BEARER_TOKEN")
            if not bearer_token:
                print("   ❌ Twitter Bearer Token not configured")
                return []

            headers = {"Authorization": f"Bearer {bearer_token}"}

            # Search for financial keywords
            queries = [
                "stock pick",
                "buy stock",
                "investment opportunity",
                "bullish on",
                "stock analysis",
                "$",  # Dollar sign for tickers
            ]

            print(f"   🔍 Searching Twitter for {len(queries)} financial keywords...")

            for query in queries:
                try:
                    url = "https://api.twitter.com/2/tweets/search/recent"
                    params = {
                        "query": f"{query} -is:retweet lang:en",
                        "max_results": 20,
                        "tweet.fields": "public_metrics,created_at",
                    }

                    response = requests.get(
                        url, headers=headers, params=params, timeout=10
                    )

                    if response.status_code == 200:
                        data = response.json()

                        if "data" in data:
                            for tweet in data["data"]:
                                text = tweet["text"]
                                symbols = self.extract_stock_symbols(text)

                                for symbol in symbols:
                                    discovered_stocks.add(symbol)
                                    self.twitter_mentions[symbol] = (
                                        self.twitter_mentions.get(symbol, 0) + 1
                                    )

                        print(
                            f"   ✅ '{query}': Found {len(symbols) if 'symbols' in locals() else 0} mentions"
                        )
                    else:
                        print(f"   ⚠️  '{query}': HTTP {response.status_code}")

                    time.sleep(2)  # Rate limiting

                except Exception as e:
                    print(f"   ❌ '{query}': {e}")

        except Exception as e:
            print(f"   ❌ Twitter scanning error: {e}")

        print(f"   🐦 Twitter Discovery: {len(discovered_stocks)} unique stocks found")
        return list(discovered_stocks)

    def scan_news(self):
        """Scan financial news for stock mentions and sentiment."""
        discovered_stocks = set()

        try:
            import requests

            news_api_key = os.getenv("NEWS_API_KEY")
            if not news_api_key:
                print("   ❌ News API key not configured")
                return []

            # Financial news sources and keywords
            sources = "bloomberg,reuters,financial-times,the-wall-street-journal,cnbc"
            keywords = [
                "stock recommendation",
                "buy rating",
                "analyst upgrade",
                "earnings beat",
                "strong quarter",
                "investment opportunity",
            ]

            print(f"   📰 Scanning financial news for {len(keywords)} keywords...")

            for keyword in keywords:
                try:
                    url = "https://newsapi.org/v2/everything"
                    params = {
                        "q": keyword,
                        "sources": sources,
                        "language": "en",
                        "sortBy": "publishedAt",
                        "pageSize": 20,
                        "apiKey": news_api_key,
                    }

                    response = requests.get(url, params=params, timeout=10)

                    if response.status_code == 200:
                        data = response.json()

                        for article in data.get("articles", []):
                            title = article["title"]
                            description = article.get("description", "")

                            text = f"{title} {description}"
                            symbols = self.extract_stock_symbols(text)

                            for symbol in symbols:
                                discovered_stocks.add(symbol)
                                self.news_mentions[symbol] = (
                                    self.news_mentions.get(symbol, 0) + 1
                                )

                        print(
                            f"   ✅ '{keyword}': Found {len(symbols) if 'symbols' in locals() else 0} mentions"
                        )
                    else:
                        print(f"   ⚠️  '{keyword}': HTTP {response.status_code}")

                    time.sleep(1)  # Rate limiting

                except Exception as e:
                    print(f"   ❌ '{keyword}': {e}")

        except Exception as e:
            print(f"   ❌ News scanning error: {e}")

        print(f"   📰 News Discovery: {len(discovered_stocks)} unique stocks found")
        return list(discovered_stocks)

    def technical_screening(self):
        """Screen stocks based on technical indicators."""
        discovered_stocks = []

        try:
            import yfinance as yf

            # Popular stock lists to screen
            stock_lists = {
                "S&P 500 Sample": [
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
                ],
                "International": [
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
                ],
                "Growth Stocks": [
                    "ROKU",
                    "PLTR",
                    "SNOW",
                    "CRWD",
                    "ZM",
                    "SHOP",
                    "SQ",
                    "PYPL",
                    "NFLX",
                    "CRM",
                ],
            }

            print(
                f"   📊 Screening {sum(len(stocks) for stocks in stock_lists.values())} stocks..."
            )

            for category, symbols in stock_lists.items():
                print(f"   🔍 Analyzing {category}...")

                for symbol in symbols:
                    try:
                        ticker = yf.Ticker(symbol)
                        hist = ticker.history(period="60d")

                        if len(hist) < 20:
                            continue

                        current_price = hist["Close"].iloc[-1]
                        sma_20 = hist["Close"].rolling(window=20).mean().iloc[-1]
                        sma_50 = (
                            hist["Close"].rolling(window=50).mean().iloc[-1]
                            if len(hist) >= 50
                            else sma_20
                        )

                        volume_avg = hist["Volume"].rolling(window=20).mean().iloc[-1]
                        current_volume = hist["Volume"].iloc[-1]

                        # Technical criteria for discovery
                        criteria_met = 0

                        # Price above moving averages (bullish)
                        if current_price > sma_20:
                            criteria_met += 1
                        if current_price > sma_50:
                            criteria_met += 1

                        # Volume above average (interest)
                        if current_volume > volume_avg * 1.2:
                            criteria_met += 1

                        # Recent momentum (last 5 days)
                        recent_change = (
                            (current_price - hist["Close"].iloc[-6])
                            / hist["Close"].iloc[-6]
                        ) * 100
                        if recent_change > 2:  # 2% gain in 5 days
                            criteria_met += 1

                        # If stock meets multiple criteria, add to discoveries
                        if criteria_met >= 2:
                            discovered_stocks.append(symbol)
                            self.market_data[symbol] = {
                                "price": current_price,
                                "sma_20": sma_20,
                                "sma_50": sma_50,
                                "volume_ratio": current_volume / volume_avg,
                                "recent_change": recent_change,
                                "criteria_met": criteria_met,
                            }

                    except Exception as e:
                        continue  # Skip problematic symbols

                time.sleep(0.5)  # Rate limiting

        except Exception as e:
            print(f"   ❌ Technical screening error: {e}")

        print(
            f"   📈 Technical Discovery: {len(discovered_stocks)} stocks passed screening"
        )
        return discovered_stocks

    def extract_stock_symbols(self, text):
        """Extract stock symbols from text."""
        symbols = set()

        # Find $SYMBOL patterns
        dollar_symbols = re.findall(r"\$([A-Z]{1,5})\b", text.upper())
        symbols.update(dollar_symbols)

        # Find SYMBOL patterns (more conservative)
        word_symbols = re.findall(
            r"\b([A-Z]{2,5})\b(?=\s+(?:stock|shares|ticker|company|corp))", text.upper()
        )
        symbols.update(word_symbols)

        # Filter out common false positives
        false_positives = {
            "THE",
            "AND",
            "FOR",
            "ARE",
            "BUT",
            "NOT",
            "YOU",
            "ALL",
            "CAN",
            "HER",
            "WAS",
            "ONE",
            "OUR",
            "OUT",
            "DAY",
            "GET",
            "USE",
            "MAN",
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
            "OIL",
            "SIT",
            "SET",
            "RUN",
            "EAT",
            "FAR",
            "SEA",
            "EYE",
            "BED",
            "RED",
            "TOP",
            "ARM",
            "TOO",
            "OLD",
            "END",
            "WHY",
            "LET",
            "TRY",
            "ASK",
            "MEN",
            "YES",
            "HIT",
            "WIN",
            "SUN",
            "CUT",
            "LOT",
            "FUN",
            "BAD",
            "GOT",
            "JOB",
            "BOY",
            "DID",
            "CAR",
            "ETC",
            "USA",
            "CEO",
            "CFO",
            "CTO",
            "IPO",
            "SEC",
            "FDA",
            "GDP",
            "API",
            "URL",
            "PDF",
            "FAQ",
            "ATM",
            "GPS",
            "USB",
            "DVD",
            "LCD",
            "LED",
            "CPU",
            "GPU",
            "RAM",
            "SSD",
            "HDD",
        }

        return [s for s in symbols if s not in false_positives and len(s) >= 2]

    def rank_opportunities(
        self, reddit_stocks, twitter_stocks, news_stocks, technical_stocks
    ):
        """Rank discovered opportunities by multiple factors."""

        # Combine all discovered stocks
        all_stocks = set(
            reddit_stocks + twitter_stocks + news_stocks + technical_stocks
        )

        scored_stocks = []

        for symbol in all_stocks:
            score = 0
            sources = []

            # Reddit mentions (social sentiment)
            reddit_score = self.reddit_mentions.get(symbol, 0)
            if reddit_score > 0:
                score += min(reddit_score * 2, 10)  # Cap at 10 points
                sources.append(f"Reddit({reddit_score})")

            # Twitter mentions (social buzz)
            twitter_score = self.twitter_mentions.get(symbol, 0)
            if twitter_score > 0:
                score += min(twitter_score * 3, 15)  # Cap at 15 points
                sources.append(f"Twitter({twitter_score})")

            # News mentions (media coverage)
            news_score = self.news_mentions.get(symbol, 0)
            if news_score > 0:
                score += min(news_score * 5, 20)  # Cap at 20 points
                sources.append(f"News({news_score})")

            # Technical criteria (market performance)
            if symbol in self.market_data:
                tech_score = self.market_data[symbol]["criteria_met"] * 5
                score += tech_score
                sources.append(f"Technical({tech_score})")

            # Bonus for multiple sources
            if len(sources) >= 2:
                score += 5

            scored_stocks.append(
                {
                    "symbol": symbol,
                    "score": score,
                    "sources": sources,
                    "market_data": self.market_data.get(symbol, {}),
                }
            )

        # Sort by score (highest first)
        scored_stocks.sort(key=lambda x: x["score"], reverse=True)

        print(f"   🎯 Ranked {len(scored_stocks)} investment opportunities")

        return scored_stocks

    def ai_analysis(self, top_opportunities):
        """AI analysis of top investment opportunities."""

        if not os.getenv("OPENAI_API_KEY"):
            print("   ❌ OpenAI API key required for AI analysis")
            return top_opportunities

        try:
            from openai import OpenAI

            client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

            analyzed_opportunities = []

            for i, opportunity in enumerate(top_opportunities[:5]):  # Analyze top 5
                symbol = opportunity["symbol"]

                print(
                    f"   🤖 Analyzing {symbol} ({i+1}/{min(5, len(top_opportunities))})..."
                )

                try:
                    # Get additional market data
                    import yfinance as yf

                    ticker = yf.Ticker(symbol)
                    info = ticker.info

                    # Create AI analysis prompt
                    prompt = f"""
                    Analyze {symbol} as an investment opportunity:
                    
                    Discovery Sources: {', '.join(opportunity['sources'])}
                    Company: {info.get('longName', symbol)}
                    Sector: {info.get('sector', 'Unknown')}
                    Market Cap: ${info.get('marketCap', 0):,}
                    
                    Provide a concise analysis:
                    1. Investment thesis (2-3 sentences)
                    2. Key strengths and risks
                    3. Recommendation: BUY/HOLD/AVOID
                    4. Confidence level (1-10)
                    """

                    response = client.chat.completions.create(
                        model="gpt-4o-mini",
                        messages=[
                            {
                                "role": "system",
                                "content": "You are a professional investment analyst. Be objective and concise.",
                            },
                            {"role": "user", "content": prompt},
                        ],
                        max_tokens=300,
                    )

                    ai_analysis = response.choices[0].message.content

                    opportunity["ai_analysis"] = ai_analysis
                    opportunity["company_info"] = {
                        "name": info.get("longName", symbol),
                        "sector": info.get("sector", "Unknown"),
                        "market_cap": info.get("marketCap", 0),
                    }

                    analyzed_opportunities.append(opportunity)

                    time.sleep(1)  # Rate limiting

                except Exception as e:
                    print(f"   ⚠️  {symbol}: Analysis error - {e}")
                    analyzed_opportunities.append(opportunity)

            return analyzed_opportunities

        except Exception as e:
            print(f"   ❌ AI analysis error: {e}")
            return top_opportunities

    def display_results(self, recommendations):
        """Display final investment recommendations."""

        print("\n🎯 INVESTMENT DISCOVERY RESULTS")
        print("=" * 60)

        if not recommendations:
            print("❌ No investment opportunities discovered.")
            print("💡 Try configuring more API keys or check your internet connection.")
            return

        print(f"📊 Discovered {len(recommendations)} investment opportunities")
        print("🌍 Including both domestic and international markets")

        for i, rec in enumerate(recommendations, 1):
            symbol = rec["symbol"]
            score = rec["score"]
            sources = rec["sources"]

            print(f"\n🏆 #{i}. {symbol} (Score: {score})")

            # Company info
            if "company_info" in rec:
                info = rec["company_info"]
                print(f"   🏢 {info['name']}")
                print(f"   🏭 Sector: {info['sector']}")
                if info["market_cap"] > 0:
                    print(f"   💰 Market Cap: ${info['market_cap']:,}")

            # Discovery sources
            print(f"   📊 Sources: {', '.join(sources)}")

            # Market data
            if "market_data" in rec and rec["market_data"]:
                data = rec["market_data"]
                print(f"   📈 Price: ${data.get('price', 0):.2f}")
                if "recent_change" in data:
                    print(f"   📊 5-Day Change: {data['recent_change']:+.2f}%")

            # AI analysis
            if "ai_analysis" in rec:
                print(f"   🤖 AI Analysis:")
                # Format AI analysis with proper indentation
                analysis_lines = rec["ai_analysis"].split("\n")
                for line in analysis_lines:
                    if line.strip():
                        print(f"      {line.strip()}")

        print(f"\n✅ Discovery Complete!")
        print("💡 These are AI-discovered opportunities based on social sentiment,")
        print("   news coverage, and technical analysis. Always do your own research!")


def main():
    """Main function to run investment discovery."""

    print("🚀 Starting Investment Discovery...")

    # Initialize discovery engine
    engine = InvestmentDiscoveryEngine()

    # Discover investment opportunities
    recommendations = engine.discover_investments(max_stocks=10)

    # Display results
    engine.display_results(recommendations)

    print(f"\n📝 Next Steps:")
    print("1. Research the top recommendations further")
    print("2. Check your broker for international market access")
    print("3. Consider position sizing and risk management")
    print("4. Set up alerts for your chosen investments")


if __name__ == "__main__":
    main()
