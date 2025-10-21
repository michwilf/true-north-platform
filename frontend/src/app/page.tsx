"use client";

import { useState, useEffect } from "react";
import {
  useMarketRegime,
  useOpportunities,
  useTraderSignals,
  usePortfolioMetrics,
  api,
} from "@/lib/api";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

// Sample data - will be replaced with API calls
const portfolioData = [
  { time: "09:00", value: 100000 },
  { time: "10:00", value: 102000 },
  { time: "11:00", value: 98000 },
  { time: "12:00", value: 105000 },
  { time: "13:00", value: 108000 },
  { time: "14:00", value: 106000 },
  { time: "15:00", value: 112000 },
  { time: "16:00", value: 115000 },
];

const topStocks = [
  { symbol: "AAPL", price: 175.43, change: 2.34, changePercent: 1.35 },
  { symbol: "TSLA", price: 248.5, change: -5.2, changePercent: -2.05 },
  { symbol: "NVDA", price: 875.28, change: 12.45, changePercent: 1.44 },
  { symbol: "MSFT", price: 378.85, change: 4.12, changePercent: 1.1 },
];

const recentSignals = [
  {
    id: 1,
    trader: "Market Wizard",
    symbol: "AAPL",
    action: "LONG",
    confidence: 85,
    time: "2 min ago",
  },
  {
    id: 2,
    trader: "Crypto King",
    symbol: "TSLA",
    action: "SHORT",
    confidence: 72,
    time: "5 min ago",
  },
  {
    id: 3,
    trader: "Value Hunter",
    symbol: "NVDA",
    action: "LONG",
    confidence: 91,
    time: "8 min ago",
  },
];

export default function Dashboard() {
  // API hooks for real data
  const { data: marketRegime, loading: regimeLoading } = useMarketRegime();
  const {
    data: opportunities,
    loading: oppsLoading,
    refetch: refetchOpps,
  } = useOpportunities();
  const { data: traderSignals, loading: signalsLoading } = useTraderSignals();
  const { data: portfolioMetrics, loading: metricsLoading } =
    usePortfolioMetrics();

  const handleRunDiscovery = async () => {
    try {
      await api.runDiscovery();
      refetchOpps(); // Refresh opportunities after discovery
    } catch (error) {
      console.error("Failed to run discovery:", error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Market Regime Alert */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">
                Current Market Regime:{" "}
                <strong>
                  {regimeLoading
                    ? "Loading..."
                    : marketRegime?.strategy || "Unknown"}
                </strong>
              </span>
            </div>
            <button
              onClick={handleRunDiscovery}
              className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
            >
              🔍 Run Discovery
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Portfolio Value",
              value: metricsLoading
                ? "Loading..."
                : `$${portfolioMetrics?.total_value.toLocaleString() || "0"}`,
              change: metricsLoading
                ? "..."
                : `${portfolioMetrics?.daily_pnl_percent >= 0 ? "+" : ""}${
                    portfolioMetrics?.daily_pnl_percent.toFixed(2) || "0"
                  }%`,
              positive: portfolioMetrics?.daily_pnl_percent >= 0,
            },
            {
              title: "Daily P&L",
              value: metricsLoading
                ? "Loading..."
                : `${portfolioMetrics?.daily_pnl >= 0 ? "+" : ""}$${
                    portfolioMetrics?.daily_pnl.toLocaleString() || "0"
                  }`,
              change: metricsLoading
                ? "..."
                : `${portfolioMetrics?.daily_pnl_percent >= 0 ? "+" : ""}${
                    portfolioMetrics?.daily_pnl_percent.toFixed(2) || "0"
                  }%`,
              positive: portfolioMetrics?.daily_pnl >= 0,
            },
            {
              title: "Active Positions",
              value: metricsLoading
                ? "Loading..."
                : `${portfolioMetrics?.active_positions || "0"}`,
              change: "+2",
              positive: true,
            },
            {
              title: "Win Rate",
              value: metricsLoading
                ? "Loading..."
                : `${portfolioMetrics?.win_rate.toFixed(1) || "0"}%`,
              change: "+1.2%",
              positive: true,
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                </div>
                <div
                  className={`flex items-center ${
                    metric.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.positive ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Portfolio Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Portfolio Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Movers */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Movers
            </h3>
            <div className="space-y-4">
              {topStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {stock.symbol}
                    </p>
                    <p className="text-sm text-gray-600">${stock.price}</p>
                  </div>
                  <div
                    className={`text-right ${
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <p className="font-semibold">
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}
                    </p>
                    <p className="text-sm">
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Signals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Trading Signals
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {signalsLoading ? (
                <div className="text-center py-4">Loading signals...</div>
              ) : traderSignals && traderSignals.length > 0 ? (
                traderSignals.slice(0, 5).map((signal) => (
                  <div
                    key={signal.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          signal.action === "LONG"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {signal.action}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {signal.symbol}
                        </p>
                        <p className="text-sm text-gray-600">
                          by {signal.trader_name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {(signal.confidence * 100).toFixed(0)}% confidence
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(signal.time).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No recent signals
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
