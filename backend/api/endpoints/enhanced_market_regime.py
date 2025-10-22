"""
Enhanced Market Regime Analysis Endpoint
Multi-agent deep analysis of market conditions
"""

from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from typing import Dict, Any, Optional
from pydantic import BaseModel
import asyncio

from backend.api.dependencies import get_discovery_engine, get_cache_manager
from backend.core.discovery import EnhancedDiscoveryEngine
from backend.core.cache_manager import CacheManager
from backend.core.trading_agents.market_regime_agents import (
    MacroEconomistAgent,
    MarketTechnicianAgent,
    SentimentAnalystAgent,
    MarketRegimeSynthesizer,
)

router = APIRouter(prefix="/api", tags=["enhanced_market_regime"])


class AgentPerspective(BaseModel):
    """Individual agent's analysis."""
    agent_name: str
    analysis: str
    confidence: float
    key_insights: Dict[str, Any]


class EnhancedMarketRegimeResponse(BaseModel):
    """Response from enhanced market regime analysis."""
    
    # Executive Summary
    executive_summary: str
    overall_confidence: float
    recommended_positioning: str  # OFFENSIVE, DEFENSIVE, BALANCED
    
    # Raw regime data
    current_regime: Dict[str, Any]
    
    # Agent analyses
    macro_analysis: AgentPerspective
    technical_analysis: AgentPerspective
    sentiment_analysis: AgentPerspective
    
    # Synthesis
    full_synthesis: str
    key_themes: list
    
    # Recommendations
    recommended_allocation: Dict[str, str]
    sector_recommendations: Dict[str, list]
    actionable_steps: list
    risk_factors: list
    
    # Metadata
    analysis_timestamp: str
    cached: bool = False


