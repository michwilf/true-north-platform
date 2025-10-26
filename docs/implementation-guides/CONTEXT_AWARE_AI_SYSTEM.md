# 🎯 Context-Aware AI Analysis System

## Overview

The AI analysis system is now **context-aware** - it knows what page you're on, what panel you're analyzing, and routes to the appropriate workflow based on context type.

---

## 🔄 **How Context Flows Through the System**

```
Frontend Button Click
    ↓ (passes context object)
Backend `/api/analyze-contextual-stream`
    ↓ (routes based on context.type)
Specialized Analysis Workflow
    ↓ (streams back results)
Frontend Drawer Display
```

---

## 📦 **Context Object Structure**

```typescript
interface AnalysisContext {
  type: "stock" | "portfolio" | "market" | "opportunity" | "trader" | "sector" | "alert";
  symbol?: string;           // e.g., "AAPL", "SPY"
  page?: string;             // e.g., "market-regime", "opportunities"
  panel?: string;            // e.g., "regime-overview", "opportunity-card"
  data?: Record<string, any>; // Page-specific data
}
```

---

## 🎨 **Context Examples by Page**

### **1. Market Regime Page**
```typescript
const context = {
  type: "market",
  symbol: "SPY",
  page: "market-regime",
  panel: "regime-overview",
  data: {
    volatility_regime: "HIGH_VOLATILITY",
    market_trend: "BEARISH",
    risk_sentiment: "RISK_OFF",
    vix_level: 28.5,
    spy_trend: -5.2,
  },
};
```

**Triggers**: Macro Economist, Market Technician, Risk Analyst, Sentiment Analyst  
**Focus**: Fed policy, yields, VIX, market breadth, sentiment indicators  
**Output**: RISK_ON/RISK_OFF/NEUTRAL recommendation

---

### **2. Opportunities Page (Stock Card)**
```typescript
const context = {
  type: "opportunity",
  symbol: "TSLA",
  page: "opportunities",
  panel: "opportunity-card",
  data: {
    risk_level: "HIGH",
    opportunity_score: 8.5,
    category: "SWING",
    social_buzz: true,
    reddit_mentions: 450,
  },
};
```

**Triggers**: Standard multi-agent stock analysis  
**Focus**: Price action, social sentiment, fundamentals, news  
**Output**: BUY/SELL/HOLD with price targets

---

### **3. Traders Page (Trader Card)**
```typescript
const context = {
  type: "trader",
  symbol: null, // Not needed
  page: "traders",
  panel: "trader-card",
  data: {
    trader_id: "wallstreetbets_mod",
    trader_name: "u/DeepF*ckingValue",
    win_rate: 0.75,
    avg_return: 0.45,
    strategy: "momentum",
    recent_trades: ["GME", "AMC"],
  },
};
```

**Triggers**: Trader Strategy Analyzer  
**Focus**: Performance history, strategy consistency, risk profile  
**Output**: Trader evaluation and follow recommendation

---

### **4. Portfolio Page (Full Portfolio)**
```typescript
const context = {
  type: "portfolio",
  symbol: null,
  page: "portfolio",
  panel: "portfolio-overview",
  data: {
    total_value: 250000,
    holdings: [
      { symbol: "AAPL", shares: 100, value: 17500 },
      { symbol: "MSFT", shares: 50, value: 20000 },
      // ... more holdings
    ],
    allocation: { tech: 0.45, finance: 0.20, healthcare: 0.15 },
    risk_score: 7.2,
  },
};
```

**Triggers**: Portfolio Analyzer, Risk Analyst, Performance Analyst  
**Focus**: Diversification, correlation, sector allocation, risk metrics  
**Output**: Portfolio health, rebalancing suggestions, risk assessment

---

### **5. Sectors Page (Sector Card)**
```typescript
const context = {
  type: "sector",
  symbol: "XLK", // Tech ETF
  page: "sectors",
  panel: "sector-card",
  data: {
    sector: "Technology",
    ytd_return: 0.28,
    rotation_score: 8.5,
    top_stocks: ["AAPL", "MSFT", "NVDA"],
  },
};
```

