# About API Documentation (Updated with Image Upload & Values)

## Base URLs
- Admin endpoints: `http://localhost:3001/api/admin`
- Public endpoints: `http://localhost:3001/api/public`

## Admin Endpoints (Require Authentication)

### 1. Get All About Entries
Retrieves all about entries, including unpublished ones.

**URL**: `/admin/about`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "About Numérica",
    "content": "Numérica is a leading tax and accounting consulting firm...",
    "image_url": "http://localhost:3001/uploads/about/about-1703123456789-123456789.jpg",
    "mission": "To provide exceptional tax and accounting services...",
    "vision": "To be the most trusted financial partner...",
    "is_published": true,
    "values_title": "Our Core Values & Culture",
    "values_subtitle": "The principles that guide our decisions and shape our company culture.",
    "collaboration_title": "Collaboration",
    "collaboration_description": "We believe in the power of teamwork and open communication to deliver exceptional results for our clients.",
    "collaboration_link": "Learn more",
    "integrity_title": "Integrity",
    "integrity_description": "We operate with honesty, transparency, and the highest ethical standards in everything we do.",
    "integrity_link": "Learn more",
    "innovation_title": "Innovation",
    "innovation_description": "We embrace change and continuously explore new ideas to deliver cutting-edge solutions.",
    "innovation_link": "Learn more",
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

---

### 2. Create About Entry (with Image Upload)
Creates a new about entry with support for image uploads and values section.

**URL**: `/admin/about`  
**Method**: `POST`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Form Data Fields**:
- `title` (required): The title of the about section
- `content` (required): The main content text
- `image` (optional): Image file to upload (jpg, jpeg, png, gif, webp, svg)
- `image_url` (optional): Alternative to file upload - direct URL
- `mission` (optional): Mission statement
- `vision` (optional): Vision statement
- `is_published` (optional): Boolean, defaults to false
- `values_title` (optional): Title for values section, defaults to "Our Core Values & Culture"
- `values_subtitle` (optional): Subtitle for values section
- `collaboration_title` (optional): Collaboration value title, defaults to "Collaboration"
- `collaboration_description` (optional): Collaboration value description
- `collaboration_link` (optional): Collaboration link text, defaults to "Learn more"
- `integrity_title` (optional): Integrity value title, defaults to "Integrity"
- `integrity_description` (optional): Integrity value description
- `integrity_link` (optional): Integrity link text, defaults to "Learn more"
- `innovation_title` (optional): Innovation value title, defaults to "Innovation"
- `innovation_description` (optional): Innovation value description
- `innovation_link` (optional): Innovation link text, defaults to "Learn more"

**Example with Image Upload (cURL)**:
```bash
curl -X POST http://localhost:3001/api/admin/about \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=About Numérica" \
  -F "content=Numérica is a leading tax and accounting consulting firm..." \
  -F "mission=To provide exceptional tax and accounting services..." \
  -F "vision=To be the most trusted financial partner..." \
  -F "is_published=true" \
  -F "values_title=Our Core Values & Culture" \
  -F "values_subtitle=The principles that guide our decisions and shape our company culture." \
  -F "collaboration_title=Collaboration" \
  -F "collaboration_description=We believe in the power of teamwork and open communication to deliver exceptional results for our clients." \
  -F "collaboration_link=Learn more" \
  -F "integrity_title=Integrity" \
  -F "integrity_description=We operate with honesty, transparency, and the highest ethical standards in everything we do." \
  -F "integrity_link=Learn more" \
  -F "innovation_title=Innovation" \
  -F "innovation_description=We embrace change and continuously explore new ideas to deliver cutting-edge solutions." \
  -F "innovation_link=Learn more" \
  -F "image=@/path/to/your/image.jpg"
```

**Example with Image URL (cURL)**:
```bash
curl -X POST http://localhost:3001/api/admin/about \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=About Numérica" \
  -F "content=Numérica is a leading tax and accounting consulting firm..." \
  -F "image_url=https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800" \
  -F "mission=To provide exceptional tax and accounting services..." \
  -F "vision=To be the most trusted financial partner..." \
  -F "is_published=true"
```

**Postman Setup**:
1. Set method to `POST`
2. Set URL to `http://localhost:3001/api/admin/about`
3. Add Authorization header: `Bearer YOUR_JWT_TOKEN`
4. Set Body to `form-data`
5. Add all the fields above as key-value pairs
6. For image upload, set the `image` field type to `File` and select your image file

