"""
Robust Monitoring and Alerting System for True North Trading Platform
Real-time alerts with multiple notification channels and intelligent filtering.
"""

import asyncio
import aiohttp
import smtplib
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass, field
from email.mime.text import MIMEText as MimeText
from email.mime.multipart import MIMEMultipart as MimeMultipart
import yfinance as yf
import pandas as pd
import numpy as np
from enum import Enum
import sqlite3
from pathlib import Path
import threading
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AlertType(Enum):
    """Types of alerts the system can generate."""

    PRICE_BREAKOUT = "price_breakout"
    VOLUME_SPIKE = "volume_spike"
    TECHNICAL_SIGNAL = "technical_signal"
    NEWS_EVENT = "news_event"
    SENTIMENT_SHIFT = "sentiment_shift"
    EARNINGS_ANNOUNCEMENT = "earnings_announcement"
    INSIDER_TRADING = "insider_trading"
    SYSTEM_ERROR = "system_error"
    COST_ALERT = "cost_alert"


class AlertSeverity(Enum):
    """Alert severity levels."""

    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class NotificationChannel(Enum):
    """Available notification channels."""

    EMAIL = "email"
    SMS = "sms"
    SLACK = "slack"
    DISCORD = "discord"
    WEBHOOK = "webhook"
    CONSOLE = "console"


@dataclass
class Alert:
    """Represents a trading alert."""

    id: str
    alert_type: AlertType
    severity: AlertSeverity
    symbol: Optional[str]
    title: str
    message: str
    timestamp: datetime
    data: Dict[str, Any] = field(default_factory=dict)
    channels: List[NotificationChannel] = field(default_factory=list)
    acknowledged: bool = False
    resolved: bool = False

    def to_dict(self) -> Dict[str, Any]:
        """Convert alert to dictionary for storage/transmission."""
        return {
            "id": self.id,
            "alert_type": self.alert_type.value,
            "severity": self.severity.value,
            "symbol": self.symbol,
            "title": self.title,
            "message": self.message,
            "timestamp": self.timestamp.isoformat(),
            "data": self.data,
            "channels": [c.value for c in self.channels],
            "acknowledged": self.acknowledged,
            "resolved": self.resolved,
        }


class AlertRule:
    """Defines conditions for triggering alerts."""

    def __init__(
        self,
        name: str,
        alert_type: AlertType,
        severity: AlertSeverity,
        condition_func: Callable,
        channels: List[NotificationChannel],
        cooldown_minutes: int = 60,
        enabled: bool = True,
    ):
        self.name = name
        self.alert_type = alert_type
        self.severity = severity
        self.condition_func = condition_func
        self.channels = channels
        self.cooldown_minutes = cooldown_minutes
        self.enabled = enabled
        self.last_triggered = {}  # symbol -> timestamp

    def can_trigger(self, symbol: str) -> bool:
        """Check if alert can be triggered for symbol (respects cooldown)."""
        if not self.enabled:
            return False

        last_time = self.last_triggered.get(symbol)
        if last_time is None:
            return True

        cooldown_delta = timedelta(minutes=self.cooldown_minutes)
        return datetime.now() - last_time > cooldown_delta

    def mark_triggered(self, symbol: str):
        """Mark alert as triggered for symbol."""
        self.last_triggered[symbol] = datetime.now()


