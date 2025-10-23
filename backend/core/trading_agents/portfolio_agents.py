"""
Portfolio Analysis Agents
Multi-agent system for deep portfolio analysis and recommendations
"""

from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from typing import Dict, Any, List, Optional
import os
import json


class PortfolioManagerAgent:
    """
    Analyzes portfolio allocation, diversification, and position sizing.
    Provides strategic recommendations for portfolio optimization.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.3,
            api_key=os.getenv("OPENAI_API_KEY"),
        )

    async def analyze(
        self, portfolio_data: Dict[str, Any], market_regime: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Analyze portfolio allocation and provide recommendations.

        Args:
            portfolio_data: Portfolio metrics and positions
            market_regime: Optional market regime context

        Returns:
            Dict with portfolio analysis and recommendations
        """

        # Extract positions for analysis
        positions = portfolio_data.get("positions", [])

        # Calculate sector exposure
        sector_exposure = self._calculate_sector_exposure(positions)

        prompt = f"""You are a senior portfolio manager analyzing a client's investment portfolio.

CURRENT PORTFOLIO:
- Total Value: ${portfolio_data.get('total_value', 0):,.2f}
- Daily P&L: ${portfolio_data.get('daily_pnl', 0):,.2f} ({portfolio_data.get('daily_pnl_percent', 0):.2f}%)
- Active Positions: {portfolio_data.get('active_positions', 0)}
- Win Rate: {portfolio_data.get('win_rate', 0):.1f}%
- Total Trades: {portfolio_data.get('total_trades', 0)}

POSITIONS:
{self._format_positions(positions)}

SECTOR EXPOSURE:
{json.dumps(sector_exposure, indent=2)}

MARKET CONTEXT:
{self._format_market_regime(market_regime) if market_regime else "Market context not available"}

TASK:
Provide comprehensive portfolio management analysis covering:

1. **Portfolio Health Assessment**:
   - Overall portfolio structure and quality
   - Is the portfolio well-constructed?
   - What grade would you give this portfolio (A-F)?

2. **Allocation Analysis**:
   - Is the portfolio properly diversified?
   - Sector concentration (too heavy in any sector?)
   - Position sizing (any positions too large/small?)
   - Cash allocation appropriate?

3. **Position-by-Position Review**:
   - Which positions are working well?
   - Which positions need attention?
   - Any positions to trim, hold, or add to?

4. **Optimization Recommendations**:
   - Rebalancing needs
   - Sector rotation suggestions
   - Position size adjustments
   - New positions to consider

5. **Strategic Recommendations**:
   - 3-5 SPECIFIC actionable steps
   - What should the investor DO right now?
   - Priority order for actions

Keep analysis concise but actionable (400-600 words).
Be SPECIFIC with position names, target prices, and percentages.
Provide CONCRETE recommendations, not generic advice.
"""

        response = await self.llm.ainvoke(
            [
                SystemMessage(
                    content="You are a senior portfolio manager with 20 years experience in portfolio construction, allocation, and optimization."
                ),
                HumanMessage(content=prompt),
            ]
        )

        analysis_text = response.content

        return {
            "agent_name": "Portfolio Manager",
            "analysis": analysis_text,
            "confidence": 0.85,
            "portfolio_grade": self._extract_grade(analysis_text),
            "sector_exposure": sector_exposure,
            "key_recommendations": self._extract_recommendations(analysis_text),
        }

    def _calculate_sector_exposure(self, positions: List[Any]) -> Dict[str, float]:
        """Calculate sector exposure percentages."""
        sector_map = {
            "AAPL": "Technology",
            "MSFT": "Technology",
            "GOOGL": "Technology",
            "AMZN": "Consumer Discretionary",
            "TSLA": "Consumer Discretionary",
            "NVDA": "Technology",
            "META": "Communication Services",
            "JPM": "Financials",
            "V": "Financials",
            "JNJ": "Healthcare",
            "UNH": "Healthcare",
            "XOM": "Energy",
            "PG": "Consumer Staples",
            "KO": "Consumer Staples",
        }

        sector_values = {}
        total_value = 0

        for pos in positions:
            symbol = pos.symbol if hasattr(pos, "symbol") else ""
            value = pos.position_value if hasattr(pos, "position_value") else 0
            sector = sector_map.get(symbol, "Other")

            sector_values[sector] = sector_values.get(sector, 0) + value
            total_value += value

        # Convert to percentages
        if total_value > 0:
            return {
                sector: round((value / total_value) * 100, 1)
                for sector, value in sector_values.items()
            }
        return {}

    def _format_positions(self, positions: List[Any]) -> str:
        """Format positions for prompt."""
        if not positions:
            return "No positions found"

        lines = []
        for pos in positions:
            symbol = pos.symbol if hasattr(pos, "symbol") else "N/A"
            qty = pos.shares if hasattr(pos, "shares") else 0
            entry = pos.entry_price if hasattr(pos, "entry_price") else 0
            current = pos.current_price if hasattr(pos, "current_price") else 0
            pnl = ((current - entry) / entry * 100) if entry > 0 else 0
            value = pos.position_value if hasattr(pos, "position_value") else 0

            lines.append(
                f"  • {symbol}: {qty} shares @ ${current:.2f} (entry ${entry:.2f}) | P&L: {pnl:+.2f}% | Value: ${value:,.2f}"
            )

        return "\n".join(lines[:10])  # Limit to top 10 positions

    def _format_market_regime(self, regime: Dict[str, Any]) -> str:
        """Format market regime for context."""
        return f"""Volatility: {regime.get('volatility_regime', 'UNKNOWN')}
Market Trend: {regime.get('market_trend', 'UNKNOWN')}
Risk Sentiment: {regime.get('risk_sentiment', 'NEUTRAL')}
VIX: {regime.get('vix_level', 'N/A')}"""

    def _extract_grade(self, text: str) -> str:
        """Try to extract portfolio grade from analysis."""
        grade_keywords = {
            "A": ["excellent", "exceptional", "grade a"],
            "B": ["good", "solid", "grade b"],
            "C": ["average", "adequate", "grade c"],
            "D": ["poor", "needs work", "grade d"],
            "F": ["failing", "critical", "grade f"],
        }

        text_lower = text.lower()
        for grade, keywords in grade_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                return grade

        return "B"  # Default to B

    def _extract_recommendations(self, text: str) -> List[str]:
        """Extract key recommendations from analysis."""
        recs = []
        lines = text.split("\n")

        for i, line in enumerate(lines):
            if any(
                keyword in line.lower()
                for keyword in [
                    "recommend",
                    "should",
                    "consider",
                    "trim",
                    "add",
                    "sell",
                ]
            ):
                clean_line = line.strip().lstrip("0123456789.-•*) ").strip()
                if clean_line and len(clean_line) > 20:
                    recs.append(clean_line)

        return recs[:5]  # Top 5 recommendations


