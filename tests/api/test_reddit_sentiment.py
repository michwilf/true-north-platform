#!/usr/bin/env python3
"""
Reddit Sentiment Analysis for True North Trading Platform

This script demonstrates how to get social sentiment from Reddit without API keys
using web scraping. This is a backup for Twitter API issues.
"""

import requests
import json
import pandas as pd
from datetime import datetime
import time
from transformers import pipeline


def get_reddit_posts(subreddit, query, limit=25):
    """Get Reddit posts using the JSON API (no authentication required)."""
    print(f"🔍 Searching r/{subreddit} for '{query}'...")

    # Reddit's JSON API endpoint
    url = f"https://www.reddit.com/r/{subreddit}/search.json"

    params = {
        "q": query,
        "sort": "hot",
        "limit": limit,
        "restrict_sr": "on",
        "t": "day",  # Last 24 hours
    }

    headers = {"User-Agent": "TrueNorthTrading/1.0 (Educational/Research)"}

    try:
        response = requests.get(url, params=params, headers=headers)

        if response.status_code == 200:
            data = response.json()
            posts = []

            for post in data["data"]["children"]:
                post_data = post["data"]

                posts.append(
                    {
                        "title": post_data["title"],
                        "selftext": post_data.get("selftext", ""),
                        "score": post_data["score"],
                        "num_comments": post_data["num_comments"],
                        "created_utc": post_data["created_utc"],
                        "author": post_data["author"],
                        "url": f"https://reddit.com{post_data['permalink']}",
                        "subreddit": post_data["subreddit"],
                    }
                )

            print(f"✅ Found {len(posts)} posts in r/{subreddit}")
            return posts

        else:
            print(f"❌ Error: {response.status_code}")
            return []

    except Exception as e:
        print(f"❌ Error fetching Reddit data: {e}")
        return []


def analyze_reddit_sentiment(posts, finbert_model=None):
    """Analyze sentiment of Reddit posts using FinBERT."""
    print(f"\n🧠 Analyzing sentiment for {len(posts)} Reddit posts...")

    if finbert_model is None:
        print("Loading FinBERT model...")
        finbert_model = pipeline("text-classification", model="ProsusAI/finbert")

    results = []

    for post in posts:
        # Combine title and text for analysis
        text = f"{post['title']} {post['selftext']}"

        # Limit text length for FinBERT
        if len(text) > 512:
            text = text[:512]

        if len(text.strip()) > 10:  # Only analyze substantial content
            try:
                sentiment = finbert_model(text)[0]

                # Calculate influence score based on Reddit metrics
                influence_score = (
                    post["score"] * 0.6  # Upvotes
                    + post["num_comments"] * 0.4  # Engagement
                )

                results.append(
                    {
                        "title": (
                            post["title"][:60] + "..."
                            if len(post["title"]) > 60
                            else post["title"]
                        ),
                        "sentiment": sentiment["label"],
                        "confidence": sentiment["score"],
                        "score": post["score"],
                        "comments": post["num_comments"],
                        "influence": influence_score,
                        "author": post["author"],
                        "subreddit": post["subreddit"],
                        "url": post["url"],
                    }
                )

            except Exception as e:
                print(f"⚠️  Error analyzing post: {e}")
                continue

    return results


