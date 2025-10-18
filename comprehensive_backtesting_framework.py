"""
Comprehensive Backtesting and Strategy Validation Framework
Advanced backtesting with detailed performance metrics and risk analysis.
"""

import pandas as pd
import numpy as np
import yfinance as yf
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Callable, Tuple
from dataclasses import dataclass, field
from enum import Enum
import matplotlib.pyplot as plt
import seaborn as sns
from abc import ABC, abstractmethod
import logging
import json
from pathlib import Path
import warnings

warnings.filterwarnings("ignore")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class OrderType(Enum):
    """Types of orders."""

    MARKET = "market"
    LIMIT = "limit"
    STOP = "stop"
    STOP_LIMIT = "stop_limit"


class OrderSide(Enum):
    """Order sides."""

    BUY = "buy"
    SELL = "sell"


@dataclass
class Order:
    """Represents a trading order."""

    symbol: str
    side: OrderSide
    quantity: float
    order_type: OrderType
    price: Optional[float] = None
    stop_price: Optional[float] = None
    timestamp: datetime = field(default_factory=datetime.now)
    filled: bool = False
    fill_price: Optional[float] = None
    fill_timestamp: Optional[datetime] = None
    commission: float = 0.0

    def to_dict(self) -> Dict[str, Any]:
        """Convert order to dictionary."""
        return {
            "symbol": self.symbol,
            "side": self.side.value,
            "quantity": self.quantity,
            "order_type": self.order_type.value,
            "price": self.price,
            "stop_price": self.stop_price,
            "timestamp": self.timestamp.isoformat(),
            "filled": self.filled,
            "fill_price": self.fill_price,
            "fill_timestamp": (
                self.fill_timestamp.isoformat() if self.fill_timestamp else None
            ),
            "commission": self.commission,
        }


@dataclass
class Position:
    """Represents a trading position."""

    symbol: str
    quantity: float
    avg_price: float
    current_price: float = 0.0
    unrealized_pnl: float = 0.0
    realized_pnl: float = 0.0

    @property
    def market_value(self) -> float:
        """Current market value of position."""
        return self.quantity * self.current_price

    @property
    def total_pnl(self) -> float:
        """Total P&L (realized + unrealized)."""
        return self.realized_pnl + self.unrealized_pnl

    def update_price(self, new_price: float):
        """Update current price and unrealized P&L."""
        self.current_price = new_price
        self.unrealized_pnl = (new_price - self.avg_price) * self.quantity


@dataclass
class Trade:
    """Represents a completed trade."""

    symbol: str
    entry_date: datetime
    exit_date: datetime
    entry_price: float
    exit_price: float
    quantity: float
    side: OrderSide
    pnl: float
    pnl_percent: float
    commission: float
    duration_days: float

    def to_dict(self) -> Dict[str, Any]:
        """Convert trade to dictionary."""
        return {
            "symbol": self.symbol,
            "entry_date": self.entry_date.isoformat(),
            "exit_date": self.exit_date.isoformat(),
            "entry_price": self.entry_price,
            "exit_price": self.exit_price,
            "quantity": self.quantity,
            "side": self.side.value,
            "pnl": self.pnl,
            "pnl_percent": self.pnl_percent,
            "commission": self.commission,
            "duration_days": self.duration_days,
        }


class TradingStrategy(ABC):
    """Abstract base class for trading strategies."""

    def __init__(self, name: str):
        self.name = name
        self.parameters = {}

    @abstractmethod
    def generate_signals(self, data: pd.DataFrame) -> pd.Series:
        """Generate trading signals from market data.

        Returns:
            pd.Series: 1 for buy, -1 for sell, 0 for hold
        """
        pass

    def set_parameters(self, **kwargs):
        """Set strategy parameters."""
        self.parameters.update(kwargs)


