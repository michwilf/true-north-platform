#!/usr/bin/env python3
"""
True North Trading Platform - Test Runner

Comprehensive test runner for all test categories with detailed reporting.
"""

import os
import sys
import subprocess
import argparse
import time
from pathlib import Path


class TestRunner:
    """Comprehensive test runner for the trading platform."""

    def __init__(self):
        """Initialize test runner."""
        self.project_root = Path(__file__).parent
        self.test_categories = {
            "unit": "tests/unit",
            "integration": "tests/integration",
            "api": "tests/api",
            "models": "tests/models",
            "performance": "tests/performance",
        }

    def run_command(self, command, description):
        """Run a command and return results."""
        print(f"\n🔄 {description}")
        print("=" * 60)

        start_time = time.time()

        try:
            result = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                cwd=self.project_root,
            )

            duration = time.time() - start_time

            if result.returncode == 0:
                print(f"✅ {description} - PASSED ({duration:.2f}s)")
                if result.stdout:
                    print(result.stdout)
                return True
            else:
                print(f"❌ {description} - FAILED ({duration:.2f}s)")
                if result.stderr:
                    print("STDERR:", result.stderr)
                if result.stdout:
                    print("STDOUT:", result.stdout)
                return False

        except Exception as e:
            duration = time.time() - start_time
            print(f"💥 {description} - ERROR ({duration:.2f}s)")
            print(f"Exception: {e}")
            return False

    def check_dependencies(self):
        """Check if required dependencies are installed."""
        print("🔍 Checking Dependencies")
        print("=" * 60)

        required_packages = [
            "pytest",
            "pytest-cov",
            "transformers",
            "torch",
            "pandas",
            "numpy",
            "requests",
            "python-dotenv",
        ]

        missing_packages = []

        for package in required_packages:
            try:
                __import__(package.replace("-", "_"))
                print(f"✅ {package}")
            except ImportError:
                print(f"❌ {package} - MISSING")
                missing_packages.append(package)

        if missing_packages:
            print(f"\n⚠️  Missing packages: {', '.join(missing_packages)}")
            print("Install with: pip install " + " ".join(missing_packages))
            return False

        print("\n✅ All dependencies available")
        return True

    def run_category_tests(self, category):
        """Run tests for a specific category."""
        if category not in self.test_categories:
            print(f"❌ Unknown test category: {category}")
            return False

        test_path = self.test_categories[category]

        if not os.path.exists(test_path):
            print(f"⚠️  Test directory not found: {test_path}")
            return False

        # Check if there are any test files
        test_files = list(Path(test_path).glob("test_*.py"))
        if not test_files:
            print(f"⚠️  No test files found in {test_path}")
            return False

        command = f"python -m pytest {test_path} -v --tb=short"
        return self.run_command(command, f"{category.title()} Tests")

    def run_all_tests(self):
        """Run all test categories."""
        print("🚀 Running All Tests")
        print("=" * 60)

        results = {}

        for category in self.test_categories:
            results[category] = self.run_category_tests(category)

        return results

    def run_coverage_tests(self):
        """Run tests with coverage reporting."""
        command = "python -m pytest tests/ --cov=tradingagents --cov=scripts --cov=examples --cov-report=term-missing --cov-report=html"
        return self.run_command(command, "Coverage Analysis")

    def run_performance_benchmarks(self):
        """Run performance benchmarks."""
        return self.run_category_tests("performance")

    def run_api_health_check(self):
        """Run API health check."""
        api_test_file = "tests/api/test_all_apis.py"

        if os.path.exists(api_test_file):
            command = f"python {api_test_file}"
            return self.run_command(command, "API Health Check")
        else:
            print("⚠️  API test file not found")
            return False

    def generate_report(self, results):
        """Generate test results report."""
        print("\n" + "=" * 70)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 70)

        total_tests = len(results)
        passed_tests = sum(1 for result in results.values() if result)
        failed_tests = total_tests - passed_tests

        print(f"Total Test Categories: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")

        print(f"\n📋 Detailed Results:")
        for category, result in results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"   {category.title():12} {status}")

        if failed_tests == 0:
            print(f"\n🎉 All tests passed! Platform is ready for trading.")
        else:
            print(f"\n⚠️  {failed_tests} test categories failed. Review output above.")

        return failed_tests == 0

    def main(self):
        """Main test runner entry point."""
        parser = argparse.ArgumentParser(
            description="True North Trading Platform Test Runner"
        )
        parser.add_argument(
            "--category",
            choices=list(self.test_categories.keys()) + ["all"],
            default="all",
            help="Test category to run",
        )
        parser.add_argument(
            "--coverage", action="store_true", help="Run with coverage analysis"
        )
        parser.add_argument(
            "--performance", action="store_true", help="Run performance benchmarks only"
        )
        parser.add_argument(
            "--api-check", action="store_true", help="Run API health check only"
        )
        parser.add_argument(
            "--no-deps-check", action="store_true", help="Skip dependency check"
        )

        args = parser.parse_args()

        print("🎯 True North Trading Platform - Test Runner")
        print("=" * 70)

        # Check dependencies unless skipped
        if not args.no_deps_check:
            if not self.check_dependencies():
                print("\n❌ Dependency check failed. Please install missing packages.")
                return 1

        # Handle specific test modes
        if args.api_check:
            success = self.run_api_health_check()
            return 0 if success else 1

        if args.performance:
            success = self.run_performance_benchmarks()
            return 0 if success else 1

        if args.coverage:
            success = self.run_coverage_tests()
            return 0 if success else 1

        # Run specific category or all tests
        if args.category == "all":
            results = self.run_all_tests()
            success = self.generate_report(results)
        else:
            success = self.run_category_tests(args.category)

        return 0 if success else 1


if __name__ == "__main__":
    runner = TestRunner()
    exit_code = runner.main()
    sys.exit(exit_code)
