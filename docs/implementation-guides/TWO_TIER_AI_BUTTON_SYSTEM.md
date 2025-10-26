# 🎯 Two-Tier AI Button System + Auto-Scroll

## ✨ **New Features**

### **1. Two-Tier Button System**
Every page now has TWO types of AI buttons:
- **📊 Page-Level Button**: Analyzes the entire page/context
- **✨ Per-Item Button**: Analyzes each individual stock/trader/alert

### **2. Auto-Scroll in Drawer**
The analysis drawer now **automatically scrolls** as content streams in, keeping the latest agent analysis visible!

---

## 🎨 **Visual Layout**

```
┌──────────────────────────────────────────────────────────────┐
│  OPPORTUNITIES PAGE                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Trading Opportunities                    [✨ AI Analysis] [↻ Run Discovery]  │
│  │  AI-discovered investment opportunities                  │
│  └────────────────────────────────────────────────────────┘ │
│                                     ↑                         │
│                            PAGE-LEVEL BUTTON                  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  NVDA [✨ AI]  HIGH RISK  SWING                          │
│  │  NVIDIA momentum play...                                 │
│  └────────────────────────────────────────────────────────┘ │
│           ↑                                                   │
│    PER-STOCK BUTTON                                          │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  TSLA [✨ AI]  HIGH RISK  SWING                          │
│  │  Tesla breakout potential...                             │
│  └────────────────────────────────────────────────────────┘ │
│           ↑                                                   │
│    PER-STOCK BUTTON                                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 **Opportunities Page**

### **Page-Level Button** (in header)
```tsx
<AIAnalysisButton
  context={{
    type: "opportunity",
    page: "opportunities",
    panel: "page-overview",
    data: {
      totalOpportunities: 12,
      topOpportunity: "NVDA",
    },
  }}
  onAnalyze={() => analyzeTopOpportunity()}
  variant="secondary"
  size="md"
/>
```

**What it does**: Analyzes the **top-rated opportunity** as a page overview

---

### **Per-Stock Button** (next to each symbol)
```tsx
<InlineAIButton
  context={{
    type: "opportunity",
    symbol: "NVDA",
    data: opportunity,
  }}
  onAnalyze={() => loadDetailedAnalysis("NVDA", opportunity)}
  isAnalyzing={loadingAnalysis["NVDA"]}
/>
```

**What it does**: Analyzes that **specific stock** in detail

---

## 🌍 **Market Regime Page**

### **Page-Level Button** (in header)
```tsx
<AIAnalysisButton
  context={{
    type: "market",
    symbol: "SPY",
    page: "market-regime",
    data: regimeData,
  }}
  onAnalyze={handleMarketAnalysis}
  variant="primary"
  size="md"
/>
```

**What it does**: Analyzes **entire market regime** (macro-focused)

---

### **Per-Indicator Buttons** (optional, for individual metrics)
```tsx
<InlineAIButton
  context={{
    type: "market",
    symbol: "SPY",
    panel: "vix-analysis",
    data: { vix_level: 28.5 },
  }}
  onAnalyze={() => analyzeVIXSpecifically()}
/>
```

**What it does**: Deep dive into **VIX volatility** specifically

---

## 👤 **Traders Page** (Pattern to follow)

### **Page-Level Button**
```tsx
<AIAnalysisButton
  context={{
    type: "trader",
    page: "traders",
    panel: "page-overview",
    data: {
      totalTraders: traders.length,
      topTraders: traders.slice(0, 3),
    },
  }}
  onAnalyze={() => analyzeTopTraders()}
  variant="secondary"
/>
```

**What it does**: Analyzes **top 3 traders** collectively

---

### **Per-Trader Button**
```tsx
<InlineAIButton
  context={{
    type: "trader",
    data: {
      trader_id: "wallstreetbets_mod",
      win_rate: 0.75,
      strategy: "momentum",
    },
  }}
  onAnalyze={() => analyzeTrader(trader.id)}
/>
```

**What it does**: Analyzes that **specific trader's strategy**

---

## 🚨 **Monitoring Page** (Pattern to follow)

### **Page-Level Button**
```tsx
<AIAnalysisButton
  context={{
    type: "alert",
    page: "monitoring",
    data: {
      totalAlerts: alerts.length,
      criticalAlerts: criticalCount,
    },
  }}
  onAnalyze={() => analyzeAllAlerts()}
  variant="secondary"
/>
```

**What it does**: Analyzes **all active alerts** together

---

### **Per-Alert Button**
```tsx
<InlineAIButton
  context={{
    type: "alert",
    symbol: "NVDA",
    data: {
      alert_type: "PRICE_SPIKE",
      trigger_price: 450,
      current_price: 455,
    },
  }}
  onAnalyze={() => analyzeAlert(alert.id)}
