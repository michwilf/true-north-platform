# Frontend Deployment Note

## Current Setup

Right now we're deploying:
1. **Backend** - FastAPI service (port 8002)
2. **Worker** - Scheduled tasks

The **frontend is NOT deployed yet** to DigitalOcean.

## Why?

The frontend build requires the backend URL, which we only get AFTER the backend is deployed.

## Next Steps (After Backend Deploys)

### Option 1: Deploy Frontend Separately (Recommended)

1. **Get Backend URL** from DigitalOcean:
   ```
   https://backend-xxxxx.ondigitalocean.app
   ```

2. **Deploy Frontend to Vercel** (Free & Easy):
   ```bash
   cd frontend
   npm install -g vercel
   vercel
   ```
   
   When asked for environment variables, add:
   ```
   NEXT_PUBLIC_API_URL=https://backend-xxxxx.ondigitalocean.app
   ```

3. **Or Deploy Frontend to DigitalOcean Static Site**:
   - Build locally with backend URL
   - Upload to DO Static Site
   - Cost: $0/month (free tier)

### Option 2: Deploy Frontend with Backend

Update `Dockerfile` to include frontend and use the full multi-stage build:

``yaml
# In .do/app.yaml, use Dockerfile instead of Dockerfile.backend
dockerfile_path: /Dockerfile
```

Then set environment variable:
```yaml
envs:
  - key: NEXT_PUBLIC_API_URL
    value: "https://backend-xxxxx.ondigitalocean.app"
```

## Current Status

✅ Backend deploying (backend + worker)
⏳ Frontend runs locally
📋 Frontend deployment pending backend URL

## For Now

**Access the API directly:**
```bash
curl https://your-backend-url/health
curl https://your-backend-url/api/opportunities
```

**Or run frontend locally pointing to deployed backend:**
```bash
cd frontend
NEXT_PUBLIC_API_URL=https://your-backend-url npm run dev
```

---

**Recommendation**: Deploy frontend to Vercel (it's designed for Next.js and has a free tier!)

