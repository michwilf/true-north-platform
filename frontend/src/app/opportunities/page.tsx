"use client";

import { useState } from "react";
import { useOpportunities } from "@/lib/api";
import {
  FunnelIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import StreamingAnalysisDrawer from "@/components/StreamingAnalysisDrawer";
import AIAnalysisButton, {
  InlineAIButton,
} from "@/components/AIAnalysisButton";
import { startContextualAnalysis } from "@/lib/contextualAnalysis";

interface StockAnalysis {
  symbol: string;
  analysis_timestamp: string;
  overall_recommendation: string;
  confidence: number;
  target_price: number;
  stop_loss: number;
  agents: {
    market_analyst: {
      recommendation: string;
      confidence: number;
      reasoning: string;
      key_metrics?: Record<string, unknown>;
      source_data?: Record<string, unknown>;
    };
    news_analyst: {
      recommendation: string;
      confidence: number;
      reasoning: string;
      sentiment_score?: number;
      news_count?: number;
      key_headlines?: string[];
      source_data?: Record<string, unknown>;
    };
    fundamentals_analyst: {
      recommendation: string;
      confidence: number;
      reasoning: string;
      key_metrics?: Record<string, unknown>;
      source_data?: Record<string, unknown>;
    };
    risk_manager: {
      assessment: string;
      position_size: number;
      reasoning: string;
      risk_factors?: string[];
      source_data?: Record<string, unknown>;
    };
  };
  debate_summary: string;
  price_targets: {
    bull_case: number;
    base_case: number;
    bear_case: number;
  };
  evidence_summary?: {
    total_data_points: number;
    sources_consulted: string[];
    data_freshness: string;
  };
}

export default function OpportunitiesPage() {
  const { data: opportunities, loading, error, refetch } = useOpportunities();
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("score");
  const [analysisData, setAnalysisData] = useState<
    Record<string, StockAnalysis>
  >({});
  const [loadingAnalysis, setLoadingAnalysis] = useState<
    Record<string, boolean>
  >({});
  const [analysisProgress, setAnalysisProgress] = useState<
    Record<string, { currentAgent: string; progress: number }>
  >({});
  const [agentTexts, setAgentTexts] = useState<
    Record<string, Record<string, string>> // { symbol: { agent: text } }
  >({});
  const [_expandedSources, _setExpandedSources] = useState<
    Record<string, string | null>
  >({}); // { symbol: 'market_analyst' | 'news_analyst' | etc }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSymbol, setDrawerSymbol] = useState<string | null>(null);

  const filteredOpportunities = opportunities
    ?.filter((opp) => {
      if (filter === "all") return true;
      return opp.risk_level.toLowerCase() === filter;
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "symbol") return a.symbol.localeCompare(b.symbol);
      return 0;
    });

  const getRiskBadgeColor = (risk: string) => {
    switch (risk.toLowerCase()) {
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

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const loadDetailedAnalysis = async (
    symbol: string,
    opportunityData?: unknown
  ) => {
    // Open drawer
    setDrawerSymbol(symbol);
    setDrawerOpen(true);

    if (analysisData[symbol]) {
      // Already loaded, just show it in drawer
      return;
    }

    // Initialize states
    setLoadingAnalysis({ ...loadingAnalysis, [symbol]: true });
    setAnalysisProgress({
      ...analysisProgress,
      [symbol]: { currentAgent: "Starting...", progress: 0 },
    });
    setAgentTexts((prev) => ({ ...prev, [symbol]: {} }));

    try {
      console.log(`[${symbol}] 🎯 Starting context-aware analysis...`);

      // 🎯 BUILD CONTEXT OBJECT with opportunity data
      const context = {
        type: "opportunity" as const,
        symbol: symbol,
        page: "opportunities",
        panel: "opportunity-card",
        data: opportunityData
          ? {
              risk_level: (opportunityData as Record<string, unknown>)
                .risk_level,
              score: (opportunityData as Record<string, unknown>).score,
              timeframe: (opportunityData as Record<string, unknown>).timeframe,
              title: (opportunityData as Record<string, unknown>).title,
              reasoning: (opportunityData as Record<string, unknown>).reasoning,
            }
          : undefined,
      };

      // Start contextual analysis with callbacks
      await startContextualAnalysis(context, {
        onAgentStart: (agent, progress) => {
          console.log(`[${symbol}] 🤖 ${agent} starting (${progress}%)`);
          setAnalysisProgress((prev) => ({
            ...prev,
            [symbol]: {
              currentAgent: `Running ${agent}...`,
              progress,
            },
          }));
        },

        onAgentTextChunk: (agent, chunk) => {
          setAgentTexts((prev) => ({
            ...prev,
            [symbol]: {
              ...prev[symbol],
              [agent]: (prev[symbol]?.[agent] || "") + chunk,
            },
          }));
        },

        onAgentComplete: (agent, progress) => {
          console.log(`[${symbol}] ✅ ${agent} complete (${progress}%)`);
          setAnalysisProgress((prev) => ({
            ...prev,
            [symbol]: {
              currentAgent: `✓ ${agent} complete`,
              progress,
            },
          }));
        },

        onSynthesisStart: () => {
          console.log(`[${symbol}] 🔬 Synthesizing results...`);
          setAnalysisProgress((prev) => ({
            ...prev,
            [symbol]: {
              currentAgent: "Synthesizing results...",
              progress: 90,
            },
          }));
        },

        onDone: (data) => {
          console.log(`[${symbol}] 🎉 Analysis complete!`, data);
          setAnalysisData((prev) => ({
            ...prev,
            [symbol]: data as unknown as StockAnalysis,
          }));
          setLoadingAnalysis((prev) => ({ ...prev, [symbol]: false }));
          setAnalysisProgress((prev) => ({
            ...prev,
            [symbol]: { currentAgent: "Complete!", progress: 100 },
          }));
        },

        onError: (error) => {
          console.error(`[${symbol}] ❌ Analysis error:`, error);
          setLoadingAnalysis((prev) => ({ ...prev, [symbol]: false }));
          setAnalysisProgress((prev) => ({
            ...prev,
            [symbol]: { currentAgent: "Error occurred", progress: 0 },
          }));
        },
      });
    } catch (error) {
      console.error(`[${symbol}] Failed to start analysis:`, error);
      setLoadingAnalysis((prev) => ({ ...prev, [symbol]: false }));
      setAnalysisProgress((prev) => ({
        ...prev,
        [symbol]: { currentAgent: "Error occurred", progress: 0 },
      }));
    }
  };

  const _toggleSourceEvidence = (symbol: string, agentType: string) => {
    _setExpandedSources((prev) => ({
      ...prev,
      [symbol]: prev[symbol] === agentType ? null : agentType,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Trading Opportunities
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                AI-discovered investment opportunities with detailed analysis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AIAnalysisButton
                context={{
                  type: "opportunity",
                  page: "opportunities",
                  panel: "page-overview",
                  data: {
                    totalOpportunities: filteredOpportunities?.length || 0,
                    topOpportunity: filteredOpportunities?.[0]?.symbol,
                  },
                }}
                onAnalyze={() => {
                  // Analyze the top-rated opportunity for a page-level overview
                  if (
                    filteredOpportunities &&
                    filteredOpportunities.length > 0
                  ) {
                    loadDetailedAnalysis(
                      filteredOpportunities[0].symbol,
                      filteredOpportunities[0] as unknown as Record<
                        string,
                        unknown
                      >
                    );
                  }
                }}
                variant="secondary"
                size="md"
                isAnalyzing={false}
              />
              <button
                onClick={() => refetch()}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowPathIcon
                  className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Discovering..." : "Run Discovery"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <div className="flex space-x-2">
                {["all", "low", "medium", "high"].map((riskLevel) => (
                  <button
                    key={riskLevel}
                    onClick={() => setFilter(riskLevel)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      filter === riskLevel
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}{" "}
                    Risk
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="score">Score</option>
                <option value="symbol">Symbol</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading && !opportunities ? (
          <div className="flex justify-center items-center py-12">
            <ArrowPathIcon className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600">
              Discovering opportunities...
            </span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <p className="text-red-800 font-medium">
              Failed to load opportunities
            </p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        ) : filteredOpportunities && filteredOpportunities.length > 0 ? (
          <div className="space-y-4">
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  {/* Left side - Symbol and Title */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {opportunity.symbol}
                      </h3>
                      <InlineAIButton
                        onAnalyze={() =>
                          loadDetailedAnalysis(opportunity.symbol, opportunity)
                        }
                        isAnalyzing={loadingAnalysis[opportunity.symbol]}
                      />
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(
                          opportunity.risk_level
                        )}`}
                      >
                        {opportunity.risk_level.toUpperCase()} RISK
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {opportunity.timeframe.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-3">
                      {opportunity.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {opportunity.reasoning}
                    </p>

                    {/* Price Targets */}
                    {(opportunity.entry_price ||
                      opportunity.target_price ||
                      opportunity.stop_loss) && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {opportunity.entry_price && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-blue-600 font-medium mb-1">
                              Entry Price
                            </p>
                            <p className="text-lg font-bold text-blue-900">
                              ${opportunity.entry_price.toFixed(2)}
                            </p>
                          </div>
                        )}
                        {opportunity.target_price && (
                          <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-xs text-green-600 font-medium mb-1">
                              Target Price
                            </p>
                            <p className="text-lg font-bold text-green-900">
                              ${opportunity.target_price.toFixed(2)}
                            </p>
                            {opportunity.entry_price && (
                              <p className="text-xs text-green-600 mt-1">
                                +
                                {(
                                  ((opportunity.target_price -
                                    opportunity.entry_price) /
                                    opportunity.entry_price) *
                                  100
                                ).toFixed(1)}
                                %
                              </p>
                            )}
                          </div>
                        )}
                        {opportunity.stop_loss && (
                          <div className="bg-red-50 rounded-lg p-3">
                            <p className="text-xs text-red-600 font-medium mb-1">
                              Stop Loss
                            </p>
                            <p className="text-lg font-bold text-red-900">
                              ${opportunity.stop_loss.toFixed(2)}
                            </p>
                            {opportunity.entry_price && (
                              <p className="text-xs text-red-600 mt-1">
                                -
                                {(
                                  ((opportunity.entry_price -
                                    opportunity.stop_loss) /
                                    opportunity.entry_price) *
                                  100
                                ).toFixed(1)}
                                %
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right side - Score */}
                  <div className="ml-6 flex flex-col items-center">
                    <ChartBarIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">
                        Confidence Score
                      </p>
                      <p
                        className={`text-4xl font-bold ${getScoreColor(
                          opportunity.score
                        )}`}
                      >
                        {opportunity.score.toFixed(1)}
                      </p>
                      <p className="text-xs text-gray-500">/10</p>
                    </div>
                  </div>
                </div>

                {/* Expand Button - Now Opens Drawer */}
                {/* Disabled as drawer handles analysis now */}
                {/*
                <button
                  onClick={() =>
                    loadDetailedAnalysis(opportunity.symbol, opportunity)
                  }
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                      <SparklesIcon className="h-5 w-5 mr-2" />
                      Show Full Multi-Agent Research
                </button>
                */}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">
              No opportunities found matching your filters
            </p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Streaming Analysis Drawer */}
      {drawerSymbol && (
        <StreamingAnalysisDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          symbol={drawerSymbol}
          isStreaming={loadingAnalysis[drawerSymbol] || false}
          progress={analysisProgress[drawerSymbol]?.progress || 0}
          currentAgent={analysisProgress[drawerSymbol]?.currentAgent || ""}
          agentTexts={agentTexts[drawerSymbol] || {}}
          finalData={
            analysisData[drawerSymbol]
              ? (analysisData[drawerSymbol] as unknown as Record<
                  string,
                  unknown
                >)
              : null
          }
        />
      )}
    </div>
  );
}
