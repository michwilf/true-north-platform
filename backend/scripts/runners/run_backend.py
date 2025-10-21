#!/usr/bin/env python3
"""
True North Trading - Backend Launcher

Launches the FastAPI backend server.
"""

import sys
import os
from pathlib import Path

# Add project root to Python path (3 levels up from backend/scripts/runners/)
project_root = Path(__file__).parent.parent.parent.parent
sys.path.insert(0, str(project_root))

# Set environment variables
os.environ["PYTHONPATH"] = str(project_root)

# Load environment variables from backend/.env
try:
    from dotenv import load_dotenv

    env_file = project_root / "backend" / ".env"
    if env_file.exists():
        load_dotenv(env_file)
        print(f"✅ Loaded environment from {env_file}")
    else:
        print(f"⚠️  No .env file found at {env_file}")
except ImportError:
    # Try loading from project root as fallback
    env_file = project_root / ".env"
    if env_file.exists():
        # Manually load .env file
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()
        print(f"✅ Loaded environment from {env_file}")
    else:
        print("⚠️  python-dotenv not installed and no .env file in root")

if __name__ == "__main__":
    import subprocess

    print("🚀 Starting True North Trading Backend...")
    print(f"📁 Project root: {project_root}")
    print("📡 Backend API: http://localhost:8002")
    print("📚 API Docs: http://localhost:8002/docs")
    print("-" * 50)

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

    subprocess.run(cmd, cwd=project_root)