class MovingAverageCrossoverStrategy(TradingStrategy):
    """Simple moving average crossover strategy."""

    def __init__(self, short_window: int = 20, long_window: int = 50):
        super().__init__("MA Crossover")
        self.short_window = short_window
        self.long_window = long_window
        self.parameters = {"short_window": short_window, "long_window": long_window}

    def generate_signals(self, data: pd.DataFrame) -> pd.Series:
        """Generate signals based on MA crossover."""
        signals = pd.Series(0, index=data.index)

        # Calculate moving averages
        short_ma = data["Close"].rolling(window=self.short_window).mean()
        long_ma = data["Close"].rolling(window=self.long_window).mean()

        # Generate signals
        signals[short_ma > long_ma] = 1  # Buy signal
        signals[short_ma < long_ma] = -1  # Sell signal

        # Only signal on crossovers
        signals = signals.diff().fillna(0)

        return signals


class RSIMeanReversionStrategy(TradingStrategy):
    """RSI-based mean reversion strategy."""

    def __init__(
        self, rsi_period: int = 14, oversold: float = 30, overbought: float = 70
    ):
        super().__init__("RSI Mean Reversion")
        self.rsi_period = rsi_period
        self.oversold = oversold
        self.overbought = overbought
        self.parameters = {
            "rsi_period": rsi_period,
            "oversold": oversold,
            "overbought": overbought,
        }

    def generate_signals(self, data: pd.DataFrame) -> pd.Series:
        """Generate signals based on RSI levels."""
        signals = pd.Series(0, index=data.index)

        # Calculate RSI
        delta = data["Close"].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=self.rsi_period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=self.rsi_period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))

        # Generate signals
        signals[rsi < self.oversold] = 1  # Buy when oversold
        signals[rsi > self.overbought] = -1  # Sell when overbought

        return signals


class MomentumStrategy(TradingStrategy):
    """Price momentum strategy."""

    def __init__(self, lookback_period: int = 20, momentum_threshold: float = 0.02):
        super().__init__("Momentum")
        self.lookback_period = lookback_period
        self.momentum_threshold = momentum_threshold
        self.parameters = {
            "lookback_period": lookback_period,
            "momentum_threshold": momentum_threshold,
        }

    def generate_signals(self, data: pd.DataFrame) -> pd.Series:
        """Generate signals based on price momentum."""
        signals = pd.Series(0, index=data.index)

        # Calculate momentum
        momentum = data["Close"].pct_change(self.lookback_period)

        # Generate signals
        signals[momentum > self.momentum_threshold] = 1  # Buy on positive momentum
        signals[momentum < -self.momentum_threshold] = -1  # Sell on negative momentum

        return signals


