# True North Trading - System Flows Audit

**Date:** October 22, 2025  
**Status:** Post-Deployment Analysis

## 🎯 Overview

This document maps out all data flows in the True North Trading platform, identifying what's working, what's empty, and how to activate each system.

---

## 📊 Current Status by Page

### ✅ **Working** - Opportunities Page
- **Endpoint:** `GET /api/opportunities`
- **Status:** ✅ ACTIVE - Returns 11 opportunities
- **Data Source:** Discovery Engine (background scan)
- **Sample Output:** AAPL, KO, PG, WMT, MA, JNJ, MSFT, GOOGL, BAC, JPM, NVDA
- **How It Works:** Discovery engine scans watchlist stocks, analyzes technical/momentum signals
- **Trigger:** Automatic on startup

### ⚠️ **Empty** - Monitoring & Alerts
- **Endpoint:** `GET /api/alerts`
- **Status:** ⚠️ EMPTY - Returns `[]`
- **Why Empty:** 
  1. Monitoring system needs a watchlist to monitor
  2. Background monitoring loop not started
  3. No triggers have fired yet
- **How to Activate:**
  ```python
  # Add symbols to watchlist
  monitoring_system.add_to_watchlist(["AAPL", "TSLA", "NVDA"])
  
  # Start monitoring
  monitoring_system.start_monitoring()
  ```

### ⚠️ **Empty** - Trader Signals
- **Endpoint:** `GET /api/trader-signals`
- **Status:** ⚠️ EMPTY - Returns `[]`
- **Why Empty:** No traders are followed yet
- **How to Activate:**
  1. **Option A:** Add Reddit credentials and discover real traders
     ```bash
     curl -X POST https://backend.com/api/traders/discover-reddit
     ```
  2. **Option B:** Manually follow traders from leaderboard
  3. Traders will then generate signals that appear here

### ⚠️ **Empty** - Leaderboard
- **Endpoint:** `GET /api/trader-leaderboard`
- **Status:** ⚠️ SHOWS DEMO DATA (3 sample traders)
- **Why Demo:** Database is empty, so sample traders are returned
- **How to Get Real Data:**
  1. Add Reddit API credentials to Digital Ocean
  2. Call discovery endpoint
  3. Real Reddit traders will replace demo data

### 🔧 **Fixed** - Stock Analysis (Trading Agents)
- **Endpoint:** `POST /api/analyze-stock/{symbol}`
- **Status:** 🔧 JUST FIXED - Was broken, now deploying
- **What Was Wrong:** Incorrect parameters passed to agent graph
- **Fix Applied:** 
  - Call `propagate(symbol, date)` correctly
  - Extract agent reports from final_state
  - Parse decision string (BUY/SELL/HOLD)
  - Calculate price targets
- **How to Use:**
  ```bash
  curl -X POST https://backend.com/api/analyze-stock/AAPL
  ```
- **What It Does:** Runs 4 AI agents (Market, Social, News, Fundamentals) → Debate → Final recommendation

---

## 🤖 Trading Agents Workflow (The Core System)

### Multi-Agent Architecture

```
User requests analysis of AAPL
         ↓
1. Market Analyst Agent
   - Gets stock data (yfinance)
   - Calculates technical indicators (RSI, MACD, Bollinger Bands, etc.)
   - Writes detailed technical report
         ↓
2. Social Media Analyst Agent
   - Analyzes Reddit sentiment
   - Checks Twitter mentions
   - Writes sentiment report
         ↓
3. News Analyst Agent
   - Fetches recent news (Finnhub)
   - Analyzes insider sentiment
   - Checks for earnings announcements
   - Writes news analysis report
         ↓
4. Fundamentals Analyst Agent
   - Gets balance sheet
   - Analyzes cash flow
   - Reviews income statement
   - Calculates financial ratios
   - Writes fundamentals report
         ↓
5. Investment Planner (Synthesizer)
   - Combines all 4 reports
   - Creates comprehensive investment plan
         ↓
6. Bull Trader Agent
   - Argues bullish case
   - Cites positive signals
         ↓
7. Bear Trader Agent
   - Argues bearish case
   - Cites risk factors
         ↓
8. Risk Manager (Debate Judge)
   - Reviews both sides
   - Makes final decision: BUY / SELL / HOLD
   - Sets target price and stop loss
         ↓
Result returned to user
```

