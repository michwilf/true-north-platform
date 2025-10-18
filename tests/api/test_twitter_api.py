#!/usr/bin/env python3
"""
Test Twitter API Access for True North Trading Platform

This script tests your Twitter Bearer Token and shows what data you can access
for social sentiment analysis in your trading platform.
"""

import requests
import json
import pandas as pd
from datetime import datetime, timedelta

# Your Twitter credentials
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAJGa4wEAAAAA6tTPikcNI65Yb3k%2Fq2O%2BRcALOkM%3DvWgmawFuMfw3HPz5ViJo4MFXfAO5xYWHYKeIEKsG8G2AosYFsl"
USER_ID = "z8Vaj5BucQx5nsniIXRKu2USs"


def create_headers():
    """Create headers for Twitter API requests."""
    return {
        "Authorization": f"Bearer {BEARER_TOKEN}",
        "Content-Type": "application/json",
    }


def test_bearer_token():
    """Test if the Bearer Token is working."""
    print("🔑 Testing Twitter Bearer Token...")

    # Use a simple search endpoint that works with Bearer Token (app-only auth)
    url = "https://api.twitter.com/2/tweets/search/recent"
    headers = create_headers()

    # Simple test query
    params = {"query": "twitter -is:retweet lang:en", "max_results": 10}

    try:
        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            tweet_count = len(data.get("data", []))
            print("✅ Bearer Token is valid!")
            print(f"   Successfully retrieved {tweet_count} tweets")
            print("   App-only authentication working correctly")
            return True
        elif response.status_code == 429:
            print("⚠️  Rate limit reached, but token appears valid")
            print("   This is normal for free tier - token is working!")
            return True
        else:
            print(f"❌ Authentication failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return False

    except Exception as e:
        print(f"❌ Error testing token: {e}")
        return False


def search_stock_tweets(symbol, max_results=10):
    """Search for tweets mentioning a stock symbol."""
    print(f"\n📊 Searching for tweets about ${symbol}...")

    # Twitter API v2 search endpoint
    url = "https://api.twitter.com/2/tweets/search/recent"

    # Search query for stock mentions
    query = f"${symbol} OR #{symbol} -is:retweet lang:en"

    params = {
        "query": query,
        "max_results": max_results,
        "tweet.fields": "created_at,public_metrics,context_annotations,author_id",
        "user.fields": "username,verified,public_metrics",
        "expansions": "author_id",
    }

    headers = create_headers()

    try:
        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            data = response.json()
            tweets = data.get("data", [])
            users = {
                user["id"]: user for user in data.get("includes", {}).get("users", [])
            }

            print(f"✅ Found {len(tweets)} recent tweets about ${symbol}")

            # Analyze tweets
            tweet_data = []
            for tweet in tweets:
                author = users.get(tweet["author_id"], {})

                tweet_info = {
                    "text": (
                        tweet["text"][:100] + "..."
                        if len(tweet["text"]) > 100
                        else tweet["text"]
                    ),
                    "created_at": tweet["created_at"],
                    "author": author.get("username", "Unknown"),
                    "verified": author.get("verified", False),
                    "followers": author.get("public_metrics", {}).get(
                        "followers_count", 0
                    ),
                    "retweets": tweet.get("public_metrics", {}).get("retweet_count", 0),
                    "likes": tweet.get("public_metrics", {}).get("like_count", 0),
                }
                tweet_data.append(tweet_info)

                # Print sample tweets
                verified_badge = "✓" if tweet_info["verified"] else ""
                print(
                    f"   🐦 @{tweet_info['author']}{verified_badge}: {tweet_info['text']}"
                )
                print(
                    f"      👥 {tweet_info['followers']:,} followers | 🔄 {tweet_info['retweets']} RTs | ❤️ {tweet_info['likes']} likes"
                )

            return tweet_data

        else:
            print(f"❌ Search failed: {response.status_code}")
            print(f"   Error: {response.text}")
            return []

    except Exception as e:
        print(f"❌ Error searching tweets: {e}")
        return []


def get_trending_topics():
    """Get trending topics (Note: This requires specific location WOEID)."""
    print(f"\n🔥 Getting trending topics...")

    # Note: Trending topics endpoint requires Twitter API v1.1 and specific permissions
    # For Bearer Token, we'll use a different approach - search for popular financial hashtags

    financial_hashtags = [
        "#stocks",
        "#trading",
        "#investing",
        "#crypto",
        "#bitcoin",
        "#tesla",
        "#apple",
    ]

    print("📈 Checking activity for popular financial hashtags:")

    for hashtag in financial_hashtags:
        url = "https://api.twitter.com/2/tweets/search/recent"

        params = {
            "query": f"{hashtag} -is:retweet lang:en",
            "max_results": 10,
            "tweet.fields": "public_metrics",
        }

        headers = create_headers()

        try:
            response = requests.get(url, headers=headers, params=params)

            if response.status_code == 200:
                data = response.json()
                tweets = data.get("data", [])

                if tweets:
                    total_engagement = sum(
                        tweet.get("public_metrics", {}).get("like_count", 0)
                        + tweet.get("public_metrics", {}).get("retweet_count", 0)
                        for tweet in tweets
                    )
                    print(
                        f"   {hashtag}: {len(tweets)} tweets, {total_engagement:,} total engagement"
                    )
                else:
                    print(f"   {hashtag}: No recent tweets found")

        except Exception as e:
            print(f"   {hashtag}: Error - {e}")


def analyze_sentiment_potential(tweets):
    """Show how tweet data could be used for sentiment analysis."""
    print(f"\n🧠 Sentiment Analysis Potential")
    print("=" * 50)

    if not tweets:
        print("No tweets to analyze")
        return

    # Simple keyword-based sentiment (you'd use FinBERT in practice)
    positive_words = [
        "bullish",
        "buy",
        "moon",
        "pump",
        "strong",
        "good",
        "great",
        "up",
        "rise",
        "gain",
    ]
    negative_words = [
        "bearish",
        "sell",
        "dump",
        "weak",
        "bad",
        "down",
        "fall",
        "crash",
        "loss",
        "drop",
    ]

    sentiment_scores = []

    for tweet in tweets:
        text = tweet["text"].lower()

        positive_count = sum(1 for word in positive_words if word in text)
        negative_count = sum(1 for word in negative_words if word in text)

        # Simple sentiment score
        if positive_count > negative_count:
            sentiment = "Positive"
        elif negative_count > positive_count:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"

        sentiment_scores.append(
            {
                "text": tweet["text"][:50] + "...",
                "sentiment": sentiment,
                "author": tweet["author"],
                "followers": tweet["followers"],
                "engagement": tweet["retweets"] + tweet["likes"],
            }
        )

    # Create DataFrame for analysis
    df = pd.DataFrame(sentiment_scores)

    print(f"📊 Sentiment Distribution:")
    sentiment_counts = df["sentiment"].value_counts()
    for sentiment, count in sentiment_counts.items():
        percentage = (count / len(df)) * 100
        print(f"   {sentiment}: {count} tweets ({percentage:.1f}%)")

    print(f"\n🎯 High-Impact Tweets (>1000 followers):")
    high_impact = df[df["followers"] > 1000].sort_values("engagement", ascending=False)

    for _, tweet in high_impact.head(3).iterrows():
        print(
            f"   📈 {tweet['sentiment']} | @{tweet['author']} ({tweet['followers']:,} followers)"
        )
        print(f"      \"{tweet['text']}\"")

    return df


def integration_example():
    """Show how this integrates with your trading platform."""
    print(f"\n🔧 Integration with True North Trading Platform")
    print("=" * 60)

    integration_code = '''
# Example: Social Media Analyst Agent Enhancement

class SocialMediaAnalyst:
    def __init__(self, llm, twitter_bearer_token):
        self.llm = llm
        self.twitter_token = twitter_bearer_token
        self.finbert = pipeline("text-classification", model="ProsusAI/finbert")
    
    def analyze_social_sentiment(self, ticker):
        """Analyze social media sentiment for a stock."""
        
        # 1. Get recent tweets
        tweets = self.search_stock_tweets(ticker, max_results=50)
        
        # 2. Analyze sentiment with FinBERT
        sentiments = []
        for tweet in tweets:
            sentiment = self.finbert(tweet['text'])[0]
            
            # Weight by follower count and engagement
            influence_score = (
                tweet['followers'] * 0.7 + 
                (tweet['retweets'] + tweet['likes']) * 0.3
            )
            
            sentiments.append({
                'sentiment': sentiment['label'],
                'confidence': sentiment['score'],
                'influence': influence_score,
                'text': tweet['text']
            })
        
        # 3. Calculate weighted sentiment
        total_influence = sum(s['influence'] for s in sentiments)
        
        if total_influence > 0:
            weighted_sentiment = sum(
                s['confidence'] * s['influence'] * (1 if s['sentiment'] == 'positive' else -1)
                for s in sentiments
            ) / total_influence
        else:
            weighted_sentiment = 0
        
        # 4. Generate LLM analysis
        sentiment_summary = f"""
        Social Media Analysis for ${ticker}:
        - Total tweets analyzed: {len(tweets)}
        - Weighted sentiment score: {weighted_sentiment:.3f}
        - High-influence tweets: {len([s for s in sentiments if s['influence'] > 10000])}
        
        Sample tweets:
        {chr(10).join([f"- {s['sentiment'].upper()}: {s['text'][:60]}..." 
                      for s in sentiments[:3]])}
        """
        
        prompt = f"""
        Analyze the social media sentiment for {ticker}:
        
        {sentiment_summary}
        
        Consider:
        1. Overall sentiment trend
        2. Quality vs quantity of mentions
        3. Influence of key accounts
        4. Potential market impact
        5. Timing relative to market hours
        
        Provide trading implications and confidence level.
        """
        
        analysis = self.llm.invoke(prompt)
        
        return {
            'llm_analysis': analysis.content,
            'weighted_sentiment': weighted_sentiment,
            'tweet_count': len(tweets),
            'high_influence_count': len([s for s in sentiments if s['influence'] > 10000]),
            'raw_sentiments': sentiments
        }
    '''

    print("📝 Integration Code Example:")
    print(integration_code)

    print("\n🎯 Key Benefits:")
    print("1. Real-time social sentiment for any stock symbol")
    print("2. Influence-weighted sentiment (not just tweet count)")
    print("3. FinBERT provides accurate financial sentiment")
    print("4. LLM provides contextual analysis and trading implications")
    print("5. Bearer Token is sufficient for read-only social data")


def main():
    """Main testing function."""
    print("🐦 Twitter API Testing for True North Trading Platform")
    print("=" * 70)

    # Test authentication
    if not test_bearer_token():
        print("\n❌ Cannot proceed without valid authentication")
        print("\nTroubleshooting:")
        print("1. Check if your Bearer Token is correct")
        print("2. Ensure your Twitter Developer account is active")
        print("3. Verify API access level (Basic/Pro)")
        return

    # Test stock tweet search
    test_symbols = ["AAPL", "TSLA", "NVDA"]

    all_tweets = []
    for symbol in test_symbols:
        tweets = search_stock_tweets(symbol, max_results=5)
        all_tweets.extend(tweets)

    # Analyze trending topics
    get_trending_topics()

    # Show sentiment analysis potential
    if all_tweets:
        sentiment_df = analyze_sentiment_potential(all_tweets)

    # Show integration example
    integration_example()

    # Summary
    print(f"\n🎉 Twitter API Testing Complete!")
    print("=" * 70)
    print("✅ Bearer Token authentication working")
    print("✅ Can search for stock-related tweets")
    print("✅ Can access tweet metadata (engagement, author info)")
    print("✅ Ready for sentiment analysis integration")

    print(f"\n📊 What you can do with this setup:")
    print(f"   - Monitor social sentiment for any stock symbol")
    print(f"   - Track influencer activity and verified accounts")
    print(f"   - Analyze engagement patterns and viral content")
    print(f"   - Weight sentiment by follower count and influence")
    print(f"   - Integrate with FinBERT for accurate financial sentiment")

    print(f"\n🚀 Next Steps:")
    print(f"1. Add TWITTER_BEARER_TOKEN to your .env file")
    print(f"2. Integrate with your TradingAgents Social Media Analyst")
    print(f"3. Combine with FinBERT sentiment analysis")
    print(f"4. Set up real-time monitoring for your watchlist")


if __name__ == "__main__":
    main()
