#!/usr/bin/env python3
"""
True North Trading Platform - Investment Dashboard
Complete overview of discovered opportunities and platform capabilities.
"""

import os
import sys
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()


def show_platform_status():
    """Show overall platform status and capabilities."""

    print("🚀 TRUE NORTH TRADING PLATFORM - INVESTMENT DASHBOARD")
    print("=" * 70)
    print(f"📅 {datetime.now().strftime('%A, %B %d, %Y at %H:%M')}")

    # API Status Check
    print("\n🔧 API STATUS")
    print("-" * 30)

    apis = {
        "OpenAI": os.getenv("OPENAI_API_KEY"),
        "News API": os.getenv("NEWS_API_KEY"),
        "Alpha Vantage": os.getenv("ALPHA_VANTAGE_API_KEY"),
        "Twitter": os.getenv("TWITTER_BEARER_TOKEN"),
        "Reddit": os.getenv("REDDIT_CLIENT_ID"),
        "Polygon": os.getenv("POLYGON_API_KEY"),
    }

    for api, key in apis.items():
        status = "✅ ACTIVE" if key and key != "your_key_here" else "❌ NOT CONFIGURED"
        print(f"{api:15}: {status}")

    # Cost Management Status
    print("\n💰 COST MANAGEMENT")
    print("-" * 30)

    try:
        from config.cost_profiles import get_cost_manager

        cost_manager = get_cost_manager()

        print(f"Profile: {cost_manager.current_profile.value.upper()}")
        print(f"Budget: ${cost_manager.config.monthly_budget}/month")
        print(f"Spend: ${cost_manager.monthly_spend:.2f}")

        enabled_features = sum(1 for f in cost_manager.config.features.values() if f)
        total_features = len(cost_manager.config.features)
        print(f"Features: {enabled_features}/{total_features} enabled")

    except Exception as e:
        print(f"❌ Error: {e}")


def show_discovery_capabilities():
    """Show investment discovery capabilities."""

    print("\n🔍 INVESTMENT DISCOVERY CAPABILITIES")
    print("-" * 50)

    capabilities = [
        (
            "📱 Reddit Analysis",
            "Scans r/investing, r/stocks, r/SecurityAnalysis for discussions",
        ),
        (
            "🐦 Twitter Sentiment",
            "Monitors financial Twitter for trending stocks and sentiment",
        ),
        (
            "📰 News Analysis",
            "Scans financial news for analyst upgrades and positive coverage",
        ),
        (
            "📊 Technical Screening",
            "Identifies momentum stocks with strong technical indicators",
        ),
        ("🌍 Global Markets", "Covers US, European, and Asian markets"),
        ("🤖 AI Analysis", "Multi-agent AI system provides investment recommendations"),
        ("⚠️  Risk Assessment", "AI risk manager evaluates each opportunity"),
        ("🎯 Smart Ranking", "Combines multiple signals to rank opportunities"),
    ]

    for capability, description in capabilities:
        print(f"{capability}: {description}")


def run_quick_discovery():
    """Run a quick discovery scan."""

    print("\n🔍 RUNNING QUICK DISCOVERY SCAN...")
    print("-" * 50)

    try:
        from continuous_discovery import ContinuousDiscovery

        discovery = ContinuousDiscovery()
        discovered = discovery.quick_discovery_scan()

        if discovered:
            print(f"\n✅ Found {len(discovered)} new opportunities!")

            # Show top 3
            sorted_discoveries = sorted(
                discovered.items(), key=lambda x: x[1]["score"], reverse=True
            )

            for i, (symbol, data) in enumerate(sorted_discoveries[:3], 1):
                print(f"\n🏆 #{i}. {symbol} (Score: {data['score']})")
                print(f"   📊 Sources: {', '.join(data['sources'])}")

                # Get current price
                try:
                    import yfinance as yf

                    ticker = yf.Ticker(symbol)
                    hist = ticker.history(period="1d")
                    if not hist.empty:
                        current_price = hist["Close"].iloc[-1]
                        print(f"   💰 Price: ${current_price:.2f}")
                except:
                    pass
        else:
            print("📊 No new opportunities found in this scan.")

    except Exception as e:
        print(f"❌ Discovery error: {e}")


