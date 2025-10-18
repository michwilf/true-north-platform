#!/usr/bin/env python3
"""
True North Trading Platform - Advanced Backtesting & Strategy Validation Engine
Comprehensive backtesting with risk metrics, portfolio optimization, and strategy comparison.
"""

import os
import sys
import json
import logging
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple, Any
from dataclasses import dataclass, field
import numpy as np
import pandas as pd
from dotenv import load_dotenv

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("backtesting_engine.log"), logging.StreamHandler()],
)
logger = logging.getLogger(__name__)


@dataclass
class Trade:
    """Individual trade record."""

    symbol: str
    entry_date: datetime
    exit_date: Optional[datetime]
    entry_price: float
    exit_price: Optional[float]
    quantity: int
    trade_type: str  # 'LONG' or 'SHORT'
    entry_reason: str
    exit_reason: Optional[str]
    pnl: Optional[float] = None
    pnl_percent: Optional[float] = None
    duration_days: Optional[int] = None
    max_favorable_excursion: Optional[float] = None
    max_adverse_excursion: Optional[float] = None


@dataclass
class StrategyResults:
    """Strategy backtesting results."""

    strategy_name: str
    start_date: datetime
    end_date: datetime
    initial_capital: float
    final_capital: float
    total_return: float
    annualized_return: float
    volatility: float
    sharpe_ratio: float
    sortino_ratio: float
    max_drawdown: float
    max_drawdown_duration: int
    win_rate: float
    profit_factor: float
    total_trades: int
    winning_trades: int
    losing_trades: int
    avg_win: float
    avg_loss: float
    largest_win: float
    largest_loss: float
    trades: List[Trade] = field(default_factory=list)
    daily_returns: List[float] = field(default_factory=list)
    equity_curve: List[float] = field(default_factory=list)
    drawdown_curve: List[float] = field(default_factory=list)


class TradingStrategy:
    """Base class for trading strategies."""

    def __init__(self, name: str, parameters: Dict[str, Any]):
        self.name = name
        self.parameters = parameters

    def generate_signals(self, data: pd.DataFrame) -> pd.DataFrame:
        """Generate buy/sell signals. Override in subclasses."""
        raise NotImplementedError

    def get_position_size(self, capital: float, price: float, volatility: float) -> int:
        """Calculate position size based on risk management."""
        risk_per_trade = self.parameters.get(
            "risk_per_trade", 0.02
        )  # 2% risk per trade
        stop_loss_pct = self.parameters.get("stop_loss_pct", 0.05)  # 5% stop loss

        risk_amount = capital * risk_per_trade
        position_value = risk_amount / stop_loss_pct
        quantity = int(position_value / price)

        return max(1, quantity)


class MomentumStrategy(TradingStrategy):
    """Momentum-based trading strategy."""

    def generate_signals(self, data: pd.DataFrame) -> pd.DataFrame:
        """Generate momentum signals."""
        signals = pd.DataFrame(index=data.index)
        signals["signal"] = 0
        signals["position"] = 0

        # Parameters
        short_window = self.parameters.get("short_window", 20)
        long_window = self.parameters.get("long_window", 50)
        rsi_period = self.parameters.get("rsi_period", 14)
        rsi_oversold = self.parameters.get("rsi_oversold", 30)
        rsi_overbought = self.parameters.get("rsi_overbought", 70)

        # Moving averages
        data["SMA_short"] = data["Close"].rolling(window=short_window).mean()
        data["SMA_long"] = data["Close"].rolling(window=long_window).mean()

        # RSI
        delta = data["Close"].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=rsi_period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=rsi_period).mean()
        rs = gain / loss
        data["RSI"] = 100 - (100 / (1 + rs))

        # Volume confirmation
        data["Volume_SMA"] = data["Volume"].rolling(window=20).mean()
        data["Volume_ratio"] = data["Volume"] / data["Volume_SMA"]

        # Generate signals
        for i in range(long_window, len(data)):
            # Buy signal: SMA crossover + RSI oversold + volume confirmation
            if (
                data["SMA_short"].iloc[i] > data["SMA_long"].iloc[i]
                and data["SMA_short"].iloc[i - 1] <= data["SMA_long"].iloc[i - 1]
                and data["RSI"].iloc[i] < 60  # Not overbought
                and data["Volume_ratio"].iloc[i] > 1.2
            ):  # Volume confirmation
                signals["signal"].iloc[i] = 1

            # Sell signal: SMA crossover down or RSI overbought
            elif (
                data["SMA_short"].iloc[i] < data["SMA_long"].iloc[i]
                and data["SMA_short"].iloc[i - 1] >= data["SMA_long"].iloc[i - 1]
            ) or data["RSI"].iloc[i] > rsi_overbought:
                signals["signal"].iloc[i] = -1

        # Calculate positions
        signals["position"] = (
            signals["signal"].replace(to_replace=0, method="ffill").fillna(0)
        )

        return signals


