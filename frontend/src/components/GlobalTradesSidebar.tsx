"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import TradesSidebar from "./TradesSidebar";
import TradeResearchModal from "./TradeResearchModal";

interface Trade {
  id: string;
  symbol: string;
  [key: string]: unknown;
}

export default function GlobalTradesSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const handleTradeSelect = (trade: Trade) => {
    setSelectedTrade(trade);
  };

  const handleCloseModal = () => {
    setSelectedTrade(null);
  };

  return (
    <>
      {/* Floating Trades Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all z-30 flex items-center space-x-2 group"
        aria-label="Open Trades Sidebar"
      >
        <ChartBarIcon className="h-6 w-6" />
        <span className="font-semibold pr-2 hidden group-hover:inline">
          Trades
        </span>
      </motion.button>

      {/* Trades Sidebar */}
      <TradesSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTradeSelect={handleTradeSelect}
      />

      {/* Trade Research Modal */}
      {selectedTrade && (
        <TradeResearchModal
          trade={selectedTrade}
          isOpen={!!selectedTrade}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

