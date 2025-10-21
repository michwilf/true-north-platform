#!/usr/bin/env python3
"""
True North Trading - Frontend Launcher

Launches the Next.js frontend development server.
"""

import sys
import os
import subprocess
from pathlib import Path

# Project paths (3 levels up from backend/scripts/runners/)
project_root = Path(__file__).parent.parent.parent.parent
frontend_path = project_root / "frontend"

if __name__ == "__main__":
    print("🌐 Starting True North Trading Frontend...")
    print(f"📁 Frontend path: {frontend_path}")
    print("🌐 Frontend: http://localhost:3002")
    print("-" * 50)

    # Check if node_modules exists
    if not (frontend_path / "node_modules").exists():
        print("📦 Installing frontend dependencies...")
        install_process = subprocess.run(
            ["npm", "install"], cwd=frontend_path, check=True
        )

    # Start development server
    cmd = ["npm", "run", "dev"]
    subprocess.run(cmd, cwd=frontend_path)
