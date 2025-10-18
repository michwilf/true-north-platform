#!/usr/bin/env python3
"""
True North Trading Platform - Advanced Monitoring & Alerting System
Real-time monitoring, alerts, portfolio tracking, and automated actions.
"""

import os
import sys
import json
import time
import smtplib
import logging
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart
from dotenv import load_dotenv
import asyncio
import aiohttp
import schedule

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("monitoring_system.log"), logging.StreamHandler()],
)
logger = logging.getLogger(__name__)


@dataclass
class Alert:
    """Alert data structure."""

    id: str
    symbol: str
    alert_type: str  # PRICE, VOLUME, NEWS, TECHNICAL, EARNINGS
    condition: str
    current_value: float
    threshold: float
    triggered_at: datetime
    severity: str  # LOW, MEDIUM, HIGH, CRITICAL
    message: str
    actions_taken: List[str] = field(default_factory=list)


@dataclass
class MonitoredStock:
    """Monitored stock configuration."""

    symbol: str
    price_alerts: Dict[str, float] = field(
        default_factory=dict
    )  # 'above': 150.0, 'below': 100.0
    volume_threshold: float = 2.0  # Volume multiplier
    rsi_thresholds: Dict[str, float] = field(
        default_factory=dict
    )  # 'oversold': 30, 'overbought': 70
    news_keywords: List[str] = field(default_factory=list)
    earnings_alert: bool = True
    technical_alerts: bool = True
    last_price: Optional[float] = None
    last_volume: Optional[float] = None
    last_checked: Optional[datetime] = None