def get_stock_sentiment_from_reddit(symbol):
    """Get comprehensive sentiment analysis for a stock from multiple subreddits."""
    print(f"\n📊 Getting Reddit sentiment for ${symbol}")
    print("=" * 60)

    # Key financial subreddits
    subreddits = [
        "stocks",
        "investing",
        "SecurityAnalysis",
        "ValueInvesting",
        "StockMarket",
        "wallstreetbets",  # High volume, high volatility sentiment
    ]

    all_posts = []

    for subreddit in subreddits:
        posts = get_reddit_posts(subreddit, symbol, limit=10)
        all_posts.extend(posts)
        time.sleep(1)  # Be respectful to Reddit's servers

    if not all_posts:
        print("❌ No Reddit posts found")
        return None

    # Load FinBERT once
    print("\n🤖 Loading FinBERT for sentiment analysis...")
    finbert = pipeline("text-classification", model="ProsusAI/finbert")

    # Analyze sentiment
    sentiment_results = analyze_reddit_sentiment(all_posts, finbert)

    if not sentiment_results:
        print("❌ No sentiment analysis results")
        return None

    # Create DataFrame for analysis
    df = pd.DataFrame(sentiment_results)

    # Calculate weighted sentiment score
    total_influence = df["influence"].sum()

    if total_influence > 0:
        weighted_sentiment = (
            sum(
                row["confidence"]
                * row["influence"]
                * (
                    1
                    if row["sentiment"] == "positive"
                    else -1 if row["sentiment"] == "negative" else 0
                )
                for _, row in df.iterrows()
            )
            / total_influence
        )
    else:
        weighted_sentiment = 0

    # Print analysis
    print(f"\n📈 Reddit Sentiment Analysis for ${symbol}")
    print("=" * 50)

    sentiment_counts = df["sentiment"].value_counts()
    total_posts = len(df)

    for sentiment in ["positive", "negative", "neutral"]:
        count = sentiment_counts.get(sentiment, 0)
        percentage = (count / total_posts) * 100 if total_posts > 0 else 0
        avg_confidence = (
            df[df["sentiment"] == sentiment]["confidence"].mean() if count > 0 else 0
        )

        emoji = (
            "🟢"
            if sentiment == "positive"
            else "🔴" if sentiment == "negative" else "🟡"
        )
        print(
            f"{emoji} {sentiment.capitalize():8}: {count:2d} posts ({percentage:4.1f}%) | Avg confidence: {avg_confidence:.3f}"
        )

    print(f"\n🎯 Weighted Sentiment Score: {weighted_sentiment:+.3f}")
    print(f"   Range: -1.0 (very negative) to +1.0 (very positive)")

    # Show top influential posts
    print(f"\n🔥 Most Influential Posts:")
    top_posts = df.nlargest(3, "influence")

    for _, post in top_posts.iterrows():
        emoji = (
            "🟢"
            if post["sentiment"] == "positive"
            else "🔴" if post["sentiment"] == "negative" else "🟡"
        )
        print(
            f"{emoji} r/{post['subreddit']} | {post['score']} ⬆️ {post['comments']} 💬"
        )
        print(f"   {post['title']}")
        print(f"   Sentiment: {post['sentiment']} ({post['confidence']:.3f})")
        print()

    return {
        "symbol": symbol,
        "weighted_sentiment": weighted_sentiment,
        "total_posts": total_posts,
        "sentiment_distribution": sentiment_counts.to_dict(),
        "top_posts": top_posts.to_dict("records"),
        "all_results": df.to_dict("records"),
    }


def compare_multiple_stocks():
    """Compare sentiment across multiple stocks."""
    print(f"\n🏆 Multi-Stock Sentiment Comparison")
    print("=" * 60)

    stocks = ["AAPL", "TSLA", "NVDA", "MSFT"]
    results = {}

    for stock in stocks:
        result = get_stock_sentiment_from_reddit(stock)
        if result:
            results[stock] = result
        print()  # Spacing between stocks

    # Summary comparison
    if results:
        print(f"\n📊 Sentiment Comparison Summary")
        print("=" * 40)

        comparison_data = []
        for symbol, data in results.items():
            comparison_data.append(
                {
                    "Symbol": symbol,
                    "Sentiment Score": data["weighted_sentiment"],
                    "Total Posts": data["total_posts"],
                    "Positive %": (
                        data["sentiment_distribution"].get("positive", 0)
                        / data["total_posts"]
                    )
                    * 100,
                    "Negative %": (
                        data["sentiment_distribution"].get("negative", 0)
                        / data["total_posts"]
                    )
                    * 100,
                }
            )

        df_comparison = pd.DataFrame(comparison_data)
        df_comparison = df_comparison.sort_values("Sentiment Score", ascending=False)

        print(df_comparison.to_string(index=False, float_format="%.2f"))

        return df_comparison

    return None


