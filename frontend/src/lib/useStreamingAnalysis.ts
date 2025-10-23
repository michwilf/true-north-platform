/**
 * React hook for consuming Server-Sent Events (SSE) from backend streaming endpoints
 */

import { useState, useEffect, useCallback } from "react";

interface StreamEvent {
  event: string;
  agent?: string;
  chunk?: string;
  progress?: number;
  [key: string]: any;
}

interface AgentText {
  agent: string;
  text: string;
  isComplete: boolean;
}

interface UseStreamingOptions {
  onEvent?: (event: StreamEvent) => void;
  onComplete?: (finalData: any) => void;
  onError?: (error: string) => void;
}

export function useStreamingAnalysis(
  url: string | null,
  options: UseStreamingOptions = {}
) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [finalData, setFinalData] = useState<any>(null);
  const [agentTexts, setAgentTexts] = useState<Record<string, AgentText>>({});
  const [synthesisText, setSynthesisText] = useState<string>("");

  useEffect(() => {
    if (!url) return;

    let eventSource: EventSource | null = null;

    const startStream = () => {
      setIsStreaming(true);
      setProgress(0);
      setCurrentAgent(null);
      setEvents([]);
      setError(null);
      setFinalData(null);
      setAgentTexts({});
      setSynthesisText("");

      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"
      }${url}`;
      eventSource = new EventSource(apiUrl);

      eventSource.onmessage = (event) => {
        try {
          const data: StreamEvent = JSON.parse(event.data);

          // Update events list
          setEvents((prev) => [...prev, data]);

          // Call custom event handler
          options.onEvent?.(data);

          // Handle specific event types
          switch (data.event) {
            case "start":
              setProgress(0);
              setCurrentAgent(null);
              break;

            case "agent_start":
              setCurrentAgent(data.agent);
              setProgress(data.progress || 0);
              break;

            case "agent_text_start":
              if (data.agent) {
                setAgentTexts((prev) => ({
                  ...prev,
                  [data.agent!]: { agent: data.agent!, text: "", isComplete: false },
                }));
              }
              break;

            case "agent_text_chunk":
              if (data.agent && data.chunk) {
                setAgentTexts((prev) => ({
                  ...prev,
                  [data.agent!]: {
                    agent: data.agent!,
                    text: (prev[data.agent!]?.text || "") + data.chunk,
                    isComplete: false,
                  },
                }));
                
                // If it's synthesis, also update synthesis text
                if (data.agent === "Investment Synthesizer") {
                  setSynthesisText((prev) => prev + data.chunk);
                }
              }
              break;

            case "agent_text_complete":
              if (data.agent) {
                setAgentTexts((prev) => ({
                  ...prev,
                  [data.agent!]: {
                    ...prev[data.agent!],
                    isComplete: true,
                  },
                }));
              }
              break;

            case "agent_complete":
              setProgress(data.progress || 0);
              break;

            case "synthesis_start":
              setCurrentAgent("Synthesis");
              setProgress(90);
              setSynthesisText("");
              break;

            case "done":
              setProgress(100);
              setFinalData(data);
              setIsStreaming(false);
              options.onComplete?.(data);
              eventSource?.close();
              break;

            case "error":
              setError(data.message || "Unknown error occurred");
              setIsStreaming(false);
              options.onError?.(data.message || "Unknown error");
              eventSource?.close();
              break;
          }
        } catch (err) {
          console.error("Error parsing SSE event:", err);
        }
      };

      eventSource.onerror = (err) => {
        console.error("EventSource error:", err);
        setError("Connection error. Please try again.");
        setIsStreaming(false);
        options.onError?.("Connection error");
        eventSource?.close();
      };
    };

    startStream();

    // Cleanup
    return () => {
      eventSource?.close();
      setIsStreaming(false);
    };
  }, [url]);

  const reset = useCallback(() => {
    setIsStreaming(false);
    setProgress(0);
    setCurrentAgent(null);
    setEvents([]);
    setError(null);
    setFinalData(null);
    setAgentTexts({});
    setSynthesisText("");
  }, []);

  return {
    isStreaming,
    progress,
    currentAgent,
    events,
    error,
    finalData,
    agentTexts,
    synthesisText,
    reset,
  };
}

/**
 * Hook for streaming stock analysis (progress only)
 */
export function useStockAnalysisStream(symbol: string | null) {
  const url = symbol ? `/api/analyze-stock-stream/${symbol}` : null;
  return useStreamingAnalysis(url);
}

/**
 * Hook for streaming stock analysis WITH TEXT (like ChatGPT)
 */
export function useStockAnalysisStreamText(symbol: string | null) {
  const url = symbol ? `/api/analyze-stock-stream-text/${symbol}` : null;
  return useStreamingAnalysis(url);
}

/**
 * Hook for streaming market regime analysis
 */
export function useMarketRegimeStream(trigger: boolean) {
  const url = trigger ? "/api/market-regime-stream" : null;
  return useStreamingAnalysis(url);
}

/**
 * Hook for streaming portfolio analysis
 */
export function usePortfolioAnalysisStream(trigger: boolean) {
  const url = trigger ? "/api/portfolio-analysis-stream" : null;
  return useStreamingAnalysis(url);
}
