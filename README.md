# 🚀 True North Trading Platform

A cutting-edge AI-powered trading platform combining multi-agent intelligence, real-time market analysis, and modern web technologies.

## ✨ Key Features

- **Multi-Agent Trading System**: AI-powered collaborative analysis from Market, News, Fundamentals, and Risk Manager agents
- **Enhanced Discovery Engine**: Find high-probability trading opportunities using advanced algorithms
- **Trader Following System**: Track and analyze signals from top traders across multiple platforms
- **Robust Monitoring**: Real-time alerts and portfolio tracking
- **Modern Next.js Frontend**: Clean, responsive UI with real-time data visualization
- **FastAPI Backend**: High-performance API with automatic documentation

## 🏗️ Architecture

```
/true-north-trading/
├── frontend/                # Next.js frontend
│   └── src/                 # Frontend source code
│       ├── app/             # Next.js app router
│       ├── components/      # Reusable components
│       └── lib/             # Utilities and API clients
│
├── backend/                 # Backend services
│   ├── api/                 # FastAPI endpoints
│   ├── core/                # Core business logic
│   │   ├── trading_agents/  # Multi-agent trading system
│   │   ├── discovery/       # Opportunity discovery
│   │   ├── monitoring/      # Alerts and monitoring
│   │   ├── trader_following/# Trader signal tracking
│   │   └── backtesting/     # Strategy backtesting
│   ├── data/                # Data storage
│   │   ├── alerts.db        # SQLite databases
│   │   └── trader_following.db
│   ├── deployment/          # Deployment configurations
│   │   ├── Dockerfile       # Docker container definition
│   │   └── docker-compose.yml # Docker services setup
│   ├── docs/                # Documentation
│   │   ├── guides/          # User guides
│   │   └── reports/         # Technical reports
│   ├── launchers/           # Application launchers
│   │   └── run.py           # Main launcher script
│   ├── scripts/             # Utility scripts
│   │   ├── runners/         # Application runners
│   │   ├── setup/           # Setup scripts
│   │   └── analysis/        # Analysis tools
│   ├── setup/               # Setup utilities
│   │   └── setup.py         # Package setup
│   ├── tests/               # Test suite
│   │   ├── unit/            # Unit tests
│   │   ├── integration/     # Integration tests
│   │   └── api/             # API tests
│   └── interfaces/          # User interfaces
│
├── config/                  # Configuration files
├── archive/                 # Archived code
├── cli/                     # Command-line interface
├── tools/                   # Utility tools
│
├── data/ → backend/data/                # Symlink to data directory
├── docs/ → backend/docs/                # Symlink to docs directory
├── scripts/ → backend/scripts/          # Symlink to scripts directory
├── tests/ → backend/tests/              # Symlink to tests directory
├── deployment/ → backend/deployment/    # Symlink to deployment directory
├── run.py → backend/launchers/run.py    # Symlink to main launcher
└── setup.py → backend/setup/setup.py    # Symlink to setup script
```

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/true-north-trading.git
   cd true-north-trading
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your API keys:
   # - OPENAI_API_KEY (required for multi-agent analysis)
   # - ALPHA_VANTAGE_API_KEY (required for market data)
   # - REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET (optional)
   # - TWITTER_BEARER_TOKEN (optional)
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r config/requirements.txt
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Platform

#### Option 1: Using the Unified Launcher

```bash
# Start backend only
python run.py backend

# Start frontend only
python run.py frontend

# Start both (fullstack)
python run.py fullstack
```

#### Option 2: Using the Start Script

```bash
# Start both backend and frontend in separate terminals
./backend/scripts/setup/start.sh

# Start backend only
./backend/scripts/setup/start.sh --backend-only

# Start frontend only
./backend/scripts/setup/start.sh --frontend-only

# Start with Docker
./backend/scripts/setup/start.sh --docker
```

#### Option 3: Individual Start Scripts

**Backend:**
```bash
python backend/scripts/runners/run_backend.py
```

**Frontend:**
```bash
cd frontend
./start.sh
# Or directly with npm:
npm run dev
```

#### Option 4: Manual Start

**Terminal 1 - Backend:**
```bash
cd /path/to/true-north-trading
python backend/scripts/runners/run_backend.py
```

**Terminal 2 - Frontend:**
```bash
cd /path/to/true-north-trading/frontend
npm run dev
```

### Access the Platform

- **Frontend Dashboard**: http://localhost:3002
- **Backend API**: http://localhost:8002
- **API Documentation**: http://localhost:8002/docs

## 📚 Documentation

- [API Endpoints](./backend/docs/API_ENDPOINTS_ENHANCED.md)
- [Frontend-Backend Integration](./backend/docs/FRONTEND_BACKEND_INTEGRATION.md)
- [Deployment Guide](./backend/docs/guides/DEPLOYMENT_GUIDE.md)
- [Trading Education](./backend/docs/trading-education/)

## 🎯 Features Breakdown

### Multi-Agent Trading System

The platform uses a sophisticated multi-agent architecture powered by LangGraph:

- **Market Analyst**: Analyzes technical indicators, price action, and chart patterns
- **News Analyst**: Processes market news, sentiment, and event-driven catalysts
- **Fundamentals Analyst**: Evaluates financial metrics, valuations, and growth prospects
- **Risk Manager**: Assesses portfolio risk, position sizing, and risk-adjusted returns

Agents collaborate and debate to reach consensus on trading decisions.

### Enhanced Discovery Engine

- Market regime detection (volatility, trend, sentiment)
- Sector rotation analysis
- Earnings calendar monitoring
- Technical screening
- Multi-factor ranking

### Trader Following System

- Track signals from top traders
- Analyze win rates and performance metrics
- Filter by platform, strategy, and risk profile
- Real-time signal notifications

### Monitoring & Alerts

- Real-time price alerts
- Technical indicator alerts
- News and sentiment alerts
- Portfolio performance tracking

## 🧪 Testing

```bash
# Run all tests
python backend/scripts/run_tests.py

# Run specific test suites
pytest backend/tests/unit/
pytest backend/tests/integration/
pytest backend/tests/api/
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
cd backend/deployment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🛠️ Development

### Backend Development

The backend is organized into modular components:

- **API Layer** (`backend/api/`): FastAPI endpoints
- **Core Logic** (`backend/core/`): Business logic and systems
- **Data Layer** (`backend/data/`): Database and data storage
- **Scripts** (`backend/scripts/`): Utility scripts and runners

### Frontend Development

The frontend uses Next.js 14+ with:

- App Router for routing
- Server and Client Components
- Tailwind CSS for styling
- Real-time data updates

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```

## 📊 CLI Usage

The platform includes a powerful CLI:

```bash
python -m cli.main
```

## ⚙️ Configuration

Configuration files are located in `config/`:

- `requirements.txt`: Python dependencies
- `cost_profiles.py`: Cost management settings
- `pyproject.toml`: Project metadata

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This software is for educational and research purposes only. Trading involves risk and past performance does not guarantee future results. Always do your own research and consult with financial professionals before making investment decisions.

## 🔗 Links

- [Project Documentation](./backend/docs/)
- [API Reference](http://localhost:8002/docs)
- [Trading Education](./backend/docs/trading-education/)

---

Built with ❤️ by the True North Trading team