class Portfolio:
    """Manages portfolio state during backtesting."""

    def __init__(self, initial_capital: float = 100000, commission: float = 0.001):
        self.initial_capital = initial_capital
        self.cash = initial_capital
        self.commission_rate = commission
        self.positions: Dict[str, Position] = {}
        self.orders: List[Order] = []
        self.trades: List[Trade] = []
        self.equity_curve = []
        self.daily_returns = []

    @property
    def total_value(self) -> float:
        """Total portfolio value."""
        positions_value = sum(pos.market_value for pos in self.positions.values())
        return self.cash + positions_value

    @property
    def total_pnl(self) -> float:
        """Total P&L."""
        return self.total_value - self.initial_capital

    @property
    def total_return(self) -> float:
        """Total return percentage."""
        return (self.total_value / self.initial_capital - 1) * 100

    def place_order(self, order: Order) -> bool:
        """Place a trading order."""
        self.orders.append(order)
        return True

    def execute_order(
        self, order: Order, current_price: float, timestamp: datetime
    ) -> bool:
        """Execute a trading order."""
        try:
            # Calculate commission
            commission = abs(order.quantity * current_price * self.commission_rate)

            if order.side == OrderSide.BUY:
                total_cost = order.quantity * current_price + commission

                if total_cost > self.cash:
                    return False  # Insufficient funds

                # Update cash
                self.cash -= total_cost

                # Update position
                if order.symbol in self.positions:
                    pos = self.positions[order.symbol]
                    new_quantity = pos.quantity + order.quantity
                    new_avg_price = (
                        (pos.quantity * pos.avg_price)
                        + (order.quantity * current_price)
                    ) / new_quantity
                    pos.quantity = new_quantity
                    pos.avg_price = new_avg_price
                else:
                    self.positions[order.symbol] = Position(
                        symbol=order.symbol,
                        quantity=order.quantity,
                        avg_price=current_price,
                        current_price=current_price,
                    )

            elif order.side == OrderSide.SELL:
                if order.symbol not in self.positions:
                    return False  # No position to sell

                pos = self.positions[order.symbol]
                if pos.quantity < order.quantity:
                    return False  # Insufficient shares

                # Calculate proceeds
                proceeds = order.quantity * current_price - commission
                self.cash += proceeds

                # Calculate realized P&L
                realized_pnl = (
                    current_price - pos.avg_price
                ) * order.quantity - commission
                pos.realized_pnl += realized_pnl

                # Create trade record
                trade = Trade(
                    symbol=order.symbol,
                    entry_date=timestamp,  # Simplified - would track actual entry
                    exit_date=timestamp,
                    entry_price=pos.avg_price,
                    exit_price=current_price,
                    quantity=order.quantity,
                    side=OrderSide.SELL,
                    pnl=realized_pnl,
                    pnl_percent=(current_price / pos.avg_price - 1) * 100,
                    commission=commission,
                    duration_days=1,  # Simplified
                )
                self.trades.append(trade)

                # Update position
                pos.quantity -= order.quantity
                if pos.quantity == 0:
                    del self.positions[order.symbol]

            # Mark order as filled
            order.filled = True
            order.fill_price = current_price
            order.fill_timestamp = timestamp
            order.commission = commission

            return True

        except Exception as e:
            logger.error(f"Error executing order: {e}")
            return False

    def update_positions(self, prices: Dict[str, float]):
        """Update position prices and unrealized P&L."""
        for symbol, position in self.positions.items():
            if symbol in prices:
                position.update_price(prices[symbol])


