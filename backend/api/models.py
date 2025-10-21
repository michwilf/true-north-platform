"""
Pydantic models for API request/response validation.
"""

from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class MarketRegime(BaseModel):
    """Market regime analysis response."""

    regime: str
    trend: str
    sentiment: str
    strategy: str
    confidence: float


class Opportunity(BaseModel):
    """Trading opportunity response."""

    symbol: str
    title: str
    score: float
    reasoning: str
    entry_price: Optional[float] = None
    target_price: Optional[float] = None
    stop_loss: Optional[float] = None
    timeframe: str
    risk_level: str


class TraderSignal(BaseModel):
    """Trader signal response."""

    id: str
    trader_name: str
    symbol: str
    action: str
    confidence: float
    entry_price: Optional[float] = None
    time: datetime
    platform: str


class Alert(BaseModel):
    """Alert/notification response."""

    id: str
    title: str
    message: str
    severity: str
    timestamp: datetime
    symbol: Optional[str] = None


class PortfolioMetrics(BaseModel):
    """Portfolio performance metrics response."""

    total_value: float
    daily_pnl: float
    daily_pnl_percent: float
    active_positions: int
    win_rate: float
    total_trades: int


class StockAnalysisRequest(BaseModel):
    """Request for stock analysis."""

    symbol: str
    analysis_type: Optional[str] = "comprehensive"


class AgentAnalysis(BaseModel):
    """Individual agent analysis."""

    agent_name: str
    recommendation: str
    confidence: float
    reasoning: str
    key_points: List[str]
    source_data: Optional[Dict[str, Any]] = None


class StockAnalysisResponse(BaseModel):
    """Comprehensive stock analysis response."""

    symbol: str
    overall_recommendation: str
    confidence: float
    target_price: float
    stop_loss: float
    timeframe: str
    analysis_timestamp: str
    agents: List[AgentAnalysis]
    debate_summary: Optional[str] = None
    bull_case_price: Optional[float] = None
    base_case_price: Optional[float] = None
    bear_case_price: Optional[float] = None