class RiskAnalystAgent:
    """
    Analyzes portfolio risk: concentration, correlation, VAR, drawdowns.
    Focuses on risk management and position-level risk.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.3,
            api_key=os.getenv("OPENAI_API_KEY"),
        )

    async def analyze(
        self, portfolio_data: Dict[str, Any], positions: List[Dict]
    ) -> Dict[str, Any]:
        """
        Analyze portfolio risk metrics.

        Args:
            portfolio_data: Portfolio metrics
            positions: List of positions

        Returns:
            Dict with risk analysis
        """

        # Calculate concentration metrics
        concentration = self._calculate_concentration(positions)

        prompt = f"""You are a portfolio risk analyst specializing in risk management and position analysis.

PORTFOLIO RISK METRICS:
- Total Value: ${portfolio_data.get('total_value', 0):,.2f}
- Active Positions: {portfolio_data.get('active_positions', 0)}
- Win Rate: {portfolio_data.get('win_rate', 0):.1f}%
- Largest Position: {concentration['largest_position_pct']:.1f}% ({concentration['largest_position']})
- Top 3 Concentration: {concentration['top3_concentration']:.1f}%

POSITIONS:
{self._format_positions_risk(positions)}

TASK:
Provide comprehensive risk analysis covering:

1. **Concentration Risk**:
   - Is any single position too large (>25% = high risk)?
   - Top 3 concentration acceptable (<60%)?
   - Diversification adequate?

2. **Position-Level Risk**:
   - Which positions have highest risk?
   - Any positions near stop-loss levels?
   - Volatility concerns for any holdings?

3. **Correlation Risk**:
   - Based on holdings, estimate correlation
   - Are positions too correlated (e.g., all tech)?
   - Diversification benefits or false diversification?

4. **Drawdown & Volatility**:
   - Estimate portfolio volatility
   - Maximum potential drawdown
   - Risk-adjusted return assessment