class PerformanceMetrics:
    """Calculate comprehensive performance metrics."""

    @staticmethod
    def calculate_metrics(
        equity_curve: List[float],
        trades: List[Trade],
        benchmark_returns: Optional[pd.Series] = None,
        risk_free_rate: float = 0.02,
    ) -> Dict[str, Any]:
        """Calculate comprehensive performance metrics."""

        if not equity_curve or len(equity_curve) < 2:
            return {}

        # Convert to pandas Series
        equity_series = pd.Series(equity_curve)
        returns = equity_series.pct_change().dropna()

        # Basic metrics
        total_return = (equity_curve[-1] / equity_curve[0] - 1) * 100
        annualized_return = (
            (equity_curve[-1] / equity_curve[0]) ** (252 / len(equity_curve)) - 1
        ) * 100

        # Risk metrics
        volatility = returns.std() * np.sqrt(252) * 100
        max_drawdown = PerformanceMetrics._calculate_max_drawdown(equity_series)

        # Sharpe ratio
        excess_returns = returns - (risk_free_rate / 252)
        sharpe_ratio = (
            excess_returns.mean() / returns.std() * np.sqrt(252)
            if returns.std() > 0
            else 0
        )

        # Trade-based metrics
        trade_metrics = PerformanceMetrics._calculate_trade_metrics(trades)

        # Risk-adjusted metrics
        calmar_ratio = annualized_return / abs(max_drawdown) if max_drawdown != 0 else 0

        # Beta and alpha (if benchmark provided)
        beta, alpha = 0, 0
        if benchmark_returns is not None and len(benchmark_returns) == len(returns):
            covariance = np.cov(returns, benchmark_returns)[0][1]
            benchmark_variance = np.var(benchmark_returns)
            beta = covariance / benchmark_variance if benchmark_variance > 0 else 0
            alpha = (annualized_return / 100) - (
                risk_free_rate
                + beta * (benchmark_returns.mean() * 252 - risk_free_rate)
            )

        metrics = {
            # Return metrics
            "total_return_pct": total_return,
            "annualized_return_pct": annualized_return,
            "volatility_pct": volatility,
            # Risk metrics
            "max_drawdown_pct": max_drawdown,
            "sharpe_ratio": sharpe_ratio,
            "calmar_ratio": calmar_ratio,
            "beta": beta,
            "alpha": alpha,
            # Trade metrics
            **trade_metrics,
            # Additional metrics
            "total_trades": len(trades),
            "trading_days": len(equity_curve),
            "final_equity": equity_curve[-1],
            "initial_equity": equity_curve[0],
        }

        return metrics

    @staticmethod
    def _calculate_max_drawdown(equity_series: pd.Series) -> float:
        """Calculate maximum drawdown."""
        peak = equity_series.expanding().max()
        drawdown = (equity_series - peak) / peak * 100
        return drawdown.min()

    @staticmethod
    def _calculate_trade_metrics(trades: List[Trade]) -> Dict[str, Any]:
        """Calculate trade-based performance metrics."""
        if not trades:
            return {
                "win_rate_pct": 0,
                "avg_win_pct": 0,
                "avg_loss_pct": 0,
                "profit_factor": 0,
                "avg_trade_duration_days": 0,
            }

        # Separate winning and losing trades
        winning_trades = [t for t in trades if t.pnl > 0]
        losing_trades = [t for t in trades if t.pnl < 0]

        # Win rate
        win_rate = len(winning_trades) / len(trades) * 100

        # Average win/loss
        avg_win = (
            np.mean([t.pnl_percent for t in winning_trades]) if winning_trades else 0
        )
        avg_loss = (
            np.mean([t.pnl_percent for t in losing_trades]) if losing_trades else 0
        )

        # Profit factor
        total_wins = sum(t.pnl for t in winning_trades)
        total_losses = abs(sum(t.pnl for t in losing_trades))
        profit_factor = total_wins / total_losses if total_losses > 0 else float("inf")

        # Average trade duration
        avg_duration = np.mean([t.duration_days for t in trades])

        return {
            "win_rate_pct": win_rate,
            "avg_win_pct": avg_win,
            "avg_loss_pct": avg_loss,
            "profit_factor": profit_factor,
            "avg_trade_duration_days": avg_duration,
        }