### Agent Tools Available

Each agent can call these tools:
- `get_stock_data`: Historical OHLCV data
- `get_indicators`: Technical indicators (RSI, MACD, ATR, Bollinger Bands, etc.)
- `get_fundamentals`: Key financial metrics
- `get_balance_sheet`: Assets, liabilities, equity
- `get_cashflow`: Operating/investing/financing cash flows
- `get_income_statement`: Revenue, profit margins
- `get_news`: Recent news articles
- `get_insider_sentiment`: Insider buying/selling
- `get_insider_transactions`: Detailed insider trades
- `get_global_news`: Market-wide news

### LLM Models Used

- **Quick Thinking:** GPT-4 (fast responses, tool calling)
- **Deep Thinking:** Claude Sonnet 3.5 (detailed analysis, reasoning)

---

## 🔄 Data Flow by System

### 1. Discovery Engine Flow

```
Startup
  ↓
Load watchlist: ["AAPL", "MSFT", "GOOGL", ...] (30+ stocks)
  ↓
For each stock:
  → Fetch price data
  → Calculate technical indicators
  → Calculate momentum score
  → Score opportunity (0-10)
  ↓
Filter: score > 5.0
  ↓
Save to opportunities list
  ↓
Return via /api/opportunities
```

**Currently:** ✅ Working - 11 opportunities found

### 2. Trader Following Flow

```
User follows trader from leaderboard
  ↓
Trader added to database
  ↓
Background: Scan trader's recent posts
  ↓
Extract trading signals (symbol, action, confidence)
  ↓
Save to signals database
  ↓
Return via /api/trader-signals
```

**Currently:** ⚠️ Empty - No traders followed yet

### 3. Monitoring & Alerts Flow

```
Monitoring system starts
  ↓
Every 5 minutes:
  → Check each symbol in watchlist
  → Run alert rules:
     - Price breakout (> 5% move)
     - Volume spike (> 2x avg volume)
     - Technical signals (RSI overbought/oversold)
     - News events
  ↓
Generate alerts
  ↓
Save to alerts.db
  ↓
Send notifications (email, webhook, console)
  ↓
Return via /api/alerts
```

**Currently:** ⚠️ Not running - Watchlist empty, monitoring not started

### 4. Portfolio Tracking Flow

```
User adds position
  ↓
Position saved to portfolio.db
  ↓
Background: Calculate metrics
  → Total value
  → P&L (profit/loss)
  → Risk exposure
  → Correlation matrix
  ↓
Return via /api/portfolio-metrics
```

**Currently:** ⚠️ Empty - No positions added

---

## 🚀 How to Activate Each System

### Activate Monitoring & Alerts

**Backend Code** (add to startup or endpoint):
```python
from backend.api.dependencies import get_monitoring_system

# Get the monitoring system
monitoring = get_monitoring_system()

# Add symbols to watch
monitoring.add_to_watchlist(["AAPL", "TSLA", "NVDA", "MSFT", "GOOGL"])

# Start background monitoring
monitoring.start_monitoring()

# System will now generate alerts every 5 minutes
```

**Or via API endpoint** (needs to be created):
```bash
POST /api/monitoring/start
Body: {
  "symbols": ["AAPL", "TSLA", "NVDA"]
}
```

### Activate Trader Discovery (Reddit)

**Step 1:** Add credentials to Digital Ocean:
- `REDDIT_CLIENT_ID`
- `REDDIT_CLIENT_SECRET`

**Step 2:** Call discovery endpoint:
```bash
curl -X POST https://backend.com/api/traders/discover-reddit
```

**Result:** 
- Scans r/investing, r/stocks, r/SecurityAnalysis
- Finds top traders with 50+ karma
- Adds them to leaderboard
- Available to follow

### Activate Trading Agents Analysis

