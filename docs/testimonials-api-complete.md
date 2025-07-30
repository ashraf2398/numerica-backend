# Testimonials API Documentation

## 📋 **Complete API Reference**

### **Base URL**: `http://localhost:3001/api`

---

## 🔐 **Admin Endpoints (Require Authentication)**

### **1. Get All Testimonials**
```http
GET /admin/testimonials
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**cURL Example:**
```bash
curl -X GET http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
[
  {
    "id": 11,
    "name": "John Smith",
    "content": "Numérica has been handling our company taxes...",
    "company": "Tech Solutions Inc.",
    "position": "CEO",
    "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1234567890.png",
    "display_order": 1,
    "created_at": "2025-07-16T15:24:55.794067+00:00",
    "updated_at": "2025-07-16T15:24:55.794067+00:00"
  }
]
```

---

### **2. Get Testimonial by ID**
```http
GET /admin/testimonials/:id
```

**cURL Example:**
```bash
curl -X GET http://localhost:3001/api/admin/testimonials/11 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "id": 11,
  "name": "John Smith",
  "content": "Numérica has been handling our company taxes...",
  "company": "Tech Solutions Inc.",
  "position": "CEO",
  "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1234567890.png",
  "display_order": 1,
  "created_at": "2025-07-16T15:24:55.794067+00:00",
  "updated_at": "2025-07-16T15:24:55.794067+00:00"
}
```

---

### **3. Create Testimonial (with Image Upload)**
```http
POST /admin/testimonials
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data Fields:**
- `name` (required): Person's name
- `content` (required): Testimonial content
- `company` (required): Company name
- `position` (optional): Job position/title
- `avatar` (optional): Image file (jpg, jpeg, png, gif, webp, svg)
- `avatar_url` (optional): Direct image URL
- `display_order` (optional): Display order (auto-assigned if not provided)

**cURL Examples:**

**With Image Upload:**
```bash
curl -X POST http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=John Smith" \
  -F "content=Numérica has been handling our company taxes for the past 5 years. Their expertise and attention to detail have saved us thousands of dollars and countless hours of stress." \
  -F "company=Tech Solutions Inc." \
  -F "position=CEO" \
  -F "display_order=1" \
  -F "avatar=@/path/to/john-smith.jpg"
```

**With Image URL:**
```bash
curl -X POST http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Jane Doe" \
  -F "content=Excellent service and professional team. Highly recommended!" \
  -F "company=Doe Enterprises" \
  -F "position=CFO" \
  -F "avatar_url=https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
```

**Without Image:**
```bash
curl -X POST http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Test User" \
  -F "content=Test content" \
  -F "company=Test Company"
```

**Success Response (201):**
```json
{
  "id": 12,
  "name": "John Smith",
  "content": "Numérica has been handling our company taxes...",
  "company": "Tech Solutions Inc.",
  "position": "CEO",
  "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1234567890.png",
  "display_order": 1,
  "created_at": "2025-07-16T15:24:55.794067+00:00",
  "updated_at": "2025-07-16T15:24:55.794067+00:00"
}
```

---

### **4. Update Testimonial (with Image Upload)**
```http
PUT /admin/testimonials/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data Fields (all optional):**
- `name`: Person's name
- `content`: Testimonial content
- `company`: Company name
- `position`: Job position/title
- `avatar`: New image file
- `avatar_url`: New image URL
- `display_order`: Display order

**cURL Examples:**

**Update Text Fields:**
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/11 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=John Smith Updated" \
  -F "position=Founder & CEO" \
  -F "display_order=2"
```

**Update with New Image:**
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/11 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=John Smith" \
  -F "avatar=@/path/to/new-image.jpg"
```

**Success Response (200):**
```json
{
  "id": 11,
  "name": "John Smith Updated",
  "content": "Numérica has been handling our company taxes...",
  "company": "Tech Solutions Inc.",
  "position": "Founder & CEO",
  "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1234567890.png",
  "display_order": 2,
  "created_at": "2025-07-16T15:24:55.794067+00:00",
  "updated_at": "2025-07-16T15:26:06.738+00:00"
}
```

---

### **5. Delete Testimonial**
```http
DELETE /admin/testimonials/:id
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3001/api/admin/testimonials/11 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Success Response (200):**
```json
{
  "message": "Testimonial deleted successfully"
}
```

---

### **6. Update Testimonial Order**
```http
PUT /admin/testimonials/order
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "testimonials": [
    {"id": 11, "display_order": 1},
    {"id": 12, "display_order": 2},
    {"id": 13, "display_order": 3}
  ]
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/order \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "testimonials": [
      {"id": 11, "display_order": 1},
      {"id": 12, "display_order": 2}
    ]
  }'
```

**Success Response (200):**
```json
{
  "message": "Testimonial order updated successfully"
}
```

---

## 🌐 **Public Endpoints (No Authentication Required)**

### **1. Get All Published Testimonials**
```http
GET /public/testimonials
```

**cURL Example:**
```bash
curl -X GET http://localhost:3001/api/public/testimonials
```

