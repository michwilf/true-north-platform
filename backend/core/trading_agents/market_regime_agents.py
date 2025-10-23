"""
Market Regime Analysis Agents
Multi-agent system for deep market environment analysis
"""

from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from typing import Dict, Any, List
import os


class MacroEconomistAgent:
    """
    Analyzes macroeconomic factors: Fed policy, interest rates, inflation, yields.
    Provides context on the broader economic environment.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.3,
            api_key=os.getenv("OPENAI_API_KEY"),
        )

    async def analyze(self, regime_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze macroeconomic conditions.

        Args:
            regime_data: Raw market regime data (VIX, yields, SPY data)

        Returns:
            Dict with macro analysis, confidence, and recommendations
        """
        prompt = f"""You are a senior macroeconomist analyzing the current market environment.

CURRENT MARKET DATA:
- 10Y Treasury Yield: {regime_data.get('yield_10y', 'N/A')}%
- 5-Day Yield Change: {regime_data.get('yield_change_5d', 'N/A')}%
- VIX Level: {regime_data.get('vix_level', 'N/A')}
- SPY vs 20-day SMA: {regime_data.get('spy_vs_sma', 'N/A')}%
- Volatility Regime: {regime_data.get('volatility_regime', 'UNKNOWN')}

TASK:
Provide a comprehensive macroeconomic analysis covering:

1. **Interest Rate Environment**:
   - What does the 10Y yield level tell us about growth expectations?
   - Is the yield trend rising or falling? What does that signal?
   - How does this affect equity valuations?

2. **Fed Policy Implications**:
   - Based on these levels, what is the Fed likely to do?
   - Are we in a hiking, pausing, or cutting cycle?
   - How should investors position?

3. **Economic Cycle Assessment**:
   - Early cycle, mid cycle, late cycle, or recession?
   - What sectors benefit in this environment?
   - What are the leading economic indicators saying?

4. **Risk Factors**:
   - What macro risks should investors watch?
   - Inflation concerns? Recession risks? Geopolitical?

5. **Investment Strategy**:
   - Recommended asset allocation (equities %, bonds %, cash %)
   - Duration positioning for fixed income
   - Currency/commodity implications

Keep analysis concise but insightful (300-500 words).
Provide SPECIFIC, ACTIONABLE insights, not generic statements.
"""

        response = await self.llm.ainvoke(
            [
                SystemMessage(
                    content="You are a senior macroeconomist with 20 years experience analyzing Fed policy, interest rates, and market cycles."
                ),
                HumanMessage(content=prompt),
            ]
        )

        analysis_text = response.content

        # Extract confidence based on data availability
        confidence = (
            0.8
            if regime_data.get("yield_10y") and regime_data.get("vix_level")
            else 0.5
        )

        return {
            "agent_name": "Macro Economist",
            "analysis": analysis_text,
            "confidence": confidence,
            "key_themes": self._extract_themes(analysis_text),
            "recommended_allocation": {
                "equities": self._parse_equity_allocation(analysis_text),
                "fixed_income": self._parse_bond_allocation(analysis_text),
                "cash": self._parse_cash_allocation(analysis_text),
            },
        }

    def _extract_themes(self, text: str) -> List[str]:
        """Extract key themes from analysis."""
        themes = []
        if "hiking" in text.lower() or "rate increase" in text.lower():
            themes.append("Fed Hiking Cycle")
        if "cutting" in text.lower() or "rate cuts" in text.lower():
            themes.append("Fed Cutting Cycle")
        if "pause" in text.lower():
            themes.append("Fed Pause")
        if "recession" in text.lower():
            themes.append("Recession Risk")
        if "inflation" in text.lower():
            themes.append("Inflation Concerns")
        if "growth" in text.lower():
            themes.append("Growth Focus")
        return themes[:5]  # Top 5

    def _parse_equity_allocation(self, text: str) -> str:
        """Try to parse equity allocation from text."""
        if "overweight equities" in text.lower() or "70%" in text or "75%" in text:
            return "70%"
        elif "underweight equities" in text.lower() or "40%" in text or "45%" in text:
            return "45%"
        else:
            return "60%"  # Default balanced

    def _parse_bond_allocation(self, text: str) -> str:
        """Try to parse bond allocation from text."""
        if "overweight bonds" in text.lower():
            return "30%"
        elif "underweight bonds" in text.lower():
            return "15%"
        else:
            return "25%"

    def _parse_cash_allocation(self, text: str) -> str:
        """Try to parse cash allocation from text."""
        if "high cash" in text.lower() or "defensive" in text.lower():
            return "15%"
        else:
            return "10%"


