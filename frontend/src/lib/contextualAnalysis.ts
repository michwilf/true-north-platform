/**
 * Context-Aware AI Analysis Utility
 *
 * Simplifies calling the contextual analysis endpoint from any page.
 * Automatically handles SSE streaming and state updates.
 */

export type ContextType =
  | "stock"
  | "portfolio"
  | "market"
  | "opportunity"
  | "trader"
  | "sector"
  | "alert";

export interface AnalysisContext {
  type: ContextType;
  symbol?: string;
  page?: string;
  panel?: string;
  data?: Record<string, unknown>;
}

export interface StreamCallbacks {
  onAgentStart?: (agent: string, progress: number) => void;
  onAgentTextChunk?: (agent: string, chunk: string) => void;
  onAgentComplete?: (agent: string, progress: number) => void;
  onSynthesisStart?: () => void;
  onDone?: (data: Record<string, unknown>) => void;
  onError?: (error: string) => void;
}

/**
 * Start a context-aware analysis stream
 *
 * @example
 * ```typescript
 * await startContextualAnalysis(
 *   {
 *     type: "market",
 *     symbol: "SPY",
 *     page: "market-regime",
 *     data: regimeData
 *   },
 *   {
 *     onAgentTextChunk: (agent, chunk) => {
 *       setAgentTexts(prev => ({
 *         ...prev,
 *         [agent]: (prev[agent] || "") + chunk
 *       }));
 *     },
 *     onDone: (data) => setFinalData(data),
 *   }
 * );
 * ```
 */
export async function startContextualAnalysis(
  context: AnalysisContext,
  callbacks: StreamCallbacks = {}
): Promise<void> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";

  try {
    const response = await fetch(`${API_URL}/api/analyze-contextual-stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(context),
    });

    if (!response.ok || !response.body) {
      throw new Error(`HTTP ${response.status}: Failed to start analysis`);
    }

    // Read SSE stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));

            // Route events to callbacks
            switch (data.event) {
              case "agent_start":
                callbacks.onAgentStart?.(data.agent, data.progress || 0);
                break;

              case "agent_text_chunk":
                callbacks.onAgentTextChunk?.(data.agent, data.chunk);
                break;

              case "agent_complete":
                callbacks.onAgentComplete?.(data.agent, data.progress || 0);
                break;

              case "synthesis_start":
                callbacks.onSynthesisStart?.();
                break;

              case "done":
                callbacks.onDone?.(data);
                break;

              case "error":
                callbacks.onError?.(data.message || "Unknown error");
                break;
            }
          } catch (err) {
            console.error("Failed to parse SSE event:", err);
          }
        }
      }
    }
  } catch (error: unknown) {
    callbacks.onError?.((error as Error).message || "Analysis failed");
    throw error;
  }
}

/**
 * React hook for context-aware analysis
 *
 * @example
 * ```typescript
 * const { startAnalysis, isAnalyzing, agentTexts, finalData, progress } =
 *   useContextualAnalysis();
 *
 * const handleClick = () => {
 *   startAnalysis({
 *     type: "stock",
 *     symbol: "AAPL",
 *     page: "opportunities"
 *   });
 * };
 * ```
 */
export function useContextualAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentAgent, setCurrentAgent] = React.useState<string>("");
  const [agentTexts, setAgentTexts] = React.useState<Record<string, string>>(
    {}
  );
  const [finalData, setFinalData] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const startAnalysis = React.useCallback(async (context: AnalysisContext) => {
    setIsAnalyzing(true);
    setProgress(0);
    setCurrentAgent("");
    setAgentTexts({});
    setFinalData(null);
    setError(null);

    try {
      await startContextualAnalysis(context, {
        onAgentStart: (agent, prog) => {
          setCurrentAgent(agent);
          setProgress(prog);
        },
        onAgentTextChunk: (agent, chunk) => {
          setAgentTexts((prev) => ({
            ...prev,
            [agent]: (prev[agent] || "") + chunk,
          }));
        },
        onAgentComplete: (agent, prog) => {
          setProgress(prog);
        },
        onSynthesisStart: () => {
          setCurrentAgent("Synthesizing...");
          setProgress(90);
        },
        onDone: (data) => {
          setFinalData(data);
          setIsAnalyzing(false);
          setProgress(100);
          setCurrentAgent("Complete!");
        },
        onError: (errorMsg) => {
          setError(errorMsg);
          setIsAnalyzing(false);
        },
      });
    } catch (err: unknown) {
      setError((err as Error).message);
      setIsAnalyzing(false);
    }
  }, []);

  const reset = React.useCallback(() => {
    setIsAnalyzing(false);
    setProgress(0);
    setCurrentAgent("");
    setAgentTexts({});
    setFinalData(null);
    setError(null);
  }, []);

  return {
    startAnalysis,
    isAnalyzing,
    progress,
    currentAgent,
    agentTexts,
    finalData,
    error,
    reset,
  };
}

// Import React for the hook
import * as React from "react";