**Success Response (201 Created)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "About Numérica",
  "content": "Numérica is a leading tax and accounting consulting firm...",
  "image_url": "http://localhost:3001/uploads/about/about-1703123456789-123456789.jpg",
  "mission": "To provide exceptional tax and accounting services...",
  "vision": "To be the most trusted financial partner...",
  "is_published": true,
  "values_title": "Our Core Values & Culture",
  "values_subtitle": "The principles that guide our decisions and shape our company culture.",
  "collaboration_title": "Collaboration",
  "collaboration_description": "We believe in the power of teamwork and open communication to deliver exceptional results for our clients.",
  "collaboration_link": "Learn more",
  "integrity_title": "Integrity",
  "integrity_description": "We operate with honesty, transparency, and the highest ethical standards in everything we do.",
  "integrity_link": "Learn more",
  "innovation_title": "Innovation",
  "innovation_description": "We embrace change and continuously explore new ideas to deliver cutting-edge solutions.",
  "innovation_link": "Learn more",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Title and content are required"
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

### 3. Update About Entry (with Image Upload)
Updates an existing about entry with support for image uploads and values section.

**URL**: `/admin/about/:id`  
**Method**: `PUT`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Form Data Fields** (all optional):
- `title`: The title of the about section
- `content`: The main content text
- `image`: Image file to upload (jpg, jpeg, png, gif, webp, svg)
- `image_url`: Alternative to file upload - direct URL
- `mission`: Mission statement
- `vision`: Vision statement
- `is_published`: Boolean
- `values_title`: Title for values section
- `values_subtitle`: Subtitle for values section
- `collaboration_title`: Collaboration value title
- `collaboration_description`: Collaboration value description
- `collaboration_link`: Collaboration link text
- `integrity_title`: Integrity value title
- `integrity_description`: Integrity value description
- `integrity_link`: Integrity link text
- `innovation_title`: Innovation value title
- `innovation_description`: Innovation value description
- `innovation_link`: Innovation link text

**Example Update (cURL)**:
```bash
curl -X PUT http://localhost:3001/api/admin/about/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=Updated About Numérica" \
  -F "is_published=true" \
  -F "collaboration_description=Updated collaboration description..."
```

**Success Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated About Numérica",
  "content": "Numérica is a leading tax and accounting consulting firm...",
  "image_url": "http://localhost:3001/uploads/about/about-1703123456789-123456789.jpg",
  "mission": "To provide exceptional tax and accounting services...",
  "vision": "To be the most trusted financial partner...",
  "is_published": true,
  "values_title": "Our Core Values & Culture",
  "values_subtitle": "The principles that guide our decisions and shape our company culture.",
  "collaboration_title": "Collaboration",
  "collaboration_description": "Updated collaboration description...",
  "collaboration_link": "Learn more",
  "integrity_title": "Integrity",
  "integrity_description": "We operate with honesty, transparency, and the highest ethical standards in everything we do.",
  "integrity_link": "Learn more",
  "innovation_title": "Innovation",
  "innovation_description": "We embrace change and continuously explore new ideas to deliver cutting-edge solutions.",
  "innovation_link": "Learn more",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

---

### 4. Get Single About Entry
Retrieves a specific about entry by ID.

**URL**: `/admin/about/:id`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Success Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "About Numérica",
  "content": "Numérica is a leading tax and accounting consulting firm...",
  "image_url": "http://localhost:3001/uploads/about/about-1703123456789-123456789.jpg",
  "mission": "To provide exceptional tax and accounting services...",
  "vision": "To be the most trusted financial partner...",
  "is_published": true,
  "values_title": "Our Core Values & Culture",
  "values_subtitle": "The principles that guide our decisions and shape our company culture.",
  "collaboration_title": "Collaboration",
  "collaboration_description": "We believe in the power of teamwork and open communication to deliver exceptional results for our clients.",
  "collaboration_link": "Learn more",
  "integrity_title": "Integrity",
  "integrity_description": "We operate with honesty, transparency, and the highest ethical standards in everything we do.",
  "integrity_link": "Learn more",
  "innovation_title": "Innovation",
  "innovation_description": "We embrace change and continuously explore new ideas to deliver cutting-edge solutions.",
  "innovation_link": "Learn more",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

---

### 5. Delete About Entry
Deletes an about entry.

**URL**: `/admin/about/:id`  
**Method**: `DELETE`  
**Auth Required**: Yes (JWT Token)

**Success Response (200 OK)**:
```json
{
  "message": "About entry deleted successfully"
}
```

## Public Endpoints (No Authentication Required)

### 1. Get All Published About Entries
Retrieves all published about entries with values section.

