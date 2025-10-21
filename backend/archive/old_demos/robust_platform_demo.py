#!/usr/bin/env python3
"""
True North Trading Platform - Comprehensive Robust Platform Demo
Showcases all advanced features and capabilities.
"""

import os
import sys
import asyncio
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()


def show_platform_overview():
    """Show comprehensive platform overview."""
    print("🚀 TRUE NORTH TRADING PLATFORM - COMPREHENSIVE OVERVIEW")
    print("=" * 80)
    print(f"📅 {datetime.now().strftime('%A, %B %d, %Y at %H:%M')}")
    print("🌍 Advanced AI-Powered Investment Discovery & Trading Platform")

    print("\n🎯 PLATFORM CAPABILITIES")
    print("-" * 50)

    capabilities = [
        (
            "🔍 Enhanced Discovery Engine",
            "Multi-source AI discovery with sentiment analysis",
        ),
        (
            "📊 Advanced Technical Analysis",
            "RSI, MACD, Bollinger Bands, momentum indicators",
        ),
        ("💼 Fundamental Screening", "P/E, ROE, debt ratios, revenue growth analysis"),
        ("📱 Social Media Intelligence", "Reddit & Twitter sentiment with ML analysis"),
        ("📰 News Analysis", "Financial news with source credibility weighting"),
        ("🌍 Global Market Coverage", "US, European, Asian, and emerging markets"),
        ("🤖 Multi-Agent AI System", "Market analyst, risk manager, trader agents"),
        ("📈 Backtesting Engine", "Strategy validation with comprehensive metrics"),
        ("🔔 Real-time Monitoring", "Price, volume, technical, and news alerts"),
        ("💰 Cost Management", "API usage control with budget profiles"),
        ("⚖️ Risk Management", "Volatility analysis, position sizing, drawdown control"),
        ("📊 Sector Rotation Analysis", "Identify trending sectors and themes"),
        ("📅 Earnings Calendar", "Track upcoming earnings announcements"),
        ("👥 Insider Trading Tracking", "Monitor insider activity and SEC filings"),
        ("🔄 Continuous Learning", "Adaptive algorithms and performance tracking"),
    ]

    for capability, description in capabilities:
        print(f"{capability}: {description}")


def show_technical_architecture():
    """Show technical architecture details."""
    print("\n🏗️ TECHNICAL ARCHITECTURE")
    print("-" * 40)

    architecture = [
        ("🐍 Core Language", "Python 3.9+ with async/await support"),
        ("🤖 AI/ML Stack", "OpenAI GPT-4, scikit-learn, pandas, numpy"),
        (
            "📊 Data Sources",
            "yfinance, Alpha Vantage, Polygon, NewsAPI, Reddit, Twitter",
        ),
        ("⚡ Async Processing", "aiohttp, asyncio for parallel data collection"),
        ("📈 Technical Analysis", "Custom indicators with numpy/pandas optimization"),
        ("💾 Data Storage", "JSON, CSV, with optional database integration"),
        ("🔔 Alerting", "Email, Slack, Discord, Telegram webhooks"),
        ("📊 Visualization", "Matplotlib, plotly for charts and reports"),
        ("🧪 Testing", "pytest, comprehensive unit and integration tests"),
        ("📝 Logging", "Structured logging with file and console output"),
        ("🔒 Security", "Environment variables, API key management"),
        ("🚀 Deployment", "Docker-ready, cloud-native architecture"),
    ]

    for component, description in architecture:
        print(f"{component}: {description}")


