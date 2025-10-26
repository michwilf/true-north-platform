# 🤖 AI Buttons Everywhere - Implementation Guide

## ✅ **Completed Implementations**

### **1. Market Regime Page**
- **Location**: Header (next to Refresh button)
- **Button Type**: Primary AIAnalysisButton
- **Context**: Market analysis (SPY as proxy)
- **Features**:
  - Triggers full multi-agent market analysis
  - Opens streaming drawer with real-time updates
  - Shows Market Analyst, Social Analyst, News Analyst, Fundamentals Analyst
  - Provides market outlook and trading strategy

**Usage**:
```tsx
<AIAnalysisButton
  context={{ type: "market", data: regimeData, label: "Market Regime" }}
  onAnalyze={handleMarketAnalysis}
  variant="primary"
  isAnalyzing={isAnalyzing}
/>
```

### **2. Opportunities Page**
- **Location**: Next to each stock symbol in opportunity cards
- **Button Type**: InlineAIButton
- **Context**: Individual stock analysis
- **Features**:
  - One-click analysis for any opportunity
  - Opens streaming drawer
  - Context-aware (passes opportunity data)

**Usage**:
```tsx
<InlineAIButton
  context={{ type: "stock", symbol: opportunity.symbol, data: opportunity }}
  onAnalyze={() => loadDetailedAnalysis(opportunity.symbol)}
  isAnalyzing={loadingAnalysis[opportunity.symbol]}
/>
```

---

## 📋 **Implementation Pattern** (For Remaining Pages)

Every page follows this pattern:

### **Step 1: Add Imports**
```tsx
import StreamingAnalysisDrawer from "@/components/StreamingAnalysisDrawer";
import AIAnalysisButton, { InlineAIButton } from "@/components/AIAnalysisButton";
```

### **Step 2: Add State**
```tsx
const [drawerOpen, setDrawerOpen] = useState(false);
const [isAnalyzing, setIsAnalyzing] = useState(false);
const [analysisProgress, setAnalysisProgress] = useState({
  currentAgent: "",
  progress: 0,
});
const [agentTexts, setAgentTexts] = useState<Record<string, string>>({});
const [finalData, setFinalData] = useState<any>(null);
const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
```

### **Step 3: Add Analysis Function**
```tsx
const handleAnalysis = async (symbol: string) => {
  setCurrentSymbol(symbol);
  setDrawerOpen(true);
  setIsAnalyzing(true);
  setAnalysisProgress({ currentAgent: "Starting...", progress: 0 });
  setAgentTexts({});
  setFinalData(null);

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";
    const eventSource = new EventSource(
      `${API_URL}/api/analyze-stock-stream-text/${symbol}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "agent_text_start") {
          setAgentTexts((prev) => ({ ...prev, [data.agent]: "" }));
        } else if (data.event === "agent_text_chunk") {
          setAgentTexts((prev) => ({
            ...prev,
            [data.agent]: (prev[data.agent] || "") + data.chunk,
          }));
        }

        if (data.event === "agent_start" || data.event === "agent_complete") {
          setAnalysisProgress({
            currentAgent: data.agent || "Processing...",
            progress: data.progress || 0,
          });
        }

        if (data.event === "synthesis_start") {
          setAnalysisProgress({
            currentAgent: "Synthesizing...",
            progress: 90,
          });
        }

        if (data.event === "done") {
          setFinalData(data);
          setIsAnalyzing(false);
          setAnalysisProgress({ currentAgent: "Complete!", progress: 100 });
          eventSource.close();
        }
      } catch (err) {
        console.error("Error parsing stream:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Stream error:", error);
      setIsAnalyzing(false);
      eventSource.close();
    };
  } catch (error) {
    console.error("Failed to start analysis:", error);
    setIsAnalyzing(false);
  }
};
```

### **Step 4: Add Button (Context-Specific)**

**For individual items (stocks, traders, etc.):**
```tsx
<InlineAIButton
  context={{ type: "stock", symbol: item.symbol, data: item }}
  onAnalyze={() => handleAnalysis(item.symbol)}
  isAnalyzing={isAnalyzing && currentSymbol === item.symbol}
/>
```

**For page-level analysis:**
```tsx
<AIAnalysisButton
  context={{ type: "portfolio" }}
  onAnalyze={handlePortfolioAnalysis}
  variant="primary"
  isAnalyzing={isAnalyzing}
/>
```

### **Step 5: Add Drawer Component**
```tsx
<StreamingAnalysisDrawer
  open={drawerOpen}
  onOpenChange={setDrawerOpen}
  symbol={currentSymbol || "MARKET"}
  isStreaming={isAnalyzing}
  progress={analysisProgress.progress}
  currentAgent={analysisProgress.currentAgent}
  agentTexts={agentTexts}
  finalData={finalData}