class MonitoringSystem:
    """Advanced monitoring and alerting system."""

    def __init__(self):
        self.monitored_stocks: Dict[str, MonitoredStock] = {}
        self.active_alerts: List[Alert] = []
        self.alert_history: List[Alert] = []
        self.config_file = Path("monitoring_config.json")
        self.alerts_file = Path("alerts_history.json")

        # Load configuration
        self.load_configuration()

        # Email configuration
        self.email_config = {
            "smtp_server": os.getenv("SMTP_SERVER", "smtp.gmail.com"),
            "smtp_port": int(os.getenv("SMTP_PORT", "587")),
            "email_user": os.getenv("EMAIL_USER"),
            "email_password": os.getenv("EMAIL_PASSWORD"),
            "alert_recipients": os.getenv("ALERT_RECIPIENTS", "").split(","),
        }

        # Webhook configuration
        self.webhook_urls = {
            "slack": os.getenv("SLACK_WEBHOOK_URL"),
            "discord": os.getenv("DISCORD_WEBHOOK_URL"),
            "telegram": os.getenv("TELEGRAM_BOT_TOKEN"),
        }

        # Performance tracking
        self.performance_metrics = {
            "alerts_sent": 0,
            "successful_predictions": 0,
            "false_positives": 0,
            "system_uptime": datetime.now(),
        }

    def load_configuration(self):
        """Load monitoring configuration from file."""
        if self.config_file.exists():
            try:
                with open(self.config_file, "r") as f:
                    config = json.load(f)

                for symbol, stock_config in config.get("monitored_stocks", {}).items():
                    self.monitored_stocks[symbol] = MonitoredStock(
                        symbol=symbol,
                        price_alerts=stock_config.get("price_alerts", {}),
                        volume_threshold=stock_config.get("volume_threshold", 2.0),
                        rsi_thresholds=stock_config.get("rsi_thresholds", {}),
                        news_keywords=stock_config.get("news_keywords", []),
                        earnings_alert=stock_config.get("earnings_alert", True),
                        technical_alerts=stock_config.get("technical_alerts", True),
                    )

                logger.info(
                    f"Loaded configuration for {len(self.monitored_stocks)} stocks"
                )

            except Exception as e:
                logger.error(f"Error loading configuration: {e}")
        else:
            # Create default configuration
            self.create_default_configuration()

    def create_default_configuration(self):
        """Create default monitoring configuration."""
        default_stocks = {
            "AAPL": {
                "price_alerts": {"above": 200.0, "below": 150.0},
                "volume_threshold": 1.5,
                "rsi_thresholds": {"oversold": 30, "overbought": 70},
                "news_keywords": ["iPhone", "Apple", "earnings"],
                "earnings_alert": True,
                "technical_alerts": True,
            },
            "TSLA": {
                "price_alerts": {"above": 500.0, "below": 200.0},
                "volume_threshold": 2.0,
                "rsi_thresholds": {"oversold": 25, "overbought": 75},
                "news_keywords": ["Tesla", "Musk", "delivery"],
                "earnings_alert": True,
                "technical_alerts": True,
            },
            "NVDA": {
                "price_alerts": {"above": 150.0, "below": 100.0},
                "volume_threshold": 1.8,
                "rsi_thresholds": {"oversold": 30, "overbought": 70},
                "news_keywords": ["NVIDIA", "AI", "chip"],
                "earnings_alert": True,
                "technical_alerts": True,
            },
        }

        for symbol, config in default_stocks.items():
            self.monitored_stocks[symbol] = MonitoredStock(
                symbol=symbol,
                price_alerts=config["price_alerts"],
                volume_threshold=config["volume_threshold"],
                rsi_thresholds=config["rsi_thresholds"],
                news_keywords=config["news_keywords"],
                earnings_alert=config["earnings_alert"],
                technical_alerts=config["technical_alerts"],
            )

        self.save_configuration()
        logger.info("Created default monitoring configuration")

    def save_configuration(self):
        """Save monitoring configuration to file."""
        config = {"monitored_stocks": {}}

        for symbol, stock in self.monitored_stocks.items():
            config["monitored_stocks"][symbol] = {
                "price_alerts": stock.price_alerts,
                "volume_threshold": stock.volume_threshold,
                "rsi_thresholds": stock.rsi_thresholds,
                "news_keywords": stock.news_keywords,
                "earnings_alert": stock.earnings_alert,
                "technical_alerts": stock.technical_alerts,
            }

        with open(self.config_file, "w") as f:
            json.dump(config, f, indent=2)

    def add_stock_to_monitor(self, symbol: str, config: Dict[str, Any]):
        """Add a stock to monitoring."""
        self.monitored_stocks[symbol] = MonitoredStock(
            symbol=symbol,
            price_alerts=config.get("price_alerts", {}),
            volume_threshold=config.get("volume_threshold", 2.0),
            rsi_thresholds=config.get(
                "rsi_thresholds", {"oversold": 30, "overbought": 70}
            ),
            news_keywords=config.get("news_keywords", []),
            earnings_alert=config.get("earnings_alert", True),
            technical_alerts=config.get("technical_alerts", True),
        )

        self.save_configuration()
        logger.info(f"Added {symbol} to monitoring")

    async def run_monitoring_cycle(self):
        """Run a complete monitoring cycle."""
        logger.info("Starting monitoring cycle")

        try:
            # Monitor price and volume
            await self.monitor_price_volume()

            # Monitor technical indicators
            await self.monitor_technical_indicators()

            # Monitor news and sentiment
            await self.monitor_news_sentiment()

            # Monitor earnings calendar
            await self.monitor_earnings_calendar()

            # Process and send alerts
            await self.process_alerts()

            # Update performance metrics
            self.update_performance_metrics()

            logger.info("Monitoring cycle completed")

        except Exception as e:
            logger.error(f"Error in monitoring cycle: {e}")

    async def monitor_price_volume(self):
        """Monitor price and volume alerts."""
        try:
            import yfinance as yf

            for symbol, stock in self.monitored_stocks.items():
                try:
                    ticker = yf.Ticker(symbol)
                    hist = ticker.history(period="2d")

                    if hist.empty:
                        continue

                    current_price = hist["Close"].iloc[-1]
                    current_volume = hist["Volume"].iloc[-1]

                    # Price alerts
                    for condition, threshold in stock.price_alerts.items():
                        if condition == "above" and current_price > threshold:
                            if not stock.last_price or stock.last_price <= threshold:
                                await self.create_alert(
                                    symbol=symbol,
                                    alert_type="PRICE",
                                    condition=f"Price above ${threshold}",
                                    current_value=current_price,
                                    threshold=threshold,
                                    severity="MEDIUM",
                                    message=f"{symbol} price ${current_price:.2f} is above threshold ${threshold:.2f}",
                                )

                        elif condition == "below" and current_price < threshold:
                            if not stock.last_price or stock.last_price >= threshold:
                                await self.create_alert(
                                    symbol=symbol,
                                    alert_type="PRICE",
                                    condition=f"Price below ${threshold}",
                                    current_value=current_price,
                                    threshold=threshold,
                                    severity="HIGH",
                                    message=f"{symbol} price ${current_price:.2f} is below threshold ${threshold:.2f}",
                                )

                    # Volume alerts
                    if len(hist) > 1:
                        avg_volume = (
                            hist["Volume"]
                            .rolling(window=min(20, len(hist)))
                            .mean()
                            .iloc[-1]
                        )
                        volume_ratio = (
                            current_volume / avg_volume if avg_volume > 0 else 1
                        )

                        if volume_ratio > stock.volume_threshold:
                            await self.create_alert(
                                symbol=symbol,
                                alert_type="VOLUME",
                                condition=f"Volume surge {volume_ratio:.1f}x",
                                current_value=volume_ratio,
                                threshold=stock.volume_threshold,
                                severity="MEDIUM",
                                message=f"{symbol} volume surge: {volume_ratio:.1f}x average volume",
                            )

                    # Update last values
                    stock.last_price = current_price
                    stock.last_volume = current_volume
                    stock.last_checked = datetime.now()

                    await asyncio.sleep(0.1)  # Rate limiting

                except Exception as e:
                    logger.warning(f"Error monitoring {symbol}: {e}")

        except Exception as e:
            logger.error(f"Price/volume monitoring error: {e}")

    async def monitor_technical_indicators(self):
        """Monitor technical indicator alerts."""
        try:
            import yfinance as yf
            import numpy as np

            for symbol, stock in self.monitored_stocks.items():
                if not stock.technical_alerts:
                    continue

                try:
                    ticker = yf.Ticker(symbol)
                    hist = ticker.history(period="60d")

                    if len(hist) < 20:
                        continue

                    # RSI calculation
                    delta = hist["Close"].diff()
                    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
                    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
                    rs = gain / loss
                    rsi = 100 - (100 / (1 + rs))
                    current_rsi = rsi.iloc[-1]

                    # RSI alerts
                    for condition, threshold in stock.rsi_thresholds.items():
                        if condition == "oversold" and current_rsi < threshold:
                            await self.create_alert(
                                symbol=symbol,
                                alert_type="TECHNICAL",
                                condition=f"RSI oversold < {threshold}",
                                current_value=current_rsi,
                                threshold=threshold,
                                severity="MEDIUM",
                                message=f"{symbol} RSI {current_rsi:.1f} indicates oversold condition",
                            )

                        elif condition == "overbought" and current_rsi > threshold:
                            await self.create_alert(
                                symbol=symbol,
                                alert_type="TECHNICAL",
                                condition=f"RSI overbought > {threshold}",
                                current_value=current_rsi,
                                threshold=threshold,
                                severity="MEDIUM",
                                message=f"{symbol} RSI {current_rsi:.1f} indicates overbought condition",
                            )

                    # Moving average crossovers
                    if len(hist) >= 50:
                        sma_20 = hist["Close"].rolling(window=20).mean()
                        sma_50 = hist["Close"].rolling(window=50).mean()

                        # Golden cross (20 SMA crosses above 50 SMA)
                        if (
                            sma_20.iloc[-1] > sma_50.iloc[-1]
                            and sma_20.iloc[-2] <= sma_50.iloc[-2]
                        ):
                            await self.create_alert(
                                symbol=symbol,
                                alert_type="TECHNICAL",
                                condition="Golden Cross",
                                current_value=sma_20.iloc[-1],
                                threshold=sma_50.iloc[-1],
                                severity="HIGH",
                                message=f"{symbol} Golden Cross: 20-day SMA crossed above 50-day SMA",
                            )

                        # Death cross (20 SMA crosses below 50 SMA)
                        elif (
                            sma_20.iloc[-1] < sma_50.iloc[-1]
                            and sma_20.iloc[-2] >= sma_50.iloc[-2]
                        ):
                            await self.create_alert(
                                symbol=symbol,
                                alert_type="TECHNICAL",
                                condition="Death Cross",
                                current_value=sma_20.iloc[-1],
                                threshold=sma_50.iloc[-1],
                                severity="HIGH",
                                message=f"{symbol} Death Cross: 20-day SMA crossed below 50-day SMA",
                            )

                    await asyncio.sleep(0.2)  # Rate limiting

                except Exception as e:
                    logger.warning(f"Technical analysis error for {symbol}: {e}")

        except Exception as e:
            logger.error(f"Technical monitoring error: {e}")

    async def monitor_news_sentiment(self):
        """Monitor news and sentiment alerts."""
        try:
            news_api_key = os.getenv("NEWS_API_KEY")
            if not news_api_key:
                return

            async with aiohttp.ClientSession() as session:
                for symbol, stock in self.monitored_stocks.items():
                    if not stock.news_keywords:
                        continue

                    try:
                        # Search for news with stock keywords
                        query = f"{symbol} OR " + " OR ".join(stock.news_keywords)

                        url = "https://newsapi.org/v2/everything"
                        params = {
                            "q": query,
                            "language": "en",
                            "sortBy": "publishedAt",
                            "pageSize": 10,
                            "from": (datetime.now() - timedelta(hours=6)).isoformat(),
                            "apiKey": news_api_key,
                        }

                        async with session.get(url, params=params) as response:
                            if response.status == 200:
                                data = await response.json()

                                for article in data.get("articles", []):
                                    title = article["title"]
                                    description = article.get("description", "")

                                    # Check for significant news keywords
                                    significant_keywords = [
                                        "earnings beat",
                                        "revenue beat",
                                        "guidance raised",
                                        "analyst upgrade",
                                        "price target",
                                        "acquisition",
                                        "partnership",
                                        "breakthrough",
                                        "FDA approval",
                                    ]

                                    text = f"{title} {description}".lower()

                                    for keyword in significant_keywords:
                                        if keyword in text:
                                            await self.create_alert(
                                                symbol=symbol,
                                                alert_type="NEWS",
                                                condition=f"Significant news: {keyword}",
                                                current_value=1.0,
                                                threshold=0.5,
                                                severity="HIGH",
                                                message=f"{symbol} news alert: {title[:100]}...",
                                            )
                                            break

                        await asyncio.sleep(1)  # Rate limiting

                    except Exception as e:
                        logger.warning(f"News monitoring error for {symbol}: {e}")

        except Exception as e:
            logger.error(f"News monitoring error: {e}")

    async def monitor_earnings_calendar(self):
        """Monitor upcoming earnings announcements."""
        try:
            import yfinance as yf

            for symbol, stock in self.monitored_stocks.items():
                if not stock.earnings_alert:
                    continue

                try:
                    ticker = yf.Ticker(symbol)
                    calendar = ticker.calendar

                    if calendar is not None and not calendar.empty:
                        earnings_date = (
                            calendar.index[0] if len(calendar.index) > 0 else None
                        )

                        if earnings_date:
                            days_until = (earnings_date - datetime.now()).days

                            # Alert for earnings in next 7 days
                            if 0 <= days_until <= 7:
                                await self.create_alert(
                                    symbol=symbol,
                                    alert_type="EARNINGS",
                                    condition=f"Earnings in {days_until} days",
                                    current_value=days_until,
                                    threshold=7,
                                    severity="MEDIUM",
                                    message=f'{symbol} earnings announcement in {days_until} days ({earnings_date.strftime("%Y-%m-%d")})',
                                )

                    await asyncio.sleep(0.1)  # Rate limiting

                except Exception as e:
                    logger.warning(f"Earnings monitoring error for {symbol}: {e}")

        except Exception as e:
            logger.error(f"Earnings monitoring error: {e}")

    async def create_alert(
        self,
        symbol: str,
        alert_type: str,
        condition: str,
        current_value: float,
        threshold: float,
        severity: str,
        message: str,
    ):
        """Create a new alert."""

        # Check if similar alert already exists (avoid spam)
        alert_key = f"{symbol}_{alert_type}_{condition}"

        # Don't create duplicate alerts within 1 hour
        recent_alerts = [
            a
            for a in self.active_alerts
            if a.symbol == symbol
            and a.alert_type == alert_type
            and (datetime.now() - a.triggered_at).seconds < 3600
        ]

        if recent_alerts:
            return

        alert = Alert(
            id=f"{alert_key}_{int(time.time())}",
            symbol=symbol,
            alert_type=alert_type,
            condition=condition,
            current_value=current_value,
            threshold=threshold,
            triggered_at=datetime.now(),
            severity=severity,
            message=message,
        )

        self.active_alerts.append(alert)
        logger.info(f"Created alert: {alert.message}")

    async def process_alerts(self):
        """Process and send active alerts."""
        if not self.active_alerts:
            return

        # Sort alerts by severity
        severity_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
        self.active_alerts.sort(key=lambda x: severity_order.get(x.severity, 3))

        # Send alerts
        for alert in self.active_alerts:
            try:
                # Send email alert
                if self.email_config["email_user"]:
                    await self.send_email_alert(alert)

                # Send webhook alerts
                await self.send_webhook_alerts(alert)

                # Mark actions taken
                alert.actions_taken.append("email_sent")
                alert.actions_taken.append("webhook_sent")

                # Move to history
                self.alert_history.append(alert)

                # Update metrics
                self.performance_metrics["alerts_sent"] += 1

            except Exception as e:
                logger.error(f"Error processing alert {alert.id}: {e}")

        # Clear active alerts
        self.active_alerts.clear()

        # Save alert history
        self.save_alert_history()

    async def send_email_alert(self, alert: Alert):
        """Send email alert."""
        try:
            if (
                not self.email_config["email_user"]
                or not self.email_config["alert_recipients"]
            ):
                return

            msg = MimeMultipart()
            msg["From"] = self.email_config["email_user"]
            msg["To"] = ", ".join(self.email_config["alert_recipients"])
            msg["Subject"] = f"🚨 True North Alert: {alert.symbol} - {alert.alert_type}"

            body = f"""
            True North Trading Platform Alert
            
            Symbol: {alert.symbol}
            Alert Type: {alert.alert_type}
            Severity: {alert.severity}
            Condition: {alert.condition}
            Current Value: {alert.current_value}
            Threshold: {alert.threshold}
            Time: {alert.triggered_at.strftime('%Y-%m-%d %H:%M:%S')}
            
            Message: {alert.message}
            
            ---
            True North Trading Platform
            Automated Alert System
            """

            msg.attach(MimeText(body, "plain"))

            server = smtplib.SMTP(
                self.email_config["smtp_server"], self.email_config["smtp_port"]
            )
            server.starttls()
            server.login(
                self.email_config["email_user"], self.email_config["email_password"]
            )
            text = msg.as_string()
            server.sendmail(
                self.email_config["email_user"],
                self.email_config["alert_recipients"],
                text,
            )
            server.quit()

            logger.info(f"Email alert sent for {alert.symbol}")

        except Exception as e:
            logger.error(f"Email alert error: {e}")

    async def send_webhook_alerts(self, alert: Alert):
        """Send webhook alerts to Slack, Discord, etc."""
        try:
            async with aiohttp.ClientSession() as session:
                # Slack webhook
                if self.webhook_urls["slack"]:
                    slack_payload = {
                        "text": f"🚨 *{alert.symbol}* Alert",
                        "attachments": [
                            {
                                "color": (
                                    "danger"
                                    if alert.severity in ["HIGH", "CRITICAL"]
                                    else "warning"
                                ),
                                "fields": [
                                    {
                                        "title": "Type",
                                        "value": alert.alert_type,
                                        "short": True,
                                    },
                                    {
                                        "title": "Severity",
                                        "value": alert.severity,
                                        "short": True,
                                    },
                                    {
                                        "title": "Condition",
                                        "value": alert.condition,
                                        "short": False,
                                    },
                                    {
                                        "title": "Message",
                                        "value": alert.message,
                                        "short": False,
                                    },
                                ],
                            }
                        ],
                    }

                    async with session.post(
                        self.webhook_urls["slack"], json=slack_payload
                    ) as response:
                        if response.status == 200:
                            logger.info(f"Slack alert sent for {alert.symbol}")

                # Discord webhook
                if self.webhook_urls["discord"]:
                    discord_payload = {
                        "embeds": [
                            {
                                "title": f"🚨 {alert.symbol} Alert",
                                "description": alert.message,
                                "color": (
                                    16711680
                                    if alert.severity in ["HIGH", "CRITICAL"]
                                    else 16776960
                                ),
                                "fields": [
                                    {
                                        "name": "Type",
                                        "value": alert.alert_type,
                                        "inline": True,
                                    },
                                    {
                                        "name": "Severity",
                                        "value": alert.severity,
                                        "inline": True,
                                    },
                                    {
                                        "name": "Condition",
                                        "value": alert.condition,
                                        "inline": False,
                                    },
                                ],
                                "timestamp": alert.triggered_at.isoformat(),
                            }
                        ]
                    }

                    async with session.post(
                        self.webhook_urls["discord"], json=discord_payload
                    ) as response:
                        if response.status == 204:
                            logger.info(f"Discord alert sent for {alert.symbol}")

        except Exception as e:
            logger.error(f"Webhook alert error: {e}")

    def save_alert_history(self):
        """Save alert history to file."""
        try:
            # Convert alerts to serializable format
            serializable_alerts = []
            for alert in self.alert_history[-100:]:  # Keep last 100 alerts
                serializable_alerts.append(
                    {
                        "id": alert.id,
                        "symbol": alert.symbol,
                        "alert_type": alert.alert_type,
                        "condition": alert.condition,
                        "current_value": alert.current_value,
                        "threshold": alert.threshold,
                        "triggered_at": alert.triggered_at.isoformat(),
                        "severity": alert.severity,
                        "message": alert.message,
                        "actions_taken": alert.actions_taken,
                    }
                )

            with open(self.alerts_file, "w") as f:
                json.dump(serializable_alerts, f, indent=2)

        except Exception as e:
            logger.error(f"Error saving alert history: {e}")

    def update_performance_metrics(self):
        """Update system performance metrics."""
        self.performance_metrics["system_uptime"] = datetime.now()

        # Calculate uptime
        uptime = datetime.now() - self.performance_metrics["system_uptime"]

        logger.info(
            f"Performance: {self.performance_metrics['alerts_sent']} alerts sent"
        )

    def get_system_status(self) -> Dict[str, Any]:
        """Get current system status."""
        return {
            "monitored_stocks": len(self.monitored_stocks),
            "active_alerts": len(self.active_alerts),
            "total_alerts_sent": self.performance_metrics["alerts_sent"],
            "system_uptime": self.performance_metrics["system_uptime"].isoformat(),
            "last_check": datetime.now().isoformat(),
            "email_configured": bool(self.email_config["email_user"]),
            "webhooks_configured": sum(1 for url in self.webhook_urls.values() if url),
        }

    def start_scheduled_monitoring(self):
        """Start scheduled monitoring."""
        # Schedule monitoring every 5 minutes during market hours
        schedule.every(5).minutes.do(lambda: asyncio.run(self.run_monitoring_cycle()))

        # Schedule daily summary
        schedule.every().day.at("17:00").do(self.send_daily_summary)

        logger.info("Scheduled monitoring started")

        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute

    def send_daily_summary(self):
        """Send daily monitoring summary."""
        try:
            summary = {
                "date": datetime.now().strftime("%Y-%m-%d"),
                "alerts_today": len(
                    [
                        a
                        for a in self.alert_history
                        if a.triggered_at.date() == datetime.now().date()
                    ]
                ),
                "monitored_stocks": len(self.monitored_stocks),
                "system_status": "OPERATIONAL",
            }

            logger.info(f"Daily summary: {summary}")

        except Exception as e:
            logger.error(f"Daily summary error: {e}")


