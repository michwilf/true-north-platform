import { StreamingAnalysisLoader } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Market Regime Analysis
          </h1>
          <p className="text-gray-600">
            3 specialist agents analyzing market conditions
          </p>
        </div>
        <StreamingAnalysisLoader />
      </div>
    </div>
  );
}
