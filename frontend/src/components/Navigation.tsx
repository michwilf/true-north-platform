"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  BellIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  FireIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: ChartBarIcon },
  { name: "Opportunities", href: "/opportunities", icon: ArrowTrendingUpIcon },
  { name: "Traders", href: "/traders", icon: UserGroupIcon },
  { name: "Monitoring", href: "/monitoring", icon: BellIcon },
  { name: "Market Regime", href: "/market-regime", icon: CpuChipIcon },
  { name: "Stock Analysis", href: "/analyze", icon: MagnifyingGlassIcon },
  { name: "Sectors", href: "/sectors", icon: FireIcon },
  { name: "Leaderboard", href: "/leaderboard", icon: TrophyIcon },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
