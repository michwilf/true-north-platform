#!/usr/bin/env python3
"""
Update .env file with all API credentials for True North Trading Platform
"""

import os


def update_env_file():
    """Update the .env file with all API credentials."""

    # API credentials
    credentials = {
        # Core TradingAgents
        "OPENAI_API_KEY": "your_openai_key_here",
        "ALPHA_VANTAGE_API_KEY": "your_alpha_vantage_key_here",
        # Social Media APIs
        "TWITTER_BEARER_TOKEN": "AAAAAAAAAAAAAAAAAAAAAJGa4wEAAAAA6tTPikcNI65Yb3k%2Fq2O%2BRcALOkM%3DvWgmawFuMfw3HPz5ViJo4MFXfAO5xYWHYKeIEKsG8G2AosYFsl",
        "TWITTER_USER_ID": "z8Vaj5BucQx5nsniIXRKu2USs",
        # Reddit API
        "REDDIT_CLIENT_ID": "t6jBQY92KewSIOGwXvZ7TQ",
        "REDDIT_CLIENT_SECRET": "kX-fSoowZn89JWkVNFEp1VrOQi2O9A",
        "REDDIT_USER_AGENT": "true-north-trading/1.0 by /u/Intelligent-Print-39",
        # Optional Enhanced APIs
        "POLYGON_API_KEY": "your_polygon_key_here",
        "NEWS_API_KEY": "your_news_api_key_here",
        # Database and Storage
        "DATABASE_URL": "sqlite:///true_north_trading.db",
        "REDIS_URL": "redis://localhost:6379",
        # Security
        "SECRET_KEY": "your-secret-key-for-sessions",
        "JWT_SECRET": "your-jwt-secret-key",
        # Environment
        "ENVIRONMENT": "development",
        "DEBUG": "True",
        "LOG_LEVEL": "INFO",
    }

    env_content = []
    env_content.append("# True North Trading Platform - Environment Variables")
    env_content.append("# Generated automatically - DO NOT commit to version control!")
    env_content.append("")

    env_content.append(
        "# ============================================================================="
    )
    env_content.append("# CORE TRADING AGENTS APIS (Required)")
    env_content.append(
        "# ============================================================================="
    )
    env_content.append(f"OPENAI_API_KEY={credentials['OPENAI_API_KEY']}")
    env_content.append(f"ALPHA_VANTAGE_API_KEY={credentials['ALPHA_VANTAGE_API_KEY']}")
    env_content.append("")

    env_content.append(
        "# ============================================================================="
    )
    env_content.append("# SOCIAL MEDIA APIS (Working)")
    env_content.append(
        "# ============================================================================="
    )
    env_content.append(f"TWITTER_BEARER_TOKEN={credentials['TWITTER_BEARER_TOKEN']}")
    env_content.append(f"TWITTER_USER_ID={credentials['TWITTER_USER_ID']}")
    env_content.append("")
    env_content.append(f"REDDIT_CLIENT_ID={credentials['REDDIT_CLIENT_ID']}")
    env_content.append(f"REDDIT_CLIENT_SECRET={credentials['REDDIT_CLIENT_SECRET']}")
    env_content.append(f"REDDIT_USER_AGENT={credentials['REDDIT_USER_AGENT']}")
    env_content.append("")

    env_content.append(
        "# ============================================================================="
    )
    env_content.append("# ENHANCED DATA SOURCES (Optional - Add when ready)")
    env_content.append(
        "# ============================================================================="
    )
    env_content.append(f"POLYGON_API_KEY={credentials['POLYGON_API_KEY']}")
    env_content.append(f"NEWS_API_KEY={credentials['NEWS_API_KEY']}")
    env_content.append("")

    env_content.append(
        "# ============================================================================="
    )
    env_content.append("# DATABASE AND STORAGE")
    env_content.append(
        "# ============================================================================="
    )
    env_content.append(f"DATABASE_URL={credentials['DATABASE_URL']}")
    env_content.append(f"REDIS_URL={credentials['REDIS_URL']}")
    env_content.append("")

    env_content.append(
        "# ============================================================================="
    )
    env_content.append("# SECURITY AND ENVIRONMENT")
    env_content.append(
        "# ============================================================================="
    )
    env_content.append(f"SECRET_KEY={credentials['SECRET_KEY']}")
    env_content.append(f"JWT_SECRET={credentials['JWT_SECRET']}")
    env_content.append(f"ENVIRONMENT={credentials['ENVIRONMENT']}")
    env_content.append(f"DEBUG={credentials['DEBUG']}")
    env_content.append(f"LOG_LEVEL={credentials['LOG_LEVEL']}")
    env_content.append("")

    env_content.append(
        "# ============================================================================="
    )
    env_content.append("# COST PROFILE SETTINGS")
    env_content.append(
        "# ============================================================================="
    )
    env_content.append("COST_PROFILE=standard  # Options: lean, standard, pro")
    env_content.append("MAX_DAILY_API_COST=50.00  # USD limit for API calls")
    env_content.append("RATE_LIMIT_REQUESTS_PER_MINUTE=60")
    env_content.append("")

    # Write to .env file
    env_path = "/Users/MikeyW/true-north-trading/.env"

    with open(env_path, "w") as f:
        f.write("\n".join(env_content))

    print("✅ Updated .env file with all API credentials!")
    print(f"📁 Location: {env_path}")
    print("\n🔑 API Status:")
    print("✅ Twitter Bearer Token - WORKING")
    print("✅ Reddit API Credentials - READY")
    print("⚠️  OpenAI API Key - NEEDS YOUR KEY")
    print("⚠️  Alpha Vantage API Key - NEEDS YOUR KEY")
    print("⚠️  Polygon API Key - OPTIONAL ($199/mo)")
    print("⚠️  News API Key - OPTIONAL ($449+/mo)")

    print("\n🚀 Next Steps:")
    print("1. Add your OpenAI API key")
    print("2. Add your Alpha Vantage API key (free tier available)")
    print("3. Test the TradingAgents CLI: python -m cli.main")
    print("4. Run social sentiment analysis with working APIs")


if __name__ == "__main__":
    update_env_file()
