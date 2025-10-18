# Trading Strategies - True North Platform

A comprehensive guide to trading strategies implemented in the True North Trading Platform, covering both systematic approaches and behavioral intelligence integration.

## Table of Contents
1. [Platform Strategy Overview](#platform-strategy-overview)
2. [Multi-Agent Decision Framework](#multi-agent-decision-framework)
3. [Core Trading Strategies](#core-trading-strategies)
4. [Risk Management Integration](#risk-management-integration)
5. [Behavioral Intelligence Strategies](#behavioral-intelligence-strategies)
6. [Execution Strategies](#execution-strategies)
7. [Portfolio Construction Strategies](#portfolio-construction-strategies)
8. [Performance Measurement](#performance-measurement)

---

## Platform Strategy Overview

The True North Trading Platform employs a **multi-agent, evidence-based approach** that combines:

- **Systematic Analysis**: Multiple AI agents analyze different market aspects
- **Behavioral Intelligence**: Retail and institutional flow monitoring
- **Risk-First Design**: Position sizing and risk controls built into every decision
- **Human-in-the-Loop**: Final approval remains with the trader
- **Explainable AI**: Full reasoning transparency for every recommendation

### Core Philosophy
1. **Diversification Over Concentration**: Spread risk across assets, strategies, and time
2. **Evidence Over Emotion**: Data-driven decisions with behavioral bias awareness
3. **Risk Management First**: Preserve capital before seeking returns
4. **Systematic Execution**: Rules-based approach reduces emotional trading
5. **Continuous Learning**: Agent memory and performance feedback loops

---

## Multi-Agent Decision Framework

### Agent Hierarchy and Roles

#### **Analyst Layer (Information Gathering)**
- **Market Analyst**: Technical indicators, price action, volume analysis
- **News Analyst**: Fundamental events, earnings, regulatory changes
- **Social Media Analyst**: Retail sentiment, trending discussions, influencer activity
- **Fundamentals Analyst**: Financial statements, valuation metrics, sector analysis

#### **Research Layer (Synthesis and Debate)**
- **Bull Researcher**: Identifies positive catalysts and upside scenarios
- **Bear Researcher**: Highlights risks and downside scenarios  
- **Research Manager**: Synthesizes bull/bear arguments into balanced view

#### **Decision Layer (Trade Generation)**
- **Trader Agent**: Generates specific buy/sell/hold recommendations
- **Risk Management Team**: Evaluates position sizing and risk controls
  - Aggressive Analyst: Higher risk tolerance scenarios
  - Conservative Analyst: Lower risk tolerance scenarios
  - Neutral Analyst: Balanced risk assessment
- **Risk Judge**: Final risk approval and position sizing

### Decision Flow Process

```
Market Data → Analysts → Bull/Bear Research → Research Manager → Trader → Risk Team → Final Decision
```

1. **Data Ingestion**: Real-time market data, news, social sentiment
2. **Multi-Perspective Analysis**: Each agent analyzes from their specialty
3. **Structured Debate**: Bull vs Bear researchers challenge assumptions
4. **Synthesis**: Research manager creates balanced investment thesis
5. **Trade Generation**: Trader agent proposes specific actions
6. **Risk Evaluation**: Risk team assesses and sizes positions
7. **Human Approval**: Final decision remains with human trader

---

## Core Trading Strategies

### 1. **Momentum Strategy**
**Concept**: Buy assets showing strong upward price momentum with supporting volume.

**Implementation**:
- **Technical Signals**: Moving average crossovers, RSI momentum, volume confirmation
- **Behavioral Confirmation**: Increasing social media mentions, positive sentiment shifts
- **Risk Controls**: ATR-based stops, maximum 2% risk per position
- **Time Horizon**: 1-5 day holds, quick exits on momentum breaks

**Entry Criteria**:
- Price above 20-day moving average
- RSI between 50-70 (not overbought)
- Volume 150%+ of 20-day average
- Positive news catalyst or social sentiment surge
- Bull researcher confidence >70%

**Exit Criteria**:
- Stop loss: 1.5x ATR below entry
- Take profit: 2:1 reward-to-risk ratio
- Time stop: 5 trading days maximum
- Momentum break: Price below 10-day MA with volume

### 2. **Mean Reversion Strategy**
**Concept**: Buy oversold assets with strong fundamentals expecting price recovery.

**Implementation**:
- **Technical Signals**: RSI <30, Bollinger Band lower touch, support level bounce
- **Fundamental Support**: Strong earnings, low P/E relative to sector
- **Behavioral Contrarian**: Excessive negative sentiment (fade the crowd)
- **Risk Controls**: Tight stops below support, small position sizes

**Entry Criteria**:
- RSI <30 for 2+ days
- Price at/near major support level
- Fundamentals analyst confidence >60%
- Excessive bearish social sentiment (contrarian signal)
- No major negative catalysts pending

**Exit Criteria**:
- Stop loss: Below key support level
- Take profit: Return to 20-day moving average
- Time stop: 10 trading days maximum
- Fundamental deterioration

### 3. **Breakout Strategy**
**Concept**: Buy assets breaking above resistance with volume confirmation.

**Implementation**:
- **Technical Signals**: Resistance breakout, volume surge, pattern completion
- **Catalyst Confirmation**: News event, earnings beat, analyst upgrade
- **Behavioral Validation**: Social media buzz, institutional buying signs
- **Risk Controls**: Tight stops below breakout level

**Entry Criteria**:
- Clean breakout above resistance on 2x average volume
- Positive fundamental or news catalyst
- Social sentiment improving
- No overhead resistance for 5%+ move
- Bull researcher high confidence

**Exit Criteria**:
- Stop loss: Below breakout level (typically 3-5%)
- Take profit: Next resistance level or 2:1 R:R
- Volume dries up significantly
- Negative catalyst emerges

### 4. **Event-Driven Strategy**
**Concept**: Trade around specific catalysts like earnings, FDA approvals, economic data.

**Implementation**:
- **Catalyst Identification**: Earnings dates, regulatory decisions, economic releases
- **Probability Assessment**: Historical outcomes, analyst expectations
- **Position Sizing**: Smaller sizes due to binary outcomes
- **Timing**: Enter 1-3 days before event, exit shortly after

**Entry Criteria**:
- High-probability catalyst identified
- Options market showing directional bias
- Analyst consensus vs likely outcome mismatch
- Manageable position size (0.5-1% risk)
- Clear exit plan regardless of outcome

**Exit Criteria**:
- Event occurs (win or lose)
- Catalyst delayed or cancelled
- Risk/reward becomes unfavorable
- Time decay (options strategies)

---

## Risk Management Integration

### Position Sizing Framework

#### **Base Position Size Calculation**
```
Position Size = (Account Equity × Risk %) ÷ (Entry Price - Stop Loss)
```

**Default Risk Parameters**:
- **Maximum risk per trade**: 1% of account equity
- **Maximum portfolio risk**: 6% across all open positions
- **Maximum single position**: 5% of account equity
- **Correlation limits**: Maximum 3% risk in correlated positions

#### **Dynamic Risk Adjustment**
- **High Confidence Trades**: Up to 1.5% risk (requires unanimous agent agreement)
- **Low Confidence Trades**: 0.5% risk maximum
- **Volatile Markets**: Reduce all position sizes by 50%
- **Drawdown Protection**: Reduce risk after 3% portfolio drawdown

### Stop Loss Strategies

#### **ATR-Based Stops**
- **Default**: 1.5x Average True Range (14-period)
- **Volatile stocks**: 2.0x ATR
- **Low volatility**: 1.0x ATR
- **Minimum stop**: 2% below entry
- **Maximum stop**: 5% below entry

#### **Technical Stops**
- **Support/Resistance**: Below key technical levels
- **Moving Average**: Below 20-day MA for momentum trades
- **Pattern Stops**: Below pattern breakout levels
- **Volume Stops**: Exit if volume dries up significantly

#### **Time-Based Stops**
- **Momentum trades**: 5 trading days maximum
- **Mean reversion**: 10 trading days maximum
- **Breakout trades**: 7 trading days maximum
- **Event trades**: Exit immediately after catalyst

---

## Behavioral Intelligence Strategies

### Retail Sentiment Analysis

#### **Contrarian Signals**
- **Extreme Bullishness**: Fade when retail sentiment >80% bullish
- **Extreme Bearishness**: Buy when retail sentiment <20% bullish
- **Sentiment Divergence**: Price up but sentiment declining (bearish)
- **Momentum Confirmation**: Price and sentiment aligned (continuation)

#### **Social Media Momentum**
- **Mention Velocity**: Rapid increase in ticker mentions
- **Influencer Activity**: Key financial Twitter accounts discussing
- **Platform Spread**: Discussion across multiple platforms (Reddit, Twitter, StockTwits)
- **Quality Metrics**: Engagement rates, not just mention counts

### Institutional Flow Analysis

#### **Dark Pool Activity**
- **ATS Volume Spikes**: Unusual off-exchange trading volume
- **Block Trade Detection**: Large transactions indicating institutional interest
- **Flow Direction**: Net buying vs selling pressure
- **Timing Analysis**: Institutional accumulation patterns

#### **13F Filings Analysis**
- **New Positions**: Hedge funds initiating positions
- **Position Changes**: Increases/decreases in holdings
- **Consensus Shifts**: Multiple institutions moving same direction
- **Activist Activity**: Known activist investors taking stakes

### Smart Money vs Dumb Money

#### **Smart Money Indicators**
- Institutional buying on weakness
- Options flow showing sophisticated strategies
- After-hours trading activity
- Insider buying activity

#### **Dumb Money Indicators**
- Retail buying at highs
- Excessive call option buying
- Social media FOMO behavior
- Margin debt increases

---

## Execution Strategies

### Order Types and Timing

#### **Market Entry Orders**
- **Limit Orders**: Default for all entries (better fills)
- **Stop-Limit Orders**: For breakout strategies
- **Market Orders**: Only for urgent exits
- **Iceberg Orders**: For large positions (break into smaller pieces)

#### **Optimal Timing**
- **Avoid First 30 Minutes**: High volatility and wide spreads
- **Avoid Last 30 Minutes**: Potential manipulation and gaps
- **Best Times**: 10:00-11:30 AM and 2:00-3:30 PM EST
- **Earnings**: Avoid trading 30 minutes before/after earnings

#### **Liquidity Considerations**
- **Minimum Daily Volume**: $1M average daily dollar volume
- **Spread Limits**: Maximum 0.5% bid-ask spread
- **Market Cap**: Minimum $100M market capitalization
- **Float**: Minimum 10M shares in public float

### Slippage Management

#### **Expected Slippage by Strategy**
- **Momentum trades**: 0.1-0.3% (higher urgency)
- **Mean reversion**: 0.05-0.15% (patient entries)
- **Breakouts**: 0.2-0.4% (timing critical)
- **Event trades**: 0.3-0.6% (volatility premium)

#### **Slippage Reduction Techniques**
- **Limit orders with patience**: Wait for favorable fills
- **Size appropriately**: Don't exceed 10% of average volume
- **Time entries**: Use less volatile periods
- **Hidden orders**: Use iceberg orders for large positions

---

## Portfolio Construction Strategies

### Core-Satellite Approach

#### **Core Holdings (70-80%)**
- **Global Equity ETFs**: FTSE All-World, MSCI ACWI
- **Bond Allocation**: Global aggregate bonds (GBP hedged)
- **Rebalancing**: Quarterly or 5% drift threshold
- **Low Turnover**: Buy and hold approach

#### **Satellite Holdings (20-30%)**
- **Active Strategies**: Agent-driven stock picks
- **Tactical Allocation**: Sector/region tilts based on signals
- **Alternative Strategies**: Options, commodities (small allocation)
- **Higher Turnover**: Active management based on signals

### Geographic Allocation

#### **Developed Markets (80%)**
- **US**: 50-60% (largest, most liquid market)
- **Europe**: 15-20% (diversification, different cycles)
- **Japan**: 5-8% (mature market, different dynamics)
- **Other Developed**: 5-10% (Australia, Canada, etc.)

#### **Emerging Markets (20%)**
- **China**: 8-12% (largest EM, different system)
- **India**: 3-5% (growth story, demographics)
- **Other EM**: 5-7% (Brazil, Taiwan, South Korea)

### Sector Allocation

#### **Defensive Sectors (40%)**
- **Technology**: 15-20% (growth and innovation)
- **Healthcare**: 10-15% (demographics, innovation)
- **Consumer Staples**: 5-10% (recession resistant)
- **Utilities**: 5% (income, stability)

#### **Cyclical Sectors (40%)**
- **Financials**: 10-15% (economic growth proxy)
- **Industrials**: 8-12% (economic activity)
- **Consumer Discretionary**: 10-15% (economic strength)
- **Materials**: 5% (commodity exposure)

#### **Speculative Sectors (20%)**
- **Energy**: 5-10% (volatility, inflation hedge)
- **Real Estate**: 5% (inflation hedge, income)
- **Communication Services**: 5-10% (growth, disruption)

---

## Performance Measurement

### Key Performance Metrics

#### **Return Metrics**
- **Total Return**: Price appreciation + dividends
- **Risk-Adjusted Return**: Sharpe ratio, Sortino ratio
- **Benchmark Relative**: Alpha vs relevant benchmarks
- **Rolling Returns**: 1, 3, 6, 12-month periods

#### **Risk Metrics**
- **Maximum Drawdown**: Largest peak-to-trough decline
- **Volatility**: Standard deviation of returns
- **Value at Risk (VaR)**: Potential loss at 95% confidence
- **Beta**: Sensitivity to market movements

#### **Trading Metrics**
- **Win Rate**: Percentage of profitable trades
- **Profit Factor**: Gross profits ÷ gross losses
- **Average Win/Loss**: Size of typical winning vs losing trades
- **Expectancy**: Average profit per trade

#### **Behavioral Metrics**
- **Signal Accuracy**: How often agent signals are correct
- **Sentiment Timing**: Performance of contrarian vs momentum signals
- **Flow Following**: Success rate of institutional flow strategies
- **Catalyst Success**: Event-driven strategy hit rates

### Performance Attribution

#### **Strategy Attribution**
- **Momentum Contribution**: Returns from momentum strategies
- **Mean Reversion**: Returns from contrarian strategies
- **Breakout Performance**: Returns from breakout trades
- **Event-Driven**: Returns from catalyst trades

#### **Agent Attribution**
- **Analyst Performance**: Which analysts provide best signals
- **Research Quality**: Bull vs bear researcher accuracy
- **Risk Management**: Impact of position sizing decisions
- **Execution Quality**: Slippage and timing analysis

### Continuous Improvement

#### **Agent Learning**
- **Memory Integration**: Past trade outcomes inform future decisions
- **Pattern Recognition**: Identify recurring successful setups
- **Error Analysis**: Learn from losing trades and mistakes
- **Parameter Optimization**: Adjust thresholds based on performance

#### **Strategy Evolution**
- **Market Regime Detection**: Adapt strategies to market conditions
- **Correlation Monitoring**: Adjust when strategies become correlated
- **Capacity Limits**: Scale back strategies that lose effectiveness
- **New Strategy Development**: Add strategies based on market opportunities

---

## Implementation Guidelines

### Getting Started
1. **Start Small**: Begin with 0.5% risk per trade while learning
2. **Paper Trade First**: Test strategies without real money
3. **Focus on Process**: Emphasize consistent execution over profits
4. **Track Everything**: Maintain detailed records of all decisions
5. **Review Regularly**: Weekly performance and strategy reviews

### Common Pitfalls to Avoid
1. **Overconfidence**: Don't increase risk after winning streaks
2. **Revenge Trading**: Don't chase losses with bigger positions
3. **Strategy Drift**: Stick to defined rules and parameters
4. **Ignoring Risk**: Never skip position sizing calculations
5. **Emotional Override**: Don't override agent recommendations emotionally

### Advanced Techniques
1. **Options Integration**: Use options for defined-risk strategies
2. **Pairs Trading**: Long/short related securities
3. **Sector Rotation**: Tactical allocation based on economic cycles
4. **Volatility Trading**: Strategies based on implied vs realized volatility
5. **Cross-Asset Strategies**: Bonds, commodities, currencies

---

## Risk Warnings

### Important Disclaimers
- **Past Performance**: Does not guarantee future results
- **Model Risk**: AI predictions may be wrong or biased
- **Market Risk**: All strategies can lose money in adverse conditions
- **Liquidity Risk**: Some positions may be difficult to exit
- **Technology Risk**: System failures can impact execution

### Regulatory Considerations
- **Know Your Limits**: Understand day trading rules and margin requirements
- **Tax Implications**: Consider tax efficiency in strategy selection
- **Compliance**: Ensure strategies comply with local regulations
- **Record Keeping**: Maintain detailed records for tax and audit purposes

---

*This document provides educational information about trading strategies. It is not investment advice. Always consult with qualified professionals and understand the risks before implementing any trading strategy.*

---

**Next Reading**: [Risk Management Basics](risk-management-basics.md) | [Execution Guide](execution-guide.md) | [Portfolio Construction](portfolio-construction.md)

*Last updated: October 2025 | Version 1.0*
