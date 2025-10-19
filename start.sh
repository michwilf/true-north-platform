#!/bin/bash

# True North Trading Platform - Start Script

echo "🚀 TRUE NORTH TRADING PLATFORM"
echo "================================"
echo ""

# Create necessary directories
mkdir -p logs data results

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

# Parse arguments
SCHEDULER_ONLY=false
DASHBOARD_ONLY=false
DOCKER=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --scheduler-only)
            SCHEDULER_ONLY=true
            shift
            ;;
        --dashboard-only)
            DASHBOARD_ONLY=true
            shift
            ;;
        --docker)
            DOCKER=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: ./start.sh [--scheduler-only] [--dashboard-only] [--docker]"
            exit 1
            ;;
    esac
done

# Docker mode
if [ "$DOCKER" = true ]; then
    echo "🐳 Starting with Docker..."
    echo ""
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ docker-compose not found. Please install Docker first."
        exit 1
    fi
    
    docker-compose up -d
    
    echo ""
    echo "✅ Docker containers started!"
    echo "📊 Dashboard: http://localhost:8501"
    echo ""
    echo "View logs:"
    echo "  docker-compose logs -f scheduler"
    echo "  docker-compose logs -f dashboard"
    echo ""
    echo "Stop:"
    echo "  docker-compose down"
    
    exit 0
fi

# Regular mode
if [ "$SCHEDULER_ONLY" = true ]; then
    echo "📅 Starting Scheduler Only..."
    echo ""
    
    # Check if already running
    if pgrep -f "trading_scheduler.py" > /dev/null; then
        echo "⚠️  Scheduler is already running"
        echo "Stop it first: pkill -f trading_scheduler.py"
        exit 1
    fi
    
    # Start scheduler in background
    nohup python trading_scheduler.py > logs/scheduler.log 2>&1 &
    PID=$!
    
    echo "✅ Scheduler started (PID: $PID)"
    echo "📋 Logs: tail -f logs/scheduler.log"
    echo "🛑 Stop: pkill -f trading_scheduler.py"
    
elif [ "$DASHBOARD_ONLY" = true ]; then
    echo "📊 Starting Dashboard Only..."
    echo ""
    
    # Check port 8501
    if check_port 8501; then
        kill_port 8501
    fi
    
    # Start dashboard
    streamlit run streamlit_dashboard.py
    
else
    # Start both
    echo "🎯 Starting Both Scheduler and Dashboard..."
    echo ""
    
    # Check if scheduler is already running
    if pgrep -f "trading_scheduler.py" > /dev/null; then
        echo "⚠️  Scheduler is already running"
    else
        # Start scheduler in background
        nohup python trading_scheduler.py > logs/scheduler.log 2>&1 &
        SCHEDULER_PID=$!
        echo "✅ Scheduler started (PID: $SCHEDULER_PID)"
        echo "📋 Logs: tail -f logs/scheduler.log"
    fi
    
    echo ""
    
    # Check port 8501
    if check_port 8501; then
        kill_port 8501
    fi
    
    echo "📊 Starting Dashboard..."
    echo "🌐 Dashboard will open at http://localhost:8501"
    echo ""
    sleep 2
    
    # Start dashboard (foreground)
    streamlit run streamlit_dashboard.py
fi