def show_discovery_features():
    """Show advanced discovery features."""
    print("\n🔍 ADVANCED DISCOVERY FEATURES")
    print("-" * 45)

    features = [
        (
            "Multi-Source Intelligence",
            [
                "Reddit sentiment analysis across 10+ investment subreddits",
                "Twitter monitoring with engagement-weighted sentiment",
                "Financial news from Bloomberg, Reuters, WSJ, CNBC",
                "Technical screening across 100+ global stocks",
                "Fundamental analysis with financial ratios",
                "Sector rotation and momentum analysis",
            ],
        ),
        (
            "AI-Powered Analysis",
            [
                "GPT-4 powered investment recommendations",
                "Multi-agent decision making system",
                "Confidence scoring and risk assessment",
                "Target price and stop-loss suggestions",
                "Market regime detection (Bull/Bear/Neutral/Volatile)",
            ],
        ),
        (
            "Risk Management",
            [
                "Volatility-adjusted position sizing",
                "Maximum drawdown monitoring",
                "Beta and correlation analysis",
                "Sector concentration limits",
                "Cost-aware API usage controls",
            ],
        ),
        (
            "Global Coverage",
            [
                "US markets (NYSE, NASDAQ)",
                "European markets (LSE, Euronext, XETRA)",
                "Asian markets (TSE, HKEX, SSE)",
                "Emerging markets (Brazil, India, etc.)",
                "Cryptocurrency-related stocks",
                "ETFs and sector funds",
            ],
        ),
    ]

    for category, items in features:
        print(f"\n📋 {category}:")
        for item in items:
            print(f"   • {item}")


def show_monitoring_capabilities():
    """Show monitoring and alerting capabilities."""
    print("\n🔔 MONITORING & ALERTING SYSTEM")
    print("-" * 45)

    monitoring = [
        (
            "Price Alerts",
            [
                "Above/below threshold notifications",
                "Percentage change alerts",
                "Support/resistance level breaks",
                "Moving average crossovers",
            ],
        ),
        (
            "Volume Alerts",
            [
                "Volume surge detection (1.5x, 2x, 3x average)",
                "Unusual trading activity",
                "Breakout confirmation signals",
            ],
        ),
        (
            "Technical Alerts",
            [
                "RSI oversold/overbought conditions",
                "MACD bullish/bearish crossovers",
                "Bollinger Band squeeze/expansion",
                "Golden cross / Death cross signals",
            ],
        ),
        (
            "News & Events",
            [
                "Earnings announcement reminders",
                "Analyst upgrade/downgrade alerts",
                "Significant news keyword detection",
                "Insider trading activity notifications",
            ],
        ),
        (
            "Delivery Methods",
            [
                "Email notifications with detailed reports",
                "Slack integration for team collaboration",
                "Discord webhooks for community alerts",
                "Telegram bot for mobile notifications",
                "SMS alerts for critical events (optional)",
            ],
        ),
    ]

    for category, items in monitoring:
        print(f"\n📊 {category}:")
        for item in items:
            print(f"   • {item}")


def show_backtesting_features():
    """Show backtesting and strategy validation features."""
    print("\n📈 BACKTESTING & STRATEGY VALIDATION")
    print("-" * 45)

    backtesting = [
        (
            "Strategy Types",
            [
                "Momentum strategies (moving average crossovers)",
                "Mean reversion strategies (Bollinger Bands, RSI)",
                "Breakout strategies (support/resistance levels)",
                "Custom strategy development framework",
            ],
        ),
        (
            "Performance Metrics",
            [
                "Total return and annualized return",
                "Sharpe ratio and Sortino ratio",
                "Maximum drawdown and recovery time",
                "Win rate and profit factor",
                "Average win/loss and largest win/loss",
                "Volatility and Beta analysis",
            ],
        ),
        (
            "Risk Analysis",
            [
                "Value at Risk (VaR) calculations",
                "Maximum adverse/favorable excursion",
                "Drawdown duration analysis",
                "Monte Carlo simulations",
                "Stress testing scenarios",
            ],
        ),
        (
            "Optimization",
            [
                "Parameter optimization with grid search",
                "Walk-forward analysis",
                "Out-of-sample testing",
                "Strategy comparison and ranking",
                "Portfolio-level backtesting",
            ],
        ),
    ]

    for category, items in backtesting:
        print(f"\n📊 {category}:")
        for item in items:
            print(f"   • {item}")


