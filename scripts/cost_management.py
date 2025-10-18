#!/usr/bin/env python3
"""
Cost Management CLI for True North Trading Platform.
Provides tools to monitor, control, and optimize API spending.
"""

import argparse
import sys
import os
from pathlib import Path
from datetime import datetime, timedelta
import json

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from config.cost_profiles import CostProfile, get_cost_manager, COST_PROFILES
from tradingagents.utils.cost_aware_api import get_all_api_stats, print_cost_summary


def show_profiles():
    """Show all available cost profiles."""
    print("💰 Available Cost Profiles")
    print("=" * 50)

    for profile in CostProfile:
        config = COST_PROFILES[profile]
        print(f"\n📊 {profile.value.upper()} Profile")
        print(f"   Budget: ${config.monthly_budget}/month")
        print(f"   Description: {config.description}")

        # Show key features
        enabled_features = [k for k, v in config.features.items() if v]
        disabled_features = [k for k, v in config.features.items() if not v]

        print(f"   ✅ Enabled Features ({len(enabled_features)}):")
        for feature in enabled_features[:3]:  # Show first 3
            print(f"      • {feature.replace('_', ' ').title()}")
        if len(enabled_features) > 3:
            print(f"      • ... and {len(enabled_features) - 3} more")

        if disabled_features:
            print(f"   ❌ Disabled Features ({len(disabled_features)}):")
            for feature in disabled_features[:2]:  # Show first 2
                print(f"      • {feature.replace('_', ' ').title()}")
            if len(disabled_features) > 2:
                print(f"      • ... and {len(disabled_features) - 2} more")

        # Show API limits
        print(f"   🔧 Key API Limits:")
        openai_limits = config.api_limits.get("openai")
        if openai_limits:
            print(
                f"      • OpenAI: {openai_limits.requests_per_day}/day, ${openai_limits.monthly_budget}/mo"
            )

        alpha_limits = config.api_limits.get("alpha_vantage")
        if alpha_limits:
            print(
                f"      • Alpha Vantage: {alpha_limits.requests_per_day}/day, ${alpha_limits.monthly_budget}/mo"
            )


def show_current_status():
    """Show current cost management status."""
    print("📊 Current Cost Management Status")
    print("=" * 50)

    cost_manager = get_cost_manager()
    summary = cost_manager.get_spending_summary()

    print(f"🏷️  Active Profile: {summary['profile'].upper()}")
    print(f"💰 Monthly Budget: ${summary['monthly_budget']:.2f}")
    print(f"💸 Current Spend: ${summary['monthly_spend']:.2f}")
    print(f"📈 Budget Used: {summary['budget_used_percent']:.1f}%")

    # Progress bar
    budget_used = summary["budget_used_percent"]
    bar_length = 30
    filled_length = int(bar_length * budget_used / 100)
    bar = "█" * filled_length + "░" * (bar_length - filled_length)

    if budget_used < 50:
        color = "🟢"
    elif budget_used < 80:
        color = "🟡"
    else:
        color = "🔴"

    print(f"{color} [{bar}] {budget_used:.1f}%")

    # Features status
    print(
        f"\n🔧 Features: {summary['features_enabled']}/{summary['total_features']} enabled"
    )

    # API usage today
    if summary["daily_usage"]:
        print(f"\n📊 Today's API Usage:")
        for api, count in summary["daily_usage"].items():
            limits = cost_manager.get_api_limits(api)
            usage_percent = (count / limits.requests_per_day) * 100

            if usage_percent < 50:
                status = "🟢"
            elif usage_percent < 80:
                status = "🟡"
            else:
                status = "🔴"

            print(
                f"   {status} {api}: {count}/{limits.requests_per_day} ({usage_percent:.1f}%)"
            )

    # Alerts
    alerts = cost_manager.check_spending_alerts()
    if alerts:
        print(f"\n🚨 Alerts:")
        for alert in alerts:
            print(f"   {alert}")
    else:
        print(f"\n✅ No spending alerts")


def switch_profile(profile_name: str):
    """Switch to a different cost profile."""
    try:
        new_profile = CostProfile(profile_name.lower())
        cost_manager = get_cost_manager()
        old_profile = cost_manager.current_profile

        cost_manager.switch_profile(new_profile)

        print(
            f"✅ Successfully switched from {old_profile.value} to {new_profile.value}"
        )
        print(f"💰 New monthly budget: ${cost_manager.config.monthly_budget}")

        # Show what changed
        old_config = COST_PROFILES[old_profile]
        new_config = COST_PROFILES[new_profile]

        old_features = set(k for k, v in old_config.features.items() if v)
        new_features = set(k for k, v in new_config.features.items() if v)

        enabled = new_features - old_features
        disabled = old_features - new_features

        if enabled:
            print(f"🟢 Newly enabled features:")
            for feature in enabled:
                print(f"   • {feature.replace('_', ' ').title()}")

        if disabled:
            print(f"🔴 Newly disabled features:")
            for feature in disabled:
                print(f"   • {feature.replace('_', ' ').title()}")

        # Update .env file
        env_file = Path.cwd() / ".env"
        if env_file.exists():
            # Read current .env
            with open(env_file, "r") as f:
                lines = f.readlines()

            # Update COST_PROFILE line
            updated = False
            for i, line in enumerate(lines):
                if line.startswith("COST_PROFILE="):
                    lines[i] = f"COST_PROFILE={new_profile.value}\n"
                    updated = True
                    break

            # Add if not found
            if not updated:
                lines.append(f"COST_PROFILE={new_profile.value}\n")

            # Write back
            with open(env_file, "w") as f:
                f.writelines(lines)

            print(f"📝 Updated .env file with new profile")

    except ValueError:
        print(f"❌ Invalid profile '{profile_name}'. Available profiles:")
        for profile in CostProfile:
            print(f"   • {profile.value}")
        sys.exit(1)


