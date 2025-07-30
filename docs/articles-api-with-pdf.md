# Articles API with PDF Upload Support

## 📋 **Complete API Reference**

### **Base URL**: `http://localhost:3001/api`

---

## 🔐 **Admin Endpoints (Require Authentication)**

### **1. Get All Articles**
```http
GET /admin/articles
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**cURL Example:**
```bash
curl -X GET http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### **2. Get Article by ID**
```http
GET /admin/articles/:id
```

**cURL Example:**
```bash
curl -X GET http://localhost:3001/api/admin/articles/550e8400-e29b-41d4-a716-446655440010 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### **3. Create Article (with Image and PDF Upload)**
```http
POST /admin/articles
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data Fields:**
- `title` (required): Article title
- `content` (required): Article content
- `author` (required): Author name
- `featured_image` (optional): Image file (jpg, jpeg, png, gif, webp, svg)
- `featured_image` (optional): Image URL (alternative to file upload)
- `pdf_attachment` (optional): PDF file (up to 10MB)
- `pdf_url` (optional): PDF URL (alternative to file upload)

**cURL Examples:**

**With Both Image and PDF Upload:**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Understanding Tax Benefits for Small Businesses" \
  -F "content=Small businesses can take advantage of various tax deductions..." \
  -F "author=Ahmed Hassan" \
  -F "featured_image=@/path/to/article-image.jpg" \
  -F "pdf_attachment=@/path/to/tax-guide.pdf"
```

**With Image URL and PDF Upload:**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Financial Planning Guide" \
  -F "content=This comprehensive guide covers financial planning strategies..." \
  -F "author=Sarah Ahmed" \
  -F "featured_image=https://example.com/financial-planning.jpg" \
  -F "pdf_attachment=@/path/to/financial-guide.pdf"
```

**With PDF URL:**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Investment Strategies" \
  -F "content=Learn about different investment approaches..." \
  -F "author=Mohamed Ali" \
  -F "pdf_url=https://example.com/investment-guide.pdf"
```

**Text Only (No Files):**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Quick Tax Tips" \
  -F "content=Here are some quick tax tips for individuals..." \
  -F "author=Tax Expert"
```

**Success Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "title": "Understanding Tax Benefits for Small Businesses",
  "content": "Small businesses can take advantage of various tax deductions...",
  "author": "Ahmed Hassan",
  "featured_image": "http://localhost:3001/uploads/articles/article-1234567890.jpg",
  "pdf_url": "http://localhost:3001/uploads/articles/pdfs/article-pdf-1234567890.pdf",
  "created_at": "2025-07-16T15:24:55.794067+00:00",
  "updated_at": "2025-07-16T15:24:55.794067+00:00"
}
```

---

### **4. Update Article (with Image and PDF Upload)**
```http
PUT /admin/articles/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data Fields (all optional):**
- `title`: Article title
- `content`: Article content
- `author`: Author name
- `featured_image`: New image file
- `featured_image`: New image URL
- `pdf_attachment`: New PDF file
- `pdf_url`: New PDF URL

**cURL Examples:**

**Update Title and Add PDF:**
```bash
curl -X PUT http://localhost:3001/api/admin/articles/550e8400-e29b-41d4-a716-446655440010 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Updated: Tax Benefits for Small Businesses" \
  -F "pdf_attachment=@/path/to/updated-tax-guide.pdf"
```

**Update Image Only:**
```bash
curl -X PUT http://localhost:3001/api/admin/articles/550e8400-e29b-41d4-a716-446655440010 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "featured_image=@/path/to/new-image.jpg"
```

**Remove PDF (set to null):**
```bash
curl -X PUT http://localhost:3001/api/admin/articles/550e8400-e29b-41d4-a716-446655440010 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "pdf_url="
```

---

### **5. Delete Article**
```http
DELETE /admin/articles/:id
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3001/api/admin/articles/550e8400-e29b-41d4-a716-446655440010 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### **6. Search Articles**
```http
GET /admin/articles/search?query=tax&author=Ahmed&limit=10&offset=0
```

**Query Parameters:**
- `query` (optional): Search term (searches title and content)
- `author` (optional): Filter by author
- `limit` (optional): Number of results (default: 10)
- `offset` (optional): Pagination offset (default: 0)

**cURL Example:**
```bash
curl -X GET "http://localhost:3001/api/admin/articles/search?query=tax&limit=5" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🔧 **Debug Endpoint**

### **Debug Article Creation**
```http
POST /admin/debug-article
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/admin/debug-article \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Test Article" \
  -F "content=Test content" \
  -F "author=Test Author" \
  -F "featured_image=@/path/to/test-image.jpg" \
  -F "pdf_attachment=@/path/to/test.pdf"
```

