# 🚀 Deploy Your App NOW!

Your code is ready and pushed to GitHub! Follow these steps:

---

## ✅ Step 1: Go to DigitalOcean App Platform

**Click here:** https://cloud.digitalocean.com/apps

(You're already authenticated with your API key)

---

## ✅ Step 2: Create New App

1. Click the blue **"Create App"** button
2. Choose **"GitHub"** as your source
3. Authorize DigitalOcean to access your GitHub (if not already done)
4. Select repository: **`michwilf/true-north-platform`**
5. Branch: **`main`**
6. Check ✅ **"Autodeploy"** (so it updates when you push code)
7. Click **"Next"**

---

## ✅ Step 3: Configure Resources

DigitalOcean will auto-detect your Dockerfiles. You should see 2 services:

### Backend Service
- **Name**: `backend`
- **Resource Type**: Web Service
- **Dockerfile Path**: Click "Edit" → Set to `/Dockerfile.backend`
- **HTTP Port**: `8002`
- **Health Check Path**: `/health`
- **Instance Size**: Professional-XS ($12/month)
- **Instance Count**: 1

Click ✅ to save

### Worker Service  
- **Name**: `worker`
- **Resource Type**: Worker (not web service!)
- **Dockerfile Path**: Click "Edit" → Set to `/Dockerfile.worker`
- **Instance Size**: Basic-XXS ($5/month)
- **Instance Count**: 1

Click ✅ to save

---

## ✅ Step 4: Add Environment Variables

**CRITICAL**: Click on each service and add these environment variables:

### For BOTH backend AND worker:

**Required:**
```
OPENAI_API_KEY = your_openai_api_key_here
ALPHA_VANTAGE_API_KEY = your_alpha_vantage_key_here
```

**Additional (recommended):**
```
PYTHONUNBUFFERED = 1
PYTHONPATH = /app
```

**⚠️ IMPORTANT**: Mark `OPENAI_API_KEY` and `ALPHA_VANTAGE_API_KEY` as **encrypted** (click the 🔒 icon)

---

## ✅ Step 5: Review and Launch

1. Review the settings
2. You'll see cost estimate: **~$22/month**
   - Backend: $12/month
   - Worker: $5/month
   - Container Registry: $5/month

3. Click **"Create Resources"**

4. DigitalOcean will now:
   - ✅ Clone your GitHub repo
   - ✅ Build Docker images
   - ✅ Deploy containers
   - ✅ Start running your app

**Build time: 5-10 minutes** ⏱️

---

## ✅ Step 6: Monitor Deployment

Watch the build logs in the DigitalOcean dashboard.

You'll see progress:
- 📦 Cloning repository...
- 🔨 Building backend image...
- 🔨 Building worker image...
- 🚀 Deploying...
- ✅ Live!

---

## ✅ Step 7: Get Your URL

Once deployed, you'll get a URL like:
```
https://backend-xxxxx.ondigitalocean.app
```

**Test it:**
```bash
curl https://backend-xxxxx.ondigitalocean.app/health
```

You should see:
```json
{
  "status": "healthy",
  "systems": {
    "discovery_engine": true,
    "monitoring_system": true,
    "trader_system": true,
    "portfolio_tracker": true,
    "trading_agents": true,
    "cache_manager": true
  }
}
```

---

## 🎉 That's It!

Your True North Trading platform is now running 24/7 with:

### Backend (Always Running)
- ✅ API at `https://your-app.ondigitalocean.app`
- ✅ All endpoints working
- ✅ AI analysis available

### Worker (Always Running in Background)
- ✅ Discovery runs every 4 hours
- ✅ Trader sync runs every 2 hours
- ✅ Portfolio updates every 30 minutes
- ✅ Alert checks every 15 minutes

**No need to keep your computer on!**

---

## 📊 Available Endpoints

Try these:
```bash
BASE_URL="https://your-app-url.ondigitalocean.app"

# Health check
curl $BASE_URL/health

# Market regime
curl $BASE_URL/api/market-regime

# Opportunities
curl $BASE_URL/api/opportunities

# Trader signals
curl $BASE_URL/api/trader-signals

# Portfolio metrics
curl $BASE_URL/api/portfolio-metrics

# Analyze a stock (POST)
curl -X POST $BASE_URL/api/analyze-stock/AAPL
```

---

## 🔧 View Logs

In DigitalOcean dashboard:
1. Click on your app
2. Go to "Runtime Logs"
3. Select service (backend or worker)
4. Watch live logs!

Or via CLI:
```bash
# Get app ID
doctl apps list

# View logs
doctl apps logs YOUR_APP_ID --type run --follow
```

---

## 🔄 Updating Your App

Just push to GitHub:
```bash
git add .
git commit -m "Updated feature"
git push origin main
```

DigitalOcean auto-deploys! 🚀

---

## 💰 Cost Breakdown

- **Backend Service**: $12/month (Professional-XS)
- **Worker Service**: $5/month (Basic-XXS)
- **Container Registry**: $5/month
- **Total**: **$22/month**

---

## 🆘 Troubleshooting

### Build Failed?
- Check environment variables are set correctly
- Look at build logs in dashboard
- Verify Dockerfiles are in root of repo

### Health Check Failing?
- Wait 2-3 minutes for app to fully start
- Check if environment variables are set
- View runtime logs for errors

### Worker Not Running?
- Check logs in DigitalOcean dashboard
- Verify it's set as "Worker" (not "Web Service")
- Check environment variables are set

---

## 📞 Need Help?

- DigitalOcean Docs: https://docs.digitalocean.com/products/app-platform/
- View your app: https://cloud.digitalocean.com/apps
- Check logs: Dashboard → Your App → Runtime Logs

---

## ✅ You're Ready!

**Your GitHub repo**: https://github.com/michwilf/true-north-platform

**Next step**: Follow Step 1 above and create your app!

🚀 **GO DEPLOY!** 🚀

