# 📁 True North Trading - Project Structure

## 🎯 Clean & Organized Structure

**Before Cleanup:** 70+ files in root  
**After Cleanup:** 33 organized files/folders

---

## 📂 Root Directory

### 🚀 **Main Application**
```
app.py                              # Main Streamlit dashboard (NEW)
start.sh                            # Quick start script
trading_scheduler.py                # Backend scheduler for automated tasks
```

### 🔧 **Core Systems**
```
enhanced_discovery_engine.py        # AI-powered opportunity discovery
trader_following_system.py          # Social trader tracking system
robust_monitoring_system.py         # Alert and monitoring system
comprehensive_backtesting_framework.py  # Strategy backtesting
backtesting_wrapper.py              # Backtesting interface wrapper
```

### 📚 **Documentation** (`docs/`)
```
docs/
├── README.md
├── QUICK_START.md                  # Getting started guide
├── DEPLOYMENT_GUIDE.md             # Production deployment
├── DASHBOARD_GUIDE.md              # Dashboard usage
├── NEW_DASHBOARD.md                # Latest dashboard features
├── PLATFORM_CAPABILITIES.md        # Feature overview
├── TOP_TRADER_DISCOVERY_GUIDE.md   # Trader following setup
├── TRADER_FOLLOWING_GUIDE.md       # Advanced trader tracking
└── trading-education/              # Trading concepts & strategies
```

### 🗃️ **Data** (`data/`)
```
data/
├── alerts.db                       # Monitoring alerts database
├── trader_following.db             # Trader profiles & trades
├── discovered_watchlist.json       # Found opportunities
└── discovery_engine.log            # Discovery logs
```

### 🏗️ **Core Modules** (`tradingagents/`)
```
tradingagents/
├── agents/                         # AI trading agents
│   ├── analysts/                   # Market, news, fundamental analysis
│   ├── researchers/                # Bull/bear case researchers
│   ├── managers/                   # Research & risk management
│   └── trader/                     # Trade execution agent
├── dataflows/                      # Data fetching & processing
│   ├── alpha_vantage*.py          # Market data APIs
│   ├── y_finance.py               # Yahoo Finance integration
│   ├── reddit_utils.py            # Social sentiment
│   └── googlenews_utils.py        # News aggregation
├── graph/                          # AI agent workflow graphs
└── utils/                          # Utilities & helpers
```

### 🧪 **Testing** (`tests/`)
```
tests/
├── api/                            # API integration tests
├── unit/                           # Unit tests
├── integration/                    # Integration tests
└── performance/                    # Performance benchmarks
```

### 🛠️ **Scripts** (`scripts/`)
```
scripts/
├── setup/                          # Environment setup
├── analysis/                       # Analysis utilities
└── data/                           # Data management
```

### 🚀 **Deployment** (`deployment/`)
```
deployment/
├── Dockerfile                      # Docker container config
├── docker-compose.yml              # Multi-container setup
└── systemd/                        # Linux service files
```

### 📦 **Other Folders**
```
cli/                                # Command-line interface
examples/                           # Example usage scripts
models/                             # ML model storage
notebooks/                          # Jupyter notebooks
logs/                              # Application logs
results/                           # Backtest & analysis results
assets/                            # Images & static files
tools/                             # Development tools
```

### 🗄️ **Archive** (`archive/`)
```
archive/
├── old_demos/                      # Deprecated demo scripts
├── old_docs/                       # Historical documentation
├── deprecated/                     # Superseded code files
└── README.md                       # Archive index
```

### ⚙️ **Configuration**
```
pyproject.toml                      # Python project config
requirements.txt                    # Python dependencies
uv.lock                            # Dependency lock file
```

---

## 🎯 **Quick Navigation**

### For Users:
- **Start Dashboard:** Run `./start.sh` or `streamlit run app.py`
- **Documentation:** Check `docs/QUICK_START.md`
- **Trading Education:** See `docs/trading-education/`

### For Developers:
- **Core Logic:** Check `tradingagents/` folder
- **Tests:** Run `python run_tests.py`
- **Examples:** Browse `examples/` folder

### For DevOps:
- **Deployment:** See `deployment/` folder
- **Scripts:** Check `scripts/setup/`

---

## 📊 **File Organization Benefits**

✅ **Reduced Clutter:** 70+ → 33 root items  
✅ **Clear Structure:** Logical folder organization  
✅ **Easy Navigation:** Find what you need quickly  
✅ **Maintained History:** Old files preserved in `archive/`  
✅ **Better Git:** Cleaner diffs and history  

---

## 🔄 **What Was Moved**

### To `archive/old_demos/`:
- `demo_platform.py`
- `ultra_robust_platform_demo.py`
- `investment_dashboard.py`
- `analyze_stock.py`
- And 6 more demo/test files...

### To `archive/deprecated/`:
- `monitoring_system.py` (replaced by `robust_monitoring_system.py`)
- `backtesting_engine.py` (replaced by `comprehensive_backtesting_framework.py`)
- `streamlit_dashboard.py` (replaced by `app.py`)
- `web_interface.py` (replaced by `app.py`)

### To `docs/`:
- All `.md` documentation files (11 files)
- Kept only core docs in root (README, LICENSE)

### To `data/`:
- All database files (`.db`)
- All JSON data files
- Log files

### To `deployment/`:
- Docker files
- Docker Compose configuration

---

## 💡 **Maintenance Tips**

1. **Keep Root Clean:** Only essential files belong in root
2. **Use Archive:** Move deprecated files, don't delete them
3. **Document Changes:** Update this file when restructuring
4. **Follow Convention:** Use existing folder structure

---

Last Updated: October 19, 2025

