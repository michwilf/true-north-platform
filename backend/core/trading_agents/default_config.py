import os
import sys
from pathlib import Path

# Add config directory to path for cost profiles
# Go up to backend/ directory, then to config/
config_dir = Path(__file__).parent.parent.parent / "config"
if str(config_dir) not in sys.path:
    sys.path.insert(0, str(config_dir))

try:
    from cost_profiles import get_cost_manager, CostProfile

    COST_MANAGEMENT_AVAILABLE = True
except ImportError:
    COST_MANAGEMENT_AVAILABLE = False
    print("⚠️  Cost management not available. Using default settings.")


def get_cost_aware_config():
    """Get configuration adjusted for current cost profile."""
    if not COST_MANAGEMENT_AVAILABLE:
        return {}

    cost_manager = get_cost_manager()
    profile = cost_manager.current_profile

    # Adjust settings based on cost profile
    if profile == CostProfile.LEAN:
        return {
            "deep_think_llm": "gpt-4o-mini",  # Use cheaper model
            "quick_think_llm": "gpt-4o-mini",
            "max_debate_rounds": 0,  # Disable expensive debates
            "max_risk_discuss_rounds": 0,
            "max_recur_limit": 10,  # Reduce recursion
        }
    elif profile == CostProfile.STANDARD:
        return {
            "deep_think_llm": "gpt-4o-mini",  # Still use efficient model
            "quick_think_llm": "gpt-4o-mini",
            "max_debate_rounds": 1,  # Limited debates
            "max_risk_discuss_rounds": 1,
            "max_recur_limit": 50,
        }
    elif profile == CostProfile.PRO:
        return {
            "deep_think_llm": "o1-preview",  # Use premium models
            "quick_think_llm": "gpt-4o",
            "max_debate_rounds": 3,  # Full debates
            "max_risk_discuss_rounds": 2,
            "max_recur_limit": 100,
        }

    return {}


# Base configuration
BASE_CONFIG = {
    "project_dir": os.path.abspath(os.path.join(os.path.dirname(__file__), ".")),
    "results_dir": os.getenv("TRADINGAGENTS_RESULTS_DIR", "./results"),
    "data_dir": os.getenv("TRADINGAGENTS_DATA_DIR", "./data"),
    "data_cache_dir": os.path.join(
        os.path.abspath(os.path.join(os.path.dirname(__file__), ".")),
        "dataflows/data_cache",
    ),
    # LLM settings (will be overridden by cost profile)
    "llm_provider": "openai",
    "deep_think_llm": "gpt-4o-mini",
    "quick_think_llm": "gpt-4o-mini",
    "backend_url": "https://api.openai.com/v1",
    # Debate and discussion settings (will be overridden by cost profile)
    "max_debate_rounds": 1,
    "max_risk_discuss_rounds": 1,
    "max_recur_limit": 100,
    # Cost management settings
    "cost_profile": os.getenv("COST_PROFILE", "standard"),
    "enable_cost_controls": os.getenv("ENABLE_COST_CONTROLS", "true").lower() == "true",
    "max_daily_api_cost": float(os.getenv("MAX_DAILY_API_COST", "10.0")),
    # Data vendor configuration
    # Category-level configuration (default for all tools in category)
    "data_vendors": {
        "core_stock_apis": "yfinance",  # Options: yfinance, alpha_vantage, local
        "technical_indicators": "yfinance",  # Options: yfinance, alpha_vantage, local
        "fundamental_data": "alpha_vantage",  # Options: openai, alpha_vantage, local
        "news_data": "alpha_vantage",  # Options: openai, alpha_vantage, google, local
    },
    # Tool-level configuration (takes precedence over category-level)
    "tool_vendors": {
        # Example: "get_stock_data": "alpha_vantage",  # Override category default
        # Example: "get_news": "openai",               # Override category default
    },
}


# Create the final configuration by merging base config with cost-aware overrides
def create_default_config():
    """Create the default configuration with cost profile adjustments."""
    config = BASE_CONFIG.copy()

    # Apply cost-aware overrides
    cost_overrides = get_cost_aware_config()
    config.update(cost_overrides)

    return config


# Export the final configuration
DEFAULT_CONFIG = create_default_config()


def get_config_for_profile(profile_name: str):
    """Get configuration for a specific cost profile."""
    if not COST_MANAGEMENT_AVAILABLE:
        return BASE_CONFIG.copy()

    from cost_profiles import CostProfile, COST_PROFILES

    try:
        profile = CostProfile(profile_name.lower())
    except ValueError:
        return BASE_CONFIG.copy()

    config = BASE_CONFIG.copy()

    # Apply profile-specific overrides directly
    if profile == CostProfile.LEAN:
        config.update(
            {
                "deep_think_llm": "gpt-4o-mini",
                "quick_think_llm": "gpt-4o-mini",
                "max_debate_rounds": 0,
                "max_risk_discuss_rounds": 0,
                "max_recur_limit": 10,
            }
        )
    elif profile == CostProfile.STANDARD:
        config.update(
            {
                "deep_think_llm": "gpt-4o-mini",
                "quick_think_llm": "gpt-4o-mini",
                "max_debate_rounds": 1,
                "max_risk_discuss_rounds": 1,
                "max_recur_limit": 50,
            }
        )
    elif profile == CostProfile.PRO:
        config.update(
            {
                "deep_think_llm": "o1-preview",
                "quick_think_llm": "gpt-4o",
                "max_debate_rounds": 3,
                "max_risk_discuss_rounds": 2,
                "max_recur_limit": 100,
            }
        )

    return config


def print_config_comparison():
    """Print a comparison of configurations across cost profiles."""
    if not COST_MANAGEMENT_AVAILABLE:
        print("Cost management not available for comparison.")
        return

    print("🔧 Configuration Comparison Across Cost Profiles")
    print("=" * 60)

    profiles = ["lean", "standard", "pro"]
    configs = {profile: get_config_for_profile(profile) for profile in profiles}

    # Compare key settings
    key_settings = [
        "deep_think_llm",
        "quick_think_llm",
        "max_debate_rounds",
        "max_risk_discuss_rounds",
        "max_recur_limit",
    ]

    for setting in key_settings:
        print(f"\n📊 {setting}:")
        for profile in profiles:
            value = configs[profile].get(setting, "N/A")
            print(f"   {profile.upper():8}: {value}")


if __name__ == "__main__":
    # Demo the cost-aware configuration
    print("🔧 Cost-Aware Configuration Demo")
    print("=" * 50)

    if COST_MANAGEMENT_AVAILABLE:
        cost_manager = get_cost_manager()
        print(f"Current Profile: {cost_manager.current_profile.value}")
        print(f"Monthly Budget: ${cost_manager.config.monthly_budget}")

        print(f"\nCurrent Configuration:")
        for key, value in DEFAULT_CONFIG.items():
            if key in [
                "deep_think_llm",
                "quick_think_llm",
                "max_debate_rounds",
                "max_risk_discuss_rounds",
            ]:
                print(f"   {key}: {value}")

        print_config_comparison()
    else:
        print("Cost management not available. Using base configuration.")
        print(f"LLM Model: {DEFAULT_CONFIG['deep_think_llm']}")
        print(f"Debate Rounds: {DEFAULT_CONFIG['max_debate_rounds']}")
