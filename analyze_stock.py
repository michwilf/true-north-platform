#!/usr/bin/env python3
"""
Stock Analysis Demo - Shows AI-powered multi-agent analysis
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()


def analyze_stock(symbol="AAPL"):
    """Analyze a stock using AI agents and market data."""

    print(f"🔍 True North Trading Platform - Analyzing {symbol}")
    print("=" * 60)

    # Step 1: Market Data Analysis
    print(f"\n📊 Step 1: Market Data Analysis for {symbol}")
    try:
        import yfinance as yf

        ticker = yf.Ticker(symbol)
        info = ticker.info
        hist = ticker.history(period="30d")

        current_price = hist["Close"].iloc[-1]
        prev_price = hist["Close"].iloc[-2]
        change = ((current_price - prev_price) / prev_price) * 100

        # Technical indicators
        sma_20 = hist["Close"].rolling(window=20).mean().iloc[-1]
        volume_avg = hist["Volume"].rolling(window=20).mean().iloc[-1]
        current_volume = hist["Volume"].iloc[-1]

        print(f"   📈 Current Price: ${current_price:.2f} ({change:+.2f}%)")
        print(f"   🏢 Company: {info.get('longName', symbol)}")
        print(f"   💰 Market Cap: ${info.get('marketCap', 0):,}")
        print(f"   📊 20-Day SMA: ${sma_20:.2f}")
        print(f"   📦 Volume: {current_volume:,} (Avg: {volume_avg:,.0f})")

        # Technical signals
        price_vs_sma = "ABOVE" if current_price > sma_20 else "BELOW"
        volume_signal = "HIGH" if current_volume > volume_avg * 1.2 else "NORMAL"

        market_data = {
            "symbol": symbol,
            "price": current_price,
            "change": change,
            "sma_20": sma_20,
            "price_vs_sma": price_vs_sma,
            "volume_signal": volume_signal,
            "market_cap": info.get("marketCap", 0),
            "company": info.get("longName", symbol),
        }

    except Exception as e:
        print(f"   ❌ Market Data Error: {e}")
        return

    # Step 2: AI Market Analyst
    print(f"\n🤖 Step 2: AI Market Analyst")
    try:
        from openai import OpenAI

        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        analyst_prompt = f"""
        You are a professional market analyst. Analyze {symbol} based on this data:
        
        Current Price: ${current_price:.2f} ({change:+.2f}%)
        20-Day SMA: ${sma_20:.2f} (Price is {price_vs_sma} SMA)
        Volume: {volume_signal}
        Market Cap: ${info.get('marketCap', 0):,}
        
        Provide a concise technical analysis with:
        1. Technical outlook (2-3 sentences)
        2. Key support/resistance levels
        3. Short-term trend assessment
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional market analyst. Be concise and actionable.",
                },
                {"role": "user", "content": analyst_prompt},
            ],
            max_tokens=300,
        )

        analyst_view = response.choices[0].message.content
        print(f"   📈 Market Analyst Report:")
        print(f"   {analyst_view}")

    except Exception as e:
        print(f"   ❌ AI Analyst Error: {e}")
        analyst_view = "AI analysis unavailable"

    # Step 3: AI Risk Manager
    print(f"\n⚠️  Step 3: AI Risk Manager")
    try:
        risk_prompt = f"""
        You are a risk management specialist. Assess the risk for {symbol}:
        
        Current Price: ${current_price:.2f} ({change:+.2f}%)
        Market Cap: ${info.get('marketCap', 0):,}
        Recent volatility: {abs(change):.2f}%
        
        Provide:
        1. Risk level (LOW/MEDIUM/HIGH)
        2. Key risk factors
        3. Recommended position size (% of portfolio)
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a conservative risk manager. Prioritize capital preservation.",
                },
                {"role": "user", "content": risk_prompt},
            ],
            max_tokens=200,
        )

        risk_assessment = response.choices[0].message.content
        print(f"   ⚠️  Risk Assessment:")
        print(f"   {risk_assessment}")

    except Exception as e:
        print(f"   ❌ Risk Manager Error: {e}")
        risk_assessment = "Risk analysis unavailable"

    # Step 4: AI Trader Decision
    print(f"\n🎯 Step 4: AI Trader Decision")
    try:
        trader_prompt = f"""
        You are a professional trader making a final decision on {symbol}.
        
        Market Analysis: {analyst_view[:200]}...
        Risk Assessment: {risk_assessment[:200]}...
        
        Current technical setup:
        - Price vs 20-day SMA: {price_vs_sma}
        - Volume: {volume_signal}
        - Recent change: {change:+.2f}%
        
        Provide your final recommendation:
        1. Action: BUY/HOLD/SELL
        2. Confidence level (1-10)
        3. Target price (if buying)
        4. Stop loss level
        5. Time horizon
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are an experienced trader. Make clear, actionable decisions.",
                },
                {"role": "user", "content": trader_prompt},
            ],
            max_tokens=250,
        )

        trader_decision = response.choices[0].message.content
        print(f"   🎯 Final Trading Decision:")
        print(f"   {trader_decision}")

    except Exception as e:
        print(f"   ❌ Trader Decision Error: {e}")

    # Summary
    print(f"\n📋 Analysis Summary for {symbol}")
    print("=" * 40)
    print(f"💰 Current Price: ${current_price:.2f} ({change:+.2f}%)")
    print(f"📊 Technical: Price {price_vs_sma} 20-day SMA")
    print(f"📦 Volume: {volume_signal}")
    print(f"🤖 AI Analysis: Complete")
    print(f"⚠️  Risk Assessment: Complete")
    print(f"🎯 Trading Decision: Complete")

    print(f"\n✅ Multi-Agent Analysis Complete!")
    print("💡 This demonstrates your platform's AI-powered decision making system.")


if __name__ == "__main__":
    import sys

    symbol = sys.argv[1] if len(sys.argv) > 1 else "AAPL"
    analyze_stock(symbol)
