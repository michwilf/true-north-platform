# Quick Deploy to DigitalOcean (No Docker Build Required!)

## 🚀 Fastest Way to Deploy

DigitalOcean App Platform will build the Docker images for you in the cloud. You don't need to build locally!

---

## Step 1: Push Code to GitHub

```bash
cd /Users/MikeyW/true-north-trading

# Add all files
git add .

# Commit
git commit -m "Ready for DigitalOcean deployment"

# Push to GitHub
git push origin main
```

---

## Step 2: Update App Config

Edit `.do/app.yaml` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

---

## Step 3: Deploy Using Web Interface (EASIEST!)

1. **Go to DigitalOcean**: https://cloud.digitalocean.com/apps

2. **Click "Create App"**

3. **Connect GitHub**:
   - Choose your `true-north-trading` repository
   - Select `main` branch
   - DigitalOcean will auto-detect the Dockerfiles

4. **Configure Services**:
   - **Backend Service**:
     - Name: `backend`
     - Dockerfile: `Dockerfile.backend`
     - HTTP Port: `8002`
     - Health Check: `/health`
     - Instance Size: Professional XS ($12/mo)
   
   - **Worker Service**:
     - Name: `worker`
     - Dockerfile: `Dockerfile.worker`
     - Instance Size: Basic XXS ($5/mo)

5. **Add Environment Variables**:
   Click "Edit" next to each service and add:
   ```
   OPENAI_API_KEY = your_openai_key
   ALPHA_VANTAGE_API_KEY = your_alpha_vantage_key
   PYTHONUNBUFFERED = 1
   PYTHONPATH = /app
   ```
   
   Mark `OPENAI_API_KEY` and `ALPHA_VANTAGE_API_KEY` as **encrypted**.

6. **Review and Create**:
   - Review settings
   - Click "Create Resources"
   - DigitalOcean will build and deploy!

---

## Step 4: Monitor Deployment

Watch the build logs in the DigitalOcean dashboard. It takes about 5-10 minutes.

Once deployed, you'll get a URL like:
```
https://backend-xxxxx.ondigitalocean.app
```

Test it:
```bash
curl https://backend-xxxxx.ondigitalocean.app/health
```

---

## Alternative: Deploy via CLI

If you prefer command line:

```bash
# Make sure you're in the project directory
cd /Users/MikeyW/true-north-trading

# Update .do/app.yaml with your GitHub repo

# Deploy
./deploy.sh
```

---

## What Gets Deployed?

### Backend Service (Always Running)
- FastAPI backend on port 8002
- Serves all API endpoints
- Health check at `/health`
- **Cost: $12/month**

### Worker Service (Always Running)
- Scheduled tasks run automatically:
  - Discovery: Every 4 hours
  - Trader Sync: Every 2 hours  
  - Portfolio Update: Every 30 minutes
  - Alert Check: Every 15 minutes
- **Cost: $5/month**

### Container Registry
- Stores your Docker images
- **Cost: $5/month**

**Total: ~$22/month**

---

## Accessing Your App

### API Endpoints
```bash
# Base URL (you'll get this after deployment)
BASE_URL="https://backend-xxxxx.ondigitalocean.app"

# Health check
curl $BASE_URL/health

# Market regime
curl $BASE_URL/api/market-regime

# Opportunities
curl $BASE_URL/api/opportunities

# Portfolio
curl $BASE_URL/api/portfolio-metrics
```

### View Logs
```bash
# Get app ID
doctl apps list

# View logs
doctl apps logs YOUR_APP_ID --type run --follow
```

---

## Updating Your App

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```
3. DigitalOcean auto-deploys! (if you enabled auto-deploy)

Or manually trigger:
```bash
doctl apps create-deployment YOUR_APP_ID
```

---

## Troubleshooting

### Build Failed?
- Check logs in DigitalOcean dashboard
- Make sure all environment variables are set
- Verify Dockerfiles are correct

### Backend Not Responding?
```bash
# Check health
curl https://your-app-url/health

# View logs
doctl apps logs YOUR_APP_ID --type run
```

### Need to Change Environment Variables?
1. Go to DigitalOcean dashboard
2. Select your app
3. Settings → Environment Variables
4. Add/edit variables
5. Click "Save" (triggers redeploy)

---

## 🎉 That's It!

Your True North Trading platform is now:
- ✅ Running 24/7 on DigitalOcean
- ✅ Auto-discovering opportunities every 4 hours
- ✅ Syncing traders every 2 hours
- ✅ Updating portfolio every 30 minutes
- ✅ Checking alerts every 15 minutes

**No need to keep your computer running!**

---

## Next Steps

1. **Add a Custom Domain** (optional):
   - DigitalOcean Settings → Domains
   - Point your domain to the app

2. **Set Up Monitoring**:
   - DigitalOcean has built-in monitoring
   - View metrics in the dashboard

3. **Scale if Needed**:
   - Increase instance sizes
   - Add more instances
   - All in the DigitalOcean dashboard

---

**Questions?** Check the full guide: `DEPLOYMENT_GUIDE.md`

