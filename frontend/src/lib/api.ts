/**
 * API Service for True North Trading Platform
 *
 * Connects Next.js frontend to Python FastAPI backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";

// Types
export interface MarketRegime {
  regime: string;
  trend: string;
  sentiment: string;
  strategy: string;
  confidence: number;
}

export interface Opportunity {
  symbol: string;
  title: string;
  score: number;
  reasoning: string;
  entry_price?: number;
  target_price?: number;
  stop_loss?: number;
  timeframe: string;
  risk_level: string;
}

export interface TraderSignal {
  id: string;
  trader_name: string;
  symbol: string;
  action: string;
  confidence: number;
  entry_price?: number;
  time: string;
  platform: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: string;
  timestamp: string;
  symbol?: string;
}

export interface PortfolioMetrics {
  total_value: number;
  daily_pnl: number;
  daily_pnl_percent: number;
  active_positions: number;
  win_rate: number;
  total_trades: number;
}

export interface Trader {
  id: string;
  name: string;
  username: string;
  platform: string;
  verified: boolean;
  followers: number;
  win_rate: number;
  total_trades: number;
  strategy: string;
}

// API Client Class
class TradingAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Market Data
  async getMarketRegime(): Promise<MarketRegime> {
    return this.request<MarketRegime>("/api/market-regime");
  }

  async getOpportunities(): Promise<Opportunity[]> {
    return this.request<Opportunity[]>("/api/opportunities");
  }

  async runDiscovery(): Promise<{
    status: string;
    message: string;
    count: number;
  }> {
    return this.request("/api/run-discovery", { method: "POST" });
  }

  // Trading Signals
  async getTraderSignals(): Promise<TraderSignal[]> {
    return this.request<TraderSignal[]>("/api/trader-signals");
  }

  async getFollowedTraders(): Promise<Trader[]> {
    return this.request<Trader[]>("/api/traders");
  }

  // Alerts & Monitoring
  async getAlerts(): Promise<Alert[]> {
    return this.request<Alert[]>("/api/alerts");
  }

  // Portfolio
  async getPortfolioMetrics(): Promise<PortfolioMetrics> {
    return this.request<PortfolioMetrics>("/api/portfolio-metrics");
  }

  // Health Check
  async healthCheck(): Promise<{ message: string; status: string }> {
    return this.request("/");
  }
}

// Export singleton instance
export const api = new TradingAPI();

// React Hooks for data fetching
export const useMarketRegime = () => {
  const [data, setData] = useState<MarketRegime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await api.getMarketRegime();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, refetch: () => fetchData() };
};

// Add React imports for hooks
import { useState, useEffect } from "react";

export const useOpportunities = () => {
  const [data, setData] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await api.getOpportunities();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export const useTraderSignals = () => {
  const [data, setData] = useState<TraderSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await api.getTraderSignals();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export const usePortfolioMetrics = () => {
  const [data, setData] = useState<PortfolioMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await api.getPortfolioMetrics();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
