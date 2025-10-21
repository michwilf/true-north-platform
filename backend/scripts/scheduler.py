"""
Scheduled Tasks for True North Trading Platform

Runs periodic tasks:
- Discovery engine (find new opportunities)
- Trader sync (update trader activity)
- Portfolio updates (refresh positions)
- Alert monitoring (check for new alerts)
"""

import schedule
import time
import asyncio
import sys
from pathlib import Path
from datetime import datetime
import logging

# Add project root to path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(project_root / 'backend' / 'logs' / 'scheduler.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Load environment variables
try:
    from dotenv import load_dotenv
    env_file = project_root / "backend" / ".env"
    if env_file.exists():
        load_dotenv(env_file)
        logger.info(f"✅ Loaded environment from {env_file}")
except ImportError:
    logger.warning("⚠️  python-dotenv not installed")

# Import systems
from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.trader_following import TraderFollowingSystem
from backend.core.monitoring import RobustMonitoringSystem
from backend.core.portfolio import PortfolioTracker

# Initialize systems
logger.info("🚀 Initializing trading systems...")
discovery_engine = None
trader_system = None
monitoring_system = None
portfolio_tracker = None

try:
    discovery_engine = EnhancedDiscoveryEngine()
    trader_system = TraderFollowingSystem()
    monitoring_system = RobustMonitoringSystem()
    portfolio_tracker = PortfolioTracker()
    logger.info("✅ All systems initialized")
except Exception as e:
    logger.error(f"❌ Error initializing systems: {e}")
    sys.exit(1)


def run_discovery():
    """Run opportunity discovery."""
    logger.info("🔍 Running discovery engine...")
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        opportunities = loop.run_until_complete(discovery_engine.discover_opportunities())
        logger.info(f"✅ Found {len(opportunities)} opportunities")
        loop.close()
    except Exception as e:
        logger.error(f"❌ Discovery error: {e}")


def sync_traders():
    """Sync trader activity."""
    logger.info("👥 Syncing trader activity...")
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(trader_system.sync_trader_activity())
        logger.info("✅ Trader sync complete")
        loop.close()
    except Exception as e:
        logger.error(f"❌ Trader sync error: {e}")


def update_portfolio():
    """Update portfolio metrics."""
    logger.info("💼 Updating portfolio...")
    try:
        metrics = portfolio_tracker.calculate_metrics()
        logger.info(f"✅ Portfolio value: ${metrics['total_value']:,.2f}")
    except Exception as e:
        logger.error(f"❌ Portfolio update error: {e}")


def check_alerts():
    """Check for new alerts."""
    logger.info("🔔 Checking alerts...")
    try:
        # Monitoring system runs continuously, just log status
        alerts = monitoring_system.alert_database.get_recent_alerts(hours=1)
        if alerts:
            logger.info(f"⚠️  {len(alerts)} new alerts in the last hour")
        else:
            logger.info("✅ No new alerts")
    except Exception as e:
        logger.error(f"❌ Alert check error: {e}")


def heartbeat():
    """Log heartbeat to show scheduler is alive."""
    logger.info(f"💓 Scheduler heartbeat - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")


# Schedule tasks
logger.info("📅 Setting up schedule...")

# Discovery: Every 4 hours
schedule.every(4).hours.do(run_discovery)

# Trader sync: Every 2 hours
schedule.every(2).hours.do(sync_traders)

# Portfolio update: Every 30 minutes
schedule.every(30).minutes.do(update_portfolio)

# Alert check: Every 15 minutes
schedule.every(15).minutes.do(check_alerts)

# Heartbeat: Every 5 minutes
schedule.every(5).minutes.do(heartbeat)

# Run initial tasks
logger.info("🎬 Running initial tasks...")
run_discovery()
sync_traders()
update_portfolio()
check_alerts()

# Main loop
logger.info("🔄 Scheduler started. Press Ctrl+C to stop.")
logger.info("📊 Schedule:")
logger.info("   - Discovery: Every 4 hours")
logger.info("   - Trader Sync: Every 2 hours")
logger.info("   - Portfolio Update: Every 30 minutes")
logger.info("   - Alert Check: Every 15 minutes")
logger.info("   - Heartbeat: Every 5 minutes")

try:
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute
except KeyboardInterrupt:
    logger.info("🛑 Scheduler stopped by user")
except Exception as e:
    logger.error(f"❌ Scheduler error: {e}")
    sys.exit(1)

