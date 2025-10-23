#!/bin/bash

echo "🧪 Testing SSE Streaming Endpoint"
echo "=================================="
echo ""
echo "📡 Connecting to: http://localhost:8002/api/analyze-stock-stream/AAPL"
echo "⏱️  This will take 30-60 seconds for full analysis..."
echo ""

curl -N -H "Accept: text/event-stream" \
  http://localhost:8002/api/analyze-stock-stream/AAPL 2>/dev/null | \
  while IFS= read -r line; do
    if [[ $line == data:* ]]; then
      # Extract JSON after "data: "
      json="${line#data: }"
      
      # Parse event type
      event=$(echo "$json" | grep -o '"event":"[^"]*"' | cut -d'"' -f4)
      
      case "$event" in
        "start")
          echo "🚀 START: Multi-agent analysis beginning..."
          ;;
        "agent_start")
          agent=$(echo "$json" | grep -o '"agent":"[^"]*"' | cut -d'"' -f4)
          echo "🤖 ${agent} starting..."
          ;;
        "agent_complete")
          agent=$(echo "$json" | grep -o '"agent":"[^"]*"' | cut -d'"' -f4)
          progress=$(echo "$json" | grep -o '"progress":[0-9.]*' | cut -d':' -f2)
          echo "✅ ${agent} complete (${progress%.*}%)"
          ;;
        "synthesis_start")
          echo "🔬 SYNTHESIS: Combining agent insights..."
          ;;
        "done")
          echo ""
          echo "🎉 ANALYSIS COMPLETE!"
          recommendation=$(echo "$json" | grep -o '"recommendation":"[^"]*"' | cut -d'"' -f4)
          confidence=$(echo "$json" | grep -o '"confidence":[0-9.]*' | cut -d':' -f2)
          echo "   Recommendation: ${recommendation}"
          echo "   Confidence: $(echo "$confidence * 100" | bc -l | cut -d'.' -f1)%"
          echo ""
          echo "✅ Test PASSED!"
          exit 0
          ;;
        "error")
          echo "❌ ERROR occurred"
          exit 1
          ;;
      esac
    fi
  done

echo ""
echo "⏱️  Stream ended or timed out"

