# DigitalOcean Deployment Guide

## 🚀 Quick Deploy to DigitalOcean

This guide walks you through deploying True North Trading to DigitalOcean using Docker containers.

---

## Prerequisites

- ✅ DigitalOcean account
- ✅ doctl CLI installed (`brew install doctl`)
- ✅ Docker installed locally
- ✅ API keys (OpenAI, Alpha Vantage)

---

## Step 1: Authenticate with DigitalOcean

```bash
# Already done!
doctl auth init --access-token YOUR_TOKEN
doctl auth list
```

---

## Step 2: Create Container Registry

```bash
# Create a container registry
doctl registry create truenorth-trading --subscription-tier basic

# Login to registry
doctl registry login
```

---

## Step 3: Build and Push Docker Images

```bash
# Build backend image
docker build -t truenorth-backend:latest -f Dockerfile.backend .

# Build worker image
docker build -t truenorth-worker:latest -f Dockerfile.worker .

# Tag for registry
docker tag truenorth-backend:latest registry.digitalocean.com/truenorth-trading/backend:latest
docker tag truenorth-worker:latest registry.digitalocean.com/truenorth-trading/worker:latest

# Push to registry
docker push registry.digitalocean.com/truenorth-trading/backend:latest
docker push registry.digitalocean.com/truenorth-trading/worker:latest
```

---

## Step 4: Create DigitalOcean App

### Option A: Using App Platform (Recommended)

Create `digitalocean-app.yaml`:

```yaml
name: truenorth-trading
region: nyc
services:
  - name: backend
    image:
      registry_type: DOCR
      registry: truenorth-trading
      repository: backend
      tag: latest
    instance_count: 1
    instance_size_slug: professional-xs  # $12/month
    http_port: 8002
    health_check:
      http_path: /health
    envs:
      - key: OPENAI_API_KEY
        scope: RUN_TIME
        type: SECRET
      - key: ALPHA_VANTAGE_API_KEY
        scope: RUN_TIME
        type: SECRET
    routes:
      - path: /api
  
  - name: worker
    image:
      registry_type: DOCR
      registry: truenorth-trading
      repository: worker
      tag: latest
    instance_count: 1
    instance_size_slug: basic-xxs  # $5/month
    envs:
      - key: OPENAI_API_KEY
        scope: RUN_TIME
        type: SECRET
      - key: ALPHA_VANTAGE_API_KEY
        scope: RUN_TIME
        type: SECRET
```

Deploy:
```bash
doctl apps create --spec digitalocean-app.yaml
```

### Option B: Using Droplet + Docker

```bash
# Create droplet
doctl compute droplet create truenorth-trading \
  --image docker-20-04 \
  --size s-2vcpu-4gb \
  --region nyc1 \
  --ssh-keys YOUR_SSH_KEY_ID

# SSH into droplet
doctl compute ssh truenorth-trading

# On droplet, pull and run containers
docker login registry.digitalocean.com
docker-compose up -d
```

---

## Step 5: Set Environment Variables

```bash
# Get app ID
doctl apps list

# Set secrets
doctl apps update YOUR_APP_ID --spec digitalocean-app.yaml
```

Or via web UI:
1. Go to Apps → truenorth-trading
2. Settings → App-Level Environment Variables
3. Add:
   - `OPENAI_API_KEY`
   - `ALPHA_VANTAGE_API_KEY`
   - (Optional) Twitter/Reddit credentials

---

## Step 6: Configure Databases (Optional)

For persistent storage:

```bash
# Create managed database
doctl databases create truenorth-db \
  --engine pg \
  --region nyc1 \
  --size db-s-1vcpu-1gb

# Get connection string
doctl databases connection truenorth-db

# Add to app environment
doctl apps update YOUR_APP_ID --env DATABASE_URL=postgresql://...
```

---

## Step 7: Monitor Deployment

