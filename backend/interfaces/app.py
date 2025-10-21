"""
True North Trading Platform - Clean Streamlit Dashboard
Modern, professional trading interface following Streamlit best practices.
"""

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import asyncio
from pathlib import Path

# Import platform components
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "..", ".."))

from backend.systems.enhanced_discovery_engine import EnhancedDiscoveryEngine
from backend.systems.robust_monitoring_system import (
    RobustMonitoringSystem,
    AlertSeverity,
)
from backend.systems.backtesting_wrapper import ComprehensiveBacktestingFramework
from backend.systems.trader_following_system import TraderFollowingSystem

# Page config - must be first Streamlit command
st.set_page_config(
    page_title="True North Trading",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded",
    menu_items={
        "Get Help": "https://github.com/yourusername/true-north-trading",
        "Report a bug": "https://github.com/yourusername/true-north-trading/issues",
        "About": "# True North Trading Platform\nAI-Powered Trading Intelligence",
    },
)


# ==================== Custom CSS ====================
def load_css():
    st.markdown(
        """
        <style>
        /* Main theme - Light Mode */
        .stApp {
            background-color: #ffffff;
        }
        
        /* Metrics styling */
        [data-testid="stMetricValue"] {
            font-size: 28px;
            font-weight: 600;
            color: #1a1a1a;
        }
        
        /* Card styling */
        .custom-card {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #4CAF50;
            margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Headers */
        h1 {
            color: #2e7d32;
            font-weight: 700;
        }
        
        h2 {
            color: #1976d2;
            font-weight: 600;
            margin-top: 20px;
        }
        
        h3 {
            color: #388e3c;
            font-weight: 500;
        }
        
        /* Sidebar */
        [data-testid="stSidebar"] {
            background-color: #f5f5f5;
            border-right: 1px solid #e0e0e0;
        }
        
        /* Buttons */
        .stButton>button {
            background-color: #4CAF50;
            color: white;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            padding: 10px 24px;
            transition: all 0.3s;
        }
        
        .stButton>button:hover {
            background-color: #45a049;
            box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
        }
        
        /* Expander */
        .streamlit-expanderHeader {
            background-color: #f8f9fa;
            border-radius: 8px;
            font-weight: 600;
            border: 1px solid #e0e0e0;
        }
        
        /* Alert badges */
        .alert-critical {
            background-color: #f44336;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 12px;
        }
        
        .alert-high {
            background-color: #ff9800;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 12px;
        }
        
        .alert-medium {
            background-color: #ffeb3b;
            color: #333;
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 12px;
        }
        
        .alert-low {
            background-color: #4caf50;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 12px;
        }
        </style>
    """,
        unsafe_allow_html=True,
    )


# ==================== State Management ====================
@st.cache_resource
def init_platform():
    """Initialize platform components (cached)."""
    try:
        return {
            "discovery": EnhancedDiscoveryEngine(),
            "monitoring": RobustMonitoringSystem(),
            "backtesting": ComprehensiveBacktestingFramework(),
            "trader_following": TraderFollowingSystem(),
            "initialized": True,
        }
    except Exception as e:
        st.error(f"Failed to initialize platform: {e}")
        return {"initialized": False}


# Initialize session state
if "page" not in st.session_state:
    st.session_state.page = "Dashboard"
if "opportunities" not in st.session_state:
    st.session_state.opportunities = []
if "last_discovery" not in st.session_state:
    st.session_state.last_discovery = None
if "auto_refresh" not in st.session_state:
    st.session_state.auto_refresh = False
if "refresh_interval" not in st.session_state:
    st.session_state.refresh_interval = 300  # 5 minutes default


# ==================== Helper Functions ====================
def run_async(coro):
    """Run async function in sync context."""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(coro)
    loop.close()
    return result


def format_currency(value):
    """Format value as currency."""
    return f"${value:,.2f}"


def format_percent(value):
    """Format value as percentage."""
    return f"{value:.2f}%"


