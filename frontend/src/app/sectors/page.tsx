"use client";

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowPathIcon,
  FireIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface Sector {
  name: string;
  performance_1w: number;
  performance_1m: number;
  momentum: string;
}

interface SectorRotationData {
  sectors: Sector[];
  rotation_strength: number;
  trending_sectors: string[];
  lagging_sectors: string[];
  analysis_timestamp: string;
}

export default function SectorRotationPage() {
  const [sectorData, setSectorData] = useState<SectorRotationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<"1w" | "1m">("1w");

  useEffect(() => {
    loadSectorData();

    // Auto-refresh every 10 minutes
    const interval = setInterval(loadSectorData, 600000);
    return () => clearInterval(interval);
  }, []);

  const loadSectorData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"
        }/api/sector-rotation`
      );
      const data = await response.json();
      setSectorData(data);
    } catch (err) {
      setError("Failed to load sector rotation data");
      console.error("Error loading sector data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance > 2) return "bg-green-600";
    if (performance > 1) return "bg-green-400";
    if (performance > 0) return "bg-green-200";
    if (performance > -1) return "bg-red-200";
    if (performance > -2) return "bg-red-400";
    return "bg-red-600";
  };

  const getPerformanceTextColor = (performance: number) => {
    if (Math.abs(performance) > 1) return "text-white";
    return "text-gray-900";
  };

  const getMomentumBadgeColor = (momentum: string) => {
    switch (momentum.toUpperCase()) {
      case "STRONG":
        return "bg-green-100 text-green-800 border-green-200";
      case "MODERATE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "WEAK":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "VOLATILE":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRotationStrengthColor = (strength: number) => {
    if (strength > 0.8) return "text-green-600";
    if (strength > 0.6) return "text-blue-600";
    if (strength > 0.4) return "text-yellow-600";
    return "text-red-600";
  };

  const sortedSectors =
    sectorData?.sectors.sort((a, b) => {
      const perfA = timeframe === "1w" ? a.performance_1w : a.performance_1m;
      const perfB = timeframe === "1w" ? b.performance_1w : b.performance_1m;
      return perfB - perfA;
    }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading sector analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !sectorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ChartBarIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 font-medium">Failed to load sector data</p>
          <button
            onClick={loadSectorData}
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
                Sector Rotation Analysis
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Visual heatmap of sector performance and momentum
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 inline mr-1" />
                Updated:{" "}
                {new Date(sectorData.analysis_timestamp).toLocaleTimeString()}
              </div>
              <button
                onClick={loadSectorData}
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
        {/* Rotation Strength Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Rotation Strength
              </h2>
              <p className="text-sm text-gray-600">
                Measures how actively sectors are rotating relative to each
                other
              </p>
            </div>
            <div className="text-center">
              <div
                className={`text-4xl font-bold ${getRotationStrengthColor(
                  sectorData.rotation_strength
                )}`}
              >
                {(sectorData.rotation_strength * 100).toFixed(0)}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className={`h-3 rounded-full ${
                    sectorData.rotation_strength > 0.8
                      ? "bg-green-600"
                      : sectorData.rotation_strength > 0.6
                      ? "bg-blue-600"
                      : sectorData.rotation_strength > 0.4
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                  style={{ width: `${sectorData.rotation_strength * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeframe Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setTimeframe("1w")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  timeframe === "1w"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                1 Week
              </button>
              <button
                onClick={() => setTimeframe("1m")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  timeframe === "1m"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                1 Month
              </button>
            </div>
          </div>
        </div>

        {/* Sector Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Sector Performance Heatmap (
            {timeframe === "1w" ? "1 Week" : "1 Month"})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedSectors.map((sector, index) => {
              const performance =
                timeframe === "1w"
                  ? sector.performance_1w
                  : sector.performance_1m;
              return (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-lg p-4 border-2 border-gray-200 ${getPerformanceColor(
                    performance
                  )}`}
                >
                  <div className="text-center">
                    <h3
                      className={`font-semibold text-sm mb-2 ${getPerformanceTextColor(
                        performance
                      )}`}
                    >
                      {sector.name}
                    </h3>
                    <div
                      className={`text-2xl font-bold mb-2 ${getPerformanceTextColor(
                        performance
                      )}`}
                    >
                      {performance > 0 ? "+" : ""}
                      {performance.toFixed(1)}%
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getMomentumBadgeColor(
                        sector.momentum
                      )}`}
                    >
                      {sector.momentum}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Trending and Lagging Sectors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trending Sectors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FireIcon className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Trending Sectors
              </h3>
            </div>
            <div className="space-y-3">
              {sectorData.trending_sectors.map((sectorName, index) => {
                const sector = sectorData.sectors.find(
                  (s) => s.name === sectorName
                );
                const performance = sector
                  ? timeframe === "1w"
                    ? sector.performance_1w
                    : sector.performance_1m
                  : 0;
                return (
                  <motion.div
                    key={sectorName}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center space-x-3">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-900">
                        {sectorName}
                      </span>
                    </div>
                    <span className="text-green-600 font-bold">
                      +{performance.toFixed(1)}%
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Lagging Sectors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Lagging Sectors
              </h3>
            </div>
            <div className="space-y-3">
              {sectorData.lagging_sectors.map((sectorName, index) => {
                const sector = sectorData.sectors.find(
                  (s) => s.name === sectorName
                );
                const performance = sector
                  ? timeframe === "1w"
                    ? sector.performance_1w
                    : sector.performance_1m
                  : 0;
                return (
                  <motion.div
                    key={sectorName}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center space-x-3">
                      <ArrowTrendingDownIcon className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-gray-900">
                        {sectorName}
                      </span>
                    </div>
                    <span className="text-red-600 font-bold">
                      {performance.toFixed(1)}%
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Performance Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Legend
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-gray-700">&gt; +2%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-700">+1% to +2%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-200 rounded"></div>
              <span className="text-sm text-gray-700">0% to +1%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-200 rounded"></div>
              <span className="text-sm text-gray-700">-1% to 0%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span className="text-sm text-gray-700">-2% to -1%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="text-sm text-gray-700">&lt; -2%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
