"""
Wrapper for BacktestEngine to simplify usage in dashboard and scheduler.
"""

from .framework import (
    BacktestEngine,
    MovingAverageCrossoverStrategy,
    RSIMeanReversionStrategy,
    MomentumStrategy,
)
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class BacktestResult:
    """Simplified backtest result object."""

    strategy_name: str
    total_return_pct: float
    annualized_return_pct: float
    volatility_pct: float
    sharpe_ratio: float
    max_drawdown_pct: float
    win_rate_pct: float
    total_trades: int
    equity_curve: Optional[List[float]] = None


class ComprehensiveBacktestingFramework:
    """Wrapper around BacktestEngine for easier usage."""

    def __init__(self, initial_capital: float = 100000):
        self.engine = BacktestEngine(initial_capital=initial_capital)
        self.strategies = {
            "MA Crossover": MovingAverageCrossoverStrategy,
            "RSI Mean Reversion": RSIMeanReversionStrategy,
            "Momentum": MomentumStrategy,
            "Breakout": MomentumStrategy,  # Using momentum as placeholder
        }

    async def run_backtest(
        self,
        strategy_name: str,
        symbols: List[str],
        start_date: str,
        end_date: str,
    ) -> BacktestResult:
        """
        Run a backtest with simplified parameters.

        Args:
            strategy_name: Name of the strategy ("MA Crossover", "RSI Mean Reversion", etc.)
            symbols: List of symbols to trade
            start_date: Start date in YYYY-MM-DD format
            end_date: End date in YYYY-MM-DD format

        Returns:
            BacktestResult object with performance metrics
        """
        # Get strategy class
        strategy_class = self.strategies.get(strategy_name)
        if not strategy_class:
            raise ValueError(
                f"Unknown strategy: {strategy_name}. Available: {list(self.strategies.keys())}"
            )

        # Instantiate strategy
        strategy = strategy_class()

        # Run backtest
        results = self.engine.run_backtest(
            strategy=strategy,
            symbols=symbols,
            start_date=start_date,
            end_date=end_date,
        )

        # Convert to simplified result object
        metrics = results.get("performance_metrics", {})

        return BacktestResult(
            strategy_name=strategy_name,
            total_return_pct=metrics.get("total_return_pct", 0.0),
            annualized_return_pct=metrics.get("annualized_return_pct", 0.0),
            volatility_pct=metrics.get("volatility_pct", 0.0),
            sharpe_ratio=metrics.get("sharpe_ratio", 0.0),
            max_drawdown_pct=metrics.get("max_drawdown_pct", 0.0),
            win_rate_pct=metrics.get("win_rate_pct", 0.0),
            total_trades=len(results.get("trades", [])),
            equity_curve=results.get("equity_curve"),
        )