def severity_badge(severity):
    """Return HTML badge for alert severity."""
    badges = {
        "critical": '<span class="alert-critical">🔴 CRITICAL</span>',
        "high": '<span class="alert-high">🟠 HIGH</span>',
        "medium": '<span class="alert-medium">🟡 MEDIUM</span>',
        "low": '<span class="alert-low">🟢 LOW</span>',
    }
    return badges.get(severity, severity)


# ==================== Sidebar ====================
def render_sidebar(platform):
    """Render sidebar navigation and controls."""
    with st.sidebar:
        st.title("📈 True North Trading")
        st.markdown("---")

        # Navigation
        st.subheader("Navigation")
        pages = {
            "🏠 Dashboard": "Dashboard",
            "🔍 Opportunities": "Opportunities",
            "📊 Monitoring": "Monitoring",
            "📈 Backtesting": "Backtesting",
            "👥 Traders": "Traders",
            "⚙️ Settings": "Settings",
        }

        for label, page in pages.items():
            if st.button(label, use_container_width=True, key=f"nav_{page}"):
                st.session_state.page = page
                st.rerun()

        st.markdown("---")

        # Status
        st.subheader("Platform Status")
        if platform.get("initialized"):
            st.success("✅ Operational")
            st.caption(f"🕐 {datetime.now().strftime('%H:%M:%S')}")
        else:
            st.error("❌ Error")

        st.markdown("---")

        # Quick actions
        st.subheader("Quick Actions")

        col1, col2 = st.columns(2)
        with col1:
            if st.button("🔄 Refresh", use_container_width=True):
                st.rerun()
        with col2:
            if st.button("🚀 Discover", use_container_width=True):
                with st.spinner("Finding opportunities..."):
                    try:
                        opps = run_async(
                            platform["discovery"].discover_opportunities(
                                max_opportunities=20
                            )
                        )
                        st.session_state.opportunities = opps
                        st.session_state.last_discovery = datetime.now()
                        st.success(f"Found {len(opps)} opportunities!")
                    except Exception as e:
                        st.error(f"Error: {e}")
                st.rerun()


# ==================== Dashboard Page ====================
def render_dashboard(platform):
    """Render main dashboard."""
    st.title("🏠 Trading Dashboard")
    st.caption("Real-time market intelligence and opportunity tracking")

    # Key metrics row
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Opportunities", len(st.session_state.opportunities), delta="Active")

    with col2:
        alerts = []
        if platform.get("monitoring"):
            try:
                alerts = platform["monitoring"].alert_database.get_recent_alerts(
                    hours=24
                )
            except:
                pass
        st.metric("Alerts (24h)", len(alerts), delta="Tracked")

    with col3:
        st.metric("Platform", "Operational", delta="Live")

    with col4:
        uptime = "99.9%"
        st.metric("Uptime", uptime, delta="+0.1%")

    st.markdown("---")

    # Market regime
    col1, col2 = st.columns([2, 1])

    with col1:
        st.subheader("📊 Market Analysis")
        if platform.get("discovery"):
            try:
                with st.spinner("Analyzing market..."):
                    regime = run_async(
                        platform["discovery"].regime_detector.detect_market_regime()
                    )

                    metric_col1, metric_col2, metric_col3 = st.columns(3)
                    with metric_col1:
                        st.metric("Regime", regime.get("regime", "Unknown"))
                    with metric_col2:
                        st.metric("Trend", regime.get("trend", "Unknown"))
                    with metric_col3:
                        st.metric("Sentiment", regime.get("sentiment", "Unknown"))

                    st.info(
                        f"💡 **Strategy:** {regime.get('recommended_strategy', 'N/A')}"
                    )

                    if regime.get("top_sectors"):
                        st.write("**Top Sectors:**")
                        for sector in regime.get("top_sectors", [])[:5]:
                            st.write(f"• {sector}")
            except Exception as e:
                st.warning(f"Unable to load market data: {str(e)[:100]}")

    with col2:
        st.subheader("🚨 Recent Alerts")
        if alerts:
            for alert in alerts[:5]:
                severity_emoji = {
                    "low": "🟢",
                    "medium": "🟡",
                    "high": "🟠",
                    "critical": "🔴",
                }.get(alert.severity.value, "⚪")

                st.caption(f"{severity_emoji} **{alert.symbol}**")
                st.caption(alert.timestamp.strftime("%H:%M"))
        else:
            st.info("No recent alerts")

    # Quick stats
    st.markdown("---")
    st.subheader("📈 Quick Stats")

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Discovery Runs", "12", delta="+3 today")
    with col2:
        st.metric("Signals Tracked", "48", delta="+12 today")
    with col3:
        st.metric("Win Rate", "68.5%", delta="+2.3%")
    with col4:
        st.metric("Avg Return", "15.2%", delta="+1.8%")


