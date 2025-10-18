#!/usr/bin/env python3
"""
Comprehensive API Testing for True North Trading Platform

Tests all configured APIs to ensure they're working properly:
- OpenAI (for LLM agents)
- Alpha Vantage (for stock data)
- Twitter (for social sentiment)
- Reddit (for social sentiment)
- Polygon (for real-time data)
- News API (for news sentiment)
"""

import os
import requests
import json
from datetime import datetime
import pandas as pd
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class APITester:
    def __init__(self):
        """Initialize with API credentials from environment."""
        self.results = {}

        # Load API keys
        self.openai_key = os.getenv("OPENAI_API_KEY")
        self.alpha_vantage_key = os.getenv("ALPHA_VANTAGE_API_KEY")
        self.twitter_token = os.getenv("TWITTER_BEARER_TOKEN")
        self.reddit_client_id = os.getenv("REDDIT_CLIENT_ID")
        self.reddit_client_secret = os.getenv("REDDIT_CLIENT_SECRET")
        self.reddit_user_agent = os.getenv("REDDIT_USER_AGENT")
        self.polygon_key = os.getenv("POLYGON_API_KEY")
        self.news_api_key = os.getenv("NEWS_API_KEY")

    def test_openai_api(self):
        """Test OpenAI API for LLM functionality."""
        print("\n🤖 Testing OpenAI API...")
        print("=" * 50)

        if not self.openai_key or self.openai_key == "your_openai_key_here":
            print("❌ OpenAI API key not configured")
            self.results["openai"] = {"status": "failed", "reason": "No API key"}
            return False

        try:
            headers = {
                "Authorization": f"Bearer {self.openai_key}",
                "Content-Type": "application/json",
            }

            # Test with a simple completion
            data = {
                "model": "gpt-4o-mini",
                "messages": [
                    {"role": "user", "content": "Analyze AAPL stock in one sentence."}
                ],
                "max_tokens": 50,
            }

            response = requests.post(
                "https://api.openai.com/v1/chat/completions",
                headers=headers,
                json=data,
                timeout=30,
            )

            if response.status_code == 200:
                result = response.json()
                analysis = result["choices"][0]["message"]["content"]
                print("✅ OpenAI API working!")
                print(f"   Model: gpt-4o-mini")
                print(f"   Sample analysis: {analysis[:60]}...")
                self.results["openai"] = {"status": "success", "model": "gpt-4o-mini"}
                return True
            else:
                print(f"❌ OpenAI API failed: {response.status_code}")
                print(f"   Error: {response.text}")
                self.results["openai"] = {
                    "status": "failed",
                    "reason": f"HTTP {response.status_code}",
                }
                return False

        except Exception as e:
            print(f"❌ OpenAI API error: {e}")
            self.results["openai"] = {"status": "failed", "reason": str(e)}
            return False

    def test_alpha_vantage_api(self):
        """Test Alpha Vantage API for stock data."""
        print("\n📈 Testing Alpha Vantage API...")
        print("=" * 50)

        if (
            not self.alpha_vantage_key
            or self.alpha_vantage_key == "your_alpha_vantage_key_here"
        ):
            print("❌ Alpha Vantage API key not configured")
            self.results["alpha_vantage"] = {"status": "failed", "reason": "No API key"}
            return False

        try:
            # Test with stock quote
            url = "https://www.alphavantage.co/query"
            params = {
                "function": "GLOBAL_QUOTE",
                "symbol": "AAPL",
                "apikey": self.alpha_vantage_key,
            }

            response = requests.get(url, params=params, timeout=30)

            if response.status_code == 200:
                data = response.json()

                if "Global Quote" in data:
                    quote = data["Global Quote"]
                    price = quote.get("05. price", "N/A")
                    change = quote.get("09. change", "N/A")

                    print("✅ Alpha Vantage API working!")
                    print(f"   AAPL Price: ${price}")
                    print(f"   Change: ${change}")
                    self.results["alpha_vantage"] = {
                        "status": "success",
                        "price": price,
                    }
                    return True
                elif "Note" in data:
                    print("⚠️  Alpha Vantage rate limit reached (normal for free tier)")
                    print("   API key is valid but hitting rate limits")
                    self.results["alpha_vantage"] = {
                        "status": "rate_limited",
                        "reason": "Free tier limits",
                    }
                    return True
                else:
                    print(f"❌ Unexpected Alpha Vantage response: {data}")
                    self.results["alpha_vantage"] = {
                        "status": "failed",
                        "reason": "Unexpected response",
                    }
                    return False
            else:
                print(f"❌ Alpha Vantage API failed: {response.status_code}")
                self.results["alpha_vantage"] = {
                    "status": "failed",
                    "reason": f"HTTP {response.status_code}",
                }
                return False

        except Exception as e:
            print(f"❌ Alpha Vantage API error: {e}")
            self.results["alpha_vantage"] = {"status": "failed", "reason": str(e)}
            return False

    def test_twitter_api(self):
        """Test Twitter API for social sentiment."""
        print("\n🐦 Testing Twitter API...")
        print("=" * 50)

        if not self.twitter_token:
            print("❌ Twitter Bearer Token not configured")
            self.results["twitter"] = {"status": "failed", "reason": "No Bearer Token"}
            return False

        try:
            headers = {
                "Authorization": f"Bearer {self.twitter_token}",
                "Content-Type": "application/json",
            }

            # Test with simple search
            url = "https://api.twitter.com/2/tweets/search/recent"
            params = {
                "query": "AAPL -is:retweet lang:en",
                "max_results": 10,
                "tweet.fields": "public_metrics",
            }

            response = requests.get(url, headers=headers, params=params, timeout=30)

            if response.status_code == 200:
                data = response.json()
                tweet_count = len(data.get("data", []))
                print("✅ Twitter API working!")
                print(f"   Retrieved {tweet_count} tweets about AAPL")
                print("   Ready for sentiment analysis")
                self.results["twitter"] = {
                    "status": "success",
                    "tweets_found": tweet_count,
                }
                return True
            elif response.status_code == 429:
                print("⚠️  Twitter rate limit reached (normal for free tier)")
                print("   API authentication is working")
                self.results["twitter"] = {
                    "status": "rate_limited",
                    "reason": "Free tier limits",
                }
                return True
            else:
                print(f"❌ Twitter API failed: {response.status_code}")
                print(f"   Error: {response.text}")
                self.results["twitter"] = {
                    "status": "failed",
                    "reason": f"HTTP {response.status_code}",
                }
                return False

        except Exception as e:
            print(f"❌ Twitter API error: {e}")
            self.results["twitter"] = {"status": "failed", "reason": str(e)}
            return False

    def test_reddit_api(self):
        """Test Reddit API for social sentiment."""
        print("\n🔴 Testing Reddit API...")
        print("=" * 50)

        if not all(
            [self.reddit_client_id, self.reddit_client_secret, self.reddit_user_agent]
        ):
            print("❌ Reddit API credentials not configured")
            self.results["reddit"] = {
                "status": "failed",
                "reason": "Missing credentials",
            }
            return False

        try:
            # Get OAuth token
            auth_url = "https://www.reddit.com/api/v1/access_token"
            auth_data = {"grant_type": "client_credentials"}
            auth_headers = {"User-Agent": self.reddit_user_agent}

            auth_response = requests.post(
                auth_url,
                data=auth_data,
                headers=auth_headers,
                auth=(self.reddit_client_id, self.reddit_client_secret),
                timeout=30,
            )

            if auth_response.status_code == 200:
                token_data = auth_response.json()
                access_token = token_data["access_token"]

                # Test API call
                api_headers = {
                    "Authorization": f"Bearer {access_token}",
                    "User-Agent": self.reddit_user_agent,
                }

                # Search for AAPL posts
                search_url = "https://oauth.reddit.com/r/stocks/search"
                search_params = {
                    "q": "AAPL",
                    "restrict_sr": "on",
                    "sort": "hot",
                    "limit": 5,
                }

                search_response = requests.get(
                    search_url, headers=api_headers, params=search_params, timeout=30
                )

                if search_response.status_code == 200:
                    search_data = search_response.json()
                    posts = search_data.get("data", {}).get("children", [])

                    print("✅ Reddit API working!")
                    print(f"   Found {len(posts)} posts about AAPL in r/stocks")
                    print("   OAuth authentication successful")
                    self.results["reddit"] = {
                        "status": "success",
                        "posts_found": len(posts),
                    }
                    return True
                else:
                    print(f"❌ Reddit search failed: {search_response.status_code}")
                    self.results["reddit"] = {
                        "status": "failed",
                        "reason": "Search failed",
                    }
                    return False
            else:
                print(f"❌ Reddit OAuth failed: {auth_response.status_code}")
                print(f"   Error: {auth_response.text}")
                self.results["reddit"] = {"status": "failed", "reason": "OAuth failed"}
                return False

        except Exception as e:
            print(f"❌ Reddit API error: {e}")
            self.results["reddit"] = {"status": "failed", "reason": str(e)}
            return False

    def test_polygon_api(self):
        """Test Polygon API for real-time data."""
        print("\n📊 Testing Polygon API...")
        print("=" * 50)

        if not self.polygon_key or self.polygon_key == "your_polygon_key_here":
            print("❌ Polygon API key not configured")
            self.results["polygon"] = {"status": "failed", "reason": "No API key"}
            return False

        try:
            # Test with stock quote
            url = f"https://api.polygon.io/v2/aggs/ticker/AAPL/prev"
            params = {"adjusted": "true", "apikey": self.polygon_key}

            response = requests.get(url, params=params, timeout=30)

            if response.status_code == 200:
                data = response.json()

                if data.get("status") == "OK" and data.get("results"):
                    result = data["results"][0]
                    close_price = result.get("c", "N/A")
                    volume = result.get("v", "N/A")

                    print("✅ Polygon API working!")
                    print(f"   AAPL Previous Close: ${close_price}")
                    print(f"   Volume: {volume:,}")
                    self.results["polygon"] = {
                        "status": "success",
                        "price": close_price,
                    }
                    return True
                else:
                    print(f"❌ Polygon API returned error: {data}")
                    self.results["polygon"] = {
                        "status": "failed",
                        "reason": "API error response",
                    }
                    return False
            elif response.status_code == 401:
                print("❌ Polygon API authentication failed")
                print("   Check your API key")
                self.results["polygon"] = {
                    "status": "failed",
                    "reason": "Authentication failed",
                }
                return False
            elif response.status_code == 429:
                print("⚠️  Polygon rate limit reached")
                print("   API key is valid but hitting rate limits")
                self.results["polygon"] = {
                    "status": "rate_limited",
                    "reason": "Rate limits",
                }
                return True
            else:
                print(f"❌ Polygon API failed: {response.status_code}")
                self.results["polygon"] = {
                    "status": "failed",
                    "reason": f"HTTP {response.status_code}",
                }
                return False

        except Exception as e:
            print(f"❌ Polygon API error: {e}")
            self.results["polygon"] = {"status": "failed", "reason": str(e)}
            return False

    def test_news_api(self):
        """Test News API for news sentiment."""
        print("\n📰 Testing News API...")
        print("=" * 50)

        if not self.news_api_key or self.news_api_key == "your_news_api_key_here":
            print("❌ News API key not configured")
            self.results["news_api"] = {"status": "failed", "reason": "No API key"}
            return False

        try:
            # Test with everything endpoint
            url = "https://newsapi.org/v2/everything"
            params = {
                "q": "Apple stock AAPL",
                "language": "en",
                "sortBy": "publishedAt",
                "pageSize": 5,
                "apiKey": self.news_api_key,
            }

            response = requests.get(url, params=params, timeout=30)

            if response.status_code == 200:
                data = response.json()

                if data.get("status") == "ok":
                    articles = data.get("articles", [])
                    total_results = data.get("totalResults", 0)

                    print("✅ News API working!")
                    print(f"   Found {total_results} articles about Apple")
                    print(f"   Retrieved {len(articles)} recent articles")

                    if articles:
                        print(f"   Latest: {articles[0]['title'][:60]}...")

                    self.results["news_api"] = {
                        "status": "success",
                        "articles_found": len(articles),
                    }
                    return True
                else:
                    print(f"❌ News API error: {data}")
                    self.results["news_api"] = {
                        "status": "failed",
                        "reason": "API error response",
                    }
                    return False
            elif response.status_code == 401:
                print("❌ News API authentication failed")
                print("   Check your API key")
                self.results["news_api"] = {
                    "status": "failed",
                    "reason": "Authentication failed",
                }
                return False
            elif response.status_code == 429:
                print("⚠️  News API rate limit reached")
                print("   API key is valid but hitting rate limits")
                self.results["news_api"] = {
                    "status": "rate_limited",
                    "reason": "Rate limits",
                }
                return True
            else:
                print(f"❌ News API failed: {response.status_code}")
                self.results["news_api"] = {
                    "status": "failed",
                    "reason": f"HTTP {response.status_code}",
                }
                return False

        except Exception as e:
            print(f"❌ News API error: {e}")
            self.results["news_api"] = {"status": "failed", "reason": str(e)}
            return False

    def generate_summary(self):
        """Generate a summary of all API test results."""
        print("\n" + "=" * 70)
        print("🎯 API TESTING SUMMARY")
        print("=" * 70)

        working_apis = []
        failed_apis = []
        rate_limited_apis = []

        for api_name, result in self.results.items():
            status = result["status"]

            if status == "success":
                working_apis.append(api_name)
                print(f"✅ {api_name.replace('_', ' ').title()}: WORKING")
            elif status == "rate_limited":
                rate_limited_apis.append(api_name)
                print(
                    f"⚠️  {api_name.replace('_', ' ').title()}: RATE LIMITED (but working)"
                )
            else:
                failed_apis.append(api_name)
                print(
                    f"❌ {api_name.replace('_', ' ').title()}: FAILED - {result['reason']}"
                )

        print(f"\n📊 Results:")
        print(f"   ✅ Working: {len(working_apis)} APIs")
        print(f"   ⚠️  Rate Limited: {len(rate_limited_apis)} APIs")
        print(f"   ❌ Failed: {len(failed_apis)} APIs")

        # Determine readiness for trading
        core_apis_working = self.results.get("openai", {}).get("status") in [
            "success",
            "rate_limited",
        ] and self.results.get("alpha_vantage", {}).get("status") in [
            "success",
            "rate_limited",
        ]

        social_apis_working = self.results.get("twitter", {}).get("status") in [
            "success",
            "rate_limited",
        ] or self.results.get("reddit", {}).get("status") in ["success", "rate_limited"]

        print(f"\n🚀 Platform Readiness:")

        if core_apis_working:
            print("✅ Core TradingAgents functionality: READY")
            print("   - LLM agents can analyze and make decisions")
            print("   - Stock data available for analysis")
        else:
            print("❌ Core TradingAgents functionality: NOT READY")
            print("   - Need OpenAI and Alpha Vantage APIs working")

        if social_apis_working:
            print("✅ Social sentiment analysis: READY")
            print("   - Can analyze Twitter and/or Reddit sentiment")
        else:
            print("❌ Social sentiment analysis: NOT READY")
            print("   - Need Twitter or Reddit APIs working")

        enhanced_data = self.results.get("polygon", {}).get("status") in [
            "success",
            "rate_limited",
        ] or self.results.get("news_api", {}).get("status") in [
            "success",
            "rate_limited",
        ]

        if enhanced_data:
            print("✅ Enhanced data sources: AVAILABLE")
            print("   - Real-time data and news analysis possible")
        else:
            print("⚠️  Enhanced data sources: LIMITED")
            print("   - Using free tier data sources only")

        print(f"\n🔧 Next Steps:")
        if core_apis_working and social_apis_working:
            print("1. ✅ All core systems ready!")
            print("2. Test the TradingAgents CLI: python -m cli.main")
            print("3. Run end-to-end sentiment analysis")
            print("4. Start paper trading with small positions")
        else:
            print("1. Fix any failed API configurations")
            print("2. Verify API keys are correct and active")
            print("3. Check account limits and upgrade if needed")
            print("4. Re-run this test after fixes")


def main():
    """Run comprehensive API testing."""
    print("🚀 True North Trading Platform - Comprehensive API Testing")
    print("=" * 70)
    print("Testing all configured APIs to ensure platform readiness...")

    tester = APITester()

    # Test all APIs
    tester.test_openai_api()
    tester.test_alpha_vantage_api()
    tester.test_twitter_api()
    tester.test_reddit_api()
    tester.test_polygon_api()
    tester.test_news_api()

    # Generate summary
    tester.generate_summary()


if __name__ == "__main__":
    main()
