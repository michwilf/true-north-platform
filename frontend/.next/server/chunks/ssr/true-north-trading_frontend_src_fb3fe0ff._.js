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
"[project]/true-north-trading/frontend/src/app/traders/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TradersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/UserGroupIcon.js [app-ssr] (ecmascript) <export default as UserGroupIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckBadgeIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckBadgeIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/CheckBadgeIcon.js [app-ssr] (ecmascript) <export default as CheckBadgeIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ChartBarIcon.js [app-ssr] (ecmascript) <export default as ChartBarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClockIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ClockIcon.js [app-ssr] (ecmascript) <export default as ClockIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/@heroicons/react/24/outline/esm/ArrowPathIcon.js [app-ssr] (ecmascript) <export default as ArrowPathIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/true-north-trading/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function TradersPage() {
    const { data: signals, loading: signalsLoading, refetch: refetchSignals } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTraderSignals"])();
    const [traders, setTraders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availableTraders, setAvailableTraders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingTraders, setLoadingTraders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedTrader, setSelectedTrader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [timeFilter, setTimeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("24h");
    const [followingTrader, setFollowingTrader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadTraders();
    }, []);
    const loadTraders = async ()=>{
        try {
            setLoadingTraders(true);
            const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8002") || "http://localhost:8002"}/api/traders`);
            const data = await response.json();
            setTraders(data.traders || data);
            // If no traders are followed, load the leaderboard
            if ((!data.traders || data.traders.length === 0) && (!data || data.length === 0)) {
                const leaderboardResponse = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8002") || "http://localhost:8002"}/api/trader-leaderboard`);
                const leaderboardData = await leaderboardResponse.json();
                setAvailableTraders(leaderboardData.leaderboard || []);
            } else {
                setAvailableTraders([]);
            }
        } catch (error) {
            /* eslint-disable */ console.error(...oo_tx(`3173658246_70_6_70_53_11`, "Failed to load traders:", error));
        } finally{
            setLoadingTraders(false);
        }
    };
    const filteredSignals = signals?.filter((signal)=>{
        if (selectedTrader && signal.trader_name !== selectedTrader) return false;
        const signalTime = new Date(signal.time).getTime();
        const now = Date.now();
        const hoursDiff = (now - signalTime) / (1000 * 60 * 60);
        if (timeFilter === "1h" && hoursDiff > 1) return false;
        if (timeFilter === "24h" && hoursDiff > 24) return false;
        if (timeFilter === "7d" && hoursDiff > 168) return false;
        return true;
    });
    const followTrader = async (trader)=>{
        try {
            setFollowingTrader(trader.id);
            const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8002") || "http://localhost:8002"}/api/traders/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: trader.name,
                    platform: trader.platform,
                    username: trader.username,
                    verified: trader.verified
                })
            });
            if (!response.ok) {
                throw new Error("Failed to follow trader");
            }
            // Reload traders to refresh the list
            await loadTraders();
        } catch (error) {
            /* eslint-disable */ console.error(...oo_tx(`3173658246_118_6_118_54_11`, "Failed to follow trader:", error));
            alert("Failed to follow trader. Please try again.");
        } finally{
            setFollowingTrader(null);
        }
    };
    const getPlatformBadgeColor = (platform)=>{
        switch(platform.toLowerCase()){
            case "twitter":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "reddit":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "discord":
                return "bg-purple-100 text-purple-800 border-purple-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };
    const getActionBadgeColor = (action)=>{
        switch(action.toUpperCase()){
            case "LONG":
            case "BUY":
                return "bg-green-100 text-green-800";
            case "SHORT":
            case "SELL":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
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
                                        children: "Trader Following"
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-gray-600",
                                        children: "Track and analyze successful traders across multiple platforms"
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    refetchSignals();
                                    loadTraders();
                                },
                                disabled: signalsLoading || loadingTraders,
                                className: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                                        className: `h-5 w-5 mr-2 ${signalsLoading || loadingTraders ? "animate-spin" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 15
                                    }, this),
                                    "Refresh"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg shadow-sm border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-gray-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-gray-900 flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"], {
                                                    className: "h-5 w-5 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, this),
                                                traders.length > 0 ? `Followed Traders (${traders.length})` : `Available Traders (${availableTraders.length})`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                            lineNumber: 190,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "divide-y divide-gray-200 max-h-[600px] overflow-y-auto",
                                        children: loadingTraders ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                                                className: "h-8 w-8 text-blue-600 animate-spin mx-auto"
                                            }, void 0, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 19
                                        }, this) : traders.length > 0 ? traders.map((trader, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                initial: {
                                                    opacity: 0,
                                                    x: -20
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    duration: 0.3,
                                                    delay: index * 0.05
                                                },
                                                onClick: ()=>setSelectedTrader(selectedTrader === trader.name ? null : trader.name),
                                                className: `w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${selectedTrader === trader.name ? "bg-blue-50" : ""}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-2 mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-semibold text-gray-900",
                                                                            children: trader.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 221,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        trader.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckBadgeIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckBadgeIcon$3e$__["CheckBadgeIcon"], {
                                                                            className: "h-4 w-4 text-blue-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 225,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 220,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mb-2",
                                                                    children: [
                                                                        "@",
                                                                        trader.username
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `px-2 py-0.5 rounded text-xs font-medium border ${getPlatformBadgeColor(trader.platform)}`,
                                                                            children: trader.platform
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 232,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: [
                                                                                trader.followers.toLocaleString(),
                                                                                " followers"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 239,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 231,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                            lineNumber: 219,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 grid grid-cols-2 gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-gray-50 rounded px-2 py-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600",
                                                                        children: "Win Rate"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 247,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-semibold text-gray-900",
                                                                        children: [
                                                                            trader.win_rate.toFixed(1),
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 248,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-gray-50 rounded px-2 py-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600",
                                                                        children: "Trades"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 253,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-semibold text-gray-900",
                                                                        children: trader.total_trades
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 254,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, trader.id, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 21
                                            }, this)) : availableTraders.length > 0 ? availableTraders.map((trader, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: -20
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    duration: 0.3,
                                                    delay: index * 0.05
                                                },
                                                className: "px-6 py-4 hover:bg-gray-50",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-2 mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "font-semibold text-gray-900",
                                                                            children: trader.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 273,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        trader.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckBadgeIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckBadgeIcon$3e$__["CheckBadgeIcon"], {
                                                                            className: "h-4 w-4 text-blue-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 277,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 272,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600 mb-2",
                                                                    children: [
                                                                        "@",
                                                                        trader.username
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 280,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `px-2 py-0.5 rounded text-xs font-medium border ${getPlatformBadgeColor(trader.platform)}`,
                                                                            children: trader.platform
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 284,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-gray-500",
                                                                            children: [
                                                                                trader.followers?.toLocaleString() || 0,
                                                                                " ",
                                                                                "followers"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 291,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                            lineNumber: 271,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 grid grid-cols-2 gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-gray-50 rounded px-2 py-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600",
                                                                        children: "Win Rate"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 300,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-semibold text-gray-900",
                                                                        children: [
                                                                            trader.win_rate?.toFixed(1) || 0,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 301,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-gray-50 rounded px-2 py-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-600",
                                                                        children: "Trades"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 306,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm font-semibold text-gray-900",
                                                                        children: trader.total_trades || 0
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                        lineNumber: 307,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                        lineNumber: 298,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>followTrader(trader),
                                                        disabled: followingTrader === trader.id,
                                                        className: "mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",
                                                        children: followingTrader === trader.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                                                                    className: "h-4 w-4 mr-2 animate-spin"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 319,
                                                                    columnNumber: 29
                                                                }, this),
                                                                "Following..."
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: "+ Follow"
                                                        }, void 0, false)
                                                    }, void 0, false, {
                                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, trader.id || index, true, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 21
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-6 text-center text-gray-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"], {
                                                    className: "h-12 w-12 mx-auto mb-3 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "No traders available"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-lg shadow-sm border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-6 py-4 border-b border-gray-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-lg font-semibold text-gray-900 flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__["ChartBarIcon"], {
                                                            className: "h-5 w-5 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Trading Signals",
                                                        selectedTrader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-2 text-sm font-normal text-gray-600",
                                                            children: [
                                                                "from ",
                                                                selectedTrader
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                            lineNumber: 347,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex space-x-2",
                                                    children: [
                                                        "1h",
                                                        "24h",
                                                        "7d"
                                                    ].map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setTimeFilter(filter),
                                                            className: `px-3 py-1 rounded text-sm font-medium ${timeFilter === filter ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
                                                            children: filter
                                                        }, filter, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                            lineNumber: 342,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "divide-y divide-gray-200 max-h-[600px] overflow-y-auto",
                                        children: signalsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-8 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ArrowPathIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowPathIcon$3e$__["ArrowPathIcon"], {
                                                    className: "h-8 w-8 text-blue-600 animate-spin mx-auto mb-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600",
                                                    children: "Loading signals..."
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                            lineNumber: 372,
                                            columnNumber: 19
                                        }, this) : filteredSignals && filteredSignals.length > 0 ? filteredSignals.map((signal, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                                className: "px-6 py-4 hover:bg-gray-50",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-3 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `px-3 py-1 rounded-full text-sm font-semibold ${getActionBadgeColor(signal.action)}`,
                                                                            children: signal.action
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 388,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "text-xl font-bold text-gray-900",
                                                                            children: signal.symbol
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 395,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        signal.entry_price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm text-gray-600",
                                                                            children: [
                                                                                "@ $",
                                                                                signal.entry_price.toFixed(2)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 399,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 387,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-4 mb-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium text-gray-700",
                                                                            children: [
                                                                                "by ",
                                                                                signal.trader_name
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 406,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `px-2 py-0.5 rounded text-xs font-medium border ${getPlatformBadgeColor(signal.platform)}`,
                                                                            children: signal.platform
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 409,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 405,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center space-x-4 text-sm text-gray-600",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClockIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockIcon$3e$__["ClockIcon"], {
                                                                                    className: "h-4 w-4 mr-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                                    lineNumber: 420,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                new Date(signal.time).toLocaleString()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 419,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__["ChartBarIcon"], {
                                                                                    className: "h-4 w-4 mr-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                                    lineNumber: 424,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                (signal.confidence * 100).toFixed(0),
                                                                                "% confidence"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                            lineNumber: 423,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 418,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                            lineNumber: 386,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "ml-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-24 bg-gray-200 rounded-full h-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `h-2 rounded-full ${signal.confidence >= 0.8 ? "bg-green-600" : signal.confidence >= 0.6 ? "bg-yellow-600" : "bg-red-600"}`,
                                                                    style: {
                                                                        width: `${signal.confidence * 100}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                                lineNumber: 432,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                            lineNumber: 431,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 385,
                                                    columnNumber: 23
                                                }, this)
                                            }, signal.id, false, {
                                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                lineNumber: 378,
                                                columnNumber: 21
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-12 text-center text-gray-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChartBarIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChartBarIcon$3e$__["ChartBarIcon"], {
                                                    className: "h-16 w-16 mx-auto mb-4 text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 450,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-medium",
                                                    children: "No signals found"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$true$2d$north$2d$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm mt-1",
                                                    children: selectedTrader ? "Try selecting a different trader or time range" : "Start following traders to see their signals"
                                                }, void 0, false, {
                                                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                        lineNumber: 370,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                            lineNumber: 339,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/true-north-trading/frontend/src/app/traders/page.tsx",
        lineNumber: 152,
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

//# sourceMappingURL=true-north-trading_frontend_src_fb3fe0ff._.js.map