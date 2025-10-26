#!/bin/bash

# True North Trading - DigitalOcean Deployment Script
# This script deploys the app to DigitalOcean App Platform

set -e

echo "🚀 TRUE NORTH TRADING - DEPLOYMENT"
echo "===================================="
echo ""

# Check if doctl is authenticated
if ! doctl auth list &> /dev/null; then
    echo "❌ Not authenticated with DigitalOcean"
    echo "   Run: doctl auth init"
    exit 1
fi

echo "✅ Authenticated with DigitalOcean"
echo ""

# Check if app already exists
APP_NAME="truenorth-trading"
APP_ID=$(doctl apps list --format ID,Spec.Name --no-header | grep "$APP_NAME" | awk '{print $1}' || echo "")

if [ -z "$APP_ID" ]; then
    echo "📦 Creating new app..."
    echo ""
    echo "⚠️  IMPORTANT: Before running this, you need to:"
    echo "   1. Push your code to GitHub"
    echo "   2. Update .do/app.yaml with your GitHub repo details"
    echo "   3. Set your API keys as secrets in DigitalOcean"
    echo ""
    read -p "Have you done the above? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Please complete the prerequisites first"
        exit 1
    fi
    
    echo "Creating app from spec..."
    doctl apps create --spec .do/app.yaml
    
    echo ""
    echo "✅ App created!"
    echo "   View it at: https://cloud.digitalocean.com/apps"
    
else
    echo "📦 App already exists (ID: $APP_ID)"
    echo "   Updating app..."
    
    doctl apps update $APP_ID --spec .do/app.yaml
    
    echo ""
    echo "✅ App updated!"
    echo "   Creating new deployment..."
    
    doctl apps create-deployment $APP_ID
    
    echo ""
    echo "✅ Deployment triggered!"
fi

echo ""
echo "🔗 Useful commands:"
echo "   View app info:  doctl apps get $APP_ID"
echo "   View logs:      doctl apps logs $APP_ID --type run --follow"
echo "   List apps:      doctl apps list"
echo ""
echo "📊 Monitor deployment:"
echo "   https://cloud.digitalocean.com/apps/$APP_ID"
echo ""
echo "🎉 Deployment complete!"

