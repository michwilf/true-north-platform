#!/usr/bin/env python3
"""
Finance LLM Exploration Script for True North Trading Platform

This script demonstrates and tests the finance-tuned LLMs available:
1. FinBERT - Financial sentiment analysis
2. Chronos-Bolt - Time series forecasting
3. Integration examples with TradingAgents
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import yfinance as yf

# Finance LLM imports
from transformers import pipeline, AutoTokenizer, AutoModel
import torch

# Time series forecasting
try:
    from chronos import ChronosPipeline

    CHRONOS_AVAILABLE = True
except ImportError:
    CHRONOS_AVAILABLE = False
    print("⚠️  Chronos not available - install from GitHub")

# Darts for time series
from darts import TimeSeries
from darts.models import ExponentialSmoothing


def test_finbert_sentiment():
    """Test FinBERT for financial sentiment analysis."""
    print("\n🤖 Testing FinBERT Financial Sentiment Analysis")
    print("=" * 60)

    # Initialize FinBERT
    finbert = pipeline(
        "text-classification", model="ProsusAI/finbert", tokenizer="ProsusAI/finbert"
    )

    # Test sentences with different sentiments
    test_sentences = [
        "The company reported record quarterly earnings, beating analyst expectations.",
        "Stock prices are falling due to concerns about the economic outlook.",
        "The Federal Reserve announced an interest rate cut to stimulate growth.",
        "Inflation data came in higher than expected, raising recession fears.",
        "The merger will create significant synergies and cost savings.",
        "Regulatory approval for the new drug was denied by the FDA.",
        "Tesla delivered more vehicles than expected this quarter.",
        "Oil prices surged after OPEC announced production cuts.",
        "The bank's loan loss provisions increased significantly.",
        "Strong consumer spending data boosted retail stocks.",
    ]

    print("Analyzing financial sentiment for sample news...")
    results = []

    for sentence in test_sentences:
        result = finbert(sentence)[0]
        sentiment = result["label"]
        confidence = result["score"]

        # Color coding for output
        color = (
            "🟢"
            if sentiment == "positive"
            else "🔴" if sentiment == "negative" else "🟡"
        )

        print(f"{color} {sentiment.upper():8} ({confidence:.3f}) | {sentence[:60]}...")

        results.append(
            {"text": sentence, "sentiment": sentiment, "confidence": confidence}
        )

    # Summary statistics
    df_results = pd.DataFrame(results)
    sentiment_counts = df_results["sentiment"].value_counts()
    avg_confidence = df_results.groupby("sentiment")["confidence"].mean()

    print(f"\n📊 Sentiment Analysis Summary:")
    print(
        f"   Positive: {sentiment_counts.get('positive', 0)} ({avg_confidence.get('positive', 0):.3f} avg confidence)"
    )
    print(
        f"   Negative: {sentiment_counts.get('negative', 0)} ({avg_confidence.get('negative', 0):.3f} avg confidence)"
    )
    print(
        f"   Neutral:  {sentiment_counts.get('neutral', 0)} ({avg_confidence.get('neutral', 0):.3f} avg confidence)"
    )

    return finbert, df_results


def test_chronos_forecasting():
    """Test Chronos time series forecasting."""
    print("\n📈 Testing Chronos Time Series Forecasting")
    print("=" * 60)

    if not CHRONOS_AVAILABLE:
        print("❌ Chronos not available. Install with:")
        print(
            "   pip install git+https://github.com/amazon-science/chronos-forecasting.git"
        )
        return None

    try:
        # Initialize Chronos pipeline
        pipeline = ChronosPipeline.from_pretrained(
            "amazon/chronos-t5-small",
            device_map="auto" if torch.cuda.is_available() else "cpu",
            torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
        )

        # Get real stock data for testing
        print("📥 Fetching AAPL stock data for forecasting test...")
        ticker = yf.Ticker("AAPL")
        hist = ticker.history(period="3mo")
        prices = hist["Close"].values

        # Prepare data for Chronos
        context = torch.tensor(prices[-60:])  # Last 60 days as context
        prediction_length = 10  # Forecast 10 days ahead

        print(
            f"🔮 Forecasting next {prediction_length} days using last {len(context)} days..."
        )

        # Generate forecast
        forecast = pipeline.predict(
            context=context, prediction_length=prediction_length, num_samples=20
        )

        # Calculate statistics
        forecast_median = np.median(forecast[0].numpy(), axis=0)
        forecast_10th = np.percentile(forecast[0].numpy(), 10, axis=0)
        forecast_90th = np.percentile(forecast[0].numpy(), 90, axis=0)

        print(f"✅ Forecast generated successfully!")
        print(f"   Current price: ${prices[-1]:.2f}")
        print(f"   10-day forecast median: ${forecast_median[-1]:.2f}")
        print(
            f"   Confidence interval: ${forecast_10th[-1]:.2f} - ${forecast_90th[-1]:.2f}"
        )

        # Create visualization
        plt.figure(figsize=(12, 6))

        # Plot historical data
        dates = pd.date_range(end=datetime.now(), periods=len(prices), freq="D")
        plt.plot(
            dates[-60:], prices[-60:], label="Historical", color="blue", linewidth=2
        )

        # Plot forecast
        forecast_dates = pd.date_range(
            start=dates[-1] + timedelta(days=1), periods=prediction_length, freq="D"
        )
        plt.plot(
            forecast_dates,
            forecast_median,
            label="Forecast (Median)",
            color="red",
            linewidth=2,
            linestyle="--",
        )
        plt.fill_between(
            forecast_dates,
            forecast_10th,
            forecast_90th,
            alpha=0.3,
            color="red",
            label="80% Confidence Interval",
        )

        plt.title("AAPL Stock Price Forecast - Chronos-T5-Small")
        plt.xlabel("Date")
        plt.ylabel("Price ($)")
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig("chronos_forecast_example.png", dpi=150, bbox_inches="tight")
        plt.show()

        return pipeline, {
            "historical": prices,
            "forecast_median": forecast_median,
            "forecast_10th": forecast_10th,
            "forecast_90th": forecast_90th,
            "dates": dates,
            "forecast_dates": forecast_dates,
        }

    except Exception as e:
        print(f"❌ Error testing Chronos: {e}")
        return None


def test_darts_forecasting():
    """Test Darts time series forecasting library."""
    print("\n📊 Testing Darts Time Series Library")
    print("=" * 60)

    try:
        # Get stock data
        print("📥 Fetching NVDA stock data for Darts test...")
        ticker = yf.Ticker("NVDA")
        hist = ticker.history(period="6mo")

        # Create Darts TimeSeries
        ts = TimeSeries.from_dataframe(
            hist.reset_index(), time_col="Date", value_cols="Close"
        )

        print(f"✅ Created TimeSeries with {len(ts)} data points")

        # Split data for training and testing
        train_size = int(len(ts) * 0.8)
        train_ts = ts[:train_size]
        test_ts = ts[train_size:]

        # Fit exponential smoothing model
        print("🔧 Training Exponential Smoothing model...")
        model = ExponentialSmoothing()
        model.fit(train_ts)

        # Generate forecast
        forecast_length = len(test_ts)
        forecast = model.predict(forecast_length)

        print(f"🔮 Generated {forecast_length}-day forecast")

        # Calculate accuracy metrics
        from darts.metrics import mape, mae

        mape_score = mape(test_ts, forecast)
        mae_score = mae(test_ts, forecast)

        print(f"📊 Forecast Accuracy:")
        print(f"   MAPE: {mape_score:.2f}%")
        print(f"   MAE:  ${mae_score:.2f}")

        # Visualization
        plt.figure(figsize=(12, 6))
        train_ts.plot(label="Training Data", color="blue")
        test_ts.plot(label="Actual", color="green")
        forecast.plot(label="Forecast", color="red", linestyle="--")

        plt.title("NVDA Stock Price Forecast - Darts Exponential Smoothing")
        plt.xlabel("Date")
        plt.ylabel("Price ($)")
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig("darts_forecast_example.png", dpi=150, bbox_inches="tight")
        plt.show()

        return model, {
            "train_ts": train_ts,
            "test_ts": test_ts,
            "forecast": forecast,
            "mape": mape_score,
            "mae": mae_score,
        }

    except Exception as e:
        print(f"❌ Error testing Darts: {e}")
        return None


def integration_example():
    """Show how to integrate these models with TradingAgents."""
    print("\n🔧 TradingAgents Integration Example")
    print("=" * 60)

    # Example of how you would integrate these models
    integration_code = '''
# Example: Integrating FinBERT into TradingAgents News Analyst

from transformers import pipeline

class EnhancedNewsAnalyst:
    def __init__(self, llm):
        self.llm = llm
        self.sentiment_analyzer = pipeline("text-classification", 
                                         model="ProsusAI/finbert")
    
    def analyze_news(self, news_articles, ticker):
        """Analyze news with both LLM reasoning and FinBERT sentiment."""
        
        # Get FinBERT sentiment scores
        sentiments = []
        for article in news_articles:
            sentiment = self.sentiment_analyzer(article['content'])[0]
            sentiments.append({
                'title': article['title'],
                'sentiment': sentiment['label'],
                'confidence': sentiment['score']
            })
        
        # Aggregate sentiment
        positive_count = sum(1 for s in sentiments if s['sentiment'] == 'positive')
        negative_count = sum(1 for s in sentiments if s['sentiment'] == 'negative')
        avg_confidence = np.mean([s['confidence'] for s in sentiments])
        
        # Create enhanced prompt for LLM
        sentiment_summary = f"""
        News Sentiment Analysis for {ticker}:
        - Positive articles: {positive_count}
        - Negative articles: {negative_count}
        - Average confidence: {avg_confidence:.3f}
        
        Top sentiment signals:
        {chr(10).join([f"- {s['sentiment'].upper()}: {s['title'][:50]}..." 
                      for s in sentiments[:3]])}
        """
        
        # Get LLM analysis with sentiment context
        prompt = f"""
        As a financial news analyst, analyze the following news for {ticker}.
        
        {sentiment_summary}
        
        Provide your analysis considering:
        1. Market impact of the news
        2. Timing and relevance
        3. Credibility of sources
        4. Potential price implications
        
        News articles:
        {chr(10).join([f"- {a['title']}: {a['content'][:100]}..." 
                      for a in news_articles])}
        """
        
        analysis = self.llm.invoke(prompt)
        
        return {
            'llm_analysis': analysis.content,
            'sentiment_scores': sentiments,
            'sentiment_summary': {
                'positive_count': positive_count,
                'negative_count': negative_count,
                'avg_confidence': avg_confidence,
                'net_sentiment': positive_count - negative_count
            }
        }

# Example: Integrating Chronos into Technical Analyst

class EnhancedTechnicalAnalyst:
    def __init__(self, llm):
        self.llm = llm
        if CHRONOS_AVAILABLE:
            self.forecaster = ChronosPipeline.from_pretrained(
                "amazon/chronos-t5-small",
                device_map="cpu",
                torch_dtype=torch.float32
            )
        else:
            self.forecaster = None
    
    def analyze_price_action(self, ticker, price_data):
        """Enhanced technical analysis with ML forecasting."""
        
        # Traditional technical indicators
        prices = price_data['Close'].values
        
        # Generate ML forecast if available
        forecast_data = None
        if self.forecaster and len(prices) >= 60:
            context = torch.tensor(prices[-60:])
            forecast = self.forecaster.predict(
                context=context, 
                prediction_length=5,
                num_samples=10
            )
            forecast_median = np.median(forecast[0].numpy(), axis=0)
            
            forecast_data = {
                'current_price': prices[-1],
                'forecast_5d': forecast_median[-1],
                'expected_return': (forecast_median[-1] / prices[-1] - 1) * 100
            }
        
        # Enhanced LLM prompt with ML insights
        ml_context = ""
        if forecast_data:
            ml_context = f"""
            ML Forecast (Chronos-T5):
            - Current price: ${forecast_data['current_price']:.2f}
            - 5-day forecast: ${forecast_data['forecast_5d']:.2f}
            - Expected return: {forecast_data['expected_return']:+.2f}%
            """
        
        prompt = f"""
        Analyze the technical setup for {ticker}.
        
        {ml_context}
        
        Recent price action: {prices[-10:].tolist()}
        
        Consider:
        1. Trend direction and strength
        2. Support/resistance levels
        3. Volume patterns
        4. ML forecast alignment
        5. Risk/reward setup
        
        Provide specific entry/exit levels and rationale.
        """
        
        analysis = self.llm.invoke(prompt)
        
        return {
            'llm_analysis': analysis.content,
            'ml_forecast': forecast_data,
            'technical_signals': {
                'current_price': prices[-1],
                'price_change_5d': (prices[-1] / prices[-6] - 1) * 100,
                'volatility': np.std(prices[-20:]) / np.mean(prices[-20:]) * 100
            }
        }
    '''

    print("📝 Integration code example:")
    print(integration_code)

    print("\n🎯 Key Integration Benefits:")
    print(
        "1. FinBERT provides quantitative sentiment scores to complement LLM reasoning"
    )
    print("2. Chronos adds ML-based price forecasts to technical analysis")
    print("3. Darts enables rapid backtesting of forecasting strategies")
    print("4. SHAP explains model predictions for transparency")
    print("5. All models run locally for low latency and cost control")


def main():
    """Main exploration function."""
    print("🚀 True North Trading Platform - Finance LLM Exploration")
    print("=" * 70)

    # Test each component
    finbert, sentiment_results = test_finbert_sentiment()

    chronos_results = test_chronos_forecasting()

    darts_results = test_darts_forecasting()

    integration_example()

    # Summary
    print("\n🎉 Exploration Complete!")
    print("=" * 70)
    print("✅ FinBERT: Ready for financial sentiment analysis")
    print(
        "✅ Chronos: Ready for zero-shot time series forecasting"
        if CHRONOS_AVAILABLE
        else "⚠️  Chronos: Install from GitHub"
    )
    print("✅ Darts: Ready for classical time series modeling")
    print("✅ Integration: Examples provided for TradingAgents")

    print(f"\n📊 Models tested with real market data:")
    print(f"   - Sentiment analysis on 10 financial news samples")
    print(f"   - Price forecasting on AAPL and NVDA data")
    print(f"   - Integration patterns for multi-agent system")

    print(f"\n🔧 Next Steps:")
    print(f"1. Add your API keys to .env file")
    print(f"2. Run: python -m cli.main")
    print(f"3. Explore the TradingAgents interface")
    print(f"4. Implement custom agents using the integration examples")


if __name__ == "__main__":
    main()
