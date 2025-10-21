#!/usr/bin/env python3
"""
Quick System Test for True North Trading Platform
Simple validation of core functionality.
"""

import os
import sys
from pathlib import Path


def test_environment():
    """Test basic environment setup."""
    print("🧪 QUICK SYSTEM TEST")
    print("=" * 50)

    # Test 1: Python version
    print("\n1. 🔧 Environment:")
    try:
        version = sys.version_info
        if version.major == 3 and version.minor >= 8:
            print(f"   ✅ Python {version.major}.{version.minor}.{version.micro}")
        else:
            print(f"   ❌ Python {version.major}.{version.minor} (requires 3.8+)")
    except Exception as e:
        print(f"   ❌ Python version check failed: {e}")

    # Test 2: Core packages
    print("\n2. 📦 Core Packages:")
    packages = [
        "pandas",
        "numpy",
        "yfinance",
        "openai",
        "aiohttp",
        "python-dotenv",
        "sqlite3",
    ]

    missing_packages = []
    for pkg in packages:
        try:
            if pkg == "python-dotenv":
                import dotenv
            else:
                __import__(pkg.replace("-", "_"))
            print(f"   ✅ {pkg}")
        except ImportError:
            missing_packages.append(pkg)
            print(f"   ❌ {pkg} - NOT INSTALLED")

    # Test 3: Environment variables
    print("\n3. 🔑 Environment Variables:")
    required_vars = ["OPENAI_API_KEY", "COST_PROFILE"]
    optional_vars = ["ALPHA_VANTAGE_API_KEY", "TWITTER_BEARER_TOKEN"]

    missing_required = []
    for var in required_vars:
        if os.getenv(var):
            print(f"   ✅ {var}: Configured")
        else:
            missing_required.append(var)
            print(f"   ❌ {var}: Missing")

    for var in optional_vars:
        if os.getenv(var):
            print(f"   ✅ {var}: Configured (optional)")
        else:
            print(f"   ⚠️  {var}: Missing (optional)")

    # Test 4: File structure
    print("\n4. 📁 Core Files:")
    required_files = [
        "ultra_robust_platform_demo.py",
        "trader_following_system.py",
        "trader_discovery_system.py",
        "config/cost_profiles.py",
        ".env",
    ]

    missing_files = []
    for file_path in required_files:
        if Path(file_path).exists():
            print(f"   ✅ {file_path}")
        else:
            missing_files.append(file_path)
            print(f"   ❌ {file_path} - NOT FOUND")

    # Test 5: Basic imports
    print("\n5. 🔧 Core Functionality:")

    try:
        from config.cost_profiles import get_cost_manager

        cost_manager = get_cost_manager()
        print(f"   ✅ Cost Management: {cost_manager.current_profile.value}")
    except Exception as e:
        print(f"   ❌ Cost Management: {e}")

    try:
        from trader_following_system import TraderFollowingSystem

        system = TraderFollowingSystem()
        print(f"   ✅ Trader Following: Initialized")
    except Exception as e:
        print(f"   ❌ Trader Following: {e}")

    try:
        from trader_discovery_system import TraderDiscoveryEngine

        engine = TraderDiscoveryEngine()
        known_traders = engine.known_traders_db.get_known_traders()
        print(f"   ✅ Trader Discovery: {len(known_traders)} known traders")
    except Exception as e:
        print(f"   ❌ Trader Discovery: {e}")

    # Summary
    print("\n📊 SYSTEM STATUS SUMMARY:")
    print("-" * 30)

    issues = []
    if missing_packages:
        issues.append(f"Missing packages: {', '.join(missing_packages)}")
    if missing_required:
        issues.append(f"Missing env vars: {', '.join(missing_required)}")
    if missing_files:
        issues.append(f"Missing files: {', '.join(missing_files)}")

    if not issues:
        print("🎉 ALL SYSTEMS GO!")
        print("✅ Your platform is ready for testing and development")
        print("\n🚀 Next Steps:")
        print("   1. Run: python ultra_robust_platform_demo.py")
        print("   2. Test trader discovery features")
        print("   3. Implement additional features from analysis")
    else:
        print("⚠️  ISSUES FOUND:")
        for issue in issues:
            print(f"   • {issue}")
        print("\n🔧 Fix these issues before proceeding")

    return len(issues) == 0


if __name__ == "__main__":
    test_environment()
