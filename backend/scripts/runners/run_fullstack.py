#!/usr/bin/env python3
"""
True North Trading - Full Stack Launcher

Launches both the FastAPI backend and Next.js frontend.
"""

import subprocess
import sys
import os
import time
from pathlib import Path
import signal
import threading

# Project paths (3 levels up from backend/scripts/runners/)
project_root = Path(__file__).parent.parent.parent.parent
backend_path = project_root / "backend" / "api" / "main.py"
frontend_path = project_root / "frontend"

# Global process references
backend_process = None
frontend_process = None


def signal_handler(sig, frame):
    """Handle Ctrl+C gracefully."""
    print("\n🛑 Shutting down True North Trading...")

    if backend_process:
        print("📡 Stopping backend...")
        backend_process.terminate()

    if frontend_process:
        print("🌐 Stopping frontend...")
        frontend_process.terminate()

    print("✅ Shutdown complete!")
    sys.exit(0)


def start_backend():
    """Start the FastAPI backend."""
    global backend_process

    print("🚀 Starting FastAPI backend...")
    print(f"📁 Backend path: {backend_path}")

    cmd = [
        sys.executable,
        "-m",
        "uvicorn",
        "backend.api.main:app",
        "--host",
        "0.0.0.0",
        "--port",
        "8002",
        "--reload",
    ]

    try:
        backend_process = subprocess.Popen(
            cmd,
            cwd=project_root,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True,
        )

        # Monitor backend output
        def monitor_backend():
            for line in backend_process.stdout:
                print(f"[BACKEND] {line.strip()}")

        backend_thread = threading.Thread(target=monitor_backend, daemon=True)
        backend_thread.start()

        print("✅ Backend started on http://localhost:8002")
        return True

    except Exception as e:
        print(f"❌ Failed to start backend: {e}")
        return False


def start_frontend():
    """Start the Next.js frontend."""
    global frontend_process

    print("🌐 Starting Next.js frontend...")
    print(f"📁 Frontend path: {frontend_path}")

    # Check if node_modules exists
    if not (frontend_path / "node_modules").exists():
        print("📦 Installing frontend dependencies...")
        install_process = subprocess.run(
            ["npm", "install"], cwd=frontend_path, capture_output=True, text=True
        )

        if install_process.returncode != 0:
            print(f"❌ Failed to install dependencies: {install_process.stderr}")
            return False

    cmd = ["npm", "run", "dev"]

    try:
        frontend_process = subprocess.Popen(
            cmd,
            cwd=frontend_path,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True,
        )

        # Monitor frontend output
        def monitor_frontend():
            for line in frontend_process.stdout:
                print(f"[FRONTEND] {line.strip()}")

        frontend_thread = threading.Thread(target=monitor_frontend, daemon=True)
        frontend_thread.start()

        print("✅ Frontend started on http://localhost:3002")
        return True

    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")
        return False


def main():
    """Main launcher function."""
    print("🚀 True North Trading - Full Stack Launcher")
    print("=" * 50)

    # Set up signal handler for graceful shutdown
    signal.signal(signal.SIGINT, signal_handler)

    # Start backend
    if not start_backend():
        print("❌ Failed to start backend. Exiting.")
        return

    # Wait for backend to be ready
    print("⏳ Waiting for backend to be ready...")
    time.sleep(3)

    # Start frontend
    if not start_frontend():
        print("❌ Failed to start frontend. Stopping backend.")
        if backend_process:
            backend_process.terminate()
        return

    print("\n" + "=" * 50)
    print("🎉 True North Trading is now running!")
    print("📡 Backend API: http://localhost:8002")
    print("🌐 Frontend Dashboard: http://localhost:3002")
    print("📚 API Docs: http://localhost:8002/docs")
    print("=" * 50)
    print("Press Ctrl+C to stop all services")

    # Keep the main process alive
    try:
        while True:
            time.sleep(1)

            # Check if processes are still running
            if backend_process and backend_process.poll() is not None:
                print("❌ Backend process died unexpectedly")
                break

            if frontend_process and frontend_process.poll() is not None:
                print("❌ Frontend process died unexpectedly")
                break

    except KeyboardInterrupt:
        signal_handler(signal.SIGINT, None)


if __name__ == "__main__":
    main()
