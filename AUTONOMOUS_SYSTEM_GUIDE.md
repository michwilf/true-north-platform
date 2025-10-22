# Autonomous Multi-Agent Trading System

## 🤖 The "Set It and Forget It" System

You asked: **"How would I establish a multi-agent system that finds stocks for me?"**

**Answer:** You already have it! Here's how everything connects:

---

## 🎯 The Complete Autonomous Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTONOMOUS DISCOVERY                        │
│                POST /api/autonomous-discovery                │
└─────────────────────────────────────────────────────────────┘
                           ↓
    ┌──────────────────────────────────────────────────────┐
    │  STEP 1: DISCOVERY ENGINE                            │
    │  Scans entire market for opportunities               │
    └──────────────────────────────────────────────────────┘
                           ↓
         ┌─────────────────────────────────┐
         │ • Market Regime Detection       │
         │   (VIX, SPY trend, yields)      │
         │ • Sector Rotation Analysis      │
         │ • Earnings Calendar             │
         │ • Technical Screening           │
         │ • Insider Trading Activity      │
         └─────────────────────────────────┘
                           ↓
              📊 FINDS: 11-20 OPPORTUNITIES
              (AAPL, MSFT, KO, etc.)
                           ↓
    ┌──────────────────────────────────────────────────────┐
    │  STEP 2: MULTI-AGENT ANALYSIS                        │
    │  4 AI agents analyze each stock                      │
    └──────────────────────────────────────────────────────┘
                           ↓
         ┌──────────────────────────────────────┐
         │  Agent 1: Market Analyst             │
         │  → Technical indicators              │
         │  → Chart patterns                    │
         │  → Price action                      │
         └──────────────────────────────────────┘
                           ↓
         ┌──────────────────────────────────────┐
         │  Agent 2: Social Media Analyst       │
         │  → Reddit sentiment                  │
         │  → Twitter mentions                  │
         │  → Community discussion              │
         └──────────────────────────────────────┘
                           ↓
         ┌──────────────────────────────────────┐
         │  Agent 3: News Analyst               │
         │  → Recent news                       │
         │  → Insider activity                  │
         │  → Earnings announcements            │
         └──────────────────────────────────────┘
                           ↓
         ┌──────────────────────────────────────┐
         │  Agent 4: Fundamentals Analyst       │
         │  → Balance sheet                     │
         │  → Cash flow                         │
         │  → Financial ratios                  │
         └──────────────────────────────────────┘
                           ↓
         ┌──────────────────────────────────────┐
         │  Investment Planner (Synthesizer)    │
         │  → Combines all 4 reports            │
         │  → Creates comprehensive plan        │
         └──────────────────────────────────────┘
                           ↓
         ┌──────────────────────────────────────┐
         │  Bull Trader vs Bear Trader          │
         │  → Debate the opportunity            │
         │  → Argue both sides                  │
         └──────────────────────────────────────┘
                           ↓
         ┌──────────────────────────────────────┐
         │  Risk Manager (Judge)                │
         │  → Makes final decision              │
         │  → BUY / SELL / HOLD                 │
         │  → Sets target price & stop loss     │
         └──────────────────────────────────────┘
                           ↓
              🎯 RETURNS: RANKED RECOMMENDATIONS
                           ↓
    ┌──────────────────────────────────────────────────────┐
    │  STEP 3: AUTO-MONITORING (Optional)                  │
    │  Adds BUY recommendations to watchlist               │
    └──────────────────────────────────────────────────────┘
```

---

## 🚀 How to Use It

### Quick Start

```bash
# Run the full autonomous pipeline
curl -X POST https://true-north-backend-kkqve.ondigitalocean.app/api/autonomous-discovery \
  -H "Content-Type: application/json" \
  -d '{
    "max_opportunities": 5,
    "analyze_with_agents": true,
    "add_to_watchlist": false
  }'
