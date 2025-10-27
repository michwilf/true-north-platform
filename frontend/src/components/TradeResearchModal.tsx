"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  ChartBarIcon,
  NewspaperIcon,
  CalculatorIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import StreamingMarkdown from "./StreamingMarkdown";

interface Trade {
  id: string;
  symbol: string;
  type?: string;
  side?: "long" | "short";
  entry_price?: number;
  current_price?: number;
  target_price?: number;
  stop_loss?: number;
  pnl?: number;
  pnl_percentage?: number;
  reasoning?: string;
  confidence?: number;
  [key: string]: unknown;
}

interface TradeResearchModalProps {
  trade: Trade;
  isOpen: boolean;
  onClose: () => void;
}

interface AgentAnalysis {
  name: string;
  recommendation: string;
  confidence: number;
  reasoning: string;
  key_metrics?: Record<string, unknown>;
  source_data?: Record<string, unknown>;
}

interface ResearchData {
  overall_recommendation: string;
  confidence: number;
  debate_summary: string;
  synthesis: string;
  agents: {
    market_analyst?: AgentAnalysis;
    news_analyst?: AgentAnalysis;
    fundamentals_analyst?: AgentAnalysis;
    social_analyst?: AgentAnalysis;
    risk_manager?: {
      assessment: string;
      reasoning: string;
      position_size: number;
    };
  };
  price_targets?: {
    bull_case: number;
    base_case: number;
    bear_case: number;
  };
}