**Response:**
```json
{
  "message": "Article debug data logged",
  "body": {
    "title": "Test Article",
    "content": "Test content",
    "author": "Test Author"
  },
  "featuredImage": {
    "fieldname": "featured_image",
    "filename": "article-1234567890.jpg",
    "size": 245760
  },
  "pdfFile": {
    "fieldname": "pdf_attachment",
    "filename": "article-pdf-1234567890.pdf",
    "size": 1048576
  },
  "allFiles": ["featured_image", "pdf_attachment"]
}
```

---

## 📝 **Error Responses**

### **400 Bad Request - Missing Required Fields**
```json
{
  "error": "Title, content, and author are required"
}
```

### **400 Bad Request - File Too Large**
```json
{
  "error": "File too large. Maximum size is 10MB for PDFs and 5MB for images."
}
```

### **400 Bad Request - Invalid Image File Type**
```json
{
  "error": "Only image files (jpg, jpeg, png, gif, webp, svg) are allowed for featured_image!"
}
```

### **400 Bad Request - Invalid PDF File Type**
```json
{
  "error": "Only PDF files are allowed for pdf_attachment!"
}
```

### **400 Bad Request - Unexpected File Field**
```json
{
  "error": "Unexpected file field \"document\". Only \"featured_image\" and \"pdf_attachment\" fields are allowed.",
  "details": "Received field: document, Expected: featured_image or pdf_attachment",
  "suggestion": "Make sure your form fields are named \"featured_image\" for images and \"pdf_attachment\" for PDFs"
}
```

### **401 Unauthorized**
```json
{
  "error": "Access denied. No token provided."
}
```

### **404 Not Found**
```json
{
  "error": "Article not found"
}
```

---

## 📋 **Quick Reference Card**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/articles` | ✅ | Get all articles |
| GET | `/admin/articles/:id` | ✅ | Get single article |
| GET | `/admin/articles/search` | ✅ | Search articles |
| POST | `/admin/articles` | ✅ | Create article |
| PUT | `/admin/articles/:id` | ✅ | Update article |
| DELETE | `/admin/articles/:id` | ✅ | Delete article |
| POST | `/admin/debug-article` | ✅ | Debug endpoint |

---

## 🚀 **Features Summary**

### ✅ **Dual File Upload Support**
- Featured images: jpg, jpeg, png, gif, webp, svg (5MB limit)
- PDF attachments: pdf files (10MB limit)
- Alternative URL support for both images and PDFs
- Separate storage directories for organization

### ✅ **Complete CRUD Operations**
- Create with both image and PDF uploads
- Read all articles or single article
- Update with partial data support
- Delete articles
- Search functionality with filters

### ✅ **Authentication & Security**
- JWT token required for admin endpoints
- File type validation
- File size limits
- Proper error handling

### ✅ **Flexible Upload Options**
- Upload files directly via form-data
- Provide URLs instead of files
- Mix and match (image file + PDF URL, etc.)
- Optional file attachments

---

## 🗄️ **Database Schema**

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  featured_image TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 📁 **File Structure**

```
uploads/
└── articles/
    ├── article-1234567890.jpg       # Featured images
    ├── article-1234567891.png
    └── pdfs/
        ├── article-pdf-1234567890.pdf  # PDF attachments
        └── article-pdf-1234567891.pdf
```

---

## 🧪 **Testing Examples**

### **Test Image Upload Only**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Image Only Article" \
  -F "content=This article has only a featured image" \
  -F "author=Test Author" \
  -F "featured_image=@/path/to/image.jpg"
```

### **Test PDF Upload Only**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=PDF Only Article" \
  -F "content=This article has only a PDF attachment" \
  -F "author=Test Author" \
  -F "pdf_attachment=@/path/to/document.pdf"
```

### **Test Both Files**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Complete Article" \
  -F "content=This article has both image and PDF" \
  -F "author=Test Author" \
  -F "featured_image=@/path/to/image.jpg" \
  -F "pdf_attachment=@/path/to/document.pdf"
```

### **Test URLs Instead of Files**
```bash
curl -X POST http://localhost:3001/api/admin/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=URL Based Article" \
  -F "content=This article uses URLs instead of uploads" \
  -F "author=Test Author" \
  -F "featured_image=https://example.com/image.jpg" \
  -F "pdf_url=https://example.com/document.pdf"
```

---

## 📞 **Migration Required**

Before using PDF upload functionality, run the migration:

```sql
-- Add pdf_url column to articles table
ALTER TABLE articles ADD COLUMN IF NOT EXISTS pdf_url TEXT;
COMMENT ON COLUMN articles.pdf_url IS 'URL to PDF attachment for the article';
```

**File location**: `migrations/add_pdf_attachment_to_articles.sql`

---

*Last updated: July 16, 2025* 