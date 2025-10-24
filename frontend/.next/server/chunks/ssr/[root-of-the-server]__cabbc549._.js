module.exports = [
"[project]/true-north-trading/frontend/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8002") || "http://localhost:8002";
// API Client Class
class TradingAPI {
    baseURL;
    constructor(baseURL = API_BASE_URL){
        this.baseURL = baseURL;
    }
    async request(endpoint, options) {
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    ...options?.headers
                },
                ...options
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            /* eslint-disable */ console.error(...oo_tx(`4278243605_102_6_102_61_11`, `API request failed: ${endpoint}`, error));
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
}
const api = new TradingAPI();
const useMarketRegime = ()=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = async ()=>{
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
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, []);
    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};
const useOpportunities = ()=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = async ()=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, []);
    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};
const useTraderSignals = ()=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = async ()=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, []);
    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};
const usePortfolioMetrics = ()=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchData = async ()=>{
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchData();
    }, []);
    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};
function oo_cm() {
    try {
        return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x206025=_0x8070;(function(_0x1e0ee3,_0x543f60){var _0x2c6461=_0x8070,_0x2eeeae=_0x1e0ee3();while(!![]){try{var _0x19568b=parseInt(_0x2c6461(0xd6))/0x1+-parseInt(_0x2c6461(0xf9))/0x2+-parseInt(_0x2c6461(0x13a))/0x3*(-parseInt(_0x2c6461(0xd8))/0x4)+-parseInt(_0x2c6461(0xef))/0x5*(parseInt(_0x2c6461(0x19d))/0x6)+-parseInt(_0x2c6461(0x16c))/0x7*(parseInt(_0x2c6461(0x129))/0x8)+parseInt(_0x2c6461(0x195))/0x9*(-parseInt(_0x2c6461(0x190))/0xa)+parseInt(_0x2c6461(0x162))/0xb;if(_0x19568b===_0x543f60)break;else _0x2eeeae['push'](_0x2eeeae['shift']());}catch(_0x5c8bf4){_0x2eeeae['push'](_0x2eeeae['shift']());}}}(_0x1f2e,0x1d68a));function x(_0x16bd66,_0x4a4d60,_0xbaf7ae,_0x5726d8,_0x14c677,_0x58be02){var _0x412efa=_0x8070,_0x579420,_0x30350e,_0x41aee7,_0x13ee33;this['global']=_0x16bd66,this[_0x412efa(0x167)]=_0x4a4d60,this['port']=_0xbaf7ae,this['nodeModules']=_0x5726d8,this[_0x412efa(0x1a3)]=_0x14c677,this[_0x412efa(0x191)]=_0x58be02,this[_0x412efa(0xe8)]=!0x0,this[_0x412efa(0x101)]=!0x0,this[_0x412efa(0x169)]=!0x1,this[_0x412efa(0xb1)]=!0x1,this[_0x412efa(0x18f)]=((_0x30350e=(_0x579420=_0x16bd66[_0x412efa(0x128)])==null?void 0x0:_0x579420[_0x412efa(0xa5)])==null?void 0x0:_0x30350e['NEXT_RUNTIME'])==='edge',this[_0x412efa(0xfd)]=!((_0x13ee33=(_0x41aee7=this['global'][_0x412efa(0x128)])==null?void 0x0:_0x41aee7['versions'])!=null&&_0x13ee33[_0x412efa(0xd4)])&&!this[_0x412efa(0x18f)],this[_0x412efa(0xbe)]=null,this['_connectAttemptCount']=0x0,this[_0x412efa(0x150)]=0x14,this[_0x412efa(0x183)]=_0x412efa(0x107),this['_sendErrorMessage']=(this['_inBrowser']?_0x412efa(0xc5):_0x412efa(0x189))+this[_0x412efa(0x183)];}x[_0x206025(0xa3)][_0x206025(0x165)]=async function(){var _0xe87ea2=_0x206025,_0x3ecbb7,_0x2e6871;if(this[_0xe87ea2(0xbe)])return this[_0xe87ea2(0xbe)];let _0x2b5713;if(this['_inBrowser']||this['_inNextEdge'])_0x2b5713=this[_0xe87ea2(0x198)][_0xe87ea2(0xd7)];else{if((_0x3ecbb7=this[_0xe87ea2(0x198)][_0xe87ea2(0x128)])!=null&&_0x3ecbb7[_0xe87ea2(0xc4)])_0x2b5713=(_0x2e6871=this['global'][_0xe87ea2(0x128)])==null?void 0x0:_0x2e6871['_WebSocket'];else try{_0x2b5713=(await new Function('path',_0xe87ea2(0xbb),'nodeModules',_0xe87ea2(0xd3))(await(0x0,eval)(_0xe87ea2(0x16e)),await(0x0,eval)(_0xe87ea2(0xa4)),this[_0xe87ea2(0x109)]))['default'];}catch{try{_0x2b5713=require(require(_0xe87ea2(0x103))[_0xe87ea2(0x126)](this['nodeModules'],'ws'));}catch{throw new Error(_0xe87ea2(0x111));}}}return this[_0xe87ea2(0xbe)]=_0x2b5713,_0x2b5713;},x[_0x206025(0xa3)][_0x206025(0x16a)]=function(){var _0x1cde0f=_0x206025;this[_0x1cde0f(0xb1)]||this[_0x1cde0f(0x169)]||this[_0x1cde0f(0x187)]>=this[_0x1cde0f(0x150)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x1cde0f(0xb1)]=!0x0,this[_0x1cde0f(0x187)]++,this['_ws']=new Promise((_0x91bb92,_0x1b6bd1)=>{var _0x37f025=_0x1cde0f;this[_0x37f025(0x165)]()[_0x37f025(0xd5)](_0x19bb6e=>{var _0x17676c=_0x37f025;let _0x45d49b=new _0x19bb6e(_0x17676c(0xfb)+(!this[_0x17676c(0xfd)]&&this[_0x17676c(0x1a3)]?_0x17676c(0x157):this[_0x17676c(0x167)])+':'+this[_0x17676c(0xdc)]);_0x45d49b[_0x17676c(0x14b)]=()=>{var _0x550b85=_0x17676c;this[_0x550b85(0xe8)]=!0x1,this[_0x550b85(0x18e)](_0x45d49b),this['_attemptToReconnectShortly'](),_0x1b6bd1(new Error(_0x550b85(0x104)));},_0x45d49b[_0x17676c(0x185)]=()=>{var _0x35d69b=_0x17676c;this['_inBrowser']||_0x45d49b[_0x35d69b(0xfa)]&&_0x45d49b[_0x35d69b(0xfa)]['unref']&&_0x45d49b[_0x35d69b(0xfa)]['unref'](),_0x91bb92(_0x45d49b);},_0x45d49b[_0x17676c(0x102)]=()=>{var _0x43abcb=_0x17676c;this[_0x43abcb(0x101)]=!0x0,this[_0x43abcb(0x18e)](_0x45d49b),this[_0x43abcb(0xff)]();},_0x45d49b[_0x17676c(0xb3)]=_0x109891=>{var _0x5a283=_0x17676c;try{if(!(_0x109891!=null&&_0x109891[_0x5a283(0x19e)])||!this[_0x5a283(0x191)])return;let _0x4354b3=JSON[_0x5a283(0x11b)](_0x109891[_0x5a283(0x19e)]);this['eventReceivedCallback'](_0x4354b3[_0x5a283(0xf0)],_0x4354b3[_0x5a283(0x113)],this[_0x5a283(0x198)],this[_0x5a283(0xfd)]);}catch{}};})[_0x37f025(0xd5)](_0x4fe549=>(this[_0x37f025(0x169)]=!0x0,this[_0x37f025(0xb1)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0x37f025(0xe8)]=!0x0,this[_0x37f025(0x187)]=0x0,_0x4fe549))['catch'](_0x291a72=>(this[_0x37f025(0x169)]=!0x1,this[_0x37f025(0xb1)]=!0x1,console[_0x37f025(0x10a)](_0x37f025(0x192)+this[_0x37f025(0x183)]),_0x1b6bd1(new Error(_0x37f025(0x176)+(_0x291a72&&_0x291a72[_0x37f025(0x19b)])))));}));},x[_0x206025(0xa3)]['_disposeWebsocket']=function(_0x1ad1a7){var _0x4b0272=_0x206025;this[_0x4b0272(0x169)]=!0x1,this[_0x4b0272(0xb1)]=!0x1;try{_0x1ad1a7[_0x4b0272(0x102)]=null,_0x1ad1a7['onerror']=null,_0x1ad1a7[_0x4b0272(0x185)]=null;}catch{}try{_0x1ad1a7[_0x4b0272(0xc0)]<0x2&&_0x1ad1a7[_0x4b0272(0x10d)]();}catch{}},x[_0x206025(0xa3)][_0x206025(0xff)]=function(){var _0x593914=_0x206025;clearTimeout(this[_0x593914(0xcf)]),!(this[_0x593914(0x187)]>=this[_0x593914(0x150)])&&(this[_0x593914(0xcf)]=setTimeout(()=>{var _0x2a01db=_0x593914,_0x2a8521;this[_0x2a01db(0x169)]||this[_0x2a01db(0xb1)]||(this[_0x2a01db(0x16a)](),(_0x2a8521=this[_0x2a01db(0x145)])==null||_0x2a8521['catch'](()=>this[_0x2a01db(0xff)]()));},0x1f4),this[_0x593914(0xcf)][_0x593914(0xf5)]&&this[_0x593914(0xcf)]['unref']());},x['prototype'][_0x206025(0xa9)]=async function(_0x3820cf){var _0x10b1d4=_0x206025;try{if(!this['_allowedToSend'])return;this[_0x10b1d4(0x101)]&&this[_0x10b1d4(0x16a)](),(await this[_0x10b1d4(0x145)])[_0x10b1d4(0xa9)](JSON['stringify'](_0x3820cf));}catch(_0x534152){this[_0x10b1d4(0xc2)]?console['warn'](this[_0x10b1d4(0x149)]+':\\x20'+(_0x534152&&_0x534152[_0x10b1d4(0x19b)])):(this['_extendedWarning']=!0x0,console[_0x10b1d4(0x10a)](this[_0x10b1d4(0x149)]+':\\x20'+(_0x534152&&_0x534152[_0x10b1d4(0x19b)]),_0x3820cf)),this[_0x10b1d4(0xe8)]=!0x1,this[_0x10b1d4(0xff)]();}};function _0x1f2e(){var _0x313632=['performance','_allowedToConnectOnSend','onclose','path','logger\\x20websocket\\x20error','serialize','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','https://tinyurl.com/37x8b79t','number','nodeModules','warn','string','substr','close','toUpperCase','time','expId','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','args','react-native','_processTreeNodeResult','undefined','next.js','error','_cleanNode','type','parse','_type','ExpoDevice','[object\\x20Set]','Boolean','cappedElements','_hasSetOnItsPath','reduceOnAccumulatedProcessingTimeMs','forEach','trace','noFunctions','join','_isMap','process','592olDfiE','_dateToString','elapsed','autoExpandPropertyCount','unshift',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}},'name','strLength','reducedLimits','_capIfString','concat','symbol','1.0.0','_sortProps','value','null','hrtime','12FVWkFh','root_exp','versions','test','indexOf','resolveGetters','Map','capped','funcName','bind','current','_ws','isArray','_hasSymbolPropertyOnItsPath','_objectToString','_sendErrorMessage','_console_ninja_session','onerror','_additionalMetadata','_addProperty','_console_ninja','disabledTrace','_maxConnectAttemptCount','[object\\x20Array]','sortProps','_addFunctionsNode','perLogpoint','perf_hooks','1','gateway.docker.internal','charAt','_treeNodePropertiesAfterFullValue','NEXT_RUNTIME','console','getter','Number','_treeNodePropertiesBeforeFullValue','_isUndefined','_isSet','getOwnPropertySymbols','4753408RZbvXH','59872','push','getWebSocketClass',\"/Users/MikeyW/.cursor/extensions/wallabyjs.console-ninja-1.0.486-universal/node_modules\",'host','_property','_connected','_connectToHostNow','constructor','18998lyWGlj','props','import(\\x27path\\x27)','some','_setNodeLabel','_consoleNinjaAllowedToStart','_getOwnPropertyDescriptor','Error','_hasMapOnItsPath','getOwnPropertyDescriptor','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','1761256358720','pop','RegExp','remix','_blacklistedProperty','_setNodeQueryPath','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','String','location','hits','allStrLength','call','_webSocketErrorDocsLink','map','onopen','valueOf','_connectAttemptCount','rootExpression','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_addLoadNode','reload','NEGATIVE_INFINITY','_p_name','_disposeWebsocket','_inNextEdge','8600buKRbE','eventReceivedCallback','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_propertyName','parent','2187QYJEaz','_ninjaIgnoreNextError','length','global','_isNegativeZero','_setNodePermissions','message','get','342858SJZiHE','data','toString','_getOwnPropertyNames','startsWith','log','dockerizedApp','_HTMLAllCollection','isExpressionToEvaluate','[object\\x20Date]','autoExpandMaxDepth','prototype','import(\\x27url\\x27)','env','autoExpandPreviousObjects','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','10.0.2.2','send','resetOnProcessingTimeAverageMs','positiveInfinity','Buffer','coverage','defaultLimits','expo','function','_connecting','sort','onmessage','getOwnPropertyNames','angular','index','reducePolicy','array','osName','modules','url','expressionsToEvaluate','nan','_WebSocketClass','_isPrimitiveType','readyState','_getOwnPropertySymbols','_extendedWarning','stackTraceLimit','_WebSocket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','reduceOnCount','_undefined','slice','unknown','origin','object','level','autoExpand','toLowerCase','_reconnectTimeout','elements','now','_Symbol','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','node','then','112855oFBgVg','WebSocket','231076kiFdNR','totalStrLength','Set','date','port','stack','_setNodeId','includes','_setNodeExpandableState','_regExpToString','_setNodeExpressionPath','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','\\x20browser','boolean','autoExpandLimit','set','_allowedToSend','\\x20server','resetWhenQuietMs','depth','timeStamp','count','replace','10ATihzK','method','hostname','reduceLimits','bigint','match','unref','edge','_isPrimitiveWrapperType','_p_','262998SwrgeB','_socket','ws://','_addObjectProperty','_inBrowser','','_attemptToReconnectShortly'];_0x1f2e=function(){return _0x313632;};return _0x1f2e();}function q(_0x5d1bb0,_0x28051d,_0x5316ed,_0x4dc284,_0x2d47b5,_0x24dc52,_0x5c6ac8,_0x143565=G){var _0x382aee=_0x206025;let _0x10cb2d=_0x5316ed['split'](',')[_0x382aee(0x184)](_0x2799b6=>{var _0x19b263=_0x382aee,_0x5ee145,_0x47f567,_0x2e6e4c,_0xe615d4,_0x25b863,_0xc18eaa,_0x4513b4;try{if(!_0x5d1bb0['_console_ninja_session']){let _0x4beab0=((_0x47f567=(_0x5ee145=_0x5d1bb0[_0x19b263(0x128)])==null?void 0x0:_0x5ee145['versions'])==null?void 0x0:_0x47f567[_0x19b263(0xd4)])||((_0xe615d4=(_0x2e6e4c=_0x5d1bb0[_0x19b263(0x128)])==null?void 0x0:_0x2e6e4c[_0x19b263(0xa5)])==null?void 0x0:_0xe615d4['NEXT_RUNTIME'])===_0x19b263(0xf6);(_0x2d47b5===_0x19b263(0x117)||_0x2d47b5===_0x19b263(0x17a)||_0x2d47b5==='astro'||_0x2d47b5===_0x19b263(0xb5))&&(_0x2d47b5+=_0x4beab0?_0x19b263(0xe9):_0x19b263(0xe4));let _0x5742fa='';_0x2d47b5===_0x19b263(0x114)&&(_0x5742fa=(((_0x4513b4=(_0xc18eaa=(_0x25b863=_0x5d1bb0['expo'])==null?void 0x0:_0x25b863[_0x19b263(0xba)])==null?void 0x0:_0xc18eaa[_0x19b263(0x11d)])==null?void 0x0:_0x4513b4[_0x19b263(0xb9)])||'')[_0x19b263(0xce)](),_0x5742fa&&(_0x2d47b5+='\\x20'+_0x5742fa,_0x5742fa==='android'&&(_0x28051d=_0x19b263(0xa8)))),_0x5d1bb0[_0x19b263(0x14a)]={'id':+new Date(),'tool':_0x2d47b5},_0x5c6ac8&&_0x2d47b5&&!_0x4beab0&&(_0x5742fa?console['log'](_0x19b263(0x112)+_0x5742fa+',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.'):console[_0x19b263(0x1a2)](_0x19b263(0xe3)+(_0x2d47b5[_0x19b263(0x158)](0x0)[_0x19b263(0x10e)]()+_0x2d47b5[_0x19b263(0x10c)](0x1))+',',_0x19b263(0x17d),_0x19b263(0xa7)));}let _0x28eafc=new x(_0x5d1bb0,_0x28051d,_0x2799b6,_0x4dc284,_0x24dc52,_0x143565);return _0x28eafc[_0x19b263(0xa9)][_0x19b263(0x143)](_0x28eafc);}catch(_0x1ac335){return console[_0x19b263(0x10a)](_0x19b263(0x106),_0x1ac335&&_0x1ac335[_0x19b263(0x19b)]),()=>{};}});return _0x3f4d85=>_0x10cb2d[_0x382aee(0x123)](_0x3f3397=>_0x3f3397(_0x3f4d85));}function _0x8070(_0x533792,_0x4dd89c){var _0x1f2e40=_0x1f2e();return _0x8070=function(_0x807058,_0x54b481){_0x807058=_0x807058-0xa2;var _0x4f57b5=_0x1f2e40[_0x807058];return _0x4f57b5;},_0x8070(_0x533792,_0x4dd89c);}function G(_0x379fb8,_0x313ee3,_0x2fd7c5,_0x3c5a4e){var _0x528bff=_0x206025;_0x3c5a4e&&_0x379fb8===_0x528bff(0x18b)&&_0x2fd7c5['location'][_0x528bff(0x18b)]();}function B(_0x42e71c){var _0x3c48d1=_0x206025,_0x30cebb,_0x49d075;let _0x15e433=function(_0x4e0a64,_0x2a81f4){return _0x2a81f4-_0x4e0a64;},_0x15cf12;if(_0x42e71c[_0x3c48d1(0x100)])_0x15cf12=function(){var _0x25ce7e=_0x3c48d1;return _0x42e71c[_0x25ce7e(0x100)][_0x25ce7e(0xd1)]();};else{if(_0x42e71c[_0x3c48d1(0x128)]&&_0x42e71c['process'][_0x3c48d1(0x139)]&&((_0x49d075=(_0x30cebb=_0x42e71c[_0x3c48d1(0x128)])==null?void 0x0:_0x30cebb['env'])==null?void 0x0:_0x49d075[_0x3c48d1(0x15a)])!==_0x3c48d1(0xf6))_0x15cf12=function(){var _0x2b1db0=_0x3c48d1;return _0x42e71c[_0x2b1db0(0x128)][_0x2b1db0(0x139)]();},_0x15e433=function(_0x27a10c,_0x52b991){return 0x3e8*(_0x52b991[0x0]-_0x27a10c[0x0])+(_0x52b991[0x1]-_0x27a10c[0x1])/0xf4240;};else try{let {performance:_0x4e8aca}=require(_0x3c48d1(0x155));_0x15cf12=function(){var _0x442526=_0x3c48d1;return _0x4e8aca[_0x442526(0xd1)]();};}catch{_0x15cf12=function(){return+new Date();};}}return{'elapsed':_0x15e433,'timeStamp':_0x15cf12,'now':()=>Date[_0x3c48d1(0xd1)]()};}function H(_0x129b12,_0x5d5f92,_0x1c293c){var _0x31f57e=_0x206025,_0x5dfd92,_0x3c35b8,_0x527c3c,_0x1cf2a9,_0xc2a39f,_0x19ebba,_0x49f22a,_0x2d0f72,_0x4b2de8;if(_0x129b12[_0x31f57e(0x171)]!==void 0x0)return _0x129b12['_consoleNinjaAllowedToStart'];let _0x29fa56=((_0x3c35b8=(_0x5dfd92=_0x129b12[_0x31f57e(0x128)])==null?void 0x0:_0x5dfd92['versions'])==null?void 0x0:_0x3c35b8[_0x31f57e(0xd4)])||((_0x1cf2a9=(_0x527c3c=_0x129b12[_0x31f57e(0x128)])==null?void 0x0:_0x527c3c['env'])==null?void 0x0:_0x1cf2a9[_0x31f57e(0x15a)])===_0x31f57e(0xf6),_0x539791=!!(_0x1c293c===_0x31f57e(0x114)&&((_0x49f22a=(_0x19ebba=(_0xc2a39f=_0x129b12[_0x31f57e(0xaf)])==null?void 0x0:_0xc2a39f[_0x31f57e(0xba)])==null?void 0x0:_0x19ebba[_0x31f57e(0x11d)])==null?void 0x0:_0x49f22a[_0x31f57e(0xb9)]));function _0x452777(_0x2b4164){var _0xeb13fb=_0x31f57e;if(_0x2b4164[_0xeb13fb(0x1a1)]('/')&&_0x2b4164['endsWith']('/')){let _0x328aa6=new RegExp(_0x2b4164['slice'](0x1,-0x1));return _0xf9beb3=>_0x328aa6[_0xeb13fb(0x13d)](_0xf9beb3);}else{if(_0x2b4164['includes']('*')||_0x2b4164[_0xeb13fb(0xdf)]('?')){let _0x170f8e=new RegExp('^'+_0x2b4164[_0xeb13fb(0xee)](/\\./g,String['fromCharCode'](0x5c)+'.')['replace'](/\\*/g,'.*')[_0xeb13fb(0xee)](/\\?/g,'.')+String['fromCharCode'](0x24));return _0x1b550f=>_0x170f8e[_0xeb13fb(0x13d)](_0x1b550f);}else return _0x481cbf=>_0x481cbf===_0x2b4164;}}let _0x2541c5=_0x5d5f92['map'](_0x452777);return _0x129b12[_0x31f57e(0x171)]=_0x29fa56||!_0x5d5f92,!_0x129b12[_0x31f57e(0x171)]&&((_0x2d0f72=_0x129b12[_0x31f57e(0x17f)])==null?void 0x0:_0x2d0f72['hostname'])&&(_0x129b12['_consoleNinjaAllowedToStart']=_0x2541c5[_0x31f57e(0x16f)](_0x5aac20=>_0x5aac20(_0x129b12[_0x31f57e(0x17f)]['hostname']))),_0x539791&&!_0x129b12[_0x31f57e(0x171)]&&!((_0x4b2de8=_0x129b12[_0x31f57e(0x17f)])!=null&&_0x4b2de8[_0x31f57e(0xf1)])&&(_0x129b12[_0x31f57e(0x171)]=!0x0),_0x129b12[_0x31f57e(0x171)];}function X(_0x29fdc9,_0x2e6e58,_0x47d813,_0x2fc14c,_0x16053c){var _0x5d4413=_0x206025;_0x29fdc9=_0x29fdc9,_0x2e6e58=_0x2e6e58,_0x47d813=_0x47d813,_0x2fc14c=_0x2fc14c,_0x16053c=_0x16053c,_0x16053c=_0x16053c||{},_0x16053c['defaultLimits']=_0x16053c[_0x5d4413(0xae)]||{},_0x16053c[_0x5d4413(0x131)]=_0x16053c[_0x5d4413(0x131)]||{},_0x16053c['reducePolicy']=_0x16053c[_0x5d4413(0xb7)]||{},_0x16053c[_0x5d4413(0xb7)]['perLogpoint']=_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)]||{},_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x198)]=_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x198)]||{};let _0xee9e24={'perLogpoint':{'reduceOnCount':_0x16053c['reducePolicy'][_0x5d4413(0x154)]['reduceOnCount']||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)][_0x5d4413(0x122)]||0x64,'resetWhenQuietMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)]['resetWhenQuietMs']||0x1f4,'resetOnProcessingTimeAverageMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)][_0x5d4413(0xaa)]||0x64},'global':{'reduceOnCount':_0x16053c[_0x5d4413(0xb7)]['global'][_0x5d4413(0xc6)]||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x16053c['reducePolicy']['global'][_0x5d4413(0x122)]||0x12c,'resetWhenQuietMs':_0x16053c[_0x5d4413(0xb7)]['global']['resetWhenQuietMs']||0x32,'resetOnProcessingTimeAverageMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x198)]['resetOnProcessingTimeAverageMs']||0x64}},_0x1f62aa=B(_0x29fdc9),_0x57e37c=_0x1f62aa['elapsed'],_0x1c7b58=_0x1f62aa[_0x5d4413(0xec)];function _0x4ec6f8(){var _0x1abe1a=_0x5d4413;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x29fdc9[_0x1abe1a(0x116)],this[_0x1abe1a(0x1a4)]=_0x29fdc9['HTMLAllCollection'],this[_0x1abe1a(0x172)]=Object[_0x1abe1a(0x175)],this[_0x1abe1a(0x1a0)]=Object[_0x1abe1a(0xb4)],this[_0x1abe1a(0xd2)]=_0x29fdc9['Symbol'],this[_0x1abe1a(0xe1)]=RegExp['prototype'][_0x1abe1a(0x19f)],this[_0x1abe1a(0x12a)]=Date[_0x1abe1a(0xa3)][_0x1abe1a(0x19f)];}_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x105)]=function(_0xecd79f,_0x130258,_0x3d83a4,_0x4b701c){var _0x532f2b=_0x5d4413,_0xe7aebd=this,_0x5c720a=_0x3d83a4[_0x532f2b(0xcd)];function _0x52bf8f(_0x27c3f1,_0x1d1770,_0x595195){var _0x56e290=_0x532f2b;_0x1d1770['type']=_0x56e290(0xc9),_0x1d1770[_0x56e290(0x118)]=_0x27c3f1[_0x56e290(0x19b)],_0x41a216=_0x595195[_0x56e290(0xd4)][_0x56e290(0x144)],_0x595195[_0x56e290(0xd4)][_0x56e290(0x144)]=_0x1d1770,_0xe7aebd['_treeNodePropertiesBeforeFullValue'](_0x1d1770,_0x595195);}let _0x4be16e;_0x29fdc9['console']&&(_0x4be16e=_0x29fdc9['console'][_0x532f2b(0x118)],_0x4be16e&&(_0x29fdc9[_0x532f2b(0x15b)]['error']=function(){}));try{try{_0x3d83a4[_0x532f2b(0xcc)]++,_0x3d83a4[_0x532f2b(0xcd)]&&_0x3d83a4['autoExpandPreviousObjects']['push'](_0x130258);var _0x1cac69,_0x2cf7f3,_0x25dcc0,_0x5129d9,_0x303749=[],_0x1db1f6=[],_0x278e4a,_0x26661d=this[_0x532f2b(0x11c)](_0x130258),_0x4a0157=_0x26661d==='array',_0x4d32e9=!0x1,_0x77d70a=_0x26661d===_0x532f2b(0xb0),_0x10033c=this['_isPrimitiveType'](_0x26661d),_0x39cf1e=this['_isPrimitiveWrapperType'](_0x26661d),_0x17e1fc=_0x10033c||_0x39cf1e,_0x3f6c4c={},_0x4d271f=0x0,_0x5bec67=!0x1,_0x41a216,_0x45509d=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3d83a4[_0x532f2b(0xeb)]){if(_0x4a0157){if(_0x2cf7f3=_0x130258['length'],_0x2cf7f3>_0x3d83a4[_0x532f2b(0xd0)]){for(_0x25dcc0=0x0,_0x5129d9=_0x3d83a4['elements'],_0x1cac69=_0x25dcc0;_0x1cac69<_0x5129d9;_0x1cac69++)_0x1db1f6['push'](_0xe7aebd[_0x532f2b(0x14d)](_0x303749,_0x130258,_0x26661d,_0x1cac69,_0x3d83a4));_0xecd79f[_0x532f2b(0x120)]=!0x0;}else{for(_0x25dcc0=0x0,_0x5129d9=_0x2cf7f3,_0x1cac69=_0x25dcc0;_0x1cac69<_0x5129d9;_0x1cac69++)_0x1db1f6[_0x532f2b(0x164)](_0xe7aebd[_0x532f2b(0x14d)](_0x303749,_0x130258,_0x26661d,_0x1cac69,_0x3d83a4));}_0x3d83a4[_0x532f2b(0x12c)]+=_0x1db1f6[_0x532f2b(0x197)];}if(!(_0x26661d===_0x532f2b(0x138)||_0x26661d===_0x532f2b(0x116))&&!_0x10033c&&_0x26661d!==_0x532f2b(0x17e)&&_0x26661d!==_0x532f2b(0xac)&&_0x26661d!==_0x532f2b(0xf3)){var _0x3d7234=_0x4b701c[_0x532f2b(0x16d)]||_0x3d83a4['props'];if(this['_isSet'](_0x130258)?(_0x1cac69=0x0,_0x130258[_0x532f2b(0x123)](function(_0x1c2da5){var _0x4aa18a=_0x532f2b;if(_0x4d271f++,_0x3d83a4['autoExpandPropertyCount']++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;return;}if(!_0x3d83a4[_0x4aa18a(0x1a5)]&&_0x3d83a4[_0x4aa18a(0xcd)]&&_0x3d83a4[_0x4aa18a(0x12c)]>_0x3d83a4[_0x4aa18a(0xe6)]){_0x5bec67=!0x0;return;}_0x1db1f6[_0x4aa18a(0x164)](_0xe7aebd['_addProperty'](_0x303749,_0x130258,_0x4aa18a(0xda),_0x1cac69++,_0x3d83a4,function(_0x4e8b2c){return function(){return _0x4e8b2c;};}(_0x1c2da5)));})):this[_0x532f2b(0x127)](_0x130258)&&_0x130258[_0x532f2b(0x123)](function(_0x1b6187,_0x1dc248){var _0x451ef9=_0x532f2b;if(_0x4d271f++,_0x3d83a4[_0x451ef9(0x12c)]++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;return;}if(!_0x3d83a4[_0x451ef9(0x1a5)]&&_0x3d83a4[_0x451ef9(0xcd)]&&_0x3d83a4[_0x451ef9(0x12c)]>_0x3d83a4[_0x451ef9(0xe6)]){_0x5bec67=!0x0;return;}var _0x3ecd95=_0x1dc248[_0x451ef9(0x19f)]();_0x3ecd95[_0x451ef9(0x197)]>0x64&&(_0x3ecd95=_0x3ecd95[_0x451ef9(0xc8)](0x0,0x64)+'...'),_0x1db1f6['push'](_0xe7aebd[_0x451ef9(0x14d)](_0x303749,_0x130258,_0x451ef9(0x140),_0x3ecd95,_0x3d83a4,function(_0xc22705){return function(){return _0xc22705;};}(_0x1b6187)));}),!_0x4d32e9){try{for(_0x278e4a in _0x130258)if(!(_0x4a0157&&_0x45509d[_0x532f2b(0x13d)](_0x278e4a))&&!this[_0x532f2b(0x17b)](_0x130258,_0x278e4a,_0x3d83a4)){if(_0x4d271f++,_0x3d83a4['autoExpandPropertyCount']++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;break;}if(!_0x3d83a4[_0x532f2b(0x1a5)]&&_0x3d83a4['autoExpand']&&_0x3d83a4[_0x532f2b(0x12c)]>_0x3d83a4[_0x532f2b(0xe6)]){_0x5bec67=!0x0;break;}_0x1db1f6[_0x532f2b(0x164)](_0xe7aebd[_0x532f2b(0xfc)](_0x303749,_0x3f6c4c,_0x130258,_0x26661d,_0x278e4a,_0x3d83a4));}}catch{}if(_0x3f6c4c['_p_length']=!0x0,_0x77d70a&&(_0x3f6c4c[_0x532f2b(0x18d)]=!0x0),!_0x5bec67){var _0x169628=[][_0x532f2b(0x133)](this['_getOwnPropertyNames'](_0x130258))[_0x532f2b(0x133)](this[_0x532f2b(0xc1)](_0x130258));for(_0x1cac69=0x0,_0x2cf7f3=_0x169628['length'];_0x1cac69<_0x2cf7f3;_0x1cac69++)if(_0x278e4a=_0x169628[_0x1cac69],!(_0x4a0157&&_0x45509d[_0x532f2b(0x13d)](_0x278e4a[_0x532f2b(0x19f)]()))&&!this[_0x532f2b(0x17b)](_0x130258,_0x278e4a,_0x3d83a4)&&!_0x3f6c4c[typeof _0x278e4a!=_0x532f2b(0x134)?_0x532f2b(0xf8)+_0x278e4a[_0x532f2b(0x19f)]():_0x278e4a]){if(_0x4d271f++,_0x3d83a4[_0x532f2b(0x12c)]++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;break;}if(!_0x3d83a4[_0x532f2b(0x1a5)]&&_0x3d83a4['autoExpand']&&_0x3d83a4[_0x532f2b(0x12c)]>_0x3d83a4[_0x532f2b(0xe6)]){_0x5bec67=!0x0;break;}_0x1db1f6['push'](_0xe7aebd[_0x532f2b(0xfc)](_0x303749,_0x3f6c4c,_0x130258,_0x26661d,_0x278e4a,_0x3d83a4));}}}}}if(_0xecd79f[_0x532f2b(0x11a)]=_0x26661d,_0x17e1fc?(_0xecd79f['value']=_0x130258['valueOf'](),this[_0x532f2b(0x132)](_0x26661d,_0xecd79f,_0x3d83a4,_0x4b701c)):_0x26661d===_0x532f2b(0xdb)?_0xecd79f[_0x532f2b(0x137)]=this[_0x532f2b(0x12a)]['call'](_0x130258):_0x26661d===_0x532f2b(0xf3)?_0xecd79f[_0x532f2b(0x137)]=_0x130258['toString']():_0x26661d===_0x532f2b(0x179)?_0xecd79f[_0x532f2b(0x137)]=this[_0x532f2b(0xe1)][_0x532f2b(0x182)](_0x130258):_0x26661d===_0x532f2b(0x134)&&this[_0x532f2b(0xd2)]?_0xecd79f['value']=this[_0x532f2b(0xd2)][_0x532f2b(0xa3)]['toString'][_0x532f2b(0x182)](_0x130258):!_0x3d83a4[_0x532f2b(0xeb)]&&!(_0x26661d==='null'||_0x26661d===_0x532f2b(0x116))&&(delete _0xecd79f[_0x532f2b(0x137)],_0xecd79f[_0x532f2b(0x141)]=!0x0),_0x5bec67&&(_0xecd79f['cappedProps']=!0x0),_0x41a216=_0x3d83a4[_0x532f2b(0xd4)][_0x532f2b(0x144)],_0x3d83a4[_0x532f2b(0xd4)][_0x532f2b(0x144)]=_0xecd79f,this[_0x532f2b(0x15e)](_0xecd79f,_0x3d83a4),_0x1db1f6[_0x532f2b(0x197)]){for(_0x1cac69=0x0,_0x2cf7f3=_0x1db1f6[_0x532f2b(0x197)];_0x1cac69<_0x2cf7f3;_0x1cac69++)_0x1db1f6[_0x1cac69](_0x1cac69);}_0x303749['length']&&(_0xecd79f['props']=_0x303749);}catch(_0x5140f8){_0x52bf8f(_0x5140f8,_0xecd79f,_0x3d83a4);}this[_0x532f2b(0x14c)](_0x130258,_0xecd79f),this[_0x532f2b(0x159)](_0xecd79f,_0x3d83a4),_0x3d83a4['node']['current']=_0x41a216,_0x3d83a4[_0x532f2b(0xcc)]--,_0x3d83a4[_0x532f2b(0xcd)]=_0x5c720a,_0x3d83a4['autoExpand']&&_0x3d83a4[_0x532f2b(0xa6)][_0x532f2b(0x178)]();}finally{_0x4be16e&&(_0x29fdc9[_0x532f2b(0x15b)][_0x532f2b(0x118)]=_0x4be16e);}return _0xecd79f;},_0x4ec6f8['prototype'][_0x5d4413(0xc1)]=function(_0x266f17){var _0xf3683a=_0x5d4413;return Object[_0xf3683a(0x161)]?Object[_0xf3683a(0x161)](_0x266f17):[];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x160)]=function(_0x40ce39){var _0x323849=_0x5d4413;return!!(_0x40ce39&&_0x29fdc9['Set']&&this[_0x323849(0x148)](_0x40ce39)===_0x323849(0x11e)&&_0x40ce39[_0x323849(0x123)]);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x17b)]=function(_0x2aef7d,_0x107af1,_0x383bfa){var _0x2f2b6a=_0x5d4413;if(!_0x383bfa[_0x2f2b6a(0x13f)]){let _0x5d22d6=this[_0x2f2b6a(0x172)](_0x2aef7d,_0x107af1);if(_0x5d22d6&&_0x5d22d6[_0x2f2b6a(0x19c)])return!0x0;}return _0x383bfa[_0x2f2b6a(0x125)]?typeof _0x2aef7d[_0x107af1]==_0x2f2b6a(0xb0):!0x1;},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x11c)]=function(_0x4d4b8a){var _0x3d2593=_0x5d4413,_0x53e732='';return _0x53e732=typeof _0x4d4b8a,_0x53e732===_0x3d2593(0xcb)?this['_objectToString'](_0x4d4b8a)===_0x3d2593(0x151)?_0x53e732=_0x3d2593(0xb8):this[_0x3d2593(0x148)](_0x4d4b8a)===_0x3d2593(0x1a6)?_0x53e732='date':this['_objectToString'](_0x4d4b8a)==='[object\\x20BigInt]'?_0x53e732=_0x3d2593(0xf3):_0x4d4b8a===null?_0x53e732=_0x3d2593(0x138):_0x4d4b8a[_0x3d2593(0x16b)]&&(_0x53e732=_0x4d4b8a[_0x3d2593(0x16b)][_0x3d2593(0x12f)]||_0x53e732):_0x53e732===_0x3d2593(0x116)&&this[_0x3d2593(0x1a4)]&&_0x4d4b8a instanceof this[_0x3d2593(0x1a4)]&&(_0x53e732='HTMLAllCollection'),_0x53e732;},_0x4ec6f8[_0x5d4413(0xa3)]['_objectToString']=function(_0x168387){var _0x37f17=_0x5d4413;return Object[_0x37f17(0xa3)]['toString'][_0x37f17(0x182)](_0x168387);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xbf)]=function(_0x38f1bf){var _0x1e0a9a=_0x5d4413;return _0x38f1bf===_0x1e0a9a(0xe5)||_0x38f1bf===_0x1e0a9a(0x10b)||_0x38f1bf===_0x1e0a9a(0x108);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xf7)]=function(_0x126cf5){var _0x14f7d4=_0x5d4413;return _0x126cf5===_0x14f7d4(0x11f)||_0x126cf5===_0x14f7d4(0x17e)||_0x126cf5===_0x14f7d4(0x15d);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x14d)]=function(_0x465760,_0x4221c9,_0x3874da,_0x2f1c46,_0x35ecf4,_0x591db7){var _0x421ec7=this;return function(_0x50d048){var _0x3e5502=_0x8070,_0x58645b=_0x35ecf4['node'][_0x3e5502(0x144)],_0x461b7d=_0x35ecf4[_0x3e5502(0xd4)]['index'],_0x51476b=_0x35ecf4[_0x3e5502(0xd4)]['parent'];_0x35ecf4[_0x3e5502(0xd4)][_0x3e5502(0x194)]=_0x58645b,_0x35ecf4['node'][_0x3e5502(0xb6)]=typeof _0x2f1c46==_0x3e5502(0x108)?_0x2f1c46:_0x50d048,_0x465760[_0x3e5502(0x164)](_0x421ec7[_0x3e5502(0x168)](_0x4221c9,_0x3874da,_0x2f1c46,_0x35ecf4,_0x591db7)),_0x35ecf4[_0x3e5502(0xd4)][_0x3e5502(0x194)]=_0x51476b,_0x35ecf4[_0x3e5502(0xd4)][_0x3e5502(0xb6)]=_0x461b7d;};},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xfc)]=function(_0x4f95ed,_0x5bce7f,_0x26b6b8,_0x115000,_0x2f5960,_0x504da4,_0x5c7f35){var _0x798496=_0x5d4413,_0x589084=this;return _0x5bce7f[typeof _0x2f5960!=_0x798496(0x134)?_0x798496(0xf8)+_0x2f5960[_0x798496(0x19f)]():_0x2f5960]=!0x0,function(_0xb441cf){var _0x5196c4=_0x798496,_0x353e9c=_0x504da4['node']['current'],_0x55658b=_0x504da4[_0x5196c4(0xd4)]['index'],_0x55fa35=_0x504da4[_0x5196c4(0xd4)][_0x5196c4(0x194)];_0x504da4[_0x5196c4(0xd4)]['parent']=_0x353e9c,_0x504da4[_0x5196c4(0xd4)][_0x5196c4(0xb6)]=_0xb441cf,_0x4f95ed[_0x5196c4(0x164)](_0x589084[_0x5196c4(0x168)](_0x26b6b8,_0x115000,_0x2f5960,_0x504da4,_0x5c7f35)),_0x504da4[_0x5196c4(0xd4)]['parent']=_0x55fa35,_0x504da4[_0x5196c4(0xd4)][_0x5196c4(0xb6)]=_0x55658b;};},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x168)]=function(_0x306210,_0x2180f0,_0x5ca781,_0x408a5a,_0x48e11c){var _0xc84a2c=_0x5d4413,_0x5c20d0=this;_0x48e11c||(_0x48e11c=function(_0x31ed11,_0x513401){return _0x31ed11[_0x513401];});var _0x4c683d=_0x5ca781['toString'](),_0x24025e=_0x408a5a[_0xc84a2c(0xbc)]||{},_0x37d022=_0x408a5a['depth'],_0x54791e=_0x408a5a['isExpressionToEvaluate'];try{var _0x15fed0=this['_isMap'](_0x306210),_0x4f96ee=_0x4c683d;_0x15fed0&&_0x4f96ee[0x0]==='\\x27'&&(_0x4f96ee=_0x4f96ee[_0xc84a2c(0x10c)](0x1,_0x4f96ee[_0xc84a2c(0x197)]-0x2));var _0x169a7a=_0x408a5a[_0xc84a2c(0xbc)]=_0x24025e[_0xc84a2c(0xf8)+_0x4f96ee];_0x169a7a&&(_0x408a5a[_0xc84a2c(0xeb)]=_0x408a5a[_0xc84a2c(0xeb)]+0x1),_0x408a5a[_0xc84a2c(0x1a5)]=!!_0x169a7a;var _0x4a6bef=typeof _0x5ca781==_0xc84a2c(0x134),_0x3e82c0={'name':_0x4a6bef||_0x15fed0?_0x4c683d:this[_0xc84a2c(0x193)](_0x4c683d)};if(_0x4a6bef&&(_0x3e82c0[_0xc84a2c(0x134)]=!0x0),!(_0x2180f0==='array'||_0x2180f0===_0xc84a2c(0x173))){var _0x2d07cc=this['_getOwnPropertyDescriptor'](_0x306210,_0x5ca781);if(_0x2d07cc&&(_0x2d07cc[_0xc84a2c(0xe7)]&&(_0x3e82c0['setter']=!0x0),_0x2d07cc[_0xc84a2c(0x19c)]&&!_0x169a7a&&!_0x408a5a[_0xc84a2c(0x13f)]))return _0x3e82c0[_0xc84a2c(0x15c)]=!0x0,this['_processTreeNodeResult'](_0x3e82c0,_0x408a5a),_0x3e82c0;}var _0x38d3a5;try{_0x38d3a5=_0x48e11c(_0x306210,_0x5ca781);}catch(_0x3f76c2){return _0x3e82c0={'name':_0x4c683d,'type':'unknown','error':_0x3f76c2[_0xc84a2c(0x19b)]},this[_0xc84a2c(0x115)](_0x3e82c0,_0x408a5a),_0x3e82c0;}var _0x6a840a=this[_0xc84a2c(0x11c)](_0x38d3a5),_0x4492eb=this[_0xc84a2c(0xbf)](_0x6a840a);if(_0x3e82c0[_0xc84a2c(0x11a)]=_0x6a840a,_0x4492eb)this[_0xc84a2c(0x115)](_0x3e82c0,_0x408a5a,_0x38d3a5,function(){var _0x7e70f7=_0xc84a2c;_0x3e82c0[_0x7e70f7(0x137)]=_0x38d3a5[_0x7e70f7(0x186)](),!_0x169a7a&&_0x5c20d0[_0x7e70f7(0x132)](_0x6a840a,_0x3e82c0,_0x408a5a,{});});else{var _0x59a4b9=_0x408a5a[_0xc84a2c(0xcd)]&&_0x408a5a[_0xc84a2c(0xcc)]<_0x408a5a[_0xc84a2c(0xa2)]&&_0x408a5a[_0xc84a2c(0xa6)][_0xc84a2c(0x13e)](_0x38d3a5)<0x0&&_0x6a840a!==_0xc84a2c(0xb0)&&_0x408a5a['autoExpandPropertyCount']<_0x408a5a['autoExpandLimit'];_0x59a4b9||_0x408a5a[_0xc84a2c(0xcc)]<_0x37d022||_0x169a7a?(this['serialize'](_0x3e82c0,_0x38d3a5,_0x408a5a,_0x169a7a||{}),this[_0xc84a2c(0x14c)](_0x38d3a5,_0x3e82c0)):this[_0xc84a2c(0x115)](_0x3e82c0,_0x408a5a,_0x38d3a5,function(){var _0x36bf02=_0xc84a2c;_0x6a840a===_0x36bf02(0x138)||_0x6a840a===_0x36bf02(0x116)||(delete _0x3e82c0[_0x36bf02(0x137)],_0x3e82c0[_0x36bf02(0x141)]=!0x0);});}return _0x3e82c0;}finally{_0x408a5a[_0xc84a2c(0xbc)]=_0x24025e,_0x408a5a[_0xc84a2c(0xeb)]=_0x37d022,_0x408a5a[_0xc84a2c(0x1a5)]=_0x54791e;}},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x132)]=function(_0x5dbb71,_0x160dc5,_0x566044,_0x14045a){var _0xd41be5=_0x5d4413,_0x3d4872=_0x14045a[_0xd41be5(0x130)]||_0x566044[_0xd41be5(0x130)];if((_0x5dbb71===_0xd41be5(0x10b)||_0x5dbb71===_0xd41be5(0x17e))&&_0x160dc5[_0xd41be5(0x137)]){let _0x241f35=_0x160dc5[_0xd41be5(0x137)]['length'];_0x566044[_0xd41be5(0x181)]+=_0x241f35,_0x566044['allStrLength']>_0x566044[_0xd41be5(0xd9)]?(_0x160dc5[_0xd41be5(0x141)]='',delete _0x160dc5[_0xd41be5(0x137)]):_0x241f35>_0x3d4872&&(_0x160dc5[_0xd41be5(0x141)]=_0x160dc5[_0xd41be5(0x137)][_0xd41be5(0x10c)](0x0,_0x3d4872),delete _0x160dc5[_0xd41be5(0x137)]);}},_0x4ec6f8['prototype'][_0x5d4413(0x127)]=function(_0x1c205c){var _0x15a6f3=_0x5d4413;return!!(_0x1c205c&&_0x29fdc9[_0x15a6f3(0x140)]&&this[_0x15a6f3(0x148)](_0x1c205c)==='[object\\x20Map]'&&_0x1c205c[_0x15a6f3(0x123)]);},_0x4ec6f8[_0x5d4413(0xa3)]['_propertyName']=function(_0x555f36){var _0x30eb10=_0x5d4413;if(_0x555f36[_0x30eb10(0xf4)](/^\\d+$/))return _0x555f36;var _0x459c76;try{_0x459c76=JSON['stringify'](''+_0x555f36);}catch{_0x459c76='\\x22'+this['_objectToString'](_0x555f36)+'\\x22';}return _0x459c76[_0x30eb10(0xf4)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x459c76=_0x459c76[_0x30eb10(0x10c)](0x1,_0x459c76[_0x30eb10(0x197)]-0x2):_0x459c76=_0x459c76[_0x30eb10(0xee)](/'/g,'\\x5c\\x27')[_0x30eb10(0xee)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x459c76;},_0x4ec6f8['prototype'][_0x5d4413(0x115)]=function(_0x37a2bc,_0x3d78b9,_0x2b32a2,_0x1a3790){var _0x17ed05=_0x5d4413;this[_0x17ed05(0x15e)](_0x37a2bc,_0x3d78b9),_0x1a3790&&_0x1a3790(),this[_0x17ed05(0x14c)](_0x2b32a2,_0x37a2bc),this['_treeNodePropertiesAfterFullValue'](_0x37a2bc,_0x3d78b9);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x15e)]=function(_0x34cae9,_0x275743){var _0xa3e7c2=_0x5d4413;this[_0xa3e7c2(0xde)](_0x34cae9,_0x275743),this[_0xa3e7c2(0x17c)](_0x34cae9,_0x275743),this[_0xa3e7c2(0xe2)](_0x34cae9,_0x275743),this[_0xa3e7c2(0x19a)](_0x34cae9,_0x275743);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xde)]=function(_0x32f5e5,_0x53a774){},_0x4ec6f8['prototype']['_setNodeQueryPath']=function(_0x41a6cf,_0x546223){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x170)]=function(_0x8faa79,_0x3cb609){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x15f)]=function(_0x470b4d){var _0x1c20a9=_0x5d4413;return _0x470b4d===this[_0x1c20a9(0xc7)];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x159)]=function(_0x5e1348,_0x3e13d3){var _0x210da8=_0x5d4413;this['_setNodeLabel'](_0x5e1348,_0x3e13d3),this['_setNodeExpandableState'](_0x5e1348),_0x3e13d3[_0x210da8(0x152)]&&this['_sortProps'](_0x5e1348),this[_0x210da8(0x153)](_0x5e1348,_0x3e13d3),this[_0x210da8(0x18a)](_0x5e1348,_0x3e13d3),this[_0x210da8(0x119)](_0x5e1348);},_0x4ec6f8[_0x5d4413(0xa3)]['_additionalMetadata']=function(_0x179ebd,_0x4a5428){var _0x29050a=_0x5d4413;try{_0x179ebd&&typeof _0x179ebd[_0x29050a(0x197)]==_0x29050a(0x108)&&(_0x4a5428[_0x29050a(0x197)]=_0x179ebd[_0x29050a(0x197)]);}catch{}if(_0x4a5428[_0x29050a(0x11a)]===_0x29050a(0x108)||_0x4a5428[_0x29050a(0x11a)]==='Number'){if(isNaN(_0x4a5428[_0x29050a(0x137)]))_0x4a5428[_0x29050a(0xbd)]=!0x0,delete _0x4a5428[_0x29050a(0x137)];else switch(_0x4a5428[_0x29050a(0x137)]){case Number['POSITIVE_INFINITY']:_0x4a5428[_0x29050a(0xab)]=!0x0,delete _0x4a5428['value'];break;case Number[_0x29050a(0x18c)]:_0x4a5428['negativeInfinity']=!0x0,delete _0x4a5428[_0x29050a(0x137)];break;case 0x0:this[_0x29050a(0x199)](_0x4a5428['value'])&&(_0x4a5428['negativeZero']=!0x0);break;}}else _0x4a5428['type']==='function'&&typeof _0x179ebd[_0x29050a(0x12f)]==_0x29050a(0x10b)&&_0x179ebd[_0x29050a(0x12f)]&&_0x4a5428['name']&&_0x179ebd[_0x29050a(0x12f)]!==_0x4a5428[_0x29050a(0x12f)]&&(_0x4a5428[_0x29050a(0x142)]=_0x179ebd[_0x29050a(0x12f)]);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x199)]=function(_0xff5555){var _0x2b82a9=_0x5d4413;return 0x1/_0xff5555===Number[_0x2b82a9(0x18c)];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x136)]=function(_0x243e50){var _0x4f6738=_0x5d4413;!_0x243e50['props']||!_0x243e50[_0x4f6738(0x16d)][_0x4f6738(0x197)]||_0x243e50[_0x4f6738(0x11a)]===_0x4f6738(0xb8)||_0x243e50['type']===_0x4f6738(0x140)||_0x243e50['type']===_0x4f6738(0xda)||_0x243e50[_0x4f6738(0x16d)][_0x4f6738(0xb2)](function(_0x49ebe3,_0x5a68f3){var _0x16ebcb=_0x4f6738,_0x58f5dc=_0x49ebe3[_0x16ebcb(0x12f)][_0x16ebcb(0xce)](),_0x3e8bb7=_0x5a68f3[_0x16ebcb(0x12f)]['toLowerCase']();return _0x58f5dc<_0x3e8bb7?-0x1:_0x58f5dc>_0x3e8bb7?0x1:0x0;});},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x153)]=function(_0x9397d1,_0x3506cd){var _0x46fa9c=_0x5d4413;if(!(_0x3506cd[_0x46fa9c(0x125)]||!_0x9397d1['props']||!_0x9397d1[_0x46fa9c(0x16d)][_0x46fa9c(0x197)])){for(var _0x33052e=[],_0x21b61c=[],_0x31e004=0x0,_0x3263d2=_0x9397d1[_0x46fa9c(0x16d)][_0x46fa9c(0x197)];_0x31e004<_0x3263d2;_0x31e004++){var _0x4367c0=_0x9397d1['props'][_0x31e004];_0x4367c0[_0x46fa9c(0x11a)]===_0x46fa9c(0xb0)?_0x33052e['push'](_0x4367c0):_0x21b61c['push'](_0x4367c0);}if(!(!_0x21b61c[_0x46fa9c(0x197)]||_0x33052e[_0x46fa9c(0x197)]<=0x1)){_0x9397d1[_0x46fa9c(0x16d)]=_0x21b61c;var _0x12a238={'functionsNode':!0x0,'props':_0x33052e};this[_0x46fa9c(0xde)](_0x12a238,_0x3506cd),this[_0x46fa9c(0x170)](_0x12a238,_0x3506cd),this[_0x46fa9c(0xe0)](_0x12a238),this[_0x46fa9c(0x19a)](_0x12a238,_0x3506cd),_0x12a238['id']+='\\x20f',_0x9397d1[_0x46fa9c(0x16d)][_0x46fa9c(0x12d)](_0x12a238);}}},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x18a)]=function(_0x2d3e19,_0x46799d){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xe0)]=function(_0x3f0cab){},_0x4ec6f8[_0x5d4413(0xa3)]['_isArray']=function(_0x3dacb5){var _0x350e08=_0x5d4413;return Array[_0x350e08(0x146)](_0x3dacb5)||typeof _0x3dacb5==_0x350e08(0xcb)&&this[_0x350e08(0x148)](_0x3dacb5)===_0x350e08(0x151);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x19a)]=function(_0x10e2b9,_0x1ff96f){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x119)]=function(_0x516e14){var _0x27970f=_0x5d4413;delete _0x516e14[_0x27970f(0x147)],delete _0x516e14[_0x27970f(0x121)],delete _0x516e14[_0x27970f(0x174)];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xe2)]=function(_0x211393,_0x4c093d){};let _0x5a6ee8=new _0x4ec6f8(),_0x58ea8f={'props':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0x16d)]||0x64,'elements':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xd0)]||0x64,'strLength':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0x130)]||0x400*0x32,'totalStrLength':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xd9)]||0x400*0x32,'autoExpandLimit':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xe6)]||0x1388,'autoExpandMaxDepth':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xa2)]||0xa},_0x5794d0={'props':_0x16053c[_0x5d4413(0x131)]['props']||0x5,'elements':_0x16053c['reducedLimits'][_0x5d4413(0xd0)]||0x5,'strLength':_0x16053c[_0x5d4413(0x131)][_0x5d4413(0x130)]||0x100,'totalStrLength':_0x16053c[_0x5d4413(0x131)]['totalStrLength']||0x100*0x3,'autoExpandLimit':_0x16053c[_0x5d4413(0x131)][_0x5d4413(0xe6)]||0x1e,'autoExpandMaxDepth':_0x16053c[_0x5d4413(0x131)]['autoExpandMaxDepth']||0x2};function _0x5d713e(_0x559ec1,_0x3bab4b,_0x2b0326,_0x398253,_0x25fe92,_0x276876){var _0x38c024=_0x5d4413;let _0x42c2fe,_0x3a7f23;try{_0x3a7f23=_0x1c7b58(),_0x42c2fe=_0x47d813[_0x3bab4b],!_0x42c2fe||_0x3a7f23-_0x42c2fe['ts']>_0xee9e24['perLogpoint'][_0x38c024(0xea)]&&_0x42c2fe[_0x38c024(0xed)]&&_0x42c2fe[_0x38c024(0x10f)]/_0x42c2fe['count']<_0xee9e24[_0x38c024(0x154)][_0x38c024(0xaa)]?(_0x47d813[_0x3bab4b]=_0x42c2fe={'count':0x0,'time':0x0,'ts':_0x3a7f23},_0x47d813['hits']={}):_0x3a7f23-_0x47d813[_0x38c024(0x180)]['ts']>_0xee9e24[_0x38c024(0x198)]['resetWhenQuietMs']&&_0x47d813[_0x38c024(0x180)][_0x38c024(0xed)]&&_0x47d813[_0x38c024(0x180)][_0x38c024(0x10f)]/_0x47d813[_0x38c024(0x180)][_0x38c024(0xed)]<_0xee9e24['global']['resetOnProcessingTimeAverageMs']&&(_0x47d813['hits']={});let _0x2beacd=[],_0xa238bf=_0x42c2fe[_0x38c024(0xf2)]||_0x47d813[_0x38c024(0x180)]['reduceLimits']?_0x5794d0:_0x58ea8f,_0x4de305=_0x404b01=>{var _0x295276=_0x38c024;let _0x3d542a={};return _0x3d542a[_0x295276(0x16d)]=_0x404b01['props'],_0x3d542a[_0x295276(0xd0)]=_0x404b01[_0x295276(0xd0)],_0x3d542a[_0x295276(0x130)]=_0x404b01['strLength'],_0x3d542a[_0x295276(0xd9)]=_0x404b01[_0x295276(0xd9)],_0x3d542a['autoExpandLimit']=_0x404b01[_0x295276(0xe6)],_0x3d542a[_0x295276(0xa2)]=_0x404b01[_0x295276(0xa2)],_0x3d542a[_0x295276(0x152)]=!0x1,_0x3d542a[_0x295276(0x125)]=!_0x2e6e58,_0x3d542a[_0x295276(0xeb)]=0x1,_0x3d542a['level']=0x0,_0x3d542a[_0x295276(0x110)]='root_exp_id',_0x3d542a[_0x295276(0x188)]=_0x295276(0x13b),_0x3d542a[_0x295276(0xcd)]=!0x0,_0x3d542a['autoExpandPreviousObjects']=[],_0x3d542a[_0x295276(0x12c)]=0x0,_0x3d542a[_0x295276(0x13f)]=_0x16053c[_0x295276(0x13f)],_0x3d542a[_0x295276(0x181)]=0x0,_0x3d542a[_0x295276(0xd4)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x3d542a;};for(var _0x4701b5=0x0;_0x4701b5<_0x25fe92[_0x38c024(0x197)];_0x4701b5++)_0x2beacd['push'](_0x5a6ee8[_0x38c024(0x105)]({'timeNode':_0x559ec1===_0x38c024(0x10f)||void 0x0},_0x25fe92[_0x4701b5],_0x4de305(_0xa238bf),{}));if(_0x559ec1===_0x38c024(0x124)||_0x559ec1==='error'){let _0x6a96d1=Error[_0x38c024(0xc3)];try{Error[_0x38c024(0xc3)]=0x1/0x0,_0x2beacd['push'](_0x5a6ee8[_0x38c024(0x105)]({'stackNode':!0x0},new Error()[_0x38c024(0xdd)],_0x4de305(_0xa238bf),{'strLength':0x1/0x0}));}finally{Error[_0x38c024(0xc3)]=_0x6a96d1;}}return{'method':'log','version':_0x2fc14c,'args':[{'ts':_0x2b0326,'session':_0x398253,'args':_0x2beacd,'id':_0x3bab4b,'context':_0x276876}]};}catch(_0x288391){return{'method':_0x38c024(0x1a2),'version':_0x2fc14c,'args':[{'ts':_0x2b0326,'session':_0x398253,'args':[{'type':'unknown','error':_0x288391&&_0x288391[_0x38c024(0x19b)]}],'id':_0x3bab4b,'context':_0x276876}]};}finally{try{if(_0x42c2fe&&_0x3a7f23){let _0x5ad3d3=_0x1c7b58();_0x42c2fe[_0x38c024(0xed)]++,_0x42c2fe['time']+=_0x57e37c(_0x3a7f23,_0x5ad3d3),_0x42c2fe['ts']=_0x5ad3d3,_0x47d813['hits']['count']++,_0x47d813[_0x38c024(0x180)]['time']+=_0x57e37c(_0x3a7f23,_0x5ad3d3),_0x47d813[_0x38c024(0x180)]['ts']=_0x5ad3d3,(_0x42c2fe[_0x38c024(0xed)]>_0xee9e24[_0x38c024(0x154)][_0x38c024(0xc6)]||_0x42c2fe['time']>_0xee9e24['perLogpoint'][_0x38c024(0x122)])&&(_0x42c2fe[_0x38c024(0xf2)]=!0x0),(_0x47d813[_0x38c024(0x180)][_0x38c024(0xed)]>_0xee9e24['global']['reduceOnCount']||_0x47d813[_0x38c024(0x180)][_0x38c024(0x10f)]>_0xee9e24[_0x38c024(0x198)]['reduceOnAccumulatedProcessingTimeMs'])&&(_0x47d813[_0x38c024(0x180)][_0x38c024(0xf2)]=!0x0);}}catch{}}}return _0x5d713e;}((_0x203b5a,_0x30b7c7,_0x324cef,_0x27f652,_0x48e15b,_0x5bb317,_0x3fb50f,_0x343a8,_0x49d5d3,_0x205017,_0x264412,_0x476e4f)=>{var _0x37c213=_0x206025;if(_0x203b5a[_0x37c213(0x14e)])return _0x203b5a[_0x37c213(0x14e)];let _0x591ad1={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!H(_0x203b5a,_0x343a8,_0x48e15b))return _0x203b5a[_0x37c213(0x14e)]=_0x591ad1,_0x203b5a['_console_ninja'];let _0x540ede=B(_0x203b5a),_0x468f43=_0x540ede[_0x37c213(0x12b)],_0x514c25=_0x540ede[_0x37c213(0xec)],_0x53eba8=_0x540ede[_0x37c213(0xd1)],_0x1585a8={'hits':{},'ts':{}},_0x2e4709=X(_0x203b5a,_0x49d5d3,_0x1585a8,_0x5bb317,_0x476e4f),_0x2898c2=(_0x163a2f,_0x3623fa,_0x3f5713,_0x316379,_0x1b0b41,_0x564147)=>{var _0x4f1607=_0x37c213;let _0x3730c8=_0x203b5a[_0x4f1607(0x14e)];try{return _0x203b5a[_0x4f1607(0x14e)]=_0x591ad1,_0x2e4709(_0x163a2f,_0x3623fa,_0x3f5713,_0x316379,_0x1b0b41,_0x564147);}finally{_0x203b5a[_0x4f1607(0x14e)]=_0x3730c8;}},_0x14f15a=_0x1ee0b5=>{_0x1585a8['ts'][_0x1ee0b5]=_0x514c25();},_0x2c00f7=(_0x26ccbf,_0x14ea2f)=>{let _0x48585e=_0x1585a8['ts'][_0x14ea2f];if(delete _0x1585a8['ts'][_0x14ea2f],_0x48585e){let _0xac0e=_0x468f43(_0x48585e,_0x514c25());_0x1941f0(_0x2898c2('time',_0x26ccbf,_0x53eba8(),_0x17718d,[_0xac0e],_0x14ea2f));}},_0x31320e=_0x3349e3=>{var _0xc2d4c3=_0x37c213,_0x1a6fc7;return _0x48e15b==='next.js'&&_0x203b5a[_0xc2d4c3(0xca)]&&((_0x1a6fc7=_0x3349e3==null?void 0x0:_0x3349e3[_0xc2d4c3(0x113)])==null?void 0x0:_0x1a6fc7[_0xc2d4c3(0x197)])&&(_0x3349e3['args'][0x0][_0xc2d4c3(0xca)]=_0x203b5a[_0xc2d4c3(0xca)]),_0x3349e3;};_0x203b5a[_0x37c213(0x14e)]={'consoleLog':(_0x587d5a,_0x4a2aed)=>{var _0x14d3d4=_0x37c213;_0x203b5a[_0x14d3d4(0x15b)]['log'][_0x14d3d4(0x12f)]!=='disabledLog'&&_0x1941f0(_0x2898c2(_0x14d3d4(0x1a2),_0x587d5a,_0x53eba8(),_0x17718d,_0x4a2aed));},'consoleTrace':(_0x41ced6,_0x4beb53)=>{var _0x490de8=_0x37c213,_0x437ded,_0x2f3a5c;_0x203b5a[_0x490de8(0x15b)][_0x490de8(0x1a2)][_0x490de8(0x12f)]!==_0x490de8(0x14f)&&((_0x2f3a5c=(_0x437ded=_0x203b5a[_0x490de8(0x128)])==null?void 0x0:_0x437ded[_0x490de8(0x13c)])!=null&&_0x2f3a5c[_0x490de8(0xd4)]&&(_0x203b5a[_0x490de8(0x196)]=!0x0),_0x1941f0(_0x31320e(_0x2898c2(_0x490de8(0x124),_0x41ced6,_0x53eba8(),_0x17718d,_0x4beb53))));},'consoleError':(_0x4816b9,_0x8b9537)=>{var _0x11a235=_0x37c213;_0x203b5a[_0x11a235(0x196)]=!0x0,_0x1941f0(_0x31320e(_0x2898c2(_0x11a235(0x118),_0x4816b9,_0x53eba8(),_0x17718d,_0x8b9537)));},'consoleTime':_0x5d5cdd=>{_0x14f15a(_0x5d5cdd);},'consoleTimeEnd':(_0x509cca,_0x533215)=>{_0x2c00f7(_0x533215,_0x509cca);},'autoLog':(_0x3e3e0e,_0x239569)=>{_0x1941f0(_0x2898c2('log',_0x239569,_0x53eba8(),_0x17718d,[_0x3e3e0e]));},'autoLogMany':(_0x5396f2,_0x2e21a4)=>{var _0x24649c=_0x37c213;_0x1941f0(_0x2898c2(_0x24649c(0x1a2),_0x5396f2,_0x53eba8(),_0x17718d,_0x2e21a4));},'autoTrace':(_0xc5a86f,_0x284f0e)=>{var _0x19371e=_0x37c213;_0x1941f0(_0x31320e(_0x2898c2(_0x19371e(0x124),_0x284f0e,_0x53eba8(),_0x17718d,[_0xc5a86f])));},'autoTraceMany':(_0x2186d5,_0x539807)=>{_0x1941f0(_0x31320e(_0x2898c2('trace',_0x2186d5,_0x53eba8(),_0x17718d,_0x539807)));},'autoTime':(_0x1b9356,_0x1765d1,_0x1fe25f)=>{_0x14f15a(_0x1fe25f);},'autoTimeEnd':(_0x1a985f,_0x4488ae,_0x49e434)=>{_0x2c00f7(_0x4488ae,_0x49e434);},'coverage':_0x33489e=>{var _0x32d229=_0x37c213;_0x1941f0({'method':_0x32d229(0xad),'version':_0x5bb317,'args':[{'id':_0x33489e}]});}};let _0x1941f0=q(_0x203b5a,_0x30b7c7,_0x324cef,_0x27f652,_0x48e15b,_0x205017,_0x264412),_0x17718d=_0x203b5a[_0x37c213(0x14a)];return _0x203b5a[_0x37c213(0x14e)];})(globalThis,'127.0.0.1',_0x206025(0x163),_0x206025(0x166),'next.js',_0x206025(0x135),_0x206025(0x177),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"MacBook-Pro.local\",\"http://localhost:3000\",\"192.168.0.133\"],'1',_0x206025(0xfe),_0x206025(0x156),_0x206025(0x12e));");
    } catch (e) {
        console.error(e);
    }
}
function oo_oo(i, ...v) {
    try {
        oo_cm().consoleLog(i, v);
    } catch (e) {}
    return v;
}
oo_oo; /* istanbul ignore next */ 
function oo_tr(i, ...v) {
    try {
        oo_cm().consoleTrace(i, v);
    } catch (e) {}
    return v;
}
oo_tr; /* istanbul ignore next */ 
function oo_tx(i, ...v) {
    try {
        oo_cm().consoleError(i, v);
    } catch (e) {}
    return v;
}
oo_tx; /* istanbul ignore next */ 
function oo_ts(v) {
    try {
        oo_cm().consoleTime(v);
    } catch (e) {}
    return v;
}
oo_ts; /* istanbul ignore next */ 
function oo_te(v, i) {
    try {
        oo_cm().consoleTimeEnd(v, i);
    } catch (e) {}
    return v;
}
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/ 
}),
"[project]/true-north-trading/frontend/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/true-north-trading/frontend/src/components/ui/sheet.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sheet",
    ()=>Sheet,
    "SheetClose",
    ()=>SheetClose,
    "SheetContent",
    ()=>SheetContent,
    "SheetDescription",
    ()=>SheetDescription,
    "SheetFooter",
    ()=>SheetFooter,
    "SheetHeader",
    ()=>SheetHeader,
    "SheetOverlay",
    ()=>SheetOverlay,
    "SheetPortal",
    ()=>SheetPortal,
    "SheetTitle",
    ()=>SheetTitle,
    "SheetTrigger",
    ()=>SheetTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const Sheet = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const SheetTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const SheetClose = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"];