**Already working!** Just call:
```bash
curl -X POST https://backend.com/api/analyze-stock/AAPL
```

**Response includes:**
- 4 agent reports (market, social, news, fundamentals)
- Debate summary
- Final recommendation (BUY/SELL/HOLD)
- Target price & stop loss
- Confidence score

---

## 📈 API Endpoints Summary

| Endpoint | Status | Data Source | Trigger |
|----------|--------|-------------|---------|
| `GET /api/opportunities` | ✅ Active | Discovery Engine | Automatic |
| `GET /api/alerts` | ⚠️ Empty | Monitoring System | Manual start needed |
| `GET /api/trader-signals` | ⚠️ Empty | Trader Following | Need to follow traders |
| `GET /api/trader-leaderboard` | ⚠️ Demo | Trader DB | Need Reddit discovery |
| `GET /api/traders` | ⚠️ Empty | Trader DB | Need to follow traders |
| `POST /api/analyze-stock/{symbol}` | 🔧 Fixed | Trading Agents | On-demand |
| `POST /api/traders/follow` | ✅ Ready | Trader DB | Manual |
| `POST /api/traders/discover-reddit` | ✅ Ready | Reddit API | Manual (needs creds) |
| `GET /api/market-regime` | ✅ Active | Market Analysis | Automatic |
| `GET /api/portfolio-metrics` | ⚠️ Empty | Portfolio DB | Need positions |

---

## 🎯 Immediate Action Items

### To Get Full Data Flowing:

1. **✅ Already Done:**
   - Fixed trading agents endpoint
   - Added Reddit trader discovery
   - Created trader following system
   - Opportunities are generating

2. **🔧 To Do Now:**
   - Add Reddit credentials to Digital Ocean
   - Call discovery endpoint to get real traders
   - Follow some traders to get signals flowing

3. **🔜 To Do Next:**
   - Create endpoint to start monitoring system
   - Add symbols to monitoring watchlist
   - Start generating alerts

4. **💡 Enhancement Ideas:**
   - Auto-discover opportunities → auto-analyze with agents → auto-add to watchlist → auto-monitor
   - Scheduled agent runs (analyze top opportunities daily)
   - Auto-follow top performers from Reddit
   - Integrate trader signals into opportunities

---

## 🧠 System Intelligence Levels

### Level 1: Discovery (Currently Active)
- Scans stocks for technical opportunities
- Uses momentum + technical indicators
- **Output:** Opportunities list

### Level 2: Deep Analysis (Just Fixed)
- 4-agent multi-perspective analysis
- Debates and synthesizes
- **Output:** BUY/SELL/HOLD with reasoning

### Level 3: Trader Intelligence (Ready to Activate)
- Learn from successful traders
- Track their signals
- **Output:** Trader signals

### Level 4: Monitoring (Ready to Activate)
- Real-time price/volume alerts
- Technical breakouts
- **Output:** Alerts

### Level 5: Portfolio Management (Available)
- Track positions
- Calculate risk
- **Output:** Portfolio metrics

---

## 📊 Data Persistence

All data is stored in SQLite databases:

| Database | Location | Purpose |
|----------|----------|---------|
| `alerts.db` | `/app/backend/data/` | Monitoring alerts |
| `portfolio.db` | `/app/backend/data/` | Portfolio positions |
| `trader_following.db` | `/app/backend/data/` | Followed traders & signals |
| Discovery cache | In-memory | Opportunities (regenerates) |

---

## 🔑 Key Takeaways

1. **Opportunities work** because discovery engine runs automatically
2. **Alerts are empty** because monitoring needs manual start
3. **Trader signals empty** because no traders followed yet
4. **Analysis was broken** but is now fixed (deploying)
5. **Reddit discovery ready** - just needs API credentials

**To see full data flow:** Add Reddit creds → discover traders → follow them → start monitoring → everything flows!

---

**Last Updated:** October 22, 2025  
**Deployment:** https://true-north-backend-kkqve.ondigitalocean.app  
**Frontend:** https://frontend-ip72fz1ni-athleas-projects.vercel.app

