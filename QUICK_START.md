# 🚀 Quick Start Guide

## Super Quick Start (3 commands)

```bash
# 1. Make start script executable (first time only)
chmod +x start.sh

# 2. Start everything
./start.sh

# 3. Access dashboard
open http://localhost:8501
```

---

## What Gets Started?

### 🔄 Background Scheduler
Automatically runs:
- **Monitoring** - Every 5 minutes (market hours)
- **Discovery** - Every 4 hours (market hours)  
- **Trader Signals** - Every 15 minutes (market hours)
- **Backtesting** - Daily at 6 PM
- **Stats Backup** - Every 30 minutes

### 📊 Dashboard
Interactive web interface at http://localhost:8501

---

## Start Options

### Start Everything (Recommended):
```bash
./start.sh
```
Starts scheduler in background + dashboard in foreground

### Start Only Scheduler:
```bash
./start.sh --scheduler-only
```
Background only, no dashboard

### Start Only Dashboard:
```bash
./start.sh --dashboard-only
```
Dashboard only, no scheduler

### Start With Docker:
```bash
./start.sh --docker
```
Uses Docker Compose (requires Docker)

---

## Manual Start

### Scheduler:
```bash
python trading_scheduler.py
```

### Dashboard:
```bash
streamlit run streamlit_dashboard.py
```

---

## Stop Everything

### Stop Scheduler:
```bash
pkill -f trading_scheduler.py
```

### Stop Dashboard:
```bash
# Press Ctrl+C in the terminal
# Or
lsof -ti:8501 | xargs kill
```

### Stop Docker:
```bash
docker-compose down
```

---

## Check Status

### Is Scheduler Running?
```bash
ps aux | grep trading_scheduler
```

### View Scheduler Logs:
```bash
tail -f logs/trading_scheduler.log
```

### View Stats:
```bash
cat data/scheduler_stats.json
```

### View Latest Opportunities:
```bash
cat data/latest_opportunities.json | jq '.'
```

---

## Common Tasks

### Run Discovery Manually:
From dashboard sidebar → "🚀 Run Discovery"

### Run Monitoring Manually:
From dashboard sidebar → "📊 Monitor Markets"

### View Alerts:
Dashboard → "📊 Monitoring" page

### Backtest Strategy:
Dashboard → "📈 Backtesting" page

---

## Troubleshooting

### Port 8501 already in use:
```bash
lsof -ti:8501 | xargs kill
```

### Scheduler not starting:
```bash
# Check for errors
tail -f logs/trading_scheduler.log

# Check if already running
ps aux | grep trading_scheduler
```

### Dashboard not loading:
```bash
# Clear Streamlit cache
streamlit cache clear

# Restart
./start.sh --dashboard-only
```

---

## File Locations

- **Logs:** `logs/`
- **Data:** `data/`
- **Opportunities:** `data/latest_opportunities.json`
- **Signals:** `data/latest_signals.json`
- **Stats:** `data/scheduler_stats.json`

---

## URLs

- **Dashboard:** http://localhost:8501
- **Network Access:** http://YOUR_IP:8501

---

## Need More Details?

- **Deployment:** See `DEPLOYMENT_GUIDE.md`
- **Dashboard:** See `DASHBOARD_GUIDE.md`
- **Platform Docs:** See `README.md`

---

**You're ready to trade! 📈💰**

