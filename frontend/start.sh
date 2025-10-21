#!/bin/bash

# True North Trading - Frontend Start Script

echo "🌐 TRUE NORTH TRADING - FRONTEND"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Get the directory where this script is located
FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$FRONTEND_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    echo ""
    npm install
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Failed to install dependencies."
        exit 1
    fi
    
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
fi

# Check if port 3002 is in use
if lsof -ti:3002 > /dev/null 2>&1; then
    echo "⚠️  Port 3002 is already in use."
    echo ""
    read -p "Do you want to kill the process and restart? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🔄 Killing process on port 3002..."
        lsof -ti:3002 | xargs kill -9 2>/dev/null
        sleep 2
    else
        echo "❌ Cannot start frontend while port 3002 is in use."
        exit 1
    fi
fi

echo "🚀 Starting Next.js development server..."
echo ""
echo "🌐 Frontend will be available at:"
echo "   http://localhost:3002"
echo ""
echo "📡 Make sure the backend is running at:"
echo "   http://localhost:8002"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""
echo "================================="
echo ""

# Start the development server
npm run dev