def integration_example():
    """Show how Reddit sentiment integrates with TradingAgents."""
    print(f"\n🔧 Integration with TradingAgents")
    print("=" * 50)

    code_example = '''
# Enhanced Social Media Analyst with Reddit Backup

class SocialMediaAnalyst:
    def __init__(self, llm, twitter_token=None):
        self.llm = llm
        self.twitter_token = twitter_token
        self.finbert = pipeline("text-classification", model="ProsusAI/finbert")
    
    def get_social_sentiment(self, ticker):
        """Get social sentiment from Twitter (primary) and Reddit (backup)."""
        
        sentiment_data = {
            'twitter': None,
            'reddit': None,
            'combined_score': 0,
            'confidence': 'low'
        }
        
        # Try Twitter first (if token available)
        if self.twitter_token:
            try:
                twitter_sentiment = self.get_twitter_sentiment(ticker)
                sentiment_data['twitter'] = twitter_sentiment
            except Exception as e:
                print(f"Twitter API failed: {e}")
        
        # Always get Reddit sentiment (no API key needed)
        try:
            reddit_sentiment = self.get_reddit_sentiment(ticker)
            sentiment_data['reddit'] = reddit_sentiment
        except Exception as e:
            print(f"Reddit scraping failed: {e}")
        
        # Combine sentiments with weighting
        scores = []
        weights = []
        
        if sentiment_data['twitter']:
            scores.append(sentiment_data['twitter']['weighted_sentiment'])
            weights.append(0.6)  # Twitter gets higher weight (real-time)
        
        if sentiment_data['reddit']:
            scores.append(sentiment_data['reddit']['weighted_sentiment'])
            weights.append(0.4 if sentiment_data['twitter'] else 1.0)
        
        if scores:
            sentiment_data['combined_score'] = sum(s * w for s, w in zip(scores, weights)) / sum(weights)
            sentiment_data['confidence'] = 'high' if len(scores) > 1 else 'medium'
        
        # Generate LLM analysis
        analysis_prompt = f"""
        Social Media Sentiment Analysis for ${ticker}:
        
        Twitter: {"Available" if sentiment_data['twitter'] else "Unavailable"}
        Reddit: {sentiment_data['reddit']['total_posts'] if sentiment_data['reddit'] else 0} posts analyzed
        
        Combined Sentiment Score: {sentiment_data['combined_score']:.3f}
        Confidence Level: {sentiment_data['confidence']}
        
        Key Insights:
        - Reddit shows {sentiment_data['reddit']['sentiment_distribution'] if sentiment_data['reddit'] else 'no data'}
        - Most influential discussions focus on: [key themes from top posts]
        
        Provide trading implications and risk assessment.
        """
        
        llm_analysis = self.llm.invoke(analysis_prompt)
        sentiment_data['llm_analysis'] = llm_analysis.content
        
        return sentiment_data
    '''

    print("📝 Integration Code:")
    print(code_example)

    print("\n🎯 Key Benefits:")
    print("1. Reddit requires no API keys - always available")
    print("2. Reddit has high-quality financial discussions")
    print("3. Multiple subreddits provide diverse perspectives")
    print("4. FinBERT provides accurate financial sentiment")
    print("5. Influence weighting by upvotes and comments")
    print("6. Fallback when Twitter API has issues")


def main():
    """Main function to demonstrate Reddit sentiment analysis."""
    print("🚀 Reddit Sentiment Analysis for True North Trading")
    print("=" * 70)

    print("This demonstrates social media sentiment analysis without Twitter API keys")
    print("Perfect backup for when Twitter API has authentication issues!")

    # Test single stock
    result = get_stock_sentiment_from_reddit("AAPL")

    # Compare multiple stocks
    comparison = compare_multiple_stocks()

    # Show integration example
    integration_example()

    print(f"\n🎉 Reddit Sentiment Analysis Complete!")
    print("=" * 70)
    print("✅ No API keys required")
    print("✅ Real financial discussions from multiple subreddits")
    print("✅ FinBERT sentiment analysis")
    print("✅ Influence-weighted scoring")
    print("✅ Ready for TradingAgents integration")

    print(f"\n🔧 Next Steps:")
    print("1. Fix Twitter API authentication for primary social data")
    print("2. Use Reddit as reliable backup sentiment source")
    print("3. Integrate both into your Social Media Analyst agent")
    print("4. Set up automated daily sentiment monitoring")


if __name__ == "__main__":
    main()
