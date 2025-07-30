# Testimonials API Documentation (Updated with Image Upload)

## Base URLs
- Admin endpoints: `http://localhost:3001/api/admin`
- Public endpoints: `http://localhost:3001/api/public`

## Authentication
All admin endpoints require authentication with a JWT token.

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Admin Endpoints (Require Authentication)

### 1. Get All Testimonials
Retrieves all testimonials, ordered by display_order.

**URL**: `/admin/testimonials`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Success Response (200 OK)**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Smith",
    "content": "Numérica has been handling our company taxes for the past 5 years...",
    "company": "Tech Solutions Inc.",
    "position": "CEO",
    "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1703123456789-123456789.jpg",
    "display_order": 1,
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

---

### 2. Create Testimonial (with Image Upload)
Creates a new testimonial with support for image uploads.

**URL**: `/admin/testimonials`  
**Method**: `POST`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Form Data Fields**:
- `name` (required): The person's name
- `content` (required): The testimonial content
- `company` (required): The company name
- `position` (optional): The person's position/title
- `avatar` (optional): Image file to upload (jpg, jpeg, png, gif, webp, svg)
- `avatar_url` (optional): Alternative to file upload - direct URL
- `display_order` (optional): Display order, auto-assigned if not provided

**Example with Image Upload (cURL)**:
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

**Example with Image URL (cURL)**:
```bash
curl -X POST http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Jane Doe" \
  -F "content=Excellent service and professional team. Highly recommended!" \
  -F "company=Doe Enterprises" \
  -F "position=CFO" \
  -F "avatar_url=https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
```

**Postman Setup**:
1. Set method to `POST`
2. Set URL to `http://localhost:3001/api/admin/testimonials`
3. Add Authorization header: `Bearer YOUR_JWT_TOKEN`
4. Set Body to `form-data`
5. Add all the fields above as key-value pairs
6. For image upload, set the `avatar` field type to `File` and select your image file

**Success Response (201 Created)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith",
  "content": "Numérica has been handling our company taxes for the past 5 years...",
  "company": "Tech Solutions Inc.",
  "position": "CEO",
  "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1703123456789-123456789.jpg",
  "display_order": 1,
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Name, content, and company are required"
}
```

**Error Response (400 Bad Request - File too large)**:
```json
{
  "error": "File too large. Maximum size is 5MB."
}
```

**Error Response (400 Bad Request - Invalid file type)**:
```json
{
  "error": "Only image files (jpg, jpeg, png, gif, webp, svg) are allowed!"
}
```

---

### 3. Update Testimonial (with Image Upload)
Updates an existing testimonial with support for image uploads.

**URL**: `/admin/testimonials/:id`  
**Method**: `PUT`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Form Data Fields** (all optional):
- `name`: The person's name
- `content`: The testimonial content
- `company`: The company name
- `position`: The person's position/title
- `avatar`: Image file to upload (jpg, jpeg, png, gif, webp, svg)
- `avatar_url`: Alternative to file upload - direct URL
- `display_order`: Display order

**Example Update (cURL)**:
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=John Smith Updated" \
  -F "position=Founder & CEO" \
  -F "display_order=2"
```

**Example Update with New Image (cURL)**:
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=John Smith" \
  -F "avatar=@/path/to/new-image.jpg"
```

**Success Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith Updated",
  "content": "Numérica has been handling our company taxes for the past 5 years...",
  "company": "Tech Solutions Inc.",
  "position": "Founder & CEO",
  "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1703123456789-123456789.jpg",
  "display_order": 2,
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T11:30:00.000Z"
}
```

---

### 4. Get Single Testimonial
Retrieves a specific testimonial by ID.

**URL**: `/admin/testimonials/:id`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Success Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith",
  "content": "Numérica has been handling our company taxes for the past 5 years...",
  "company": "Tech Solutions Inc.",
  "position": "CEO",
  "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1703123456789-123456789.jpg",
  "display_order": 1,
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

