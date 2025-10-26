"use client";

import React, { useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import StreamingMarkdown from "./StreamingMarkdown";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface StreamingAnalysisDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  symbol: string;
  isStreaming: boolean;
  progress: number;
  currentAgent: string;
  agentTexts: Record<string, string>;
  finalData: Record<string, unknown> | null;
}

export default function StreamingAnalysisDrawer({
  open,
  onOpenChange,
  symbol,
  isStreaming,
  progress,
  currentAgent,
  agentTexts,
  finalData,
}: StreamingAnalysisDrawerProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper functions to safely extract values from finalData
  const getString = (key: string, fallback = ""): string => {
    if (!finalData) return fallback;
    const value = finalData[key];
    return typeof value === "string" ? value : fallback;
  };

  const getNumber = (key: string, fallback = 0): number => {
    if (!finalData) return fallback;
    const value = finalData[key];
    return typeof value === "number" ? value : fallback;
  };

  const getNestedNumber = (
    parent: string,
    child: string,
    fallback = 0
  ): number => {
    if (!finalData) return fallback;
    const parentValue = finalData[parent];
    if (
      typeof parentValue === "object" &&
      parentValue !== null &&
      child in parentValue
    ) {
      const value = (parentValue as Record<string, unknown>)[child];
      return typeof value === "number" ? value : fallback;
    }
    return fallback;
  };

  const hasNested = (parent: string): boolean => {
    if (!finalData) return false;
    const value = finalData[parent];
    return typeof value === "object" && value !== null;
  };

  // Auto-scroll to bottom as content streams in
  useEffect(() => {
    if (isStreaming && contentRef.current) {
      // Smooth scroll to the bottom of the content
      contentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [agentTexts, isStreaming]);

  // Scroll to top when drawer opens with new analysis
  useEffect(() => {
    if (open && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [open, symbol]);
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation?.toUpperCase()) {
      case "BUY":
        return "text-green-600 bg-green-50 border-green-200";
      case "SELL":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        ref={scrollContainerRef}
        side="right"
        className="w-full sm:max-w-4xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <span>📊 {symbol} - Multi-Agent Analysis</span>
            {isStreaming && (
              <ArrowPathIcon className="h-5 w-5 text-blue-600 animate-spin" />
            )}
          </SheetTitle>
          <SheetDescription>
            Real-time AI analysis from multiple specialized trading agents
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6" ref={contentRef}>
          {/* Progress Bar */}
          {isStreaming && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentAgent}
                </p>
                <p className="text-sm text-gray-500">{progress.toFixed(0)}%</p>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Agent Analyses - Streaming */}
          {Object.entries(agentTexts).map(([agent, text]) => (
            <div
              key={agent}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  {agent}
                  {!isStreaming && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                </h3>
                {isStreaming && currentAgent.includes(agent) && (
                  <span className="text-xs text-blue-600 font-medium">
                    Writing...
                  </span>
                )}
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <StreamingMarkdown content={text || "Analyzing..."} />
                {text && isStreaming && currentAgent.includes(agent) && (
                  <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1" />
                )}
              </div>
            </div>
          ))}

          {/* Final Results */}
          {finalData && !isStreaming && (
            <div className="space-y-6">
              {/* Overall Recommendation */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                    Analysis Complete
                  </h3>
                </div>

                <div
                  className={`p-4 rounded-lg border-l-4 mb-4 ${getRecommendationColor(
                    getString("overall_recommendation") ||
                      getString("recommendation")
                  )}`}
                >
                  <h4 className="text-lg font-semibold mb-2">
                    Recommendation:{" "}
                    {getString("overall_recommendation") ||
                      getString("recommendation")}
                  </h4>
                  <p className="text-sm">
                    Confidence:{" "}
                    <span className="font-bold">
                      {(getNumber("confidence", 0) * 100).toFixed(1)}%
                    </span>
                  </p>
                  <p className="text-sm">
                    Target: ${getNumber("target_price", 0).toFixed(2)} | Stop
                    Loss: ${getNumber("stop_loss", 0).toFixed(2)}
                  </p>
                </div>

                {/* Price Targets */}
                {hasNested("price_targets") && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-xs text-green-700 dark:text-green-300 font-medium mb-1">
                        Bull Case
                      </p>
                      <p className="text-xl font-bold text-green-800 dark:text-green-200">
                        $
                        {getNestedNumber(
                          "price_targets",
                          "bull_case",
                          0
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
                        Base Case
                      </p>
                      <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                        $
                        {getNestedNumber(
                          "price_targets",
                          "base_case",
                          0
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                      <p className="text-xs text-red-700 dark:text-red-300 font-medium mb-1">
                        Bear Case
                      </p>
                      <p className="text-xl font-bold text-red-800 dark:text-red-200">
                        $
                        {getNestedNumber(
                          "price_targets",
                          "bear_case",
                          0
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Investment Thesis */}
              {(getString("debate_summary") || getString("synthesis")) && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    📝 Investment Thesis
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <StreamingMarkdown
                      content={
                        getString("debate_summary") || getString("synthesis")
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!isStreaming &&
            Object.keys(agentTexts).length === 0 &&
            !finalData && (
              <div className="text-center py-12 text-gray-500">
                <p>No analysis data available.</p>
              </div>
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