@router.get("/enhanced-market-regime", response_model=EnhancedMarketRegimeResponse)
async def get_enhanced_market_regime(
    discovery_engine: EnhancedDiscoveryEngine = Depends(get_discovery_engine),
    cache: CacheManager = Depends(get_cache_manager),
):
    """
    Get deep multi-agent analysis of current market regime.
    
    This endpoint provides comprehensive market analysis from three specialist agents:
    - **Macro Economist**: Fed policy, interest rates, economic cycle
    - **Market Technician**: VIX, trends, breadth, support/resistance
    - **Sentiment Analyst**: Fear/greed, positioning, contrarian signals
    
    **Example Use Cases:**
    - "Should I be bullish or bearish right now?"
    - "How should I allocate my portfolio given current conditions?"
    - "What are the key risks I should watch?"
    
    **Performance:** First call takes ~15 seconds (3 LLM calls), then cached for 1 hour.
    """
    cache_key = "enhanced_market_regime"
    
    # Try cache first
    if cache:
        cached_data = cache.get(cache_key)
        if cached_data:
            print(f"✅ Serving enhanced market regime from cache")
            cached_data['cached'] = True
            return EnhancedMarketRegimeResponse(**cached_data)
    
    print(f"\n{'='*80}")
    print("🌍 ENHANCED MARKET REGIME ANALYSIS INITIATED")
    print(f"{'='*80}\n")
    
    start_time = datetime.now()
    
    try:
        # Step 1: Get basic regime data
        print("📊 Step 1: Fetching market regime data...")
        regime_data = await discovery_engine.regime_detector.detect_market_regime()
        
        print(f"   Current Regime: {regime_data.get('volatility_regime', 'UNKNOWN')}")
        print(f"   Market Trend: {regime_data.get('market_trend', 'UNKNOWN')}")
        print(f"   VIX Level: {regime_data.get('vix_level', 'N/A')}")
        
        # Step 2: Initialize agents
        print(f"\n🤖 Step 2: Launching 3 specialist agents...")
        macro_agent = MacroEconomistAgent()
        technical_agent = MarketTechnicianAgent()
        sentiment_agent = SentimentAnalystAgent()
        synthesizer = MarketRegimeSynthesizer()
        
        # Step 3: Run agents in parallel for speed
        print(f"   [1/3] Macro Economist analyzing Fed policy, rates, yields...")
        print(f"   [2/3] Market Technician analyzing VIX, trends, breadth...")
        print(f"   [3/3] Sentiment Analyst analyzing fear/greed, positioning...")
        
        # Run all three agents concurrently
        macro_result, technical_result, sentiment_result = await asyncio.gather(
            macro_agent.analyze(regime_data),
            technical_agent.analyze(regime_data),
            sentiment_agent.analyze(regime_data),
        )
        
        print(f"   ✅ All agents completed analysis")
        
        # Step 4: Synthesize into final report
        print(f"\n🔬 Step 3: Synthesizing multi-agent insights...")
        synthesis = await synthesizer.synthesize(
            macro_result,
            technical_result,
            sentiment_result,
            regime_data
        )
        
        # Step 5: Build response
        print(f"\n📋 Step 4: Building comprehensive report...")
        
        # Extract recommendations
        recommended_allocation = macro_result.get('recommended_allocation', {
            'equities': '60%',
            'fixed_income': '25%',
            'cash': '10%',
            'alternatives': '5%'
        })
        
        # Get sector recommendations from strategy
        strategy = regime_data.get('recommended_strategy', 'BALANCED_DIVERSIFIED')
        sector_recommendations = _get_sector_recommendations(strategy)
        
        # Extract actionable steps from synthesis
        actionable_steps = _extract_actionable_steps(synthesis['full_synthesis'])
        
        # Extract risk factors
        risk_factors = _extract_risk_factors(
            macro_result['analysis'],
            technical_result['analysis'],
            sentiment_result['analysis']
        )
        
        response_data = {
            "executive_summary": synthesis['executive_summary'],
            "overall_confidence": synthesis['overall_confidence'],
            "recommended_positioning": synthesis['recommended_positioning'],
            "current_regime": {
                "volatility_regime": regime_data.get('volatility_regime', 'UNKNOWN'),
                "market_trend": regime_data.get('market_trend', 'UNKNOWN'),
                "risk_sentiment": regime_data.get('risk_sentiment', 'NEUTRAL'),
                "vix_level": regime_data.get('vix_level'),
                "spy_vs_sma": regime_data.get('spy_vs_sma'),
                "yield_10y": regime_data.get('yield_10y'),
                "yield_change_5d": regime_data.get('yield_change_5d'),
            },
            "macro_analysis": AgentPerspective(
                agent_name=macro_result['agent_name'],
                analysis=macro_result['analysis'],
                confidence=macro_result['confidence'],
                key_insights={
                    "key_themes": macro_result.get('key_themes', []),
                    "recommended_allocation": macro_result.get('recommended_allocation', {}),
                }
            ),
            "technical_analysis": AgentPerspective(
                agent_name=technical_result['agent_name'],
                analysis=technical_result['analysis'],
                confidence=technical_result['confidence'],
                key_insights={
                    "trend_strength": technical_result.get('trend_strength', 'UNKNOWN'),
                    "volatility_assessment": technical_result.get('volatility_assessment', 'UNKNOWN'),
                    "trading_bias": technical_result.get('trading_bias', 'NEUTRAL'),
                }
            ),
            "sentiment_analysis": AgentPerspective(
                agent_name=sentiment_result['agent_name'],
                analysis=sentiment_result['analysis'],
                confidence=sentiment_result['confidence'],
                key_insights={
                    "sentiment_score": sentiment_result.get('sentiment_score', 50),
                    "sentiment_label": sentiment_result.get('sentiment_label', 'NEUTRAL'),
                    "contrarian_signal": sentiment_result.get('contrarian_signal', 'NONE'),
                    "crowd_positioning": sentiment_result.get('crowd_positioning', 'BALANCED'),
                }
            ),
            "full_synthesis": synthesis['full_synthesis'],
            "key_themes": synthesis.get('key_themes', []),
            "recommended_allocation": recommended_allocation,
            "sector_recommendations": sector_recommendations,
            "actionable_steps": actionable_steps,
            "risk_factors": risk_factors,
            "analysis_timestamp": datetime.now().isoformat(),
            "cached": False,
        }
        
        # Cache for 1 hour (market regime doesn't change that fast)
        if cache:
            cache.set(cache_key, response_data, ttl=3600)
        
        end_time = datetime.now()
        execution_time = (end_time - start_time).total_seconds()
        
        print(f"\n{'='*80}")
        print("✅ ENHANCED MARKET REGIME ANALYSIS COMPLETE")
        print(f"📈 Regime: {response_data['current_regime']['volatility_regime']} / {response_data['current_regime']['market_trend']}")
        print(f"🎯 Positioning: {response_data['recommended_positioning']}")
        print(f"💡 Confidence: {response_data['overall_confidence']:.0%}")
        print(f"⏱️  Execution Time: {execution_time:.1f}s")
        print(f"{'='*80}\n")
        
        return EnhancedMarketRegimeResponse(**response_data)
        
    except Exception as e:
        print(f"❌ Error in enhanced market regime analysis: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing market regime: {str(e)}"
        )


