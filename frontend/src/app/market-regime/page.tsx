"use client";

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import StreamingAnalysisDrawer from "@/components/StreamingAnalysisDrawer";
import AIAnalysisButton from "@/components/AIAnalysisButton";
import { startContextualAnalysis } from "@/lib/contextualAnalysis";

interface DetailedMarketRegime {
  volatility_regime: string;
  market_trend: string;
  risk_sentiment: string;
  recommended_strategy: string;
  confidence: number;
  vix_level: number;
  spy_trend: number;
  yield_10y: number;
  yield_change: number;
  analysis_timestamp: string;
  market_indicators: {
    vix: {
      current: number;
      threshold_low: number;
      threshold_high: number;
      status: string;
    };
    spy: {
      current_vs_sma20: number;
      trend: string;
    };
    treasury: {
      yield_10y: number;
      yield_change_5d: number;
    };
  };
}

export default function MarketRegimePage() {
  const [regimeData, setRegimeData] = useState<DetailedMarketRegime | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // AI Analysis states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState({
    currentAgent: "",
    progress: 0,
  });
  const [agentTexts, setAgentTexts] = useState<Record<string, string>>({});
  const [finalData, setFinalData] = useState<any>(null);

  useEffect(() => {
    loadRegimeData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(loadRegimeData, 300000);
    return () => clearInterval(interval);
  }, []);

  const loadRegimeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"
        }/api/market-regime/detailed`
      );
      const data = await response.json();
      setRegimeData(data);
    } catch (err) {
      setError("Failed to load market regime data");
      console.error("Error loading regime data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarketAnalysis = async () => {
    // Open drawer and start analysis
    setDrawerOpen(true);
    setIsAnalyzing(true);
    setAnalysisProgress({ currentAgent: "Starting...", progress: 0 });
    setAgentTexts({});
    setFinalData(null);

    try {
      console.log("🌍 Starting context-aware MARKET analysis...");

      // 🎯 BUILD CONTEXT OBJECT with market regime data
      const context = {
        type: "market" as const,
        symbol: "SPY",
        page: "market-regime",
        panel: "regime-overview",
        data: regimeData
          ? {
              volatility_regime: regimeData.volatility_regime,
              market_trend: regimeData.market_trend,
              risk_sentiment: regimeData.risk_sentiment,
              vix_level: regimeData.vix_level,
              spy_trend: regimeData.spy_trend,
              yield_10y: regimeData.yield_10y,
              yield_change: regimeData.yield_change,
            }
          : undefined,
      };

      // Start contextual analysis with callbacks
      await startContextualAnalysis(context, {
        onAgentStart: (agent, progress) => {
          console.log(`🤖 ${agent} starting (${progress}%)`);
          setAnalysisProgress({
            currentAgent: agent,
            progress,
          });
        },

        onAgentTextChunk: (agent, chunk) => {
          setAgentTexts((prev) => ({
            ...prev,
            [agent]: (prev[agent] || "") + chunk,
          }));
        },

        onAgentComplete: (agent, progress) => {
          console.log(`✅ ${agent} complete (${progress}%)`);
        },

        onSynthesisStart: () => {
          console.log("🔬 Synthesizing market outlook...");
          setAnalysisProgress({
            currentAgent: "Synthesizing market outlook...",
            progress: 90,
          });
        },

        onDone: (data) => {
          console.log("🎉 Market analysis complete!", data);
          setFinalData(data);
          setIsAnalyzing(false);
          setAnalysisProgress({ currentAgent: "Complete!", progress: 100 });
        },

        onError: (error) => {
          console.error("❌ Market analysis error:", error);
          setIsAnalyzing(false);
          setAnalysisProgress({ currentAgent: "Error occurred", progress: 0 });
        },
      });
    } catch (error) {
      console.error("Failed to start market analysis:", error);
      setIsAnalyzing(false);
    }
  };

  const getRegimeBadgeColor = (regime: string) => {
    switch (regime.toUpperCase()) {
      case "LOW_VOLATILITY":
        return "bg-green-100 text-green-800 border-green-200";
      case "HIGH_VOLATILITY":
        return "bg-red-100 text-red-800 border-red-200";
      case "EXTREME_VOLATILITY":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "BULL_MARKET":
        return "bg-green-100 text-green-800 border-green-200";
      case "BEAR_MARKET":
        return "bg-red-100 text-red-800 border-red-200";
      case "RISK_ON":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "RISK_OFF":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getVixStatusColor = (status: string) => {
    switch (status) {
      case "LOW":
        return "text-green-600";
      case "MEDIUM":
        return "text-yellow-600";
      case "HIGH":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "BULLISH" ? (
      <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
    ) : (
      <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing market regime...</p>
        </div>
      </div>
    );
  }

  if (error || !regimeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 font-medium">
            Failed to load market regime
          </p>
          <button
            onClick={loadRegimeData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Market Regime Analysis
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Comprehensive market condition analysis with VIX, SPY, and
                Treasury data
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 inline mr-1" />
                Updated:{" "}
                {new Date(regimeData.analysis_timestamp).toLocaleTimeString()}
              </div>
              <AIAnalysisButton
                context={{
                  type: "market",
                  data: regimeData,
                  label: "Market Regime",
                }}
                onAnalyze={handleMarketAnalysis}
                variant="primary"
                size="md"
                isAnalyzing={isAnalyzing}
              />
              <button
                onClick={loadRegimeData}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                <ArrowPathIcon
                  className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Regime Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Current Market Regime
            </h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Confidence</p>
              <p className="text-2xl font-bold text-blue-600">
                {(regimeData.confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Volatility Regime
              </p>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold border ${getRegimeBadgeColor(
                  regimeData.volatility_regime
                )}`}
              >
                {regimeData.volatility_regime.replace("_", " ")}
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Market Trend
              </p>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold border ${getRegimeBadgeColor(
                  regimeData.market_trend
                )}`}
              >
                {regimeData.market_trend.replace("_", " ")}
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Risk Sentiment
              </p>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold border ${getRegimeBadgeColor(
                  regimeData.risk_sentiment
                )}`}
              >
                {regimeData.risk_sentiment.replace("_", " ")}
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Recommended Strategy
              </p>
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {regimeData.recommended_strategy.replace("_", " ")}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Market Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* VIX Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                VIX (Fear Index)
              </h3>
              <ExclamationTriangleIcon
                className={`h-6 w-6 ${getVixStatusColor(
                  regimeData.market_indicators.vix.status
                )}`}
              />
            </div>

            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span
                  className={`text-3xl font-bold ${getVixStatusColor(
                    regimeData.market_indicators.vix.status
                  )}`}
                >
                  {regimeData.market_indicators.vix.current.toFixed(1)}
                </span>
                <span
                  className={`text-sm font-medium ${getVixStatusColor(
                    regimeData.market_indicators.vix.status
                  )}`}
                >
                  {regimeData.market_indicators.vix.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Low Threshold</span>
                <span className="font-medium">
                  {regimeData.market_indicators.vix.threshold_low}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">High Threshold</span>
                <span className="font-medium">
                  {regimeData.market_indicators.vix.threshold_high}
                </span>
              </div>
            </div>

            {/* VIX Level Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    regimeData.market_indicators.vix.status === "LOW"
                      ? "bg-green-600"
                      : regimeData.market_indicators.vix.status === "HIGH"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                  style={{
                    width: `${Math.min(
                      (regimeData.market_indicators.vix.current / 50) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* SPY Trend Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">SPY Trend</h3>
              {getTrendIcon(regimeData.market_indicators.spy.trend)}
            </div>

            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span
                  className={`text-3xl font-bold ${
                    regimeData.market_indicators.spy.trend === "BULLISH"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {regimeData.market_indicators.spy.current_vs_sma20 > 0
                    ? "+"
                    : ""}
                  {regimeData.market_indicators.spy.current_vs_sma20.toFixed(2)}
                  %
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">vs 20-day SMA</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Trend Direction</span>
                <span
                  className={`font-medium ${
                    regimeData.market_indicators.spy.trend === "BULLISH"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {regimeData.market_indicators.spy.trend}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Treasury Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                10Y Treasury
              </h3>
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
            </div>

            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-blue-600">
                  {regimeData.market_indicators.treasury.yield_10y.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Current Yield</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">5-Day Change</span>
                <span
                  className={`font-medium ${
                    regimeData.market_indicators.treasury.yield_change_5d >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {regimeData.market_indicators.treasury.yield_change_5d > 0
                    ? "+"
                    : ""}
                  {regimeData.market_indicators.treasury.yield_change_5d.toFixed(
                    2
                  )}
                  %
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Strategy Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Strategy Recommendations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Current Environment
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  • Volatility:{" "}
                  {regimeData.volatility_regime.replace("_", " ").toLowerCase()}
                </p>
                <p>
                  • Market trend:{" "}
                  {regimeData.market_trend.replace("_", " ").toLowerCase()}
                </p>
                <p>
                  • Risk appetite:{" "}
                  {regimeData.risk_sentiment.replace("_", " ").toLowerCase()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Recommended Actions
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                {regimeData.recommended_strategy === "DEFENSIVE_VALUE" && (
                  <>
                    <p>• Focus on defensive value stocks</p>
                    <p>• Reduce position sizes</p>
                    <p>• Increase cash allocation</p>
                  </>
                )}
                {regimeData.recommended_strategy === "GROWTH_MOMENTUM" && (
                  <>
                    <p>• Target growth and momentum stocks</p>
                    <p>• Consider increasing position sizes</p>
                    <p>• Look for breakout opportunities</p>
                  </>
                )}
                {regimeData.recommended_strategy === "BALANCED_APPROACH" && (
                  <>
                    <p>• Maintain balanced portfolio</p>
                    <p>• Mix of growth and value</p>
                    <p>• Standard position sizing</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Analysis Drawer */}
      <StreamingAnalysisDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        symbol="SPY"
        isStreaming={isAnalyzing}
        progress={analysisProgress.progress}
        currentAgent={analysisProgress.currentAgent}
        agentTexts={agentTexts}
        finalData={finalData}
      />
    </div>
  );
}
