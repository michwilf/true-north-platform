"use client";

import { useState, useEffect } from "react";
import {
  TrophyIcon,
  UserGroupIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface TraderLeaderboard {
  trader_name: string;
  platform: string;
  win_rate: number;
  avg_return: number;
  total_trades: number;
  sharpe_ratio: number;
  max_drawdown: number;
  followers: number;
  verified: boolean;
  strategy: string;
  performance_score: number;
}

interface LeaderboardData {
  leaderboard: TraderLeaderboard[];
  total_traders: number;
  analysis_timestamp: string;
}

export default function TraderLeaderboardPage() {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("performance_score");

  useEffect(() => {
    loadLeaderboardData();

    // Auto-refresh every 15 minutes
    const interval = setInterval(loadLeaderboardData, 900000);
    return () => clearInterval(interval);
  }, []);

  const loadLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "http://localhost:8002/api/trader-leaderboard"
      );
      const data = await response.json();
      setLeaderboardData(data);
    } catch (err) {
      setError("Failed to load trader leaderboard");
      console.error("Error loading leaderboard:", err);
    } finally {
      setLoading(false);
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
      case "stocktwits":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStrategyBadgeColor = (strategy: string) => {
    switch (strategy.toLowerCase()) {
      case "swing_trading":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "day_trading":
        return "bg-red-100 text-red-800 border-red-200";
      case "momentum":
        return "bg-green-100 text-green-800 border-green-200";
      case "value_investing":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "options":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <TrophyIcon className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <TrophyIcon className="h-7 w-7 text-gray-400" />;
      case 3:
        return <TrophyIcon className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
            {rank}
          </div>
        );
    }
  };

  const getPerformanceScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const sortedTraders =
    leaderboardData?.leaderboard.sort((a, b) => {
      switch (sortBy) {
        case "win_rate":
          return b.win_rate - a.win_rate;
        case "avg_return":
          return b.avg_return - a.avg_return;
        case "sharpe_ratio":
          return b.sharpe_ratio - a.sharpe_ratio;
        case "total_trades":
          return b.total_trades - a.total_trades;
        case "followers":
          return b.followers - a.followers;
        default:
          return b.performance_score - a.performance_score;
      }
    }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading trader leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error || !leaderboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <UserGroupIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 font-medium">Failed to load leaderboard</p>
          <button
            onClick={loadLeaderboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Trader Leaderboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Top performing traders ranked by comprehensive performance
                metrics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 inline mr-1" />
                Updated:{" "}
                {new Date(
                  leaderboardData.analysis_timestamp
                ).toLocaleTimeString()}
              </div>
              <button
                onClick={loadLeaderboardData}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <ArrowPathIcon
                  className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {leaderboardData.total_traders}
              </p>
              <p className="text-sm text-gray-600">Total Traders</p>
            </div>
            <div className="text-center">
              <ChartBarIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {sortedTraders.length > 0
                  ? sortedTraders[0].win_rate.toFixed(1)
                  : "0"}
                %
              </p>
              <p className="text-sm text-gray-600">Top Win Rate</p>
            </div>
            <div className="text-center">
              <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {sortedTraders.length > 0
                  ? sortedTraders[0].avg_return.toFixed(1)
                  : "0"}
                %
              </p>
              <p className="text-sm text-gray-600">Top Avg Return</p>
            </div>
            <div className="text-center">
              <TrophyIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {sortedTraders.length > 0
                  ? sortedTraders[0].performance_score.toFixed(0)
                  : "0"}
              </p>
              <p className="text-sm text-gray-600">Top Score</p>
            </div>
          </div>
        </motion.div>

        {/* Sort Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sort by:</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="performance_score">Performance Score</option>
              <option value="win_rate">Win Rate</option>
              <option value="avg_return">Average Return</option>
              <option value="sharpe_ratio">Sharpe Ratio</option>
              <option value="total_trades">Total Trades</option>
              <option value="followers">Followers</option>
            </select>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {sortedTraders.map((trader, index) => (
            <motion.div
              key={trader.trader_name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                index < 3
                  ? "border-yellow-200 bg-gradient-to-r from-yellow-50 to-white"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left side - Rank and Trader Info */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>

                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {trader.trader_name}
                      </h3>
                      {trader.verified && (
                        <CheckBadgeIcon className="h-5 w-5 text-blue-600" />
                      )}
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getPlatformBadgeColor(
                          trader.platform
                        )}`}
                      >
                        {trader.platform}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStrategyBadgeColor(
                          trader.strategy
                        )}`}
                      >
                        {trader.strategy.replace("_", " ").toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        {trader.followers.toLocaleString()} followers
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side - Performance Score */}
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold ${getPerformanceScoreColor(
                      trader.performance_score
                    )}`}
                  >
                    {trader.performance_score.toFixed(0)}
                  </div>
                  <p className="text-sm text-gray-600">Performance Score</p>
                </div>
              </div>

              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                  <p className="text-lg font-bold text-green-600">
                    {trader.win_rate.toFixed(1)}%
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Avg Return</p>
                  <p className="text-lg font-bold text-blue-600">
                    {trader.avg_return.toFixed(1)}%
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Sharpe Ratio</p>
                  <p className="text-lg font-bold text-purple-600">
                    {trader.sharpe_ratio.toFixed(2)}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Max Drawdown</p>
                  <p className="text-lg font-bold text-red-600">
                    {trader.max_drawdown.toFixed(1)}%
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Trades</p>
                  <p className="text-lg font-bold text-gray-900">
                    {trader.total_trades}
                  </p>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Performance Score</span>
                  <span>{trader.performance_score.toFixed(0)}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      trader.performance_score >= 90
                        ? "bg-green-600"
                        : trader.performance_score >= 80
                        ? "bg-blue-600"
                        : trader.performance_score >= 70
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                    style={{ width: `${trader.performance_score}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Score Legend
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-gray-700">90-100: Exceptional</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-700">80-89: Excellent</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-600 rounded"></div>
              <span className="text-sm text-gray-700">70-79: Good</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-sm text-gray-700">
                &lt;70: Needs Improvement
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Performance score is calculated based on win rate, average return,
            Sharpe ratio, and risk management metrics.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
