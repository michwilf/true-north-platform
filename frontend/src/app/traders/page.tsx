"use client";

import { useState, useEffect } from "react";
import { useTraderSignals } from "@/lib/api";
import {
  UserGroupIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface Trader {
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

export default function TradersPage() {
  const {
    data: signals,
    loading: signalsLoading,
    refetch: refetchSignals,
  } = useTraderSignals();
  const [traders, setTraders] = useState<Trader[]>([]);
  const [availableTraders, setAvailableTraders] = useState<Trader[]>([]);
  const [loadingTraders, setLoadingTraders] = useState(true);
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>("24h");
  const [followingTrader, setFollowingTrader] = useState<string | null>(null);

  useEffect(() => {
    loadTraders();
  }, []);

  const loadTraders = async () => {
    try {
      setLoadingTraders(true);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"
        }/api/traders`
      );
      const data = await response.json();
      setTraders(data.traders || data);

      // If no traders are followed, load the leaderboard
      if (
        (!data.traders || data.traders.length === 0) &&
        (!data || data.length === 0)
      ) {
        const leaderboardResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"
          }/api/trader-leaderboard`
        );
        const leaderboardData = await leaderboardResponse.json();
        setAvailableTraders(leaderboardData.leaderboard || []);
      } else {
        setAvailableTraders([]);
      }
    } catch (error) {
      console.error("Failed to load traders:", error);
    } finally {
      setLoadingTraders(false);
    }
  };

  const filteredSignals = signals?.filter((signal) => {
    if (selectedTrader && signal.trader_name !== selectedTrader) return false;

    const signalTime = new Date(signal.time).getTime();
    const now = Date.now();
    const hoursDiff = (now - signalTime) / (1000 * 60 * 60);

    if (timeFilter === "1h" && hoursDiff > 1) return false;
    if (timeFilter === "24h" && hoursDiff > 24) return false;
    if (timeFilter === "7d" && hoursDiff > 168) return false;

    return true;
  });

  const followTrader = async (trader: Trader) => {
    try {
      setFollowingTrader(trader.id);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"
        }/api/traders/follow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trader.name,
            platform: trader.platform,
            username: trader.username,
            verified: trader.verified,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to follow trader");
      }

      // Reload traders to refresh the list
      await loadTraders();
    } catch (error) {
      console.error("Failed to follow trader:", error);
      alert("Failed to follow trader. Please try again.");
    } finally {
      setFollowingTrader(null);
    }
  };

  const getPlatformBadgeColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reddit":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "discord":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getActionBadgeColor = (action: string) => {
    switch (action.toUpperCase()) {
      case "LONG":
      case "BUY":
        return "bg-green-100 text-green-800";
      case "SHORT":
      case "SELL":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Trader Following
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Track and analyze successful traders across multiple platforms
              </p>
            </div>
            <button
              onClick={() => {
                refetchSignals();
                loadTraders();
              }}
              disabled={signalsLoading || loadingTraders}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <ArrowPathIcon
                className={`h-5 w-5 mr-2 ${
                  signalsLoading || loadingTraders ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traders List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  {traders.length > 0 ? `Followed Traders (${traders.length})` : `Available Traders (${availableTraders.length})`}
                </h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {loadingTraders ? (
                  <div className="p-6 text-center">
                    <ArrowPathIcon className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
                  </div>
                ) : traders.length > 0 ? (
                  traders.map((trader, index) => (
                    <motion.button
                      key={trader.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() =>
                        setSelectedTrader(
                          selectedTrader === trader.name ? null : trader.name
                        )
                      }
                      className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${
                        selectedTrader === trader.name ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-semibold text-gray-900">
                              {trader.name}
                            </p>
                            {trader.verified && (
                              <CheckBadgeIcon className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            @{trader.username}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium border ${getPlatformBadgeColor(
                                trader.platform
                              )}`}
                            >
                              {trader.platform}
                            </span>
                            <span className="text-xs text-gray-500">
                              {trader.followers.toLocaleString()} followers
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <p className="text-xs text-gray-600">Win Rate</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {trader.win_rate.toFixed(1)}%
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <p className="text-xs text-gray-600">Trades</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {trader.total_trades}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))
                ) : availableTraders.length > 0 ? (
                  availableTraders.map((trader, index) => (
                    <motion.div
                      key={trader.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-semibold text-gray-900">
                              {trader.name}
                            </p>
                            {trader.verified && (
                              <CheckBadgeIcon className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            @{trader.username}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium border ${getPlatformBadgeColor(
                                trader.platform
                              )}`}
                            >
                              {trader.platform}
                            </span>
                            <span className="text-xs text-gray-500">
                              {trader.followers?.toLocaleString() || 0} followers
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <p className="text-xs text-gray-600">Win Rate</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {trader.win_rate?.toFixed(1) || 0}%
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded px-2 py-1">
                          <p className="text-xs text-gray-600">Trades</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {trader.total_trades || 0}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => followTrader(trader)}
                        disabled={followingTrader === trader.id}
                        className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {followingTrader === trader.id ? (
                          <>
                            <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                            Following...
                          </>
                        ) : (
                          <>+ Follow</>
                        )}
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <UserGroupIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No traders available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Signals Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    Trading Signals
                    {selectedTrader && (
                      <span className="ml-2 text-sm font-normal text-gray-600">
                        from {selectedTrader}
                      </span>
                    )}
                  </h2>
                  <div className="flex space-x-2">
                    {["1h", "24h", "7d"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setTimeFilter(filter)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          timeFilter === filter
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {signalsLoading ? (
                  <div className="p-8 text-center">
                    <ArrowPathIcon className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
                    <p className="text-gray-600">Loading signals...</p>
                  </div>
                ) : filteredSignals && filteredSignals.length > 0 ? (
                  filteredSignals.map((signal, index) => (
                    <motion.div
                      key={signal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getActionBadgeColor(
                                signal.action
                              )}`}
                            >
                              {signal.action}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">
                              {signal.symbol}
                            </h3>
                            {signal.entry_price && (
                              <span className="text-sm text-gray-600">
                                @ ${signal.entry_price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-4 mb-2">
                            <p className="text-sm font-medium text-gray-700">
                              by {signal.trader_name}
                            </p>
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium border ${getPlatformBadgeColor(
                                signal.platform
                              )}`}
                            >
                              {signal.platform}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {new Date(signal.time).toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <ChartBarIcon className="h-4 w-4 mr-1" />
                              {(signal.confidence * 100).toFixed(0)}% confidence
                            </div>
                          </div>
                        </div>

                        {/* Confidence Bar */}
                        <div className="ml-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                signal.confidence >= 0.8
                                  ? "bg-green-600"
                                  : signal.confidence >= 0.6
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                              }`}
                              style={{ width: `${signal.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <ChartBarIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="font-medium">No signals found</p>
                    <p className="text-sm mt-1">
                      {selectedTrader
                        ? "Try selecting a different trader or time range"
                        : "Start following traders to see their signals"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
