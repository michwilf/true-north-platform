#!/usr/bin/env python3
'''
Test Script for True North Trading Platform Setup

Verifies that all components are working correctly:
- Core TradingAgents functionality
- Finance LLMs
- Time series models
- Data sources
'''

import sys
import importlib
from pathlib import Path

def test_import(module_name, description=""):
    '''Test if a module can be imported.'''
    try:
        importlib.import_module(module_name)
        print(f"✅ {description or module_name}")
        return True
    except ImportError as e:
        print(f"❌ {description or module_name}: {e}")
        return False

def test_tradingagents():
    '''Test TradingAgents core functionality.'''
    print("\n🧪 Testing TradingAgents Core...")
    
    success = True
    success &= test_import("tradingagents", "TradingAgents core")
    success &= test_import("langchain_openai", "LangChain OpenAI")
    success &= test_import("langgraph", "LangGraph")
    success &= test_import("pandas", "Pandas")
    success &= test_import("yfinance", "Yahoo Finance")
    
    return success

def test_finance_llms():
    '''Test finance-tuned LLMs.'''
    print("\n🤖 Testing Finance LLMs...")
    
    success = True
    success &= test_import("transformers", "Transformers")
    success &= test_import("torch", "PyTorch")
    
    # Test FinBERT
    try:
        from transformers import pipeline
        classifier = pipeline("text-classification", model="ProsusAI/finbert")
        result = classifier("The stock price is rising.")
        print(f"✅ FinBERT sentiment test: {result[0]['label']}")
    except Exception as e:
        print(f"❌ FinBERT test failed: {e}")
        success = False
    
    return success

def test_forecasting_models():
    '''Test time series forecasting models.'''
    print("\n📈 Testing Forecasting Models...")
    
    success = True
    success &= test_import("neuralforecast", "NeuralForecast")
    success &= test_import("darts", "Darts")
    
    # Test basic forecasting
    try:
        import pandas as pd
        import numpy as np
        from darts import TimeSeries
        from darts.models import ExponentialSmoothing
        
        # Create sample data
        dates = pd.date_range('2020-01-01', periods=100, freq='D')
        values = np.random.randn(100).cumsum()
        ts = TimeSeries.from_pandas(pd.Series(values, index=dates))
        
        # Fit simple model
        model = ExponentialSmoothing()
        model.fit(ts[:-10])
        forecast = model.predict(10)
        
        print(f"✅ Darts forecasting test: predicted {len(forecast)} points")
    except Exception as e:
        print(f"❌ Forecasting test failed: {e}")
        success = False
    
    return success

def test_data_sources():
    '''Test data source connections.'''
    print("\n📊 Testing Data Sources...")
    
    success = True
    
    # Test Yahoo Finance
    try:
        import yfinance as yf
        ticker = yf.Ticker("AAPL")
        info = ticker.info
        print(f"✅ Yahoo Finance: Retrieved AAPL data")
    except Exception as e:
        print(f"❌ Yahoo Finance test failed: {e}")
        success = False
    
    return success

def main():
    print("🧪 True North Trading Platform - Setup Verification")
    print("=" * 60)
    
    all_tests = [
        test_tradingagents,
        test_finance_llms, 
        test_forecasting_models,
        test_data_sources,
    ]
    
    results = []
    for test_func in all_tests:
        try:
            result = test_func()
            results.append(result)
        except Exception as e:
            print(f"❌ Test {test_func.__name__} crashed: {e}")
            results.append(False)
    
    passed = sum(results)
    total = len(results)
    
    print(f"\n📊 Test Summary: {passed}/{total} test suites passed")
    
    if passed == total:
        print("🎉 All tests passed! Your environment is ready.")
        print("\nNext steps:")
        print("1. Set up your API keys in .env")
        print("2. Run: python -m cli.main")
        print("3. Start trading!")
    else:
        print("⚠️  Some tests failed. Check the output above.")
        print("You may need to install additional packages or check your configuration.")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
