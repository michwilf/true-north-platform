# 🔍 Backend Server Status Report

## 📊 **Current Status**

### **✅ Backend Server: RUNNING**
- **Process ID**: 82719
- **Command**: Python start_backend.py
- **Runtime**: Since Friday 11AM (6+ hours uptime)

---

## 💾 **Data Storage Locations**

### **Database Files:**

```
backend/data/
├── portfolio.db          (24 KB, updated Oct 20 23:27)
│   ├── 5 positions
│   ├── trades table
│   └── portfolio_metrics
│
├── alerts.db            (12 KB, updated Oct 20 22:44)
│   └── 0 alerts (empty)
│
└── trader_following.db  (20 KB, updated Oct 20 22:44)
    ├── traders table
    └── trades table
```

### **JSON Data Files:**

```
backend/data/
├── discovered_watchlist.json           (181 B, Oct 18)
│   └── Contains: 1 opportunity (NESN.SW)
│
└── enhanced_opportunities_20251018_2229.json  (5.7 KB, Oct 18)
    └── Contains: Enhanced opportunity analysis
```

### **Log Files:**

```
backend/data/
└── discovery_engine.log   (9.5 KB, Oct 18 22:29)
    └── Last activity: Oct 18, 2025 at 10:29 PM
```

---

## 🔄 **What's Running in the Background**

### **On Startup (from main.py):**

The backend initializes these systems:

1. **✅ Cache Manager**
   - In-memory caching for API calls
   - Reduces redundant API requests

2. **✅ Portfolio Tracker**
   - Manages: `backend/data/portfolio.db`
   - Tracks: 5 positions
   - Auto-seeds demo data if empty

3. **✅ Discovery Engine**
   - Last ran: Oct 18, 2025 at 10:29 PM
   - Found: 15 opportunities
   - Scanned: 14 social media mentions
   - Enhanced: 96 opportunities

4. **✅ Monitoring System**
   - Manages: `backend/data/alerts.db`
   - Current alerts: 0

5. **✅ Trader Following System**
   - Manages: `backend/data/trader_following.db`
   - Tracks traders from Reddit/social media

6. **✅ Backtesting Framework**
   - Available for strategy testing

7. **✅ TradingAgents Multi-Agent System**
   - Model: gpt-4o-mini
   - Max debate rounds: 2
   - Powers the streaming AI analysis

---

## 📝 **Recent Activity (from logs)**

### **Last Discovery Run (Oct 18, 10:29 PM):**

```
✅ Social media scan complete: 14 mentions
✅ Enhanced 96 opportunities
✅ Discovery complete: 15 opportunities found
```

### **Issues Detected:**

1. **PRAW Warning** (repeated):
   - Using PRAW (Reddit API) in async environment
   - Recommendation: Switch to Async PRAW
   - Impact: Non-critical, but could improve performance

2. **Delisted Stocks**:
   - $RDSA.AS: No price data (possibly delisted)
   - $SFT: No price data (possibly delisted)

3. **AI Analysis Errors** (format errors):
   - Multiple stocks had "unsupported format string" errors
   - Affected: MUFG, WMT, BAC, TEAM, BABA, XLY, BNP.PA, AVGO, etc.
   - Likely cause: Missing data in some fields

---

## 🗄️ **Database Schemas**

### **Portfolio Database:**

**positions** table:
- symbol (PRIMARY KEY)
- shares
- entry_price
- entry_date
- last_updated

**trades** table:
- trade_id (auto-increment)
- symbol
- action (BUY/SELL)
- shares
- price
- timestamp
- pnl
- pnl_percent

**portfolio_metrics** table:
- total_value
- cash_balance
- total_invested
- last_updated

---

### **Alerts Database:**

**alerts** table:
- id (PRIMARY KEY)
- alert_type
- severity
- symbol
- title
- message
- timestamp
- data (JSON)
- channels
- acknowledged
- resolved

---

### **Trader Following Database:**

**traders** table:
- trader_id (PRIMARY KEY)
- name
- platform
- username
- win_rate
- avg_return
- total_followers
- verified
- primary_strategy
- typical_hold_time
- risk_level
- confidence_score
- auto_follow
- notification_enabled
- added_date
- last_activity
- total_trades_tracked

**trades** table:
- trade_id (PRIMARY KEY)
- trader_id (FOREIGN KEY)
- symbol
- trade_type
- entry_price
- entry_time
- entry_confidence
- exit_price
- exit_time
- position_size
- stop_loss
- take_profit
- pnl_percent
- pnl_dollar
- is_closed
- source_post_id
- source_text
- platform
- sentiment_score
- conviction_level

