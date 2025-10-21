# Backend Quick Start

## 🚀 Fast Setup

### Prerequisites
- Python 3.8+
- API Keys (OpenAI, Alpha Vantage)

### 1. Environment Setup
```bash
# From the backend directory
cp .env.example .env  # Create .env if it doesn't exist
# Edit .env and add your API keys
```

### 2. Install Dependencies
```bash
# Create virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r config/requirements.txt
```

### 3. Start Backend
```bash
# Option 1: Use start script (easiest)
./start.sh

# Option 2: Use runner script directly
python scripts/runners/run_backend.py

# Option 3: Direct uvicorn
cd ..  # Go to project root
uvicorn backend.api.main:app --reload --port 8002
```

## 📡 Accessing the API

- **API Base URL**: http://localhost:8002
- **Interactive Docs**: http://localhost:8002/docs
- **Health Check**: http://localhost:8002/health

## 🔑 Required Environment Variables

Create `backend/.env` with:
```bash
OPENAI_API_KEY=your_openai_key_here
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
```

## 📊 API Endpoints

### Market Data
- `GET /api/market-regime` - Current market regime
- `GET /api/market-regime/detailed` - Detailed market analysis
- `GET /api/sector-rotation` - Sector rotation analysis

### Trading Opportunities
- `GET /api/opportunities` - AI-discovered opportunities
- `POST /api/run-discovery` - Trigger discovery engine

### Traders & Signals
- `GET /api/traders` - Followed traders
- `GET /api/trader-signals` - Recent trading signals
- `GET /api/trader-leaderboard` - Trader performance ranking

### Portfolio
- `GET /api/portfolio-metrics` - Portfolio performance

### Analysis
- `POST /api/analyze-stock/{symbol}` - Multi-agent stock analysis

### Monitoring
- `GET /api/alerts` - Real-time alerts

## 🛠️ Development

### Project Structure
```
backend/
├── api/              # FastAPI endpoints
│   ├── endpoints/    # Modular route handlers
│   ├── models.py     # Pydantic models
│   ├── dependencies.py
│   └── main.py
├── core/             # Trading systems
│   ├── trading_agents/
│   ├── discovery/
│   ├── monitoring/
│   ├── trader_following/
│   ├── backtesting/
│   └── portfolio/
├── scripts/          # Utility scripts
├── config/           # Configuration files
└── data/            # Database files
```

### Running Tests
```bash
python scripts/run_tests.py
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8002
lsof -ti:8002 | xargs kill -9
```

### Import Errors
Make sure you're in the project root when running:
```bash
cd /path/to/true-north-trading
python backend/scripts/runners/run_backend.py
```

### Missing Dependencies
```bash
pip install -r backend/config/requirements.txt
```

### Database Issues
```bash
# Reset trader database
python backend/scripts/setup/reset_trader_db.py
```

## 💡 Tips

1. **Use the start script**: `./start.sh` handles everything automatically
2. **Check logs**: Watch the terminal output for errors
3. **API docs**: Visit `/docs` for interactive API testing
4. **Health check**: Visit `/health` to verify all systems are initialized

## 🔗 Related

- **Frontend**: See `../frontend/start.sh`
- **Full docs**: See `../backend/docs/`
- **Main README**: See `../README.md`

