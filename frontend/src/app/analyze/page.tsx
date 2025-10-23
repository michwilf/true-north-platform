"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  UserGroupIcon,
  NewspaperIcon,
  CalculatorIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useStockAnalysisStreamText } from "@/lib/useStreamingAnalysis";
import StreamingMarkdown from "@/components/StreamingMarkdown";
import StreamingProgress from "@/components/StreamingProgress";

const agentIcons: Record<string, any> = {
  "Market Analyst": ChartBarIcon,
  "Social Analyst": UserGroupIcon,
  "News Analyst": NewspaperIcon,
  "Fundamentals Analyst": CalculatorIcon,
  "Investment Synthesizer": SparklesIcon,
};

const agentColors: Record<string, string> = {
  "Market Analyst": "border-blue-500 bg-blue-50",
  "Social Analyst": "border-green-500 bg-green-50",
  "News Analyst": "border-purple-500 bg-purple-50",
  "Fundamentals Analyst": "border-orange-500 bg-orange-50",
  "Investment Synthesizer": "border-indigo-500 bg-indigo-50",
};

export default function StockAnalysisPage() {
  const [inputSymbol, setInputSymbol] = useState("");
  const [symbol, setSymbol] = useState<string | null>(null);

  const {
    isStreaming,
    progress,
    currentAgent,
    agentTexts,
    synthesisText,
    finalData,
    error,
  } = useStockAnalysisStreamText(symbol);

  const startAnalysis = () => {
    if (!inputSymbol.trim()) return;
    setSymbol(inputSymbol.toUpperCase());
  };

  const getRecommendationStyle = (rec: string) => {
    switch (rec?.toUpperCase()) {
      case "BUY":
      case "STRONG_BUY":
        return "bg-green-500 text-white";
      case "SELL":
      case "STRONG_SELL":
        return "bg-red-500 text-white";
      case "HOLD":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 Multi-Agent Stock Analysis
          </h1>
          <p className="text-gray-600 text-lg">
            Watch AI agents analyze stocks in real-time with streaming text
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={inputSymbol}
                onChange={(e) => setInputSymbol(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === "Enter" && startAnalysis()}
                placeholder="Enter stock symbol (e.g., AAPL, MSFT, GOOGL)"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
                disabled={isStreaming}
              />
            </div>
            <button
              onClick={startAnalysis}
              disabled={isStreaming || !inputSymbol.trim()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {isStreaming ? (
                <div className="flex items-center gap-2">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {isStreaming && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <StreamingProgress
              progress={progress}
              currentAgent={currentAgent}
              agents={Object.keys(agentTexts)}
            />
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8"
          >
            <p className="text-red-600 font-medium">❌ {error}</p>
          </motion.div>
        )}

        {/* Agent Analysis Cards - Streaming */}
        {Object.keys(agentTexts).length > 0 && (
          <div className="space-y-6 mb-8">
            {Object.entries(agentTexts).map(([agentName, data], index) => {
              const Icon = agentIcons[agentName] || ChartBarIcon;
              const colorClass = agentColors[agentName] || "border-gray-500 bg-gray-50";

              return (
                <motion.div
                  key={agentName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg border-l-4 ${colorClass} overflow-hidden`}
                >
                  <div className="p-6">
                    {/* Agent Header */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {agentName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {data.isComplete ? "Analysis complete" : "Analyzing..."}
                          </p>
                        </div>
                      </div>
                      {data.isComplete && (
                        <CheckCircleIcon className="h-8 w-8 text-green-500" />
                      )}
                    </div>

                    {/* Streaming Text with Markdown */}
                    <StreamingMarkdown
                      content={data.text}
                      isStreaming={!data.isComplete}
                      className="min-h-[100px]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Synthesis Section */}
        {synthesisText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg border-2 border-indigo-300 p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <SparklesIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-indigo-900">
                  Investment Synthesis
                </h2>
                <p className="text-indigo-600">
                  Final recommendation based on all agent analyses
                </p>
              </div>
            </div>

            <StreamingMarkdown
              content={synthesisText}
              isStreaming={isStreaming && currentAgent === "Synthesis"}
              className="bg-white rounded-xl p-6"
            />
          </motion.div>
        )}

        {/* Final Results */}
        {finalData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl shadow-2xl p-8 ${getRecommendationStyle(
              finalData.recommendation
            )}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Final Recommendation: {finalData.recommendation}
                </h2>
                <p className="text-xl opacity-90">
                  Confidence: {(finalData.confidence * 100).toFixed(1)}%
                </p>
              </div>
              <CheckCircleIcon className="h-16 w-16" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                <p className="text-sm opacity-90 mb-1">Current Price</p>
                <p className="text-2xl font-bold">
                  ${finalData.current_price?.toFixed(2) || "N/A"}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                <p className="text-sm opacity-90 mb-1">Target Price</p>
                <p className="text-2xl font-bold">
                  ${finalData.target_price?.toFixed(2)}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                <p className="text-sm opacity-90 mb-1">Stop Loss</p>
                <p className="text-2xl font-bold">
                  ${finalData.stop_loss?.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!isStreaming && !finalData && !error && symbol === null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <ChartBarIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              Enter a stock symbol to begin analysis
            </h3>
            <p className="text-gray-500">
              Watch 4 AI agents analyze stocks with streaming text in real-time
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