class BacktestEngine:
    """Main backtesting engine."""

    def __init__(
        self,
        initial_capital: float = 100000,
        commission: float = 0.001,
        slippage: float = 0.001,
    ):
        self.initial_capital = initial_capital
        self.commission = commission
        self.slippage = slippage

    def run_backtest(
        self,
        strategy: TradingStrategy,
        symbols: List[str],
        start_date: str,
        end_date: str,
        benchmark_symbol: str = "SPY",
    ) -> Dict[str, Any]:
        """Run a comprehensive backtest."""

        print(f"🔄 Running Backtest: {strategy.name}")
        print(f"   Symbols: {symbols}")
        print(f"   Period: {start_date} to {end_date}")
        print(f"   Initial Capital: ${self.initial_capital:,.0f}")

        try:
            # Download data
            print("   📊 Downloading market data...")
            data = self._download_data(symbols, start_date, end_date)
            benchmark_data = self._download_data(
                [benchmark_symbol], start_date, end_date
            )

            if data.empty:
                raise ValueError("No market data available")

            # Initialize portfolio
            portfolio = Portfolio(self.initial_capital, self.commission)

            # Run simulation
            print("   🔄 Running simulation...")
            portfolio = self._run_simulation(strategy, data, portfolio)

            # Calculate performance metrics
            print("   📈 Calculating performance metrics...")
            benchmark_returns = (
                benchmark_data[benchmark_symbol]["Close"].pct_change().dropna()
                if not benchmark_data.empty
                else None
            )
            metrics = PerformanceMetrics.calculate_metrics(
                portfolio.equity_curve, portfolio.trades, benchmark_returns
            )

            # Compile results
            results = {
                "strategy_name": strategy.name,
                "strategy_parameters": strategy.parameters,
                "backtest_period": {
                    "start_date": start_date,
                    "end_date": end_date,
                    "trading_days": len(portfolio.equity_curve),
                },
                "portfolio_summary": {
                    "initial_capital": self.initial_capital,
                    "final_value": portfolio.total_value,
                    "total_pnl": portfolio.total_pnl,
                    "cash_remaining": portfolio.cash,
                },
                "performance_metrics": metrics,
                "trades": [trade.to_dict() for trade in portfolio.trades],
                "equity_curve": portfolio.equity_curve,
                "positions": {
                    symbol: {
                        "quantity": pos.quantity,
                        "avg_price": pos.avg_price,
                        "current_price": pos.current_price,
                        "market_value": pos.market_value,
                        "unrealized_pnl": pos.unrealized_pnl,
                    }
                    for symbol, pos in portfolio.positions.items()
                },
            }

            print(f"   ✅ Backtest Complete!")
            print(f"   📊 Total Return: {metrics.get('total_return_pct', 0):.2f}%")
            print(f"   📈 Sharpe Ratio: {metrics.get('sharpe_ratio', 0):.2f}")
            print(f"   📉 Max Drawdown: {metrics.get('max_drawdown_pct', 0):.2f}%")
            print(f"   🎯 Win Rate: {metrics.get('win_rate_pct', 0):.1f}%")

            return results

        except Exception as e:
            logger.error(f"Error in backtest: {e}")
            return {"error": str(e)}

    def _download_data(
        self, symbols: List[str], start_date: str, end_date: str
    ) -> pd.DataFrame:
        """Download market data for backtesting."""
        try:
            data = {}
            for symbol in symbols:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(start=start_date, end=end_date)
                if not hist.empty:
                    data[symbol] = hist

            # Combine into multi-level DataFrame
            if data:
                combined_data = pd.concat(data, axis=1)
                return combined_data
            else:
                return pd.DataFrame()

        except Exception as e:
            logger.error(f"Error downloading data: {e}")
            return pd.DataFrame()

    def _run_simulation(
        self, strategy: TradingStrategy, data: pd.DataFrame, portfolio: Portfolio
    ) -> Portfolio:
        """Run the trading simulation."""

        # Get list of symbols
        symbols = data.columns.get_level_values(0).unique().tolist()

        # Iterate through each trading day
        for date in data.index:
            try:
                # Get current prices
                current_prices = {}
                for symbol in symbols:
                    if (symbol, "Close") in data.columns:
                        price = data.loc[date, (symbol, "Close")]
                        if pd.notna(price):
                            current_prices[symbol] = price

                # Update portfolio positions with current prices
                portfolio.update_positions(current_prices)

                # Generate signals for each symbol
                for symbol in symbols:
                    if symbol not in current_prices:
                        continue

                    try:
                        # Get historical data up to current date for signal generation
                        symbol_data = data[symbol].loc[:date].dropna()

                        if len(symbol_data) < 50:  # Need sufficient history
                            continue

                        # Generate signal
                        signals = strategy.generate_signals(symbol_data)

                        if signals.empty or date not in signals.index:
                            continue

                        current_signal = signals.loc[date]

                        if current_signal == 0:
                            continue

                        # Calculate position size (simplified - equal weight)
                        position_value = portfolio.total_value * 0.1  # 10% per position
                        quantity = position_value / current_prices[symbol]

                        # Create and execute order
                        if current_signal > 0:  # Buy signal
                            order = Order(
                                symbol=symbol,
                                side=OrderSide.BUY,
                                quantity=quantity,
                                order_type=OrderType.MARKET,
                                timestamp=date,
                            )
                        else:  # Sell signal
                            # Only sell if we have a position
                            if symbol in portfolio.positions:
                                current_quantity = portfolio.positions[symbol].quantity
                                order = Order(
                                    symbol=symbol,
                                    side=OrderSide.SELL,
                                    quantity=min(quantity, current_quantity),
                                    order_type=OrderType.MARKET,
                                    timestamp=date,
                                )
                            else:
                                continue

                        # Execute order
                        portfolio.execute_order(order, current_prices[symbol], date)

                    except Exception as e:
                        logger.warning(
                            f"Error processing signal for {symbol} on {date}: {e}"
                        )
                        continue

                # Record equity curve
                portfolio.equity_curve.append(portfolio.total_value)

                # Calculate daily return
                if len(portfolio.equity_curve) > 1:
                    daily_return = (
                        portfolio.equity_curve[-1] / portfolio.equity_curve[-2] - 1
                    )
                    portfolio.daily_returns.append(daily_return)

            except Exception as e:
                logger.warning(f"Error processing date {date}: {e}")
                continue

        return portfolio

    def compare_strategies(
        self,
        strategies: List[TradingStrategy],
        symbols: List[str],
        start_date: str,
        end_date: str,
    ) -> Dict[str, Any]:
        """Compare multiple strategies."""

        print(f"🔄 Comparing {len(strategies)} Strategies")
        print("=" * 50)

        results = {}

        for strategy in strategies:
            result = self.run_backtest(strategy, symbols, start_date, end_date)
            results[strategy.name] = result
            print()

        # Create comparison summary
        comparison = {
            "strategies": list(results.keys()),
            "comparison_metrics": {},
            "detailed_results": results,
        }

        # Compare key metrics
        metrics_to_compare = [
            "total_return_pct",
            "annualized_return_pct",
            "volatility_pct",
            "sharpe_ratio",
            "max_drawdown_pct",
            "win_rate_pct",
        ]

        for metric in metrics_to_compare:
            comparison["comparison_metrics"][metric] = {}
            for strategy_name, result in results.items():
                if "performance_metrics" in result:
                    value = result["performance_metrics"].get(metric, 0)
                    comparison["comparison_metrics"][metric][strategy_name] = value

        # Find best strategy for each metric
        comparison["best_strategies"] = {}
        for metric in metrics_to_compare:
            if metric in comparison["comparison_metrics"]:
                metric_values = comparison["comparison_metrics"][metric]
                if metric_values:
                    # For drawdown, lower is better
                    if "drawdown" in metric:
                        best_strategy = min(
                            metric_values.items(), key=lambda x: abs(x[1])
                        )
                    else:
                        best_strategy = max(metric_values.items(), key=lambda x: x[1])
                    comparison["best_strategies"][metric] = best_strategy[0]

        print("📊 Strategy Comparison Summary:")
        print("-" * 40)
        for metric, values in comparison["comparison_metrics"].items():
            print(f"\n{metric.replace('_', ' ').title()}:")
            for strategy, value in values.items():
                print(f"   {strategy}: {value:.2f}")

        return comparison


