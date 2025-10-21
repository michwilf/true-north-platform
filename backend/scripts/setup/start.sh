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
BACKEND_ONLY=false
FRONTEND_ONLY=false
DOCKER=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --backend-only)
            BACKEND_ONLY=true
            shift
            ;;
        --frontend-only)
            FRONTEND_ONLY=true
            shift
            ;;
        --docker)
            DOCKER=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: ./start.sh [--backend-only] [--frontend-only] [--docker]"
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
    echo "🔧 Backend API: http://localhost:8002"
    echo "🌐 Frontend: http://localhost:3002"
    echo ""
    echo "View logs:"
    echo "  docker-compose logs -f backend"
    echo "  docker-compose logs -f frontend"
    echo ""
    echo "Stop:"
    echo "  docker-compose down"
    
    exit 0
fi

# Get the project root directory (three levels up from backend/scripts/setup/)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

# Regular mode
if [ "$BACKEND_ONLY" = true ]; then
    echo "🔧 Starting Backend API Only..."
    echo ""
    
    # Check port 8002
    if check_port 8002; then
        kill_port 8002
    fi
    
    # Navigate to project root and start backend
    cd "$PROJECT_ROOT"
    echo "🌐 Backend API will be available at http://localhost:8002"
    echo "📋 API docs at http://localhost:8002/docs"
    echo ""
    
    # Start backend API using the launcher
    python backend/scripts/runners/run_backend.py
    
elif [ "$FRONTEND_ONLY" = true ]; then
    echo "🌐 Starting Frontend Only..."
    echo ""
    
    # Check port 3002
    if check_port 3002; then
        kill_port 3002
    fi
    
    # Navigate to frontend directory
    cd "$PROJECT_ROOT/frontend"
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install
    fi
    
    echo "🌐 Frontend will be available at http://localhost:3002"
    echo ""
    
    # Start frontend
    npm run dev
    
else
    # Start both in separate terminals
    echo "🎯 Starting Both Backend and Frontend..."
    echo ""
    
    # Check ports
    if check_port 8002; then
        kill_port 8002
    fi
    if check_port 3002; then
        kill_port 3002
    fi
    
    # Detect terminal application
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        TERMINAL_CMD="osascript -e"
        
        # Start backend in new terminal
        echo "🔧 Starting Backend API in new terminal..."
        $TERMINAL_CMD "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT' && echo '🔧 TRUE NORTH TRADING - BACKEND API' && echo '=================================' && echo '' && echo '🌐 API: http://localhost:8002' && echo '📋 Docs: http://localhost:8002/docs' && echo '' && python backend/scripts/runners/run_backend.py\""
        
        sleep 3
        
        # Start frontend in new terminal
        echo "🌐 Starting Frontend in new terminal..."
        $TERMINAL_CMD "tell application \"Terminal\" to do script \"cd '$PROJECT_ROOT/frontend' && echo '🌐 TRUE NORTH TRADING - FRONTEND' && echo '===============================' && echo '' && echo '🌐 App: http://localhost:3002' && echo '' && if [ ! -d 'node_modules' ]; then echo '📦 Installing dependencies...' && npm install; fi && npm run dev\""
        
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v gnome-terminal &> /dev/null; then
            # GNOME Terminal
            echo "🔧 Starting Backend API in new terminal..."
            gnome-terminal -- bash -c "cd '$PROJECT_ROOT' && echo '🔧 TRUE NORTH TRADING - BACKEND API' && echo '=================================' && echo '' && echo '🌐 API: http://localhost:8002' && echo '📋 Docs: http://localhost:8002/docs' && echo '' && python backend/scripts/runners/run_backend.py; exec bash"
            
            sleep 3
            
            echo "🌐 Starting Frontend in new terminal..."
            gnome-terminal -- bash -c "cd '$PROJECT_ROOT/frontend' && echo '🌐 TRUE NORTH TRADING - FRONTEND' && echo '===============================' && echo '' && echo '🌐 App: http://localhost:3002' && echo '' && if [ ! -d 'node_modules' ]; then echo '📦 Installing dependencies...' && npm install; fi && npm run dev; exec bash"
            
        elif command -v xterm &> /dev/null; then
            # XTerm
            echo "🔧 Starting Backend API in new terminal..."
            xterm -e "cd '$PROJECT_ROOT' && echo '🔧 TRUE NORTH TRADING - BACKEND API' && echo '=================================' && echo '' && echo '🌐 API: http://localhost:8002' && echo '📋 Docs: http://localhost:8002/docs' && echo '' && python backend/scripts/runners/run_backend.py; bash" &
            
            sleep 3
            
            echo "🌐 Starting Frontend in new terminal..."
            xterm -e "cd '$PROJECT_ROOT/frontend' && echo '🌐 TRUE NORTH TRADING - FRONTEND' && echo '===============================' && echo '' && echo '🌐 App: http://localhost:3002' && echo '' && if [ ! -d 'node_modules' ]; then echo '📦 Installing dependencies...' && npm install; fi && npm run dev; bash" &
            
        else
            echo "❌ No supported terminal found. Please install gnome-terminal or xterm."
            exit 1
        fi
        
    else
        # Fallback for other systems
        echo "❌ Unsupported operating system. Please start manually:"
        echo ""
        echo "Terminal 1 (Backend):"
        echo "  cd '$PROJECT_ROOT'"
        echo "  python backend/scripts/runners/run_backend.py"
        echo ""
        echo "Terminal 2 (Frontend):"
        echo "  cd '$PROJECT_ROOT/frontend'"
        echo "  npm run dev"
        exit 1
    fi
    
    echo ""
    echo "✅ Both services starting in separate terminals!"
    echo ""
    echo "🔧 Backend API: http://localhost:8002"
    echo "📋 API Docs: http://localhost:8002/docs"
    echo "🌐 Frontend: http://localhost:3002"
    echo ""
    echo "🛑 To stop services:"
    echo "  - Close the terminal windows, or"
    echo "  - Press Ctrl+C in each terminal"
    echo ""
    echo "📋 Logs will be visible in each terminal window"
fi