```bash
# View app info
doctl apps get YOUR_APP_ID

# View logs
doctl apps logs YOUR_APP_ID --type run

# Check health
curl https://your-app.ondigitalocean.app/health
```

---

## 📊 Architecture

```
┌─────────────────────────────────────────┐
│         DigitalOcean App Platform        │
├─────────────────────────────────────────┤
│                                          │
│  ┌──────────────┐    ┌───────────────┐  │
│  │   Backend    │    │    Worker     │  │
│  │   Container  │    │   Container   │  │
│  │              │    │               │  │
│  │  Port: 8002  │    │  Scheduled    │  │
│  │  FastAPI     │    │  Tasks        │  │
│  └──────────────┘    └───────────────┘  │
│         │                    │           │
│         └────────┬───────────┘           │
│                  │                       │
│         ┌────────▼────────┐              │
│         │   Shared Volume │              │
│         │   (Data + Logs) │              │
│         └─────────────────┘              │
│                                          │
└─────────────────────────────────────────┘
                   │
                   │  API Calls
                   ▼
         External Services:
         - OpenAI API
         - Alpha Vantage
         - Twitter/Reddit
```

---

## 💰 Cost Estimate

### App Platform (Recommended)
- Backend (professional-xs): $12/month
- Worker (basic-xxs): $5/month
- Container Registry: $5/month
- **Total: ~$22/month**

### Droplet Option
- Droplet (2 vCPU, 4GB): $24/month
- Container Registry: $5/month
- **Total: ~$29/month**

---

## 🔄 Scheduled Tasks

The worker container runs these tasks automatically:

| Task | Frequency | Description |
|------|-----------|-------------|
| Discovery | Every 4 hours | Find new trading opportunities |
| Trader Sync | Every 2 hours | Update trader signals |
| Portfolio Update | Every 30 minutes | Refresh portfolio metrics |
| Alert Check | Every 15 minutes | Check for new alerts |
| Heartbeat | Every 5 minutes | Health monitoring |

---

## 🔧 Updating Your App

```bash
# Build new images
docker build -t truenorth-backend:latest -f Dockerfile.backend .
docker build -t truenorth-worker:latest -f Dockerfile.worker .

# Tag and push
docker tag truenorth-backend:latest registry.digitalocean.com/truenorth-trading/backend:latest
docker tag truenorth-worker:latest registry.digitalocean.com/truenorth-trading/worker:latest
docker push registry.digitalocean.com/truenorth-trading/backend:latest
docker push registry.digitalocean.com/truenorth-trading/worker:latest

# Trigger redeployment
doctl apps create-deployment YOUR_APP_ID
```

---

## 📝 Environment Variables Required

### Required
- `OPENAI_API_KEY` - For AI analysis
- `ALPHA_VANTAGE_API_KEY` - For market data

### Optional
- `TWITTER_BEARER_TOKEN` - For Twitter trader tracking
- `REDDIT_CLIENT_ID` - For Reddit trader tracking
- `REDDIT_CLIENT_SECRET` - For Reddit trader tracking
- `REDDIT_USER_AGENT` - For Reddit trader tracking

---

## 🐛 Troubleshooting

### Check logs
```bash
doctl apps logs YOUR_APP_ID --type run --follow
```

### Check health
```bash
curl https://your-app.ondigitalocean.app/health
```

### Restart app
```bash
doctl apps create-deployment YOUR_APP_ID
```

### Check container registry
```bash
doctl registry repository list truenorth-trading
```

---

## 🔒 Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use DigitalOcean secrets for API keys
3. ✅ Enable firewall on droplets
4. ✅ Use HTTPS (automatically configured in App Platform)
5. ✅ Rotate API keys regularly
6. ✅ Monitor logs for suspicious activity

---

## 📚 Additional Resources

- [DigitalOcean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Container Registry Docs](https://docs.digitalocean.com/products/container-registry/)
- [doctl Reference](https://docs.digitalocean.com/reference/doctl/)

---

**Deployment Ready!** 🚀