def main():
    """Demo the comprehensive backtesting framework."""
    print("🚀 Comprehensive Backtesting Framework Demo")
    print("=" * 60)

    # Create strategies to test
    strategies = [
        MovingAverageCrossoverStrategy(short_window=20, long_window=50),
        RSIMeanReversionStrategy(rsi_period=14, oversold=30, overbought=70),
        MomentumStrategy(lookback_period=20, momentum_threshold=0.02),
    ]

    # Test parameters
    symbols = ["AAPL", "MSFT", "GOOGL"]
    start_date = "2023-01-01"
    end_date = "2024-01-01"

    # Initialize backtest engine
    engine = BacktestEngine(
        initial_capital=100000, commission=0.001, slippage=0.001  # 0.1%  # 0.1%
    )

    # Run strategy comparison
    comparison_results = engine.compare_strategies(
        strategies, symbols, start_date, end_date
    )

    print(f"\n🏆 Best Strategies by Metric:")
    for metric, best_strategy in comparison_results["best_strategies"].items():
        print(f"   {metric.replace('_', ' ').title()}: {best_strategy}")

    print(f"\n✅ Backtesting Framework Demo Complete!")
    print("💡 This framework provides comprehensive strategy validation")
    print("   with detailed performance metrics and risk analysis.")


if __name__ == "__main__":
    main()
