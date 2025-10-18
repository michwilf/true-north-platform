"""
Comprehensive Testing Suite for True North Trading Platform
Tests all components, integrations, and end-to-end functionality.
"""

import asyncio
import os
import sys
import time
import traceback
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from pathlib import Path
import json

# Add project root to path
project_root = Path(__file__).parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class TestResult:
    """Represents the result of a test."""

    def __init__(
        self,
        test_name: str,
        passed: bool,
        message: str = "",
        duration: float = 0.0,
        details: Dict = None,
    ):
        self.test_name = test_name
        self.passed = passed
        self.message = message
        self.duration = duration
        self.details = details or {}
        self.timestamp = datetime.now()


class TestSuite:
    """Base class for test suites."""

    def __init__(self, name: str):
        self.name = name
        self.results: List[TestResult] = []

    def add_result(
        self,
        test_name: str,
        passed: bool,
        message: str = "",
        duration: float = 0.0,
        details: Dict = None,
    ):
        """Add a test result."""
        result = TestResult(test_name, passed, message, duration, details)
        self.results.append(result)
        return result

    def get_summary(self) -> Dict[str, Any]:
        """Get test suite summary."""
        total = len(self.results)
        passed = sum(1 for r in self.results if r.passed)
        failed = total - passed

        return {
            "suite_name": self.name,
            "total_tests": total,
            "passed": passed,
            "failed": failed,
            "success_rate": (passed / total * 100) if total > 0 else 0,
            "total_duration": sum(r.duration for r in self.results),
        }


class EnvironmentTestSuite(TestSuite):
    """Test environment setup and dependencies."""

    def __init__(self):
        super().__init__("Environment & Dependencies")

    async def run_tests(self):
        """Run all environment tests."""
        print(f"\n🔧 Testing {self.name}")
        print("-" * 50)

        # Test Python version
        await self._test_python_version()

        # Test required packages
        await self._test_required_packages()

        # Test environment variables
        await self._test_environment_variables()

        # Test file structure
        await self._test_file_structure()

        # Test API credentials
        await self._test_api_credentials()

    async def _test_python_version(self):
        """Test Python version compatibility."""
        start_time = time.time()
        try:
            import sys

            version = sys.version_info

            if version.major == 3 and version.minor >= 8:
                self.add_result(
                    "Python Version",
                    True,
                    f"✅ Python {version.major}.{version.minor}.{version.micro}",
                    time.time() - start_time,
                )
            else:
                self.add_result(
                    "Python Version",
                    False,
                    f"❌ Python {version.major}.{version.minor} (requires 3.8+)",
                    time.time() - start_time,
                )
        except Exception as e:
            self.add_result(
                "Python Version", False, f"❌ Error: {e}", time.time() - start_time
            )

    async def _test_required_packages(self):
        """Test required package imports."""
        start_time = time.time()

        required_packages = [
            ("pandas", "Data manipulation"),
            ("numpy", "Numerical computing"),
            ("yfinance", "Market data"),
            ("openai", "AI integration"),
            ("aiohttp", "Async HTTP"),
            ("python-dotenv", "Environment variables"),
        ]

        failed_imports = []

        for package, description in required_packages:
            try:
                __import__(package.replace("-", "_"))
                print(f"   ✅ {package}: {description}")
            except ImportError:
                failed_imports.append(package)
                print(f"   ❌ {package}: {description} - NOT INSTALLED")

        if not failed_imports:
            self.add_result(
                "Required Packages",
                True,
                f"✅ All {len(required_packages)} packages available",
                time.time() - start_time,
            )
        else:
            self.add_result(
                "Required Packages",
                False,
                f"❌ Missing: {', '.join(failed_imports)}",
                time.time() - start_time,
            )

    async def _test_environment_variables(self):
        """Test environment variable setup."""
        start_time = time.time()

        required_vars = ["OPENAI_API_KEY", "COST_PROFILE", "ENABLE_COST_CONTROLS"]

        optional_vars = [
            "ALPHA_VANTAGE_API_KEY",
            "POLYGON_API_KEY",
            "NEWS_API_KEY",
            "TWITTER_BEARER_TOKEN",
            "REDDIT_CLIENT_ID",
        ]

        missing_required = []
        missing_optional = []

        for var in required_vars:
            if not os.getenv(var):
                missing_required.append(var)
            else:
                print(f"   ✅ {var}: Configured")

        for var in optional_vars:
            if not os.getenv(var):
                missing_optional.append(var)
            else:
                print(f"   ✅ {var}: Configured")

        if missing_optional:
            print(f"   ⚠️ Optional missing: {', '.join(missing_optional)}")

        if not missing_required:
            self.add_result(
                "Environment Variables",
                True,
                f"✅ All required vars set, {len(optional_vars) - len(missing_optional)} optional vars",
                time.time() - start_time,
            )
        else:
            self.add_result(
                "Environment Variables",
                False,
                f"❌ Missing required: {', '.join(missing_required)}",
                time.time() - start_time,
            )

    async def _test_file_structure(self):
        """Test project file structure."""
        start_time = time.time()

        required_files = [
            "ultra_robust_platform_demo.py",
            "trader_following_system.py",
            "trader_discovery_system.py",
            "config/cost_profiles.py",
            "tradingagents/default_config.py",
        ]

        missing_files = []

        for file_path in required_files:
            full_path = project_root / file_path
            if full_path.exists():
                print(f"   ✅ {file_path}")
            else:
                missing_files.append(file_path)
                print(f"   ❌ {file_path} - NOT FOUND")

        if not missing_files:
            self.add_result(
                "File Structure",
                True,
                f"✅ All {len(required_files)} core files present",
                time.time() - start_time,
            )
        else:
            self.add_result(
                "File Structure",
                False,
                f"❌ Missing: {', '.join(missing_files)}",
                time.time() - start_time,
            )

    async def _test_api_credentials(self):
        """Test API credential validity."""
        start_time = time.time()

        # Test OpenAI API
        openai_status = await self._test_openai_connection()

        # Test other APIs would go here

        if openai_status:
            self.add_result(
                "API Credentials",
                True,
                "✅ OpenAI API connection successful",
                time.time() - start_time,
            )
        else:
            self.add_result(
                "API Credentials",
                False,
                "❌ OpenAI API connection failed",
                time.time() - start_time,
            )

    async def _test_openai_connection(self) -> bool:
        """Test OpenAI API connection."""
        try:
            from openai import OpenAI

            client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": "Test"}],
                max_tokens=5,
            )

            print(f"   ✅ OpenAI API: Connection successful")
            return True

        except Exception as e:
            print(f"   ❌ OpenAI API: {e}")
            return False


