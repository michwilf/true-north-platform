/**
 * Loading Skeleton Components
 * Reusable skeleton loaders for streaming/suspense states
 */

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
    </tr>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="px-6 py-4 border-b border-gray-200 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}

export function AnalysisCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-96"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div className="space-y-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

export function StreamingAnalysisLoader() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            Multi-Agent Analysis in Progress
          </p>
          <p className="text-sm text-gray-600">
            4 specialized agents analyzing...
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Market Analyst</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Social Analyst</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full animate-[progress_2s_ease-in-out_infinite_0.5s]"></div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 bg-purple-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">News Analyst</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full animate-[progress_2s_ease-in-out_infinite_1s]"></div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-2 w-2 bg-orange-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Fundamentals Analyst</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-600 rounded-full animate-[progress_2s_ease-in-out_infinite_1.5s]"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        This typically takes 30-60 seconds
      </div>
    </div>
  );
}