def _get_sector_recommendations(strategy: str) -> Dict[str, list]:
    """Get sector recommendations based on strategy."""
    strategies = {
        "GROWTH_MOMENTUM": {
            "overweight": ["Technology", "Consumer Discretionary", "Communication Services"],
            "neutral": ["Healthcare", "Industrials", "Financials"],
            "underweight": ["Utilities", "Consumer Staples", "Real Estate"]
        },
        "DEFENSIVE_VALUE": {
            "overweight": ["Utilities", "Consumer Staples", "Healthcare"],
            "neutral": ["Financials", "Energy", "Materials"],
            "underweight": ["Technology", "Consumer Discretionary", "Communication Services"]
        },
        "CONTRARIAN_QUALITY": {
            "overweight": ["Healthcare", "Financials", "Quality Tech"],
            "neutral": ["Consumer Staples", "Industrials"],
            "underweight": ["Speculative Growth", "High Beta Sectors"]
        },
        "BALANCED_DIVERSIFIED": {
            "overweight": ["Technology", "Healthcare", "Financials"],
            "neutral": ["Consumer Discretionary", "Industrials", "Energy"],
            "underweight": ["Utilities", "Real Estate"]
        }
    }
    
    return strategies.get(strategy, strategies["BALANCED_DIVERSIFIED"])


def _extract_actionable_steps(synthesis_text: str) -> list:
    """Extract actionable recommendations from synthesis."""
    steps = []
    
    # Look for numbered lists or bullet points in the synthesis
    lines = synthesis_text.split('\n')
    in_recommendations = False
    
    for line in lines:
        if 'actionable' in line.lower() or 'recommendation' in line.lower():
            in_recommendations = True
            continue
        
        if in_recommendations:
            line = line.strip()
            if line and (line[0].isdigit() or line.startswith('-') or line.startswith('•')):
                # Clean up the line
                clean_line = line.lstrip('0123456789.-•) ').strip()
                if clean_line and len(clean_line) > 10:  # Avoid very short items
                    steps.append(clean_line)
                    
            if len(steps) >= 5:  # Cap at 5 steps
                break
    
    # If no steps found, provide defaults
    if not steps:
        steps = [
            "Review portfolio allocation against recommended positioning",
            "Adjust sector weights based on current market regime",
            "Set appropriate stop losses given volatility environment",
            "Monitor key technical levels mentioned in analysis",
            "Watch risk factors identified by agents"
        ]
    
    return steps[:5]


def _extract_risk_factors(macro_text: str, technical_text: str, sentiment_text: str) -> list:
    """Extract top risk factors from agent analyses."""
    risks = []
    
    # Common risk keywords
    risk_keywords = [
        'recession', 'inflation', 'fed', 'geopolitical', 'volatility',
        'valuation', 'earnings', 'credit', 'liquidity', 'leverage',
        'regulatory', 'political', 'rate', 'yield curve'
    ]
    
    combined_text = f"{macro_text} {technical_text} {sentiment_text}".lower()
    
    for keyword in risk_keywords:
        if keyword in combined_text:
            # Try to extract context around the keyword
            if keyword == 'recession':
                risks.append("Recession risk - Monitor economic indicators")
            elif keyword == 'inflation':
                risks.append("Inflation concerns - Watch CPI/PPI data")
            elif keyword == 'fed':
                risks.append("Fed policy uncertainty - FOMC decisions critical")
            elif keyword == 'geopolitical':
                risks.append("Geopolitical tensions - Global risk events")
            elif keyword == 'volatility' and 'high' in combined_text:
                risks.append("Elevated volatility - Expect larger price swings")
            elif keyword == 'valuation' and ('high' in combined_text or 'expensive' in combined_text):
                risks.append("Valuation concerns - Limited upside at current multiples")
    
    # If no risks found, add generic ones
    if not risks:
        risks = [
            "Market uncertainty - Monitor key developments",
            "Volatility risk - Prepare for potential swings",
            "Economic data - Watch for surprises"
        ]
    
    return list(set(risks))[:5]  # Remove duplicates, max 5

