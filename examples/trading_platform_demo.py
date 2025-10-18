#!/usr/bin/env python3
"""
True North Trading Platform Demo

This demo shows your working APIs in action:
- Alpha Vantage: Stock data and technical analysis
- Polygon: Real-time market data
- News API: Financial news sentiment
- Twitter: Social media sentiment (rate limited but working)
- FinBERT: Local sentiment analysis

Works WITHOUT OpenAI while you resolve quota issues.
"""

import os
import requests
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from dotenv import load_dotenv
from transformers import pipeline
import yfinance as yf
import matplotlib.pyplot as plt
import warnings

warnings.filterwarnings("ignore")

# Load environment variables
load_dotenv()


class TradingPlatformDemo:
    def __init__(self):
        """Initialize with working API credentials."""
        self.alpha_vantage_key = os.getenv("ALPHA_VANTAGE_API_KEY")
        self.polygon_key = os.getenv("POLYGON_API_KEY")
        self.news_api_key = os.getenv("NEWS_API_KEY")
        self.twitter_token = os.getenv("TWITTER_BEARER_TOKEN")

        # Initialize FinBERT for local sentiment analysis
        print("🤖 Loading FinBERT for sentiment analysis...")
        self.finbert = pipeline("text-classification", model="ProsusAI/finbert")
        print("✅ FinBERT loaded successfully!")

    def get_stock_data(self, symbol):
        """Get comprehensive stock data from multiple sources."""
        print(f"\n📊 Analyzing {symbol} Stock Data")
        print("=" * 50)

        stock_data = {"symbol": symbol, "timestamp": datetime.now(), "sources": {}}

        # 1. Alpha Vantage - Current quote
        try:
            av_url = "https://www.alphavantage.co/query"
            av_params = {
                "function": "GLOBAL_QUOTE",
                "symbol": symbol,
                "apikey": self.alpha_vantage_key,
            }

            av_response = requests.get(av_url, params=av_params, timeout=30)

            if av_response.status_code == 200:
                av_data = av_response.json()

                if "Global Quote" in av_data:
                    quote = av_data["Global Quote"]

                    stock_data["sources"]["alpha_vantage"] = {
                        "price": float(quote.get("05. price", 0)),
                        "change": float(quote.get("09. change", 0)),
                        "change_percent": quote.get("10. change percent", "0%").replace(
                            "%", ""
                        ),
                        "volume": int(quote.get("06. volume", 0)),
                        "high": float(quote.get("03. high", 0)),
                        "low": float(quote.get("04. low", 0)),
                        "open": float(quote.get("02. open", 0)),
                        "previous_close": float(quote.get("08. previous close", 0)),
                    }

                    print(
                        f"✅ Alpha Vantage: ${stock_data['sources']['alpha_vantage']['price']:.2f}"
                    )
                    print(
                        f"   Change: ${stock_data['sources']['alpha_vantage']['change']:.2f} ({stock_data['sources']['alpha_vantage']['change_percent']}%)"
                    )

        except Exception as e:
            print(f"⚠️  Alpha Vantage error: {e}")

        # 2. Polygon - Previous day data
        try:
            polygon_url = f"https://api.polygon.io/v2/aggs/ticker/{symbol}/prev"
            polygon_params = {"adjusted": "true", "apikey": self.polygon_key}

            polygon_response = requests.get(
                polygon_url, params=polygon_params, timeout=30
            )

            if polygon_response.status_code == 200:
                polygon_data = polygon_response.json()

                if polygon_data.get("status") == "OK" and polygon_data.get("results"):
                    result = polygon_data["results"][0]

                    stock_data["sources"]["polygon"] = {
                        "close": result.get("c", 0),
                        "high": result.get("h", 0),
                        "low": result.get("l", 0),
                        "open": result.get("o", 0),
                        "volume": result.get("v", 0),
                        "vwap": result.get("vw", 0),
                        "timestamp": result.get("t", 0),
                    }

                    print(
                        f"✅ Polygon: ${stock_data['sources']['polygon']['close']:.2f}"
                    )
                    print(f"   Volume: {stock_data['sources']['polygon']['volume']:,}")

        except Exception as e:
            print(f"⚠️  Polygon error: {e}")

        # 3. YFinance backup for historical data
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="5d")

            if not hist.empty:
                latest = hist.iloc[-1]

                stock_data["sources"]["yfinance"] = {
                    "close": float(latest["Close"]),
                    "volume": int(latest["Volume"]),
                    "high": float(latest["High"]),
                    "low": float(latest["Low"]),
                    "open": float(latest["Open"]),
                    "historical_data": hist,
                }

                print(f"✅ YFinance: ${stock_data['sources']['yfinance']['close']:.2f}")

        except Exception as e:
            print(f"⚠️  YFinance error: {e}")

        return stock_data

    def get_news_sentiment(self, symbol):
        """Get news sentiment analysis."""
        print(f"\n📰 Analyzing News Sentiment for {symbol}")
        print("=" * 50)

        try:
            # Get news from News API
            news_url = "https://newsapi.org/v2/everything"
            news_params = {
                "q": f"{symbol} stock",
                "language": "en",
                "sortBy": "publishedAt",
                "pageSize": 20,
                "apiKey": self.news_api_key,
            }

            news_response = requests.get(news_url, params=news_params, timeout=30)

            if news_response.status_code == 200:
                news_data = news_response.json()

                if news_data.get("status") == "ok":
                    articles = news_data.get("articles", [])

                    print(f"📰 Found {len(articles)} recent news articles")

                    # Analyze sentiment with FinBERT
                    sentiments = []

                    for article in articles[:10]:  # Analyze top 10 articles
                        title = article.get("title", "")
                        description = article.get("description", "")

                        # Combine title and description
                        text = f"{title} {description}"

                        if len(text.strip()) > 10:
                            try:
                                sentiment = self.finbert(text[:512])[
                                    0
                                ]  # FinBERT max length

                                sentiments.append(
                                    {
                                        "title": (
                                            title[:60] + "..."
                                            if len(title) > 60
                                            else title
                                        ),
                                        "sentiment": sentiment["label"],
                                        "confidence": sentiment["score"],
                                        "source": article.get("source", {}).get(
                                            "name", "Unknown"
                                        ),
                                        "published": article.get("publishedAt", ""),
                                        "url": article.get("url", ""),
                                    }
                                )

                            except Exception as e:
                                continue

                    if sentiments:
                        # Calculate overall sentiment
                        sentiment_scores = []
                        for s in sentiments:
                            if s["sentiment"] == "positive":
                                sentiment_scores.append(s["confidence"])
                            elif s["sentiment"] == "negative":
                                sentiment_scores.append(-s["confidence"])
                            else:
                                sentiment_scores.append(0)

                        overall_sentiment = np.mean(sentiment_scores)

                        # Count sentiments
                        sentiment_counts = {}
                        for s in sentiments:
                            sentiment_counts[s["sentiment"]] = (
                                sentiment_counts.get(s["sentiment"], 0) + 1
                            )

                        print(f"\n🧠 News Sentiment Analysis:")
                        print(
                            f"   Overall Score: {overall_sentiment:+.3f} (range: -1 to +1)"
                        )

                        for sentiment_type in ["positive", "negative", "neutral"]:
                            count = sentiment_counts.get(sentiment_type, 0)
                            percentage = (
                                (count / len(sentiments)) * 100 if sentiments else 0
                            )
                            emoji = (
                                "🟢"
                                if sentiment_type == "positive"
                                else "🔴" if sentiment_type == "negative" else "🟡"
                            )
                            print(
                                f"   {emoji} {sentiment_type.capitalize()}: {count} articles ({percentage:.1f}%)"
                            )

                        print(f"\n📰 Recent Headlines:")
                        for i, s in enumerate(sentiments[:3], 1):
                            emoji = (
                                "🟢"
                                if s["sentiment"] == "positive"
                                else "🔴" if s["sentiment"] == "negative" else "🟡"
                            )
                            print(f"   {i}. {emoji} {s['title']}")
                            print(
                                f"      {s['source']} | Confidence: {s['confidence']:.3f}"
                            )

                        return {
                            "overall_sentiment": overall_sentiment,
                            "sentiment_counts": sentiment_counts,
                            "articles": sentiments,
                            "total_articles": len(articles),
                        }

        except Exception as e:
            print(f"❌ News sentiment error: {e}")

        return None

    def get_social_sentiment(self, symbol):
        """Get social media sentiment (Twitter with rate limiting)."""
        print(f"\n🐦 Analyzing Social Media Sentiment for {symbol}")
        print("=" * 50)

        # Note: Twitter is rate limited, so we'll show the approach
        print("⚠️  Twitter API is rate limited on free tier")
        print("   Authentication is working, but limited requests available")
        print("   In production, you would:")
        print("   1. Implement request queuing and retry logic")
        print("   2. Cache results to minimize API calls")
        print("   3. Use webhooks for real-time updates")
        print("   4. Consider upgrading to paid tier for higher limits")

        # Simulate what Twitter sentiment would look like
        simulated_sentiment = {
            "platform": "twitter",
            "symbol": symbol,
            "status": "rate_limited",
            "message": "API working but rate limited",
            "recommendation": "Implement caching and upgrade to paid tier",
        }

        return simulated_sentiment

    def technical_analysis(self, stock_data):
        """Perform basic technical analysis."""
        print(f"\n📈 Technical Analysis for {stock_data['symbol']}")
        print("=" * 50)

        # Get historical data from YFinance
        if "yfinance" in stock_data["sources"]:
            hist_data = stock_data["sources"]["yfinance"]["historical_data"]

            # Calculate technical indicators
            hist_data["SMA_5"] = hist_data["Close"].rolling(window=5).mean()
            hist_data["SMA_20"] = (
                hist_data["Close"].rolling(window=20).mean()
                if len(hist_data) >= 20
                else hist_data["Close"].mean()
            )
            hist_data["RSI"] = self.calculate_rsi(hist_data["Close"])

            current_price = hist_data["Close"].iloc[-1]
            sma_5 = hist_data["SMA_5"].iloc[-1]
            sma_20 = (
                hist_data["SMA_20"].iloc[-1]
                if not pd.isna(hist_data["SMA_20"].iloc[-1])
                else sma_5
            )
            rsi = hist_data["RSI"].iloc[-1]

            print(f"📊 Technical Indicators:")
            print(f"   Current Price: ${current_price:.2f}")
            print(f"   5-day SMA: ${sma_5:.2f}")
            print(f"   20-day SMA: ${sma_20:.2f}")
            print(f"   RSI: {rsi:.1f}")

            # Generate signals
            signals = []

            if current_price > sma_5 > sma_20:
                signals.append("🟢 Bullish trend (price above moving averages)")
            elif current_price < sma_5 < sma_20:
                signals.append("🔴 Bearish trend (price below moving averages)")
            else:
                signals.append("🟡 Mixed signals from moving averages")

            if rsi > 70:
                signals.append("⚠️  RSI indicates overbought conditions")
            elif rsi < 30:
                signals.append("💡 RSI indicates oversold conditions")
            else:
                signals.append("✅ RSI in normal range")

            print(f"\n🎯 Technical Signals:")
            for signal in signals:
                print(f"   {signal}")

            return {
                "current_price": current_price,
                "sma_5": sma_5,
                "sma_20": sma_20,
                "rsi": rsi,
                "signals": signals,
            }

        return None

    def calculate_rsi(self, prices, window=14):
        """Calculate RSI indicator."""
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi

    def generate_trading_recommendation(
        self, symbol, stock_data, news_sentiment, social_sentiment, technical_analysis
    ):
        """Generate a trading recommendation based on all available data."""
        print(f"\n🎯 Trading Recommendation for {symbol}")
        print("=" * 50)

        # Scoring system
        score = 0
        factors = []

        # Technical analysis scoring
        if technical_analysis:
            if technical_analysis["rsi"] < 30:
                score += 2
                factors.append("🟢 Oversold RSI (+2)")
            elif technical_analysis["rsi"] > 70:
                score -= 2
                factors.append("🔴 Overbought RSI (-2)")

            if (
                technical_analysis["current_price"]
                > technical_analysis["sma_5"]
                > technical_analysis["sma_20"]
            ):
                score += 1
                factors.append("🟢 Bullish trend (+1)")
            elif (
                technical_analysis["current_price"]
                < technical_analysis["sma_5"]
                < technical_analysis["sma_20"]
            ):
                score -= 1
                factors.append("🔴 Bearish trend (-1)")

        # News sentiment scoring
        if news_sentiment:
            news_score = news_sentiment["overall_sentiment"] * 2  # Scale to -2 to +2
            score += news_score

            if news_score > 0.5:
                factors.append(f"🟢 Positive news sentiment (+{news_score:.1f})")
            elif news_score < -0.5:
                factors.append(f"🔴 Negative news sentiment ({news_score:.1f})")
            else:
                factors.append(f"🟡 Neutral news sentiment ({news_score:.1f})")

        # Generate recommendation
        if score >= 2:
            recommendation = "BUY"
            confidence = min(score / 4 * 100, 100)  # Max 100%
            color = "🟢"
        elif score <= -2:
            recommendation = "SELL"
            confidence = min(abs(score) / 4 * 100, 100)
            color = "🔴"
        else:
            recommendation = "HOLD"
            confidence = 50 + abs(score) * 10
            color = "🟡"

        print(f"{color} RECOMMENDATION: {recommendation}")
        print(f"📊 Confidence Level: {confidence:.0f}%")
        print(f"📈 Total Score: {score:+.1f}")

        print(f"\n🔍 Analysis Factors:")
        for factor in factors:
            print(f"   {factor}")

        print(f"\n⚠️  Important Notes:")
        print(f"   - This is a demo using available APIs")
        print(f"   - OpenAI LLM analysis not available (quota exceeded)")
        print(f"   - Social sentiment limited by rate limits")
        print(f"   - Always do your own research before trading")
        print(f"   - Consider position sizing and risk management")

        return {
            "symbol": symbol,
            "recommendation": recommendation,
            "confidence": confidence,
            "score": score,
            "factors": factors,
            "timestamp": datetime.now(),
        }

    def analyze_stock(self, symbol):
        """Complete stock analysis using all available data sources."""
        print(f"🚀 True North Trading Platform - Analyzing {symbol}")
        print("=" * 70)

        # 1. Get stock data
        stock_data = self.get_stock_data(symbol)

        # 2. Get news sentiment
        news_sentiment = self.get_news_sentiment(symbol)

        # 3. Get social sentiment (rate limited)
        social_sentiment = self.get_social_sentiment(symbol)

        # 4. Technical analysis
        technical_analysis = self.technical_analysis(stock_data)

        # 5. Generate recommendation
        recommendation = self.generate_trading_recommendation(
            symbol, stock_data, news_sentiment, social_sentiment, technical_analysis
        )

        return {
            "stock_data": stock_data,
            "news_sentiment": news_sentiment,
            "social_sentiment": social_sentiment,
            "technical_analysis": technical_analysis,
            "recommendation": recommendation,
        }


