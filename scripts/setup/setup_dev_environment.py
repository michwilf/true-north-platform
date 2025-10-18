#!/usr/bin/env python3
"""
Setup script for True North Trading Platform development environment.
Installs pre-commit hooks, development dependencies, and configures the environment.
"""

import subprocess
import sys
import os
from pathlib import Path


def run_command(command, description, check=True):
    """Run a command and handle errors."""
    print(f"🔄 {description}")
    try:
        result = subprocess.run(
            command, shell=True, check=check, capture_output=True, text=True
        )
        if result.returncode == 0:
            print(f"✅ {description} - SUCCESS")
            return True
        else:
            print(f"❌ {description} - FAILED")
            if result.stderr:
                print(f"   Error: {result.stderr}")
            return False
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} - FAILED")
        print(f"   Error: {e}")
        return False


def main():
    """Main setup function."""
    print("🚀 True North Trading Platform - Development Environment Setup")
    print("=" * 70)

    # Get project root
    project_root = Path(__file__).parent.parent.parent
    os.chdir(project_root)

    print(f"📁 Working in: {project_root}")

    # Install pre-commit
    if not run_command("pip install pre-commit", "Installing pre-commit"):
        return 1

    # Install pre-commit hooks
    if not run_command("pre-commit install", "Installing pre-commit hooks"):
        return 1

    # Install development dependencies
    dev_packages = [
        "black",
        "flake8",
        "isort",
        "mypy",
        "bandit",
        "pytest",
        "pytest-cov",
        "pre-commit",
    ]

    for package in dev_packages:
        if not run_command(f"pip install {package}", f"Installing {package}"):
            print(f"⚠️  Failed to install {package}, continuing...")

    # Run initial pre-commit on all files
    print("\n🔍 Running initial pre-commit checks...")
    run_command("pre-commit run --all-files", "Initial pre-commit run", check=False)

    # Create .env file if it doesn't exist
    env_file = project_root / ".env"
    if not env_file.exists():
        print("\n📝 Creating .env template...")
        env_template = """# True North Trading Platform - Environment Variables
# Copy this template and add your actual API keys

# Core APIs (Required)
OPENAI_API_KEY=your_openai_key_here
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here

# Social Media APIs
TWITTER_BEARER_TOKEN=your_twitter_token_here
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=true-north-trading/1.0

# Optional Enhanced APIs
POLYGON_API_KEY=your_polygon_key_here
NEWS_API_KEY=your_news_api_key_here

# Environment
ENVIRONMENT=development
DEBUG=True
LOG_LEVEL=INFO
"""
        with open(env_file, "w") as f:
            f.write(env_template)
        print("✅ Created .env template")

    print("\n🎉 Development Environment Setup Complete!")
    print("=" * 70)
    print("✅ Pre-commit hooks installed")
    print("✅ Development dependencies installed")
    print("✅ Code quality tools configured")
    print("✅ Environment template created")

    print("\n📋 Next Steps:")
    print("1. Add your API keys to .env file")
    print("2. Run: python -m pytest tests/unit/ -v")
    print("3. Run: python -m cli.main")
    print("4. Start developing! Pre-commit will run automatically on commits")

    print("\n🔧 Development Commands:")
    print("• Format code: black .")
    print("• Lint code: flake8 .")
    print("• Type check: mypy tradingagents/")
    print("• Run tests: python run_tests.py")
    print("• Manual pre-commit: pre-commit run --all-files")

    return 0


if __name__ == "__main__":
    sys.exit(main())
