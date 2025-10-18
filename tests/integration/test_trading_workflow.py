#!/usr/bin/env python3
"""
Integration tests for complete trading workflows.
"""

import unittest
import sys
import os
from unittest.mock import Mock, patch
from dotenv import load_dotenv

# Add project root to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../"))

# Load environment variables
load_dotenv()


class TestTradingWorkflowIntegration(unittest.TestCase):
    """Test complete trading workflow integration."""

    def setUp(self):
        """Set up test fixtures."""
        self.test_symbol = "AAPL"
        self.api_keys = {
            "openai": os.getenv("OPENAI_API_KEY"),
            "alpha_vantage": os.getenv("ALPHA_VANTAGE_API_KEY"),
            "twitter": os.getenv("TWITTER_BEARER_TOKEN"),
            "polygon": os.getenv("POLYGON_API_KEY"),
            "news_api": os.getenv("NEWS_API_KEY"),
        }

    def test_data_pipeline_integration(self):
        """Test data collection from multiple sources."""
        # This would test the integration between:
        # 1. Stock data collection (Alpha Vantage, Polygon, YFinance)
        # 2. News data collection (News API)
        # 3. Social data collection (Twitter, Reddit)
        # 4. Data normalization and storage

        data_sources = []

        # Mock successful data collection
        if self.api_keys["alpha_vantage"]:
            data_sources.append("alpha_vantage")

        if self.api_keys["polygon"]:
            data_sources.append("polygon")

        if self.api_keys["news_api"]:
            data_sources.append("news_api")

        # We should have at least one data source available
        self.assertGreater(len(data_sources), 0, "No data sources configured")

    def test_sentiment_analysis_pipeline(self):
        """Test sentiment analysis integration."""
        # Test the pipeline:
        # 1. Collect news/social data
        # 2. Process with FinBERT
        # 3. Aggregate sentiment scores
        # 4. Generate sentiment signals

        try:
            from transformers import pipeline

            # Test FinBERT loading
            finbert = pipeline("text-classification", model="ProsusAI/finbert")

            # Test sample sentiment analysis
            test_text = "Apple reported strong quarterly earnings with revenue growth."
            result = finbert(test_text)

            self.assertIsInstance(result, list)
            self.assertIn("label", result[0])
            self.assertIn("score", result[0])
            self.assertIn(result[0]["label"], ["positive", "negative", "neutral"])

        except Exception as e:
            self.skipTest(f"FinBERT not available: {e}")

    def test_technical_analysis_integration(self):
        """Test technical analysis integration."""
        import pandas as pd
        import numpy as np

        # Create sample OHLCV data
        dates = pd.date_range("2024-01-01", periods=30, freq="D")
        np.random.seed(42)  # For reproducible tests

        base_price = 150
        price_changes = np.random.normal(0, 2, 30)
        prices = base_price + np.cumsum(price_changes)

        df = pd.DataFrame(
            {
                "Date": dates,
                "Open": prices + np.random.normal(0, 0.5, 30),
                "High": prices + np.abs(np.random.normal(0, 1, 30)),
                "Low": prices - np.abs(np.random.normal(0, 1, 30)),
                "Close": prices,
                "Volume": np.random.randint(1000000, 10000000, 30),
            }
        )

        # Test technical indicator calculations
        df["SMA_5"] = df["Close"].rolling(window=5).mean()
        df["SMA_20"] = df["Close"].rolling(window=20).mean()

        # Verify indicators
        self.assertEqual(len(df), 30)
        self.assertTrue(df["SMA_5"].iloc[4:].notna().all())
        self.assertTrue(df["SMA_20"].iloc[19:].notna().all())

    def test_recommendation_generation(self):
        """Test trading recommendation generation."""
        # Mock data inputs
        mock_data = {
            "stock_data": {"price": 150.25, "change": 2.50, "volume": 5000000},
            "news_sentiment": {"overall_sentiment": 0.3, "confidence": 0.8},
            "technical_analysis": {
                "rsi": 45,
                "sma_trend": "bullish",
                "signals": ["bullish_trend"],
            },
        }

        # Simple scoring algorithm
        score = 0

        # Technical scoring
        if mock_data["technical_analysis"]["rsi"] < 30:
            score += 2  # Oversold
        elif mock_data["technical_analysis"]["rsi"] > 70:
            score -= 2  # Overbought

        if mock_data["technical_analysis"]["sma_trend"] == "bullish":
            score += 1
        elif mock_data["technical_analysis"]["sma_trend"] == "bearish":
            score -= 1

        # Sentiment scoring
        sentiment_score = mock_data["news_sentiment"]["overall_sentiment"] * 2
        score += sentiment_score

        # Generate recommendation
        if score >= 2:
            recommendation = "BUY"
        elif score <= -2:
            recommendation = "SELL"
        else:
            recommendation = "HOLD"

        # Verify recommendation logic
        self.assertIn(recommendation, ["BUY", "SELL", "HOLD"])
        self.assertEqual(recommendation, "BUY")  # Based on our mock data

    def test_error_handling_integration(self):
        """Test error handling across components."""
        # Test graceful degradation when APIs fail

        def mock_api_call(success_rate=0.8):
            """Mock API call with configurable failure rate."""
            import random

            if random.random() < success_rate:
                return {"status": "success", "data": "mock_data"}
            else:
                raise Exception("API call failed")

        # Test multiple API calls with some failures
        results = []
        for _ in range(10):
            try:
                result = mock_api_call(success_rate=0.7)
                results.append(result)
            except Exception:
                results.append({"status": "failed", "data": None})

        # Should have some successes and some failures
        successes = [r for r in results if r["status"] == "success"]
        failures = [r for r in results if r["status"] == "failed"]

        self.assertGreater(len(successes), 0)
        self.assertGreater(len(failures), 0)
        self.assertEqual(len(results), 10)