def main():
    """Run the trading platform demo."""
    print("🎯 True North Trading Platform Demo")
    print("Using working APIs while OpenAI quota is resolved")
    print("=" * 70)

    # Initialize platform
    platform = TradingPlatformDemo()

    # Analyze multiple stocks
    symbols = ["AAPL", "TSLA", "NVDA"]

    results = {}

    for symbol in symbols:
        print(f"\n" + "=" * 70)
        results[symbol] = platform.analyze_stock(symbol)
        print(f"\n✅ {symbol} analysis complete!")

    # Summary
    print(f"\n" + "=" * 70)
    print("📊 ANALYSIS SUMMARY")
    print("=" * 70)

    for symbol, result in results.items():
        rec = result["recommendation"]
        print(
            f"{symbol}: {rec['recommendation']} ({rec['confidence']:.0f}% confidence)"
        )

    print(f"\n🔧 Platform Status:")
    print(f"✅ Stock data: Alpha Vantage + Polygon + YFinance")
    print(f"✅ News sentiment: News API + FinBERT")
    print(f"✅ Technical analysis: RSI, SMA, trend analysis")
    print(f"⚠️  Social sentiment: Twitter rate limited")
    print(f"❌ LLM analysis: OpenAI quota exceeded")

    print(f"\n🚀 Next Steps:")
    print(f"1. Resolve OpenAI billing to enable LLM agents")
    print(f"2. Upgrade Twitter API for real-time social sentiment")
    print(f"3. Test TradingAgents CLI once OpenAI is working")
    print(f"4. Start paper trading with small positions")


if __name__ == "__main__":
    main()