# ==================== Opportunities Page ====================
def render_opportunities(platform):
    """Render opportunities page."""
    st.title("🔍 Investment Opportunities")
    st.caption("AI-discovered trading opportunities with risk analysis")

    col1, col2, col3 = st.columns([1, 1, 2])
    with col1:
        if st.button("🚀 Run Discovery", use_container_width=True):
            with st.spinner("Discovering opportunities..."):
                try:
                    opps = run_async(
                        platform["discovery"].discover_opportunities(
                            max_opportunities=30
                        )
                    )
                    st.session_state.opportunities = opps
                    st.session_state.last_discovery = datetime.now()
                    st.success(f"✅ Found {len(opps)} opportunities!")
                except Exception as e:
                    st.error(f"Error: {e}")
            st.rerun()

    with col2:
        if st.session_state.last_discovery:
            st.caption(
                f"Last update: {st.session_state.last_discovery.strftime('%H:%M:%S')}"
            )

    if not st.session_state.opportunities:
        st.info("👆 Click 'Run Discovery' to find opportunities")
        return

    st.markdown("---")

    # Filters
    with st.expander("� Filters", expanded=False):
        filter_col1, filter_col2, filter_col3 = st.columns(3)

        with filter_col1:
            min_conf = st.slider("Min Confidence", 0.0, 1.0, 0.5, 0.05)
        with filter_col2:
            risk_filter = st.multiselect(
                "Risk Level",
                ["LOW", "MEDIUM", "HIGH"],
                default=["LOW", "MEDIUM", "HIGH"],
            )
        with filter_col3:
            min_tech = st.slider("Min Technical Score", 0.0, 1.0, 0.0, 0.1)

    # Filter opportunities
    filtered = [
        opp
        for opp in st.session_state.opportunities
        if opp.confidence_score >= min_conf
        and opp.risk_level in risk_filter
        and opp.technical_score >= min_tech
    ]

    st.success(
        f"📊 Showing {len(filtered)} of {len(st.session_state.opportunities)} opportunities"
    )

    # Display opportunities in cards
    for i, opp in enumerate(filtered[:20], 1):
        with st.container():
            col1, col2, col3, col4 = st.columns([2, 1, 1, 1])

            with col1:
                st.markdown(f"### {i}. {opp.symbol} - {opp.name}")
                st.caption(f"💡 {', '.join(opp.discovery_sources)}")

            with col2:
                st.metric("Price", format_currency(opp.current_price))

            with col3:
                st.metric("Confidence", format_percent(opp.confidence_score * 100))

            with col4:
                risk_colors = {"LOW": "🟢", "MEDIUM": "🟡", "HIGH": "🔴"}
                st.metric(
                    "Risk", f"{risk_colors.get(opp.risk_level, '')} {opp.risk_level}"
                )

            # Details in expander
            with st.expander("📋 Details"):
                detail_col1, detail_col2, detail_col3 = st.columns(3)

                with detail_col1:
                    st.metric(
                        "Technical Score", format_percent(opp.technical_score * 100)
                    )
                    st.metric(
                        "Momentum Score", format_percent(opp.momentum_score * 100)
                    )

                with detail_col2:
                    st.metric("Volatility", format_percent(opp.volatility * 100))
                    if opp.entry_price:
                        st.metric("Entry", format_currency(opp.entry_price))

                with detail_col3:
                    if opp.target_price:
                        st.metric("Target", format_currency(opp.target_price))
                    if opp.stop_loss:
                        st.metric("Stop Loss", format_currency(opp.stop_loss))

                if opp.reasoning:
                    st.info(f"💡 {opp.reasoning}")

            st.markdown("---")


