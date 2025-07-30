# About API Documentation

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
    "id": 1,
    "title": "About Our Company",
    "content": "We are a leading provider of innovative solutions...",
    "mission": "To empower businesses through technology",
    "vision": "A world where technology enhances human potential",
    "is_published": true,
    "created_at": "2023-08-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Our History",
    "content": "Founded in 2010, we have grown...",
    "mission": null,
    "vision": null,
    "is_published": false,
    "created_at": "2023-08-16T14:20:00.000Z"
  }
]
```

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Access denied. No token provided."
}
```

---

### 2. Get Single About Entry
Retrieves a specific about entry by ID.

**URL**: `/admin/about/:id`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "title": "About Our Company",
  "content": "We are a leading provider of innovative solutions...",
  "mission": "To empower businesses through technology",
  "vision": "A world where technology enhances human potential",
  "is_published": true,
  "created_at": "2023-08-15T10:30:00.000Z"
}
```

**Error Response (404 Not Found)**:
```json
{
  "error": "About entry not found"
}
```

---

### 3. Create About Entry
Creates a new about entry.

**URL**: `/admin/about`  
**Method**: `POST`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Our Mission and Vision",
  "content": "Detailed information about our company...",
  "mission": "To empower businesses through technology",
  "vision": "A world where technology enhances human potential",
  "is_published": false
}
```

**Success Response (201 Created)**:
```json
{
  "id": 3,
  "title": "Our Mission and Vision",
  "content": "Detailed information about our company...",
  "mission": "To empower businesses through technology",
  "vision": "A world where technology enhances human potential",
  "is_published": false,
  "created_at": "2023-08-17T09:45:00.000Z"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Title and content are required"
}
```

---

### 4. Update About Entry
Updates an existing about entry.

**URL**: `/admin/about/:id`  
**Method**: `PUT`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request Body** (all fields optional):
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "mission": "Updated mission statement",
  "vision": "Updated vision statement",
  "is_published": true
}
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content...",
  "mission": "Updated mission statement",
  "vision": "Updated vision statement",
  "is_published": true,
  "created_at": "2023-08-15T10:30:00.000Z"
}
```

**Error Response (404 Not Found)**:
```json
{
  "error": "About entry not found or could not be updated"
}
```

---

### 5. Delete About Entry
Deletes an about entry.

**URL**: `/admin/about/:id`  
**Method**: `DELETE`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
{
  "message": "About entry deleted successfully"
}
```

**Error Response (404 Not Found)**:
```json
{
  "error": "About entry not found or could not be deleted"
}
```

## Public Endpoints (No Authentication Required)

### 1. Get All Published About Entries
Retrieves all published about entries.

**URL**: `/public/about`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "About Our Company",
    "content": "We are a leading provider of innovative solutions...",
    "mission": "To empower businesses through technology",
    "vision": "A world where technology enhances human potential",
    "is_published": true,
    "created_at": "2023-08-15T10:30:00.000Z"
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
  "id": 1,
  "title": "About Our Company",
  "content": "We are a leading provider of innovative solutions...",
  "mission": "To empower businesses through technology",
  "vision": "A world where technology enhances human potential",
  "is_published": true,
  "created_at": "2023-08-15T10:30:00.000Z"
}
```

**Error Response (404 Not Found)**:
```json
{
  "error": "About entry not found"
}
```

## About Content Management Flow

1. **Creating Content**:
   - Admin logs in using `/api/admin/login`
   - Uses the JWT token to create about entries
   - Sets `is_published` to false for drafts

2. **Updating Content**:
   - Admin can update any field of an about entry
   - Only fields included in the request body will be updated

3. **Publishing Content**:
   - Admin updates an entry with `is_published: true`
   - Only published entries are visible through public endpoints

4. **Retrieving Content**:
   - Public users can only see published content
   - Admin can see all content (published and unpublished)

5. **Managing Multiple Entries**:
   - You can have multiple about entries for different sections
   - For example: company history, mission & vision, team, etc. 