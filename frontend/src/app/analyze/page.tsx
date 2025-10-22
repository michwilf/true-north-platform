"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  UserGroupIcon,
  NewspaperIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface AgentAnalysis {
  recommendation: string;
  confidence: number;
  reasoning: string;
  key_metrics?: Record<string, number>;
  sentiment_score?: number;
  news_count?: number;
  key_headlines?: string[];
  assessment?: string;
  position_size?: number;
  risk_factors?: string[];
}

interface StockAnalysis {
  symbol: string;
  analysis_timestamp: string;
  overall_recommendation: string;
  confidence: number;
  target_price: number;
  stop_loss: number;
  agents: {
    market_analyst: AgentAnalysis;
    news_analyst: AgentAnalysis;
    fundamentals_analyst: AgentAnalysis;
    risk_manager: AgentAnalysis;
  };
  debate_summary: string;
  price_targets: {
    bull_case: number;
    base_case: number;
    bear_case: number;
  };
}

export default function StockAnalysisPage() {
  const [symbol, setSymbol] = useState("");
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeStock = async () => {
    if (!symbol.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"}/api/analyze-stock/${symbol.toUpperCase()}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze stock");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toUpperCase()) {
      case "BUY":
      case "STRONG_BUY":
        return "text-green-600 bg-green-50 border-green-200";
      case "SELL":
      case "STRONG_SELL":
        return "text-red-600 bg-red-50 border-red-200";
      case "HOLD":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation.toUpperCase()) {
      case "BUY":
      case "STRONG_BUY":
        return <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />;
      case "SELL":
      case "STRONG_SELL":
        return <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getAgentIcon = (agentType: string) => {
    switch (agentType) {
      case "market_analyst":
        return <ChartBarIcon className="h-6 w-6 text-blue-600" />;
      case "news_analyst":
        return <NewspaperIcon className="h-6 w-6 text-purple-600" />;
      case "fundamentals_analyst":
        return <CalculatorIcon className="h-6 w-6 text-green-600" />;
      case "risk_manager":
        return <ShieldCheckIcon className="h-6 w-6 text-orange-600" />;
      default:
        return <UserGroupIcon className="h-6 w-6 text-gray-600" />;
    }
  };

  const getAgentTitle = (agentType: string) => {
    switch (agentType) {
      case "market_analyst":
        return "Market Analyst";
      case "news_analyst":
        return "News Analyst";
      case "fundamentals_analyst":
        return "Fundamentals Analyst";
      case "risk_manager":
        return "Risk Manager";
      default:
        return agentType
          .replace("_", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stock Analysis</h1>
            <p className="mt-1 text-sm text-gray-600">
              AI-powered multi-agent analysis with transparent reasoning
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label
                htmlFor="symbol"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Stock Symbol
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === "Enter" && analyzeStock()}
                  placeholder="Enter symbol (e.g., AAPL, TSLA, MSFT)"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
            <div className="pt-6">
              <button
                onClick={analyzeStock}
                disabled={loading || !symbol.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                )}
                {loading ? "Analyzing..." : "Analyze Stock"}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-8">
            {/* Overall Recommendation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {analysis.symbol}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Analysis completed:{" "}
                    {new Date(analysis.analysis_timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full border font-semibold ${getRecommendationColor(
                      analysis.overall_recommendation
                    )}`}
                  >
                    {getRecommendationIcon(analysis.overall_recommendation)}
                    <span className="ml-2">
                      {analysis.overall_recommendation}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {(analysis.confidence * 100).toFixed(0)}% confidence
                  </p>
                </div>
              </div>

              {/* Price Targets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600 font-medium mb-1">
                    Bull Case
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    ${analysis.price_targets.bull_case.toFixed(2)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    Base Case
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    ${analysis.price_targets.base_case.toFixed(2)}
                  </p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-red-600 font-medium mb-1">
                    Bear Case
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    ${analysis.price_targets.bear_case.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Key Levels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Target Price
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    ${analysis.target_price.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    Stop Loss
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    ${analysis.stop_loss.toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Agent Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(analysis.agents).map(
                ([agentType, agentData], index) => (
                  <motion.div
                    key={agentType}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getAgentIcon(agentType)}
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getAgentTitle(agentType)}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRecommendationColor(
                            agentData.recommendation
                          )}`}
                        >
                          {agentData.recommendation}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {(agentData.confidence * 100).toFixed(0)}% confidence
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{agentData.reasoning}</p>

                    {/* Agent-specific data */}
                    {agentData.key_metrics && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Key Metrics
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(agentData.key_metrics).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600">
                                  {key.replace("_", " ").toUpperCase()}:
                                </span>
                                <span className="font-medium">
                                  {typeof value === "number"
                                    ? value.toFixed(2)
                                    : value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {agentData.key_headlines && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Key Headlines ({agentData.news_count} articles)
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {agentData.key_headlines.map((headline, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              {headline}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {agentData.risk_factors && (
                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-orange-700 mb-2">
                          Risk Factors
                        </p>
                        <ul className="text-sm text-orange-600 space-y-1">
                          {agentData.risk_factors.map((factor, idx) => (
                            <li key={idx} className="flex items-start">
                              <ExclamationTriangleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              {factor}
                            </li>
                          ))}
                        </ul>
                        {agentData.position_size && (
                          <p className="text-sm text-orange-700 mt-2 font-medium">
                            Recommended position size:{" "}
                            {(agentData.position_size * 100).toFixed(0)}%
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )
              )}
            </div>

            {/* Debate Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Agent Debate Summary
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {analysis.debate_summary}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
