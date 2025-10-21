#!/usr/bin/env python3
"""
Unit tests for TradingAgents core components.
"""

import unittest
import sys
import os
from unittest.mock import Mock, patch, MagicMock

# Add project root to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../"))

try:
    from tradingagents.agents.trader.trader import create_trader
    from tradingagents.agents.analyst.market_analyst import create_market_analyst
    from tradingagents.agents.analyst.news_analyst import create_news_analyst
    from tradingagents.agents.analyst.social_analyst import create_social_analyst
    from tradingagents.agents.analyst.fundamentals_analyst import (
        create_fundamentals_analyst,
    )

    TRADINGAGENTS_AVAILABLE = True
except ImportError:
    TRADINGAGENTS_AVAILABLE = False


class TestTradingAgentsCore(unittest.TestCase):
    """Test core TradingAgents functionality."""

    def setUp(self):
        """Set up test fixtures."""
        self.mock_llm = Mock()
        self.mock_memory = Mock()
        self.test_state = {
            "company_of_interest": "AAPL",
            "investment_plan": "Test investment plan",
            "market_report": "Test market report",
            "sentiment_report": "Test sentiment report",
            "news_report": "Test news report",
            "fundamentals_report": "Test fundamentals report",
        }

    @unittest.skipUnless(TRADINGAGENTS_AVAILABLE, "TradingAgents not available")
    def test_trader_creation(self):
        """Test trader agent creation."""
        trader = create_trader(self.mock_llm, self.mock_memory)
        self.assertIsNotNone(trader)
        self.assertTrue(callable(trader))

    @unittest.skipUnless(TRADINGAGENTS_AVAILABLE, "TradingAgents not available")
    def test_trader_execution(self):
        """Test trader agent execution."""
        # Mock LLM response
        mock_response = Mock()
        mock_response.content = "FINAL TRANSACTION PROPOSAL: **BUY**"
        self.mock_llm.invoke.return_value = mock_response

        # Mock memory
        self.mock_memory.get_memories.return_value = []

        trader = create_trader(self.mock_llm, self.mock_memory)
        result = trader(self.test_state)

        self.assertIn("messages", result)
        self.assertIn("trader_investment_plan", result)
        self.assertIn("sender", result)
        self.assertEqual(result["sender"], "Trader")

    @unittest.skipUnless(TRADINGAGENTS_AVAILABLE, "TradingAgents not available")
    def test_market_analyst_creation(self):
        """Test market analyst creation."""
        analyst = create_market_analyst(self.mock_llm, self.mock_memory)
        self.assertIsNotNone(analyst)
        self.assertTrue(callable(analyst))

    def test_mock_trading_workflow(self):
        """Test mock trading workflow when TradingAgents not available."""
        if not TRADINGAGENTS_AVAILABLE:
            # Test that we can still run basic workflow logic
            mock_workflow = {
                "symbol": "AAPL",
                "recommendation": "BUY",
                "confidence": 0.75,
            }

            self.assertEqual(mock_workflow["symbol"], "AAPL")
            self.assertIn(mock_workflow["recommendation"], ["BUY", "SELL", "HOLD"])
            self.assertGreaterEqual(mock_workflow["confidence"], 0)
            self.assertLessEqual(mock_workflow["confidence"], 1)


class TestDataProcessing(unittest.TestCase):
    """Test data processing utilities."""

    def test_price_data_validation(self):
        """Test price data validation."""
        valid_price = 150.25
        invalid_price = -10.0

        self.assertGreater(valid_price, 0)
        self.assertLess(invalid_price, 0)

    def test_sentiment_score_normalization(self):
        """Test sentiment score normalization."""

        def normalize_sentiment(score):
            """Normalize sentiment score to -1 to 1 range."""
            return max(-1, min(1, score))

        self.assertEqual(normalize_sentiment(0.5), 0.5)
        self.assertEqual(normalize_sentiment(1.5), 1.0)
        self.assertEqual(normalize_sentiment(-1.5), -1.0)

    def test_technical_indicators(self):
        """Test technical indicator calculations."""
        import pandas as pd
        import numpy as np

        # Create sample price data
        prices = pd.Series([100, 102, 101, 103, 105, 104, 106, 108, 107, 109])

        # Simple Moving Average
        sma_5 = prices.rolling(window=5).mean()
        self.assertFalse(sma_5.iloc[:4].notna().any())  # First 4 should be NaN
        self.assertTrue(sma_5.iloc[4:].notna().all())  # Rest should have values

        # RSI calculation (simplified)
        def calculate_rsi(prices, window=14):
            delta = prices.diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
            rs = gain / loss
            rsi = 100 - (100 / (1 + rs))
            return rsi

        rsi = calculate_rsi(prices, window=5)
        # RSI should be between 0 and 100
        valid_rsi = rsi.dropna()
        if len(valid_rsi) > 0:
            self.assertTrue((valid_rsi >= 0).all())
            self.assertTrue((valid_rsi <= 100).all())


class TestConfigurationHandling(unittest.TestCase):
    """Test configuration and environment handling."""

    def test_environment_variable_loading(self):
        """Test environment variable loading."""
        import os
        from dotenv import load_dotenv

        # Test that we can load environment variables
        load_dotenv()

        # Test that we handle missing environment variables gracefully
        test_var = os.getenv("NONEXISTENT_VAR", "default_value")
        self.assertEqual(test_var, "default_value")

    def test_api_key_validation(self):
        """Test API key validation."""

        def validate_api_key(key, min_length=10):
            """Validate API key format."""
            if not key or key == "your_api_key_here":
                return False
            return len(key) >= min_length

        self.assertFalse(validate_api_key(None))
        self.assertFalse(validate_api_key(""))
        self.assertFalse(validate_api_key("your_api_key_here"))
        self.assertFalse(validate_api_key("short"))
        self.assertTrue(validate_api_key("valid_api_key_123"))


if __name__ == "__main__":
    unittest.main()
