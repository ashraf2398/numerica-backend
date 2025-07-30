#!/bin/bash

echo "🧪 Testing Articles API with PDF Upload Support"
echo "================================================="

# Token for authentication
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlciIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzU1NTY5OCwiZXhwIjoxNzM3NjQyMDk4fQ.K3nPwt3uTSB6rlN55RGdpD2tN4vV2WRD4O6JqVRLp4A"

echo ""
echo "📋 Test 1: Debug endpoint (text only)"
echo "--------------------------------------"
curl -X POST http://localhost:3001/api/admin/debug-article \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Test Article" \
  -F "content=Test content for article with PDF support" \
  -F "author=Test Author"

echo ""
echo ""
echo "📄 Test 2: Create article with text only"
echo "-----------------------------------------"
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Text Only Article" \
  -F "content=This is a simple article with just text content. No files attached." \
  -F "author=Ahmed Hassan"

echo ""
echo ""
echo "🔗 Test 3: Create article with URLs (no file uploads)"
echo "-----------------------------------------------------"
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=URL Based Article" \
  -F "content=This article uses URLs for both image and PDF instead of uploading files." \
  -F "author=Sarah Ahmed" \
  -F "featured_image=https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600" \
  -F "pdf_url=https://www.w3.org/WAI/WCAG21/working-examples/pdf-table/table.pdf"

echo ""
echo ""
echo "📊 Test 4: Get all articles"
echo "----------------------------"
curl -X GET http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo ""
echo "🔍 Test 5: Search articles"
echo "---------------------------"
curl -X GET "http://localhost:3001/api/admin/articles/search?query=article&limit=3" \
  -H "Authorization: Bearer $TOKEN"

echo ""
echo ""
echo "✅ All tests completed!"
echo "======================="
echo ""
echo "To test with actual file uploads, use:"
echo "curl -X POST http://localhost:3001/api/admin/articles \\"
echo "  -H \"Authorization: Bearer \$TOKEN\" \\"
echo "  -F \"title=Test with Files\" \\"
echo "  -F \"content=Article with actual files\" \\"
echo "  -F \"author=Test Author\" \\"
echo "  -F \"featured_image=@/path/to/image.jpg\" \\"
echo "  -F \"pdf_attachment=@/path/to/document.pdf\""
echo "" 