def show_ai_analysis_sample():
    """Show a sample AI analysis."""

    print("\n🤖 AI ANALYSIS SAMPLE")
    print("-" * 30)

    if not os.getenv("OPENAI_API_KEY"):
        print("❌ OpenAI API key required for AI analysis")
        return

    try:
        from openai import OpenAI

        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        print("🧠 Generating market outlook...")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional market analyst. Provide a brief market outlook.",
                },
                {
                    "role": "user",
                    "content": "What are the key market trends investors should watch for the next month? Be concise.",
                },
            ],
            max_tokens=200,
        )

        analysis = response.choices[0].message.content
        print(f"\n💡 AI Market Outlook:")
        print(f"{analysis}")

    except Exception as e:
        print(f"❌ AI analysis error: {e}")


def show_watchlist():
    """Show current investment watchlist."""

    print("\n📊 CURRENT INVESTMENT WATCHLIST")
    print("-" * 40)

    try:
        from continuous_discovery import ContinuousDiscovery

        discovery = ContinuousDiscovery()

        if not discovery.watchlist:
            print("📝 Watchlist is empty. Run a discovery scan to populate it.")
            return

        top_opportunities = discovery.get_top_opportunities(5)

        for i, (symbol, data) in enumerate(top_opportunities, 1):
            print(f"\n🏆 #{i}. {symbol} (Score: {data['score']})")
            print(f"   📊 Sources: {', '.join(data['sources'])}")
            print(f"   🕒 Last Updated: {data['last_updated']}")

            # Get current market data
            try:
                import yfinance as yf

                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="5d")
                info = ticker.info

                if not hist.empty:
                    current_price = hist["Close"].iloc[-1]
                    prev_price = (
                        hist["Close"].iloc[-2] if len(hist) > 1 else current_price
                    )
                    change = ((current_price - prev_price) / prev_price) * 100

                    print(f"   💰 Price: ${current_price:.2f} ({change:+.2f}%)")
                    print(f"   🏢 Company: {info.get('longName', symbol)}")

            except:
                pass

    except Exception as e:
        print(f"❌ Watchlist error: {e}")


def show_usage_guide():
    """Show how to use the platform."""

    print("\n📖 HOW TO USE YOUR PLATFORM")
    print("-" * 40)

    commands = [
        ("🔍 Discover Investments", "python discover_investments.py"),
        ("📊 Quick Scan", "python continuous_discovery.py --scan"),
        ("👀 View Watchlist", "python continuous_discovery.py --watch"),
        ("📈 Analyze Stock", "python analyze_stock.py AAPL"),
        ("💰 Check Costs", "python scripts/cost_management.py status"),
        ("🎯 Full Demo", "python demo_platform.py"),
        ("📋 This Dashboard", "python investment_dashboard.py"),
    ]

    for description, command in commands:
        print(f"{description:20}: {command}")

    print(f"\n💡 TIPS:")
    print("• The platform automatically discovers stocks from multiple sources")
    print("• AI agents analyze each opportunity with buy/sell recommendations")
    print("• Cost management keeps your API spending under control")
    print("• International stocks are included (European, Asian markets)")
    print("• Run scans regularly to catch new opportunities")


def main():
    """Main dashboard function."""

    # Show platform status
    show_platform_status()

    # Show discovery capabilities
    show_discovery_capabilities()

    # Show current watchlist
    show_watchlist()

    # Run quick discovery
    run_quick_discovery()

    # Show AI analysis sample
    show_ai_analysis_sample()

    # Show usage guide
    show_usage_guide()

    print(f"\n🎉 YOUR TRUE NORTH TRADING PLATFORM IS OPERATIONAL!")
    print("🌍 Ready to discover global investment opportunities automatically!")


if __name__ == "__main__":
    main()