class MeanReversionStrategy(TradingStrategy):
    """Mean reversion trading strategy."""

    def generate_signals(self, data: pd.DataFrame) -> pd.DataFrame:
        """Generate mean reversion signals."""
        signals = pd.DataFrame(index=data.index)
        signals["signal"] = 0
        signals["position"] = 0

        # Parameters
        lookback_period = self.parameters.get("lookback_period", 20)
        std_multiplier = self.parameters.get("std_multiplier", 2.0)
        rsi_period = self.parameters.get("rsi_period", 14)

        # Bollinger Bands
        data["SMA"] = data["Close"].rolling(window=lookback_period).mean()
        data["STD"] = data["Close"].rolling(window=lookback_period).std()
        data["Upper_BB"] = data["SMA"] + (data["STD"] * std_multiplier)
        data["Lower_BB"] = data["SMA"] - (data["STD"] * std_multiplier)

        # RSI
        delta = data["Close"].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=rsi_period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=rsi_period).mean()
        rs = gain / loss
        data["RSI"] = 100 - (100 / (1 + rs))

        # Generate signals
        for i in range(lookback_period, len(data)):
            # Buy signal: Price below lower Bollinger Band + RSI oversold
            if (
                data["Close"].iloc[i] < data["Lower_BB"].iloc[i]
                and data["RSI"].iloc[i] < 30
            ):
                signals["signal"].iloc[i] = 1

            # Sell signal: Price above upper Bollinger Band + RSI overbought
            elif (
                data["Close"].iloc[i] > data["Upper_BB"].iloc[i]
                and data["RSI"].iloc[i] > 70
            ):
                signals["signal"].iloc[i] = -1

            # Exit signal: Price returns to mean
            elif (
                abs(data["Close"].iloc[i] - data["SMA"].iloc[i]) / data["SMA"].iloc[i]
                < 0.01
            ):
                signals["signal"].iloc[i] = 0

        # Calculate positions
        signals["position"] = (
            signals["signal"].replace(to_replace=0, method="ffill").fillna(0)
        )

        return signals


class BreakoutStrategy(TradingStrategy):
    """Breakout trading strategy."""

    def generate_signals(self, data: pd.DataFrame) -> pd.DataFrame:
        """Generate breakout signals."""
        signals = pd.DataFrame(index=data.index)
        signals["signal"] = 0
        signals["position"] = 0

        # Parameters
        lookback_period = self.parameters.get("lookback_period", 20)
        volume_threshold = self.parameters.get("volume_threshold", 1.5)

        # Support and resistance levels
        data["Resistance"] = data["High"].rolling(window=lookback_period).max()
        data["Support"] = data["Low"].rolling(window=lookback_period).min()

        # Volume confirmation
        data["Volume_SMA"] = data["Volume"].rolling(window=20).mean()
        data["Volume_ratio"] = data["Volume"] / data["Volume_SMA"]

        # Generate signals
        for i in range(lookback_period, len(data)):
            # Buy signal: Price breaks above resistance with volume
            if (
                data["Close"].iloc[i] > data["Resistance"].iloc[i - 1]
                and data["Volume_ratio"].iloc[i] > volume_threshold
            ):
                signals["signal"].iloc[i] = 1

            # Sell signal: Price breaks below support with volume
            elif (
                data["Close"].iloc[i] < data["Support"].iloc[i - 1]
                and data["Volume_ratio"].iloc[i] > volume_threshold
            ):
                signals["signal"].iloc[i] = -1

        # Calculate positions
        signals["position"] = (
            signals["signal"].replace(to_replace=0, method="ffill").fillna(0)
        )

        return signals