const SheetPortal = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const SheetOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props,
        ref: ref
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
        lineNumber: 15,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SheetOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const SheetContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ side = "right", className, children, ...props }, ref)=>{
    const sideClasses = {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-2xl"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed z-50 gap-4 bg-white dark:bg-gray-900 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", sideClasses[side], className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
SheetContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const SheetHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
        lineNumber: 85,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
SheetFooter.displayName = "SheetFooter";
const SheetTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold text-gray-950 dark:text-gray-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
        lineNumber: 99,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SheetTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const SheetDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-gray-500 dark:text-gray-400", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/components/ui/sheet.tsx",
        lineNumber: 114,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SheetDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs) <export default as minpath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minpath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs) <export default as minproc>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minproc",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:process [external] (node:process, cjs)");
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs) <export fileURLToPath as urlToPath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlToPath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
}),
"[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StreamingMarkdownCompact",
    ()=>StreamingMarkdownCompact,
    "default",
    ()=>StreamingMarkdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * StreamingMarkdown Component
 * Renders markdown with proper styling and a typing cursor effect
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/react-markdown/lib/index.js [app-ssr] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/remark-gfm/lib/index.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function StreamingMarkdown({ content, isStreaming = false, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `prose prose-sm dark:prose-invert max-w-none ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                remarkPlugins: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                ],
                components: {
                    // Headings with improved dark mode
                    h1: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-4 border-b-2 border-blue-500 pb-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, void 0),
                    h2: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-gray-900 dark:text-gray-100 mt-5 mb-3",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, void 0),
                    h3: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, void 0),
                    // Paragraphs with dark mode
                    p: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700 dark:text-gray-300 leading-relaxed mb-3",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, void 0),
                    // Lists with dark mode
                    ul: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, void 0),
                    ol: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            className: "list-decimal list-inside space-y-2 mb-4 ml-4 text-gray-700 dark:text-gray-300",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, void 0),
                    li: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "ml-2 leading-relaxed",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, void 0),
                    // Code blocks with improved dark mode
                    code: ({ className, children })=>{
                        const isInline = !className;
                        return isInline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 70,
                            columnNumber: 15
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "block bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 74,
                            columnNumber: 15
                        }, void 0);
                    },
                    // Blockquotes with improved styling
                    blockquote: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                            className: "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 italic text-gray-700 dark:text-gray-300 my-4 rounded-r",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, void 0),
                    // Links with improved styling
                    a: ({ href, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: href,
                            className: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, void 0),
                    // Tables with dark mode
                    table: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto mb-4 rounded-lg border border-gray-200 dark:border-gray-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, void 0),
                    thead: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "bg-gray-50 dark:bg-gray-800",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, void 0),
                    tbody: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, void 0),
                    tr: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 115,
                            columnNumber: 33
                        }, void 0),
                    th: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            className: "px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, void 0),
                    td: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                            className: "px-4 py-2 text-sm text-gray-700 dark:text-gray-300",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, void 0),
                    // Strong/Bold with dark mode
                    strong: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: "font-bold text-gray-900 dark:text-gray-100",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, void 0),
                    // Emphasis/Italic with dark mode
                    em: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                            className: "italic text-gray-700 dark:text-gray-300",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, void 0),
                    // Horizontal rule with dark mode
                    hr: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                            className: "my-6 border-t border-gray-300 dark:border-gray-700"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, void 0)
                },
                children: content
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block w-2 h-5 bg-blue-600 ml-1 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                lineNumber: 152,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function StreamingMarkdownCompact({ content, isStreaming = false, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `text-sm ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                remarkPlugins: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
                ],
                components: {
                    h1: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-lg font-bold text-gray-900 mb-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, void 0),
                    h2: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-base font-bold text-gray-900 mb-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, void 0),
                    h3: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm font-semibold text-gray-800 mb-1",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, void 0),
                    p: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-700 leading-relaxed mb-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 185,
                            columnNumber: 13
                        }, void 0),
                    ul: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "list-disc list-inside space-y-1 mb-2 text-gray-700",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, void 0),
                    code: ({ className, children })=>{
                        const isInline = !className;
                        return isInline ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "bg-gray-100 text-red-600 px-1 py-0.5 rounded text-xs font-mono",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 195,
                            columnNumber: 15
                        }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "block bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                            lineNumber: 199,
                            columnNumber: 15
                        }, void 0);
                    }
                },
                children: content
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-block w-1.5 h-4 bg-blue-600 ml-1 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
}),
"[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StreamingAnalysisDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/components/ui/sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$StreamingMarkdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/components/StreamingMarkdown.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowPathIcon.js [app-ssr] (ecmascript) <export default as ArrowPathIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-ssr] (ecmascript) <export default as CheckCircleIcon>");
"use client";
;
;
;
;
function StreamingAnalysisDrawer({ open, onOpenChange, symbol, isStreaming, progress, currentAgent, agentTexts, finalData }) {
    const getRecommendationColor = (recommendation)=>{
        switch(recommendation?.toUpperCase()){
            case "BUY":
                return "text-green-600 bg-green-50 border-green-200";
            case "SELL":
                return "text-red-600 bg-red-50 border-red-200";
            default:
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
            side: "right",
            className: "w-full sm:max-w-4xl overflow-y-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTitle"], {
                            className: "text-2xl font-bold flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "📊 ",
                                        symbol,
                                        " - Multi-Agent Analysis"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this),
                                isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                                    className: "h-5 w-5 text-blue-600 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetDescription"], {
                            children: "Real-time AI analysis from multiple specialized trading agents"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 space-y-6",
                    children: [
                        isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-gray-700 dark:text-gray-300",
                                            children: currentAgent
                                        }, void 0, false, {
                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-500",
                                            children: [
                                                progress.toFixed(0),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                            lineNumber: 72,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-full bg-blue-600 transition-all duration-300",
                                        style: {
                                            width: `${progress}%`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                        lineNumber: 75,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, this),
                        Object.entries(agentTexts).map(([agent, text])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2",
                                                children: [
                                                    agent,
                                                    !isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                        className: "h-5 w-5 text-green-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                lineNumber: 90,
                                                columnNumber: 17
                                            }, this),
                                            isStreaming && currentAgent.includes(agent) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-blue-600 font-medium",
                                                children: "Writing..."
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                lineNumber: 97,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "prose dark:prose-invert max-w-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$StreamingMarkdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                content: text || "Analyzing..."
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                lineNumber: 103,
                                                columnNumber: 17
                                            }, this),
                                            text && isStreaming && currentAgent.includes(agent) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                lineNumber: 105,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, agent, true, {
                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this)),
                        finalData && !isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                        className: "h-6 w-6 text-green-500 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Analysis Complete"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                lineNumber: 117,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                            lineNumber: 116,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-4 rounded-lg border-l-4 mb-4 ${getRecommendationColor(finalData.overall_recommendation || finalData.recommendation)}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-semibold mb-2",
                                                    children: [
                                                        "Recommendation:",
                                                        " ",
                                                        finalData.overall_recommendation || finalData.recommendation
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: [
                                                        "Confidence:",
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold",
                                                            children: [
                                                                ((finalData.confidence || 0) * 100).toFixed(1),
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: [
                                                        "Target: $",
                                                        finalData.target_price?.toFixed(2),
                                                        " | Stop Loss: $",
                                                        finalData.stop_loss?.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this),
                                        finalData.price_targets && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-4 mt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-green-700 dark:text-green-300 font-medium mb-1",
                                                            children: "Bull Case"
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                            lineNumber: 149,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl font-bold text-green-800 dark:text-green-200",
                                                            children: [
                                                                "$",
                                                                finalData.price_targets.bull_case.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                            lineNumber: 152,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-blue-700 dark:text-blue-300 font-medium mb-1",
                                                            children: "Base Case"
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl font-bold text-blue-800 dark:text-blue-200",
                                                            children: [
                                                                "$",
                                                                finalData.price_targets.base_case.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                            lineNumber: 160,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-red-700 dark:text-red-300 font-medium mb-1",
                                                            children: "Bear Case"
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xl font-bold text-red-800 dark:text-red-200",
                                                            children: [
                                                                "$",
                                                                finalData.price_targets.bear_case.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                            lineNumber: 147,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this),
                                (finalData.debate_summary || finalData.synthesis) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3",
                                            children: "📝 Investment Thesis"
                                        }, void 0, false, {
                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "prose dark:prose-invert max-w-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$StreamingMarkdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                content: finalData.debate_summary || finalData.synthesis
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                                lineNumber: 183,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                    lineNumber: 178,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        !isStreaming && Object.keys(agentTexts).length === 0 && !finalData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12 text-gray-500",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No analysis data available."
                            }, void 0, false, {
                                fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                                lineNumber: 197,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                            lineNumber: 196,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingAIButton",
    ()=>FloatingAIButton,
    "InlineAIButton",
    ()=>InlineAIButton,
    "default",
    ()=>AIAnalysisButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/SparklesIcon.js [app-ssr] (ecmascript) <export default as SparklesIcon>");
"use client";
;
;
function AIAnalysisButton({ context, onAnalyze, variant = "primary", size = "md", className = "", isAnalyzing = false }) {
    const getButtonLabel = ()=>{
        if (isAnalyzing) return "Analyzing...";
        switch(context.type){
            case "stock":
                return `AI Analysis${context.symbol ? `: ${context.symbol}` : ""}`;
            case "portfolio":
                return "Analyze Portfolio";
            case "market":
                return "Market Analysis";
            case "opportunity":
                return "Deep Analysis";
            case "trader":
                return "Analyze Trader";
            case "sector":
                return "Sector Analysis";
            default:
                return "AI Analysis";
        }
    };
    const getSizeClasses = ()=>{
        switch(size){
            case "sm":
                return "px-2 py-1 text-xs";
            case "lg":
                return "px-6 py-3 text-base";
            default:
                return "px-4 py-2 text-sm";
        }
    };
    const getVariantClasses = ()=>{
        const baseClasses = "rounded-lg font-medium transition-all duration-200 flex items-center gap-2";
        switch(variant){
            case "primary":
                return `${baseClasses} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`;
            case "secondary":
                return `${baseClasses} bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`;
            case "icon":
                return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`;
            default:
                return baseClasses;
        }
    };
    if (variant === "icon") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onAnalyze,
            disabled: isAnalyzing,
            className: `${getVariantClasses()} ${className}`,
            title: getButtonLabel(),
            "aria-label": getButtonLabel(),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                className: `h-5 w-5 ${isAnalyzing ? "animate-spin" : "animate-pulse"}`
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onAnalyze,
        disabled: isAnalyzing,
        className: `${getVariantClasses()} ${getSizeClasses()} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                className: `h-5 w-5 ${isAnalyzing ? "animate-spin" : ""}`
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: getButtonLabel()
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
function FloatingAIButton({ context, onAnalyze, position = "bottom-right", isAnalyzing = false }) {
    const getPositionClasses = ()=>{
        switch(position){
            case "bottom-right":
                return "bottom-4 right-4";
            case "bottom-left":
                return "bottom-4 left-4";
            case "top-right":
                return "top-4 right-4";
            case "top-left":
                return "top-4 left-4";
            default:
                return "bottom-4 right-4";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed ${getPositionClasses()} z-50`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onAnalyze,
            disabled: isAnalyzing,
            className: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group",
            title: `AI Analysis${context.symbol ? `: ${context.symbol}` : ""}`,
            "aria-label": "AI Analysis",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                    className: `h-6 w-6 ${isAnalyzing ? "animate-spin" : "group-hover:animate-pulse"}`
                }, void 0, false, {
                    fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this),
                isAnalyzing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "absolute -top-2 -right-2 flex h-4 w-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative inline-flex rounded-full h-4 w-4 bg-blue-500"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
            lineNumber: 148,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
function InlineAIButton({ context, onAnalyze, isAnalyzing = false, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: (e)=>{
            e.stopPropagation(); // Prevent parent click events
            onAnalyze();
        },
        disabled: isAnalyzing,
        className: `inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`,
        title: "AI Analysis",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                className: `h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            !isAnalyzing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "AI"
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
                lineNumber: 193,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
}),
"[project]/true-north-trading/frontend/src/app/opportunities/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OpportunitiesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FunnelIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FunnelIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/FunnelIcon.js [app-ssr] (ecmascript) <export default as FunnelIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowPathIcon.js [app-ssr] (ecmascript) <export default as ArrowPathIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ChartBarIcon.js [app-ssr] (ecmascript) <export default as ChartBarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationTriangleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExclamationTriangleIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ExclamationTriangleIcon.js [app-ssr] (ecmascript) <export default as ExclamationTriangleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [app-ssr] (ecmascript) <export default as CheckCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronUpIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ChevronUpIcon.js [app-ssr] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/SparklesIcon.js [app-ssr] (ecmascript) <export default as SparklesIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$NewspaperIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NewspaperIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/NewspaperIcon.js [app-ssr] (ecmascript) <export default as NewspaperIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CalculatorIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalculatorIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/CalculatorIcon.js [app-ssr] (ecmascript) <export default as CalculatorIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ShieldCheckIcon.js [app-ssr] (ecmascript) <export default as ShieldCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$StreamingAnalysisDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/components/StreamingAnalysisDrawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$AIAnalysisButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/components/AIAnalysisButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function OpportunitiesPage() {
    const { data: opportunities, loading, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpportunities"])();
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("score");
    const [expandedOpportunity, setExpandedOpportunity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [analysisData, setAnalysisData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [loadingAnalysis, setLoadingAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [analysisProgress, setAnalysisProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [agentTexts, setAgentTexts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [expandedSources, setExpandedSources] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({}); // { symbol: 'market_analyst' | 'news_analyst' | etc }
    const [drawerOpen, setDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [drawerSymbol, setDrawerSymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const filteredOpportunities = opportunities?.filter((opp)=>{
        if (filter === "all") return true;
        return opp.risk_level.toLowerCase() === filter;
    }).sort((a, b)=>{
        if (sortBy === "score") return b.score - a.score;
        if (sortBy === "symbol") return a.symbol.localeCompare(b.symbol);
        return 0;
    });
    const getRiskBadgeColor = (risk)=>{
        switch(risk.toLowerCase()){
            case "low":
                return "bg-green-100 text-green-800 border-green-200";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "high":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };
    const getScoreColor = (score)=>{
        if (score >= 8) return "text-green-600";
        if (score >= 6) return "text-yellow-600";
        return "text-red-600";
    };
    const loadDetailedAnalysis = async (symbol)=>{
        // Open drawer
        setDrawerSymbol(symbol);
        setDrawerOpen(true);
        if (analysisData[symbol]) {
            // Already loaded, just show it in drawer
            return;
        }
        // Load analysis with TEXT STREAMING
        setLoadingAnalysis({
            ...loadingAnalysis,
            [symbol]: true
        });
        setAnalysisProgress({
            ...analysisProgress,
            [symbol]: {
                currentAgent: "Starting...",
                progress: 0
            }
        });
        setAgentTexts((prev)=>({
                ...prev,
                [symbol]: {}
            })); // Initialize empty agent texts
        try {
            const API_URL = ("TURBOPACK compile-time value", "http://localhost:8002") || "http://localhost:8002";
            const eventSource = new EventSource(`${API_URL}/api/analyze-stock-stream-text/${symbol}`);
            eventSource.onmessage = (event)=>{
                try {
                    const data = JSON.parse(event.data);
                    /* eslint-disable */ console.log(...oo_oo(`4016983425_157_10_157_56_4`, `[${symbol}] Stream event:`, data));
                    // Handle REAL-TIME TEXT STREAMING from agents
                    if (data.event === "agent_text_start") {
                        /* eslint-disable */ console.log(...oo_oo(`4016983425_161_12_161_76_4`, `[${symbol}] 🚀 ${data.agent} starting to write...`));
                        setAgentTexts((prev)=>({
                                ...prev,
                                [symbol]: {
                                    ...prev[symbol],
                                    [data.agent]: ""
                                }
                            }));
                    } else if (data.event === "agent_text_chunk") {
                        // Stream text word-by-word
                        /* eslint-disable */ console.log(...oo_oo(`4016983425_171_12_171_70_4`, `[${symbol}] 📝 ${data.agent}: ${data.chunk}`));
                        setAgentTexts((prev)=>({
                                ...prev,
                                [symbol]: {
                                    ...prev[symbol],
                                    [data.agent]: (prev[symbol]?.[data.agent] || "") + data.chunk
                                }
                            }));
                    } else if (data.event === "agent_text_complete") {
                        /* eslint-disable */ console.log(...oo_oo(`4016983425_180_12_180_71_4`, `[${symbol}] ✅ ${data.agent} finished writing`));
                    }
                    // Update progress based on event type
                    if (data.event === "start") {
                        setAnalysisProgress((prev)=>({
                                ...prev,
                                [symbol]: {
                                    currentAgent: "Multi-agent analysis started",
                                    progress: 0
                                }
                            }));
                    } else if (data.event === "agent_start") {
                        setAnalysisProgress((prev)=>({
                                ...prev,
                                [symbol]: {
                                    currentAgent: `Running ${data.agent}...`,
                                    progress: data.progress || 0
                                }
                            }));
                    } else if (data.event === "agent_complete") {
                        setAnalysisProgress((prev)=>({
                                ...prev,
                                [symbol]: {
                                    currentAgent: `✓ ${data.agent} complete`,
                                    progress: data.progress || 0
                                }
                            }));
                    } else if (data.event === "synthesis_start") {
                        setAnalysisProgress((prev)=>({
                                ...prev,
                                [symbol]: {
                                    currentAgent: "Synthesizing results...",
                                    progress: 90
                                }
                            }));
                    } else if (data.event === "done") {
                        // Analysis complete
                        /* eslint-disable */ console.log(...oo_oo(`4016983425_218_12_218_63_4`, `[${symbol}] Analysis complete!`, data));
                        setAnalysisData((prev)=>({
                                ...prev,
                                [symbol]: data
                            }));
                        setLoadingAnalysis((prev)=>({
                                ...prev,
                                [symbol]: false
                            }));
                        setAnalysisProgress((prev)=>({
                                ...prev,
                                [symbol]: {
                                    currentAgent: "Complete!",
                                    progress: 100
                                }
                            }));
                        eventSource.close();
                    } else if (data.event === "error") {
                        /* eslint-disable */ console.error(...oo_tx(`4016983425_227_12_227_70_11`, `[${symbol}] Analysis error:`, data.message));
                        setLoadingAnalysis((prev)=>({
                                ...prev,
                                [symbol]: false
                            }));
                        eventSource.close();
                    }
                } catch (err) {
                    /* eslint-disable */ console.error(...oo_tx(`4016983425_232_10_232_53_11`, "Error parsing stream:", err));
                }
            };
            eventSource.onerror = (error)=>{
                /* eslint-disable */ console.error(...oo_tx(`4016983425_237_8_237_59_11`, `Stream error for ${symbol}:`, error));
                setLoadingAnalysis((prev)=>({
                        ...prev,
                        [symbol]: false
                    }));
                setAnalysisProgress((prev)=>({
                        ...prev,
                        [symbol]: {
                            currentAgent: "Error occurred",
                            progress: 0
                        }
                    }));
                eventSource.close();
            };
        } catch (error) {
            /* eslint-disable */ console.error(...oo_tx(`4016983425_246_6_246_68_11`, `Failed to load analysis for ${symbol}:`, error));
            setLoadingAnalysis({
                ...loadingAnalysis,
                [symbol]: false
            });
        }
    };
    const toggleSourceEvidence = (symbol, agentType)=>{
        setExpandedSources((prev)=>({
                ...prev,
                [symbol]: prev[symbol] === agentType ? null : agentType
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow-sm border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-gray-900",
                                        children: "Trading Opportunities"
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-gray-600",
                                        children: "AI-discovered investment opportunities with detailed analysis"
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>refetch(),
                                disabled: loading,
                                className: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                                        className: `h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this),
                                    loading ? "Discovering..." : "Run Discovery"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-sm border border-gray-200 p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$FunnelIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FunnelIcon$3e$__["FunnelIcon"], {
                                        className: "h-5 w-5 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2",
                                        children: [
                                            "all",
                                            "low",
                                            "medium",
                                            "high"
                                        ].map((riskLevel)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setFilter(riskLevel),
                                                className: `px-3 py-1 rounded-md text-sm font-medium ${filter === riskLevel ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                                                children: [
                                                    riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1),
                                                    " ",
                                                    "Risk"
                                                ]
                                            }, riskLevel, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-600",
                                        children: "Sort by:"
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 311,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sortBy,
                                        onChange: (e)=>setSortBy(e.target.value),
                                        className: "px-3 py-1 border border-gray-300 rounded-md text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "score",
                                                children: "Score"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "symbol",
                                                children: "Symbol"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12",
                children: loading && !opportunities ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center items-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                            className: "h-8 w-8 text-blue-600 animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 329,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-3 text-gray-600",
                            children: "Discovering opportunities..."
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                    lineNumber: 328,
                    columnNumber: 11
                }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 border border-red-200 rounded-lg p-6 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ExclamationTriangleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExclamationTriangleIcon$3e$__["ExclamationTriangleIcon"], {
                            className: "h-12 w-12 text-red-600 mx-auto mb-3"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-800 font-medium",
                            children: "Failed to load opportunities"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 337,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-600 text-sm mt-1",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                    lineNumber: 335,
                    columnNumber: 11
                }, this) : filteredOpportunities && filteredOpportunities.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: filteredOpportunities.map((opportunity, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.3,
                                delay: index * 0.05
                            },
                            className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-2xl font-bold text-gray-900",
                                                            children: opportunity.symbol
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$AIAnalysisButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InlineAIButton"], {
                                                            context: {
                                                                type: "stock",
                                                                symbol: opportunity.symbol,
                                                                data: opportunity
                                                            },
                                                            onAnalyze: ()=>loadDetailedAnalysis(opportunity.symbol),
                                                            isAnalyzing: loadingAnalysis[opportunity.symbol]
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(opportunity.risk_level)}`,
                                                            children: [
                                                                opportunity.risk_level.toUpperCase(),
                                                                " RISK"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 370,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200",
                                                            children: opportunity.timeframe.toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 377,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                    lineNumber: 355,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-medium text-gray-700 mb-3",
                                                    children: opportunity.title
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 mb-4",
                                                    children: opportunity.reasoning
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 21
                                                }, this),
                                                (opportunity.entry_price || opportunity.target_price || opportunity.stop_loss) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-3 gap-4 mt-4",
                                                    children: [
                                                        opportunity.entry_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-blue-50 rounded-lg p-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-blue-600 font-medium mb-1",
                                                                    children: "Entry Price"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 395,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold text-blue-900",
                                                                    children: [
                                                                        "$",
                                                                        opportunity.entry_price.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 394,
                                                            columnNumber: 27
                                                        }, this),
                                                        opportunity.target_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-green-50 rounded-lg p-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-green-600 font-medium mb-1",
                                                                    children: "Target Price"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 405,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold text-green-900",
                                                                    children: [
                                                                        "$",
                                                                        opportunity.target_price.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 408,
                                                                    columnNumber: 29
                                                                }, this),
                                                                opportunity.entry_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-green-600 mt-1",
                                                                    children: [
                                                                        "+",
                                                                        ((opportunity.target_price - opportunity.entry_price) / opportunity.entry_price * 100).toFixed(1),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 412,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 404,
                                                            columnNumber: 27
                                                        }, this),
                                                        opportunity.stop_loss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-red-50 rounded-lg p-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-red-600 font-medium mb-1",
                                                                    children: "Stop Loss"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 427,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-lg font-bold text-red-900",
                                                                    children: [
                                                                        "$",
                                                                        opportunity.stop_loss.toFixed(2)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 430,
                                                                    columnNumber: 29
                                                                }, this),
                                                                opportunity.entry_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-red-600 mt-1",
                                                                    children: [
                                                                        "-",
                                                                        ((opportunity.entry_price - opportunity.stop_loss) / opportunity.entry_price * 100).toFixed(1),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                    lineNumber: 434,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 426,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-6 flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__["ChartBarIcon"], {
                                                    className: "h-8 w-8 text-gray-400 mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600 mb-1",
                                                            children: "Confidence Score"
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 455,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `text-4xl font-bold ${getScoreColor(opportunity.score)}`,
                                                            children: opportunity.score.toFixed(1)
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 458,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500",
                                                            children: "/10"
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                            lineNumber: 465,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                    lineNumber: 454,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                            lineNumber: 452,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                    lineNumber: 352,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>loadDetailedAnalysis(opportunity.symbol),
                                    className: "mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors",
                                    children: expandedOpportunity === opportunity.symbol ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChevronUpIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
                                                className: "h-5 w-5 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 23
                                            }, this),
                                            "Hide Full Research"
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                                                className: "h-5 w-5 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                lineNumber: 482,
                                                columnNumber: 23
                                            }, this),
                                            "Show Full Multi-Agent Research"
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                    lineNumber: 471,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: expandedOpportunity === opportunity.symbol && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: "auto",
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        transition: {
                                            duration: 0.3
                                        },
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 pt-6 border-t border-gray-200",
                                            children: loadingAnalysis[opportunity.symbol] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center py-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                                                        className: "h-8 w-8 text-blue-600 animate-spin mx-auto mb-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-600 font-semibold mb-2",
                                                        children: [
                                                            "Running multi-agent analysis on",
                                                            " ",
                                                            opportunity.symbol,
                                                            "..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 29
                                                    }, this),
                                                    analysisProgress[opportunity.symbol] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "max-w-md mx-auto mt-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-2 bg-gray-200 rounded-full overflow-hidden",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "h-full bg-blue-600 transition-all duration-300",
                                                                            style: {
                                                                                width: `${analysisProgress[opportunity.symbol].progress}%`
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                            lineNumber: 510,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 509,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-500 mt-2",
                                                                        children: analysisProgress[opportunity.symbol].currentAgent
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-400 mt-1",
                                                                        children: [
                                                                            analysisProgress[opportunity.symbol].progress.toFixed(0),
                                                                            "% complete"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 526,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 508,
                                                                columnNumber: 33
                                                            }, this),
                                                            agentTexts[opportunity.symbol] && Object.keys(agentTexts[opportunity.symbol]).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-8 text-left max-w-4xl mx-auto space-y-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-lg font-bold text-gray-900 mb-4",
                                                                        children: "📝 Agent Analysis (Live)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 539,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    Object.entries(agentTexts[opportunity.symbol]).map(([agent, text])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "bg-gray-50 border border-gray-200 rounded-lg p-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                    className: "font-semibold text-sm text-blue-600 mb-2",
                                                                                    children: agent
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                    lineNumber: 549,
                                                                                    columnNumber: 43
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-sm text-gray-700 whitespace-pre-wrap",
                                                                                    children: [
                                                                                        text,
                                                                                        text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                            lineNumber: 555,
                                                                                            columnNumber: 47
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                    lineNumber: 552,
                                                                                    columnNumber: 43
                                                                                }, this)
                                                                            ]
                                                                        }, agent, true, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                            lineNumber: 545,
                                                                            columnNumber: 41
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                lineNumber: 500,
                                                columnNumber: 27
                                            }, this) : analysisData[opportunity.symbol] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-xl font-bold text-gray-900 flex items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                                                className: "h-6 w-6 text-blue-600 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 571,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            "Multi-Agent Consensus"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium",
                                                                        children: analysisData[opportunity.symbol].overall_recommendation
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 574,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 569,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-700 mb-3",
                                                                children: analysisData[opportunity.symbol].debate_summary
                                                            }, void 0, false, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-3 gap-4 mt-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-600 mb-1",
                                                                                children: "Bull Case"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 589,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-lg font-bold text-green-600",
                                                                                children: [
                                                                                    "$",
                                                                                    analysisData[opportunity.symbol].price_targets.bull_case.toFixed(2)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 592,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 588,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-600 mb-1",
                                                                                children: "Base Case"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 600,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-lg font-bold text-blue-600",
                                                                                children: [
                                                                                    "$",
                                                                                    analysisData[opportunity.symbol].price_targets.base_case.toFixed(2)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 603,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 599,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-gray-600 mb-1",
                                                                                children: "Bear Case"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 611,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-lg font-bold text-red-600",
                                                                                children: [
                                                                                    "$",
                                                                                    analysisData[opportunity.symbol].price_targets.bear_case.toFixed(2)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 614,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 610,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 587,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white border border-gray-200 rounded-lg p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center mb-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__["ChartBarIcon"], {
                                                                                className: "h-5 w-5 text-blue-600 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 629,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                className: "font-bold text-gray-900",
                                                                                children: "Market Analyst"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 630,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `ml-auto px-2 py-1 rounded text-xs font-medium ${analysisData[opportunity.symbol].agents.market_analyst.recommendation === "BUY" ? "bg-green-100 text-green-800" : analysisData[opportunity.symbol].agents.market_analyst.recommendation === "SELL" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`,
                                                                                children: analysisData[opportunity.symbol].agents.market_analyst.recommendation
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 633,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-700 mb-2",
                                                                        children: analysisData[opportunity.symbol].agents.market_analyst.reasoning
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 651,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between mt-3 pt-3 border-t border-gray-100",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-600",
                                                                                children: "Confidence"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 658,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-bold text-blue-600",
                                                                                children: [
                                                                                    (analysisData[opportunity.symbol].agents.market_analyst.confidence * 100).toFixed(0),
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 661,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 657,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    analysisData[opportunity.symbol].agents.market_analyst.source_data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>toggleSourceEvidence(opportunity.symbol, "market_analyst"),
                                                                        className: "mt-3 w-full text-xs text-blue-600 hover:text-blue-700 font-medium",
                                                                        children: [
                                                                            expandedSources[opportunity.symbol] === "market_analyst" ? "Hide" : "Show",
                                                                            " ",
                                                                            "Source Evidence →"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 672,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    expandedSources[opportunity.symbol] === "market_analyst" && analysisData[opportunity.symbol].agents.market_analyst.source_data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-3 p-3 bg-gray-50 rounded text-xs",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                            className: "whitespace-pre-wrap text-gray-700 max-h-96 overflow-y-auto",
                                                                            children: JSON.stringify(analysisData[opportunity.symbol].agents.market_analyst.source_data, null, 2)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                            lineNumber: 694,
                                                                            columnNumber: 39
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 627,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white border border-gray-200 rounded-lg p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center mb-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$NewspaperIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__NewspaperIcon$3e$__["NewspaperIcon"], {
                                                                                className: "h-5 w-5 text-purple-600 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 709,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                className: "font-bold text-gray-900",
                                                                                children: "News Analyst"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 710,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `ml-auto px-2 py-1 rounded text-xs font-medium ${analysisData[opportunity.symbol].agents.news_analyst.recommendation === "BUY" ? "bg-green-100 text-green-800" : analysisData[opportunity.symbol].agents.news_analyst.recommendation === "SELL" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`,
                                                                                children: analysisData[opportunity.symbol].agents.news_analyst.recommendation
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 713,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 708,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-700 mb-2",
                                                                        children: analysisData[opportunity.symbol].agents.news_analyst.reasoning
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 731,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between mt-3 pt-3 border-t border-gray-100",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-600",
                                                                                children: "Confidence"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 738,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-bold text-purple-600",
                                                                                children: [
                                                                                    (analysisData[opportunity.symbol].agents.news_analyst.confidence * 100).toFixed(0),
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 741,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 737,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 707,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white border border-gray-200 rounded-lg p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center mb-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CalculatorIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalculatorIcon$3e$__["CalculatorIcon"], {
                                                                                className: "h-5 w-5 text-green-600 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 754,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                className: "font-bold text-gray-900",
                                                                                children: "Fundamentals Analyst"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 755,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `ml-auto px-2 py-1 rounded text-xs font-medium ${analysisData[opportunity.symbol].agents.fundamentals_analyst.recommendation === "BUY" ? "bg-green-100 text-green-800" : analysisData[opportunity.symbol].agents.fundamentals_analyst.recommendation === "SELL" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`,
                                                                                children: analysisData[opportunity.symbol].agents.fundamentals_analyst.recommendation
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 758,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 753,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-700 mb-2",
                                                                        children: analysisData[opportunity.symbol].agents.fundamentals_analyst.reasoning
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 777,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between mt-3 pt-3 border-t border-gray-100",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-600",
                                                                                children: "Confidence"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 784,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-bold text-green-600",
                                                                                children: [
                                                                                    (analysisData[opportunity.symbol].agents.fundamentals_analyst.confidence * 100).toFixed(0),
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 787,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 783,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 752,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white border border-gray-200 rounded-lg p-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center mb-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                                                                                className: "h-5 w-5 text-orange-600 mr-2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 800,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                className: "font-bold text-gray-900",
                                                                                children: "Risk Manager"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 801,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "ml-auto px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800",
                                                                                children: analysisData[opportunity.symbol].agents.risk_manager.assessment
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 804,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 799,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-700 mb-2",
                                                                        children: analysisData[opportunity.symbol].agents.risk_manager.reasoning
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 811,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between mt-3 pt-3 border-t border-gray-100",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-600",
                                                                                children: "Position Size"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 818,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-bold text-orange-600",
                                                                                children: [
                                                                                    (analysisData[opportunity.symbol].agents.risk_manager.position_size * 100).toFixed(0),
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                                lineNumber: 821,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                        lineNumber: 817,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                                lineNumber: 798,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                                lineNumber: 566,
                                                columnNumber: 27
                                            }, this) : null
                                        }, void 0, false, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                            lineNumber: 498,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                        lineNumber: 491,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                                    lineNumber: 489,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, opportunity.symbol, true, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 345,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                    lineNumber: 343,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 border border-gray-200 rounded-lg p-12 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__["ChartBarIcon"], {
                            className: "h-16 w-16 text-gray-400 mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 842,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 font-medium",
                            children: "No opportunities found matching your filters"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 843,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setFilter("all"),
                            className: "mt-4 text-blue-600 hover:text-blue-700 font-medium",
                            children: "Clear filters"
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                            lineNumber: 846,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                    lineNumber: 841,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            drawerSymbol && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$components$2f$StreamingAnalysisDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: drawerOpen,
                onOpenChange: setDrawerOpen,
                symbol: drawerSymbol,
                isStreaming: loadingAnalysis[drawerSymbol] || false,
                progress: analysisProgress[drawerSymbol]?.progress || 0,
                currentAgent: analysisProgress[drawerSymbol]?.currentAgent || "",
                agentTexts: agentTexts[drawerSymbol] || {},
                finalData: analysisData[drawerSymbol]
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
                lineNumber: 858,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/true-north-trading/frontend/src/app/opportunities/page.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
}
function oo_cm() {
    try {
        return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x206025=_0x8070;(function(_0x1e0ee3,_0x543f60){var _0x2c6461=_0x8070,_0x2eeeae=_0x1e0ee3();while(!![]){try{var _0x19568b=parseInt(_0x2c6461(0xd6))/0x1+-parseInt(_0x2c6461(0xf9))/0x2+-parseInt(_0x2c6461(0x13a))/0x3*(-parseInt(_0x2c6461(0xd8))/0x4)+-parseInt(_0x2c6461(0xef))/0x5*(parseInt(_0x2c6461(0x19d))/0x6)+-parseInt(_0x2c6461(0x16c))/0x7*(parseInt(_0x2c6461(0x129))/0x8)+parseInt(_0x2c6461(0x195))/0x9*(-parseInt(_0x2c6461(0x190))/0xa)+parseInt(_0x2c6461(0x162))/0xb;if(_0x19568b===_0x543f60)break;else _0x2eeeae['push'](_0x2eeeae['shift']());}catch(_0x5c8bf4){_0x2eeeae['push'](_0x2eeeae['shift']());}}}(_0x1f2e,0x1d68a));function x(_0x16bd66,_0x4a4d60,_0xbaf7ae,_0x5726d8,_0x14c677,_0x58be02){var _0x412efa=_0x8070,_0x579420,_0x30350e,_0x41aee7,_0x13ee33;this['global']=_0x16bd66,this[_0x412efa(0x167)]=_0x4a4d60,this['port']=_0xbaf7ae,this['nodeModules']=_0x5726d8,this[_0x412efa(0x1a3)]=_0x14c677,this[_0x412efa(0x191)]=_0x58be02,this[_0x412efa(0xe8)]=!0x0,this[_0x412efa(0x101)]=!0x0,this[_0x412efa(0x169)]=!0x1,this[_0x412efa(0xb1)]=!0x1,this[_0x412efa(0x18f)]=((_0x30350e=(_0x579420=_0x16bd66[_0x412efa(0x128)])==null?void 0x0:_0x579420[_0x412efa(0xa5)])==null?void 0x0:_0x30350e['NEXT_RUNTIME'])==='edge',this[_0x412efa(0xfd)]=!((_0x13ee33=(_0x41aee7=this['global'][_0x412efa(0x128)])==null?void 0x0:_0x41aee7['versions'])!=null&&_0x13ee33[_0x412efa(0xd4)])&&!this[_0x412efa(0x18f)],this[_0x412efa(0xbe)]=null,this['_connectAttemptCount']=0x0,this[_0x412efa(0x150)]=0x14,this[_0x412efa(0x183)]=_0x412efa(0x107),this['_sendErrorMessage']=(this['_inBrowser']?_0x412efa(0xc5):_0x412efa(0x189))+this[_0x412efa(0x183)];}x[_0x206025(0xa3)][_0x206025(0x165)]=async function(){var _0xe87ea2=_0x206025,_0x3ecbb7,_0x2e6871;if(this[_0xe87ea2(0xbe)])return this[_0xe87ea2(0xbe)];let _0x2b5713;if(this['_inBrowser']||this['_inNextEdge'])_0x2b5713=this[_0xe87ea2(0x198)][_0xe87ea2(0xd7)];else{if((_0x3ecbb7=this[_0xe87ea2(0x198)][_0xe87ea2(0x128)])!=null&&_0x3ecbb7[_0xe87ea2(0xc4)])_0x2b5713=(_0x2e6871=this['global'][_0xe87ea2(0x128)])==null?void 0x0:_0x2e6871['_WebSocket'];else try{_0x2b5713=(await new Function('path',_0xe87ea2(0xbb),'nodeModules',_0xe87ea2(0xd3))(await(0x0,eval)(_0xe87ea2(0x16e)),await(0x0,eval)(_0xe87ea2(0xa4)),this[_0xe87ea2(0x109)]))['default'];}catch{try{_0x2b5713=require(require(_0xe87ea2(0x103))[_0xe87ea2(0x126)](this['nodeModules'],'ws'));}catch{throw new Error(_0xe87ea2(0x111));}}}return this[_0xe87ea2(0xbe)]=_0x2b5713,_0x2b5713;},x[_0x206025(0xa3)][_0x206025(0x16a)]=function(){var _0x1cde0f=_0x206025;this[_0x1cde0f(0xb1)]||this[_0x1cde0f(0x169)]||this[_0x1cde0f(0x187)]>=this[_0x1cde0f(0x150)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x1cde0f(0xb1)]=!0x0,this[_0x1cde0f(0x187)]++,this['_ws']=new Promise((_0x91bb92,_0x1b6bd1)=>{var _0x37f025=_0x1cde0f;this[_0x37f025(0x165)]()[_0x37f025(0xd5)](_0x19bb6e=>{var _0x17676c=_0x37f025;let _0x45d49b=new _0x19bb6e(_0x17676c(0xfb)+(!this[_0x17676c(0xfd)]&&this[_0x17676c(0x1a3)]?_0x17676c(0x157):this[_0x17676c(0x167)])+':'+this[_0x17676c(0xdc)]);_0x45d49b[_0x17676c(0x14b)]=()=>{var _0x550b85=_0x17676c;this[_0x550b85(0xe8)]=!0x1,this[_0x550b85(0x18e)](_0x45d49b),this['_attemptToReconnectShortly'](),_0x1b6bd1(new Error(_0x550b85(0x104)));},_0x45d49b[_0x17676c(0x185)]=()=>{var _0x35d69b=_0x17676c;this['_inBrowser']||_0x45d49b[_0x35d69b(0xfa)]&&_0x45d49b[_0x35d69b(0xfa)]['unref']&&_0x45d49b[_0x35d69b(0xfa)]['unref'](),_0x91bb92(_0x45d49b);},_0x45d49b[_0x17676c(0x102)]=()=>{var _0x43abcb=_0x17676c;this[_0x43abcb(0x101)]=!0x0,this[_0x43abcb(0x18e)](_0x45d49b),this[_0x43abcb(0xff)]();},_0x45d49b[_0x17676c(0xb3)]=_0x109891=>{var _0x5a283=_0x17676c;try{if(!(_0x109891!=null&&_0x109891[_0x5a283(0x19e)])||!this[_0x5a283(0x191)])return;let _0x4354b3=JSON[_0x5a283(0x11b)](_0x109891[_0x5a283(0x19e)]);this['eventReceivedCallback'](_0x4354b3[_0x5a283(0xf0)],_0x4354b3[_0x5a283(0x113)],this[_0x5a283(0x198)],this[_0x5a283(0xfd)]);}catch{}};})[_0x37f025(0xd5)](_0x4fe549=>(this[_0x37f025(0x169)]=!0x0,this[_0x37f025(0xb1)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0x37f025(0xe8)]=!0x0,this[_0x37f025(0x187)]=0x0,_0x4fe549))['catch'](_0x291a72=>(this[_0x37f025(0x169)]=!0x1,this[_0x37f025(0xb1)]=!0x1,console[_0x37f025(0x10a)](_0x37f025(0x192)+this[_0x37f025(0x183)]),_0x1b6bd1(new Error(_0x37f025(0x176)+(_0x291a72&&_0x291a72[_0x37f025(0x19b)])))));}));},x[_0x206025(0xa3)]['_disposeWebsocket']=function(_0x1ad1a7){var _0x4b0272=_0x206025;this[_0x4b0272(0x169)]=!0x1,this[_0x4b0272(0xb1)]=!0x1;try{_0x1ad1a7[_0x4b0272(0x102)]=null,_0x1ad1a7['onerror']=null,_0x1ad1a7[_0x4b0272(0x185)]=null;}catch{}try{_0x1ad1a7[_0x4b0272(0xc0)]<0x2&&_0x1ad1a7[_0x4b0272(0x10d)]();}catch{}},x[_0x206025(0xa3)][_0x206025(0xff)]=function(){var _0x593914=_0x206025;clearTimeout(this[_0x593914(0xcf)]),!(this[_0x593914(0x187)]>=this[_0x593914(0x150)])&&(this[_0x593914(0xcf)]=setTimeout(()=>{var _0x2a01db=_0x593914,_0x2a8521;this[_0x2a01db(0x169)]||this[_0x2a01db(0xb1)]||(this[_0x2a01db(0x16a)](),(_0x2a8521=this[_0x2a01db(0x145)])==null||_0x2a8521['catch'](()=>this[_0x2a01db(0xff)]()));},0x1f4),this[_0x593914(0xcf)][_0x593914(0xf5)]&&this[_0x593914(0xcf)]['unref']());},x['prototype'][_0x206025(0xa9)]=async function(_0x3820cf){var _0x10b1d4=_0x206025;try{if(!this['_allowedToSend'])return;this[_0x10b1d4(0x101)]&&this[_0x10b1d4(0x16a)](),(await this[_0x10b1d4(0x145)])[_0x10b1d4(0xa9)](JSON['stringify'](_0x3820cf));}catch(_0x534152){this[_0x10b1d4(0xc2)]?console['warn'](this[_0x10b1d4(0x149)]+':\\x20'+(_0x534152&&_0x534152[_0x10b1d4(0x19b)])):(this['_extendedWarning']=!0x0,console[_0x10b1d4(0x10a)](this[_0x10b1d4(0x149)]+':\\x20'+(_0x534152&&_0x534152[_0x10b1d4(0x19b)]),_0x3820cf)),this[_0x10b1d4(0xe8)]=!0x1,this[_0x10b1d4(0xff)]();}};function _0x1f2e(){var _0x313632=['performance','_allowedToConnectOnSend','onclose','path','logger\\x20websocket\\x20error','serialize','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','https://tinyurl.com/37x8b79t','number','nodeModules','warn','string','substr','close','toUpperCase','time','expId','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','args','react-native','_processTreeNodeResult','undefined','next.js','error','_cleanNode','type','parse','_type','ExpoDevice','[object\\x20Set]','Boolean','cappedElements','_hasSetOnItsPath','reduceOnAccumulatedProcessingTimeMs','forEach','trace','noFunctions','join','_isMap','process','592olDfiE','_dateToString','elapsed','autoExpandPropertyCount','unshift',{\"resolveGetters\":false,\"defaultLimits\":{\"props\":100,\"elements\":100,\"strLength\":51200,\"totalStrLength\":51200,\"autoExpandLimit\":5000,\"autoExpandMaxDepth\":10},\"reducedLimits\":{\"props\":5,\"elements\":5,\"strLength\":256,\"totalStrLength\":768,\"autoExpandLimit\":30,\"autoExpandMaxDepth\":2},\"reducePolicy\":{\"perLogpoint\":{\"reduceOnCount\":50,\"reduceOnAccumulatedProcessingTimeMs\":100,\"resetWhenQuietMs\":500,\"resetOnProcessingTimeAverageMs\":100},\"global\":{\"reduceOnCount\":1000,\"reduceOnAccumulatedProcessingTimeMs\":300,\"resetWhenQuietMs\":50,\"resetOnProcessingTimeAverageMs\":100}}},'name','strLength','reducedLimits','_capIfString','concat','symbol','1.0.0','_sortProps','value','null','hrtime','12FVWkFh','root_exp','versions','test','indexOf','resolveGetters','Map','capped','funcName','bind','current','_ws','isArray','_hasSymbolPropertyOnItsPath','_objectToString','_sendErrorMessage','_console_ninja_session','onerror','_additionalMetadata','_addProperty','_console_ninja','disabledTrace','_maxConnectAttemptCount','[object\\x20Array]','sortProps','_addFunctionsNode','perLogpoint','perf_hooks','1','gateway.docker.internal','charAt','_treeNodePropertiesAfterFullValue','NEXT_RUNTIME','console','getter','Number','_treeNodePropertiesBeforeFullValue','_isUndefined','_isSet','getOwnPropertySymbols','4753408RZbvXH','59872','push','getWebSocketClass',\"/Users/MikeyW/.cursor/extensions/wallabyjs.console-ninja-1.0.486-universal/node_modules\",'host','_property','_connected','_connectToHostNow','constructor','18998lyWGlj','props','import(\\x27path\\x27)','some','_setNodeLabel','_consoleNinjaAllowedToStart','_getOwnPropertyDescriptor','Error','_hasMapOnItsPath','getOwnPropertyDescriptor','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','1761256358720','pop','RegExp','remix','_blacklistedProperty','_setNodeQueryPath','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','String','location','hits','allStrLength','call','_webSocketErrorDocsLink','map','onopen','valueOf','_connectAttemptCount','rootExpression','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_addLoadNode','reload','NEGATIVE_INFINITY','_p_name','_disposeWebsocket','_inNextEdge','8600buKRbE','eventReceivedCallback','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_propertyName','parent','2187QYJEaz','_ninjaIgnoreNextError','length','global','_isNegativeZero','_setNodePermissions','message','get','342858SJZiHE','data','toString','_getOwnPropertyNames','startsWith','log','dockerizedApp','_HTMLAllCollection','isExpressionToEvaluate','[object\\x20Date]','autoExpandMaxDepth','prototype','import(\\x27url\\x27)','env','autoExpandPreviousObjects','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','10.0.2.2','send','resetOnProcessingTimeAverageMs','positiveInfinity','Buffer','coverage','defaultLimits','expo','function','_connecting','sort','onmessage','getOwnPropertyNames','angular','index','reducePolicy','array','osName','modules','url','expressionsToEvaluate','nan','_WebSocketClass','_isPrimitiveType','readyState','_getOwnPropertySymbols','_extendedWarning','stackTraceLimit','_WebSocket','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','reduceOnCount','_undefined','slice','unknown','origin','object','level','autoExpand','toLowerCase','_reconnectTimeout','elements','now','_Symbol','return\\x20import(url.pathToFileURL(path.join(nodeModules,\\x20\\x27ws/index.js\\x27)).toString());','node','then','112855oFBgVg','WebSocket','231076kiFdNR','totalStrLength','Set','date','port','stack','_setNodeId','includes','_setNodeExpandableState','_regExpToString','_setNodeExpressionPath','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','\\x20browser','boolean','autoExpandLimit','set','_allowedToSend','\\x20server','resetWhenQuietMs','depth','timeStamp','count','replace','10ATihzK','method','hostname','reduceLimits','bigint','match','unref','edge','_isPrimitiveWrapperType','_p_','262998SwrgeB','_socket','ws://','_addObjectProperty','_inBrowser','','_attemptToReconnectShortly'];_0x1f2e=function(){return _0x313632;};return _0x1f2e();}function q(_0x5d1bb0,_0x28051d,_0x5316ed,_0x4dc284,_0x2d47b5,_0x24dc52,_0x5c6ac8,_0x143565=G){var _0x382aee=_0x206025;let _0x10cb2d=_0x5316ed['split'](',')[_0x382aee(0x184)](_0x2799b6=>{var _0x19b263=_0x382aee,_0x5ee145,_0x47f567,_0x2e6e4c,_0xe615d4,_0x25b863,_0xc18eaa,_0x4513b4;try{if(!_0x5d1bb0['_console_ninja_session']){let _0x4beab0=((_0x47f567=(_0x5ee145=_0x5d1bb0[_0x19b263(0x128)])==null?void 0x0:_0x5ee145['versions'])==null?void 0x0:_0x47f567[_0x19b263(0xd4)])||((_0xe615d4=(_0x2e6e4c=_0x5d1bb0[_0x19b263(0x128)])==null?void 0x0:_0x2e6e4c[_0x19b263(0xa5)])==null?void 0x0:_0xe615d4['NEXT_RUNTIME'])===_0x19b263(0xf6);(_0x2d47b5===_0x19b263(0x117)||_0x2d47b5===_0x19b263(0x17a)||_0x2d47b5==='astro'||_0x2d47b5===_0x19b263(0xb5))&&(_0x2d47b5+=_0x4beab0?_0x19b263(0xe9):_0x19b263(0xe4));let _0x5742fa='';_0x2d47b5===_0x19b263(0x114)&&(_0x5742fa=(((_0x4513b4=(_0xc18eaa=(_0x25b863=_0x5d1bb0['expo'])==null?void 0x0:_0x25b863[_0x19b263(0xba)])==null?void 0x0:_0xc18eaa[_0x19b263(0x11d)])==null?void 0x0:_0x4513b4[_0x19b263(0xb9)])||'')[_0x19b263(0xce)](),_0x5742fa&&(_0x2d47b5+='\\x20'+_0x5742fa,_0x5742fa==='android'&&(_0x28051d=_0x19b263(0xa8)))),_0x5d1bb0[_0x19b263(0x14a)]={'id':+new Date(),'tool':_0x2d47b5},_0x5c6ac8&&_0x2d47b5&&!_0x4beab0&&(_0x5742fa?console['log'](_0x19b263(0x112)+_0x5742fa+',\\x20see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.'):console[_0x19b263(0x1a2)](_0x19b263(0xe3)+(_0x2d47b5[_0x19b263(0x158)](0x0)[_0x19b263(0x10e)]()+_0x2d47b5[_0x19b263(0x10c)](0x1))+',',_0x19b263(0x17d),_0x19b263(0xa7)));}let _0x28eafc=new x(_0x5d1bb0,_0x28051d,_0x2799b6,_0x4dc284,_0x24dc52,_0x143565);return _0x28eafc[_0x19b263(0xa9)][_0x19b263(0x143)](_0x28eafc);}catch(_0x1ac335){return console[_0x19b263(0x10a)](_0x19b263(0x106),_0x1ac335&&_0x1ac335[_0x19b263(0x19b)]),()=>{};}});return _0x3f4d85=>_0x10cb2d[_0x382aee(0x123)](_0x3f3397=>_0x3f3397(_0x3f4d85));}function _0x8070(_0x533792,_0x4dd89c){var _0x1f2e40=_0x1f2e();return _0x8070=function(_0x807058,_0x54b481){_0x807058=_0x807058-0xa2;var _0x4f57b5=_0x1f2e40[_0x807058];return _0x4f57b5;},_0x8070(_0x533792,_0x4dd89c);}function G(_0x379fb8,_0x313ee3,_0x2fd7c5,_0x3c5a4e){var _0x528bff=_0x206025;_0x3c5a4e&&_0x379fb8===_0x528bff(0x18b)&&_0x2fd7c5['location'][_0x528bff(0x18b)]();}function B(_0x42e71c){var _0x3c48d1=_0x206025,_0x30cebb,_0x49d075;let _0x15e433=function(_0x4e0a64,_0x2a81f4){return _0x2a81f4-_0x4e0a64;},_0x15cf12;if(_0x42e71c[_0x3c48d1(0x100)])_0x15cf12=function(){var _0x25ce7e=_0x3c48d1;return _0x42e71c[_0x25ce7e(0x100)][_0x25ce7e(0xd1)]();};else{if(_0x42e71c[_0x3c48d1(0x128)]&&_0x42e71c['process'][_0x3c48d1(0x139)]&&((_0x49d075=(_0x30cebb=_0x42e71c[_0x3c48d1(0x128)])==null?void 0x0:_0x30cebb['env'])==null?void 0x0:_0x49d075[_0x3c48d1(0x15a)])!==_0x3c48d1(0xf6))_0x15cf12=function(){var _0x2b1db0=_0x3c48d1;return _0x42e71c[_0x2b1db0(0x128)][_0x2b1db0(0x139)]();},_0x15e433=function(_0x27a10c,_0x52b991){return 0x3e8*(_0x52b991[0x0]-_0x27a10c[0x0])+(_0x52b991[0x1]-_0x27a10c[0x1])/0xf4240;};else try{let {performance:_0x4e8aca}=require(_0x3c48d1(0x155));_0x15cf12=function(){var _0x442526=_0x3c48d1;return _0x4e8aca[_0x442526(0xd1)]();};}catch{_0x15cf12=function(){return+new Date();};}}return{'elapsed':_0x15e433,'timeStamp':_0x15cf12,'now':()=>Date[_0x3c48d1(0xd1)]()};}function H(_0x129b12,_0x5d5f92,_0x1c293c){var _0x31f57e=_0x206025,_0x5dfd92,_0x3c35b8,_0x527c3c,_0x1cf2a9,_0xc2a39f,_0x19ebba,_0x49f22a,_0x2d0f72,_0x4b2de8;if(_0x129b12[_0x31f57e(0x171)]!==void 0x0)return _0x129b12['_consoleNinjaAllowedToStart'];let _0x29fa56=((_0x3c35b8=(_0x5dfd92=_0x129b12[_0x31f57e(0x128)])==null?void 0x0:_0x5dfd92['versions'])==null?void 0x0:_0x3c35b8[_0x31f57e(0xd4)])||((_0x1cf2a9=(_0x527c3c=_0x129b12[_0x31f57e(0x128)])==null?void 0x0:_0x527c3c['env'])==null?void 0x0:_0x1cf2a9[_0x31f57e(0x15a)])===_0x31f57e(0xf6),_0x539791=!!(_0x1c293c===_0x31f57e(0x114)&&((_0x49f22a=(_0x19ebba=(_0xc2a39f=_0x129b12[_0x31f57e(0xaf)])==null?void 0x0:_0xc2a39f[_0x31f57e(0xba)])==null?void 0x0:_0x19ebba[_0x31f57e(0x11d)])==null?void 0x0:_0x49f22a[_0x31f57e(0xb9)]));function _0x452777(_0x2b4164){var _0xeb13fb=_0x31f57e;if(_0x2b4164[_0xeb13fb(0x1a1)]('/')&&_0x2b4164['endsWith']('/')){let _0x328aa6=new RegExp(_0x2b4164['slice'](0x1,-0x1));return _0xf9beb3=>_0x328aa6[_0xeb13fb(0x13d)](_0xf9beb3);}else{if(_0x2b4164['includes']('*')||_0x2b4164[_0xeb13fb(0xdf)]('?')){let _0x170f8e=new RegExp('^'+_0x2b4164[_0xeb13fb(0xee)](/\\./g,String['fromCharCode'](0x5c)+'.')['replace'](/\\*/g,'.*')[_0xeb13fb(0xee)](/\\?/g,'.')+String['fromCharCode'](0x24));return _0x1b550f=>_0x170f8e[_0xeb13fb(0x13d)](_0x1b550f);}else return _0x481cbf=>_0x481cbf===_0x2b4164;}}let _0x2541c5=_0x5d5f92['map'](_0x452777);return _0x129b12[_0x31f57e(0x171)]=_0x29fa56||!_0x5d5f92,!_0x129b12[_0x31f57e(0x171)]&&((_0x2d0f72=_0x129b12[_0x31f57e(0x17f)])==null?void 0x0:_0x2d0f72['hostname'])&&(_0x129b12['_consoleNinjaAllowedToStart']=_0x2541c5[_0x31f57e(0x16f)](_0x5aac20=>_0x5aac20(_0x129b12[_0x31f57e(0x17f)]['hostname']))),_0x539791&&!_0x129b12[_0x31f57e(0x171)]&&!((_0x4b2de8=_0x129b12[_0x31f57e(0x17f)])!=null&&_0x4b2de8[_0x31f57e(0xf1)])&&(_0x129b12[_0x31f57e(0x171)]=!0x0),_0x129b12[_0x31f57e(0x171)];}function X(_0x29fdc9,_0x2e6e58,_0x47d813,_0x2fc14c,_0x16053c){var _0x5d4413=_0x206025;_0x29fdc9=_0x29fdc9,_0x2e6e58=_0x2e6e58,_0x47d813=_0x47d813,_0x2fc14c=_0x2fc14c,_0x16053c=_0x16053c,_0x16053c=_0x16053c||{},_0x16053c['defaultLimits']=_0x16053c[_0x5d4413(0xae)]||{},_0x16053c[_0x5d4413(0x131)]=_0x16053c[_0x5d4413(0x131)]||{},_0x16053c['reducePolicy']=_0x16053c[_0x5d4413(0xb7)]||{},_0x16053c[_0x5d4413(0xb7)]['perLogpoint']=_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)]||{},_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x198)]=_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x198)]||{};let _0xee9e24={'perLogpoint':{'reduceOnCount':_0x16053c['reducePolicy'][_0x5d4413(0x154)]['reduceOnCount']||0x32,'reduceOnAccumulatedProcessingTimeMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)][_0x5d4413(0x122)]||0x64,'resetWhenQuietMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)]['resetWhenQuietMs']||0x1f4,'resetOnProcessingTimeAverageMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x154)][_0x5d4413(0xaa)]||0x64},'global':{'reduceOnCount':_0x16053c[_0x5d4413(0xb7)]['global'][_0x5d4413(0xc6)]||0x3e8,'reduceOnAccumulatedProcessingTimeMs':_0x16053c['reducePolicy']['global'][_0x5d4413(0x122)]||0x12c,'resetWhenQuietMs':_0x16053c[_0x5d4413(0xb7)]['global']['resetWhenQuietMs']||0x32,'resetOnProcessingTimeAverageMs':_0x16053c[_0x5d4413(0xb7)][_0x5d4413(0x198)]['resetOnProcessingTimeAverageMs']||0x64}},_0x1f62aa=B(_0x29fdc9),_0x57e37c=_0x1f62aa['elapsed'],_0x1c7b58=_0x1f62aa[_0x5d4413(0xec)];function _0x4ec6f8(){var _0x1abe1a=_0x5d4413;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x29fdc9[_0x1abe1a(0x116)],this[_0x1abe1a(0x1a4)]=_0x29fdc9['HTMLAllCollection'],this[_0x1abe1a(0x172)]=Object[_0x1abe1a(0x175)],this[_0x1abe1a(0x1a0)]=Object[_0x1abe1a(0xb4)],this[_0x1abe1a(0xd2)]=_0x29fdc9['Symbol'],this[_0x1abe1a(0xe1)]=RegExp['prototype'][_0x1abe1a(0x19f)],this[_0x1abe1a(0x12a)]=Date[_0x1abe1a(0xa3)][_0x1abe1a(0x19f)];}_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x105)]=function(_0xecd79f,_0x130258,_0x3d83a4,_0x4b701c){var _0x532f2b=_0x5d4413,_0xe7aebd=this,_0x5c720a=_0x3d83a4[_0x532f2b(0xcd)];function _0x52bf8f(_0x27c3f1,_0x1d1770,_0x595195){var _0x56e290=_0x532f2b;_0x1d1770['type']=_0x56e290(0xc9),_0x1d1770[_0x56e290(0x118)]=_0x27c3f1[_0x56e290(0x19b)],_0x41a216=_0x595195[_0x56e290(0xd4)][_0x56e290(0x144)],_0x595195[_0x56e290(0xd4)][_0x56e290(0x144)]=_0x1d1770,_0xe7aebd['_treeNodePropertiesBeforeFullValue'](_0x1d1770,_0x595195);}let _0x4be16e;_0x29fdc9['console']&&(_0x4be16e=_0x29fdc9['console'][_0x532f2b(0x118)],_0x4be16e&&(_0x29fdc9[_0x532f2b(0x15b)]['error']=function(){}));try{try{_0x3d83a4[_0x532f2b(0xcc)]++,_0x3d83a4[_0x532f2b(0xcd)]&&_0x3d83a4['autoExpandPreviousObjects']['push'](_0x130258);var _0x1cac69,_0x2cf7f3,_0x25dcc0,_0x5129d9,_0x303749=[],_0x1db1f6=[],_0x278e4a,_0x26661d=this[_0x532f2b(0x11c)](_0x130258),_0x4a0157=_0x26661d==='array',_0x4d32e9=!0x1,_0x77d70a=_0x26661d===_0x532f2b(0xb0),_0x10033c=this['_isPrimitiveType'](_0x26661d),_0x39cf1e=this['_isPrimitiveWrapperType'](_0x26661d),_0x17e1fc=_0x10033c||_0x39cf1e,_0x3f6c4c={},_0x4d271f=0x0,_0x5bec67=!0x1,_0x41a216,_0x45509d=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3d83a4[_0x532f2b(0xeb)]){if(_0x4a0157){if(_0x2cf7f3=_0x130258['length'],_0x2cf7f3>_0x3d83a4[_0x532f2b(0xd0)]){for(_0x25dcc0=0x0,_0x5129d9=_0x3d83a4['elements'],_0x1cac69=_0x25dcc0;_0x1cac69<_0x5129d9;_0x1cac69++)_0x1db1f6['push'](_0xe7aebd[_0x532f2b(0x14d)](_0x303749,_0x130258,_0x26661d,_0x1cac69,_0x3d83a4));_0xecd79f[_0x532f2b(0x120)]=!0x0;}else{for(_0x25dcc0=0x0,_0x5129d9=_0x2cf7f3,_0x1cac69=_0x25dcc0;_0x1cac69<_0x5129d9;_0x1cac69++)_0x1db1f6[_0x532f2b(0x164)](_0xe7aebd[_0x532f2b(0x14d)](_0x303749,_0x130258,_0x26661d,_0x1cac69,_0x3d83a4));}_0x3d83a4[_0x532f2b(0x12c)]+=_0x1db1f6[_0x532f2b(0x197)];}if(!(_0x26661d===_0x532f2b(0x138)||_0x26661d===_0x532f2b(0x116))&&!_0x10033c&&_0x26661d!==_0x532f2b(0x17e)&&_0x26661d!==_0x532f2b(0xac)&&_0x26661d!==_0x532f2b(0xf3)){var _0x3d7234=_0x4b701c[_0x532f2b(0x16d)]||_0x3d83a4['props'];if(this['_isSet'](_0x130258)?(_0x1cac69=0x0,_0x130258[_0x532f2b(0x123)](function(_0x1c2da5){var _0x4aa18a=_0x532f2b;if(_0x4d271f++,_0x3d83a4['autoExpandPropertyCount']++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;return;}if(!_0x3d83a4[_0x4aa18a(0x1a5)]&&_0x3d83a4[_0x4aa18a(0xcd)]&&_0x3d83a4[_0x4aa18a(0x12c)]>_0x3d83a4[_0x4aa18a(0xe6)]){_0x5bec67=!0x0;return;}_0x1db1f6[_0x4aa18a(0x164)](_0xe7aebd['_addProperty'](_0x303749,_0x130258,_0x4aa18a(0xda),_0x1cac69++,_0x3d83a4,function(_0x4e8b2c){return function(){return _0x4e8b2c;};}(_0x1c2da5)));})):this[_0x532f2b(0x127)](_0x130258)&&_0x130258[_0x532f2b(0x123)](function(_0x1b6187,_0x1dc248){var _0x451ef9=_0x532f2b;if(_0x4d271f++,_0x3d83a4[_0x451ef9(0x12c)]++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;return;}if(!_0x3d83a4[_0x451ef9(0x1a5)]&&_0x3d83a4[_0x451ef9(0xcd)]&&_0x3d83a4[_0x451ef9(0x12c)]>_0x3d83a4[_0x451ef9(0xe6)]){_0x5bec67=!0x0;return;}var _0x3ecd95=_0x1dc248[_0x451ef9(0x19f)]();_0x3ecd95[_0x451ef9(0x197)]>0x64&&(_0x3ecd95=_0x3ecd95[_0x451ef9(0xc8)](0x0,0x64)+'...'),_0x1db1f6['push'](_0xe7aebd[_0x451ef9(0x14d)](_0x303749,_0x130258,_0x451ef9(0x140),_0x3ecd95,_0x3d83a4,function(_0xc22705){return function(){return _0xc22705;};}(_0x1b6187)));}),!_0x4d32e9){try{for(_0x278e4a in _0x130258)if(!(_0x4a0157&&_0x45509d[_0x532f2b(0x13d)](_0x278e4a))&&!this[_0x532f2b(0x17b)](_0x130258,_0x278e4a,_0x3d83a4)){if(_0x4d271f++,_0x3d83a4['autoExpandPropertyCount']++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;break;}if(!_0x3d83a4[_0x532f2b(0x1a5)]&&_0x3d83a4['autoExpand']&&_0x3d83a4[_0x532f2b(0x12c)]>_0x3d83a4[_0x532f2b(0xe6)]){_0x5bec67=!0x0;break;}_0x1db1f6[_0x532f2b(0x164)](_0xe7aebd[_0x532f2b(0xfc)](_0x303749,_0x3f6c4c,_0x130258,_0x26661d,_0x278e4a,_0x3d83a4));}}catch{}if(_0x3f6c4c['_p_length']=!0x0,_0x77d70a&&(_0x3f6c4c[_0x532f2b(0x18d)]=!0x0),!_0x5bec67){var _0x169628=[][_0x532f2b(0x133)](this['_getOwnPropertyNames'](_0x130258))[_0x532f2b(0x133)](this[_0x532f2b(0xc1)](_0x130258));for(_0x1cac69=0x0,_0x2cf7f3=_0x169628['length'];_0x1cac69<_0x2cf7f3;_0x1cac69++)if(_0x278e4a=_0x169628[_0x1cac69],!(_0x4a0157&&_0x45509d[_0x532f2b(0x13d)](_0x278e4a[_0x532f2b(0x19f)]()))&&!this[_0x532f2b(0x17b)](_0x130258,_0x278e4a,_0x3d83a4)&&!_0x3f6c4c[typeof _0x278e4a!=_0x532f2b(0x134)?_0x532f2b(0xf8)+_0x278e4a[_0x532f2b(0x19f)]():_0x278e4a]){if(_0x4d271f++,_0x3d83a4[_0x532f2b(0x12c)]++,_0x4d271f>_0x3d7234){_0x5bec67=!0x0;break;}if(!_0x3d83a4[_0x532f2b(0x1a5)]&&_0x3d83a4['autoExpand']&&_0x3d83a4[_0x532f2b(0x12c)]>_0x3d83a4[_0x532f2b(0xe6)]){_0x5bec67=!0x0;break;}_0x1db1f6['push'](_0xe7aebd[_0x532f2b(0xfc)](_0x303749,_0x3f6c4c,_0x130258,_0x26661d,_0x278e4a,_0x3d83a4));}}}}}if(_0xecd79f[_0x532f2b(0x11a)]=_0x26661d,_0x17e1fc?(_0xecd79f['value']=_0x130258['valueOf'](),this[_0x532f2b(0x132)](_0x26661d,_0xecd79f,_0x3d83a4,_0x4b701c)):_0x26661d===_0x532f2b(0xdb)?_0xecd79f[_0x532f2b(0x137)]=this[_0x532f2b(0x12a)]['call'](_0x130258):_0x26661d===_0x532f2b(0xf3)?_0xecd79f[_0x532f2b(0x137)]=_0x130258['toString']():_0x26661d===_0x532f2b(0x179)?_0xecd79f[_0x532f2b(0x137)]=this[_0x532f2b(0xe1)][_0x532f2b(0x182)](_0x130258):_0x26661d===_0x532f2b(0x134)&&this[_0x532f2b(0xd2)]?_0xecd79f['value']=this[_0x532f2b(0xd2)][_0x532f2b(0xa3)]['toString'][_0x532f2b(0x182)](_0x130258):!_0x3d83a4[_0x532f2b(0xeb)]&&!(_0x26661d==='null'||_0x26661d===_0x532f2b(0x116))&&(delete _0xecd79f[_0x532f2b(0x137)],_0xecd79f[_0x532f2b(0x141)]=!0x0),_0x5bec67&&(_0xecd79f['cappedProps']=!0x0),_0x41a216=_0x3d83a4[_0x532f2b(0xd4)][_0x532f2b(0x144)],_0x3d83a4[_0x532f2b(0xd4)][_0x532f2b(0x144)]=_0xecd79f,this[_0x532f2b(0x15e)](_0xecd79f,_0x3d83a4),_0x1db1f6[_0x532f2b(0x197)]){for(_0x1cac69=0x0,_0x2cf7f3=_0x1db1f6[_0x532f2b(0x197)];_0x1cac69<_0x2cf7f3;_0x1cac69++)_0x1db1f6[_0x1cac69](_0x1cac69);}_0x303749['length']&&(_0xecd79f['props']=_0x303749);}catch(_0x5140f8){_0x52bf8f(_0x5140f8,_0xecd79f,_0x3d83a4);}this[_0x532f2b(0x14c)](_0x130258,_0xecd79f),this[_0x532f2b(0x159)](_0xecd79f,_0x3d83a4),_0x3d83a4['node']['current']=_0x41a216,_0x3d83a4[_0x532f2b(0xcc)]--,_0x3d83a4[_0x532f2b(0xcd)]=_0x5c720a,_0x3d83a4['autoExpand']&&_0x3d83a4[_0x532f2b(0xa6)][_0x532f2b(0x178)]();}finally{_0x4be16e&&(_0x29fdc9[_0x532f2b(0x15b)][_0x532f2b(0x118)]=_0x4be16e);}return _0xecd79f;},_0x4ec6f8['prototype'][_0x5d4413(0xc1)]=function(_0x266f17){var _0xf3683a=_0x5d4413;return Object[_0xf3683a(0x161)]?Object[_0xf3683a(0x161)](_0x266f17):[];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x160)]=function(_0x40ce39){var _0x323849=_0x5d4413;return!!(_0x40ce39&&_0x29fdc9['Set']&&this[_0x323849(0x148)](_0x40ce39)===_0x323849(0x11e)&&_0x40ce39[_0x323849(0x123)]);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x17b)]=function(_0x2aef7d,_0x107af1,_0x383bfa){var _0x2f2b6a=_0x5d4413;if(!_0x383bfa[_0x2f2b6a(0x13f)]){let _0x5d22d6=this[_0x2f2b6a(0x172)](_0x2aef7d,_0x107af1);if(_0x5d22d6&&_0x5d22d6[_0x2f2b6a(0x19c)])return!0x0;}return _0x383bfa[_0x2f2b6a(0x125)]?typeof _0x2aef7d[_0x107af1]==_0x2f2b6a(0xb0):!0x1;},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x11c)]=function(_0x4d4b8a){var _0x3d2593=_0x5d4413,_0x53e732='';return _0x53e732=typeof _0x4d4b8a,_0x53e732===_0x3d2593(0xcb)?this['_objectToString'](_0x4d4b8a)===_0x3d2593(0x151)?_0x53e732=_0x3d2593(0xb8):this[_0x3d2593(0x148)](_0x4d4b8a)===_0x3d2593(0x1a6)?_0x53e732='date':this['_objectToString'](_0x4d4b8a)==='[object\\x20BigInt]'?_0x53e732=_0x3d2593(0xf3):_0x4d4b8a===null?_0x53e732=_0x3d2593(0x138):_0x4d4b8a[_0x3d2593(0x16b)]&&(_0x53e732=_0x4d4b8a[_0x3d2593(0x16b)][_0x3d2593(0x12f)]||_0x53e732):_0x53e732===_0x3d2593(0x116)&&this[_0x3d2593(0x1a4)]&&_0x4d4b8a instanceof this[_0x3d2593(0x1a4)]&&(_0x53e732='HTMLAllCollection'),_0x53e732;},_0x4ec6f8[_0x5d4413(0xa3)]['_objectToString']=function(_0x168387){var _0x37f17=_0x5d4413;return Object[_0x37f17(0xa3)]['toString'][_0x37f17(0x182)](_0x168387);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xbf)]=function(_0x38f1bf){var _0x1e0a9a=_0x5d4413;return _0x38f1bf===_0x1e0a9a(0xe5)||_0x38f1bf===_0x1e0a9a(0x10b)||_0x38f1bf===_0x1e0a9a(0x108);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xf7)]=function(_0x126cf5){var _0x14f7d4=_0x5d4413;return _0x126cf5===_0x14f7d4(0x11f)||_0x126cf5===_0x14f7d4(0x17e)||_0x126cf5===_0x14f7d4(0x15d);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x14d)]=function(_0x465760,_0x4221c9,_0x3874da,_0x2f1c46,_0x35ecf4,_0x591db7){var _0x421ec7=this;return function(_0x50d048){var _0x3e5502=_0x8070,_0x58645b=_0x35ecf4['node'][_0x3e5502(0x144)],_0x461b7d=_0x35ecf4[_0x3e5502(0xd4)]['index'],_0x51476b=_0x35ecf4[_0x3e5502(0xd4)]['parent'];_0x35ecf4[_0x3e5502(0xd4)][_0x3e5502(0x194)]=_0x58645b,_0x35ecf4['node'][_0x3e5502(0xb6)]=typeof _0x2f1c46==_0x3e5502(0x108)?_0x2f1c46:_0x50d048,_0x465760[_0x3e5502(0x164)](_0x421ec7[_0x3e5502(0x168)](_0x4221c9,_0x3874da,_0x2f1c46,_0x35ecf4,_0x591db7)),_0x35ecf4[_0x3e5502(0xd4)][_0x3e5502(0x194)]=_0x51476b,_0x35ecf4[_0x3e5502(0xd4)][_0x3e5502(0xb6)]=_0x461b7d;};},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xfc)]=function(_0x4f95ed,_0x5bce7f,_0x26b6b8,_0x115000,_0x2f5960,_0x504da4,_0x5c7f35){var _0x798496=_0x5d4413,_0x589084=this;return _0x5bce7f[typeof _0x2f5960!=_0x798496(0x134)?_0x798496(0xf8)+_0x2f5960[_0x798496(0x19f)]():_0x2f5960]=!0x0,function(_0xb441cf){var _0x5196c4=_0x798496,_0x353e9c=_0x504da4['node']['current'],_0x55658b=_0x504da4[_0x5196c4(0xd4)]['index'],_0x55fa35=_0x504da4[_0x5196c4(0xd4)][_0x5196c4(0x194)];_0x504da4[_0x5196c4(0xd4)]['parent']=_0x353e9c,_0x504da4[_0x5196c4(0xd4)][_0x5196c4(0xb6)]=_0xb441cf,_0x4f95ed[_0x5196c4(0x164)](_0x589084[_0x5196c4(0x168)](_0x26b6b8,_0x115000,_0x2f5960,_0x504da4,_0x5c7f35)),_0x504da4[_0x5196c4(0xd4)]['parent']=_0x55fa35,_0x504da4[_0x5196c4(0xd4)][_0x5196c4(0xb6)]=_0x55658b;};},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x168)]=function(_0x306210,_0x2180f0,_0x5ca781,_0x408a5a,_0x48e11c){var _0xc84a2c=_0x5d4413,_0x5c20d0=this;_0x48e11c||(_0x48e11c=function(_0x31ed11,_0x513401){return _0x31ed11[_0x513401];});var _0x4c683d=_0x5ca781['toString'](),_0x24025e=_0x408a5a[_0xc84a2c(0xbc)]||{},_0x37d022=_0x408a5a['depth'],_0x54791e=_0x408a5a['isExpressionToEvaluate'];try{var _0x15fed0=this['_isMap'](_0x306210),_0x4f96ee=_0x4c683d;_0x15fed0&&_0x4f96ee[0x0]==='\\x27'&&(_0x4f96ee=_0x4f96ee[_0xc84a2c(0x10c)](0x1,_0x4f96ee[_0xc84a2c(0x197)]-0x2));var _0x169a7a=_0x408a5a[_0xc84a2c(0xbc)]=_0x24025e[_0xc84a2c(0xf8)+_0x4f96ee];_0x169a7a&&(_0x408a5a[_0xc84a2c(0xeb)]=_0x408a5a[_0xc84a2c(0xeb)]+0x1),_0x408a5a[_0xc84a2c(0x1a5)]=!!_0x169a7a;var _0x4a6bef=typeof _0x5ca781==_0xc84a2c(0x134),_0x3e82c0={'name':_0x4a6bef||_0x15fed0?_0x4c683d:this[_0xc84a2c(0x193)](_0x4c683d)};if(_0x4a6bef&&(_0x3e82c0[_0xc84a2c(0x134)]=!0x0),!(_0x2180f0==='array'||_0x2180f0===_0xc84a2c(0x173))){var _0x2d07cc=this['_getOwnPropertyDescriptor'](_0x306210,_0x5ca781);if(_0x2d07cc&&(_0x2d07cc[_0xc84a2c(0xe7)]&&(_0x3e82c0['setter']=!0x0),_0x2d07cc[_0xc84a2c(0x19c)]&&!_0x169a7a&&!_0x408a5a[_0xc84a2c(0x13f)]))return _0x3e82c0[_0xc84a2c(0x15c)]=!0x0,this['_processTreeNodeResult'](_0x3e82c0,_0x408a5a),_0x3e82c0;}var _0x38d3a5;try{_0x38d3a5=_0x48e11c(_0x306210,_0x5ca781);}catch(_0x3f76c2){return _0x3e82c0={'name':_0x4c683d,'type':'unknown','error':_0x3f76c2[_0xc84a2c(0x19b)]},this[_0xc84a2c(0x115)](_0x3e82c0,_0x408a5a),_0x3e82c0;}var _0x6a840a=this[_0xc84a2c(0x11c)](_0x38d3a5),_0x4492eb=this[_0xc84a2c(0xbf)](_0x6a840a);if(_0x3e82c0[_0xc84a2c(0x11a)]=_0x6a840a,_0x4492eb)this[_0xc84a2c(0x115)](_0x3e82c0,_0x408a5a,_0x38d3a5,function(){var _0x7e70f7=_0xc84a2c;_0x3e82c0[_0x7e70f7(0x137)]=_0x38d3a5[_0x7e70f7(0x186)](),!_0x169a7a&&_0x5c20d0[_0x7e70f7(0x132)](_0x6a840a,_0x3e82c0,_0x408a5a,{});});else{var _0x59a4b9=_0x408a5a[_0xc84a2c(0xcd)]&&_0x408a5a[_0xc84a2c(0xcc)]<_0x408a5a[_0xc84a2c(0xa2)]&&_0x408a5a[_0xc84a2c(0xa6)][_0xc84a2c(0x13e)](_0x38d3a5)<0x0&&_0x6a840a!==_0xc84a2c(0xb0)&&_0x408a5a['autoExpandPropertyCount']<_0x408a5a['autoExpandLimit'];_0x59a4b9||_0x408a5a[_0xc84a2c(0xcc)]<_0x37d022||_0x169a7a?(this['serialize'](_0x3e82c0,_0x38d3a5,_0x408a5a,_0x169a7a||{}),this[_0xc84a2c(0x14c)](_0x38d3a5,_0x3e82c0)):this[_0xc84a2c(0x115)](_0x3e82c0,_0x408a5a,_0x38d3a5,function(){var _0x36bf02=_0xc84a2c;_0x6a840a===_0x36bf02(0x138)||_0x6a840a===_0x36bf02(0x116)||(delete _0x3e82c0[_0x36bf02(0x137)],_0x3e82c0[_0x36bf02(0x141)]=!0x0);});}return _0x3e82c0;}finally{_0x408a5a[_0xc84a2c(0xbc)]=_0x24025e,_0x408a5a[_0xc84a2c(0xeb)]=_0x37d022,_0x408a5a[_0xc84a2c(0x1a5)]=_0x54791e;}},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x132)]=function(_0x5dbb71,_0x160dc5,_0x566044,_0x14045a){var _0xd41be5=_0x5d4413,_0x3d4872=_0x14045a[_0xd41be5(0x130)]||_0x566044[_0xd41be5(0x130)];if((_0x5dbb71===_0xd41be5(0x10b)||_0x5dbb71===_0xd41be5(0x17e))&&_0x160dc5[_0xd41be5(0x137)]){let _0x241f35=_0x160dc5[_0xd41be5(0x137)]['length'];_0x566044[_0xd41be5(0x181)]+=_0x241f35,_0x566044['allStrLength']>_0x566044[_0xd41be5(0xd9)]?(_0x160dc5[_0xd41be5(0x141)]='',delete _0x160dc5[_0xd41be5(0x137)]):_0x241f35>_0x3d4872&&(_0x160dc5[_0xd41be5(0x141)]=_0x160dc5[_0xd41be5(0x137)][_0xd41be5(0x10c)](0x0,_0x3d4872),delete _0x160dc5[_0xd41be5(0x137)]);}},_0x4ec6f8['prototype'][_0x5d4413(0x127)]=function(_0x1c205c){var _0x15a6f3=_0x5d4413;return!!(_0x1c205c&&_0x29fdc9[_0x15a6f3(0x140)]&&this[_0x15a6f3(0x148)](_0x1c205c)==='[object\\x20Map]'&&_0x1c205c[_0x15a6f3(0x123)]);},_0x4ec6f8[_0x5d4413(0xa3)]['_propertyName']=function(_0x555f36){var _0x30eb10=_0x5d4413;if(_0x555f36[_0x30eb10(0xf4)](/^\\d+$/))return _0x555f36;var _0x459c76;try{_0x459c76=JSON['stringify'](''+_0x555f36);}catch{_0x459c76='\\x22'+this['_objectToString'](_0x555f36)+'\\x22';}return _0x459c76[_0x30eb10(0xf4)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x459c76=_0x459c76[_0x30eb10(0x10c)](0x1,_0x459c76[_0x30eb10(0x197)]-0x2):_0x459c76=_0x459c76[_0x30eb10(0xee)](/'/g,'\\x5c\\x27')[_0x30eb10(0xee)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x459c76;},_0x4ec6f8['prototype'][_0x5d4413(0x115)]=function(_0x37a2bc,_0x3d78b9,_0x2b32a2,_0x1a3790){var _0x17ed05=_0x5d4413;this[_0x17ed05(0x15e)](_0x37a2bc,_0x3d78b9),_0x1a3790&&_0x1a3790(),this[_0x17ed05(0x14c)](_0x2b32a2,_0x37a2bc),this['_treeNodePropertiesAfterFullValue'](_0x37a2bc,_0x3d78b9);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x15e)]=function(_0x34cae9,_0x275743){var _0xa3e7c2=_0x5d4413;this[_0xa3e7c2(0xde)](_0x34cae9,_0x275743),this[_0xa3e7c2(0x17c)](_0x34cae9,_0x275743),this[_0xa3e7c2(0xe2)](_0x34cae9,_0x275743),this[_0xa3e7c2(0x19a)](_0x34cae9,_0x275743);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xde)]=function(_0x32f5e5,_0x53a774){},_0x4ec6f8['prototype']['_setNodeQueryPath']=function(_0x41a6cf,_0x546223){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x170)]=function(_0x8faa79,_0x3cb609){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x15f)]=function(_0x470b4d){var _0x1c20a9=_0x5d4413;return _0x470b4d===this[_0x1c20a9(0xc7)];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x159)]=function(_0x5e1348,_0x3e13d3){var _0x210da8=_0x5d4413;this['_setNodeLabel'](_0x5e1348,_0x3e13d3),this['_setNodeExpandableState'](_0x5e1348),_0x3e13d3[_0x210da8(0x152)]&&this['_sortProps'](_0x5e1348),this[_0x210da8(0x153)](_0x5e1348,_0x3e13d3),this[_0x210da8(0x18a)](_0x5e1348,_0x3e13d3),this[_0x210da8(0x119)](_0x5e1348);},_0x4ec6f8[_0x5d4413(0xa3)]['_additionalMetadata']=function(_0x179ebd,_0x4a5428){var _0x29050a=_0x5d4413;try{_0x179ebd&&typeof _0x179ebd[_0x29050a(0x197)]==_0x29050a(0x108)&&(_0x4a5428[_0x29050a(0x197)]=_0x179ebd[_0x29050a(0x197)]);}catch{}if(_0x4a5428[_0x29050a(0x11a)]===_0x29050a(0x108)||_0x4a5428[_0x29050a(0x11a)]==='Number'){if(isNaN(_0x4a5428[_0x29050a(0x137)]))_0x4a5428[_0x29050a(0xbd)]=!0x0,delete _0x4a5428[_0x29050a(0x137)];else switch(_0x4a5428[_0x29050a(0x137)]){case Number['POSITIVE_INFINITY']:_0x4a5428[_0x29050a(0xab)]=!0x0,delete _0x4a5428['value'];break;case Number[_0x29050a(0x18c)]:_0x4a5428['negativeInfinity']=!0x0,delete _0x4a5428[_0x29050a(0x137)];break;case 0x0:this[_0x29050a(0x199)](_0x4a5428['value'])&&(_0x4a5428['negativeZero']=!0x0);break;}}else _0x4a5428['type']==='function'&&typeof _0x179ebd[_0x29050a(0x12f)]==_0x29050a(0x10b)&&_0x179ebd[_0x29050a(0x12f)]&&_0x4a5428['name']&&_0x179ebd[_0x29050a(0x12f)]!==_0x4a5428[_0x29050a(0x12f)]&&(_0x4a5428[_0x29050a(0x142)]=_0x179ebd[_0x29050a(0x12f)]);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x199)]=function(_0xff5555){var _0x2b82a9=_0x5d4413;return 0x1/_0xff5555===Number[_0x2b82a9(0x18c)];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x136)]=function(_0x243e50){var _0x4f6738=_0x5d4413;!_0x243e50['props']||!_0x243e50[_0x4f6738(0x16d)][_0x4f6738(0x197)]||_0x243e50[_0x4f6738(0x11a)]===_0x4f6738(0xb8)||_0x243e50['type']===_0x4f6738(0x140)||_0x243e50['type']===_0x4f6738(0xda)||_0x243e50[_0x4f6738(0x16d)][_0x4f6738(0xb2)](function(_0x49ebe3,_0x5a68f3){var _0x16ebcb=_0x4f6738,_0x58f5dc=_0x49ebe3[_0x16ebcb(0x12f)][_0x16ebcb(0xce)](),_0x3e8bb7=_0x5a68f3[_0x16ebcb(0x12f)]['toLowerCase']();return _0x58f5dc<_0x3e8bb7?-0x1:_0x58f5dc>_0x3e8bb7?0x1:0x0;});},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x153)]=function(_0x9397d1,_0x3506cd){var _0x46fa9c=_0x5d4413;if(!(_0x3506cd[_0x46fa9c(0x125)]||!_0x9397d1['props']||!_0x9397d1[_0x46fa9c(0x16d)][_0x46fa9c(0x197)])){for(var _0x33052e=[],_0x21b61c=[],_0x31e004=0x0,_0x3263d2=_0x9397d1[_0x46fa9c(0x16d)][_0x46fa9c(0x197)];_0x31e004<_0x3263d2;_0x31e004++){var _0x4367c0=_0x9397d1['props'][_0x31e004];_0x4367c0[_0x46fa9c(0x11a)]===_0x46fa9c(0xb0)?_0x33052e['push'](_0x4367c0):_0x21b61c['push'](_0x4367c0);}if(!(!_0x21b61c[_0x46fa9c(0x197)]||_0x33052e[_0x46fa9c(0x197)]<=0x1)){_0x9397d1[_0x46fa9c(0x16d)]=_0x21b61c;var _0x12a238={'functionsNode':!0x0,'props':_0x33052e};this[_0x46fa9c(0xde)](_0x12a238,_0x3506cd),this[_0x46fa9c(0x170)](_0x12a238,_0x3506cd),this[_0x46fa9c(0xe0)](_0x12a238),this[_0x46fa9c(0x19a)](_0x12a238,_0x3506cd),_0x12a238['id']+='\\x20f',_0x9397d1[_0x46fa9c(0x16d)][_0x46fa9c(0x12d)](_0x12a238);}}},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x18a)]=function(_0x2d3e19,_0x46799d){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xe0)]=function(_0x3f0cab){},_0x4ec6f8[_0x5d4413(0xa3)]['_isArray']=function(_0x3dacb5){var _0x350e08=_0x5d4413;return Array[_0x350e08(0x146)](_0x3dacb5)||typeof _0x3dacb5==_0x350e08(0xcb)&&this[_0x350e08(0x148)](_0x3dacb5)===_0x350e08(0x151);},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x19a)]=function(_0x10e2b9,_0x1ff96f){},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0x119)]=function(_0x516e14){var _0x27970f=_0x5d4413;delete _0x516e14[_0x27970f(0x147)],delete _0x516e14[_0x27970f(0x121)],delete _0x516e14[_0x27970f(0x174)];},_0x4ec6f8[_0x5d4413(0xa3)][_0x5d4413(0xe2)]=function(_0x211393,_0x4c093d){};let _0x5a6ee8=new _0x4ec6f8(),_0x58ea8f={'props':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0x16d)]||0x64,'elements':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xd0)]||0x64,'strLength':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0x130)]||0x400*0x32,'totalStrLength':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xd9)]||0x400*0x32,'autoExpandLimit':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xe6)]||0x1388,'autoExpandMaxDepth':_0x16053c[_0x5d4413(0xae)][_0x5d4413(0xa2)]||0xa},_0x5794d0={'props':_0x16053c[_0x5d4413(0x131)]['props']||0x5,'elements':_0x16053c['reducedLimits'][_0x5d4413(0xd0)]||0x5,'strLength':_0x16053c[_0x5d4413(0x131)][_0x5d4413(0x130)]||0x100,'totalStrLength':_0x16053c[_0x5d4413(0x131)]['totalStrLength']||0x100*0x3,'autoExpandLimit':_0x16053c[_0x5d4413(0x131)][_0x5d4413(0xe6)]||0x1e,'autoExpandMaxDepth':_0x16053c[_0x5d4413(0x131)]['autoExpandMaxDepth']||0x2};function _0x5d713e(_0x559ec1,_0x3bab4b,_0x2b0326,_0x398253,_0x25fe92,_0x276876){var _0x38c024=_0x5d4413;let _0x42c2fe,_0x3a7f23;try{_0x3a7f23=_0x1c7b58(),_0x42c2fe=_0x47d813[_0x3bab4b],!_0x42c2fe||_0x3a7f23-_0x42c2fe['ts']>_0xee9e24['perLogpoint'][_0x38c024(0xea)]&&_0x42c2fe[_0x38c024(0xed)]&&_0x42c2fe[_0x38c024(0x10f)]/_0x42c2fe['count']<_0xee9e24[_0x38c024(0x154)][_0x38c024(0xaa)]?(_0x47d813[_0x3bab4b]=_0x42c2fe={'count':0x0,'time':0x0,'ts':_0x3a7f23},_0x47d813['hits']={}):_0x3a7f23-_0x47d813[_0x38c024(0x180)]['ts']>_0xee9e24[_0x38c024(0x198)]['resetWhenQuietMs']&&_0x47d813[_0x38c024(0x180)][_0x38c024(0xed)]&&_0x47d813[_0x38c024(0x180)][_0x38c024(0x10f)]/_0x47d813[_0x38c024(0x180)][_0x38c024(0xed)]<_0xee9e24['global']['resetOnProcessingTimeAverageMs']&&(_0x47d813['hits']={});let _0x2beacd=[],_0xa238bf=_0x42c2fe[_0x38c024(0xf2)]||_0x47d813[_0x38c024(0x180)]['reduceLimits']?_0x5794d0:_0x58ea8f,_0x4de305=_0x404b01=>{var _0x295276=_0x38c024;let _0x3d542a={};return _0x3d542a[_0x295276(0x16d)]=_0x404b01['props'],_0x3d542a[_0x295276(0xd0)]=_0x404b01[_0x295276(0xd0)],_0x3d542a[_0x295276(0x130)]=_0x404b01['strLength'],_0x3d542a[_0x295276(0xd9)]=_0x404b01[_0x295276(0xd9)],_0x3d542a['autoExpandLimit']=_0x404b01[_0x295276(0xe6)],_0x3d542a[_0x295276(0xa2)]=_0x404b01[_0x295276(0xa2)],_0x3d542a[_0x295276(0x152)]=!0x1,_0x3d542a[_0x295276(0x125)]=!_0x2e6e58,_0x3d542a[_0x295276(0xeb)]=0x1,_0x3d542a['level']=0x0,_0x3d542a[_0x295276(0x110)]='root_exp_id',_0x3d542a[_0x295276(0x188)]=_0x295276(0x13b),_0x3d542a[_0x295276(0xcd)]=!0x0,_0x3d542a['autoExpandPreviousObjects']=[],_0x3d542a[_0x295276(0x12c)]=0x0,_0x3d542a[_0x295276(0x13f)]=_0x16053c[_0x295276(0x13f)],_0x3d542a[_0x295276(0x181)]=0x0,_0x3d542a[_0x295276(0xd4)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x3d542a;};for(var _0x4701b5=0x0;_0x4701b5<_0x25fe92[_0x38c024(0x197)];_0x4701b5++)_0x2beacd['push'](_0x5a6ee8[_0x38c024(0x105)]({'timeNode':_0x559ec1===_0x38c024(0x10f)||void 0x0},_0x25fe92[_0x4701b5],_0x4de305(_0xa238bf),{}));if(_0x559ec1===_0x38c024(0x124)||_0x559ec1==='error'){let _0x6a96d1=Error[_0x38c024(0xc3)];try{Error[_0x38c024(0xc3)]=0x1/0x0,_0x2beacd['push'](_0x5a6ee8[_0x38c024(0x105)]({'stackNode':!0x0},new Error()[_0x38c024(0xdd)],_0x4de305(_0xa238bf),{'strLength':0x1/0x0}));}finally{Error[_0x38c024(0xc3)]=_0x6a96d1;}}return{'method':'log','version':_0x2fc14c,'args':[{'ts':_0x2b0326,'session':_0x398253,'args':_0x2beacd,'id':_0x3bab4b,'context':_0x276876}]};}catch(_0x288391){return{'method':_0x38c024(0x1a2),'version':_0x2fc14c,'args':[{'ts':_0x2b0326,'session':_0x398253,'args':[{'type':'unknown','error':_0x288391&&_0x288391[_0x38c024(0x19b)]}],'id':_0x3bab4b,'context':_0x276876}]};}finally{try{if(_0x42c2fe&&_0x3a7f23){let _0x5ad3d3=_0x1c7b58();_0x42c2fe[_0x38c024(0xed)]++,_0x42c2fe['time']+=_0x57e37c(_0x3a7f23,_0x5ad3d3),_0x42c2fe['ts']=_0x5ad3d3,_0x47d813['hits']['count']++,_0x47d813[_0x38c024(0x180)]['time']+=_0x57e37c(_0x3a7f23,_0x5ad3d3),_0x47d813[_0x38c024(0x180)]['ts']=_0x5ad3d3,(_0x42c2fe[_0x38c024(0xed)]>_0xee9e24[_0x38c024(0x154)][_0x38c024(0xc6)]||_0x42c2fe['time']>_0xee9e24['perLogpoint'][_0x38c024(0x122)])&&(_0x42c2fe[_0x38c024(0xf2)]=!0x0),(_0x47d813[_0x38c024(0x180)][_0x38c024(0xed)]>_0xee9e24['global']['reduceOnCount']||_0x47d813[_0x38c024(0x180)][_0x38c024(0x10f)]>_0xee9e24[_0x38c024(0x198)]['reduceOnAccumulatedProcessingTimeMs'])&&(_0x47d813[_0x38c024(0x180)][_0x38c024(0xf2)]=!0x0);}}catch{}}}return _0x5d713e;}((_0x203b5a,_0x30b7c7,_0x324cef,_0x27f652,_0x48e15b,_0x5bb317,_0x3fb50f,_0x343a8,_0x49d5d3,_0x205017,_0x264412,_0x476e4f)=>{var _0x37c213=_0x206025;if(_0x203b5a[_0x37c213(0x14e)])return _0x203b5a[_0x37c213(0x14e)];let _0x591ad1={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}};if(!H(_0x203b5a,_0x343a8,_0x48e15b))return _0x203b5a[_0x37c213(0x14e)]=_0x591ad1,_0x203b5a['_console_ninja'];let _0x540ede=B(_0x203b5a),_0x468f43=_0x540ede[_0x37c213(0x12b)],_0x514c25=_0x540ede[_0x37c213(0xec)],_0x53eba8=_0x540ede[_0x37c213(0xd1)],_0x1585a8={'hits':{},'ts':{}},_0x2e4709=X(_0x203b5a,_0x49d5d3,_0x1585a8,_0x5bb317,_0x476e4f),_0x2898c2=(_0x163a2f,_0x3623fa,_0x3f5713,_0x316379,_0x1b0b41,_0x564147)=>{var _0x4f1607=_0x37c213;let _0x3730c8=_0x203b5a[_0x4f1607(0x14e)];try{return _0x203b5a[_0x4f1607(0x14e)]=_0x591ad1,_0x2e4709(_0x163a2f,_0x3623fa,_0x3f5713,_0x316379,_0x1b0b41,_0x564147);}finally{_0x203b5a[_0x4f1607(0x14e)]=_0x3730c8;}},_0x14f15a=_0x1ee0b5=>{_0x1585a8['ts'][_0x1ee0b5]=_0x514c25();},_0x2c00f7=(_0x26ccbf,_0x14ea2f)=>{let _0x48585e=_0x1585a8['ts'][_0x14ea2f];if(delete _0x1585a8['ts'][_0x14ea2f],_0x48585e){let _0xac0e=_0x468f43(_0x48585e,_0x514c25());_0x1941f0(_0x2898c2('time',_0x26ccbf,_0x53eba8(),_0x17718d,[_0xac0e],_0x14ea2f));}},_0x31320e=_0x3349e3=>{var _0xc2d4c3=_0x37c213,_0x1a6fc7;return _0x48e15b==='next.js'&&_0x203b5a[_0xc2d4c3(0xca)]&&((_0x1a6fc7=_0x3349e3==null?void 0x0:_0x3349e3[_0xc2d4c3(0x113)])==null?void 0x0:_0x1a6fc7[_0xc2d4c3(0x197)])&&(_0x3349e3['args'][0x0][_0xc2d4c3(0xca)]=_0x203b5a[_0xc2d4c3(0xca)]),_0x3349e3;};_0x203b5a[_0x37c213(0x14e)]={'consoleLog':(_0x587d5a,_0x4a2aed)=>{var _0x14d3d4=_0x37c213;_0x203b5a[_0x14d3d4(0x15b)]['log'][_0x14d3d4(0x12f)]!=='disabledLog'&&_0x1941f0(_0x2898c2(_0x14d3d4(0x1a2),_0x587d5a,_0x53eba8(),_0x17718d,_0x4a2aed));},'consoleTrace':(_0x41ced6,_0x4beb53)=>{var _0x490de8=_0x37c213,_0x437ded,_0x2f3a5c;_0x203b5a[_0x490de8(0x15b)][_0x490de8(0x1a2)][_0x490de8(0x12f)]!==_0x490de8(0x14f)&&((_0x2f3a5c=(_0x437ded=_0x203b5a[_0x490de8(0x128)])==null?void 0x0:_0x437ded[_0x490de8(0x13c)])!=null&&_0x2f3a5c[_0x490de8(0xd4)]&&(_0x203b5a[_0x490de8(0x196)]=!0x0),_0x1941f0(_0x31320e(_0x2898c2(_0x490de8(0x124),_0x41ced6,_0x53eba8(),_0x17718d,_0x4beb53))));},'consoleError':(_0x4816b9,_0x8b9537)=>{var _0x11a235=_0x37c213;_0x203b5a[_0x11a235(0x196)]=!0x0,_0x1941f0(_0x31320e(_0x2898c2(_0x11a235(0x118),_0x4816b9,_0x53eba8(),_0x17718d,_0x8b9537)));},'consoleTime':_0x5d5cdd=>{_0x14f15a(_0x5d5cdd);},'consoleTimeEnd':(_0x509cca,_0x533215)=>{_0x2c00f7(_0x533215,_0x509cca);},'autoLog':(_0x3e3e0e,_0x239569)=>{_0x1941f0(_0x2898c2('log',_0x239569,_0x53eba8(),_0x17718d,[_0x3e3e0e]));},'autoLogMany':(_0x5396f2,_0x2e21a4)=>{var _0x24649c=_0x37c213;_0x1941f0(_0x2898c2(_0x24649c(0x1a2),_0x5396f2,_0x53eba8(),_0x17718d,_0x2e21a4));},'autoTrace':(_0xc5a86f,_0x284f0e)=>{var _0x19371e=_0x37c213;_0x1941f0(_0x31320e(_0x2898c2(_0x19371e(0x124),_0x284f0e,_0x53eba8(),_0x17718d,[_0xc5a86f])));},'autoTraceMany':(_0x2186d5,_0x539807)=>{_0x1941f0(_0x31320e(_0x2898c2('trace',_0x2186d5,_0x53eba8(),_0x17718d,_0x539807)));},'autoTime':(_0x1b9356,_0x1765d1,_0x1fe25f)=>{_0x14f15a(_0x1fe25f);},'autoTimeEnd':(_0x1a985f,_0x4488ae,_0x49e434)=>{_0x2c00f7(_0x4488ae,_0x49e434);},'coverage':_0x33489e=>{var _0x32d229=_0x37c213;_0x1941f0({'method':_0x32d229(0xad),'version':_0x5bb317,'args':[{'id':_0x33489e}]});}};let _0x1941f0=q(_0x203b5a,_0x30b7c7,_0x324cef,_0x27f652,_0x48e15b,_0x205017,_0x264412),_0x17718d=_0x203b5a[_0x37c213(0x14a)];return _0x203b5a[_0x37c213(0x14e)];})(globalThis,'127.0.0.1',_0x206025(0x163),_0x206025(0x166),'next.js',_0x206025(0x135),_0x206025(0x177),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"10.0.2.2\",\"MacBook-Pro.local\",\"http://localhost:3000\",\"192.168.0.133\"],'1',_0x206025(0xfe),_0x206025(0x156),_0x206025(0x12e));");
    } catch (e) {
        console.error(e);
    }
}
function oo_oo(i, ...v) {
    try {
        oo_cm().consoleLog(i, v);
    } catch (e) {}
    return v;
}
oo_oo; /* istanbul ignore next */ 
function oo_tr(i, ...v) {
    try {
        oo_cm().consoleTrace(i, v);
    } catch (e) {}
    return v;
}
oo_tr; /* istanbul ignore next */ 
function oo_tx(i, ...v) {
    try {
        oo_cm().consoleError(i, v);
    } catch (e) {}
    return v;
}
oo_tx; /* istanbul ignore next */ 
function oo_ts(v) {
    try {
        oo_cm().consoleTime(v);
    } catch (e) {}
    return v;
}
oo_ts; /* istanbul ignore next */ 
function oo_te(v, i) {
    try {
        oo_cm().consoleTimeEnd(v, i);
    } catch (e) {}
    return v;
}
oo_te; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/ 
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cabbc549._.js.map