class MarketTechnicianAgent:
    """
    Analyzes technical indicators: VIX, breadth, trends, momentum.
    Focuses on price action and market structure.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.3,
            api_key=os.getenv("OPENAI_API_KEY"),
        )

    async def analyze(
        self, regime_data: Dict[str, Any], sector_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Analyze technical market conditions.

        Args:
            regime_data: Raw market regime data
            sector_data: Optional sector rotation data

        Returns:
            Dict with technical analysis and signals
        """
        prompt = f"""You are a veteran market technician analyzing current market structure.

CURRENT TECHNICAL DATA:
- VIX Level: {regime_data.get('vix_level', 'N/A')}
- Volatility Regime: {regime_data.get('volatility_regime', 'UNKNOWN')}
- SPY vs 20-day SMA: {regime_data.get('spy_vs_sma', 'N/A')}%
- Market Trend: {regime_data.get('market_trend', 'UNKNOWN')}
- Risk Sentiment: {regime_data.get('risk_sentiment', 'NEUTRAL')}

TASK:
Provide a comprehensive technical analysis covering:

1. **Volatility Analysis**:
   - What does current VIX level indicate?
   - Is volatility expanding or contracting?
   - VIX term structure implications
   - Options market signals

2. **Trend & Momentum**:
   - Primary trend direction and strength
   - Is SPY above key moving averages?
   - Momentum indicators (bullish/bearish divergences)
   - Price action patterns

3. **Market Breadth**:
   - What % of stocks are above their 50/200-day SMAs?
   - Advance/decline line trending?
   - New highs vs new lows
   - Participation (narrow or broad-based?)

4. **Support & Resistance**:
   - Key technical levels for SPY
   - Areas of potential reversals
   - Volume profile analysis

5. **Trading Signals**:
   - Overbought or oversold conditions?
   - Setup for continuation or reversal?
   - Risk/reward at current levels

Keep analysis concise but specific (300-500 words).
Provide ACTIONABLE technical insights with specific levels.
"""

        response = await self.llm.ainvoke(
            [
                SystemMessage(
                    content="You are a veteran market technician with expertise in volatility analysis, market breadth, and price action."
                ),
                HumanMessage(content=prompt),
            ]
        )

        analysis_text = response.content

        # Determine trend strength
        trend_strength = self._calculate_trend_strength(regime_data)

        # Extract support/resistance
        support_resistance = self._extract_levels(analysis_text)

        return {
            "agent_name": "Market Technician",
            "analysis": analysis_text,
            "confidence": 0.85,
            "trend_strength": trend_strength,
            "volatility_assessment": self._assess_volatility(regime_data),
            "support_resistance": support_resistance,
            "trading_bias": self._determine_bias(regime_data),
        }

    def _calculate_trend_strength(self, data: Dict[str, Any]) -> str:
        """Calculate trend strength from regime data."""
        spy_vs_sma = data.get("spy_vs_sma", 0)
        if spy_vs_sma > 3:
            return "STRONG UPTREND"
        elif spy_vs_sma > 1:
            return "MODERATE UPTREND"
        elif spy_vs_sma > -1:
            return "NEUTRAL/RANGING"
        elif spy_vs_sma > -3:
            return "MODERATE DOWNTREND"
        else:
            return "STRONG DOWNTREND"

    def _assess_volatility(self, data: Dict[str, Any]) -> str:
        """Assess volatility conditions."""
        vix = data.get("vix_level", 20)
        if vix < 15:
            return "EXTREMELY LOW - Complacency risk"
        elif vix < 20:
            return "LOW - Favorable for risk assets"
        elif vix < 30:
            return "NORMAL - Selective opportunities"
        else:
            return "HIGH - Risk-off environment"

    def _extract_levels(self, text: str) -> Dict[str, str]:
        """Try to extract support/resistance from text."""
        return {
            "support": "Check analysis for specific levels",
            "resistance": "Check analysis for specific levels",
        }

    def _determine_bias(self, data: Dict[str, Any]) -> str:
        """Determine trading bias."""
        trend = data.get("market_trend", "UNKNOWN")
        sentiment = data.get("risk_sentiment", "NEUTRAL")

        if trend == "BULLISH" and sentiment == "RISK_ON":
            return "BULLISH"
        elif trend == "BEARISH" or sentiment == "RISK_OFF":
            return "BEARISH"
        else:
            return "NEUTRAL"