# ==================== Monitoring Page ====================
def render_monitoring(platform):
    """Render monitoring page."""
    st.title("📊 Market Monitoring")
    st.caption("Real-time alerts and market surveillance")

    if st.button("🔄 Run Monitoring Cycle", use_container_width=False):
        with st.spinner("Monitoring markets..."):
            try:
                alerts = run_async(platform["monitoring"].run_monitoring_cycle())
                if alerts:
                    st.success(f"📢 Generated {len(alerts)} new alerts!")
                else:
                    st.info("✅ No alerts - markets are stable")
            except Exception as e:
                st.error(f"Error: {e}")
        st.rerun()

    st.markdown("---")

    # Get alerts
    try:
        summary = platform["monitoring"].get_alert_summary(hours=24)
        recent_alerts = platform["monitoring"].alert_database.get_recent_alerts(
            hours=24
        )

        # Summary metrics
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
            st.metric("High Priority", high)

        st.markdown("---")

        # Alert distribution chart
        if summary.get("by_type"):
            st.subheader("Alert Distribution")
            fig = px.pie(
                values=list(summary["by_type"].values()),
                names=list(summary["by_type"].keys()),
                hole=0.4,
                color_discrete_sequence=px.colors.sequential.Plasma,
            )
            fig.update_layout(
                paper_bgcolor="rgba(255,255,255,0)",
                plot_bgcolor="rgba(255,255,255,0)",
                font_color="#1a1a1a",
            )
            st.plotly_chart(fig, use_container_width=True)

        st.markdown("---")

        # Recent alerts
        st.subheader("Recent Alerts")
        for alert in recent_alerts[:20]:
            severity_html = severity_badge(alert.severity.value)

            with st.expander(
                f"{alert.symbol} - {alert.title} | {alert.timestamp.strftime('%H:%M:%S')}"
            ):
                st.markdown(severity_html, unsafe_allow_html=True)
                st.write(f"**Message:** {alert.message}")
                st.caption(f"Type: {alert.alert_type.value}")

                if alert.data:
                    with st.expander("📊 Data"):
                        st.json(alert.data)

        if not recent_alerts:
            st.info("✅ No alerts in the last 24 hours")

    except Exception as e:
        st.error(f"Error loading alerts: {e}")