def show_cost_management():
    """Show cost management features."""
    print("\n💰 COST MANAGEMENT SYSTEM")
    print("-" * 35)

    cost_features = [
        (
            "Cost Profiles",
            [
                "LEAN: $0-10/month (basic features, free APIs)",
                "STANDARD: $10-50/month (balanced features)",
                "PRO: $50+/month (all features, premium APIs)",
            ],
        ),
        (
            "API Controls",
            [
                "Rate limiting per API (requests/minute, requests/day)",
                "Monthly budget limits per API service",
                "Automatic throttling when limits approached",
                "Usage tracking and reporting",
            ],
        ),
        (
            "Smart Optimization",
            [
                "Model selection based on cost profile",
                "Debate rounds adjustment for cost control",
                "Batch processing for efficiency",
                "Caching to reduce redundant API calls",
            ],
        ),
        (
            "Monitoring",
            [
                "Real-time spending tracking",
                "Budget alerts at 60%, 80%, 90% usage",
                "Daily/weekly/monthly usage reports",
                "Cost per operation analysis",
            ],
        ),
    ]

    for category, items in cost_features:
        print(f"\n📊 {category}:")
        for item in items:
            print(f"   • {item}")


async def run_live_demo():
    """Run a live demonstration of platform capabilities."""
    print("\n🎬 LIVE PLATFORM DEMONSTRATION")
    print("-" * 40)

    try:
        # 1. Cost Management Demo
        print("\n💰 1. Cost Management System")
        try:
            from config.cost_profiles import get_cost_manager

            cost_manager = get_cost_manager()
            print(f"   ✅ Active Profile: {cost_manager.current_profile.value.upper()}")
            print(f"   💰 Monthly Budget: ${cost_manager.config.monthly_budget}")
            print(f"   📊 Current Spend: ${cost_manager.monthly_spend:.2f}")
        except Exception as e:
            print(f"   ❌ Error: {e}")

        # 2. Market Data Integration
        print("\n📊 2. Market Data Integration")
        try:
            import yfinance as yf

            ticker = yf.Ticker("AAPL")
            info = ticker.info
            hist = ticker.history(period="5d")

            if not hist.empty:
                current_price = hist["Close"].iloc[-1]
                prev_price = hist["Close"].iloc[-2]
                change = ((current_price - prev_price) / prev_price) * 100

                print(f"   ✅ Live Data: AAPL ${current_price:.2f} ({change:+.2f}%)")
                print(f"   🏢 Company: {info.get('longName', 'Apple Inc.')}")
                print(f"   💰 Market Cap: ${info.get('marketCap', 0):,}")
            else:
                print("   ⚠️  No market data available")
        except Exception as e:
            print(f"   ❌ Market Data Error: {e}")

        # 3. AI Analysis Demo
        print("\n🤖 3. AI Analysis System")
        if os.getenv("OPENAI_API_KEY"):
            try:
                from openai import OpenAI

                client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {
                            "role": "system",
                            "content": "You are a financial analyst. Be concise.",
                        },
                        {
                            "role": "user",
                            "content": "What are 3 key factors driving current market sentiment?",
                        },
                    ],
                    max_tokens=150,
                )

                print("   ✅ AI Analysis Active")
                print(f"   💡 Market Insight: {response.choices[0].message.content}")
            except Exception as e:
                print(f"   ❌ AI Analysis Error: {e}")
        else:
            print("   ❌ OpenAI API key not configured")

        # 4. Discovery Engine Demo
        print("\n🔍 4. Discovery Engine Sample")
        try:
            from continuous_discovery import ContinuousDiscovery

            discovery = ContinuousDiscovery()

            if discovery.watchlist:
                top_opportunity = next(iter(discovery.watchlist.items()))
                symbol, data = top_opportunity
                print(
                    f"   ✅ Watchlist Active: {len(discovery.watchlist)} opportunities"
                )
                print(f"   🏆 Top Pick: {symbol} (Score: {data.get('score', 'N/A')})")
                print(f"   📊 Sources: {', '.join(data.get('sources', []))}")
            else:
                print("   📝 Watchlist empty - run discovery scan to populate")
        except Exception as e:
            print(f"   ❌ Discovery Error: {e}")

        # 5. Technical Analysis Demo
        print("\n📈 5. Technical Analysis")
        try:
            import numpy as np

            # Simple RSI calculation demo
            if "hist" in locals() and not hist.empty:
                closes = hist["Close"].values
                deltas = np.diff(closes)
                gains = np.where(deltas > 0, deltas, 0)
                losses = np.where(deltas < 0, -deltas, 0)

                avg_gain = np.mean(gains[-14:]) if len(gains) >= 14 else np.mean(gains)
                avg_loss = (
                    np.mean(losses[-14:]) if len(losses) >= 14 else np.mean(losses)
                )

                if avg_loss > 0:
                    rs = avg_gain / avg_loss
                    rsi = 100 - (100 / (1 + rs))

                    print(f"   ✅ Technical Analysis: RSI = {rsi:.1f}")
                    if rsi < 30:
                        print("   📊 Signal: Oversold condition")
                    elif rsi > 70:
                        print("   📊 Signal: Overbought condition")
                    else:
                        print("   📊 Signal: Neutral territory")
                else:
                    print("   📊 Technical Analysis: Insufficient data for RSI")
            else:
                print("   ⚠️  No price data for technical analysis")
        except Exception as e:
            print(f"   ❌ Technical Analysis Error: {e}")

    except Exception as e:
        print(f"❌ Demo Error: {e}")