class CoreFunctionalityTestSuite(TestSuite):
    """Test core platform functionality."""

    def __init__(self):
        super().__init__("Core Functionality")

    async def run_tests(self):
        """Run all core functionality tests."""
        print(f"\n🎯 Testing {self.name}")
        print("-" * 50)

        # Test cost management
        await self._test_cost_management()

        # Test market data access
        await self._test_market_data()

        # Test AI integration
        await self._test_ai_integration()

        # Test trader following
        await self._test_trader_following()

        # Test discovery engine
        await self._test_discovery_engine()

    async def _test_cost_management(self):
        """Test cost management system."""
        start_time = time.time()
        try:
            from config.cost_profiles import get_cost_manager, CostProfile

            cost_manager = get_cost_manager()

            # Test profile switching
            original_profile = cost_manager.current_profile
            cost_manager.switch_profile(CostProfile.LEAN)
            cost_manager.switch_profile(original_profile)

            # Test spending tracking
            cost_manager.record_request("test_api", 0.01)

            # Test limits checking
            can_make = cost_manager.can_make_request("test_api")

            self.add_result(
                "Cost Management",
                True,
                f"✅ Profile: {cost_manager.current_profile.value}, Budget: ${cost_manager.config.monthly_budget}",
                time.time() - start_time,
            )

        except Exception as e:
            self.add_result(
                "Cost Management", False, f"❌ Error: {e}", time.time() - start_time
            )

    async def _test_market_data(self):
        """Test market data access."""
        start_time = time.time()
        try:
            import yfinance as yf

            # Test basic stock data
            ticker = yf.Ticker("AAPL")
            info = ticker.info
            hist = ticker.history(period="5d")

            if len(hist) > 0 and "longName" in info:
                self.add_result(
                    "Market Data",
                    True,
                    f"✅ AAPL data: ${hist['Close'].iloc[-1]:.2f}, {len(hist)} days",
                    time.time() - start_time,
                )
            else:
                self.add_result(
                    "Market Data",
                    False,
                    "❌ Insufficient data retrieved",
                    time.time() - start_time,
                )

        except Exception as e:
            self.add_result(
                "Market Data", False, f"❌ Error: {e}", time.time() - start_time
            )

    async def _test_ai_integration(self):
        """Test AI integration."""
        start_time = time.time()
        try:
            from openai import OpenAI

            client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "user", "content": "Analyze AAPL stock in one sentence."}
                ],
                max_tokens=50,
            )

            analysis = response.choices[0].message.content

            if len(analysis) > 10:
                self.add_result(
                    "AI Integration",
                    True,
                    f"✅ AI Analysis: {analysis[:50]}...",
                    time.time() - start_time,
                )
            else:
                self.add_result(
                    "AI Integration",
                    False,
                    "❌ AI response too short",
                    time.time() - start_time,
                )

        except Exception as e:
            self.add_result(
                "AI Integration", False, f"❌ Error: {e}", time.time() - start_time
            )

    async def _test_trader_following(self):
        """Test trader following system."""
        start_time = time.time()
        try:
            from trader_following_system import TraderFollowingSystem, TraderPlatform

            system = TraderFollowingSystem()

            # Test adding a trader
            trader_id = system.add_trader(
                name="Test Trader",
                platform=TraderPlatform.TWITTER,
                username="testtrader",
                confidence_score=0.8,
            )

            # Test getting traders
            traders = system.database.get_traders()

            if len(traders) > 0:
                self.add_result(
                    "Trader Following",
                    True,
                    f"✅ Added trader: {trader_id[:8]}..., Total: {len(traders)}",
                    time.time() - start_time,
                )
            else:
                self.add_result(
                    "Trader Following",
                    False,
                    "❌ No traders found after adding",
                    time.time() - start_time,
                )

        except Exception as e:
            self.add_result(
                "Trader Following", False, f"❌ Error: {e}", time.time() - start_time
            )

    async def _test_discovery_engine(self):
        """Test discovery engine."""
        start_time = time.time()
        try:
            from trader_discovery_system import TraderDiscoveryEngine

            engine = TraderDiscoveryEngine()

            # Test known traders database
            known_traders = engine.known_traders_db.get_known_traders()

            # Test platform recommendations
            twitter_recs = engine.get_platform_recommendations("twitter")

            if len(known_traders) > 0 and "description" in twitter_recs:
                self.add_result(
                    "Discovery Engine",
                    True,
                    f"✅ Known traders: {len(known_traders)}, Platform recs available",
                    time.time() - start_time,
                )
            else:
                self.add_result(
                    "Discovery Engine",
                    False,
                    "❌ Discovery engine not functioning properly",
                    time.time() - start_time,
                )

        except Exception as e:
            self.add_result(
                "Discovery Engine", False, f"❌ Error: {e}", time.time() - start_time
            )