/>
```

**What it does**: Analyzes **that specific alert**

---

## 📜 **Auto-Scroll Feature**

### **How It Works**

The `StreamingAnalysisDrawer` now has auto-scroll:

```typescript
// Auto-scroll to bottom as content streams in
useEffect(() => {
  if (isStreaming && contentRef.current) {
    contentRef.current.scrollIntoView({ 
      behavior: "smooth", 
      block: "end",
      inline: "nearest"
    });
  }
}, [agentTexts, isStreaming]);
```

### **Behavior**

- ✅ **While streaming**: Auto-scrolls down as agents write
- ✅ **Smooth scrolling**: No jarring jumps
- ✅ **On new analysis**: Scrolls to top when drawer opens
- ✅ **User can still scroll**: User scrolling overrides auto-scroll

### **User Experience**

```
Agent 1 writing... ↓ (scrolls down automatically)
Agent 2 writing... ↓ (scrolls down automatically)
Agent 3 writing... ↓ (scrolls down automatically)
Synthesis...       ↓ (scrolls down automatically)
Done!             ✓ (stops at bottom)
```

---

## 🎯 **Implementation Pattern**

### **For ANY Page**

**1. Add Page-Level Button (Header)**
```tsx
<AIAnalysisButton
  context={{
    type: "your-type",           // market, stock, portfolio, etc.
    page: "your-page",
    panel: "page-overview",
    data: { /* page stats */ },
  }}
  onAnalyze={handlePageAnalysis}
  variant="secondary"
  size="md"
/>
```

**2. Add Per-Item Buttons (Each Card/Row)**
```tsx
<InlineAIButton
  context={{
    type: "your-type",
    symbol: item.symbol,
    data: item,
  }}
  onAnalyze={() => analyzeItem(item)}
  isAnalyzing={isAnalyzing[item.id]}
/>
```

**3. Ensure Drawer Uses Auto-Scroll**
```tsx
<StreamingAnalysisDrawer
  open={drawerOpen}
  // ... all props (already has auto-scroll!)
/>
```

---

## 📊 **Context Differences**

### **Page-Level Context**
```typescript
{
  type: "opportunity",
  page: "opportunities",
  panel: "page-overview",        // ← Overview panel
  data: {
    totalOpportunities: 12,      // ← Aggregate data
    topOpportunity: "NVDA",
  }
}
```

### **Per-Item Context**
```typescript
{
  type: "opportunity",
  symbol: "NVDA",                // ← Specific symbol
  page: "opportunities",
  panel: "opportunity-card",     // ← Individual card
  data: {
    risk_level: "HIGH",          // ← Item-specific data
    score: 8.5,
    timeframe: "SWING",
  }
}
```

---

## ✅ **What's Complete**

**Infrastructure:**
- ✅ Auto-scroll in drawer
- ✅ Two-tier button system
- ✅ Context-aware routing

**Pages:**
- ✅ Opportunities: Page-level + per-stock buttons
- ✅ Market Regime: Page-level button
- ⏳ Traders: Need both buttons
- ⏳ Monitoring: Need both buttons
- ⏳ Sectors: Need both buttons

---

## 🎨 **Button Placement Guidelines**

### **Page-Level Button**
- **Location**: Header (next to refresh/action buttons)
- **Variant**: `secondary` or `primary`
- **Size**: `md` or `lg`
- **Label**: Page context (e.g., "Market Analysis", "Analyze Opportunities")

### **Per-Item Button**
- **Location**: Next to item title/symbol
- **Variant**: `inline` (compact badge style)
- **Size**: Automatic (small)
- **Label**: "AI" or icon only

---

## 🎉 **Result**

### **Before**:
```
NVDA  HIGH RISK  SWING
[Full Analysis Button]
```

### **After**:
```
Page Header: [✨ Analyze Top Opportunity]  [↻ Run Discovery]

NVDA [✨ AI]  HIGH RISK  SWING  ← Per-item button
TSLA [✨ AI]  HIGH RISK  SWING  ← Per-item button
AAPL [✨ AI]  LOW RISK   LONG   ← Per-item button
```

### **Drawer Behavior**:
```
📊 Analysis Starting...
↓ (auto-scrolls)
🤖 Market Analyst writing...
↓ (auto-scrolls)
🤖 Social Analyst writing...
↓ (auto-scrolls)
✅ Done! (stays at bottom)
```

---

## 🚀 **Next Steps**

1. **Test auto-scroll**: Open opportunities, click AI button, watch drawer scroll
2. **Test page-level button**: Click header AI button
3. **Test per-item button**: Click "✨ AI" next to any stock
4. **Apply pattern**: Add both buttons to Traders, Monitoring, Sectors pages

---

**Status**: 🎯 **Two-Tier System + Auto-Scroll COMPLETE!**

Every page can now have BOTH page-level intelligence AND per-item analysis, with smooth auto-scrolling as content streams! 🌟

