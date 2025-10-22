#!/bin/bash
# Generate a clean requirements-lock.txt with all dependencies properly resolved

set -e

echo "🔧 Generating clean requirements-lock.txt from requirements.txt..."
echo ""

# Use the same Python version as Digital Ocean (3.10)
docker run --rm -v "$(pwd)/backend/config:/app" python:3.10-slim bash -c "
    set -e
    cd /app
    
    echo '📦 Installing system dependencies...'
    apt-get update -qq && apt-get install -y -qq git build-essential > /dev/null 2>&1
    
    echo '📦 Upgrading pip...'
    pip install --upgrade pip --quiet
    
    echo '🔍 Resolving dependencies from requirements.txt (this takes 3-5 minutes)...'
    echo ''
    
    # Install all dependencies, letting pip resolve conflicts
    pip install -r requirements.txt
    
    echo ''
    echo '💾 Freezing resolved dependencies to requirements-lock.txt...'
    pip freeze > requirements-lock.txt
    
    echo ''
    echo '✅ Generated requirements-lock.txt with $(wc -l < requirements-lock.txt | tr -d ' ') packages'
"

echo ""
echo "✅ Success! New requirements-lock.txt generated."
echo ""
echo "Now testing the new lock file..."
./test-requirements.sh