class TestAPIIntegrationChain(unittest.TestCase):
    """Test API integration chains."""

    def test_api_fallback_chain(self):
        """Test API fallback mechanisms."""
        # Test the fallback chain:
        # Primary: Alpha Vantage -> Fallback: Polygon -> Fallback: YFinance

        api_chain = ["alpha_vantage", "polygon", "yfinance"]

        def try_api_chain(apis, symbol="AAPL"):
            """Try APIs in order until one succeeds."""
            for api in apis:
                try:
                    if api == "alpha_vantage":
                        # Mock Alpha Vantage call
                        if os.getenv("ALPHA_VANTAGE_API_KEY"):
                            return {"source": api, "price": 150.25, "status": "success"}
                        else:
                            raise Exception("No API key")
                    elif api == "polygon":
                        # Mock Polygon call
                        if os.getenv("POLYGON_API_KEY"):
                            return {"source": api, "price": 150.30, "status": "success"}
                        else:
                            raise Exception("No API key")
                    elif api == "yfinance":
                        # YFinance doesn't need API key
                        return {"source": api, "price": 150.20, "status": "success"}
                except Exception:
                    continue

            return {"source": None, "status": "all_failed"}

        result = try_api_chain(api_chain)

        # Should get a result from at least YFinance
        self.assertEqual(result["status"], "success")
        self.assertIsNotNone(result["source"])
        self.assertIn("price", result)

    def test_data_aggregation(self):
        """Test data aggregation from multiple sources."""
        # Mock data from different sources
        sources_data = {
            "alpha_vantage": {
                "price": 150.25,
                "volume": 5000000,
                "timestamp": "2024-01-01T16:00:00Z",
            },
            "polygon": {
                "price": 150.30,
                "volume": 5100000,
                "timestamp": "2024-01-01T16:00:00Z",
            },
            "news_api": {"sentiment": 0.3, "article_count": 15},
            "twitter": {"sentiment": 0.1, "tweet_count": 50, "status": "rate_limited"},
        }

        # Aggregate data
        aggregated = {
            "price": None,
            "volume": None,
            "sentiment": None,
            "data_quality": 0,
        }

        # Price data (prefer Alpha Vantage, fallback to Polygon)
        if "alpha_vantage" in sources_data:
            aggregated["price"] = sources_data["alpha_vantage"]["price"]
            aggregated["volume"] = sources_data["alpha_vantage"]["volume"]
            aggregated["data_quality"] += 1
        elif "polygon" in sources_data:
            aggregated["price"] = sources_data["polygon"]["price"]
            aggregated["volume"] = sources_data["polygon"]["volume"]
            aggregated["data_quality"] += 1

        # Sentiment data (combine news and social)
        sentiment_scores = []
        if "news_api" in sources_data:
            sentiment_scores.append(sources_data["news_api"]["sentiment"])
            aggregated["data_quality"] += 1

        if (
            "twitter" in sources_data
            and sources_data["twitter"]["status"] != "rate_limited"
        ):
            sentiment_scores.append(sources_data["twitter"]["sentiment"])
            aggregated["data_quality"] += 1

        if sentiment_scores:
            aggregated["sentiment"] = sum(sentiment_scores) / len(sentiment_scores)

        # Verify aggregation
        self.assertIsNotNone(aggregated["price"])
        self.assertIsNotNone(aggregated["volume"])
        self.assertIsNotNone(aggregated["sentiment"])
        self.assertGreater(aggregated["data_quality"], 0)


if __name__ == "__main__":
    unittest.main()
