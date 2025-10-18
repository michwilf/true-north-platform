# True North Trading Platform - Project Structure

## 📁 Directory Organization

```
true-north-trading/
├── 📁 tradingagents/           # Core TradingAgents framework
│   ├── agents/                 # Trading agents (analyst, trader, risk)
│   ├── graph/                  # LangGraph workflow setup
│   ├── dataflows/              # Data processing pipelines
│   └── tools/                  # Trading tools and utilities
│
├── 📁 tests/                   # Comprehensive test suite
│   ├── unit/                   # Unit tests for individual components
│   ├── integration/            # Integration tests for workflows
│   ├── api/                    # External API integration tests
│   ├── models/                 # ML model and LLM tests
│   └── performance/            # Performance and load tests
│
├── 📁 scripts/                 # Utility and setup scripts
│   ├── setup/                  # Environment and model setup
│   ├── data/                   # Data collection and processing
│   └── analysis/               # Analysis and reporting scripts
│
├── 📁 examples/                # Example implementations and demos
│   ├── trading_platform_demo.py
│   └── main.py
│
├── 📁 config/                  # Configuration files
│   ├── requirements-enhanced.txt
│   └── trading_config.yaml
│
├── 📁 docs/                    # Documentation
│   ├── trading-education/      # Trading education materials
│   ├── api-docs/              # API documentation
│   └── user-guides/           # User guides and tutorials
│
├── 📁 data/                    # Data storage
│   ├── raw/                   # Raw market data
│   ├── processed/             # Processed data
│   └── cache/                 # Cached API responses
│
├── 📁 models/                  # Pre-trained models
│   ├── finbert/               # FinBERT sentiment model
│   ├── chronos/               # Chronos forecasting models
│   └── custom/                # Custom trained models
│
├── 📁 results/                 # Trading results and analysis
│   ├── backtests/             # Backtest results
│   ├── live-trades/           # Live trading logs
│   └── reports/               # Performance reports
│
├── 📁 logs/                    # Application logs
│   ├── trading.log
│   ├── api.log
│   └── errors.log
│
├── 📁 notebooks/               # Jupyter notebooks for research
│   ├── data-analysis/         # Data exploration notebooks
│   ├── model-development/     # Model development notebooks
│   └── strategy-research/     # Trading strategy research
│
├── 📁 tools/                   # Development and diagnostic tools
│   ├── diagnostics/           # System diagnostic tools
│   └── utilities/             # General utilities
│
├── 📄 .env                     # Environment variables (not in git)
├── 📄 .gitignore              # Git ignore rules
├── 📄 README.md               # Project overview
├── 📄 PROJECT_STRUCTURE.md    # This file
└── 📄 requirements.txt        # Core Python dependencies
```

## 🧪 Test Organization

### Unit Tests (`tests/unit/`)
- **Purpose**: Test individual components in isolation
- **Coverage**: TradingAgents components, data processing, utilities
- **Files**:
  - `test_trading_agents.py` - Core agent functionality
  - `test.py` - General utility tests

### Integration Tests (`tests/integration/`)
- **Purpose**: Test multi-component interactions
- **Coverage**: End-to-end workflows, API chains, data pipelines
- **Files**:
  - `test_trading_workflow.py` - Complete trading workflows
  - `test_setup.py` - System integration validation

### API Tests (`tests/api/`)
- **Purpose**: Test external API integrations
- **Coverage**: All external APIs (OpenAI, Alpha Vantage, Twitter, etc.)
- **Files**:
  - `test_all_apis.py` - Comprehensive API testing
  - `test_twitter_api.py` - Twitter API specific tests
  - `test_reddit_sentiment.py` - Reddit API tests

### Model Tests (`tests/models/`)
- **Purpose**: Test ML models and LLMs
- **Coverage**: FinBERT, Chronos, forecasting models
- **Files**:
  - `explore_finance_llms.py` - Finance LLM exploration and testing

### Performance Tests (`tests/performance/`)
- **Purpose**: Test system performance and scalability
- **Coverage**: Response times, memory usage, concurrent operations
- **Files**:
  - `test_benchmarks.py` - Performance benchmarking

## 🔧 Scripts Organization

### Setup Scripts (`scripts/setup/`)
- **Purpose**: Environment and system setup
- **Files**:
  - `download_models.py` - Download pre-trained models
  - `update_env_credentials.py` - Environment configuration
  - `setup.py` - System setup automation

### Data Scripts (`scripts/data/`)
- **Purpose**: Data collection and processing
- **Files**: (To be added as needed)

### Analysis Scripts (`scripts/analysis/`)
- **Purpose**: Analysis and reporting
- **Files**: (To be added as needed)

## 📚 Examples Organization

### Demo Applications (`examples/`)
- **Purpose**: Working examples and demonstrations
- **Files**:
  - `trading_platform_demo.py` - Complete platform demonstration
  - `main.py` - Main application entry point

## ⚙️ Configuration Organization

### Config Files (`config/`)
- **Purpose**: System configuration and dependencies
- **Files**:
  - `requirements-enhanced.txt` - Enhanced Python dependencies
  - `trading_config.yaml` - Trading platform configuration

## 🚀 Running Tests

### Run All Tests
```bash
python -m pytest tests/ -v
```

### Run Specific Test Categories
```bash
# Unit tests only
python -m pytest tests/unit/ -v

# Integration tests only
python -m pytest tests/integration/ -v

# API tests only
python -m pytest tests/api/ -v

# Performance tests only
python -m pytest tests/performance/ -v
```

### Run Individual Test Files
```bash
# Test specific functionality
python -m pytest tests/unit/test_trading_agents.py -v

# Test API integrations
python -m pytest tests/api/test_all_apis.py -v

# Run performance benchmarks
python -m pytest tests/performance/test_benchmarks.py -v
```

### Run Tests with Coverage
```bash
python -m pytest tests/ --cov=tradingagents --cov-report=html
```

## 📊 Test Coverage Goals

- **Unit Tests**: 90%+ coverage of core components
- **Integration Tests**: All major workflows covered
- **API Tests**: All external APIs tested
- **Performance Tests**: Key performance metrics benchmarked

## 🔍 Development Workflow

1. **Development**: Write code in appropriate directories
2. **Testing**: Add tests in corresponding test directories
3. **Integration**: Run integration tests to verify workflows
4. **Performance**: Run performance tests to ensure scalability
5. **Documentation**: Update docs as needed

## 📝 File Naming Conventions

- **Test files**: `test_*.py`
- **Script files**: `snake_case.py`
- **Config files**: `kebab-case.yaml` or `snake_case.txt`
- **Documentation**: `UPPERCASE.md` for important docs, `lowercase.md` for guides

## 🎯 Key Benefits of This Structure

1. **Separation of Concerns**: Clear boundaries between components
2. **Comprehensive Testing**: Multiple test types ensure reliability
3. **Easy Navigation**: Logical organization makes finding files easy
4. **Scalability**: Structure supports growth and new features
5. **Maintainability**: Clear organization aids long-term maintenance
