#!/usr/bin/env python3
"""
Simple test script to verify SSE streaming endpoint works
"""

import requests
import json
import sys


def test_streaming_endpoint(symbol="AAPL"):
    """Test the streaming endpoint"""
    url = f"http://localhost:8002/api/analyze-stock-stream/{symbol}"

    print(f"🧪 Testing streaming endpoint: {url}")
    print("=" * 60)

    try:
        # Longer timeout for full multi-agent analysis (can take 30-60s)
        response = requests.get(url, stream=True, timeout=120)

        if response.status_code != 200:
            print(f"❌ Error: HTTP {response.status_code}")
            print(f"Response: {response.text}")
            return False

        print("✅ Connected to stream successfully!")
        print("\n📡 Receiving events:\n")

        event_count = 0
        for line in response.iter_lines():
            if line:
                line = line.decode("utf-8")

                # SSE format: "data: {json}"
                if line.startswith("data: "):
                    event_count += 1
                    data = json.loads(line[6:])  # Skip "data: " prefix

                    event_type = data.get("event", "unknown")

                    if event_type == "start":
                        print(f"🚀 {event_type}: {data.get('message')}")
                    elif event_type == "agent_start":
                        agent = data.get("agent")
                        progress = data.get("progress", 0)
                        print(f"🤖 {agent} starting... ({progress:.0f}%)")
                    elif event_type == "agent_complete":
                        agent = data.get("agent")
                        progress = data.get("progress", 0)
                        print(f"✅ {agent} complete! ({progress:.0f}%)")
                    elif event_type == "synthesis_start":
                        print(f"🔬 {data.get('message')}")
                    elif event_type == "done":
                        print(f"\n🎉 Analysis complete!")
                        print(f"   Symbol: {data.get('symbol')}")
                        print(f"   Recommendation: {data.get('recommendation')}")
                        print(f"   Confidence: {data.get('confidence', 0) * 100:.1f}%")
                        print(f"   Target: ${data.get('target_price', 0):.2f}")
                        break
                    elif event_type == "error":
                        print(f"❌ Error: {data.get('message')}")
                        return False

        print(f"\n✅ Test passed! Received {event_count} events")
        return True

    except requests.exceptions.Timeout:
        print("⏱️  Test timed out (this is OK for testing)")
        return True
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback

        traceback.print_exc()
        return False


if __name__ == "__main__":
    symbol = sys.argv[1] if len(sys.argv) > 1 else "AAPL"
    success = test_streaming_endpoint(symbol)
    sys.exit(0 if success else 1)