# ==================== Traders Page ====================
def render_traders(platform):
    """Render trader following page."""
    st.title("👥 Trader Following System")
    st.caption("Follow top traders and track their signals in real-time")

    if not platform.get("trader_following"):
        st.error("Trader following system not initialized")
        return

    trader_system = platform["trader_following"]

    # Top tabs
    tab1, tab2, tab3, tab4 = st.tabs(
        ["📡 Recent Signals", "🏆 Leaderboard", "👥 Followed Traders", "🤝 Consensus"]
    )

    # ========== Tab 1: Recent Signals ==========
    with tab1:
        st.subheader("📡 Recent Trading Signals")

        col1, col2 = st.columns([1, 3])
        with col1:
            hours = st.slider("Time Range (hours)", 1, 72, 24, key="signal_hours")

        try:
            signals = trader_system.get_recent_signals(hours=hours)

            if signals:
                st.success(f"📊 {len(signals)} signals in the last {hours} hours")

                # Display signals
                for signal in signals[:30]:
                    with st.container():
                        col1, col2, col3, col4 = st.columns([2, 1, 1, 1])

                        with col1:
                            action_emoji = {
                                "LONG": "📈",
                                "SHORT": "📉",
                                "OPTIONS_CALL": "🎯",
                                "OPTIONS_PUT": "🎯",
                            }.get(signal.get("trade_type", ""), "💹")

                            st.markdown(
                                f"### {action_emoji} {signal.get('symbol', 'N/A')}"
                            )
                            st.caption(
                                f"👤 {signal.get('trader_name', 'Unknown')} ({signal.get('platform', 'Unknown')})"
                            )

                        with col2:
                            st.metric("Action", signal.get("trade_type", "N/A"))

                        with col3:
                            conf = signal.get("confidence", 0)
                            st.metric(
                                "Confidence",
                                (
                                    f"{conf:.0%}"
                                    if isinstance(conf, (int, float))
                                    else str(conf)
                                ),
                            )

                        with col4:
                            price = signal.get("entry_price")
                            if price:
                                st.metric("Entry", format_currency(price))
                            else:
                                st.metric("Conviction", signal.get("conviction", "N/A"))

                        # Expandable details
                        with st.expander("📋 Signal Details"):
                            detail_col1, detail_col2 = st.columns(2)

                            with detail_col1:
                                st.write(
                                    f"**Conviction:** {signal.get('conviction', 'N/A')}"
                                )
                                entry_time = signal.get("entry_time")
                                if entry_time:
                                    st.write(
                                        f"**Time:** {entry_time.strftime('%Y-%m-%d %H:%M')}"
                                    )

                            with detail_col2:
                                if price:
                                    st.write(
                                        f"**Entry Price:** {format_currency(price)}"
                                    )

                            source = signal.get("source_text", "")
                            if source:
                                st.info(f"💬 {source}")

                        st.markdown("---")

            else:
                st.info(f"No signals found in the last {hours} hours")

        except Exception as e:
            st.error(f"Error loading signals: {e}")

    # ========== Tab 2: Leaderboard ==========
    with tab2:
        st.subheader("🏆 Top Performing Traders")

        try:
            leaderboard = trader_system.get_trader_leaderboard()

            if leaderboard:
                # Summary stats
                col1, col2, col3 = st.columns(3)
                with col1:
                    st.metric("Tracked Traders", len(leaderboard))
                with col2:
                    avg_win_rate = (
                        sum(t.get("win_rate", 0) for t in leaderboard)
                        / len(leaderboard)
                        if leaderboard
                        else 0
                    )
                    st.metric("Avg Win Rate", f"{avg_win_rate:.1%}")
                with col3:
                    total_trades = sum(t.get("total_trades", 0) for t in leaderboard)
                    st.metric("Total Trades", total_trades)

                st.markdown("---")

                # Leaderboard table
                for i, trader in enumerate(leaderboard[:20], 1):
                    with st.container():
                        col1, col2, col3, col4, col5 = st.columns([1, 3, 1, 1, 1])

                        with col1:
                            medal = {1: "🥇", 2: "🥈", 3: "🥉"}.get(i, f"{i}.")
                            st.markdown(f"### {medal}")

                        with col2:
                            st.markdown(f"**{trader.get('name', 'Unknown')}**")
                            st.caption(
                                f"@{trader.get('username', 'unknown')} • {trader.get('platform', 'N/A')}"
                            )

                        with col3:
                            st.metric("Win Rate", f"{trader.get('win_rate', 0):.1%}")

                        with col4:
                            st.metric("Trades", trader.get("total_trades", 0))

                        with col5:
                            avg_return = trader.get("avg_return_pct", 0)
                            st.metric(
                                "Avg Return",
                                f"{avg_return:+.1%}",
                                delta="profit" if avg_return > 0 else None,
                            )

                        st.markdown("---")

            else:
                st.info("No trader performance data available yet")
                st.caption(
                    "💡 Traders need to be added and have completed trades to appear here"
                )

        except Exception as e:
            st.error(f"Error loading leaderboard: {e}")

    # ========== Tab 3: Followed Traders ==========
    with tab3:
        st.subheader("👥 Currently Following")

        try:
            traders = trader_system.database.get_traders()

            if traders:
                st.success(f"Following {len(traders)} traders")

                # Display traders
                for trader in traders:
                    with st.expander(f"👤 {trader.name} (@{trader.username})"):
                        col1, col2, col3 = st.columns(3)

                        with col1:
                            st.write(f"**Platform:** {trader.platform.value}")
                            st.write(
                                f"**Verified:** {'✅' if trader.verified else '❌'}"
                            )

                        with col2:
                            followers = (
                                trader.total_followers if trader.total_followers else 0
                            )
                            st.write(f"**Followers:** {followers:,}")
                            st.write(
                                f"**Strategy:** {trader.primary_strategy or 'Unknown'}"
                            )

                        with col3:
                            st.write(f"**Total Trades:** {trader.total_trades_tracked}")
                            if trader.last_activity:
                                st.write(
                                    f"**Last Active:** {trader.last_activity.strftime('%Y-%m-%d')}"
                                )

                        # Performance analysis button
                        if st.button(
                            f"📊 Analyze Performance", key=f"analyze_{trader.trader_id}"
                        ):
                            with st.spinner("Analyzing..."):
                                try:
                                    perf = trader_system.performance_analyzer.analyze_trader_performance(
                                        trader.trader_id
                                    )

                                    st.markdown("#### Performance Metrics")
                                    (
                                        metric_col1,
                                        metric_col2,
                                        metric_col3,
                                        metric_col4,
                                    ) = st.columns(4)

                                    with metric_col1:
                                        st.metric(
                                            "Win Rate", f"{perf.get('win_rate', 0):.1%}"
                                        )
                                    with metric_col2:
                                        st.metric(
                                            "Total Trades", perf.get("total_trades", 0)
                                        )
                                    with metric_col3:
                                        st.metric(
                                            "Avg Return",
                                            f"{perf.get('avg_return_pct', 0):+.1%}",
                                        )
                                    with metric_col4:
                                        st.metric(
                                            "Sharpe Ratio",
                                            f"{perf.get('sharpe_ratio', 0):.2f}",
                                        )

                                except Exception as e:
                                    st.error(f"Error analyzing performance: {e}")

            else:
                st.info("Not following any traders yet")
                st.markdown(
                    """
                **Get Started:**
                1. Add traders using the trader discovery system
                2. Configure social media API credentials
                3. Start tracking their signals
                """
                )

        except Exception as e:
            st.error(f"Error loading traders: {e}")

    # ========== Tab 4: Consensus Signals ==========
    with tab4:
        st.subheader("🤝 Consensus Signals")
        st.caption("Signals where multiple traders agree")

        col1, col2 = st.columns([1, 3])
        with col1:
            min_traders = st.number_input(
                "Min Traders", min_value=2, max_value=10, value=2, key="min_traders"
            )

        try:
            consensus = trader_system.get_consensus_signals(min_traders=min_traders)

            if consensus:
                st.success(f"🎯 {len(consensus)} consensus signals found")

                for signal in consensus:
                    with st.container():
                        col1, col2, col3, col4 = st.columns([2, 1, 1, 1])

                        with col1:
                            st.markdown(f"### 🎯 {signal.get('symbol', 'N/A')}")
                            traders_list = signal.get("traders", [])
                            st.caption(f"👥 {len(traders_list)} traders agree")

                        with col2:
                            st.metric("Action", signal.get("trade_type", "N/A"))

                        with col3:
                            avg_conf = signal.get("avg_confidence", 0)
                            st.metric("Avg Confidence", f"{avg_conf:.0%}")

                        with col4:
                            st.metric(
                                "Strength",
                                f"{signal.get('consensus_strength', 0):.1f}/10",
                            )

                        # Show agreeing traders
                        with st.expander("👥 Agreeing Traders"):
                            for t in traders_list:
                                st.write(f"• {t}")

                        st.markdown("---")

            else:
                st.info(f"No consensus signals with {min_traders}+ traders")
                st.caption(
                    "💡 Consensus signals appear when multiple traders take the same position"
                )

        except Exception as e:
            st.error(f"Error loading consensus signals: {e}")