```

**What it does:**
1. Scans market for opportunities (~10 seconds)
2. Analyzes top 5 stocks with 4 AI agents each (~2-5 minutes total)
3. Returns ranked recommendations with BUY/SELL/HOLD

### Parameters

```json
{
  "max_opportunities": 5,          // How many stocks to analyze (1-20)
  "min_confidence": 0.6,            // Minimum confidence threshold (0-1)
  "analyze_with_agents": true,      // Enable deep AI analysis
  "add_to_watchlist": false,        // Auto-add BUY recs to monitoring
  "risk_levels": ["LOW", "MEDIUM"]  // Filter by risk tolerance
}
```

### Response Format

```json
{
  "discovered_count": 11,
  "analyzed_count": 5,
  "top_recommendations": [
    {
      "symbol": "AAPL",
      "recommendation": "BUY",
      "confidence": 0.80,
      "target_price": 295.18,
      "stop_loss": 243.93,
      "reasoning": "Strong technical setup with RSI at 65, MACD bullish crossover...",
      "analysis_time": "2025-10-22T17:30:45"
    },
    {
      "symbol": "KO",
      "recommendation": "BUY",
      "confidence": 0.85,
      "target_price": 82.10,
      "stop_loss": 67.83,
      "reasoning": "Excellent fundamentals, dividend aristocrat, low volatility...",
      "analysis_time": "2025-10-22T17:31:12"
    }
  ],
  "market_regime": {
    "volatility_regime": "NORMAL_VOLATILITY",
    "market_trend": "BULLISH",
    "recommended_strategy": "GROWTH"
  },
  "execution_time": 187.3,
  "timestamp": "2025-10-22T17:35:15"
}
```

---

## 📊 What Each System Does

### Discovery Engine (Already Working)

**Location:** `backend/core/discovery/engine.py`

**What it scans:**
- Market regime (VIX, SPY trend, yields)
- Sector rotation (which sectors are performing)
- Earnings calendar (upcoming announcements)
- Technical indicators (RSI, MACD, momentum)
- Insider trading activity (buying/selling)
- Volume spikes
- Price breakouts

**Output:** 11-20 opportunities ranked by confidence

**Currently active:** ✅ YES - Returns data to `/api/opportunities`

### Trading Agents (Just Fixed)

**Location:** `backend/core/trading_agents/`

**What it does:**
- Runs 4 specialized AI agents per stock
- Each agent has specific tools and expertise
- Debate system ensures balanced analysis
- LLMs used: GPT-4 (fast) + Claude (deep thinking)

**Output:** BUY/SELL/HOLD with reasoning + targets

**Currently active:** ✅ YES - Works via `/api/analyze-stock/{symbol}`

### Autonomous Pipeline (New!)

**Location:** `backend/api/endpoints/autonomous.py`

**What it does:**
- Orchestrates Discovery + Agents automatically
- No manual stock selection needed
- Ranks all results by confidence
- Optional auto-monitoring

**Output:** Complete ranked recommendations

**Currently active:** 🔧 DEPLOYING NOW (~3 minutes)

---

## 🎓 How the AI Agents Work

### Agent 1: Market Analyst

**Tools:**
- `get_stock_data()` - Historical OHLCV
- `get_indicators()` - RSI, MACD, Bollinger Bands, ATR, etc.

**Reasoning:**
```python
# Selects best indicators for current market
if market_regime == "HIGH_VOLATILITY":
    use_indicators = ["ATR", "BOLL", "RSI"]
else:
    use_indicators = ["MACD", "SMA_50", "EMA_10"]

# Analyzes trends
trend = analyze_moving_averages()
momentum = calculate_momentum_score()
```

**Output:** Technical report with buy/sell signals

### Agent 2: Social Media Analyst

**Tools:**
- `get_news()` - Recent news articles
- Reddit sentiment (future: Twitter, StockTwits)

**Reasoning:**
```python
# Sentiment analysis
positive_mentions = count_bullish_posts()
negative_mentions = count_bearish_posts()
sentiment_score = (positive - negative) / total

# Viral detection
if mentions > 100 and sentiment > 0.7:
    flag = "VIRAL_BULLISH"
```

**Output:** Sentiment report with social momentum score

### Agent 3: News Analyst

**Tools:**
- `get_news()` - Company-specific news
- `get_global_news()` - Market-wide news
- `get_insider_sentiment()` - Insider buying/selling
- `get_insider_transactions()` - Detailed trades

**Reasoning:**
```python
# News impact analysis
recent_news = get_news(days=7)
for article in recent_news:
    if "earnings beat" in article:
        score += 0.3
    if "lawsuit" in article:
        score -= 0.2

# Insider activity
if insider_buying > insider_selling:
    confidence += 0.15
```

**Output:** News analysis with insider activity score

### Agent 4: Fundamentals Analyst

**Tools:**
- `get_fundamentals()` - Key metrics (P/E, ROE, etc.)
- `get_balance_sheet()` - Assets, liabilities
- `get_cashflow()` - Operating/investing/financing
- `get_income_statement()` - Revenue, profit margins

**Reasoning:**
```python
# Financial health scoring
debt_to_equity = total_debt / total_equity
if debt_to_equity < 0.5:
    health_score += 0.2

current_ratio = current_assets / current_liabilities
if current_ratio > 2.0:
    health_score += 0.15

# Growth analysis
revenue_growth = (current_rev - prev_rev) / prev_rev
if revenue_growth > 0.15:  # 15% YoY
    growth_score += 0.25
```

**Output:** Fundamentals report with valuation

### Synthesizer: Investment Planner

**Input:** All 4 agent reports

**Process:**
```python
# Combine insights
technical_signal = extract_from(market_report)
sentiment_signal = extract_from(social_report)
news_signal = extract_from(news_report)
fundamental_signal = extract_from(fundamentals_report)

# Weight by confidence
final_score = (
    technical_signal * 0.30 +
    sentiment_signal * 0.20 +
    news_signal * 0.20 +
    fundamental_signal * 0.30
)

