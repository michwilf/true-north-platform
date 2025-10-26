#!/bin/bash

echo "🔍 Testing Reddit Trader Discovery..."
echo ""
echo "This will discover REAL traders from Reddit investing communities!"
echo ""

# Call the discover endpoint
curl -X POST \
  -H "Content-Type: application/json" \
  https://true-north-backend-kkqve.ondigitalocean.app/api/traders/discover-reddit \
  | jq '.'

echo ""
echo "✅ Done! Check the leaderboard page to see discovered traders."

