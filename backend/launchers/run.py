#!/usr/bin/env python3
"""
True North Trading - Main Launcher

A unified launcher for all True North Trading components.
"""

import sys
import os
import argparse
from pathlib import Path

# Project paths
project_root = Path(__file__).parent
runners_path = project_root / "scripts" / "runners"


def print_banner():
    """Print the application banner."""
    print(
        """
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   ████████╗██████╗ ██╗   ██╗███████╗    ███╗   ██╗     ║
║   ╚══██╔══╝██╔══██╗██║   ██║██╔════╝    ████╗  ██║     ║
║      ██║   ██████╔╝██║   ██║█████╗      ██╔██╗ ██║     ║
║      ██║   ██╔══██╗██║   ██║██╔══╝      ██║╚██╗██║     ║
║      ██║   ██║  ██║╚██████╔╝███████╗    ██║ ╚████║     ║
║      ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═══╝     ║
║                                                        ║
║                TRADING PLATFORM                        ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
"""
    )


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(description="True North Trading Platform Launcher")
    parser.add_argument(
        "component",
        choices=["backend", "frontend", "dashboard", "fullstack"],
        help="Component to launch",
    )

    args = parser.parse_args()

    print_banner()

    # Launch the selected component
    if args.component == "backend":
        script_path = runners_path / "run_backend.py"
        print("🚀 Launching backend API server...")
        print("📡 Backend API: http://localhost:8002")
        print("📚 API Docs: http://localhost:8002/docs")
    elif args.component == "frontend":
        script_path = runners_path / "run_frontend.py"
        print("🌐 Launching frontend development server...")
        print("🌐 Frontend: http://localhost:3002")
    elif args.component == "dashboard":
        script_path = runners_path / "run_dashboard.py"
        print("📊 Launching dashboard...")
        print("📊 Dashboard: http://localhost:8501")
    elif args.component == "fullstack":
        script_path = runners_path / "run_fullstack.py"
        print("🚀 Launching full stack (backend + frontend)...")
        print("📡 Backend API: http://localhost:8002")
        print("🌐 Frontend: http://localhost:3002")

    print("-" * 60)

    # Execute the selected script
    os.execv(sys.executable, [sys.executable, str(script_path)])


if __name__ == "__main__":
    main()