# Create investment plan
plan = f"""
Given the comprehensive analysis:
- Technical setup: {technical_signal}
- Market sentiment: {sentiment_signal}
- News environment: {news_signal}
- Fundamental health: {fundamental_signal}

I recommend {final_score > 0.6 ? "BUY" : "HOLD"}
"""
```

**Output:** Comprehensive investment plan

### Debate: Bull vs Bear Traders

**Bull Trader:**
- Argues why to BUY
- Cites positive signals
- Emphasizes growth potential

**Bear Trader:**
- Argues why to SELL/HOLD
- Cites risk factors
- Emphasizes downside protection

**Process:**
```python
# Multi-turn debate
for turn in range(3):
    bull_argument = bull_trader.make_case(investment_plan)
    bear_argument = bear_trader.counter(bull_argument)
    
    # Judge evaluates
    judge.review(bull_argument, bear_argument)
```

### Final: Risk Manager

**Input:** Full debate transcript + all reports

**Decision Process:**
```python
# Review all evidence
evidence_score = evaluate_arguments()

# Consider risk factors
risk_score = calculate_risk(volatility, beta, liquidity)

# Make final call
if evidence_score > 0.7 and risk_score < 0.4:
    decision = "BUY"
    target = current_price * 1.15
    stop_loss = current_price * 0.95
elif evidence_score < 0.3:
    decision = "SELL"
else:
    decision = "HOLD"
```

**Output:** BUY/SELL/HOLD + target price + stop loss

---

## 💡 Use Cases

### 1. Daily Market Scan

**Run every morning before market open:**

```bash
# Find today's best opportunities
curl -X POST /api/autonomous-discovery \
  -d '{"max_opportunities": 10, "analyze_with_agents": true}'
```

**Result:** 10 stocks analyzed by AI agents, ranked by confidence

### 2. Conservative Portfolio Building

**Only low-risk opportunities:**

```bash
curl -X POST /api/autonomous-discovery \
  -d '{
    "max_opportunities": 5,
    "risk_levels": ["LOW"],
    "min_confidence": 0.75
  }'
```

**Result:** 5 safe, high-conviction stocks

### 3. Auto-Monitoring Setup

**Find stocks and auto-add to watchlist:**

```bash
curl -X POST /api/autonomous-discovery \
  -d '{
    "max_opportunities": 5,
    "add_to_watchlist": true
  }'
```

**Result:** BUY recommendations automatically monitored for alerts

### 4. Quick Technical Scan

**Skip deep analysis, just use discovery:**

```bash
curl -X POST /api/autonomous-discovery \
  -d '{
    "max_opportunities": 20,
    "analyze_with_agents": false
  }'
```

**Result:** 20 opportunities from technical screening (fast)

---

## ⏱️ Performance

| Configuration | Time | Cost* |
|--------------|------|-------|
| Discovery only (20 stocks) | 10s | $0 |
| 1 stock full analysis | 30-60s | ~$0.10 |
| 5 stocks full analysis | 2-5 min | ~$0.50 |
| 10 stocks full analysis | 5-10 min | ~$1.00 |

*Approximate OpenAI API costs with GPT-4

**Optimization tips:**
- Use `analyze_with_agents: false` for quick scans
- Reduce `max_opportunities` for faster results
- Schedule during off-peak hours

---

## 🔄 Scheduling (Future Enhancement)

**Coming soon:**

```bash
# Schedule autonomous discovery
POST /api/autonomous-discovery/schedule
Body: {"schedule": "daily"}

# Options:
- "hourly" - Every hour during market hours
- "daily" - Once per day at market close
- "weekly" - Sunday evenings
```

**For now:** Use a cron job or task scheduler

```bash
# Add to crontab (runs daily at 4:30 PM EST)
30 16 * * 1-5 curl -X POST https://backend.com/api/autonomous-discovery
```

---

## 📈 Integration with Other Systems

### With Trader Following

```python
# Discover stocks → Follow traders who trade them
opportunities = discover()
for opp in opportunities:
    traders = find_traders_trading(opp.symbol)
    for trader in traders:
        follow(trader)
```

### With Portfolio Tracker

```python
# Discover stocks → Analyze → Add to portfolio
recommendations = autonomous_discovery()
for rec in recommendations:
    if rec.recommendation == "BUY" and rec.confidence > 0.8:
        add_to_portfolio(rec.symbol, rec.target_price)
```

### With Monitoring System

```python
# Discover stocks → Analyze → Monitor
recommendations = autonomous_discovery()
for rec in recommendations:
    if rec.recommendation == "BUY":
        add_to_watchlist(rec.symbol)
        set_alert(rec.symbol, rec.target_price)
```

---

## 🎯 Key Takeaways

1. **You already have the logic** - Discovery Engine + Trading Agents exist
2. **Autonomous endpoint connects them** - One API call does it all
3. **No manual stock selection needed** - System finds and analyzes automatically
4. **4-agent analysis per stock** - Market, Social, News, Fundamentals
5. **Debate ensures balance** - Bull vs Bear prevents bias
6. **Fully customizable** - Control risk, quantity, and thresholds

---

## 🚀 Next Steps

1. **✅ Done:** Created autonomous endpoint
2. **⏳ Deploying:** Backend restarting with new endpoint (~3 min)
3. **🔜 Test:** Try the autonomous discovery
4. **💡 Enhance:** Add scheduling, results caching, email notifications

---

**Last Updated:** October 22, 2025  
**Endpoint:** `POST /api/autonomous-discovery`  
**Status:** DEPLOYING

