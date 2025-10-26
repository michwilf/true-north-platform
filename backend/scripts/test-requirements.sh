#!/bin/bash
# Test requirements-lock.txt locally to catch dependency conflicts before deploying

set -e

echo "🔍 Testing requirements-lock.txt for dependency conflicts..."
echo ""

# Use the same Python version as Digital Ocean (3.10)
docker run --rm -v "$(pwd)/backend/config:/app" python:3.10-slim bash -c "
    set -e
    cd /app && 
    echo '📦 Installing system dependencies...' &&
    apt-get update -qq && apt-get install -y -qq git > /dev/null 2>&1 &&
    echo '📦 Installing pip...' &&
    pip install --upgrade pip --quiet &&
    echo '🧪 Testing dependency resolution (this may take 2-3 minutes)...' &&
    echo '' &&
    pip install --dry-run -r requirements-lock.txt &&
    echo '' &&
    echo '✅ SUCCESS! All dependencies are compatible.'
"

if [ $? -eq 0 ]; then
    echo "✅ Requirements validation passed!"
    exit 0
else
    echo "❌ Requirements validation failed! Fix conflicts above before deploying."
    exit 1
fi

echo ""
echo "Test complete!"