**URL**: `/public/about`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "About Numérica",
    "content": "Numérica is a leading tax and accounting consulting firm...",
    "image_url": "http://localhost:3001/uploads/about/about-1703123456789-123456789.jpg",
    "mission": "To provide exceptional tax and accounting services...",
    "vision": "To be the most trusted financial partner...",
    "is_published": true,
    "values_title": "Our Core Values & Culture",
    "values_subtitle": "The principles that guide our decisions and shape our company culture.",
    "collaboration_title": "Collaboration",
    "collaboration_description": "We believe in the power of teamwork and open communication to deliver exceptional results for our clients.",
    "collaboration_link": "Learn more",
    "integrity_title": "Integrity",
    "integrity_description": "We operate with honesty, transparency, and the highest ethical standards in everything we do.",
    "integrity_link": "Learn more",
    "innovation_title": "Innovation",
    "innovation_description": "We embrace change and continuously explore new ideas to deliver cutting-edge solutions.",
    "innovation_link": "Learn more",
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

---

### 2. Get Single Published About Entry
Retrieves a specific published about entry by ID.

**URL**: `/public/about/:id`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "About Numérica",
  "content": "Numérica is a leading tax and accounting consulting firm...",
  "image_url": "http://localhost:3001/uploads/about/about-1703123456789-123456789.jpg",
  "mission": "To provide exceptional tax and accounting services...",
  "vision": "To be the most trusted financial partner...",
  "is_published": true,
  "values_title": "Our Core Values & Culture",
  "values_subtitle": "The principles that guide our decisions and shape our company culture.",
  "collaboration_title": "Collaboration",
  "collaboration_description": "We believe in the power of teamwork and open communication to deliver exceptional results for our clients.",
  "collaboration_link": "Learn more",
  "integrity_title": "Integrity",
  "integrity_description": "We operate with honesty, transparency, and the highest ethical standards in everything we do.",
  "integrity_link": "Learn more",
  "innovation_title": "Innovation",
  "innovation_description": "We embrace change and continuously explore new ideas to deliver cutting-edge solutions.",
  "innovation_link": "Learn more",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

## Database Migration

Run the following SQL to add the new fields to your about table:

```sql
-- Add new fields for "Our Values" section to the about table
ALTER TABLE about ADD COLUMN IF NOT EXISTS values_title TEXT DEFAULT 'Our Core Values & Culture';
ALTER TABLE about ADD COLUMN IF NOT EXISTS values_subtitle TEXT DEFAULT 'The principles that guide our decisions and shape our company culture.';

-- Collaboration value fields
ALTER TABLE about ADD COLUMN IF NOT EXISTS collaboration_title TEXT DEFAULT 'Collaboration';
ALTER TABLE about ADD COLUMN IF NOT EXISTS collaboration_description TEXT DEFAULT 'We believe in the power of teamwork and open communication to deliver exceptional results for our clients.';
ALTER TABLE about ADD COLUMN IF NOT EXISTS collaboration_link TEXT DEFAULT 'Learn more';

-- Integrity value fields
ALTER TABLE about ADD COLUMN IF NOT EXISTS integrity_title TEXT DEFAULT 'Integrity';
ALTER TABLE about ADD COLUMN IF NOT EXISTS integrity_description TEXT DEFAULT 'We operate with honesty, transparency, and the highest ethical standards in everything we do.';
ALTER TABLE about ADD COLUMN IF NOT EXISTS integrity_link TEXT DEFAULT 'Learn more';

-- Innovation value fields
ALTER TABLE about ADD COLUMN IF NOT EXISTS innovation_title TEXT DEFAULT 'Innovation';
ALTER TABLE about ADD COLUMN IF NOT EXISTS innovation_description TEXT DEFAULT 'We embrace change and continuously explore new ideas to deliver cutting-edge solutions.';
ALTER TABLE about ADD COLUMN IF NOT EXISTS innovation_link TEXT DEFAULT 'Learn more';

-- Add image_url field if it doesn't exist
ALTER TABLE about ADD COLUMN IF NOT EXISTS image_url TEXT;
```

## Features Summary

### ✅ Image Upload Support
- Upload images directly via form-data
- Support for jpg, jpeg, png, gif, webp, svg formats
- 5MB file size limit
- Automatic file naming with timestamps
- Alternative image URL support

### ✅ Our Values Section
- **Values Title**: "Our Core Values & Culture"
- **Values Subtitle**: "The principles that guide our decisions and shape our company culture."
- **Collaboration**: Teamwork and open communication
- **Integrity**: Honesty, transparency, and ethical standards
- **Innovation**: Embracing change and new ideas

### ✅ Complete CRUD Operations
- Create with image upload or URL
- Read all entries or single entry
- Update with partial data support
- Delete entries

### ✅ Authentication & Security
- JWT token required for admin endpoints
- Public endpoints for published content only
- File type validation
- File size limits

### ✅ Error Handling
- Detailed error messages for file uploads
- Validation for required fields
- Proper HTTP status codes 