class BacktestingEngine:
    """Advanced backtesting engine."""

    def __init__(self, initial_capital: float = 100000):
        self.initial_capital = initial_capital
        self.commission_rate = 0.001  # 0.1% commission
        self.slippage_rate = 0.0005  # 0.05% slippage

    def run_backtest(
        self,
        strategy: TradingStrategy,
        data: pd.DataFrame,
        start_date: str = None,
        end_date: str = None,
    ) -> StrategyResults:
        """Run comprehensive backtest."""

        logger.info(f"Running backtest for {strategy.name}")

        # Filter data by date range
        if start_date:
            data = data[data.index >= start_date]
        if end_date:
            data = data[data.index <= end_date]

        if data.empty:
            raise ValueError("No data available for the specified date range")

        # Generate signals
        signals = strategy.generate_signals(data.copy())

        # Initialize tracking variables
        capital = self.initial_capital
        position = 0
        trades = []
        equity_curve = [capital]
        daily_returns = [0]

        current_trade = None

        # Process each day
        for i in range(1, len(data)):
            date = data.index[i]
            price = data["Close"].iloc[i]
            signal = signals["signal"].iloc[i]

            # Calculate daily return
            if position != 0:
                daily_return = (
                    (price - data["Close"].iloc[i - 1])
                    / data["Close"].iloc[i - 1]
                    * position
                )
                capital += (
                    capital * daily_return * abs(position) / 100
                )  # Simplified position sizing
            else:
                daily_return = 0

            daily_returns.append(daily_return)

            # Process signals
            if signal == 1 and position <= 0:  # Buy signal
                if current_trade and current_trade.exit_date is None:
                    # Close short position
                    self._close_trade(current_trade, date, price, "Signal reversal")
                    trades.append(current_trade)

                # Open long position
                volatility = data["Close"].rolling(window=20).std().iloc[i] / price
                quantity = strategy.get_position_size(capital, price, volatility)

                current_trade = Trade(
                    symbol=(
                        data.columns[0]
                        if hasattr(data.columns, "__getitem__")
                        else "UNKNOWN"
                    ),
                    entry_date=date,
                    exit_date=None,
                    entry_price=price
                    * (1 + self.slippage_rate),  # Account for slippage
                    exit_price=None,
                    quantity=quantity,
                    trade_type="LONG",
                    entry_reason="Strategy signal",
                )

                position = 1
                capital -= (
                    quantity * price * (1 + self.commission_rate)
                )  # Account for commission

            elif signal == -1 and position >= 0:  # Sell signal
                if current_trade and current_trade.exit_date is None:
                    # Close long position
                    self._close_trade(current_trade, date, price, "Signal reversal")
                    trades.append(current_trade)

                # Open short position (if allowed)
                if strategy.parameters.get("allow_short", False):
                    volatility = data["Close"].rolling(window=20).std().iloc[i] / price
                    quantity = strategy.get_position_size(capital, price, volatility)

                    current_trade = Trade(
                        symbol=(
                            data.columns[0]
                            if hasattr(data.columns, "__getitem__")
                            else "UNKNOWN"
                        ),
                        entry_date=date,
                        exit_date=None,
                        entry_price=price * (1 - self.slippage_rate),
                        exit_price=None,
                        quantity=quantity,
                        trade_type="SHORT",
                        entry_reason="Strategy signal",
                    )

                    position = -1
                    capital += quantity * price * (1 - self.commission_rate)
                else:
                    position = 0

            # Update equity curve
            if position != 0 and current_trade:
                unrealized_pnl = self._calculate_unrealized_pnl(current_trade, price)
                equity_curve.append(capital + unrealized_pnl)
            else:
                equity_curve.append(capital)

        # Close any remaining open trade
        if current_trade and current_trade.exit_date is None:
            self._close_trade(
                current_trade, data.index[-1], data["Close"].iloc[-1], "End of backtest"
            )
            trades.append(current_trade)

        # Calculate performance metrics
        results = self._calculate_performance_metrics(
            strategy.name,
            data.index[0],
            data.index[-1],
            self.initial_capital,
            equity_curve[-1],
            trades,
            daily_returns,
            equity_curve,
        )

        logger.info(
            f"Backtest completed: {results.total_return:.2%} return, {results.sharpe_ratio:.2f} Sharpe"
        )

        return results

    def _close_trade(
        self, trade: Trade, exit_date: datetime, exit_price: float, exit_reason: str
    ):
        """Close an open trade."""
        trade.exit_date = exit_date
        trade.exit_price = exit_price * (
            1 - self.slippage_rate
            if trade.trade_type == "LONG"
            else 1 + self.slippage_rate
        )
        trade.exit_reason = exit_reason

        # Calculate P&L
        if trade.trade_type == "LONG":
            trade.pnl = (
                (trade.exit_price - trade.entry_price)
                * trade.quantity
                * (1 - self.commission_rate)
            )
        else:  # SHORT
            trade.pnl = (
                (trade.entry_price - trade.exit_price)
                * trade.quantity
                * (1 - self.commission_rate)
            )

        trade.pnl_percent = trade.pnl / (trade.entry_price * trade.quantity) * 100
        trade.duration_days = (trade.exit_date - trade.entry_date).days

    def _calculate_unrealized_pnl(self, trade: Trade, current_price: float) -> float:
        """Calculate unrealized P&L for open trade."""
        if trade.trade_type == "LONG":
            return (current_price - trade.entry_price) * trade.quantity
        else:  # SHORT
            return (trade.entry_price - current_price) * trade.quantity

    def _calculate_performance_metrics(
        self,
        strategy_name: str,
        start_date: datetime,
        end_date: datetime,
        initial_capital: float,
        final_capital: float,
        trades: List[Trade],
        daily_returns: List[float],
        equity_curve: List[float],
    ) -> StrategyResults:
        """Calculate comprehensive performance metrics."""

        # Basic returns
        total_return = (final_capital - initial_capital) / initial_capital
        days = (end_date - start_date).days
        annualized_return = (1 + total_return) ** (365 / days) - 1 if days > 0 else 0

        # Volatility
        returns_array = np.array(daily_returns[1:])  # Skip first zero return
        volatility = np.std(returns_array) * np.sqrt(252)  # Annualized

        # Sharpe ratio
        risk_free_rate = 0.02  # Assume 2% risk-free rate
        sharpe_ratio = (
            (annualized_return - risk_free_rate) / volatility if volatility > 0 else 0
        )

        # Sortino ratio (downside deviation)
        downside_returns = returns_array[returns_array < 0]
        downside_deviation = (
            np.std(downside_returns) * np.sqrt(252) if len(downside_returns) > 0 else 0
        )
        sortino_ratio = (
            (annualized_return - risk_free_rate) / downside_deviation
            if downside_deviation > 0
            else 0
        )

        # Drawdown analysis
        equity_array = np.array(equity_curve)
        running_max = np.maximum.accumulate(equity_array)
        drawdown = (equity_array - running_max) / running_max
        max_drawdown = np.min(drawdown)

        # Find max drawdown duration
        drawdown_duration = 0
        current_duration = 0
        for dd in drawdown:
            if dd < 0:
                current_duration += 1
                drawdown_duration = max(drawdown_duration, current_duration)
            else:
                current_duration = 0

        # Trade statistics
        winning_trades = [t for t in trades if t.pnl and t.pnl > 0]
        losing_trades = [t for t in trades if t.pnl and t.pnl < 0]

        win_rate = len(winning_trades) / len(trades) if trades else 0
        avg_win = np.mean([t.pnl for t in winning_trades]) if winning_trades else 0
        avg_loss = np.mean([t.pnl for t in losing_trades]) if losing_trades else 0
        largest_win = max([t.pnl for t in winning_trades]) if winning_trades else 0
        largest_loss = min([t.pnl for t in losing_trades]) if losing_trades else 0

        # Profit factor
        gross_profit = sum([t.pnl for t in winning_trades]) if winning_trades else 0
        gross_loss = abs(sum([t.pnl for t in losing_trades])) if losing_trades else 1
        profit_factor = gross_profit / gross_loss if gross_loss > 0 else 0

        return StrategyResults(
            strategy_name=strategy_name,
            start_date=start_date,
            end_date=end_date,
            initial_capital=initial_capital,
            final_capital=final_capital,
            total_return=total_return,
            annualized_return=annualized_return,
            volatility=volatility,
            sharpe_ratio=sharpe_ratio,
            sortino_ratio=sortino_ratio,
            max_drawdown=max_drawdown,
            max_drawdown_duration=drawdown_duration,
            win_rate=win_rate,
            profit_factor=profit_factor,
            total_trades=len(trades),
            winning_trades=len(winning_trades),
            losing_trades=len(losing_trades),
            avg_win=avg_win,
            avg_loss=avg_loss,
            largest_win=largest_win,
            largest_loss=largest_loss,
            trades=trades,
            daily_returns=daily_returns,
            equity_curve=equity_curve,
            drawdown_curve=drawdown.tolist(),
        )

    def compare_strategies(
        self, strategies: List[TradingStrategy], data: pd.DataFrame
    ) -> pd.DataFrame:
        """Compare multiple strategies."""

        results = []

        for strategy in strategies:
            try:
                result = self.run_backtest(strategy, data.copy())
                results.append(
                    {
                        "Strategy": result.strategy_name,
                        "Total Return": f"{result.total_return:.2%}",
                        "Annualized Return": f"{result.annualized_return:.2%}",
                        "Volatility": f"{result.volatility:.2%}",
                        "Sharpe Ratio": f"{result.sharpe_ratio:.2f}",
                        "Sortino Ratio": f"{result.sortino_ratio:.2f}",
                        "Max Drawdown": f"{result.max_drawdown:.2%}",
                        "Win Rate": f"{result.win_rate:.2%}",
                        "Profit Factor": f"{result.profit_factor:.2f}",
                        "Total Trades": result.total_trades,
                    }
                )
            except Exception as e:
                logger.error(f"Error backtesting {strategy.name}: {e}")
                results.append({"Strategy": strategy.name, "Error": str(e)})

        return pd.DataFrame(results)

    def optimize_strategy(
        self, strategy_class, data: pd.DataFrame, parameter_ranges: Dict[str, List]
    ) -> Tuple[Dict[str, Any], StrategyResults]:
        """Optimize strategy parameters."""

        logger.info(f"Optimizing {strategy_class.__name__} parameters")

        best_sharpe = -np.inf
        best_params = None
        best_results = None

        # Generate parameter combinations
        import itertools

        param_names = list(parameter_ranges.keys())
        param_values = list(parameter_ranges.values())

        total_combinations = np.prod([len(values) for values in param_values])
        logger.info(f"Testing {total_combinations} parameter combinations")

        for i, combination in enumerate(itertools.product(*param_values)):
            params = dict(zip(param_names, combination))

            try:
                strategy = strategy_class(
                    f"{strategy_class.__name__}_optimized", params
                )
                results = self.run_backtest(strategy, data.copy())

                # Use Sharpe ratio as optimization metric
                if results.sharpe_ratio > best_sharpe:
                    best_sharpe = results.sharpe_ratio
                    best_params = params.copy()
                    best_results = results

                if (i + 1) % 10 == 0:
                    logger.info(
                        f"Tested {i + 1}/{total_combinations} combinations, best Sharpe: {best_sharpe:.2f}"
                    )

            except Exception as e:
                logger.warning(f"Error testing parameters {params}: {e}")

        logger.info(
            f"Optimization complete. Best parameters: {best_params}, Sharpe: {best_sharpe:.2f}"
        )

        return best_params, best_results

    def generate_report(self, results: StrategyResults, output_file: str = None):
        """Generate comprehensive backtest report."""

        report = f"""
        ================================================================================
        BACKTESTING REPORT: {results.strategy_name}
        ================================================================================
        
        PERIOD: {results.start_date.strftime('%Y-%m-%d')} to {results.end_date.strftime('%Y-%m-%d')}
        
        PERFORMANCE SUMMARY
        ================================================================================
        Initial Capital:        ${results.initial_capital:,.2f}
        Final Capital:          ${results.final_capital:,.2f}
        Total Return:           {results.total_return:.2%}
        Annualized Return:      {results.annualized_return:.2%}
        Volatility:             {results.volatility:.2%}
        Sharpe Ratio:           {results.sharpe_ratio:.2f}
        Sortino Ratio:          {results.sortino_ratio:.2f}
        Max Drawdown:           {results.max_drawdown:.2%}
        Max DD Duration:        {results.max_drawdown_duration} days
        
        TRADE STATISTICS
        ================================================================================
        Total Trades:           {results.total_trades}
        Winning Trades:         {results.winning_trades}
        Losing Trades:          {results.losing_trades}
        Win Rate:               {results.win_rate:.2%}
        Profit Factor:          {results.profit_factor:.2f}
        Average Win:            ${results.avg_win:.2f}
        Average Loss:           ${results.avg_loss:.2f}
        Largest Win:            ${results.largest_win:.2f}
        Largest Loss:           ${results.largest_loss:.2f}
        
        RISK METRICS
        ================================================================================
        Best Month:             {max(results.daily_returns)*30:.2%} (estimated)
        Worst Month:            {min(results.daily_returns)*30:.2%} (estimated)
        Positive Days:          {len([r for r in results.daily_returns if r > 0])}
        Negative Days:          {len([r for r in results.daily_returns if r < 0])}
        
        """

        if output_file:
            with open(output_file, "w") as f:
                f.write(report)
            logger.info(f"Report saved to {output_file}")

        print(report)

        return report