**Triggers**: Sector Analyst, Rotation Tracker  
**Focus**: Sector rotation signals, relative strength, top performers  
**Output**: Sector attractiveness, rotation signals, stock picks

---

### **6. Monitoring Page (Alert)**
```typescript
const context = {
  type: "alert",
  symbol: "NVDA",
  page: "monitoring",
  panel: "alert-row",
  data: {
    alert_type: "PRICE_SPIKE",
    trigger_price: 450.00,
    current_price: 455.00,
    change_percent: 5.2,
    volume_surge: true,
  },
};
```

**Triggers**: Alert-focused analysis  
**Focus**: Why alert triggered, continuation probability, action needed  
**Output**: Alert validation and next action recommendation

---

### **7. Analyze Page (User Input)**
```typescript
const context = {
  type: "stock",
  symbol: userInput, // e.g., "COIN"
  page: "analyze",
  panel: "analysis-form",
  data: {
    user_requested: true,
    timestamp: new Date().toISOString(),
  },
};
```

**Triggers**: Full multi-agent stock analysis  
**Focus**: Complete deep dive on requested symbol  
**Output**: Comprehensive analysis with all agents

---

## 🔌 **Backend Routing Logic**

In `backend/api/endpoints/contextual_analysis.py`:

```python
@router.post("/api/analyze-contextual-stream")
async def analyze_contextual_stream(context: AnalysisContext):
    """Routes to appropriate workflow based on context.type"""
    
    if context.type == "market":
        # ✅ Uses: Macro Economist, Market Technician, Risk Analyst, Sentiment Analyst
        return stream_market_regime_analysis(graph, date, context.data)
    
    elif context.type == "portfolio":
        # ✅ Uses: Portfolio Analyzer, Risk Analyst, Performance Analyst
        return stream_portfolio_analysis(graph, date, context.data)
    
    elif context.type == "trader":
        # ✅ Uses: Trader Strategy Analyzer
        return stream_trader_analysis(graph, date, context.data)
    
    elif context.type == "sector":
        # ✅ Uses: Sector Analyst, Rotation Tracker
        return stream_sector_analysis(graph, date, context.data)
    
    elif context.type == "alert":
        # ✅ Uses: Alert Validator + Stock Analysis
        return stream_alert_analysis(symbol, graph, date, context.data)
    
    else:  # stock or opportunity
        # ✅ Uses: Standard multi-agent stock analysis
        return stream_stock_analysis_with_text(symbol, graph, date)
```

---

## 🚀 **Frontend Implementation Pattern**

### **Step 1: Create Analysis Function with Context**

```typescript
const handleAnalysis = async (item: any) => {
  setDrawerOpen(true);
  setIsAnalyzing(true);
  setAgentTexts({});
  setFinalData(null);

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";
    
    // 🎯 BUILD CONTEXT OBJECT
    const context = {
      type: "stock",  // or "market", "portfolio", etc.
      symbol: item.symbol,
      page: "opportunities",
      panel: "opportunity-card",
      data: {
        // Pass relevant data from current page
        risk_level: item.risk_level,
        opportunity_score: item.opportunity_score,
        // ... any other relevant data
      },
    };

    // 🔌 CALL CONTEXTUAL ENDPOINT
    const response = await fetch(`${API_URL}/api/analyze-contextual-stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(context),
    });

    if (!response.ok || !response.body) {
      throw new Error("Failed to start analysis");
    }

    // 📡 READ SSE STREAM
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = JSON.parse(line.slice(6));
          
          // Handle streaming events
          if (data.event === "agent_text_start") {
            setAgentTexts((prev) => ({ ...prev, [data.agent]: "" }));
          } else if (data.event === "agent_text_chunk") {
            setAgentTexts((prev) => ({
              ...prev,
              [data.agent]: (prev[data.agent] || "") + data.chunk,
            }));
          } else if (data.event === "done") {
            setFinalData(data);
            setIsAnalyzing(false);
          }
        }
      }
    }
  } catch (error) {
    console.error("Analysis failed:", error);
    setIsAnalyzing(false);
  }
};
```

### **Step 2: Add AI Button with Context**

```tsx
<AIAnalysisButton
  context={{
    type: "opportunity",
    symbol: item.symbol,
    data: item,
  }}
  onAnalyze={() => handleAnalysis(item)}
  variant="inline"
  isAnalyzing={isAnalyzing}
