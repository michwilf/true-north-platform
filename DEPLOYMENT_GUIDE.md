# 🚀 True North Trading Platform - Deployment Guide

## 📊 Recommended Running Frequencies

### Optimal Schedule (What the scheduler does):

| Component | Frequency | Timing | Reason |
|-----------|-----------|--------|--------|
| **Monitoring System** | Every 5 minutes | Market hours only | Real-time price movements and alerts |
| **Discovery Engine** | Every 4 hours | Market hours only | New opportunities don't emerge constantly |
| **Trader Following** | Every 15 minutes | Market hours only | Social media signals are time-sensitive |
| **Backtesting** | Once daily | 6:00 PM ET | Heavy computation, after market close |
| **Risk Analysis** | Every hour | 24/7 | Portfolio risk monitoring |
| **Stats Backup** | Every 30 minutes | 24/7 | Data persistence |

### Why These Frequencies?

✅ **5 min Monitoring** - Catches breakouts and alerts without overloading APIs  
✅ **4 hour Discovery** - Balances opportunity freshness with API costs  
✅ **15 min Trader Signals** - Social signals stay relevant for 15-30 minutes  
✅ **Daily Backtesting** - Resource-intensive, doesn't need real-time updates  
✅ **Market Hours Only** - Saves resources, avoids stale data outside trading hours  

---

## 🎯 Deployment Options

### Option 1: Simple Background Process (Easiest)

**Best for:** Development, testing, personal use on your Mac

```bash
# Install scheduler dependency
pip install schedule

# Run in background
nohup python trading_scheduler.py > logs/scheduler.log 2>&1 &

# Check if running
ps aux | grep trading_scheduler

# Stop
pkill -f trading_scheduler.py
```

**Pros:** ✅ Simple, ✅ No setup  
**Cons:** ❌ Stops on reboot, ❌ Manual management

---

### Option 2: systemd Service (Recommended for Linux)

**Best for:** Production on Linux servers, VPS, AWS EC2

#### Setup:

```bash
# 1. Edit the service file
nano deployment/systemd/trading-platform.service

# 2. Update paths and username
# Change /Users/MikeyW/true-north-trading to your path
# Change your_username to your actual username

# 3. Copy service file
sudo cp deployment/systemd/trading-platform.service /etc/systemd/system/

# 4. Reload systemd
sudo systemctl daemon-reload

# 5. Enable service (start on boot)
sudo systemctl enable trading-platform

# 6. Start service
sudo systemctl start trading-platform

# 7. Check status
sudo systemctl status trading-platform

# 8. View logs
sudo journalctl -u trading-platform -f
```

#### Management:

```bash
# Start
sudo systemctl start trading-platform

# Stop
sudo systemctl stop trading-platform

# Restart
sudo systemctl restart trading-platform

# View logs
sudo journalctl -u trading-platform -n 100

# Follow logs
sudo journalctl -u trading-platform -f
```

**Pros:** ✅ Auto-start on reboot, ✅ Automatic restart on crash, ✅ System logging  
**Cons:** ❌ Linux only, ❌ Requires sudo access

---

### Option 3: Docker (Best for Production)

**Best for:** Cloud deployment, scalability, isolation

#### Quick Start:

```bash
# Build and start everything
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Restart
docker-compose restart
```

#### Individual Services:

```bash
# Start only scheduler
docker-compose up -d scheduler

# Start only dashboard
docker-compose up -d dashboard

# Check status
docker-compose ps

# View scheduler logs
docker-compose logs -f scheduler

# View dashboard logs
docker-compose logs -f dashboard
```

#### Management:

```bash
# Update and restart
docker-compose down
docker-compose build
docker-compose up -d

# View resource usage
docker stats

# Clean up
docker-compose down -v  # Remove volumes too
```

**Pros:** ✅ Portable, ✅ Isolated, ✅ Easy scaling, ✅ Works everywhere  
**Cons:** ❌ Requires Docker knowledge

---

### Option 4: Cloud Deployment (Production Scale)

#### AWS EC2:

```bash
# 1. Launch EC2 instance (t2.medium or larger)
# 2. SSH into instance
ssh -i your-key.pem ubuntu@your-instance-ip

# 3. Clone repository
git clone your-repo-url
cd true-north-trading

# 4. Install dependencies
pip install -r requirements.txt
pip install schedule

# 5. Set up systemd service (see Option 2)
# OR use Docker (see Option 3)

# 6. Configure security group
# Open port 8501 for Streamlit dashboard

# 7. Access dashboard
http://your-instance-ip:8501
```

**Cost:** ~$30-50/month (t2.medium)

#### DigitalOcean Droplet:

```bash
# 1. Create droplet (Basic plan, 2GB RAM)
# 2. Follow same steps as AWS EC2
```

**Cost:** ~$12-24/month

#### Google Cloud Run (Serverless):

