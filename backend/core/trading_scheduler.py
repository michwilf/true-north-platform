"""
True North Trading Platform - Background Scheduler
Manages automated execution of all trading components with optimal frequencies.
"""

import asyncio
import schedule
import time
from datetime import datetime, timedelta
from pathlib import Path
import logging
import json
import signal
import sys

# Import platform components
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "..", ".."))

from backend.systems.enhanced_discovery_engine import EnhancedDiscoveryEngine
from backend.systems.robust_monitoring_system import RobustMonitoringSystem
from backend.systems.backtesting_wrapper import ComprehensiveBacktestingFramework
from backend.systems.trader_following_system import TraderFollowingSystem

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("logs/trading_scheduler.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)


class TradingScheduler:
    """
    Automated scheduler for the trading platform.

    Recommended Frequencies:
    - Discovery Engine: Every 4 hours (during market hours)
    - Monitoring System: Every 5 minutes (real-time)
    - Trader Following: Every 15 minutes (social media signals)
    - Backtesting: Once daily (overnight)
    - Portfolio Risk: Every hour
    """

    def __init__(self):
        self.discovery_engine = None
        self.monitoring_system = None
        self.backtesting_framework = None
        self.trader_following = None

        self.is_running = False
        self.stats = {
            "started_at": None,
            "discovery_runs": 0,
            "monitoring_cycles": 0,
            "signals_found": 0,
            "alerts_generated": 0,
            "last_discovery": None,
            "last_monitoring": None,
            "last_backtest": None,
        }

        # Market hours (9:30 AM - 4:00 PM ET)
        self.market_open = 9
        self.market_close = 16

    def initialize_components(self):
        """Initialize all platform components."""
        try:
            logger.info("🚀 Initializing Trading Platform Components...")

            self.discovery_engine = EnhancedDiscoveryEngine()
            logger.info("✅ Discovery Engine initialized")

            self.monitoring_system = RobustMonitoringSystem()
            logger.info("✅ Monitoring System initialized")

            self.backtesting_framework = ComprehensiveBacktestingFramework()
            logger.info("✅ Backtesting Framework initialized")

            self.trader_following = TraderFollowingSystem()
            logger.info("✅ Trader Following System initialized")

            logger.info("🎉 All components initialized successfully!")
            return True

        except Exception as e:
            logger.error(f"❌ Error initializing components: {e}")
            return False

    def is_market_hours(self) -> bool:
        """Check if current time is during market hours."""
        now = datetime.now()
        # Skip weekends
        if now.weekday() >= 5:
            return False
        # Check market hours (simplified, doesn't account for holidays)
        return self.market_open <= now.hour < self.market_close

    async def run_discovery(self):
        """Run discovery engine to find opportunities."""
        try:
            logger.info("🔍 Running Discovery Engine...")

            opportunities = await self.discovery_engine.discover_opportunities(
                max_opportunities=30
            )

            self.stats["discovery_runs"] += 1
            self.stats["last_discovery"] = datetime.now().isoformat()

            # Save opportunities to file
            opportunities_data = [
                {
                    "symbol": opp.symbol,
                    "name": opp.name,
                    "price": float(opp.current_price),
                    "confidence": float(opp.confidence_score),
                    "risk_level": opp.risk_level,
                    "discovered_at": datetime.now().isoformat(),
                }
                for opp in opportunities
            ]

            with open("data/latest_opportunities.json", "w") as f:
                json.dump(opportunities_data, f, indent=2)

            logger.info(
                f"✅ Discovery complete: {len(opportunities)} opportunities found"
            )

            # Log top 3 opportunities
            for i, opp in enumerate(opportunities[:3], 1):
                logger.info(
                    f"  {i}. {opp.symbol} - ${opp.current_price:.2f} (Confidence: {opp.confidence_score:.1%})"
                )

        except Exception as e:
            logger.error(f"❌ Error in discovery: {e}")

    async def run_monitoring(self):
        """Run monitoring cycle to check for alerts."""
        try:
            logger.info("📊 Running Monitoring Cycle...")

            alerts = await self.monitoring_system.run_monitoring_cycle()

            self.stats["monitoring_cycles"] += 1
            self.stats["alerts_generated"] += len(alerts)
            self.stats["last_monitoring"] = datetime.now().isoformat()

            if alerts:
                logger.info(f"📢 Generated {len(alerts)} new alerts")
                for alert in alerts[:5]:  # Log first 5
                    logger.info(f"  🚨 {alert.symbol}: {alert.title}")
            else:
                logger.info("✅ No alerts - markets stable")

        except Exception as e:
            logger.error(f"❌ Error in monitoring: {e}")

    async def check_trader_signals(self):
        """Check for new trading signals from followed traders."""
        try:
            logger.info("👥 Checking Trader Signals...")

            signals = self.trader_following.get_recent_signals(hours=1)

            if signals:
                self.stats["signals_found"] += len(signals)
                logger.info(f"📡 Found {len(signals)} new signals")

                # Save signals
                signals_data = [
                    {
                        "symbol": signal.symbol,
                        "action": signal.action,
                        "trader": signal.trader_name,
                        "confidence": float(signal.confidence),
                        "timestamp": signal.timestamp.isoformat(),
                    }
                    for signal in signals
                ]

                with open("data/latest_signals.json", "w") as f:
                    json.dump(signals_data, f, indent=2)

                for signal in signals[:3]:
                    logger.info(
                        f"  📈 {signal.symbol} - {signal.action} by {signal.trader_name}"
                    )
            else:
                logger.info("✅ No new signals from traders")

        except Exception as e:
            logger.error(f"❌ Error checking trader signals: {e}")

    async def run_daily_backtest(self):
        """Run daily backtests on strategies."""
        try:
            logger.info("📈 Running Daily Backtest...")

            strategies = ["MA Crossover", "RSI Mean Reversion", "Momentum"]
            symbols = ["AAPL", "MSFT", "GOOGL"]

            for strategy in strategies:
                result = await self.backtesting_framework.run_backtest(
                    strategy_name=strategy,
                    symbols=symbols,
                    start_date=(datetime.now() - timedelta(days=365)).strftime(
                        "%Y-%m-%d"
                    ),
                    end_date=datetime.now().strftime("%Y-%m-%d"),
                )

                logger.info(
                    f"  ✅ {strategy}: Return={result.total_return_pct:.2f}%, Sharpe={result.sharpe_ratio:.2f}"
                )

            self.stats["last_backtest"] = datetime.now().isoformat()
            logger.info("✅ Daily backtest complete")

        except Exception as e:
            logger.error(f"❌ Error in backtest: {e}")

    def save_stats(self):
        """Save scheduler statistics."""
        try:
            with open("data/scheduler_stats.json", "w") as f:
                json.dump(self.stats, f, indent=2)
        except Exception as e:
            logger.error(f"Error saving stats: {e}")

    def print_status(self):
        """Print current status."""
        logger.info("=" * 80)
        logger.info("📊 TRADING PLATFORM STATUS")
        logger.info("=" * 80)
        logger.info(f"⏱️  Running since: {self.stats['started_at']}")
        logger.info(f"🔍 Discovery runs: {self.stats['discovery_runs']}")
        logger.info(f"📊 Monitoring cycles: {self.stats['monitoring_cycles']}")
        logger.info(f"🚨 Alerts generated: {self.stats['alerts_generated']}")
        logger.info(f"📡 Signals found: {self.stats['signals_found']}")
        logger.info(f"🕐 Last discovery: {self.stats['last_discovery']}")
        logger.info(f"🕐 Last monitoring: {self.stats['last_monitoring']}")
        logger.info("=" * 80)

    def schedule_jobs(self):
        """Schedule all automated jobs."""

        # === REAL-TIME MONITORING (Every 5 minutes during market hours) ===
        def monitoring_job():
            if self.is_market_hours():
                asyncio.run(self.run_monitoring())

        schedule.every(5).minutes.do(monitoring_job)
        logger.info("📊 Scheduled: Monitoring every 5 minutes (market hours)")

        # === DISCOVERY ENGINE (Every 4 hours during market hours) ===
        def discovery_job():
            if self.is_market_hours():
                asyncio.run(self.run_discovery())

        schedule.every(4).hours.do(discovery_job)
        logger.info("🔍 Scheduled: Discovery every 4 hours (market hours)")

        # === TRADER SIGNALS (Every 15 minutes during market hours) ===
        def trader_signals_job():
            if self.is_market_hours():
                asyncio.run(self.check_trader_signals())

        schedule.every(15).minutes.do(trader_signals_job)
        logger.info("👥 Scheduled: Trader signals every 15 minutes (market hours)")

        # === DAILY BACKTEST (Once daily at 6 PM) ===
        schedule.every().day.at("18:00").do(
            lambda: asyncio.run(self.run_daily_backtest())
        )
        logger.info("📈 Scheduled: Daily backtest at 6:00 PM")

        # === STATUS REPORT (Every hour) ===
        schedule.every(1).hours.do(self.print_status)
        logger.info("📋 Scheduled: Status report every hour")

        # === STATS BACKUP (Every 30 minutes) ===
        schedule.every(30).minutes.do(self.save_stats)
        logger.info("💾 Scheduled: Stats backup every 30 minutes")

    def start(self):
        """Start the scheduler."""

        # Create data directory if it doesn't exist
        Path("data").mkdir(exist_ok=True)

        logger.info("\n" + "=" * 80)
        logger.info("🚀 TRUE NORTH TRADING SCHEDULER")
        logger.info("=" * 80)

        # Initialize components
        if not self.initialize_components():
            logger.error("Failed to initialize components. Exiting.")
            return

        self.stats["started_at"] = datetime.now().isoformat()
        self.is_running = True

        # Schedule all jobs
        logger.info("\n📅 Setting up schedule...")
        self.schedule_jobs()

        logger.info("\n✅ Scheduler started successfully!")
        logger.info(f"⏰ Current time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        logger.info(f"📈 Market hours: {self.market_open}:00 - {self.market_close}:00")
        logger.info("\nRunning... (Press Ctrl+C to stop)\n")

        # Run initial discovery and monitoring
        logger.info("🎯 Running initial discovery and monitoring...")
        asyncio.run(self.run_discovery())
        asyncio.run(self.run_monitoring())

        # Main loop
        try:
            while self.is_running:
                schedule.run_pending()
                time.sleep(1)
        except KeyboardInterrupt:
            self.stop()

    def stop(self):
        """Stop the scheduler gracefully."""
        logger.info("\n⏸️  Stopping scheduler...")
        self.is_running = False
        self.save_stats()
        logger.info("✅ Scheduler stopped. Final stats saved.")
        logger.info(f"📊 Total discovery runs: {self.stats['discovery_runs']}")
        logger.info(f"📊 Total monitoring cycles: {self.stats['monitoring_cycles']}")
        logger.info(f"📊 Total alerts: {self.stats['alerts_generated']}")
        logger.info("👋 Goodbye!")


def main():
    """Main entry point."""

    # Create logs directory
    Path("logs").mkdir(exist_ok=True)

    # Create scheduler
    scheduler = TradingScheduler()

    # Handle graceful shutdown
    def signal_handler(sig, frame):
        scheduler.stop()
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    # Start scheduler
    scheduler.start()


if __name__ == "__main__":
    main()