5. **Risk Management Recommendations**:
   - Stop-loss levels for each position
   - Position size adjustments needed
   - Hedging strategies
   - 3-5 SPECIFIC risk mitigation actions

Keep analysis concise but specific (400-600 words).
Provide CONCRETE risk levels and mitigation steps.
Be direct about what's risky and needs action.
"""

        response = await self.llm.ainvoke(
            [
                SystemMessage(
                    content="You are a portfolio risk analyst with expertise in VAR, correlation analysis, and risk management."
                ),
                HumanMessage(content=prompt),
            ]
        )

        analysis_text = response.content

        return {
            "agent_name": "Risk Analyst",
            "analysis": analysis_text,
            "confidence": 0.80,
            "concentration_metrics": concentration,
            "risk_level": self._assess_risk_level(concentration),
            "risk_factors": self._extract_risk_factors(analysis_text),
        }

    def _calculate_concentration(self, positions: List[Any]) -> Dict[str, Any]:
        """Calculate concentration metrics."""
        if not positions:
            return {
                "largest_position": "N/A",
                "largest_position_pct": 0,
                "top3_concentration": 0,
            }

        # Sort by value
        sorted_positions = sorted(
            positions,
            key=lambda x: x.position_value if hasattr(x, "position_value") else 0,
            reverse=True,
        )
        total_value = sum(
            p.position_value if hasattr(p, "position_value") else 0 for p in positions
        )

        if total_value == 0:
            return {
                "largest_position": "N/A",
                "largest_position_pct": 0,
                "top3_concentration": 0,
            }

        largest = sorted_positions[0]
        largest_value = (
            largest.position_value if hasattr(largest, "position_value") else 0
        )
        largest_pct = (largest_value / total_value) * 100

        top3_value = sum(
            p.position_value if hasattr(p, "position_value") else 0
            for p in sorted_positions[:3]
        )
        top3_pct = (top3_value / total_value) * 100

        return {
            "largest_position": largest.symbol if hasattr(largest, "symbol") else "N/A",
            "largest_position_pct": largest_pct,
            "top3_concentration": top3_pct,
        }

    def _format_positions_risk(self, positions: List[Any]) -> str:
        """Format positions for risk analysis."""
        if not positions:
            return "No positions found"

        lines = []
        for pos in positions:
            symbol = pos.symbol if hasattr(pos, "symbol") else "N/A"
            value = pos.position_value if hasattr(pos, "position_value") else 0
            pnl = (
                pos.unrealized_pnl_percent
                if hasattr(pos, "unrealized_pnl_percent")
                else 0
            )

            lines.append(f"  • {symbol}: ${value:,.2f} | P&L: {pnl:+.2f}%")

        return "\n".join(lines[:10])

    def _assess_risk_level(self, concentration: Dict[str, Any]) -> str:
        """Assess overall portfolio risk level."""
        largest_pct = concentration["largest_position_pct"]
        top3_pct = concentration["top3_concentration"]

        if largest_pct > 30 or top3_pct > 70:
            return "HIGH RISK"
        elif largest_pct > 20 or top3_pct > 60:
            return "MEDIUM-HIGH RISK"
        elif largest_pct > 15 or top3_pct > 50:
            return "MEDIUM RISK"
        else:
            return "LOW-MEDIUM RISK"

    def _extract_risk_factors(self, text: str) -> List[str]:
        """Extract risk factors from analysis."""
        factors = []
        if "concentration" in text.lower():
            factors.append("Concentration risk present")
        if "volatile" in text.lower() or "volatility" in text.lower():
            factors.append("Volatility concerns")
        if "correlated" in text.lower():
            factors.append("Correlation risk")
        if "stop" in text.lower():
            factors.append("Stop-loss management needed")

        return factors[:5]


class PerformanceAnalystAgent:
    """
    Analyzes portfolio performance: returns, benchmarking, attribution.
    Focuses on what's working and what's not.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.3,
            api_key=os.getenv("OPENAI_API_KEY"),
        )

    async def analyze(
        self, portfolio_data: Dict[str, Any], positions: List[Dict]
    ) -> Dict[str, Any]:
        """
        Analyze portfolio performance.

        Args:
            portfolio_data: Portfolio metrics
            positions: List of positions

        Returns:
            Dict with performance analysis
        """

        # Calculate performance metrics
        winners_losers = self._identify_winners_losers(positions)

        prompt = f"""You are a portfolio performance analyst specializing in performance attribution and benchmarking.

PORTFOLIO PERFORMANCE:
- Total Value: ${portfolio_data.get('total_value', 0):,.2f}
- Daily P&L: ${portfolio_data.get('daily_pnl', 0):,.2f} ({portfolio_data.get('daily_pnl_percent', 0):+.2f}%)
- Win Rate: {portfolio_data.get('win_rate', 0):.1f}%
- Total Trades: {portfolio_data.get('total_trades', 0)}

TOP PERFORMERS:
{self._format_performance_list(winners_losers['winners'])}

WORST PERFORMERS:
{self._format_performance_list(winners_losers['losers'])}

TASK:
Provide comprehensive performance analysis covering:

1. **Overall Performance Assessment**:
   - How is the portfolio performing?
   - Compared to typical SPY returns (~10% annually), how good is this?
   - What's the estimated Sharpe ratio?

2. **Winners Analysis**:
   - What's working and why?
   - Should winners be held or profits taken?
   - Are winners approaching overbought?

3. **Losers Analysis**:
   - What's not working and why?
   - Are losers salvageable or should they be cut?
   - Any turnaround potential?

4. **Performance Attribution**:
   - Which positions contributing most to returns?
   - Which positions dragging down performance?
   - Sector performance breakdown

5. **Actionable Performance Recommendations**:
   - Which winners to take profits on?
   - Which losers to cut losses on?
   - Which positions to hold?
   - 3-5 SPECIFIC actions to improve performance

Keep analysis concise but actionable (400-600 words).
Be SPECIFIC with position names and recommended actions.
Provide CONCRETE guidance on what to do with each position.
"""

        response = await self.llm.ainvoke(
            [
                SystemMessage(
                    content="You are a portfolio performance analyst with expertise in performance attribution, benchmarking, and trade analysis."
                ),
                HumanMessage(content=prompt),
            ]
        )

        analysis_text = response.content

        return {
            "agent_name": "Performance Analyst",
            "analysis": analysis_text,
            "confidence": 0.85,
            "winners_losers": winners_losers,
            "performance_rating": self._rate_performance(portfolio_data),
            "key_insights": self._extract_insights(analysis_text),
        }

    def _identify_winners_losers(self, positions: List[Any]) -> Dict[str, List[Any]]:
        """Identify top winners and losers."""
        if not positions:
            return {"winners": [], "losers": []}

        # Sort by P&L percentage
        sorted_positions = sorted(
            positions,
            key=lambda x: (
                x.unrealized_pnl_percent if hasattr(x, "unrealized_pnl_percent") else 0
            ),
            reverse=True,
        )

        winners = sorted_positions[:3]
        losers = sorted_positions[-3:]

        return {"winners": winners, "losers": losers}

    def _format_performance_list(self, positions: List[Any]) -> str:
        """Format performance list."""
        if not positions:
            return "  None"

        lines = []
        for pos in positions:
            symbol = pos.symbol if hasattr(pos, "symbol") else "N/A"
            entry = pos.entry_price if hasattr(pos, "entry_price") else 0
            current = pos.current_price if hasattr(pos, "current_price") else 0
            pnl = ((current - entry) / entry * 100) if entry > 0 else 0

            lines.append(f"  • {symbol}: {pnl:+.2f}% (${entry:.2f} → ${current:.2f})")

        return "\n".join(lines)

    def _rate_performance(self, portfolio_data: Dict[str, Any]) -> str:
        """Rate overall performance."""
        daily_pnl_pct = portfolio_data.get("daily_pnl_percent", 0)
        win_rate = portfolio_data.get("win_rate", 0)

        # Annualize daily return (roughly)
        annual_estimate = daily_pnl_pct * 252

        if annual_estimate > 15 and win_rate > 60:
            return "EXCELLENT"
        elif annual_estimate > 10 and win_rate > 55:
            return "GOOD"
        elif annual_estimate > 5 and win_rate > 50:
            return "FAIR"
        else:
            return "NEEDS IMPROVEMENT"

    def _extract_insights(self, text: str) -> List[str]:
        """Extract key insights."""
        insights = []
        if "outperform" in text.lower():
            insights.append("Portfolio outperforming benchmarks")
        if "underperform" in text.lower():
            insights.append("Portfolio underperforming benchmarks")
        if "take profit" in text.lower():
            insights.append("Profit-taking opportunities identified")
        if "cut" in text.lower() or "sell" in text.lower():
            insights.append("Loss-cutting recommendations present")

        return insights[:5]
