"""
True North Trading Platform - Web Interface
Beautiful, modern web dashboard for monitoring and controlling the trading platform.
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import asyncio
import json
from datetime import datetime, timedelta
from pathlib import Path
import threading
import time

# Import platform components
from enhanced_discovery_engine import EnhancedDiscoveryEngine
from robust_monitoring_system import RobustMonitoringSystem, AlertSeverity
from backtesting_wrapper import ComprehensiveBacktestingFramework
from trader_following_system import TraderFollowingSystem
from ultra_robust_platform_demo import AdvancedRiskManager

app = Flask(__name__)
CORS(app)

# Global platform instances
discovery_engine = None
monitoring_system = None
backtesting_framework = None
trader_following = None
risk_manager = None

# Platform state
platform_state = {
    "status": "initializing",
    "last_discovery": None,
    "opportunities": [],
    "alerts": [],
    "backtest_results": {},
    "trader_signals": [],
    "risk_metrics": {},
}


def initialize_platform():
    """Initialize all platform components."""
    global discovery_engine, monitoring_system, backtesting_framework, trader_following, risk_manager

    try:
        print("🚀 Initializing Trading Platform Components...")

        # Initialize components
        discovery_engine = EnhancedDiscoveryEngine()
        monitoring_system = RobustMonitoringSystem()
        backtesting_framework = ComprehensiveBacktestingFramework()
        trader_following = TraderFollowingSystem()
        risk_manager = AdvancedRiskManager()

        platform_state["status"] = "operational"
        print("✅ Platform Initialized Successfully!")

    except Exception as e:
        print(f"❌ Error initializing platform: {e}")
        platform_state["status"] = "error"


@app.route("/")
def index():
    """Main dashboard page."""
    return render_template("dashboard.html")


@app.route("/api/status")
def get_status():
    """Get platform status."""
    return jsonify(
        {
            "status": platform_state["status"],
            "timestamp": datetime.now().isoformat(),
            "components": {
                "discovery_engine": discovery_engine is not None,
                "monitoring_system": monitoring_system is not None,
                "backtesting": backtesting_framework is not None,
                "trader_following": trader_following is not None,
                "risk_manager": risk_manager is not None,
            },
        }
    )


@app.route("/api/opportunities")
def get_opportunities():
    """Get current investment opportunities."""
    if not discovery_engine:
        return jsonify({"error": "Discovery engine not initialized"}), 503

    try:
        # Return cached opportunities or run discovery
        if platform_state["opportunities"]:
            return jsonify(
                {
                    "opportunities": platform_state["opportunities"],
                    "last_updated": platform_state.get("last_discovery"),
                    "count": len(platform_state["opportunities"]),
                }
            )
        else:
            return jsonify(
                {
                    "opportunities": [],
                    "count": 0,
                    "message": "No opportunities found yet. Click 'Run Discovery' to find opportunities.",
                }
            )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/discovery/run", methods=["POST"])
def run_discovery():
    """Run the discovery engine."""
    if not discovery_engine:
        return jsonify({"error": "Discovery engine not initialized"}), 503

    def run_async_discovery():
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

            opportunities = loop.run_until_complete(
                discovery_engine.discover_opportunities(max_opportunities=20)
            )

            # Convert to JSON-serializable format
            platform_state["opportunities"] = [
                {
                    "symbol": opp.symbol,
                    "name": opp.name,
                    "price": float(opp.current_price),
                    "confidence": float(opp.confidence_score),
                    "risk_level": opp.risk_level,
                    "sources": opp.discovery_sources,
                    "technical_score": float(opp.technical_score),
                    "momentum_score": float(opp.momentum_score),
                    "volatility": float(opp.volatility),
                    "entry_price": float(opp.entry_price) if opp.entry_price else None,
                    "target_price": (
                        float(opp.target_price) if opp.target_price else None
                    ),
                    "stop_loss": float(opp.stop_loss) if opp.stop_loss else None,
                }
                for opp in opportunities
            ]
            platform_state["last_discovery"] = datetime.now().isoformat()

            loop.close()
        except Exception as e:
            print(f"Discovery error: {e}")

    # Run in background thread
    thread = threading.Thread(target=run_async_discovery)
    thread.start()

    return jsonify(
        {
            "status": "running",
            "message": "Discovery engine started. Results will be available shortly.",
        }
    )


@app.route("/api/alerts")
def get_alerts():
    """Get current alerts."""
    if not monitoring_system:
        return jsonify({"error": "Monitoring system not initialized"}), 503

    try:
        # Get recent alerts from database
        recent_alerts = monitoring_system.alert_database.get_recent_alerts(hours=24)

        alerts_data = [
            {
                "id": alert.id,
                "type": alert.alert_type.value,
                "severity": alert.severity.value,
                "symbol": alert.symbol,
                "title": alert.title,
                "message": alert.message,
                "timestamp": alert.timestamp.isoformat(),
                "data": alert.data,
                "acknowledged": alert.acknowledged,
                "resolved": alert.resolved,
            }
            for alert in recent_alerts
        ]

        return jsonify(
            {
                "alerts": alerts_data,
                "count": len(alerts_data),
                "summary": monitoring_system.get_alert_summary(hours=24),
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/monitoring/cycle", methods=["POST"])
def run_monitoring_cycle():
    """Run a monitoring cycle."""
    if not monitoring_system:
        return jsonify({"error": "Monitoring system not initialized"}), 503

    def run_async_monitoring():
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

            alerts = loop.run_until_complete(monitoring_system.run_monitoring_cycle())

            loop.close()
        except Exception as e:
            print(f"Monitoring error: {e}")

    thread = threading.Thread(target=run_async_monitoring)
    thread.start()

    return jsonify({"status": "running", "message": "Monitoring cycle started"})


@app.route("/api/backtest", methods=["POST"])
def run_backtest():
    """Run a backtest."""
    if not backtesting_framework:
        return jsonify({"error": "Backtesting framework not initialized"}), 503

    data = request.json
    symbols = data.get("symbols", ["AAPL", "MSFT"])
    strategy = data.get("strategy", "MA Crossover")

    def run_async_backtest():
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

            result = loop.run_until_complete(
                backtesting_framework.run_backtest(
                    strategy_name=strategy,
                    symbols=symbols,
                    start_date="2023-01-01",
                    end_date="2024-01-01",
                )
            )

            platform_state["backtest_results"][strategy] = {
                "strategy": strategy,
                "symbols": symbols,
                "total_return": float(result.total_return_pct),
                "sharpe_ratio": float(result.sharpe_ratio),
                "max_drawdown": float(result.max_drawdown_pct),
                "win_rate": float(result.win_rate_pct),
                "timestamp": datetime.now().isoformat(),
            }

            loop.close()
        except Exception as e:
            print(f"Backtest error: {e}")

    thread = threading.Thread(target=run_async_backtest)
    thread.start()

    return jsonify({"status": "running", "message": f"Backtest started for {strategy}"})


@app.route("/api/backtest/results")
def get_backtest_results():
    """Get backtest results."""
    return jsonify(
        {
            "results": platform_state["backtest_results"],
            "count": len(platform_state["backtest_results"]),
        }
    )


@app.route("/api/traders")
def get_traders():
    """Get trader signals."""
    if not trader_following:
        return jsonify({"error": "Trader following system not initialized"}), 503

    try:
        # Get recent signals
        signals = trader_following.get_recent_signals(hours=24)

        signals_data = [
            {
                "symbol": signal.symbol,
                "action": signal.action,
                "trader_name": signal.trader_name,
                "platform": signal.platform,
                "confidence": float(signal.confidence),
                "entry_price": (
                    float(signal.entry_price) if signal.entry_price else None
                ),
                "timestamp": signal.timestamp.isoformat(),
                "conviction": signal.conviction,
                "reasoning": signal.reasoning,
            }
            for signal in signals
        ]

        return jsonify({"signals": signals_data, "count": len(signals_data)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/risk/portfolio")
def get_portfolio_risk():
    """Get portfolio risk metrics."""
    if not risk_manager:
        return jsonify({"error": "Risk manager not initialized"}), 503

    try:
        # Example portfolio
        portfolio = {
            "AAPL": 0.20,
            "MSFT": 0.20,
            "GOOGL": 0.15,
            "AMZN": 0.15,
            "TSLA": 0.30,
        }

        metrics = risk_manager.calculate_portfolio_metrics(portfolio)
        limits_check = risk_manager.check_risk_limits(portfolio, market_data={})

        return jsonify(
            {
                "metrics": {
                    "beta": float(metrics.get("beta", 0)),
                    "volatility": float(metrics.get("volatility", 0)),
                    "var_95": float(metrics.get("var_95", 0)),
                    "sharpe_ratio": float(metrics.get("sharpe_ratio", 0)),
                },
                "limits": limits_check,
                "portfolio": portfolio,
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/market/regime")
def get_market_regime():
    """Get current market regime."""
    if not discovery_engine:
        return jsonify({"error": "Discovery engine not initialized"}), 503

    try:

        def run_async_regime():
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

            regime = loop.run_until_complete(
                discovery_engine.market_regime_detector.detect_market_regime()
            )

            loop.close()
            return regime

        regime = run_async_regime()

        return jsonify(
            {
                "regime": regime.get("regime"),
                "trend": regime.get("trend"),
                "sentiment": regime.get("sentiment"),
                "strategy": regime.get("recommended_strategy"),
                "top_sectors": regime.get("top_sectors", []),
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Initialize platform
    initialize_platform()

    # Start Flask app
    print("\n" + "=" * 80)
    print("🌐 TRUE NORTH TRADING - WEB INTERFACE")
    print("=" * 80)
    print("\n🚀 Starting web server...")
    print("📊 Dashboard: http://localhost:5000")
    print("\nPress Ctrl+C to stop the server\n")

    app.run(debug=True, host="0.0.0.0", port=5000, use_reloader=False)