def show_usage_examples():
    """Show practical usage examples."""
    print("\n📖 PRACTICAL USAGE EXAMPLES")
    print("-" * 40)

    examples = [
        (
            "Daily Discovery Scan",
            [
                "python enhanced_discovery_engine.py",
                "# Comprehensive multi-source discovery",
                "# AI analysis of top opportunities",
                "# Risk-adjusted scoring and ranking",
            ],
        ),
        (
            "Continuous Monitoring",
            [
                "python monitoring_system.py --continuous",
                "# Real-time price and volume alerts",
                "# Technical indicator notifications",
                "# News and earnings alerts",
            ],
        ),
        (
            "Strategy Backtesting",
            [
                "python backtesting_engine.py",
                "# Test momentum, mean reversion strategies",
                "# Comprehensive performance metrics",
                "# Parameter optimization",
            ],
        ),
        (
            "Cost Management",
            [
                "python scripts/cost_management.py status",
                "python scripts/cost_management.py switch pro",
                "# Monitor API usage and costs",
                "# Switch between cost profiles",
            ],
        ),
        (
            "Quick Analysis",
            [
                "python analyze_stock.py TSLA",
                "# Multi-agent analysis of specific stock",
                "# Technical, fundamental, sentiment analysis",
                "# AI recommendation with confidence",
            ],
        ),
    ]

    for example, commands in examples:
        print(f"\n🔧 {example}:")
        for command in commands:
            if command.startswith("#"):
                print(f"   {command}")
            else:
                print(f"   $ {command}")


def show_next_steps():
    """Show recommended next steps."""
    print("\n🚀 RECOMMENDED NEXT STEPS")
    print("-" * 35)

    steps = [
        (
            "🔧 Setup & Configuration",
            [
                "Configure additional API keys (Alpha Vantage, Polygon, News API)",
                "Set up email/webhook notifications for alerts",
                "Choose appropriate cost profile for your needs",
                "Customize monitoring thresholds and watchlists",
            ],
        ),
        (
            "📊 Strategy Development",
            [
                "Backtest existing strategies on your preferred stocks",
                "Develop custom trading strategies using the framework",
                "Optimize parameters for your risk tolerance",
                "Set up paper trading to validate strategies",
            ],
        ),
        (
            "🔔 Monitoring Setup",
            [
                "Add your portfolio stocks to monitoring system",
                "Configure price, volume, and technical alerts",
                "Set up earnings calendar notifications",
                "Enable social sentiment monitoring",
            ],
        ),
        (
            "🎯 Advanced Features",
            [
                "Implement portfolio-level risk management",
                "Set up automated rebalancing strategies",
                "Integrate with your broker's API for live trading",
                "Develop sector rotation strategies",
            ],
        ),
    ]

    for category, items in steps:
        print(f"\n{category}:")
        for item in items:
            print(f"   • {item}")


async def main():
    """Main demonstration function."""
    show_platform_overview()
    show_technical_architecture()
    show_discovery_features()
    show_monitoring_capabilities()
    show_backtesting_features()
    show_cost_management()

    await run_live_demo()

    show_usage_examples()
    show_next_steps()

    print("\n" + "=" * 80)
    print("🎉 TRUE NORTH TRADING PLATFORM - COMPREHENSIVE DEMO COMPLETE")
    print("🌟 Your platform is now equipped with institutional-grade capabilities!")
    print("💡 Ready to discover, analyze, and trade with AI-powered intelligence.")
    print("=" * 80)


if __name__ == "__main__":
    asyncio.run(main())