---

### 5. Delete Testimonial
Deletes a testimonial.

**URL**: `/admin/testimonials/:id`  
**Method**: `DELETE`  
**Auth Required**: Yes (JWT Token)

**Success Response (200 OK)**:
```json
{
  "message": "Testimonial deleted successfully"
}
```

---

### 6. Update Testimonial Order
Updates the display order of multiple testimonials.

**URL**: `/admin/testimonials/order`  
**Method**: `PUT`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body**:
```json
{
  "testimonials": [
    {"id": "550e8400-e29b-41d4-a716-446655440000", "display_order": 1},
    {"id": "550e8400-e29b-41d4-a716-446655440001", "display_order": 2},
    {"id": "550e8400-e29b-41d4-a716-446655440002", "display_order": 3}
  ]
}
```

**Success Response (200 OK)**:
```json
{
  "message": "Testimonial order updated successfully"
}
```

---

## Public Endpoints (No Authentication Required)

### 1. Get All Published Testimonials
Retrieves all published testimonials for public access.

**URL**: `/public/testimonials`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Smith",
    "content": "Numérica has been handling our company taxes for the past 5 years...",
    "company": "Tech Solutions Inc.",
    "position": "CEO",
    "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1703123456789-123456789.jpg",
    "display_order": 1,
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

---

### 2. Get Single Published Testimonial
Retrieves a specific published testimonial by ID.

**URL**: `/public/testimonials/:id`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith",
  "content": "Numérica has been handling our company taxes for the past 5 years...",
  "company": "Tech Solutions Inc.",
  "position": "CEO",
  "avatar_url": "http://localhost:3001/uploads/testimonials/testimonial-1703123456789-123456789.jpg",
  "display_order": 1,
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

---

## cURL Examples

### Create Testimonial with Image Upload
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

### Create Testimonial with Image URL
```bash
curl -X POST http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Jane Doe" \
  -F "content=Excellent service and professional team. Highly recommended!" \
  -F "company=Doe Enterprises" \
  -F "position=CFO" \
  -F "avatar_url=https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
```

### Update Testimonial
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=John Smith Updated" \
  -F "position=Founder & CEO"
```

### Update Testimonial with New Image
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=John Smith" \
  -F "avatar=@/path/to/new-image.jpg"
```

### Get All Testimonials
```bash
curl -X GET http://localhost:3001/api/admin/testimonials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Testimonial Order
```bash
curl -X PUT http://localhost:3001/api/admin/testimonials/order \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "testimonials": [
      {"id": "550e8400-e29b-41d4-a716-446655440000", "display_order": 1},
      {"id": "550e8400-e29b-41d4-a716-446655440001", "display_order": 2}
    ]
  }'
```

---

## Features Summary

### ✅ Image Upload Support
- Upload images directly via form-data
- Support for jpg, jpeg, png, gif, webp, svg formats
- 5MB file size limit
- Automatic file naming with timestamps
- Alternative image URL support

### ✅ Complete CRUD Operations
- Create with image upload or URL
- Read all testimonials or single testimonial
- Update with partial data support
- Delete testimonials
- Update display order

### ✅ Authentication & Security
- JWT token required for admin endpoints
- Public endpoints for published content only
- File type validation
- File size limits

### ✅ Error Handling
- Detailed error messages for file uploads
- Validation for required fields
- Proper HTTP status codes

### ✅ Display Order Management
- Automatic order assignment for new testimonials
- Manual order updates for multiple testimonials
- Ordered retrieval by display_order

---

## Notes

- Replace `YOUR_JWT_TOKEN` with your actual JWT token
- Replace `550e8400-e29b-41d4-a716-446655440000` with actual testimonial ID
- Replace `/path/to/john-smith.jpg` with actual image file path
- Supported image formats: jpg, jpeg, png, gif, webp, svg
- Maximum file size: 5MB
- Display order is auto-assigned if not provided 