/>
```

---

## 🎯 **Context Types for Each Page**

| Page | Context Type | Symbol | Use Case |
|------|-------------|--------|----------|
| **Opportunities** | `stock` | Individual ticker | Per-opportunity analysis |
| **Market Regime** | `market` | SPY | Overall market analysis |
| **Portfolio** | `stock` | Individual holding | Per-holding analysis |
| **Portfolio** | `portfolio` | N/A | Full portfolio analysis |
| **Traders** | `trader` | Trader ID | Trader strategy analysis |
| **Leaderboard** | `trader` | Trader ID | Trader performance analysis |
| **Analyze** | `stock` | User input | On-demand stock analysis |
| **Sectors** | `sector` | Sector name | Sector performance analysis |
| **Monitoring** | `stock` | Alert symbol | Alert context analysis |
| **Home** | Various | Varies | Quick access to all types |

---

## 📊 **Button Placement Recommendations**

### **Card Headers** (Opportunities, Traders, Sectors)
- Use `InlineAIButton`
- Place next to title/symbol
- Compact, non-intrusive

### **Page Headers** (Market Regime, Portfolio, Analyze)
- Use primary `AIAnalysisButton`
- Place in header action area
- Prominent, call-to-action

### **Table Rows** (Leaderboard, Monitoring)
- Use `InlineAIButton`
- Place in actions column
- Minimal space usage

### **Floating** (For mobile or quick access)
- Use `FloatingAIButton`
- Bottom-right corner
- Always accessible

---

## 🎨 **Visual Guidelines**

### **Colors:**
- **Primary Button**: Blue gradient (`from-blue-600 to-indigo-600`)
- **Secondary Button**: White with blue border
- **Icon Button**: Blue circle
- **Inline Button**: Blue text with subtle hover

### **Icons:**
- **Idle**: Sparkles icon (✨)
- **Analyzing**: Spinning sparkles
- **Hover**: Pulse animation
- **Complete**: Checkmark

### **States:**
- **Default**: Ready to click
- **Hover**: Scale up, brighten
- **Analyzing**: Spin, disabled
- **Disabled**: Opacity 50%, no interaction

---

## 🚀 **Quick Implementation Checklist**

For each new page:
- [ ] Import `StreamingAnalysisDrawer` and `AIAnalysisButton`
- [ ] Add drawer state (open, analyzing, progress, texts, finalData)
- [ ] Create `handleAnalysis` function with SSE streaming
- [ ] Add AI button in appropriate location
- [ ] Add `StreamingAnalysisDrawer` at end of return
- [ ] Test: Click button → Drawer opens → Stream works → Results show

---

## 💡 **Pro Tips**

1. **Symbol Context**: Always pass the symbol for better labeling
2. **Loading States**: Track `currentSymbol` to show per-item loading
3. **Error Handling**: Add try-catch and error state
4. **Cleanup**: Close eventSource in useEffect cleanup
5. **Reusability**: Use same `handleAnalysis` for multiple items
6. **Performance**: Memoize analysis function if needed
7. **UX**: Close drawer when analysis complete or on error

---

## 📁 **Files to Modify**

### **Completed:**
- ✅ `frontend/src/app/market-regime/page.tsx`
- ✅ `frontend/src/app/opportunities/page.tsx`

### **To Do:**
- `frontend/src/app/page.tsx` (Home)
- `frontend/src/app/analyze/page.tsx` (Already has streaming, add button)
- `frontend/src/app/traders/page.tsx`
- `frontend/src/app/leaderboard/page.tsx`
- `frontend/src/app/sectors/page.tsx`
- `frontend/src/app/monitoring/page.tsx`
- `frontend/src/app/portfolio/page.tsx` (if exists)

---

## 🎉 **Result**

After implementing across all pages, users will have:
- ✨ **One-click AI analysis** on every element
- 🎯 **Context-aware** analysis for each item type
- 📊 **Beautiful streaming** with markdown rendering
- 🚀 **Consistent UX** across the entire platform
- 🤖 **Always accessible** intelligence

**Every stock, trader, sector, and alert becomes instantly analyzable!** 🌟

---

## 🔮 **Future Enhancements**

1. **Batch Analysis**: Select multiple items → Analyze all
2. **Compare Mode**: Analyze 2-3 items side-by-side
3. **Saved Analyses**: History of past analyses
4. **Custom Prompts**: User-defined analysis focus
5. **Voice Activation**: "Analyze AAPL"
6. **Keyboard Shortcuts**: `Cmd+K symbol` for quick analysis
7. **Auto-Analysis**: Trigger on price alerts
8. **PDF Export**: Download analysis reports

---

**Status**: 🎯 **Pattern Established - Ready to Scale!**

Use this guide to add AI buttons to any remaining pages following the same proven pattern!

