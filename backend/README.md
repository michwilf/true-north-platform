# true-north-platform
<p align="center">
  <img src="assets/TauricResearch.png" style="width: 60%; height: auto;">
</p>

<div align="center" style="line-height: 1;">
  <a href="https://arxiv.org/abs/2412.20138" target="_blank"><img alt="arXiv" src="https://img.shields.io/badge/arXiv-2412.20138-B31B1B?logo=arxiv"/></a>
  <a href="https://discord.com/invite/hk9PGKShPK" target="_blank"><img alt="Discord" src="https://img.shields.io/badge/Discord-TradingResearch-7289da?logo=discord&logoColor=white&color=7289da"/></a>
  <a href="./assets/wechat.png" target="_blank"><img alt="WeChat" src="https://img.shields.io/badge/WeChat-TauricResearch-brightgreen?logo=wechat&logoColor=white"/></a>
  <a href="https://x.com/TauricResearch" target="_blank"><img alt="X Follow" src="https://img.shields.io/badge/X-TauricResearch-white?logo=x&logoColor=white"/></a>
  <br>
  <a href="https://github.com/TauricResearch/" target="_blank"><img alt="Community" src="https://img.shields.io/badge/Join_GitHub_Community-TauricResearch-14C290?logo=discourse"/></a>
</div>

<div align="center">
  <!-- Keep these links. Translations will automatically update with the README. -->
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=de">Deutsch</a> | 
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=es">Español</a> | 
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=fr">français</a> | 
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=ja">日本語</a> | 
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=ko">한국어</a> | 
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=pt">Português</a> | 
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=ru">Русский</a> | 
  <a href="https://www.readme-i18n.com/TauricResearch/TradingAgents?lang=zh">中文</a>
</div>

---

# True North Trading Platform

> 🚀 **True North Trading** is a comprehensive AI-powered trading platform featuring multi-agent analysis, market regime detection, and trader following capabilities.

<div align="center">

🚀 [Getting Started](#getting-started) | 📊 [Features](#key-features) | 🏗️ [Architecture](#architecture) | 💻 [Development](#development) | 📚 [Documentation](#documentation)

</div>

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/true-north-trading.git
cd true-north-trading

# Install dependencies
pip install -e .
cd frontend && npm install && cd ..

# Start the platform (choose one)
python run.py backend     # Start just the backend API
python run.py frontend    # Start just the frontend
python run.py fullstack   # Start both backend and frontend
```

Visit:
- Frontend: http://localhost:3002
- Backend API: http://localhost:8002
- API Docs: http://localhost:8002/docs

## Key Features

- **Multi-Agent Stock Analysis**: Technical, fundamental, news, and risk analysis from specialized AI agents
- **Market Regime Detection**: Automatically identify market conditions and optimal strategies
- **Trader Following System**: Track and replicate top traders' signals
- **Enhanced Discovery Engine**: Find high-probability trading opportunities
- **Robust Monitoring**: Real-time alerts and portfolio tracking
- **Modern Next.js Frontend**: Clean, responsive UI with real-time data visualization
- **FastAPI Backend**: High-performance API with automatic documentation

## Architecture

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
├── data/ → backend/data/                # Symlink to data directory
├── docs/ → backend/docs/                # Symlink to docs directory
├── scripts/ → backend/scripts/          # Symlink to scripts directory
├── tests/ → backend/tests/              # Symlink to tests directory
├── deployment/ → backend/deployment/    # Symlink to deployment directory
├── run.py → backend/launchers/run.py    # Symlink to main launcher
└── setup.py → backend/setup/setup.py    # Symlink to setup script
```

<p align="center">
  <img src="assets/schema.png" style="width: 100%; height: auto;">
</p>

## Development

### Backend Development

```bash
# Start the backend in development mode
python run.py backend

# Access API documentation
# Visit http://localhost:8002/docs
```

The backend is built with FastAPI and includes:
- **Core Systems**: TradingAgents, Discovery Engine, Monitoring, Trader Following
- **API Endpoints**: RESTful endpoints for all platform features
- **Real-time Processing**: Live market data analysis and alerts

### Frontend Development

```bash
# Start the frontend in development mode
python run.py frontend

# Visit http://localhost:3002
```

The frontend is built with Next.js and includes:
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Real-time Updates**: Live data visualization
- **Multiple Views**: Dashboard, Opportunities, Traders, Analysis, and more

## Documentation

- **User Guides**: [docs/guides/](docs/guides/)
  - [Quick Start Guide](docs/guides/QUICK_START.md)
  - [Deployment Guide](docs/guides/DEPLOYMENT_GUIDE.md)
  - [Modern Interface Guide](docs/guides/MODERN_INTERFACE_GUIDE.md)

- **Technical Documentation**: [docs/](docs/)
  - [Project Structure](docs/PROJECT_STRUCTURE.md)
  - [Trading Education](docs/trading-education/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

> This platform is designed for research and educational purposes only. Trading performance may vary based on many factors including data quality, market conditions, and model configurations. It is not intended as financial, investment, or trading advice.

## Multi-Agent Architecture

The True North Trading Platform leverages a sophisticated multi-agent architecture for comprehensive market analysis:

### Core Components

- **Analyst Agents**: Technical, fundamental, news, and sentiment analysts work together to provide a complete market picture
- **Debate System**: Bull and bear researchers debate investment theses to identify strengths and weaknesses
- **Risk Management**: Specialized risk agents evaluate position sizing and portfolio impact
- **Trading Decision**: Final trading decisions synthesize all agent inputs

### Required APIs

For full functionality, the platform requires:

```bash
# Add to your .env file
OPENAI_API_KEY=your_key_here
ALPHA_VANTAGE_API_KEY=your_key_here  # For market data
```

## CLI Usage

The platform includes a command-line interface for quick access:

```bash
# Launch the CLI
python -m cli.main
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
