"use client";

/**
 * StreamingProgress Component
 * Visual indicator for streaming multi-agent analysis
 */

import { CheckCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

interface StreamingProgressProps {
  progress: number;
  currentAgent: string | null;
  agents?: string[];
}

const DEFAULT_AGENTS = [
  { name: "Market Analyst", color: "blue" },
  { name: "Social Analyst", color: "green" },
  { name: "News Analyst", color: "purple" },
  { name: "Fundamentals Analyst", color: "orange" },
];

const COLOR_MAP: Record<
  string,
  { bg: string; text: string; progress: string }
> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    progress: "bg-blue-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    progress: "bg-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    progress: "bg-purple-600",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    progress: "bg-orange-600",
  },
};

export default function StreamingProgress({
  progress,
  currentAgent,
  agents = DEFAULT_AGENTS.map((a) => a.name),
}: StreamingProgressProps) {
  const agentConfigs = DEFAULT_AGENTS.slice(0, agents.length);

  const getAgentStatus = (
    agentName: string
  ): "pending" | "active" | "complete" => {
    const currentIndex = agents.indexOf(currentAgent || "");
    const agentIndex = agents.indexOf(agentName);

    if (agentIndex < currentIndex || progress >= 100) return "complete";
    if (agentIndex === currentIndex) return "active";
    return "pending";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            Multi-Agent Analysis in Progress
          </p>
          <p className="text-sm text-gray-600">
            {currentAgent ? `${currentAgent} analyzing...` : "Starting..."}
          </p>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span className="font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Agent List */}
      <div className="space-y-3">
        {agentConfigs.map((agent, index) => {
          const agentName = agents[index] || agent.name;
          const status = getAgentStatus(agentName);
          const colors = COLOR_MAP[agent.color];

          return (
            <div
              key={agentName}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                status === "active" ? colors.bg : "bg-gray-50"
              }`}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {status === "complete" ? (
                  <CheckCircleIcon className={`h-6 w-6 ${colors.text}`} />
                ) : status === "active" ? (
                  <ArrowPathIcon
                    className={`h-6 w-6 ${colors.text} animate-spin`}
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>
                )}
              </div>

              {/* Agent Name */}
              <span
                className={`flex-1 font-medium ${
                  status === "active" ? colors.text : "text-gray-600"
                }`}
              >
                {agentName}
              </span>

              {/* Progress Indicator */}
              {status === "active" && (
                <div className="flex-shrink-0 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div
                      className={`h-2 w-2 ${colors.progress} rounded-full animate-pulse`}
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className={`h-2 w-2 ${colors.progress} rounded-full animate-pulse`}
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className={`h-2 w-2 ${colors.progress} rounded-full animate-pulse`}
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}

              {status === "complete" && (
                <span className="flex-shrink-0 text-xs text-gray-500">
                  ✓ Complete
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>This typically takes 30-60 seconds</p>
        <p className="mt-1">
          Results will appear progressively as each agent completes
        </p>
      </div>
    </div>
  );
}

/**
 * Compact version for smaller spaces
 */
export function StreamingProgressCompact({
  progress,
  currentAgent,
}: {
  progress: number;
  currentAgent: string | null;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-3 mb-3">
        <ArrowPathIcon className="h-5 w-5 text-blue-600 animate-spin" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Analyzing...</p>
          <p className="text-xs text-gray-500">{currentAgent || "Starting"}</p>
        </div>
        <span className="text-sm font-semibold text-gray-600">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