**Response:**
```json
[
  {
    "id": 11,
    "name": "John Smith",
    "content": "Numérica has been handling our company taxes...",
    "company": "Tech Solutions Inc.",
    "position": "CEO",
    "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1234567890.png",
    "display_order": 1,
    "created_at": "2025-07-16T15:24:55.794067+00:00",
    "updated_at": "2025-07-16T15:24:55.794067+00:00"
  }
]
```

---

### **2. Get Single Published Testimonial**
```http
GET /public/testimonials/:id
```

**cURL Example:**
```bash
curl -X GET http://localhost:3001/api/public/testimonials/11
```

---

## 🔧 **Debug Endpoints**

### **Debug Testimonial Creation**
```http
POST /admin/debug-testimonial
```

**cURL Example:**
```bash
curl -X POST http://localhost:3001/api/admin/debug-testimonial \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Test User" \
  -F "content=Test content" \
  -F "company=Test Company"
```

**Response:**
```json
{
  "message": "Debug data logged",
  "body": {
    "name": "Test User",
    "content": "Test content",
    "company": "Test Company"
  },
  "files": [],
  "file": "No file"
}
```

---

## 📝 **Error Responses**

### **400 Bad Request - Missing Required Fields**
```json
{
  "error": "Name, content, and company are required"
}
```

### **400 Bad Request - File Too Large**
```json
{
  "error": "File too large. Maximum size is 5MB."
}
```

### **400 Bad Request - Invalid File Type**
```json
{
  "error": "Only image files (jpg, jpeg, png, gif, webp, svg) are allowed!"
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
  "error": "Testimonial not found"
}
```

### **500 Internal Server Error**
```json
{
  "error": "An error occurred while creating testimonial"
}
```

---

## 📋 **Quick Reference Card**

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/testimonials` | ✅ | Get all testimonials |
| GET | `/admin/testimonials/:id` | ✅ | Get single testimonial |
| POST | `/admin/testimonials` | ✅ | Create testimonial |
| PUT | `/admin/testimonials/:id` | ✅ | Update testimonial |
| DELETE | `/admin/testimonials/:id` | ✅ | Delete testimonial |
| PUT | `/admin/testimonials/order` | ✅ | Update order |
| GET | `/public/testimonials` | ❌ | Get public testimonials |
| GET | `/public/testimonials/:id` | ❌ | Get public testimonial |
| POST | `/admin/debug-testimonial` | ✅ | Debug endpoint |

---

## 🚀 **Features Summary**

### ✅ **Image Upload Support**
- Upload images directly via form-data
- Support for jpg, jpeg, png, gif, webp, svg formats
- 5MB file size limit
- Automatic file naming with timestamps
- Alternative image URL support

### ✅ **Complete CRUD Operations**
- Create with image upload or URL
- Read all testimonials or single testimonial
- Update with partial data support
- Delete testimonials
- Update display order

### ✅ **Authentication & Security**
- JWT token required for admin endpoints
- Public endpoints for published content only
- File type validation
- File size limits

### ✅ **Error Handling**
- Detailed error messages for file uploads
- Validation for required fields
- Proper HTTP status codes

### ✅ **Display Order Management**
- Automatic order assignment for new testimonials
- Manual order updates for multiple testimonials
- Ordered retrieval by display_order

---

## 🔧 **Postman Collection**

Import the Postman collection from `postman/Testimonials_API_Collection.json` for easy testing.

**Collection Variables:**
- `base_url`: `http://localhost:3001/api`
- `jwt_token`: Your JWT token
- `testimonial_id`: ID of testimonial for testing

---

## 📝 **Usage Notes**

### **Authentication**
All admin endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **File Upload Guidelines**
- **Supported formats**: jpg, jpeg, png, gif, webp, svg
- **Maximum size**: 5MB
- **Field name**: `avatar`
- **Alternative**: Use `avatar_url` for direct image URLs

### **Form Data Structure**
When uploading files, use `multipart/form-data` with these fields:
- `name` (required): Person's name
- `content` (required): Testimonial content  
- `company` (required): Company name
- `position` (optional): Job position
- `avatar` (optional): Image file
- `avatar_url` (optional): Image URL
- `display_order` (optional): Display order

### **Database Schema**
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  display_order INT DEFAULT 0
);
```

---

## 🧪 **Testing Examples**

### **Generate JWT Token**
```bash
node -e "const jwt = require('jsonwebtoken'); const token = jwt.sign({id: 'test-user', email: 'test@example.com', role: 'admin'}, 'YOUR_JWT_SECRET', {expiresIn: '1d'}); console.log('Token:', token);"
```

### **Test All Endpoints**
```bash
# Set your token
TOKEN="your_jwt_token_here"

# Get all testimonials
curl -X GET http://localhost:3001/api/admin/testimonials -H "Authorization: Bearer $TOKEN"

# Create testimonial
curl -X POST http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Test User" \
  -F "content=Test content" \
  -F "company=Test Company"

# Update testimonial
curl -X PUT http://localhost:3001/api/admin/testimonials/11 \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Updated Name"

# Delete testimonial
curl -X DELETE http://localhost:3001/api/admin/testimonials/11 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📞 **Support**

For issues or questions:
1. Check the debug endpoint for troubleshooting
2. Verify JWT token is valid
3. Ensure file uploads meet size and type requirements
4. Check server logs for detailed error messages

---

*Last updated: July 16, 2025* 