export default function TradeResearchModal({
  trade,
  isOpen,
  onClose,
}: TradeResearchModalProps) {
  const [loading, setLoading] = useState(false);
  const [research, setResearch] = useState<ResearchData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "agents" | "details"
  >("overview");
  const [executing, setExecuting] = useState(false);
  const [executionError, setExecutionError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && trade.symbol) {
      fetchResearch();
    }
  }, [isOpen, trade.symbol]);

  const fetchResearch = async () => {
    setLoading(true);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";
      const response = await fetch(
        `${apiUrl}/api/analyze-stock/${trade.symbol}`
      );
      if (response.ok) {
        const data = await response.json();
        setResearch(data as ResearchData);
      }
    } catch (error) {
      console.error("Error fetching research:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteTrade = async () => {
    setExecuting(true);
    setExecutionError(null);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";
      const response = await fetch(`${apiUrl}/api/portfolio/positions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: trade.symbol,
          shares: 100, // TODO: Add quantity input
          entry_price: trade.current_price || research?.price_targets?.base_case || trade.entry_price,
          side: trade.side || "long",
          target_price: research?.price_targets?.bull_case || trade.target_price,
          stop_loss: research?.price_targets?.bear_case || trade.stop_loss,
          reasoning: research?.debate_summary || research?.synthesis || trade.reasoning,
          confidence: research?.confidence || trade.confidence,
          strategy: "multi_agent_analysis",
          timeframe: "medium-term",
          risk_level: "medium",
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to execute trade");
      }
      
      const result = await response.json();
      
      if (result.success) {
        // Show success message and close modal
        alert(`Trade executed successfully: ${result.message}`);
        onClose();
      }
    } catch (error) {
      console.error("Trade execution error:", error);
      setExecutionError(error instanceof Error ? error.message : "Failed to execute trade");
    } finally {
      setExecuting(false);
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    const rec = recommendation?.toUpperCase() || "";
    if (rec.includes("BUY") || rec.includes("LONG")) {
      return <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />;
    }
    if (rec.includes("SELL") || rec.includes("SHORT")) {
      return <ArrowTrendingDownIcon className="h-6 w-6 text-red-500" />;
    }
    return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
  };

  const getRecommendationColor = (recommendation: string) => {
    const rec = recommendation?.toUpperCase() || "";
    if (rec.includes("BUY") || rec.includes("LONG")) {
      return "bg-green-50 border-green-200 text-green-800";
    }
    if (rec.includes("SELL") || rec.includes("SHORT")) {
      return "bg-red-50 border-red-200 text-red-800";
    }
    return "bg-yellow-50 border-yellow-200 text-yellow-800";
  };

  const agentIcons: Record<
    string,
    React.ComponentType<{ className?: string }>
  > = {
    market_analyst: ChartBarIcon,
    news_analyst: NewspaperIcon,
    fundamentals_analyst: CalculatorIcon,
    social_analyst: UserGroupIcon,
    risk_manager: ShieldCheckIcon,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-[70] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h2 className="text-3xl font-bold">{trade.symbol}</h2>
                  {trade.side && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        trade.side === "long"
                          ? "bg-green-500/20 text-green-100 border border-green-300"
                          : "bg-red-500/20 text-red-100 border border-red-300"
                      }`}
                    >
                      {trade.side.toUpperCase()}
                    </span>
                  )}
                  {trade.type && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30">
                      {trade.type.toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-blue-100 text-sm">
                  Comprehensive Multi-Agent Research & Analysis
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close Modal"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex space-x-1 p-2">
                {[
                  { id: "overview", label: "Overview", icon: SparklesIcon },
                  { id: "agents", label: "Agent Analysis", icon: ChartBarIcon },
                  { id: "details", label: "Trade Details", icon: CalculatorIcon },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Loading comprehensive research...
                    </p>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "overview" && (
                      <div className="space-y-6">
                        {/* Overall Recommendation */}
                        {research && (
                          <div
                            className={`rounded-xl border-2 p-6 ${getRecommendationColor(
                              research.overall_recommendation
                            )}`}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                {getRecommendationIcon(
                                  research.overall_recommendation
                                )}
                                <div>
                                  <h3 className="text-xl font-bold">
                                    Overall Recommendation
                                  </h3>
                                  <p className="text-2xl font-extrabold mt-1">
                                    {research.overall_recommendation}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm opacity-80 mb-1">
                                  Confidence
                                </p>
                                <p className="text-3xl font-bold">
                                  {(research.confidence * 100).toFixed(0)}%
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Price Targets */}
                        {research?.price_targets && (
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center border-2 border-green-200 dark:border-green-800">
                              <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-2">
                                Bull Case
                              </p>
                              <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                                ${research.price_targets.bull_case.toFixed(2)}
                              </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center border-2 border-blue-200 dark:border-blue-800">
                              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
                                Base Case
                              </p>
                              <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                                ${research.price_targets.base_case.toFixed(2)}
                              </p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center border-2 border-red-200 dark:border-red-800">
                              <p className="text-sm text-red-700 dark:text-red-300 font-medium mb-2">
                                Bear Case
                              </p>
                              <p className="text-3xl font-bold text-red-800 dark:text-red-200">
                                ${research.price_targets.bear_case.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Investment Thesis */}
                        {research && (
                          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                              <SparklesIcon className="h-6 w-6 mr-2 text-blue-600" />
                              Investment Thesis
                            </h3>
                            <div className="prose dark:prose-invert max-w-none">
                              <StreamingMarkdown
                                content={
                                  research.debate_summary || research.synthesis
                                }
                              />
                            </div>
                          </div>
                        )}

                        {/* Current Trade Performance */}
                        {trade.pnl !== undefined && (
                          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                              Current Performance
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                  P&L
                                </p>
                                <p
                                  className={`text-2xl font-bold ${
                                    trade.pnl >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {trade.pnl >= 0 ? "+" : ""}$
                                  {trade.pnl.toFixed(2)}
                                </p>
                              </div>
                              {trade.pnl_percentage !== undefined && (
                                <div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Return
                                  </p>
                                  <p
                                    className={`text-2xl font-bold ${
                                      trade.pnl_percentage >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {trade.pnl_percentage >= 0 ? "+" : ""}
                                    {trade.pnl_percentage.toFixed(2)}%
                                  </p>
                                </div>
                              )}
                              {trade.entry_price !== undefined && (
                                <div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Entry
                                  </p>
                                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    ${trade.entry_price.toFixed(2)}
                                  </p>
                                </div>
                              )}
                              {trade.current_price !== undefined && (
                                <div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Current
                                  </p>
                                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    ${trade.current_price.toFixed(2)}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "agents" && (
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <CheckCircleIcon className="h-5 w-5 inline mr-2" />
                            Multi-agent analysis combining market data, news
                            sentiment, fundamentals, and risk assessment
                          </p>
                        </div>

                        {research?.agents &&
                          Object.entries(research.agents).map(
                            ([agentKey, agentData]) => {
                              if (!agentData) return null;
                              const Icon =
                                agentIcons[agentKey] || ChartBarIcon;
                              const agentName = agentKey
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ");

                              return (
                                <div
                                  key={agentKey}
                                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6"
                                >
                                  <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                          {agentName}
                                        </h3>
                                        {"recommendation" in agentData && (
                                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            {String(agentData.recommendation)}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    {"confidence" in agentData && (
                                      <div className="text-right">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                          Confidence
                                        </p>
                                        <p className="text-xl font-bold text-blue-600">
                                          {(
                                            Number(agentData.confidence) * 100
                                          ).toFixed(0)}
                                          %
                                        </p>
                                      </div>
                                    )}
                                    {"position_size" in agentData && (
                                      <div className="text-right">
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                          Position Size
                                        </p>
                                        <p className="text-xl font-bold text-blue-600">
                                          {(
                                            Number(agentData.position_size) * 100
                                          ).toFixed(0)}
                                          %
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  <div className="prose dark:prose-invert max-w-none">
                                    <StreamingMarkdown
                                      content={String(
                                        agentData.reasoning || ""
                                      )}
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )}

                        {(!research || !research.agents) && (
                          <div className="text-center py-12 text-gray-500">
                            <ChartBarIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                            <p>No agent analysis available</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "details" && (
                      <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Trade Parameters
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(trade).map(([key, value]) => {
                              if (
                                key === "id" ||
                                value === null ||
                                value === undefined
                              )
                                return null;
                              return (
                                <div key={key}>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 capitalize">
                                    {key.replace(/_/g, " ")}
                                  </p>
                                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                    {typeof value === "number"
                                      ? value.toFixed(2)
                                      : String(value)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {trade.reasoning && (
                          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                              Original Reasoning
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              {trade.reasoning}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer Actions */}
            {executionError && (
              <div className="mx-6 mb-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                  ❌ {executionError}
                </p>
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
              <div className="flex space-x-3">
                <button 
                  onClick={handleExecuteTrade}
                  disabled={executing}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {executing ? "Executing..." : "Execute Trade"}
                </button>
                <button className="flex-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  Update Alert
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

