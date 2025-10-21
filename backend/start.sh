#!/bin/bash

# True North Trading - Backend Start Script

echo "🚀 TRUE NORTH TRADING - BACKEND API"
echo "===================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Backend port
BACKEND_PORT=8002

# Function to check if port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
    return $?
}

# Function to kill process on port
kill_port() {
    echo "⚠️  Port $1 is in use, killing process..."
    lsof -ti:$1 | xargs kill -9 2>/dev/null
    sleep 2
}

# Check port 8002
if check_port $BACKEND_PORT; then
    read -p "Port $BACKEND_PORT is in use. Kill process? (y/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port $BACKEND_PORT
    else
        echo "❌ Cannot start backend. Port $BACKEND_PORT is in use."
        exit 1
    fi
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: No .env file found in backend/"
    echo "   Please create backend/.env with your API keys:"
    echo "   - OPENAI_API_KEY"
    echo "   - ALPHA_VANTAGE_API_KEY"
    echo "   Continuing anyway..."
    echo ""
fi

# Check if virtual environment exists
if [ -d "venv" ]; then
    echo "🐍 Activating virtual environment..."
    source venv/bin/activate
elif [ -d "../venv" ]; then
    echo "🐍 Activating virtual environment..."
    source ../venv/bin/activate
else
    echo "⚠️  No virtual environment found. Continuing with system Python..."
    echo "   (It's recommended to create one: python3 -m venv venv)"
    echo ""
fi

echo "🚀 Starting FastAPI backend server..."
echo ""
echo "📡 Backend API will be available at:"
echo "   http://localhost:$BACKEND_PORT"
echo "   http://127.0.0.1:$BACKEND_PORT"
echo ""
echo "📚 API Documentation:"
echo "   http://localhost:$BACKEND_PORT/docs"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start backend using the runner script
python scripts/runners/run_backend.py

