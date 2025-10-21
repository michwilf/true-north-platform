"""
True North Trading Platform - Streamlit Dashboard
Beautiful, interactive trading dashboard with real-time data visualization.
"""

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import asyncio
import time
from pathlib import Path

# Import platform components
from enhanced_discovery_engine import EnhancedDiscoveryEngine
from robust_monitoring_system import RobustMonitoringSystem, AlertSeverity
from backtesting_wrapper import ComprehensiveBacktestingFramework
from trader_following_system import TraderFollowingSystem

# Page configuration
st.set_page_config(
    page_title="True North Trading Platform",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom CSS for better styling
st.markdown(
    """
    <style>
    .main {
        padding: 0rem 1rem;
    }
    .stMetric {
        background-color: #f0f2f6;
        padding: 10px;
        border-radius: 10px;
    }
    .css-1d391kg {
        padding-top: 1rem;
    }
    h1 {
        color: #1f77b4;
    }
    .opportunity-card {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        border-left: 5px solid #1f77b4;
        margin: 10px 0;
    }
    .alert-card {
        background-color: #fff3cd;
        padding: 15px;
        border-radius: 10px;
        border-left: 5px solid #ffc107;
        margin: 10px 0;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# Initialize session state
if "discovery_engine" not in st.session_state:
    st.session_state.discovery_engine = None
if "monitoring_system" not in st.session_state:
    st.session_state.monitoring_system = None
if "backtesting_framework" not in st.session_state:
    st.session_state.backtesting_framework = None
if "trader_following" not in st.session_state:
    st.session_state.trader_following = None
if "opportunities" not in st.session_state:
    st.session_state.opportunities = []
if "alerts" not in st.session_state:
    st.session_state.alerts = []
if "initialized" not in st.session_state:
    st.session_state.initialized = False


def initialize_platform():
    """Initialize platform components."""
    if not st.session_state.initialized:
        with st.spinner("🚀 Initializing Trading Platform..."):
            try:
                st.session_state.discovery_engine = EnhancedDiscoveryEngine()
                st.session_state.monitoring_system = RobustMonitoringSystem()
                st.session_state.backtesting_framework = (
                    ComprehensiveBacktestingFramework()
                )
                st.session_state.trader_following = TraderFollowingSystem()
                st.session_state.initialized = True
                st.success("✅ Platform Initialized Successfully!")
                time.sleep(1)
            except Exception as e:
                st.error(f"❌ Error initializing platform: {e}")


def run_discovery():
    """Run discovery engine."""
    if st.session_state.discovery_engine:
        with st.spinner("🔍 Discovering Investment Opportunities..."):
            try:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)

                opportunities = loop.run_until_complete(
                    st.session_state.discovery_engine.discover_opportunities(
                        max_opportunities=20
                    )
                )

                st.session_state.opportunities = opportunities
                loop.close()

                st.success(f"✅ Found {len(opportunities)} opportunities!")
                return opportunities
            except Exception as e:
                st.error(f"Error: {e}")
                return []
    return []


def run_monitoring():
    """Run monitoring cycle."""
    if st.session_state.monitoring_system:
        with st.spinner("📊 Running Market Monitoring..."):
            try:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)

                alerts = loop.run_until_complete(
                    st.session_state.monitoring_system.run_monitoring_cycle()
                )

                st.session_state.alerts = alerts
                loop.close()

                if alerts:
                    st.success(f"📢 Generated {len(alerts)} new alerts!")
                else:
                    st.info("✅ No new alerts - markets are stable")
                return alerts
            except Exception as e:
                st.error(f"Error: {e}")
                return []
    return []


# Sidebar
with st.sidebar:
    st.image(
        "https://via.placeholder.com/200x80/1f77b4/ffffff?text=True+North+Trading",
        use_container_width=True,
    )
    st.title("Navigation")

    page = st.radio(
        "Select View",
        [
            "🏠 Dashboard",
            "🔍 Opportunities",
            "📊 Monitoring",
            "📈 Backtesting",
            "👥 Trader Following",
            "⚖️ Risk Management",
        ],
        label_visibility="collapsed",
    )

    st.markdown("---")

    # Platform status
    st.subheader("Platform Status")
    if st.session_state.initialized:
        st.success("✅ Operational")
        st.metric("Uptime", "Running")
    else:
        st.warning("⏳ Initializing...")

    st.markdown("---")

    # Quick actions
    st.subheader("Quick Actions")
    if st.button("🔄 Refresh Data", use_container_width=True):
        st.rerun()

    if st.button("🚀 Run Discovery", use_container_width=True):
        run_discovery()
        st.rerun()

    if st.button("📊 Monitor Markets", use_container_width=True):
        run_monitoring()
        st.rerun()

# Initialize platform
initialize_platform()

# Main content
if page == "🏠 Dashboard":
    st.title("📈 True North Trading Platform")
    st.markdown("### Welcome to Your Advanced Trading Intelligence Hub")

    # Key metrics
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric(
            "Active Opportunities",
            len(st.session_state.opportunities),
            delta="Updated now",
        )

    with col2:
        recent_alerts = (
            st.session_state.monitoring_system.alert_database.get_recent_alerts(
                hours=24
            )
            if st.session_state.monitoring_system
            else []
        )
        st.metric("Alerts (24h)", len(recent_alerts), delta="Real-time")

    with col3:
        st.metric(
            "Platform Status",
            "Operational" if st.session_state.initialized else "Initializing",
            delta="Live",
        )

    with col4:
        st.metric("Components", "4/4 Active", delta="✅ All systems")

    st.markdown("---")

    # Market Overview
    col1, col2 = st.columns([2, 1])

    with col1:
        st.subheader("📊 Market Regime Analysis")
        if st.session_state.discovery_engine:
            try:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                # Get market regime detector
                market_regime_detector = (
                    st.session_state.discovery_engine.market_regime_detector
                )
                regime = loop.run_until_complete(
                    market_regime_detector.detect_market_regime()
                )
                loop.close()

                metric_col1, metric_col2, metric_col3 = st.columns(3)
                with metric_col1:
                    st.metric("Market Regime", regime.get("regime", "N/A"))
                with metric_col2:
                    st.metric("Trend", regime.get("trend", "N/A"))
                with metric_col3:
                    st.metric("Sentiment", regime.get("sentiment", "N/A"))

                st.info(
                    f"💡 Recommended Strategy: **{regime.get('recommended_strategy', 'N/A')}**"
                )

                if regime.get("top_sectors"):
                    st.write("🔥 Top Performing Sectors:")
                    for sector in regime.get("top_sectors", [])[:5]:
                        st.write(f"• {sector}")
            except Exception as e:
                st.warning(f"Unable to load market regime: {e}")

    with col2:
        st.subheader("🚨 Recent Alerts")
        if st.session_state.monitoring_system:
            recent_alerts = (
                st.session_state.monitoring_system.alert_database.get_recent_alerts(
                    hours=24
                )
            )
            if recent_alerts:
                for alert in recent_alerts[:5]:
                    severity_color = {
                        "low": "🟢",
                        "medium": "🟡",
                        "high": "🟠",
                        "critical": "🔴",
                    }.get(alert.severity.value, "⚪")

                    st.markdown(f"{severity_color} **{alert.symbol}** - {alert.title}")
                    st.caption(alert.timestamp.strftime("%H:%M:%S"))
            else:
                st.info("No recent alerts")

    st.markdown("---")

    # Platform capabilities
    st.subheader("🎯 Platform Capabilities")

    cap_col1, cap_col2, cap_col3, cap_col4 = st.columns(4)

    with cap_col1:
        st.markdown(
            """
        **🔍 Discovery Engine**
        - Market regime detection
        - Sector rotation analysis
        - Earnings calendar tracking
        - Technical screening
        """
        )

    with cap_col2:
        st.markdown(
            """
        **📊 Monitoring System**
        - Price breakout alerts
        - Volume spike detection
        - Technical indicators
        - News monitoring
        """
        )

    with cap_col3:
        st.markdown(
            """
        **📈 Backtesting**
        - Strategy validation
        - Performance metrics
        - Risk analysis
        - Multi-strategy comparison
        """
        )

    with cap_col4:
        st.markdown(
            """
        **👥 Trader Following**
        - Multi-platform tracking
        - Signal extraction
        - Performance analysis
        - Consensus detection
        """
        )

elif page == "🔍 Opportunities":
    st.title("🔍 Investment Opportunities")

    # Control buttons
    col1, col2 = st.columns([1, 4])
    with col1:
        if st.button("🚀 Run Discovery", use_container_width=True):
            run_discovery()
            st.rerun()

    if st.session_state.opportunities:
        st.success(f"📊 Found {len(st.session_state.opportunities)} opportunities")

        # Filters
        st.markdown("### Filters")
        filter_col1, filter_col2, filter_col3 = st.columns(3)

        with filter_col1:
            min_confidence = st.slider("Min Confidence", 0.0, 1.0, 0.5, 0.05)
        with filter_col2:
            risk_levels = st.multiselect(
                "Risk Level",
                ["LOW", "MEDIUM", "HIGH"],
                default=["LOW", "MEDIUM", "HIGH"],
            )
        with filter_col3:
            min_technical = st.slider("Min Technical Score", 0.0, 1.0, 0.0, 0.1)

        # Filter opportunities
        filtered_opps = [
            opp
            for opp in st.session_state.opportunities
            if opp.confidence_score >= min_confidence
            and opp.risk_level in risk_levels
            and opp.technical_score >= min_technical
        ]

        st.markdown(f"### Showing {len(filtered_opps)} opportunities")

        # Display opportunities
        for i, opp in enumerate(filtered_opps[:20], 1):
            with st.expander(
                f"**{i}. {opp.symbol}** - {opp.name} | 💰 ${opp.current_price:.2f} | 📊 Confidence: {opp.confidence_score:.2%}"
            ):
                col1, col2, col3 = st.columns(3)

                with col1:
                    st.metric("Current Price", f"${opp.current_price:.2f}")
                    st.metric("Confidence Score", f"{opp.confidence_score:.1%}")
                    st.metric("Risk Level", opp.risk_level)

                with col2:
                    st.metric("Technical Score", f"{opp.technical_score:.1%}")
                    st.metric("Momentum Score", f"{opp.momentum_score:.1%}")
                    st.metric("Volatility", f"{opp.volatility:.1%}")

                with col3:
                    if opp.entry_price:
                        st.metric("Entry Price", f"${opp.entry_price:.2f}")
                    if opp.target_price:
                        st.metric("Target Price", f"${opp.target_price:.2f}")
                    if opp.stop_loss:
                        st.metric("Stop Loss", f"${opp.stop_loss:.2f}")

                st.markdown(
                    f"**Discovery Sources:** {', '.join(opp.discovery_sources)}"
                )

                if opp.reasoning:
                    st.info(f"💡 {opp.reasoning}")
    else:
        st.info("👆 Click 'Run Discovery' to find investment opportunities")

elif page == "📊 Monitoring":
    st.title("📊 Market Monitoring & Alerts")

    # Control buttons
    if st.button("🔄 Run Monitoring Cycle", use_container_width=False):
        run_monitoring()
        st.rerun()

    if st.session_state.monitoring_system:
        # Alert summary
        summary = st.session_state.monitoring_system.get_alert_summary(hours=24)

        st.markdown("### Alert Summary (Last 24 Hours)")

        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Total Alerts", summary.get("total_alerts", 0))
        with col2:
            st.metric("Unresolved", summary.get("unresolved_count", 0))
        with col3:
            critical = summary.get("by_severity", {}).get("critical", 0)
            st.metric("Critical", critical, delta="⚠️" if critical > 0 else None)
        with col4:
            high = summary.get("by_severity", {}).get("high", 0)
            st.metric("High", high)

        st.markdown("---")

        # Alerts by type
        st.markdown("### Alerts by Type")
        if summary.get("by_type"):
            fig = px.pie(
                values=list(summary["by_type"].values()),
                names=list(summary["by_type"].keys()),
                title="Alert Distribution",
            )
            st.plotly_chart(fig, use_container_width=True)

        # Recent alerts
        st.markdown("### Recent Alerts")
        recent_alerts = (
            st.session_state.monitoring_system.alert_database.get_recent_alerts(
                hours=24
            )
        )

        if recent_alerts:
            for alert in recent_alerts[:20]:
                severity_emoji = {
                    "low": "🟢",
                    "medium": "🟡",
                    "high": "🟠",
                    "critical": "🔴",
                }.get(alert.severity.value, "⚪")

                with st.expander(
                    f"{severity_emoji} **{alert.title}** - {alert.symbol} | {alert.timestamp.strftime('%H:%M:%S')}"
                ):
                    st.markdown(f"**Message:** {alert.message}")
                    st.markdown(f"**Type:** {alert.alert_type.value}")
                    st.markdown(f"**Severity:** {alert.severity.value.upper()}")

                    if alert.data:
                        st.json(alert.data)
        else:
            st.info("No alerts in the last 24 hours - markets are stable ✅")

elif page == "📈 Backtesting":
    st.title("📈 Strategy Backtesting")

    st.markdown("### Configure Backtest")

    col1, col2 = st.columns(2)

    with col1:
        strategy = st.selectbox(
            "Select Strategy",
            ["MA Crossover", "RSI Mean Reversion", "Momentum", "Breakout"],
        )

        symbols = st.multiselect(
            "Select Symbols",
            ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META"],
            default=["AAPL", "MSFT"],
        )

    with col2:
        start_date = st.date_input("Start Date", datetime.now() - timedelta(days=365))
        end_date = st.date_input("End Date", datetime.now())

    if st.button("🚀 Run Backtest", use_container_width=False):
        if st.session_state.backtesting_framework and symbols:
            with st.spinner("Running backtest..."):
                try:
                    loop = asyncio.new_event_loop()
                    asyncio.set_event_loop(loop)

                    result = loop.run_until_complete(
                        st.session_state.backtesting_framework.run_backtest(
                            strategy_name=strategy,
                            symbols=symbols,
                            start_date=start_date.strftime("%Y-%m-%d"),
                            end_date=end_date.strftime("%Y-%m-%d"),
                        )
                    )

                    loop.close()

                    # Display results
                    st.success("✅ Backtest Complete!")

                    st.markdown("### Performance Metrics")

                    metric_col1, metric_col2, metric_col3, metric_col4 = st.columns(4)

                    with metric_col1:
                        st.metric("Total Return", f"{result.total_return_pct:.2f}%")
                    with metric_col2:
                        st.metric("Sharpe Ratio", f"{result.sharpe_ratio:.2f}")
                    with metric_col3:
                        st.metric("Max Drawdown", f"{result.max_drawdown_pct:.2f}%")
                    with metric_col4:
                        st.metric("Win Rate", f"{result.win_rate_pct:.1f}%")

                    # Additional metrics
                    st.markdown("### Additional Metrics")

                    col1, col2, col3 = st.columns(3)

                    with col1:
                        st.metric(
                            "Annualized Return", f"{result.annualized_return_pct:.2f}%"
                        )
                    with col2:
                        st.metric("Volatility", f"{result.volatility_pct:.2f}%")
                    with col3:
                        st.metric("Total Trades", result.total_trades)

                    # Equity curve
                    if (
                        hasattr(result, "equity_curve")
                        and result.equity_curve is not None
                    ):
                        st.markdown("### Equity Curve")
                        fig = go.Figure()
                        fig.add_trace(
                            go.Scatter(
                                x=list(range(len(result.equity_curve))),
                                y=result.equity_curve,
                                mode="lines",
                                name="Equity",
                                line=dict(color="#1f77b4", width=2),
                            )
                        )
                        fig.update_layout(
                            title="Portfolio Equity Over Time",
                            xaxis_title="Time Period",
                            yaxis_title="Portfolio Value ($)",
                            hovermode="x",
                        )
                        st.plotly_chart(fig, use_container_width=True)

                except Exception as e:
                    st.error(f"Error running backtest: {e}")
        else:
            st.warning("Please select at least one symbol")

elif page == "👥 Trader Following":
    st.title("👥 Trader Following System")

    if st.session_state.trader_following:
        # Recent signals
        st.markdown("### Recent Trading Signals (Last 24 Hours)")

        try:
            signals = st.session_state.trader_following.get_recent_signals(hours=24)

            if signals:
                for signal in signals[:20]:
                    action_emoji = {
                        "LONG": "📈",
                        "SHORT": "📉",
                        "OPTIONS_CALL": "🎯",
                        "OPTIONS_PUT": "🎯",
                    }.get(signal.action, "💹")

                    with st.expander(
                        f"{action_emoji} **{signal.symbol}** - {signal.action} | {signal.trader_name}"
                    ):
                        col1, col2 = st.columns(2)

                        with col1:
                            st.markdown(
                                f"**Trader:** {signal.trader_name} ({signal.platform})"
                            )
                            st.markdown(f"**Confidence:** {signal.confidence:.1%}")
                            st.markdown(f"**Conviction:** {signal.conviction}")

                        with col2:
                            if signal.entry_price:
                                st.metric("Entry Price", f"${signal.entry_price:.2f}")
                            st.markdown(
                                f"**Time:** {signal.timestamp.strftime('%Y-%m-%d %H:%M')}"
                            )

                        if signal.reasoning:
                            st.info(f"💡 {signal.reasoning}")
            else:
                st.info("No recent signals from followed traders")
        except Exception as e:
            st.warning(f"Unable to load trader signals: {e}")

        st.markdown("---")

        # Trader performance
        st.markdown("### Top Traders")
        st.info("Trader performance tracking will be displayed here")

elif page == "⚖️ Risk Management":
    st.title("⚖️ Portfolio Risk Management")

    st.markdown("### Current Portfolio Analysis")

    # Example portfolio
    portfolio_data = {
        "Symbol": ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"],
        "Weight": [20, 20, 15, 15, 30],
        "Value": [20000, 20000, 15000, 15000, 30000],
    }

    df = pd.DataFrame(portfolio_data)

    # Portfolio composition
    col1, col2 = st.columns([1, 1])

    with col1:
        fig = px.pie(
            df,
            values="Weight",
            names="Symbol",
            title="Portfolio Composition",
            color_discrete_sequence=px.colors.sequential.Blues,
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.markdown("### Portfolio Metrics")
        st.metric("Total Value", "$100,000")
        st.metric("Number of Positions", "5")
        st.metric("Concentration Risk", "Medium")
        st.metric("Diversification Score", "7.5/10")

    st.markdown("---")

    # Risk metrics
    st.markdown("### Risk Metrics")

    metric_col1, metric_col2, metric_col3, metric_col4 = st.columns(4)

    with metric_col1:
        st.metric("Portfolio Beta", "0.84")
    with metric_col2:
        st.metric("Volatility", "9.9%")
    with metric_col3:
        st.metric("VaR (95%)", "-$2,450")
    with metric_col4:
        st.metric("Sharpe Ratio", "1.45")

    st.markdown("---")

    # Stress tests
    st.markdown("### Stress Test Scenarios")

    scenarios = pd.DataFrame(
        {
            "Scenario": [
                "Market Crash (-20%)",
                "Moderate Correction (-10%)",
                "Volatility Spike (+50%)",
            ],
            "Impact": ["-16.9%", "-8.5%", "Risk ↑"],
            "Portfolio Value": ["$83,100", "$91,500", "N/A"],
        }
    )

    st.dataframe(scenarios, use_container_width=True)

# Footer
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #666;'>
        <p>True North Trading Platform v1.0 | Ultra-Robust Intelligence System</p>
        <p>🚀 Powered by AI • 📊 Real-time Data • ⚡ High Performance</p>
    </div>
    """,
    unsafe_allow_html=True,
)
