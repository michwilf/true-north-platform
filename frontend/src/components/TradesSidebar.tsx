"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  BellIcon,
  ChartBarIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface Trade {
  id: string;
  symbol: string;
  title: string;
  type: "active" | "potential" | "pending" | "completed" | "alert";
  side: "long" | "short";
  entry_price?: number;
  current_price?: number;
  target_price?: number;
  stop_loss?: number;
  quantity?: number;
  pnl?: number;
  pnl_percentage?: number;
  timestamp: string;
  status: string;
  reasoning?: string;
  confidence?: number;
  timeframe?: string;
  risk_level?: string;
}

interface TradesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onTradeSelect?: (trade: Trade) => void;
}

export default function TradesSidebar({
  isOpen,
  onClose,
  onTradeSelect,
}: TradesSidebarProps) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);

  const filters = [
    { id: "all", label: "All Trades", icon: ChartBarIcon, color: "blue" },
    { id: "active", label: "Active", icon: CheckCircleIcon, color: "green" },
    {
      id: "potential",
      label: "Potential",
      icon: ClockIcon,
      color: "yellow",
    },
    { id: "pending", label: "Pending", icon: BellIcon, color: "orange" },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircleIcon,
      color: "gray",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      fetchTrades();
    }
  }, [isOpen, selectedFilter]);

  const fetchTrades = async () => {
    setLoading(true);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002";
      const response = await fetch(`${apiUrl}/api/portfolio/positions`);
      if (response.ok) {
        const data = await response.json();
        // Transform portfolio positions into trades
        const transformedTrades: Trade[] = data.map((position: unknown) => {
          const pos = position as Record<string, unknown>;
          return {
            id: String(pos.symbol || ""),
            symbol: String(pos.symbol || ""),
            title: `${pos.side === "long" ? "Long" : "Short"} ${pos.symbol}`,
            type: "active" as const,
            side: (pos.side as "long" | "short") || "long",
            entry_price:
              typeof pos.entry_price === "number" ? pos.entry_price : undefined,
            current_price:
              typeof pos.current_price === "number"
                ? pos.current_price
                : undefined,
            target_price:
              typeof pos.target_price === "number"
                ? pos.target_price
                : undefined,
            stop_loss:
              typeof pos.stop_loss === "number" ? pos.stop_loss : undefined,
            quantity: typeof pos.quantity === "number" ? pos.quantity : 0,
            pnl: typeof pos.pnl === "number" ? pos.pnl : 0,
            pnl_percentage:
              typeof pos.pnl_percentage === "number"
                ? pos.pnl_percentage
                : 0,
            timestamp: String(pos.timestamp || new Date().toISOString()),
            status: String(pos.status || "active"),
          };
        });

        // TODO: Fetch potential trades from opportunities endpoint
        // TODO: Fetch alerts from monitoring endpoint

        setTrades(transformedTrades);
      }
    } catch (error) {
      console.error("Error fetching trades:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrades =
    selectedFilter === "all"
      ? trades
      : trades.filter((trade) => trade.type === selectedFilter);

  const getTradeStatusColor = (type: string) => {
    switch (type) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "potential":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "alert":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getPnLColor = (pnl: number) => {
    if (pnl > 0) return "text-green-600";
    if (pnl < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 168) {
      // Less than a week
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  <ChartBarIcon className="h-7 w-7 mr-3" />
                  Trades
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {filteredTrades.length} {selectedFilter} trades
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  Filter
                </h3>
                <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <PlusIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  const isSelected = selectedFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? `bg-${filter.color}-100 text-${filter.color}-700 border-2 border-${filter.color}-400`
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-1.5" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trades List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredTrades.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8 text-center">
                  <ChartBarIcon className="h-16 w-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">No trades found</p>
                  <p className="text-sm mt-2">
                    {selectedFilter === "all"
                      ? "Start trading to see your positions here"
                      : `No ${selectedFilter} trades at the moment`}
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {filteredTrades.map((trade) => (
                    <motion.div
                      key={trade.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onClick={() =>
                        setSelectedTrade(
                          selectedTrade === trade.id ? null : trade.id
                        )
                      }
                      className={`bg-white dark:bg-gray-800 rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-lg ${
                        selectedTrade === trade.id
                          ? "border-blue-400 shadow-lg"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {/* Trade Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                              {trade.symbol}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTradeStatusColor(
                                trade.type
                              )}`}
                            >
                              {trade.type.toUpperCase()}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                trade.side === "long"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {trade.side === "long" ? "LONG" : "SHORT"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimestamp(trade.timestamp)}
                          </p>
                        </div>
                        {trade.pnl !== undefined && (
                          <div className="text-right">
                            <p
                              className={`text-lg font-bold ${getPnLColor(
                                trade.pnl
                              )}`}
                            >
                              {trade.pnl >= 0 ? "+" : ""}$
                              {trade.pnl.toFixed(2)}
                            </p>
                            <p
                              className={`text-xs font-medium ${getPnLColor(
                                trade.pnl
                              )}`}
                            >
                              {trade.pnl_percentage !== undefined &&
                                `${trade.pnl_percentage >= 0 ? "+" : ""}${trade.pnl_percentage.toFixed(2)}%`}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Trade Details */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {trade.entry_price !== undefined && (
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              Entry
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              ${trade.entry_price.toFixed(2)}
                            </p>
                          </div>
                        )}
                        {trade.current_price !== undefined && (
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              Current
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              ${trade.current_price.toFixed(2)}
                            </p>
                          </div>
                        )}
                        {trade.target_price !== undefined && (
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              Target
                            </p>
                            <p className="font-semibold text-green-600">
                              ${trade.target_price.toFixed(2)}
                            </p>
                          </div>
                        )}
                        {trade.stop_loss !== undefined && (
                          <div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              Stop Loss
                            </p>
                            <p className="font-semibold text-red-600">
                              ${trade.stop_loss.toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {selectedTrade === trade.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                          >
                            {trade.quantity !== undefined && (
                              <div className="mb-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Quantity
                                </p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {trade.quantity} shares
                                </p>
                              </div>
                            )}
                            {trade.reasoning && (
                              <div className="mb-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Reasoning
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {trade.reasoning}
                                </p>
                              </div>
                            )}
                            {trade.confidence !== undefined && (
                              <div className="mb-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Confidence
                                </p>
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full transition-all"
                                      style={{
                                        width: `${trade.confidence * 100}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    {(trade.confidence * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </div>
                            )}
                            <div className="flex space-x-2 mt-4">
                              <button
                                onClick={() => onTradeSelect?.(trade)}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                              >
                                View Details
                              </button>
                              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Close
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Stats */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {trades.filter((t) => t.type === "active").length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Active
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {trades.filter((t) => t.type === "potential").length}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Potential
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    $
                    {trades
                      .reduce((sum, t) => sum + (t.pnl || 0), 0)
                      .toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Total P/L
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

