# 🌐 True North Trading Platform - Dashboard Guide

## 🚀 Quick Start

Your trading dashboard is now running! Access it here:

**Dashboard URL:** http://localhost:8501

## 📊 Dashboard Features

### 🏠 Dashboard (Home)
- **Real-time Platform Status** - See all system components
- **Market Regime Analysis** - Current market conditions and trends
- **Recent Alerts** - Latest market alerts and notifications
- **Platform Capabilities Overview** - All features at a glance

### 🔍 Opportunities
- **Run Discovery Engine** - Find new investment opportunities
- **Filter by Confidence** - Set minimum confidence threshold
- **Filter by Risk Level** - Choose LOW, MEDIUM, or HIGH risk
- **Detailed Opportunity Cards** - See prices, scores, entry/exit points

### 📊 Monitoring
- **Run Monitoring Cycle** - Check markets for alerts
- **Alert Summary** - 24-hour alert statistics
- **Alert Visualization** - Pie charts showing alert distribution
- **Recent Alerts Feed** - Detailed alert information

### 📈 Backtesting
- **Select Strategy** - MA Crossover, RSI, Momentum, Breakout
- **Choose Symbols** - Test on multiple stocks
- **Set Date Range** - Custom backtesting period
- **View Results** - Performance metrics and equity curves

### 👥 Trader Following
- **Recent Signals** - Latest signals from followed traders
- **Signal Details** - Confidence, conviction, reasoning
- **Trader Performance** - Track success rates

### ⚖️ Risk Management
- **Portfolio Composition** - Visual breakdown
- **Risk Metrics** - Beta, volatility, VaR, Sharpe ratio
- **Stress Tests** - Scenario analysis

## 🎮 How to Use

1. **Start Here:** Click "🚀 Run Discovery" in the sidebar to find opportunities
2. **Monitor Markets:** Click "📊 Monitor Markets" to check for alerts
3. **Navigate:** Use the radio buttons in the sidebar to switch between views
4. **Refresh:** Click "🔄 Refresh Data" anytime to update the display

## 🎨 Features

✅ **Beautiful Modern UI** - Professional trading interface  
✅ **Real-time Updates** - Live market data and alerts  
✅ **Interactive Charts** - Plotly visualizations  
✅ **Responsive Design** - Works on any screen size  
✅ **Easy Navigation** - Intuitive sidebar menu  
✅ **Dark/Light Mode** - Use Streamlit's built-in theme switcher  

## 🛠️ Commands

### Start Dashboard
```bash
cd /Users/MikeyW/true-north-trading
streamlit run streamlit_dashboard.py
```

### Stop Dashboard
Press `Ctrl+C` in the terminal

### Restart Dashboard
```bash
streamlit run streamlit_dashboard.py --server.headless=true
```

## 📱 Mobile Access

To access from other devices on your network:
```bash
streamlit run streamlit_dashboard.py --server.address=0.0.0.0
```

Then visit: http://YOUR_IP:8501

## 🎯 Pro Tips

1. **Keep it Running:** The dashboard runs in the background - keep the terminal open
2. **Auto-refresh:** Streamlit auto-reloads when you change the code
3. **Keyboard Shortcuts:** Use `Ctrl+R` to rerun the app
4. **Settings:** Click the hamburger menu (☰) for additional options
5. **Theme:** Go to Settings → Theme to customize colors

## 🐛 Troubleshooting

**Dashboard won't load?**
- Check if port 8501 is available
- Try: `lsof -ti:8501 | xargs kill` then restart

**Data not showing?**
- Click the refresh or action buttons
- Check if platform components initialized successfully

**Performance slow?**
- Close unused tabs
- Clear browser cache
- Restart the dashboard

## 🚀 Next Steps

1. ✅ Dashboard is running at http://localhost:8501
2. 🔍 Run Discovery to find opportunities
3. 📊 Monitor markets for alerts
4. 📈 Backtest your strategies
5. 👥 Follow top traders
6. ⚖️ Manage portfolio risk

---

**Enjoy your professional trading dashboard! 📈💰**