```bash
# 1. Build container
docker build -t gcr.io/YOUR-PROJECT/trading-platform .

# 2. Push to GCR
docker push gcr.io/YOUR-PROJECT/trading-platform

# 3. Deploy
gcloud run deploy trading-platform \
  --image gcr.io/YOUR-PROJECT/trading-platform \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Cost:** Pay per use, ~$5-15/month

---

### Option 5: macOS LaunchAgent (For Your Mac)

**Best for:** Running on your Mac 24/7

#### Setup:

```bash
# 1. Create launchd plist
nano ~/Library/LaunchAgents/com.truenorth.trading.plist
```

Add:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.truenorth.trading</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/python3</string>
        <string>/Users/MikeyW/true-north-trading/trading_scheduler.py</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/Users/MikeyW/true-north-trading</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/Users/MikeyW/true-north-trading/logs/launchd.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/MikeyW/true-north-trading/logs/launchd-error.log</string>
</dict>
</plist>
```

```bash
# 2. Load service
launchctl load ~/Library/LaunchAgents/com.truenorth.trading.plist

# 3. Check status
launchctl list | grep truenorth

# 4. Unload (stop)
launchctl unload ~/Library/LaunchAgents/com.truenorth.trading.plist
```

**Pros:** ✅ Native Mac integration, ✅ Auto-start  
**Cons:** ❌ Mac must stay on

---

## 🎮 Running Both Scheduler + Dashboard

### Local Development:

```bash
# Terminal 1: Scheduler
python trading_scheduler.py

# Terminal 2: Dashboard
streamlit run streamlit_dashboard.py
```

### Docker (Recommended):

```bash
# Both at once
docker-compose up -d

# Access dashboard at http://localhost:8501
```

### Separate Processes:

```bash
# Start scheduler in background
nohup python trading_scheduler.py > logs/scheduler.log 2>&1 &

# Start dashboard (visible)
streamlit run streamlit_dashboard.py

# Or dashboard in background too
nohup streamlit run streamlit_dashboard.py > logs/dashboard.log 2>&1 &
```

---

## 📊 Monitoring & Logs

### Check Scheduler Status:

```bash
# View real-time logs
tail -f logs/trading_scheduler.log

# View stats
cat data/scheduler_stats.json

# Check latest opportunities
cat data/latest_opportunities.json

# Check latest signals
cat data/latest_signals.json
```

### Dashboard Access:

- **Local:** http://localhost:8501
- **Network:** http://YOUR_IP:8501
- **Cloud:** http://YOUR_SERVER_IP:8501

---

## 🔒 Security Recommendations

### API Keys:

```bash
# Use environment variables
export OPENAI_API_KEY="your-key"
export ALPHA_VANTAGE_API_KEY="your-key"

# Or use .env file
cp .env.example .env
nano .env  # Add your keys
```

### Dashboard Security:

```bash
# Add authentication to Streamlit
streamlit run streamlit_dashboard.py --server.enableCORS=false --server.enableXsrfProtection=true
```

### Firewall:

```bash
# Only allow specific IPs
sudo ufw allow from YOUR_IP to any port 8501
```

---

## 💰 Cost Estimates

### Running Locally (Your Mac):
- **Cost:** $0 (electricity only)
- **Pros:** Free, full control
- **Cons:** Must keep computer on

### Cloud VPS (DigitalOcean/AWS):
- **Cost:** $12-50/month depending on size
- **Pros:** 24/7 uptime, professional
- **Cons:** Monthly fee

### Serverless (Cloud Run):
- **Cost:** $5-15/month (pay per use)
- **Pros:** Auto-scaling, cheap
- **Cons:** More complex setup

---

## 🚀 Quick Start Commands

### Development:
```bash
python trading_scheduler.py
```

### Production (Docker):
```bash
docker-compose up -d
```

### Production (systemd):
```bash
sudo systemctl start trading-platform
```

### Access Dashboard:
```bash
open http://localhost:8501
```

---

## 📈 Performance Tips

1. **Use Redis for caching** - Speed up repeated API calls
2. **Database for data** - Use PostgreSQL instead of JSON files
3. **Multiple workers** - Run multiple monitoring instances
4. **Queue system** - Use Celery for task management
5. **Load balancer** - Nginx in front of Streamlit

---

## 🐛 Troubleshooting

### Scheduler not running:
```bash
ps aux | grep trading_scheduler
tail -f logs/trading_scheduler.log
```

### Dashboard won't start:
```bash
lsof -ti:8501 | xargs kill
streamlit run streamlit_dashboard.py
```

### High CPU usage:
- Increase monitoring interval to 10 minutes
- Run discovery every 6 hours instead of 4
- Disable backtesting if not needed

---

## ✅ Recommended Setup

**For Personal Use:**
- Run scheduler locally with nohup
- Access dashboard on localhost
- Cost: $0

**For Professional Use:**
- Docker Compose on DigitalOcean droplet ($12/mo)
- Both scheduler and dashboard running 24/7
- Public dashboard access

**For Maximum Reliability:**
- AWS EC2 with systemd
- Auto-scaling with load balancer
- Database for persistence
- Cost: $50-100/mo

---

**Need help? Check the logs in `logs/trading_scheduler.log`**