/>
```

---

## 🎯 **Benefits of Context-Aware System**

### **1. Specialized Analysis**
- **Market page**: Gets macro-focused analysis (Fed, yields, VIX)
- **Stock page**: Gets stock-specific analysis (fundamentals, technicals)
- **Trader page**: Gets strategy-focused analysis (win rate, consistency)

### **2. Relevant Data Passing**
- Backend receives page state (volatility regime, holdings, alerts)
- Can provide more targeted recommendations
- Reduces redundant API calls

### **3. Smart Agent Selection**
- **Market**: Macro Economist, Market Technician
- **Portfolio**: Portfolio Analyzer, Risk Analyst
- **Stock**: Full multi-agent team

### **4. Better User Experience**
- Analysis feels "aware" of what you're looking at
- Recommendations are contextually relevant
- Faster results (only runs needed agents)

---

## 📊 **Context Data Examples**

### **Market Regime Context**
```typescript
data: {
  volatility_regime: "HIGH_VOLATILITY",
  market_trend: "BEARISH",
  risk_sentiment: "RISK_OFF",
  vix_level: 28.5,
  spy_trend: -5.2,
  yield_10y: 4.2,
  yield_change: 0.15,
}
```

### **Opportunity Context**
```typescript
data: {
  risk_level: "HIGH",
  opportunity_score: 8.5,
  category: "SWING",
  social_buzz: true,
  reddit_mentions: 450,
  price_change: 12.5,
}
```

### **Portfolio Context**
```typescript
data: {
  total_value: 250000,
  holdings: [...],
  allocation: { tech: 0.45, finance: 0.20 },
  risk_score: 7.2,
  ytd_return: 0.18,
}
```

### **Trader Context**
```typescript
data: {
  trader_id: "wallstreetbets_mod",
  win_rate: 0.75,
  avg_return: 0.45,
  strategy: "momentum",
  recent_trades: ["GME", "AMC"],
}
```

---

## 🔮 **Future Enhancements**

1. **Historical Context**: Pass previous analysis results for comparison
2. **User Preferences**: Include user's risk tolerance, investment goals
3. **Multi-Context**: Analyze multiple items in context of each other
4. **Learning**: Backend learns from user feedback per context type
5. **Auto-Context**: Frontend automatically builds optimal context object
6. **Context Caching**: Reuse context data across multiple analyses

---

## ✅ **Implementation Checklist**

For each page:
- [ ] Identify context type (`stock`, `market`, `portfolio`, etc.)
- [ ] Gather relevant page data for `context.data`
- [ ] Build context object in analysis function
- [ ] Call `/api/analyze-contextual-stream` with context
- [ ] Handle streaming response
- [ ] Display results in drawer

---

## 🎉 **Result**

**Every AI analysis now knows:**
- ✅ What page it's analyzing from
- ✅ What specific panel/component triggered it
- ✅ Relevant data from the current view
- ✅ What type of analysis to perform
- ✅ Which agents to deploy

**The AI becomes truly context-aware!** 🧠✨

---

**Backend Endpoint**: `/api/analyze-contextual-stream` (POST)  
**Frontend Pattern**: Build context → Call endpoint → Stream results  
**Routing Logic**: `backend/api/endpoints/contextual_analysis.py`

Your AI now "understands" where it's being called from! 🚀