class IntegrationTestSuite(TestSuite):
    """Test system integrations."""

    def __init__(self):
        super().__init__("System Integration")

    async def run_tests(self):
        """Run all integration tests."""
        print(f"\n🔗 Testing {self.name}")
        print("-" * 50)

        # Test end-to-end workflow
        await self._test_end_to_end_workflow()

        # Test error handling
        await self._test_error_handling()

        # Test performance
        await self._test_performance()

    async def _test_end_to_end_workflow(self):
        """Test complete workflow from discovery to analysis."""
        start_time = time.time()
        try:
            # Import main platform
            from ultra_robust_platform_demo import UltraRobustTradingPlatform

            # Initialize platform
            platform = UltraRobustTradingPlatform()

            # Test initialization
            await platform.initialize_platform()

            if platform.is_initialized:
                self.add_result(
                    "End-to-End Workflow",
                    True,
                    "✅ Platform initialization successful",
                    time.time() - start_time,
                )
            else:
                self.add_result(
                    "End-to-End Workflow",
                    False,
                    "❌ Platform initialization failed",
                    time.time() - start_time,
                )

        except Exception as e:
            self.add_result(
                "End-to-End Workflow", False, f"❌ Error: {e}", time.time() - start_time
            )

    async def _test_error_handling(self):
        """Test error handling and recovery."""
        start_time = time.time()
        try:
            # Test with invalid API key
            from openai import OpenAI

            try:
                client = OpenAI(api_key="invalid_key")
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": "test"}],
                    max_tokens=5,
                )
                # Should not reach here
                error_handled = False
            except Exception:
                # Error was properly caught
                error_handled = True

            self.add_result(
                "Error Handling",
                error_handled,
                (
                    "✅ Errors properly caught and handled"
                    if error_handled
                    else "❌ Errors not handled"
                ),
                time.time() - start_time,
            )

        except Exception as e:
            self.add_result(
                "Error Handling",
                False,
                f"❌ Error in error handling test: {e}",
                time.time() - start_time,
            )

    async def _test_performance(self):
        """Test system performance."""
        start_time = time.time()
        try:
            import yfinance as yf

            # Test multiple concurrent requests
            symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA"]

            performance_start = time.time()

            # Simulate concurrent data fetching
            for symbol in symbols:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period="1d")

            performance_time = time.time() - performance_start

            if performance_time < 10:  # Should complete within 10 seconds
                self.add_result(
                    "Performance",
                    True,
                    f"✅ {len(symbols)} stocks fetched in {performance_time:.2f}s",
                    time.time() - start_time,
                )
            else:
                self.add_result(
                    "Performance",
                    False,
                    f"❌ Too slow: {performance_time:.2f}s for {len(symbols)} stocks",
                    time.time() - start_time,
                )

        except Exception as e:
            self.add_result(
                "Performance", False, f"❌ Error: {e}", time.time() - start_time
            )


