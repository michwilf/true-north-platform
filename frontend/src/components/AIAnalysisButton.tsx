"use client";

import React from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface AIAnalysisButtonProps {
  /** The context for the AI to analyze */
  context: {
    type:
      | "stock"
      | "portfolio"
      | "market"
      | "opportunity"
      | "trader"
      | "sector";
    symbol?: string;
    data?: any;
    label?: string;
  };
  /** Callback when analysis is triggered */
  onAnalyze: () => void;
  /** Button variant */
  variant?: "primary" | "secondary" | "icon";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Custom className */
  className?: string;
  /** Is analysis currently running */
  isAnalyzing?: boolean;
}

export default function AIAnalysisButton({
  context,
  onAnalyze,
  variant = "primary",
  size = "md",
  className = "",
  isAnalyzing = false,
}: AIAnalysisButtonProps) {
  const getButtonLabel = () => {
    if (isAnalyzing) return "Analyzing...";

    switch (context.type) {
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

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs";
      case "lg":
        return "px-6 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  };

  const getVariantClasses = () => {
    const baseClasses =
      "rounded-lg font-medium transition-all duration-200 flex items-center gap-2";

    switch (variant) {
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
    return (
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className={`${getVariantClasses()} ${className}`}
        title={getButtonLabel()}
        aria-label={getButtonLabel()}
      >
        <SparklesIcon
          className={`h-5 w-5 ${
            isAnalyzing ? "animate-spin" : "animate-pulse"
          }`}
        />
      </button>
    );
  }

  return (
    <button
      onClick={onAnalyze}
      disabled={isAnalyzing}
      className={`${getVariantClasses()} ${getSizeClasses()} ${className}`}
    >
      <SparklesIcon
        className={`h-5 w-5 ${isAnalyzing ? "animate-spin" : ""}`}
      />
      <span>{getButtonLabel()}</span>
    </button>
  );
}

/**
 * Floating AI Button - Can be positioned anywhere
 */
export function FloatingAIButton({
  context,
  onAnalyze,
  position = "bottom-right",
  isAnalyzing = false,
}: AIAnalysisButtonProps & {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}) {
  const getPositionClasses = () => {
    switch (position) {
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

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
        title={`AI Analysis${context.symbol ? `: ${context.symbol}` : ""}`}
        aria-label="AI Analysis"
      >
        <SparklesIcon
          className={`h-6 w-6 ${
            isAnalyzing ? "animate-spin" : "group-hover:animate-pulse"
          }`}
        />
        {isAnalyzing && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}

/**
 * Inline AI Button - For inline use within cards/rows
 */
export function InlineAIButton({
  context,
  onAnalyze,
  isAnalyzing = false,
  className = "",
}: Omit<AIAnalysisButtonProps, "variant" | "size">) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent parent click events
        onAnalyze();
      }}
      disabled={isAnalyzing}
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title="AI Analysis"
    >
      <SparklesIcon
        className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`}
      />
      {!isAnalyzing && <span>AI</span>}
    </button>
  );
}
