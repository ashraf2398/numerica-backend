#!/bin/bash

# Quick test script for home banner order functionality
# Replace YOUR_JWT_TOKEN with your actual token

JWT_TOKEN="YOUR_JWT_TOKEN_HERE"
BASE_URL="http://localhost:3001/api"

echo "🧪 Quick Home Banner Order Tests"
echo "=================================="

echo ""
echo "1️⃣ Testing GET banners (public):"
curl -s "$BASE_URL/public/home-banners" | jq '.[0:3] | .[] | {id, title, display_order}'

echo ""
echo ""
echo "2️⃣ Testing GET banners (admin):"
curl -s -H "Authorization: Bearer $JWT_TOKEN" "$BASE_URL/admin/home-banners" | jq '.[0:3] | .[] | {id, title, display_order}'

echo ""
echo ""
echo "3️⃣ Testing PUT order update:"
curl -s -X PUT "$BASE_URL/admin/home-banners/order" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "banners": [
      {"id": 4, "order": 1},
      {"id": 3, "order": 2},
      {"id": 5, "order": 3}
    ]
  }' | jq '.'

echo ""
echo ""
echo "4️⃣ Verifying the change:"
curl -s -H "Authorization: Bearer $JWT_TOKEN" "$BASE_URL/admin/home-banners" | jq '.[0:3] | .[] | {id, title, display_order}'

echo ""
echo ""
echo "✅ Test completed!" 