def main():
    """Main function for monitoring system."""
    print("🔍 True North Trading Platform - Monitoring System")
    print("=" * 60)

    try:
        # Initialize monitoring system
        monitor = MonitoringSystem()

        print(f"📊 Monitoring {len(monitor.monitored_stocks)} stocks")
        print(
            f"📧 Email alerts: {'✅ Configured' if monitor.email_config['email_user'] else '❌ Not configured'}"
        )
        print(
            f"🔗 Webhooks: {sum(1 for url in monitor.webhook_urls.values() if url)} configured"
        )

        # Show current configuration
        print("\n📋 Current Monitoring Configuration:")
        for symbol, stock in monitor.monitored_stocks.items():
            print(
                f"   {symbol}: Price alerts: {stock.price_alerts}, Volume: {stock.volume_threshold}x"
            )

        # Run single monitoring cycle
        print("\n🔄 Running monitoring cycle...")
        asyncio.run(monitor.run_monitoring_cycle())

        # Show system status
        status = monitor.get_system_status()
        print(f"\n📊 System Status:")
        for key, value in status.items():
            print(f"   {key}: {value}")

        print("\n✅ Monitoring cycle completed!")
        print("\n💡 To run continuous monitoring:")
        print("   python monitoring_system.py --continuous")

    except KeyboardInterrupt:
        print("\n👋 Monitoring stopped by user")
    except Exception as e:
        logger.error(f"Monitoring system error: {e}")
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "--continuous":
        print("🔄 Starting continuous monitoring...")
        monitor = MonitoringSystem()
        monitor.start_scheduled_monitoring()
    else:
        main()
