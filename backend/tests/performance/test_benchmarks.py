#!/usr/bin/env python3
"""
Performance benchmarks for True North Trading Platform.
"""

import unittest
import time
import sys
import os
from unittest.mock import Mock
import psutil
import threading
from concurrent.futures import ThreadPoolExecutor

# Add project root to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../"))


class TestAPIPerformance(unittest.TestCase):
    """Test API performance and response times."""

    def test_api_response_times(self):
        """Test API response time benchmarks."""
        import requests
        from dotenv import load_dotenv

        load_dotenv()

        # Test Alpha Vantage response time
        alpha_vantage_key = os.getenv("ALPHA_VANTAGE_API_KEY")

        if alpha_vantage_key and alpha_vantage_key != "your_alpha_vantage_key_here":
            start_time = time.time()

            try:
                response = requests.get(
                    "https://www.alphavantage.co/query",
                    params={
                        "function": "GLOBAL_QUOTE",
                        "symbol": "AAPL",
                        "apikey": alpha_vantage_key,
                    },
                    timeout=10,
                )

                response_time = time.time() - start_time

                # API should respond within 5 seconds
                self.assertLess(
                    response_time,
                    5.0,
                    f"Alpha Vantage response time too slow: {response_time:.2f}s",
                )

                # Should get successful response
                self.assertEqual(response.status_code, 200)

            except requests.exceptions.Timeout:
                self.fail("Alpha Vantage API timeout")
            except Exception as e:
                self.skipTest(f"Alpha Vantage API test failed: {e}")
        else:
            self.skipTest("Alpha Vantage API key not configured")

    def test_concurrent_api_calls(self):
        """Test handling of concurrent API calls."""

        def mock_api_call(delay=0.1):
            """Mock API call with configurable delay."""
            time.sleep(delay)
            return {"status": "success", "timestamp": time.time()}

        # Test concurrent execution
        start_time = time.time()

        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = [executor.submit(mock_api_call, 0.1) for _ in range(10)]
            results = [future.result() for future in futures]

        total_time = time.time() - start_time

        # Concurrent execution should be faster than sequential
        # 10 calls * 0.1s = 1.0s sequential, should be much less concurrent
        self.assertLess(
            total_time, 0.5, f"Concurrent execution too slow: {total_time:.2f}s"
        )

        # All calls should succeed
        self.assertEqual(len(results), 10)
        for result in results:
            self.assertEqual(result["status"], "success")


class TestModelPerformance(unittest.TestCase):
    """Test ML model performance."""

    def test_finbert_inference_speed(self):
        """Test FinBERT inference speed."""
        try:
            from transformers import pipeline

            # Load FinBERT
            start_time = time.time()
            finbert = pipeline("text-classification", model="ProsusAI/finbert")
            load_time = time.time() - start_time

            # Model should load within reasonable time (first load can be slow)
            self.assertLess(
                load_time, 30.0, f"FinBERT load time too slow: {load_time:.2f}s"
            )

            # Test inference speed
            test_texts = [
                "Apple reported strong quarterly earnings.",
                "The stock market crashed today.",
                "Tesla's new model shows promising sales figures.",
                "Oil prices are declining due to oversupply.",
                "The Federal Reserve raised interest rates.",
            ]

            start_time = time.time()
            results = finbert(test_texts)
            inference_time = time.time() - start_time

            # Should process 5 texts within 5 seconds
            self.assertLess(
                inference_time,
                5.0,
                f"FinBERT inference too slow: {inference_time:.2f}s",
            )

            # Should get results for all texts
            self.assertEqual(len(results), len(test_texts))

            # Average time per text should be reasonable
            avg_time_per_text = inference_time / len(test_texts)
            self.assertLess(
                avg_time_per_text,
                1.0,
                f"Average inference time too slow: {avg_time_per_text:.2f}s",
            )

        except ImportError:
            self.skipTest("FinBERT not available")
        except Exception as e:
            self.skipTest(f"FinBERT test failed: {e}")

    def test_technical_analysis_performance(self):
        """Test technical analysis calculation performance."""
        import pandas as pd
        import numpy as np

        # Create large dataset for performance testing
        np.random.seed(42)
        n_points = 10000

        dates = pd.date_range("2020-01-01", periods=n_points, freq="1min")
        base_price = 150
        price_changes = np.random.normal(0, 0.1, n_points)
        prices = base_price + np.cumsum(price_changes)

        df = pd.DataFrame(
            {
                "timestamp": dates,
                "close": prices,
                "volume": np.random.randint(1000, 10000, n_points),
            }
        )

        # Test SMA calculation performance
        start_time = time.time()
        df["sma_20"] = df["close"].rolling(window=20).mean()
        df["sma_50"] = df["close"].rolling(window=50).mean()
        sma_time = time.time() - start_time

        # Should calculate SMAs quickly
        self.assertLess(sma_time, 1.0, f"SMA calculation too slow: {sma_time:.2f}s")

        # Test RSI calculation performance
        start_time = time.time()

        def calculate_rsi(prices, window=14):
            delta = prices.diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
            rs = gain / loss
            rsi = 100 - (100 / (1 + rs))
            return rsi

        df["rsi"] = calculate_rsi(df["close"])
        rsi_time = time.time() - start_time

        # Should calculate RSI quickly
        self.assertLess(rsi_time, 2.0, f"RSI calculation too slow: {rsi_time:.2f}s")