def main():
    """Main function for backtesting engine."""
    print("📊 True North Trading Platform - Backtesting Engine")
    print("=" * 70)

    try:
        # Initialize backtesting engine
        engine = BacktestingEngine(initial_capital=100000)

        # Get sample data (you would replace this with real data)
        print("📈 Loading sample data...")

        # For demonstration, create sample data
        dates = pd.date_range(start="2023-01-01", end="2024-01-01", freq="D")
        np.random.seed(42)

        # Generate realistic stock price data
        returns = np.random.normal(0.0005, 0.02, len(dates))  # Daily returns
        prices = [100]  # Starting price
        for ret in returns[1:]:
            prices.append(prices[-1] * (1 + ret))

        volumes = np.random.randint(1000000, 5000000, len(dates))

        sample_data = pd.DataFrame(
            {
                "Open": [p * 0.99 for p in prices],
                "High": [p * 1.02 for p in prices],
                "Low": [p * 0.98 for p in prices],
                "Close": prices,
                "Volume": volumes,
            },
            index=dates,
        )

        print(f"✅ Loaded {len(sample_data)} days of data")

        # Define strategies to test
        strategies = [
            MomentumStrategy(
                "Momentum_20_50",
                {
                    "short_window": 20,
                    "long_window": 50,
                    "rsi_period": 14,
                    "risk_per_trade": 0.02,
                },
            ),
            MeanReversionStrategy(
                "Mean_Reversion",
                {
                    "lookback_period": 20,
                    "std_multiplier": 2.0,
                    "rsi_period": 14,
                    "risk_per_trade": 0.02,
                },
            ),
            BreakoutStrategy(
                "Breakout",
                {
                    "lookback_period": 20,
                    "volume_threshold": 1.5,
                    "risk_per_trade": 0.02,
                },
            ),
        ]

        print(f"\n🧪 Testing {len(strategies)} strategies...")

        # Run backtests
        all_results = []
        for strategy in strategies:
            print(f"\n📊 Backtesting {strategy.name}...")
            results = engine.run_backtest(strategy, sample_data)
            all_results.append(results)

            # Generate individual report
            print(f"   Total Return: {results.total_return:.2%}")
            print(f"   Sharpe Ratio: {results.sharpe_ratio:.2f}")
            print(f"   Max Drawdown: {results.max_drawdown:.2%}")
            print(f"   Win Rate: {results.win_rate:.2%}")

        # Compare strategies
        print(f"\n📈 Strategy Comparison:")
        comparison = engine.compare_strategies(strategies, sample_data)
        print(comparison.to_string(index=False))

        # Generate detailed report for best strategy
        best_strategy_results = max(all_results, key=lambda x: x.sharpe_ratio)
        print(
            f"\n📋 Generating detailed report for best strategy: {best_strategy_results.strategy_name}"
        )

        report_file = f"backtest_report_{best_strategy_results.strategy_name}_{datetime.now().strftime('%Y%m%d_%H%M')}.txt"
        engine.generate_report(best_strategy_results, report_file)

        # Strategy optimization example
        print(f"\n🔧 Optimizing Momentum Strategy...")
        parameter_ranges = {
            "short_window": [10, 15, 20, 25],
            "long_window": [40, 50, 60],
            "risk_per_trade": [0.01, 0.02, 0.03],
        }

        best_params, optimized_results = engine.optimize_strategy(
            MomentumStrategy, sample_data, parameter_ranges
        )

        print(f"✅ Optimization complete!")
        print(f"   Best Parameters: {best_params}")
        print(f"   Optimized Sharpe: {optimized_results.sharpe_ratio:.2f}")
        print(f"   Optimized Return: {optimized_results.total_return:.2%}")

        print(f"\n📊 Backtesting Complete!")
        print(
            f"💡 Use these results to validate your trading strategies before live trading."
        )

    except Exception as e:
        logger.error(f"Backtesting error: {e}")
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
