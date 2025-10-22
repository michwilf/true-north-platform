"use client";

import { useState, useEffect } from "react";
import {
  BellIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  FunnelIcon,
  ArrowPathIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: string;
  timestamp: string;
  symbol?: string;
}

export default function MonitoringPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadAlerts();

    // Auto-refresh every 30 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(loadAlerts, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002"}/api/alerts`);
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error("Failed to load alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true;
    return alert.severity.toLowerCase() === filter;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return <XCircleIcon className="h-6 w-6 text-red-600" />;
      case "high":
        return <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />;
      case "medium":
        return <InformationCircleIcon className="h-6 w-6 text-yellow-600" />;
      case "low":
        return <CheckCircleIcon className="h-6 w-6 text-blue-600" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-600" />;
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "high":
        return "bg-orange-50 border-orange-200";
      case "medium":
        return "bg-yellow-50 border-yellow-200";
      case "low":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const alertCounts = {
    critical: alerts.filter((a) => a.severity.toLowerCase() === "critical")
      .length,
    high: alerts.filter((a) => a.severity.toLowerCase() === "high").length,
    medium: alerts.filter((a) => a.severity.toLowerCase() === "medium").length,
    low: alerts.filter((a) => a.severity.toLowerCase() === "low").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Monitoring & Alerts
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Real-time alerts and notifications for your portfolio
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg border font-medium text-sm ${
                  autoRefresh
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
              </button>
              <button
                onClick={loadAlerts}
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

      {/* Alert Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Critical</p>
                <p className="text-2xl font-bold text-red-900">
                  {alertCounts.critical}
                </p>
              </div>
              <XCircleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">High</p>
                <p className="text-2xl font-bold text-orange-900">
                  {alertCounts.high}
                </p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Medium</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {alertCounts.medium}
                </p>
              </div>
              <InformationCircleIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Low</p>
                <p className="text-2xl font-bold text-blue-900">
                  {alertCounts.low}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <div className="flex space-x-2">
              {[
                { value: "all", label: "All Alerts" },
                { value: "critical", label: "Critical" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ].map((filterOption) => (
                <button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    filter === filterOption.value
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Alerts ({filteredAlerts.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-8 text-center">
                <ArrowPathIcon className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-gray-600">Loading alerts...</p>
              </div>
            ) : filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`p-6 border-l-4 ${getSeverityBgColor(
                    alert.severity
                  )}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getSeverityIcon(alert.severity)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {alert.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getSeverityBadgeColor(
                            alert.severity
                          )}`}
                        >
                          {alert.severity.toUpperCase()}
                        </span>
                        {alert.symbol && (
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-xs font-medium">
                            {alert.symbol}
                          </span>
                        )}
                      </div>

                      <p className="text-gray-700 mb-3">{alert.message}</p>

                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {getTimeAgo(alert.timestamp)} •{" "}
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-12 text-center">
                <BellIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">No alerts found</p>
                <p className="text-sm text-gray-500 mt-1">
                  {filter !== "all"
                    ? "Try selecting a different severity filter"
                    : "Your monitoring system is working. New alerts will appear here."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