class PriceMonitor:
    """Monitors price movements and generates alerts."""

    def __init__(self):
        self.price_cache = {}
        self.support_resistance_levels = {}

    async def check_price_alerts(self, symbols: List[str]) -> List[Alert]:
        """Check for price-based alerts."""
        alerts = []

        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="5d")

                if len(hist) == 0:
                    continue

                current_price = hist["Close"].iloc[-1]
                prev_price = hist["Close"].iloc[-2] if len(hist) > 1 else current_price

                # Price change alert
                price_change = ((current_price - prev_price) / prev_price) * 100

                if abs(price_change) > 5:  # 5% move
                    severity = (
                        AlertSeverity.HIGH
                        if abs(price_change) > 10
                        else AlertSeverity.MEDIUM
                    )

                    alert = Alert(
                        id=f"price_{symbol}_{int(datetime.now().timestamp())}",
                        alert_type=AlertType.PRICE_BREAKOUT,
                        severity=severity,
                        symbol=symbol,
                        title=f"{symbol} Price Alert",
                        message=f"{symbol} moved {price_change:+.2f}% to ${current_price:.2f}",
                        timestamp=datetime.now(),
                        data={
                            "current_price": current_price,
                            "previous_price": prev_price,
                            "price_change_percent": price_change,
                        },
                        channels=[
                            NotificationChannel.EMAIL,
                            NotificationChannel.CONSOLE,
                        ],
                    )
                    alerts.append(alert)

                # Support/Resistance breakout
                breakout_alert = self._check_support_resistance_breakout(symbol, hist)
                if breakout_alert:
                    alerts.append(breakout_alert)

                # Update cache
                self.price_cache[symbol] = current_price

            except Exception as e:
                logger.error(f"Error checking price alerts for {symbol}: {e}")

        return alerts

    def _check_support_resistance_breakout(
        self, symbol: str, hist: pd.DataFrame
    ) -> Optional[Alert]:
        """Check for support/resistance level breakouts."""
        try:
            if len(hist) < 20:
                return None

            current_price = hist["Close"].iloc[-1]

            # Calculate support and resistance levels (simplified)
            high_20d = hist["High"].rolling(20).max().iloc[-1]
            low_20d = hist["Low"].rolling(20).min().iloc[-1]

            # Breakout above resistance
            if current_price > high_20d * 1.01:  # 1% above resistance
                return Alert(
                    id=f"breakout_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.PRICE_BREAKOUT,
                    severity=AlertSeverity.HIGH,
                    symbol=symbol,
                    title=f"{symbol} Resistance Breakout",
                    message=f"{symbol} broke above resistance at ${high_20d:.2f}, now ${current_price:.2f}",
                    timestamp=datetime.now(),
                    data={
                        "current_price": current_price,
                        "resistance_level": high_20d,
                        "breakout_type": "resistance",
                    },
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            # Breakdown below support
            elif current_price < low_20d * 0.99:  # 1% below support
                return Alert(
                    id=f"breakdown_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.PRICE_BREAKOUT,
                    severity=AlertSeverity.HIGH,
                    symbol=symbol,
                    title=f"{symbol} Support Breakdown",
                    message=f"{symbol} broke below support at ${low_20d:.2f}, now ${current_price:.2f}",
                    timestamp=datetime.now(),
                    data={
                        "current_price": current_price,
                        "support_level": low_20d,
                        "breakout_type": "support",
                    },
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            return None

        except Exception as e:
            logger.error(f"Error checking breakout for {symbol}: {e}")
            return None


class VolumeMonitor:
    """Monitors volume spikes and unusual activity."""

    async def check_volume_alerts(self, symbols: List[str]) -> List[Alert]:
        """Check for volume-based alerts."""
        alerts = []

        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="30d")

                if len(hist) < 20:
                    continue

                current_volume = hist["Volume"].iloc[-1]
                avg_volume_20d = hist["Volume"].rolling(20).mean().iloc[-1]

                volume_ratio = current_volume / avg_volume_20d

                # Volume spike alert
                if volume_ratio > 3.0:  # 3x average volume
                    severity = (
                        AlertSeverity.HIGH
                        if volume_ratio > 5.0
                        else AlertSeverity.MEDIUM
                    )

                    alert = Alert(
                        id=f"volume_{symbol}_{int(datetime.now().timestamp())}",
                        alert_type=AlertType.VOLUME_SPIKE,
                        severity=severity,
                        symbol=symbol,
                        title=f"{symbol} Volume Spike",
                        message=f"{symbol} volume spike: {volume_ratio:.1f}x average ({current_volume:,.0f} vs {avg_volume_20d:,.0f})",
                        timestamp=datetime.now(),
                        data={
                            "current_volume": current_volume,
                            "average_volume": avg_volume_20d,
                            "volume_ratio": volume_ratio,
                        },
                        channels=[
                            NotificationChannel.EMAIL,
                            NotificationChannel.CONSOLE,
                        ],
                    )
                    alerts.append(alert)

            except Exception as e:
                logger.error(f"Error checking volume alerts for {symbol}: {e}")

        return alerts


class TechnicalIndicatorMonitor:
    """Monitors technical indicators for signals."""

    async def check_technical_alerts(self, symbols: List[str]) -> List[Alert]:
        """Check for technical indicator alerts."""
        alerts = []

        for symbol in symbols:
            try:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="60d")

                if len(hist) < 30:
                    continue

                # RSI alerts
                rsi_alert = self._check_rsi_alert(symbol, hist)
                if rsi_alert:
                    alerts.append(rsi_alert)

                # MACD alerts
                macd_alert = self._check_macd_alert(symbol, hist)
                if macd_alert:
                    alerts.append(macd_alert)

                # Moving average crossover
                ma_alert = self._check_ma_crossover_alert(symbol, hist)
                if ma_alert:
                    alerts.append(ma_alert)

            except Exception as e:
                logger.error(f"Error checking technical alerts for {symbol}: {e}")

        return alerts

    def _check_rsi_alert(self, symbol: str, hist: pd.DataFrame) -> Optional[Alert]:
        """Check for RSI overbought/oversold alerts."""
        try:
            # Calculate RSI
            delta = hist["Close"].diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
            rs = gain / loss
            rsi = 100 - (100 / (1 + rs))

            current_rsi = rsi.iloc[-1]
            prev_rsi = rsi.iloc[-2]

            # Overbought condition (RSI > 70)
            if current_rsi > 70 and prev_rsi <= 70:
                return Alert(
                    id=f"rsi_overbought_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.TECHNICAL_SIGNAL,
                    severity=AlertSeverity.MEDIUM,
                    symbol=symbol,
                    title=f"{symbol} RSI Overbought",
                    message=f"{symbol} RSI entered overbought territory: {current_rsi:.1f}",
                    timestamp=datetime.now(),
                    data={"rsi": current_rsi, "condition": "overbought"},
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            # Oversold condition (RSI < 30)
            elif current_rsi < 30 and prev_rsi >= 30:
                return Alert(
                    id=f"rsi_oversold_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.TECHNICAL_SIGNAL,
                    severity=AlertSeverity.MEDIUM,
                    symbol=symbol,
                    title=f"{symbol} RSI Oversold",
                    message=f"{symbol} RSI entered oversold territory: {current_rsi:.1f}",
                    timestamp=datetime.now(),
                    data={"rsi": current_rsi, "condition": "oversold"},
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            return None

        except Exception as e:
            logger.error(f"Error calculating RSI for {symbol}: {e}")
            return None

    def _check_macd_alert(self, symbol: str, hist: pd.DataFrame) -> Optional[Alert]:
        """Check for MACD signal line crossovers."""
        try:
            # Calculate MACD
            ema_12 = hist["Close"].ewm(span=12).mean()
            ema_26 = hist["Close"].ewm(span=26).mean()
            macd_line = ema_12 - ema_26
            signal_line = macd_line.ewm(span=9).mean()

            current_macd = macd_line.iloc[-1]
            current_signal = signal_line.iloc[-1]
            prev_macd = macd_line.iloc[-2]
            prev_signal = signal_line.iloc[-2]

            # Bullish crossover (MACD crosses above signal)
            if current_macd > current_signal and prev_macd <= prev_signal:
                return Alert(
                    id=f"macd_bullish_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.TECHNICAL_SIGNAL,
                    severity=AlertSeverity.MEDIUM,
                    symbol=symbol,
                    title=f"{symbol} MACD Bullish Crossover",
                    message=f"{symbol} MACD crossed above signal line - potential bullish signal",
                    timestamp=datetime.now(),
                    data={
                        "macd": current_macd,
                        "signal": current_signal,
                        "crossover": "bullish",
                    },
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            # Bearish crossover (MACD crosses below signal)
            elif current_macd < current_signal and prev_macd >= prev_signal:
                return Alert(
                    id=f"macd_bearish_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.TECHNICAL_SIGNAL,
                    severity=AlertSeverity.MEDIUM,
                    symbol=symbol,
                    title=f"{symbol} MACD Bearish Crossover",
                    message=f"{symbol} MACD crossed below signal line - potential bearish signal",
                    timestamp=datetime.now(),
                    data={
                        "macd": current_macd,
                        "signal": current_signal,
                        "crossover": "bearish",
                    },
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            return None

        except Exception as e:
            logger.error(f"Error calculating MACD for {symbol}: {e}")
            return None

    def _check_ma_crossover_alert(
        self, symbol: str, hist: pd.DataFrame
    ) -> Optional[Alert]:
        """Check for moving average crossover alerts."""
        try:
            sma_50 = hist["Close"].rolling(50).mean()
            sma_200 = hist["Close"].rolling(200).mean()

            if len(sma_200.dropna()) < 2:
                return None

            current_50 = sma_50.iloc[-1]
            current_200 = sma_200.iloc[-1]
            prev_50 = sma_50.iloc[-2]
            prev_200 = sma_200.iloc[-2]

            # Golden cross (50 SMA crosses above 200 SMA)
            if current_50 > current_200 and prev_50 <= prev_200:
                return Alert(
                    id=f"golden_cross_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.TECHNICAL_SIGNAL,
                    severity=AlertSeverity.HIGH,
                    symbol=symbol,
                    title=f"{symbol} Golden Cross",
                    message=f"{symbol} 50-day SMA crossed above 200-day SMA - bullish signal",
                    timestamp=datetime.now(),
                    data={
                        "sma_50": current_50,
                        "sma_200": current_200,
                        "crossover": "golden_cross",
                    },
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            # Death cross (50 SMA crosses below 200 SMA)
            elif current_50 < current_200 and prev_50 >= prev_200:
                return Alert(
                    id=f"death_cross_{symbol}_{int(datetime.now().timestamp())}",
                    alert_type=AlertType.TECHNICAL_SIGNAL,
                    severity=AlertSeverity.HIGH,
                    symbol=symbol,
                    title=f"{symbol} Death Cross",
                    message=f"{symbol} 50-day SMA crossed below 200-day SMA - bearish signal",
                    timestamp=datetime.now(),
                    data={
                        "sma_50": current_50,
                        "sma_200": current_200,
                        "crossover": "death_cross",
                    },
                    channels=[NotificationChannel.EMAIL, NotificationChannel.CONSOLE],
                )

            return None

        except Exception as e:
            logger.error(f"Error checking MA crossover for {symbol}: {e}")
            return None


class NewsMonitor:
    """Monitors news events and generates alerts."""

    def __init__(self):
        self.news_api_key = None  # Set from environment

    async def check_news_alerts(self, symbols: List[str]) -> List[Alert]:
        """Check for news-based alerts."""
        alerts = []

        # This is a simplified implementation
        # In production, you'd integrate with news APIs and NLP

        for symbol in symbols:
            try:
                # Simulate news event detection
                # In real implementation, analyze news sentiment and impact

                # Random simulation for demonstration
                if np.random.random() < 0.1:  # 10% chance of news alert
                    severity = AlertSeverity.MEDIUM

                    alert = Alert(
                        id=f"news_{symbol}_{int(datetime.now().timestamp())}",
                        alert_type=AlertType.NEWS_EVENT,
                        severity=severity,
                        symbol=symbol,
                        title=f"{symbol} News Alert",
                        message=f"Significant news detected for {symbol} - check latest headlines",
                        timestamp=datetime.now(),
                        data={"news_type": "earnings", "sentiment": "positive"},
                        channels=[
                            NotificationChannel.EMAIL,
                            NotificationChannel.CONSOLE,
                        ],
                    )
                    alerts.append(alert)

            except Exception as e:
                logger.error(f"Error checking news alerts for {symbol}: {e}")

        return alerts


class NotificationManager:
    """Manages sending notifications through various channels."""

    def __init__(self):
        self.email_config = {
            "smtp_server": "smtp.gmail.com",
            "smtp_port": 587,
            "username": "",  # Set from environment
            "password": "",  # Set from environment
            "from_email": "",  # Set from environment
        }

        self.notification_history = []

    async def send_alert(
        self, alert: Alert, channels: List[NotificationChannel] = None
    ):
        """Send alert through specified channels."""
        if channels is None:
            channels = alert.channels

        for channel in channels:
            try:
                if channel == NotificationChannel.EMAIL:
                    await self._send_email(alert)
                elif channel == NotificationChannel.CONSOLE:
                    self._send_console(alert)
                elif channel == NotificationChannel.SLACK:
                    await self._send_slack(alert)
                elif channel == NotificationChannel.WEBHOOK:
                    await self._send_webhook(alert)

            except Exception as e:
                logger.error(f"Error sending alert via {channel.value}: {e}")

        # Record notification
        self.notification_history.append(
            {
                "alert_id": alert.id,
                "channels": [c.value for c in channels],
                "timestamp": datetime.now(),
                "success": True,
            }
        )

    async def _send_email(self, alert: Alert):
        """Send alert via email."""
        try:
            if not self.email_config["username"]:
                logger.warning("Email not configured, skipping email notification")
                return

            msg = MimeMultipart()
            msg["From"] = self.email_config["from_email"]
            msg["To"] = "trader@example.com"  # Configure recipient
            msg["Subject"] = f"[{alert.severity.value.upper()}] {alert.title}"

            body = f"""
            Alert: {alert.title}
            Symbol: {alert.symbol}
            Severity: {alert.severity.value.upper()}
            Time: {alert.timestamp.strftime('%Y-%m-%d %H:%M:%S')}
            
            Message:
            {alert.message}
            
            Data:
            {json.dumps(alert.data, indent=2)}
            """

            msg.attach(MimeText(body, "plain"))

            # Note: In production, implement actual SMTP sending
            logger.info(f"Email notification prepared for alert {alert.id}")

        except Exception as e:
            logger.error(f"Error sending email: {e}")

    def _send_console(self, alert: Alert):
        """Send alert to console."""
        severity_colors = {
            AlertSeverity.LOW: "🟢",
            AlertSeverity.MEDIUM: "🟡",
            AlertSeverity.HIGH: "🟠",
            AlertSeverity.CRITICAL: "🔴",
        }

        color = severity_colors.get(alert.severity, "⚪")

        print(f"\n{color} ALERT: {alert.title}")
        print(f"   Symbol: {alert.symbol}")
        print(f"   Severity: {alert.severity.value.upper()}")
        print(f"   Time: {alert.timestamp.strftime('%H:%M:%S')}")
        print(f"   Message: {alert.message}")

        if alert.data:
            print(f"   Data: {alert.data}")

    async def _send_slack(self, alert: Alert):
        """Send alert to Slack."""
        # Placeholder for Slack integration
        logger.info(f"Slack notification prepared for alert {alert.id}")

    async def _send_webhook(self, alert: Alert):
        """Send alert via webhook."""
        # Placeholder for webhook integration
        logger.info(f"Webhook notification prepared for alert {alert.id}")


class AlertDatabase:
    """Manages alert storage and retrieval."""

    def __init__(self, db_path: str = "alerts.db"):
        self.db_path = db_path
        self._init_database()

    def _init_database(self):
        """Initialize the alerts database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS alerts (
                id TEXT PRIMARY KEY,
                alert_type TEXT,
                severity TEXT,
                symbol TEXT,
                title TEXT,
                message TEXT,
                timestamp TEXT,
                data TEXT,
                channels TEXT,
                acknowledged BOOLEAN,
                resolved BOOLEAN
            )
        """
        )

        conn.commit()
        conn.close()

    def save_alert(self, alert: Alert):
        """Save alert to database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT OR REPLACE INTO alerts 
            (id, alert_type, severity, symbol, title, message, timestamp, data, channels, acknowledged, resolved)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (
                alert.id,
                alert.alert_type.value,
                alert.severity.value,
                alert.symbol,
                alert.title,
                alert.message,
                alert.timestamp.isoformat(),
                json.dumps(alert.data),
                json.dumps([c.value for c in alert.channels]),
                alert.acknowledged,
                alert.resolved,
            ),
        )

        conn.commit()
        conn.close()

    def get_recent_alerts(self, hours: int = 24) -> List[Alert]:
        """Get recent alerts from database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        since = datetime.now() - timedelta(hours=hours)

        cursor.execute(
            """
            SELECT * FROM alerts 
            WHERE timestamp > ? 
            ORDER BY timestamp DESC
        """,
            (since.isoformat(),),
        )

        alerts = []
        for row in cursor.fetchall():
            alert = Alert(
                id=row[0],
                alert_type=AlertType(row[1]),
                severity=AlertSeverity(row[2]),
                symbol=row[3],
                title=row[4],
                message=row[5],
                timestamp=datetime.fromisoformat(row[6]),
                data=json.loads(row[7]),
                channels=[NotificationChannel(c) for c in json.loads(row[8])],
                acknowledged=bool(row[9]),
                resolved=bool(row[10]),
            )
            alerts.append(alert)

        conn.close()
        return alerts


class RobustMonitoringSystem:
    """Main monitoring system coordinating all monitors."""

    def __init__(self):
        self.price_monitor = PriceMonitor()
        self.volume_monitor = VolumeMonitor()
        self.technical_monitor = TechnicalIndicatorMonitor()
        self.news_monitor = NewsMonitor()
        self.notification_manager = NotificationManager()
        self.alert_database = AlertDatabase()

        # Watchlist of symbols to monitor
        self.watchlist = [
            "AAPL",
            "MSFT",
            "GOOGL",
            "AMZN",
            "TSLA",
            "NVDA",
            "META",
            "JPM",
            "BAC",
            "V",
            "MA",
            "JNJ",
            "PG",
            "WMT",
            "HD",
        ]

        # Monitoring configuration
        self.monitoring_interval = 300  # 5 minutes
        self.is_running = False
        self.monitoring_thread = None

    async def run_monitoring_cycle(self):
        """Run a single monitoring cycle."""
        print(f"\n🔍 Monitoring Cycle - {datetime.now().strftime('%H:%M:%S')}")

        all_alerts = []

        try:
            # Check all types of alerts
            price_alerts = await self.price_monitor.check_price_alerts(self.watchlist)
            volume_alerts = await self.volume_monitor.check_volume_alerts(
                self.watchlist
            )
            technical_alerts = await self.technical_monitor.check_technical_alerts(
                self.watchlist
            )
            news_alerts = await self.news_monitor.check_news_alerts(self.watchlist)

            all_alerts.extend(price_alerts)
            all_alerts.extend(volume_alerts)
            all_alerts.extend(technical_alerts)
            all_alerts.extend(news_alerts)

            # Process and send alerts
            for alert in all_alerts:
                # Save to database
                self.alert_database.save_alert(alert)

                # Send notifications
                await self.notification_manager.send_alert(alert)

            if all_alerts:
                print(f"   📢 Generated {len(all_alerts)} alerts")
            else:
                print("   ✅ No alerts generated")

            return all_alerts

        except Exception as e:
            logger.error(f"Error in monitoring cycle: {e}")
            return []

    def start_monitoring(self):
        """Start continuous monitoring."""
        if self.is_running:
            print("Monitoring already running")
            return

        self.is_running = True
        print("🚀 Starting Robust Monitoring System")
        print(f"   Watchlist: {len(self.watchlist)} symbols")
        print(f"   Interval: {self.monitoring_interval} seconds")

        def monitoring_loop():
            while self.is_running:
                try:
                    asyncio.run(self.run_monitoring_cycle())
                    time.sleep(self.monitoring_interval)
                except Exception as e:
                    logger.error(f"Error in monitoring loop: {e}")
                    time.sleep(60)  # Wait before retrying

        self.monitoring_thread = threading.Thread(target=monitoring_loop, daemon=True)
        self.monitoring_thread.start()

    def stop_monitoring(self):
        """Stop continuous monitoring."""
        self.is_running = False
        if self.monitoring_thread:
            self.monitoring_thread.join(timeout=10)
        print("🛑 Monitoring stopped")

    def get_alert_summary(self, hours: int = 24) -> Dict[str, Any]:
        """Get summary of recent alerts."""
        alerts = self.alert_database.get_recent_alerts(hours)

        summary = {
            "total_alerts": len(alerts),
            "by_severity": {},
            "by_type": {},
            "by_symbol": {},
            "unresolved_count": sum(1 for a in alerts if not a.resolved),
            "recent_alerts": [a.to_dict() for a in alerts[:10]],
        }

        for alert in alerts:
            # Count by severity
            severity = alert.severity.value
            summary["by_severity"][severity] = (
                summary["by_severity"].get(severity, 0) + 1
            )

            # Count by type
            alert_type = alert.alert_type.value
            summary["by_type"][alert_type] = summary["by_type"].get(alert_type, 0) + 1

            # Count by symbol
            if alert.symbol:
                summary["by_symbol"][alert.symbol] = (
                    summary["by_symbol"].get(alert.symbol, 0) + 1
                )

        return summary


async def main():
    """Demo the robust monitoring system."""
    print("🚀 Robust Monitoring System Demo")
    print("=" * 50)

    monitoring_system = RobustMonitoringSystem()

    # Run a few monitoring cycles
    print("\n📊 Running monitoring cycles...")

    for i in range(3):
        print(f"\nCycle {i + 1}:")
        alerts = await monitoring_system.run_monitoring_cycle()

        if alerts:
            print(f"   Generated {len(alerts)} alerts:")
            for alert in alerts:
                print(f"   • {alert.title} ({alert.severity.value})")

        await asyncio.sleep(2)  # Short delay for demo

    # Show alert summary
    print("\n📋 Alert Summary:")
    summary = monitoring_system.get_alert_summary()
    print(f"   Total Alerts: {summary['total_alerts']}")
    print(f"   By Severity: {summary['by_severity']}")
    print(f"   By Type: {summary['by_type']}")
    print(f"   Unresolved: {summary['unresolved_count']}")

    print(f"\n✅ Monitoring System Demo Complete!")
    print("💡 This system provides comprehensive real-time monitoring")
    print("   with intelligent alerting and multiple notification channels.")


if __name__ == "__main__":
    asyncio.run(main())