---

## 📊 **Current Data Summary**

### **Portfolio:**
- **5 positions** in database
- Demo data seeded on startup if empty

### **Opportunities:**
- **1 opportunity** in watchlist (NESN.SW)
- Last discovery: Oct 18, 2025
- Status: Stale (hasn't run recently)

### **Alerts:**
- **0 active alerts**

### **Traders:**
- Database exists but needs query to see count
- Tracks Reddit traders from r/wallstreetbets, r/stocks, etc.

---

## ⚙️ **Background Processes**

### **Scheduler (if configured):**

The platform has a `TradingScheduler` class that can:
- Run discovery engine periodically
- Monitor portfolio positions
- Check for trader signals
- Generate alerts

**Status**: Scheduler exists but may not be actively running
**Config**: `backend/core/trading_scheduler.py`

### **What's NOT Running Automatically:**

❌ **Scheduled Discovery** - Discovery engine only runs on manual trigger
❌ **Auto Trading** - No automatic position management
❌ **Real-time Monitoring** - Alerts exist but not actively monitoring
❌ **Trader Signal Scanning** - Trader system exists but not actively scanning

---

## 🔧 **What Happens When You:**

### **1. Run Discovery (Click "Run Discovery" button):**
```python
1. Scans Reddit (r/wallstreetbets, r/stocks, r/investing)
2. Analyzes technical indicators
3. Checks social media sentiment
4. Generates opportunity scores
5. Saves to: backend/data/discovered_watchlist.json
6. Returns: List of top opportunities
```

### **2. Click AI Analysis Button:**
```python
1. Opens SSE stream to backend
2. Triggers multi-agent system
3. Streams results back word-by-word
4. No data saved (stateless)
```

### **3. API Calls:**
```python
1. Checks in-memory cache first
2. If not cached, makes external API calls (Yahoo Finance, Reddit, etc.)
3. Caches result for future use
4. Returns data to frontend
```

---

## 📈 **Performance Notes**

### **Last Discovery Performance:**
- **Time**: ~6 minutes (Oct 18, 10:29 PM)
- **Reddit mentions**: 14 found
- **Opportunities processed**: 96
- **Final results**: 15 opportunities
- **AI Analysis errors**: 15+ format errors

### **Issues:**
1. ⚠️ Using sync PRAW in async environment
2. ⚠️ AI analysis format errors
3. ⚠️ Some stocks returning no data (delisted)

---

## 🚀 **Recommendations**

### **Immediate:**
1. **Fix AI Analysis Format Errors**
   - Add null checks for missing data
   - Handle delisted stocks gracefully

2. **Update PRAW to Async**
   - Switch from `praw` to `asyncpraw`
   - Improve performance in async environment

### **Optimization:**
1. **Enable Scheduler** (if desired)
   - Auto-run discovery daily
   - Monitor positions automatically
   - Scan for trader signals

2. **Clean Up Old Data**
   - Discovery data from Oct 18 is stale
   - Consider running fresh discovery

3. **Database Maintenance**
   - Check trader database for stale data
   - Archive old trades

---

## 📍 **Data Locations Summary**

```
/Users/MikeyW/true-north-trading/
│
├── backend/data/              # ← Primary data storage
│   ├── portfolio.db           # Portfolio positions & trades
│   ├── alerts.db              # System alerts (empty)
│   ├── trader_following.db    # Trader tracking
│   ├── discovered_watchlist.json  # Latest opportunities
│   └── discovery_engine.log   # Discovery activity log
│
├── logs/                      # ← Empty (no logs)
├── backend/logs/              # ← Empty (no logs)
└── results/                   # ← Analysis results (if any)
```

---

## 🎯 **Summary**

**Backend is RUNNING but mostly IDLE:**
- ✅ Server is up and responding
- ✅ All systems initialized
- ⏸️ No automatic background tasks
- ⏸️ Discovery hasn't run recently (Oct 18)
- ⏸️ No active alerts
- ✅ Portfolio has 5 positions
- ✅ Databases are healthy

**The backend is primarily serving API requests on-demand, not running continuous background processes.**

---

**Want to activate background processing?**
- Start the scheduler: `python backend/core/trading_scheduler.py`
- Or configure auto-discovery in settings
- Or set up cron jobs for periodic runs