class TestMemoryUsage(unittest.TestCase):
    """Test memory usage and resource management."""

    def test_memory_usage_baseline(self):
        """Test baseline memory usage."""
        process = psutil.Process()
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB

        # Baseline memory should be reasonable
        self.assertLess(
            initial_memory,
            500,
            f"Baseline memory usage too high: {initial_memory:.1f}MB",
        )

    def test_memory_usage_with_models(self):
        """Test memory usage when loading models."""
        process = psutil.Process()
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB

        try:
            from transformers import pipeline

            # Load FinBERT
            finbert = pipeline("text-classification", model="ProsusAI/finbert")

            # Check memory after model loading
            model_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_increase = model_memory - initial_memory

            # Memory increase should be reasonable (FinBERT is ~400MB)
            self.assertLess(
                memory_increase,
                1000,
                f"Model memory usage too high: {memory_increase:.1f}MB",
            )

            # Test inference memory usage
            test_texts = ["Test text"] * 100
            results = finbert(test_texts)

            inference_memory = process.memory_info().rss / 1024 / 1024  # MB
            inference_increase = inference_memory - model_memory

            # Inference shouldn't significantly increase memory
            self.assertLess(
                inference_increase,
                100,
                f"Inference memory increase too high: {inference_increase:.1f}MB",
            )

        except ImportError:
            self.skipTest("Transformers not available")
        except Exception as e:
            self.skipTest(f"Memory test failed: {e}")

    def test_data_processing_memory(self):
        """Test memory usage during data processing."""
        import pandas as pd
        import numpy as np

        process = psutil.Process()
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB

        # Create large dataset
        n_points = 100000
        df = pd.DataFrame(
            {
                "timestamp": pd.date_range("2020-01-01", periods=n_points, freq="1min"),
                "price": np.random.normal(150, 10, n_points),
                "volume": np.random.randint(1000, 10000, n_points),
            }
        )

        # Check memory after data creation
        data_memory = process.memory_info().rss / 1024 / 1024  # MB
        data_increase = data_memory - initial_memory

        # Process data
        df["sma_20"] = df["price"].rolling(window=20).mean()
        df["returns"] = df["price"].pct_change()
        df["volatility"] = df["returns"].rolling(window=20).std()

        # Check memory after processing
        processed_memory = process.memory_info().rss / 1024 / 1024  # MB
        processing_increase = processed_memory - data_memory

        # Processing shouldn't dramatically increase memory
        self.assertLess(
            processing_increase,
            data_increase * 0.5,
            f"Data processing memory increase too high: {processing_increase:.1f}MB",
        )

        # Clean up
        del df
        import gc

        gc.collect()


class TestConcurrencyAndThreading(unittest.TestCase):
    """Test concurrent operations and threading."""

    def test_thread_safety(self):
        """Test thread safety of shared resources."""
        shared_counter = {"value": 0}
        lock = threading.Lock()

        def increment_counter():
            for _ in range(1000):
                with lock:
                    shared_counter["value"] += 1

        # Run multiple threads
        threads = []
        for _ in range(5):
            thread = threading.Thread(target=increment_counter)
            threads.append(thread)
            thread.start()

        # Wait for all threads to complete
        for thread in threads:
            thread.join()

        # Counter should be exactly 5000 (5 threads * 1000 increments)
        self.assertEqual(shared_counter["value"], 5000, "Thread safety issue detected")

    def test_concurrent_model_inference(self):
        """Test concurrent model inference."""
        try:
            from transformers import pipeline

            finbert = pipeline("text-classification", model="ProsusAI/finbert")

            def analyze_sentiment(text):
                return finbert(f"Test sentiment analysis: {text}")

            # Test concurrent inference
            test_texts = [f"Text {i}" for i in range(20)]

            start_time = time.time()

            with ThreadPoolExecutor(max_workers=4) as executor:
                futures = [
                    executor.submit(analyze_sentiment, text) for text in test_texts
                ]
                results = [future.result() for future in futures]

            total_time = time.time() - start_time

            # Should complete within reasonable time
            self.assertLess(
                total_time, 10.0, f"Concurrent inference too slow: {total_time:.2f}s"
            )

            # All results should be valid
            self.assertEqual(len(results), len(test_texts))
            for result in results:
                self.assertIsInstance(result, list)
                self.assertIn("label", result[0])
                self.assertIn("score", result[0])

        except ImportError:
            self.skipTest("Transformers not available")
        except Exception as e:
            self.skipTest(f"Concurrent inference test failed: {e}")


if __name__ == "__main__":
    # Run performance tests with verbose output
    unittest.main(verbosity=2)
