(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/true-north-trading/frontend/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Service for True North Trading Platform
 *
 * Connects Next.js frontend to Python FastAPI backend
 */ __turbopack_context__.s([
    "api",
    ()=>api,
    "useMarketRegime",
    ()=>useMarketRegime,
    "useOpportunities",
    ()=>useOpportunities,
    "usePortfolioMetrics",
    ()=>usePortfolioMetrics,
    "useTraderSignals",
    ()=>useTraderSignals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
// Add React imports for hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || "http://localhost:8002";
// API Client Class
class TradingAPI {
    async request(endpoint, options) {
        const url = "".concat(this.baseURL).concat(endpoint);
        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    ...options === null || options === void 0 ? void 0 : options.headers
                },
                ...options
            });
            if (!response.ok) {
                throw new Error("HTTP error! status: ".concat(response.status));
            }
            return await response.json();
        } catch (error) {
            console.error("API request failed: ".concat(endpoint), error);
            throw error;
        }
    }
    // Market Data
    async getMarketRegime() {
        return this.request("/api/market-regime");
    }
    async getOpportunities() {
        return this.request("/api/opportunities");
    }
    async runDiscovery() {
        return this.request("/api/run-discovery", {
            method: "POST"
        });
    }
    // Trading Signals
    async getTraderSignals() {
        return this.request("/api/trader-signals");
    }
    async getFollowedTraders() {
        return this.request("/api/traders");
    }
    // Alerts & Monitoring
    async getAlerts() {
        return this.request("/api/alerts");
    }
    // Portfolio
    async getPortfolioMetrics() {
        return this.request("/api/portfolio-metrics");
    }
    // Health Check
    async healthCheck() {
        return this.request("/");
    }
    constructor(baseURL = API_BASE_URL){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "baseURL", void 0);
        this.baseURL = baseURL;
    }
}
const api = new TradingAPI();
const useMarketRegime = ()=>{
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMarketRegime.useEffect": ()=>{
            const fetchData1 = {
                "useMarketRegime.useEffect.fetchData": async ()=>{
                    try {
                        setLoading(true);
                        const result = await api.getMarketRegime();
                        setData(result);
                        setError(null);
                    } catch (err) {
                        setError(err instanceof Error ? err.message : "Unknown error");
                    } finally{
                        setLoading(false);
                    }
                }
            }["useMarketRegime.useEffect.fetchData"];
            fetchData1();
        }
    }["useMarketRegime.useEffect"], []);
    return {
        data,
        loading,
        error,
        refetch: ()=>fetchData()
    };
};
_s(useMarketRegime, "RiL7vLwmC7ZWXKL/bXt2EIBjBYk=");
;
const useOpportunities = ()=>{
    _s1();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData1 = async ()=>{
        try {
            setLoading(true);
            const result = await api.getOpportunities();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useOpportunities.useEffect": ()=>{
            fetchData1();
        }
    }["useOpportunities.useEffect"], []);
    return {
        data,
        loading,
        error,
        refetch: fetchData1
    };
};
_s1(useOpportunities, "C4fiAW6C7RZgaKDoEXQgZpbuUZg=");
const useTraderSignals = ()=>{
    _s2();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData1 = async ()=>{
        try {
            setLoading(true);
            const result = await api.getTraderSignals();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTraderSignals.useEffect": ()=>{
            fetchData1();
        }
    }["useTraderSignals.useEffect"], []);
    return {
        data,
        loading,
        error,
        refetch: fetchData1
    };
};
_s2(useTraderSignals, "C4fiAW6C7RZgaKDoEXQgZpbuUZg=");
const usePortfolioMetrics = ()=>{
    _s3();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData1 = async ()=>{
        try {
            setLoading(true);
            const result = await api.getPortfolioMetrics();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePortfolioMetrics.useEffect": ()=>{
            fetchData1();
        }
    }["usePortfolioMetrics.useEffect"], []);
    return {
        data,
        loading,
        error,
        refetch: fetchData1
    };
};
_s3(usePortfolioMetrics, "RiL7vLwmC7ZWXKL/bXt2EIBjBYk=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/true-north-trading/frontend/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowTrendingUpIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowTrendingUpIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowTrendingUpIcon.js [app-client] (ecmascript) <export default as ArrowTrendingUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowTrendingDownIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowTrendingDownIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowTrendingDownIcon.js [app-client] (ecmascript) <export default as ArrowTrendingDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Sample data - will be replaced with API calls
const portfolioData = [
    {
        time: "09:00",
        value: 100000
    },
    {
        time: "10:00",
        value: 102000
    },
    {
        time: "11:00",
        value: 98000
    },
    {
        time: "12:00",
        value: 105000
    },
    {
        time: "13:00",
        value: 108000
    },
    {
        time: "14:00",
        value: 106000
    },
    {
        time: "15:00",
        value: 112000
    },
    {
        time: "16:00",
        value: 115000
    }
];
const topStocks = [
    {
        symbol: "AAPL",
        price: 175.43,
        change: 2.34,
        changePercent: 1.35
    },
    {
        symbol: "TSLA",
        price: 248.5,
        change: -5.2,
        changePercent: -2.05
    },
    {
        symbol: "NVDA",
        price: 875.28,
        change: 12.45,
        changePercent: 1.44
    },
    {
        symbol: "MSFT",
        price: 378.85,
        change: 4.12,
        changePercent: 1.1
    }
];
const recentSignals = [
    {
        id: 1,
        trader: "Market Wizard",
        symbol: "AAPL",
        action: "LONG",
        confidence: 85,
        time: "2 min ago"
    },
    {
        id: 2,
        trader: "Crypto King",
        symbol: "TSLA",
        action: "SHORT",
        confidence: 72,
        time: "5 min ago"
    },
    {
        id: 3,
        trader: "Value Hunter",
        symbol: "NVDA",
        action: "LONG",
        confidence: 91,
        time: "8 min ago"
    }
];
function Dashboard() {
    _s();
    // API hooks for real data
    const { data: marketRegime, loading: regimeLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketRegime"])();
    const { data: opportunities, loading: oppsLoading, refetch: refetchOpps } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpportunities"])();
    const { data: traderSignals, loading: signalsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTraderSignals"])();
    const { data: portfolioMetrics, loading: metricsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePortfolioMetrics"])();
    const handleRunDiscovery = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].runDiscovery();
            refetchOpps(); // Refresh opportunities after discovery
        } catch (error) {
            console.error("Failed to run discovery:", error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: 0.5
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowTrendingUpIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowTrendingUpIcon$3e$__["ArrowTrendingUpIcon"], {
                                        className: "h-5 w-5 text-blue-600 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-blue-800",
                                        children: [
                                            "Current Market Regime:",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: regimeLoading ? "Loading..." : (marketRegime === null || marketRegime === void 0 ? void 0 : marketRegime.strategy) || "Unknown"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRunDiscovery,
                                className: "px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200",
                                children: "🔍 Run Discovery"
                            }, void 0, false, {
                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",
                    children: [
                        {
                            title: "Portfolio Value",
                            value: metricsLoading ? "Loading..." : "$".concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.total_value.toLocaleString()) || "0"),
                            change: metricsLoading ? "..." : "".concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl_percent) >= 0 ? "+" : "").concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl_percent.toFixed(2)) || "0", "%"),
                            positive: (portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl_percent) >= 0
                        },
                        {
                            title: "Daily P&L",
                            value: metricsLoading ? "Loading..." : "".concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl) >= 0 ? "+" : "", "$").concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl.toLocaleString()) || "0"),
                            change: metricsLoading ? "..." : "".concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl_percent) >= 0 ? "+" : "").concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl_percent.toFixed(2)) || "0", "%"),
                            positive: (portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.daily_pnl) >= 0
                        },
                        {
                            title: "Active Positions",
                            value: metricsLoading ? "Loading..." : "".concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.active_positions) || "0"),
                            change: "+2",
                            positive: true
                        },
                        {
                            title: "Win Rate",
                            value: metricsLoading ? "Loading..." : "".concat((portfolioMetrics === null || portfolioMetrics === void 0 ? void 0 : portfolioMetrics.win_rate.toFixed(1)) || "0", "%"),
                            change: "+1.2%",
                            positive: true
                        }
                    ].map((metric, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.5,
                                delay: index * 0.1
                            },
                            className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-600",
                                                children: metric.title
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 184,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-gray-900",
                                                children: metric.value
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center ".concat(metric.positive ? "text-green-600" : "text-red-600"),
                                        children: [
                                            metric.positive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowTrendingUpIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowTrendingUpIcon$3e$__["ArrowTrendingUpIcon"], {
                                                className: "h-4 w-4 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 197,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowTrendingDownIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowTrendingDownIcon$3e$__["ArrowTrendingDownIcon"], {
                                                className: "h-4 w-4 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 199,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium",
                                                children: metric.change
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                        lineNumber: 191,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                lineNumber: 182,
                                columnNumber: 15
                            }, this)
                        }, metric.title, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-900 mb-4",
                                    children: "Portfolio Performance"
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: 300,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                        data: portfolioData,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                strokeDasharray: "3 3"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "time"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {}, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {}, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 220,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "value",
                                                stroke: "#3B82F6",
                                                fill: "#3B82F6",
                                                fillOpacity: 0.1
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-gray-900 mb-4",
                                    children: "Top Movers"
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: topStocks.map((stock)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-gray-900",
                                                            children: stock.symbol
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: [
                                                                "$",
                                                                stock.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right ".concat(stock.change >= 0 ? "text-green-600" : "text-red-600"),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: [
                                                                stock.change >= 0 ? "+" : "",
                                                                stock.change
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm",
                                                            children: [
                                                                stock.changePercent >= 0 ? "+" : "",
                                                                stock.changePercent,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, stock.symbol, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-sm border border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 py-4 border-b border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-gray-900",
                                children: "Recent Trading Signals"
                            }, void 0, false, {
                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: signalsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-4",
                                    children: "Loading signals..."
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                    lineNumber: 279,
                                    columnNumber: 17
                                }, this) : traderSignals && traderSignals.length > 0 ? traderSignals.slice(0, 5).map((signal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-3 py-1 rounded-full text-xs font-medium ".concat(signal.action === "LONG" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"),
                                                        children: signal.action
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-gray-900",
                                                                children: signal.symbol
                                                            }, void 0, false, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                                lineNumber: 297,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600",
                                                                children: [
                                                                    "by ",
                                                                    signal.trader_name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 286,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-gray-900",
                                                        children: [
                                                            (signal.confidence * 100).toFixed(0),
                                                            "% confidence"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-600",
                                                        children: new Date(signal.time).toLocaleTimeString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                                lineNumber: 305,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, signal.id, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                        lineNumber: 282,
                                        columnNumber: 19
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-4 text-gray-500",
                                    children: "No recent signals"
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                    lineNumber: 316,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
                    lineNumber: 270,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/app/page.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(Dashboard, "aqTww7f+HH/KsCGRZv+UEUeA93s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarketRegime"],
        __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOpportunities"],
        __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTraderSignals"],
        __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePortfolioMetrics"]
    ];
});
_c = Dashboard;
var _c;
__turbopack_context__.k.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=true-north-trading_frontend_src_a0071d2a._.js.map