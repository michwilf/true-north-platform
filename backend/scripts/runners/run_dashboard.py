#!/usr/bin/env python3
"""
True North Trading Platform - Dashboard Launcher

This script launches the Streamlit dashboard with proper path configuration.
"""

import sys
import os
from pathlib import Path

# Add project root to Python path (3 levels up from backend/scripts/runners/)
project_root = Path(__file__).parent.parent.parent.parent
sys.path.insert(0, str(project_root))

# Set environment variables
os.environ["PYTHONPATH"] = str(project_root)

if __name__ == "__main__":
    import subprocess

    # Launch Streamlit dashboard
    dashboard_path = project_root / "backend" / "interfaces" / "app.py"

    cmd = [
        sys.executable,
        "-m",
        "streamlit",
        "run",
        str(dashboard_path),
        "--server.headless=true",
    ]

    print("🚀 Starting True North Trading Dashboard...")
    print(f"📁 Project root: {project_root}")
    print(f"📊 Dashboard: {dashboard_path}")
    print("🌐 URL: http://localhost:8501")
    print("-" * 50)

    subprocess.run(cmd)