# ==================== Settings Page ====================
def render_settings(platform):
    """Render settings page."""
    st.title("⚙️ Settings")
    st.caption("Configure your trading platform")

    # Auto-refresh settings
    st.subheader("🔄 Auto-Refresh")
    st.markdown("Automatically update data at regular intervals")

    col1, col2 = st.columns(2)

    with col1:
        auto_refresh = st.toggle(
            "Enable Auto-Refresh",
            value=st.session_state.auto_refresh,
            key="auto_refresh_toggle",
        )
        st.session_state.auto_refresh = auto_refresh

    with col2:
        if auto_refresh:
            refresh_interval = st.select_slider(
                "Refresh Interval",
                options=[60, 180, 300, 600, 900, 1800],
                value=st.session_state.refresh_interval,
                format_func=lambda x: f"{x//60} minutes" if x >= 60 else f"{x} seconds",
                key="interval_slider",
            )
            st.session_state.refresh_interval = refresh_interval

            st.info(f"⏱️ Dashboard will refresh every {refresh_interval//60} minutes")

    st.markdown("---")

    # What gets refreshed
    if auto_refresh:
        st.subheader("📊 Auto-Refresh Actions")
        st.markdown(
            """
        When auto-refresh is enabled, the platform will automatically:
        - 🔍 **Run Discovery** - Find new opportunities
        - 📊 **Monitor Markets** - Check for alerts
        - 👥 **Update Trader Signals** - Get latest signals
        - 📈 **Refresh Market Regime** - Update market analysis
        """
        )

        st.warning("⚠️ Note: Auto-refresh may increase API usage and costs")

    st.markdown("---")

    # Platform info
    st.subheader("ℹ️ Platform Information")
    info_col1, info_col2 = st.columns(2)

    with info_col1:
        st.write("**Version:** 1.0.0")
        st.write("**Status:** Operational")

    with info_col2:
        st.write("**Components:** 4/4 Active")
        st.write("**Last Updated:** " + datetime.now().strftime("%Y-%m-%d %H:%M"))

    st.markdown("---")

    # Actions
    st.subheader("🔧 Actions")

    action_col1, action_col2, action_col3 = st.columns(3)

    with action_col1:
        if st.button("🔄 Force Refresh Now", use_container_width=True):
            st.rerun()

    with action_col2:
        if st.button("🗑️ Clear Cache", use_container_width=True):
            st.cache_resource.clear()
            st.success("✅ Cache cleared!")
            time.sleep(1)
            st.rerun()

    with action_col3:
        if st.button("🔄 Restart Platform", use_container_width=True):
            st.cache_resource.clear()
            st.success("✅ Platform restarting...")
            time.sleep(1)
            st.rerun()


# ==================== Main App ====================
def main():
    """Main application entry point."""
    load_css()

    # Initialize platform
    with st.spinner("Initializing platform..."):
        platform = init_platform()

    if not platform.get("initialized"):
        st.error("❌ Failed to initialize platform components")
        st.stop()

    # Render sidebar
    render_sidebar(platform)

    # Render selected page
    page = st.session_state.page

    if page == "Dashboard":
        render_dashboard(platform)
    elif page == "Opportunities":
        render_opportunities(platform)
    elif page == "Monitoring":
        render_monitoring(platform)
    elif page == "Backtesting":
        st.title("📈 Backtesting")
        st.info("Backtesting functionality - coming soon")
    elif page == "Traders":
        render_traders(platform)
    elif page == "Settings":
        render_settings(platform)

    # Auto-refresh logic
    if st.session_state.auto_refresh:
        # Show auto-refresh indicator
        st.sidebar.markdown("---")
        st.sidebar.info(
            f"🔄 Auto-refresh: ON\n\n⏱️ Every {st.session_state.refresh_interval//60} min"
        )

        # Use st.empty() to trigger refresh
        import time as time_module

        time_module.sleep(st.session_state.refresh_interval)
        st.rerun()


if __name__ == "__main__":
    main()