class SentimentAnalystAgent:
    """
    Analyzes market sentiment: positioning, fear/greed, flows.
    Focuses on contrarian indicators and investor psychology.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.3,
            api_key=os.getenv("OPENAI_API_KEY"),
        )

    async def analyze(self, regime_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze market sentiment and positioning.

        Args:
            regime_data: Raw market regime data

        Returns:
            Dict with sentiment analysis and contrarian signals
        """
        prompt = f"""You are a market sentiment analyst specializing in investor psychology and positioning.

CURRENT SENTIMENT DATA:
- VIX Level: {regime_data.get('vix_level', 'N/A')}
- Risk Sentiment: {regime_data.get('risk_sentiment', 'NEUTRAL')}
- Market Trend: {regime_data.get('market_trend', 'UNKNOWN')}
- Volatility Regime: {regime_data.get('volatility_regime', 'UNKNOWN')}

TASK:
Provide a comprehensive sentiment analysis covering:

1. **Fear & Greed Assessment**:
   - Where are we on the fear/greed spectrum?
   - VIX sentiment signals (complacency vs panic)
   - Put/call ratios and options positioning
   - Are investors too bullish or bearish?

2. **Positioning Analysis**:
   - Retail investor sentiment
   - Institutional positioning (long/short, flows)
   - Hedge fund exposure
   - Are markets crowded in any direction?

3. **Contrarian Indicators**:
   - Sentiment extremes that suggest reversals
   - Capitulation or euphoria signals
   - Magazine cover indicator, social media trends
   - When everyone is on one side of the boat...

4. **Flow Analysis**:
   - Money flows (into/out of equities, bonds, cash)
   - Sector rotation patterns
   - Geographic flows (US vs International)
   - Risk-on vs risk-off asset movements

5. **Sentiment-Based Opportunities**:
   - Oversold assets due to excessive fear?
   - Overbought assets due to excessive greed?
   - Contrarian plays
   - Where is the crowd likely wrong?

Keep analysis concise but insightful (300-500 words).
Focus on CONTRARIAN insights and positioning asymmetries.
"""

        response = await self.llm.ainvoke(
            [
                SystemMessage(
                    content="You are a market sentiment analyst with expertise in investor psychology, positioning, and contrarian indicators."
                ),
                HumanMessage(content=prompt),
            ]
        )

        analysis_text = response.content

        # Calculate sentiment score
        sentiment_score = self._calculate_sentiment_score(regime_data)

        return {
            "agent_name": "Sentiment Analyst",
            "analysis": analysis_text,
            "confidence": 0.75,
            "sentiment_score": sentiment_score,  # 0-100 scale (0=extreme fear, 100=extreme greed)
            "sentiment_label": self._get_sentiment_label(sentiment_score),
            "contrarian_signal": self._get_contrarian_signal(sentiment_score),
            "crowd_positioning": self._assess_crowd_positioning(regime_data),
        }

    def _calculate_sentiment_score(self, data: Dict[str, Any]) -> float:
        """
        Calculate sentiment score (0-100).
        0 = Extreme Fear, 100 = Extreme Greed
        """
        vix = data.get("vix_level", 20)
        risk_sentiment = data.get("risk_sentiment", "NEUTRAL")

        # VIX-based component (inverted)
        vix_score = max(0, min(100, 100 - (vix - 10) * 3))

        # Risk sentiment component
        if risk_sentiment == "RISK_ON":
            risk_score = 70
        elif risk_sentiment == "RISK_OFF":
            risk_score = 30
        else:
            risk_score = 50

        # Weighted average
        sentiment = (vix_score * 0.6) + (risk_score * 0.4)
        return round(sentiment, 1)

    def _get_sentiment_label(self, score: float) -> str:
        """Convert sentiment score to label."""
        if score >= 75:
            return "EXTREME GREED"
        elif score >= 60:
            return "GREED"
        elif score >= 40:
            return "NEUTRAL"
        elif score >= 25:
            return "FEAR"
        else:
            return "EXTREME FEAR"

    def _get_contrarian_signal(self, score: float) -> str:
        """Get contrarian signal based on sentiment extremes."""
        if score >= 80:
            return "BEARISH CONTRARIAN (Too much greed - consider taking profits)"
        elif score <= 20:
            return "BULLISH CONTRARIAN (Too much fear - consider buying opportunity)"
        else:
            return "NO CLEAR CONTRARIAN SIGNAL (Sentiment not at extremes)"

    def _assess_crowd_positioning(self, data: Dict[str, Any]) -> str:
        """Assess how the crowd is positioned."""
        sentiment = data.get("risk_sentiment", "NEUTRAL")
        vix = data.get("vix_level", 20)

        if sentiment == "RISK_ON" and vix < 15:
            return "CROWDED LONG - High complacency"
        elif sentiment == "RISK_OFF" and vix > 30:
            return "CROWDED SHORT - High panic"
        else:
            return "BALANCED - No extreme positioning"


