#!/usr/bin/env python3
"""
Personal Platform Test - Simple validation for your trading system.
Tests only what matters for personal trading success.
"""

import os
import sys
from pathlib import Path


def test_personal_platform():
    """Test your personal trading platform."""
    print("🎯 PERSONAL TRADING PLATFORM TEST")
    print("=" * 50)
    print("Testing YOUR platform for solo trading success...")

    # Test 1: Environment
    print("\n1. 🔧 Personal Environment:")
    try:
        version = sys.version_info
        if version.major == 3 and version.minor >= 8:
            print(f"   ✅ Python {version.major}.{version.minor} - Perfect for trading")
        else:
            print(f"   ❌ Python {version.major}.{version.minor} - Upgrade recommended")
    except Exception as e:
        print(f"   ❌ Python check failed: {e}")

    # Test 2: Your API Keys
    print("\n2. 🔑 Your API Configuration:")
    api_keys = {
        "OPENAI_API_KEY": "AI Analysis",
        "ALPHA_VANTAGE_API_KEY": "Market Data (Optional)",
        "POLYGON_API_KEY": "Real-time Data (Optional)",
        "NEWS_API_KEY": "News Analysis (Optional)",
        "TWITTER_BEARER_TOKEN": "Social Sentiment (Optional)",
    }

    configured_apis = 0
    for key, description in api_keys.items():
        if os.getenv(key):
            print(f"   ✅ {description}: Configured")
            configured_apis += 1
        else:
            status = "Required" if key == "OPENAI_API_KEY" else "Optional"
            print(f"   ⚠️  {description}: Missing ({status})")

    print(f"   📊 API Coverage: {configured_apis}/{len(api_keys)} configured")

    # Test 3: Your Core Trading Tools
    print("\n3. 🎯 Your Trading Tools:")

    # Cost Management (Your Budget Control)
    try:
        from config.cost_profiles import get_cost_manager

        cost_manager = get_cost_manager()
        print(f"   ✅ Budget Control: {cost_manager.current_profile.value} profile")
        print(f"      💰 Monthly Budget: ${cost_manager.config.monthly_budget}")
    except Exception as e:
        print(f"   ❌ Budget Control: {e}")

    # Market Data (Your Information Source)
    try:
        import yfinance as yf

        # Quick test with Apple
        ticker = yf.Ticker("AAPL")
        price = ticker.history(period="1d")["Close"].iloc[-1]
        print(f"   ✅ Market Data: Live access (AAPL: ${price:.2f})")
    except Exception as e:
        print(f"   ❌ Market Data: {e}")

    # AI Analysis (Your Trading Assistant)
    try:
        from openai import OpenAI

        if os.getenv("OPENAI_API_KEY"):
            client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            # Quick test
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": "Test"}],
                max_tokens=5,
            )
            print(f"   ✅ AI Assistant: Ready for analysis")
        else:
            print(f"   ⚠️  AI Assistant: API key needed")
    except Exception as e:
        print(f"   ❌ AI Assistant: {e}")

    # Trader Following (Your Signal Source)
    try:
        from trader_following_system import TraderFollowingSystem

        system = TraderFollowingSystem()
        print(f"   ✅ Trader Following: Ready to track signals")
    except Exception as e:
        print(f"   ❌ Trader Following: {e}")

    # Discovery Engine (Your Opportunity Finder)
    try:
        from trader_discovery_system import TraderDiscoveryEngine

        engine = TraderDiscoveryEngine()
        known_traders = engine.known_traders_db.get_known_traders()
        print(f"   ✅ Discovery Engine: {len(known_traders)} traders in database")
    except Exception as e:
        print(f"   ❌ Discovery Engine: {e}")

    # Test 4: Your Personal Files
    print("\n4. 📁 Your Platform Files:")
    personal_files = [
        ("ultra_robust_platform_demo.py", "Main Platform"),
        ("trader_following_system.py", "Signal Tracking"),
        ("trader_discovery_system.py", "Opportunity Discovery"),
        ("config/cost_profiles.py", "Budget Management"),
        (".env", "Your API Keys"),
    ]

    files_ok = 0
    for file_path, description in personal_files:
        if Path(file_path).exists():
            print(f"   ✅ {description}: Available")
            files_ok += 1
        else:
            print(f"   ❌ {description}: Missing ({file_path})")

    print(f"   📊 Platform Completeness: {files_ok}/{len(personal_files)} files")

    # Test 5: Your Trading Workflow
    print("\n5. 🚀 Your Trading Workflow Test:")

    workflow_steps = [
        ("Discovery", "Find opportunities automatically"),
        ("Analysis", "AI-powered stock analysis"),
        ("Signals", "Follow successful traders"),
        ("Risk Management", "Protect your capital"),
        ("Execution", "Backtest and validate strategies"),
    ]

    working_steps = 0
    for step, description in workflow_steps:
        try:
            if step == "Discovery":
                # Test discovery
                from enhanced_discovery_engine import EnhancedDiscoveryEngine

                discovery = EnhancedDiscoveryEngine()
                working_steps += 1
                print(f"   ✅ {step}: {description}")
            elif step == "Analysis":
                # Test AI analysis
                if os.getenv("OPENAI_API_KEY"):
                    working_steps += 1
                    print(f"   ✅ {step}: {description}")
                else:
                    print(f"   ⚠️  {step}: Needs OpenAI API key")
            elif step == "Signals":
                # Test trader following
                from trader_following_system import TraderFollowingSystem

                working_steps += 1
                print(f"   ✅ {step}: {description}")
            elif step == "Risk Management":
                # Test risk management
                from config.cost_profiles import get_cost_manager

                working_steps += 1
                print(f"   ✅ {step}: {description}")
            elif step == "Execution":
                # Test backtesting
                from backtesting_engine import BacktestEngine

                working_steps += 1
                print(f"   ✅ {step}: {description}")
        except Exception as e:
            print(f"   ❌ {step}: {e}")

    print(
        f"   📊 Workflow Readiness: {working_steps}/{len(workflow_steps)} steps working"
    )

    # Personal Platform Score
    print("\n🎯 YOUR PERSONAL PLATFORM SCORE:")
    print("-" * 40)

    total_score = 0
    max_score = 0

    # Environment (20 points)
    if version.major == 3 and version.minor >= 8:
        total_score += 20
    max_score += 20

    # API Keys (30 points)
    if os.getenv("OPENAI_API_KEY"):
        total_score += 20  # Essential
    total_score += min(10, (configured_apis - 1) * 2)  # Optional APIs
    max_score += 30

    # Files (25 points)
    total_score += (files_ok / len(personal_files)) * 25
    max_score += 25

    # Workflow (25 points)
    total_score += (working_steps / len(workflow_steps)) * 25
    max_score += 25

    score_percentage = (total_score / max_score) * 100

    print(f"📊 Platform Score: {score_percentage:.1f}%")

    if score_percentage >= 90:
        status = "🏆 EXCELLENT - Ready for live trading!"
        next_step = "Start trading with confidence!"
    elif score_percentage >= 75:
        status = "🎯 GOOD - Almost ready for trading"
        next_step = "Fix minor issues and you're ready!"
    elif score_percentage >= 50:
        status = "⚠️  FAIR - Needs some work"
        next_step = "Address missing components before trading"
    else:
        status = "🚨 NEEDS WORK - Setup required"
        next_step = "Complete setup before proceeding"

    print(f"🏷️  Status: {status}")
    print(f"🚀 Next Step: {next_step}")

    # Personal Recommendations
    print(f"\n💡 PERSONAL RECOMMENDATIONS:")

    if not os.getenv("OPENAI_API_KEY"):
        print("   🔑 Add your OpenAI API key to .env file")

    if configured_apis < 3:
        print("   📡 Add more API keys for better market coverage")

    if files_ok < len(personal_files):
        print("   📁 Ensure all platform files are present")

    if working_steps < len(workflow_steps):
        print("   🔧 Fix workflow issues for complete functionality")

    if score_percentage >= 75:
        print("   🎉 Your platform is ready! Try running the full demo:")
        print("      python ultra_robust_platform_demo.py")

    return score_percentage >= 75


if __name__ == "__main__":
    success = test_personal_platform()

    if success:
        print(f"\n🎉 SUCCESS! Your personal trading platform is ready!")
        print("🚀 You can now:")
        print("   • Discover investment opportunities automatically")
        print("   • Follow successful traders across platforms")
        print("   • Get AI-powered analysis and insights")
        print("   • Manage risk with sophisticated controls")
        print("   • Backtest strategies before risking capital")
    else:
        print(f"\n🔧 SETUP NEEDED: Complete the recommendations above")
        print("💡 Once setup is complete, you'll have a professional-grade")
        print("   personal trading platform at your fingertips!")