def show_api_stats():
    """Show detailed API usage statistics."""
    print("📊 API Usage Statistics")
    print("=" * 50)

    stats = get_all_api_stats()

    if not stats:
        print("No API usage recorded yet.")
        return

    # Show cost summary first
    if "cost_summary" in stats:
        summary = stats["cost_summary"]
        print(f"💰 Total Monthly Spend: ${summary.get('monthly_spend', 0):.2f}")
        print(f"📊 Budget: ${summary.get('monthly_budget', 0):.2f}")
        print()

    # Show individual API stats
    for api_name, api_stats in stats.items():
        if api_name == "cost_summary":
            continue

        print(f"🔧 {api_name.upper()} API:")
        print(f"   Requests: {api_stats['total_requests']}")
        print(f"   Total Cost: ${api_stats['total_cost']:.4f}")
        print(f"   Avg Cost: ${api_stats['average_cost']:.4f}")

        if api_stats["last_request"]:
            last_request = datetime.fromisoformat(api_stats["last_request"])
            time_ago = datetime.now() - last_request
            if time_ago.days > 0:
                print(f"   Last Used: {time_ago.days} days ago")
            elif time_ago.seconds > 3600:
                print(f"   Last Used: {time_ago.seconds // 3600} hours ago")
            else:
                print(f"   Last Used: {time_ago.seconds // 60} minutes ago")

        # Rate limit status
        rate_status = api_stats["rate_limit_status"]
        print(f"   Rate Limits:")
        print(
            f"     • Per minute: {rate_status['current_minute_usage']}/{rate_status['requests_per_minute']}"
        )
        print(
            f"     • Per day: {rate_status['current_daily_usage']}/{rate_status['requests_per_day']}"
        )
        print()


def estimate_operation_cost(operation: str):
    """Estimate cost for a specific operation."""
    cost_manager = get_cost_manager()

    operations = {
        "stock_analysis": "Analysis of a single stock",
        "portfolio_analysis": "Full portfolio analysis",
        "multi_agent_debate": "Multi-agent trading debate",
        "backtesting": "Backtesting strategy",
        "real_time_monitoring": "Real-time monitoring (per hour)",
    }

    if operation not in operations:
        print(f"❌ Unknown operation '{operation}'. Available operations:")
        for op, desc in operations.items():
            print(f"   • {op}: {desc}")
        return

    cost = cost_manager.get_cost_estimate(operation)

    print(f"💰 Cost Estimate for '{operation}'")
    print(f"   Operation: {operations[operation]}")
    print(f"   Profile: {cost_manager.current_profile.value}")
    print(f"   Estimated Cost: ${cost:.4f}")

    # Show how many operations fit in budget
    remaining_budget = cost_manager.config.monthly_budget - cost_manager.monthly_spend
    operations_possible = int(remaining_budget / cost) if cost > 0 else float("inf")

    print(f"   Remaining Budget: ${remaining_budget:.2f}")
    if operations_possible == float("inf"):
        print(f"   Operations Possible: Unlimited (free operation)")
    else:
        print(f"   Operations Possible: {operations_possible}")


def export_usage_report(output_file: str):
    """Export usage report to JSON file."""
    stats = get_all_api_stats()
    cost_manager = get_cost_manager()

    report = {
        "generated_at": datetime.now().isoformat(),
        "profile": cost_manager.current_profile.value,
        "cost_summary": cost_manager.get_spending_summary(),
        "api_stats": stats,
        "alerts": cost_manager.check_spending_alerts(),
    }

    with open(output_file, "w") as f:
        json.dump(report, f, indent=2, default=str)

    print(f"📄 Usage report exported to {output_file}")


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description="True North Trading Platform - Cost Management CLI"
    )

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Show profiles command
    subparsers.add_parser("profiles", help="Show all available cost profiles")

    # Show status command
    subparsers.add_parser("status", help="Show current cost management status")

    # Switch profile command
    switch_parser = subparsers.add_parser(
        "switch", help="Switch to a different cost profile"
    )
    switch_parser.add_argument(
        "profile", choices=[p.value for p in CostProfile], help="Profile to switch to"
    )

    # API stats command
    subparsers.add_parser("stats", help="Show detailed API usage statistics")

    # Estimate cost command
    estimate_parser = subparsers.add_parser(
        "estimate", help="Estimate cost for an operation"
    )
    estimate_parser.add_argument("operation", help="Operation to estimate")

    # Export report command
    export_parser = subparsers.add_parser("export", help="Export usage report to JSON")
    export_parser.add_argument(
        "--output", "-o", default="usage_report.json", help="Output file path"
    )

    # Summary command (default)
    subparsers.add_parser("summary", help="Show cost summary (default)")

    args = parser.parse_args()

    # Default to summary if no command
    if not args.command:
        args.command = "summary"

    try:
        if args.command == "profiles":
            show_profiles()
        elif args.command == "status":
            show_current_status()
        elif args.command == "switch":
            switch_profile(args.profile)
        elif args.command == "stats":
            show_api_stats()
        elif args.command == "estimate":
            estimate_operation_cost(args.operation)
        elif args.command == "export":
            export_usage_report(args.output)
        elif args.command == "summary":
            print_cost_summary()
        else:
            parser.print_help()

    except KeyboardInterrupt:
        print("\n👋 Goodbye!")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