class MarketRegimeSynthesizer:
    """
    Synthesizes analysis from all three agents into a cohesive market regime report.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.4,
            api_key=os.getenv("OPENAI_API_KEY"),
        )

    async def synthesize(
        self,
        macro_analysis: Dict[str, Any],
        technical_analysis: Dict[str, Any],
        sentiment_analysis: Dict[str, Any],
        regime_data: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Synthesize all agent analyses into final recommendations.

        Args:
            macro_analysis: From MacroEconomistAgent
            technical_analysis: From MarketTechnicianAgent
            sentiment_analysis: From SentimentAnalystAgent
            regime_data: Raw regime data

        Returns:
            Comprehensive market regime report with recommendations
        """
        prompt = f"""You are a Chief Investment Strategist synthesizing multi-faceted market analysis.

MACRO ECONOMIST ANALYSIS:
{macro_analysis['analysis'][:500]}...

MARKET TECHNICIAN ANALYSIS:
{technical_analysis['analysis'][:500]}...

SENTIMENT ANALYST ANALYSIS:
{sentiment_analysis['analysis'][:500]}...

TASK:
Synthesize these three perspectives into a cohesive market regime report:

1. **Executive Summary** (2-3 sentences):
   - Current market environment in plain English
   - Overall positioning recommendation

2. **Key Insights** (3-5 bullet points):
   - Most important takeaways from each agent
   - Where do they agree? Where do they diverge?

3. **Recommended Strategy**:
   - Asset allocation (equities %, bonds %, cash %)
   - Sector overweights and underweights
   - Positioning (offensive, defensive, balanced)
   - Time horizon

4. **Actionable Recommendations** (3-5 specific actions):
   - What should investors DO right now?
   - Specific trades or adjustments
   - Risk management steps

5. **Risk Factors** (Top 3):
   - What could derail this thesis?
   - What to watch for

Keep total synthesis under 400 words but make it HIGHLY ACTIONABLE.
"""

        response = await self.llm.ainvoke(
            [
                SystemMessage(
                    content="You are a Chief Investment Strategist synthesizing market analysis into actionable recommendations."
                ),
                HumanMessage(content=prompt),
            ]
        )

        synthesis_text = response.content

        # Calculate overall confidence (weighted average)
        overall_confidence = (
            macro_analysis["confidence"] * 0.35
            + technical_analysis["confidence"] * 0.35
            + sentiment_analysis["confidence"] * 0.30
        )

        return {
            "executive_summary": self._extract_summary(synthesis_text),
            "full_synthesis": synthesis_text,
            "overall_confidence": round(overall_confidence, 2),
            "recommended_positioning": self._determine_positioning(
                macro_analysis, technical_analysis, sentiment_analysis
            ),
            "key_themes": self._merge_themes(
                macro_analysis, technical_analysis, sentiment_analysis
            ),
        }

    def _extract_summary(self, text: str) -> str:
        """Extract executive summary from synthesis."""
        lines = text.split("\n")
        for i, line in enumerate(lines):
            if "executive summary" in line.lower():
                # Get next 2-3 lines
                summary_lines = []
                for j in range(i + 1, min(i + 5, len(lines))):
                    if lines[j].strip() and not lines[j].strip().startswith("#"):
                        summary_lines.append(lines[j].strip())
                return " ".join(summary_lines)
        return text[:200] + "..."  # Fallback

    def _determine_positioning(
        self,
        macro: Dict[str, Any],
        technical: Dict[str, Any],
        sentiment: Dict[str, Any],
    ) -> str:
        """Determine overall recommended positioning."""
        # Voting system
        votes = {"OFFENSIVE": 0, "DEFENSIVE": 0, "BALANCED": 0}

        # Macro vote
        if "RISK_ON" in str(macro.get("recommended_allocation", "")):
            votes["OFFENSIVE"] += 1
        elif "defensive" in macro.get("analysis", "").lower():
            votes["DEFENSIVE"] += 1
        else:
            votes["BALANCED"] += 1

        # Technical vote
        if technical.get("trading_bias") == "BULLISH":
            votes["OFFENSIVE"] += 1
        elif technical.get("trading_bias") == "BEARISH":
            votes["DEFENSIVE"] += 1
        else:
            votes["BALANCED"] += 1

        # Sentiment vote (contrarian)
        contrarian = sentiment.get("contrarian_signal", "")
        if "BULLISH CONTRARIAN" in contrarian:
            votes["OFFENSIVE"] += 1
        elif "BEARISH CONTRARIAN" in contrarian:
            votes["DEFENSIVE"] += 1
        else:
            votes["BALANCED"] += 1

        # Return winner
        return max(votes, key=votes.get)

    def _merge_themes(
        self,
        macro: Dict[str, Any],
        technical: Dict[str, Any],
        sentiment: Dict[str, Any],
    ) -> List[str]:
        """Merge key themes from all agents."""
        themes = []
        themes.extend(macro.get("key_themes", []))

        # Add technical theme
        if technical.get("trend_strength"):
            themes.append(f"Technical: {technical['trend_strength']}")

        # Add sentiment theme
        if sentiment.get("sentiment_label"):
            themes.append(f"Sentiment: {sentiment['sentiment_label']}")

        return themes[:6]  # Top 6 themes