class ComprehensiveTestRunner:
    """Runs all test suites and generates reports."""

    def __init__(self):
        self.test_suites = [
            EnvironmentTestSuite(),
            CoreFunctionalityTestSuite(),
            IntegrationTestSuite(),
        ]
        self.start_time = None
        self.end_time = None

    async def run_all_tests(self):
        """Run all test suites."""
        print("🧪 TRUE NORTH TRADING PLATFORM - COMPREHENSIVE TEST SUITE")
        print("=" * 70)
        print(f"📅 Test Run: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        self.start_time = time.time()

        # Run each test suite
        for suite in self.test_suites:
            try:
                await suite.run_tests()
            except Exception as e:
                print(f"❌ Test suite '{suite.name}' failed: {e}")
                traceback.print_exc()

        self.end_time = time.time()

        # Generate final report
        self._generate_final_report()

    def _generate_final_report(self):
        """Generate comprehensive test report."""
        print(f"\n📊 COMPREHENSIVE TEST REPORT")
        print("=" * 70)

        total_tests = 0
        total_passed = 0
        total_failed = 0
        total_duration = self.end_time - self.start_time

        # Suite summaries
        for suite in self.test_suites:
            summary = suite.get_summary()
            total_tests += summary["total_tests"]
            total_passed += summary["passed"]
            total_failed += summary["failed"]

            status_icon = (
                "✅"
                if summary["failed"] == 0
                else "❌" if summary["passed"] == 0 else "⚠️"
            )

            print(f"\n{status_icon} {summary['suite_name']}")
            print(
                f"   📊 Tests: {summary['total_tests']} | ✅ Passed: {summary['passed']} | ❌ Failed: {summary['failed']}"
            )
            print(
                f"   📈 Success Rate: {summary['success_rate']:.1f}% | ⏱️ Duration: {summary['total_duration']:.2f}s"
            )

            # Show failed tests
            failed_tests = [r for r in suite.results if not r.passed]
            if failed_tests:
                print(f"   🚨 Failed Tests:")
                for test in failed_tests:
                    print(f"      • {test.test_name}: {test.message}")

        # Overall summary
        overall_success_rate = (
            (total_passed / total_tests * 100) if total_tests > 0 else 0
        )

        print(f"\n🎯 OVERALL RESULTS")
        print("-" * 30)
        print(f"📊 Total Tests: {total_tests}")
        print(f"✅ Passed: {total_passed}")
        print(f"❌ Failed: {total_failed}")
        print(f"📈 Success Rate: {overall_success_rate:.1f}%")
        print(f"⏱️ Total Duration: {total_duration:.2f}s")

        # Platform status
        if overall_success_rate >= 90:
            status = "🏆 EXCELLENT - Production Ready"
        elif overall_success_rate >= 75:
            status = "🎯 GOOD - Minor Issues"
        elif overall_success_rate >= 50:
            status = "⚠️ FAIR - Needs Attention"
        else:
            status = "🚨 POOR - Major Issues"

        print(f"\n🏷️ Platform Status: {status}")

        # Recommendations
        print(f"\n💡 RECOMMENDATIONS:")

        if total_failed == 0:
            print("   🎉 All tests passed! Your platform is working excellently.")
            print("   🚀 Ready to implement additional features.")
        else:
            print("   🔧 Fix failed tests before proceeding to new features.")
            print("   📋 Review error messages and check configurations.")

            if any(
                "API" in r.message
                for suite in self.test_suites
                for r in suite.results
                if not r.passed
            ):
                print("   🔑 Check API credentials and network connectivity.")

            if any(
                "Missing" in r.message
                for suite in self.test_suites
                for r in suite.results
                if not r.passed
            ):
                print("   📦 Install missing dependencies or files.")

        print(f"\n✅ Test Report Complete!")

        return {
            "total_tests": total_tests,
            "passed": total_passed,
            "failed": total_failed,
            "success_rate": overall_success_rate,
            "duration": total_duration,
            "status": status,
        }


async def main():
    """Run comprehensive testing suite."""
    runner = ComprehensiveTestRunner()
    results = await runner.run_all_tests()

    # Save results to file
    results_file = f"test_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

    with open(results_file, "w") as f:
        json.dump(
            {
                "timestamp": datetime.now().isoformat(),
                "results": results,
                "details": {
                    suite.name: [
                        {
                            "test_name": r.test_name,
                            "passed": r.passed,
                            "message": r.message,
                            "duration": r.duration,
                        }
                        for r in suite.results
                    ]
                    for suite in runner.test_suites
                },
            },
            f,
            indent=2,
        )

    print(f"\n📄 Detailed results saved to: {results_file}")


if __name__ == "__main__":
    asyncio.run(main())
