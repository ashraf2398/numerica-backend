# Team API Documentation

## Base URLs
- Admin endpoints: `http://localhost:3001/api/admin`
- Public endpoints: `http://localhost:3001/api/public`

## Admin Endpoints (Require Authentication)

### 1. Get All Team Members
Retrieves all team members.

**URL**: `/admin/team`  
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
    "name": "John Doe",
    "title": "CEO & Founder",
    "description": "John has over 20 years of experience in financial and tax advisory services.",
    "social_media": {
      "linkedin": "https://linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe",
      "facebook": "https://facebook.com/johndoe"
    },
    "image": "https://example.com/images/team/john-doe.jpg",
    "email": "john@numericatax.com",
    "phone": "01234567890",
    "order_index": 0,
    "is_published": true,
    "created_at": "2023-11-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "title": "Tax Consultant",
    "description": "Jane specializes in corporate tax planning and compliance.",
    "social_media": {
      "linkedin": "https://linkedin.com/in/janesmith"
    },
    "image": "https://example.com/images/team/jane-smith.jpg",
    "email": "jane@numericatax.com",
    "phone": "01987654321",
    "order_index": 1,
    "is_published": true,
    "created_at": "2023-11-16T14:20:00.000Z"
  }
]
```

### 2. Get Team Member by ID
Retrieves a specific team member by ID.

**URL**: `/admin/team/:id`  
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
  "name": "John Doe",
  "title": "CEO & Founder",
  "description": "John has over 20 years of experience in financial and tax advisory services.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "facebook": "https://facebook.com/johndoe"
  },
  "image": "https://example.com/images/team/john-doe.jpg",
  "email": "john@numericatax.com",
  "phone": "01234567890",
  "order_index": 0,
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 3. Create Team Member
Creates a new team member.

**URL**: `/admin/team`  
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
  "name": "John Doe",
  "title": "CEO & Founder",
  "description": "John has over 20 years of experience in financial and tax advisory services.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "facebook": "https://facebook.com/johndoe"
  },
  "image": "https://example.com/images/team/john-doe.jpg",
  "email": "john@numericatax.com",
  "phone": "01234567890",
  "order_index": 0,
  "is_published": true
}
```

**Success Response (201 Created)**:
```json
{
  "id": 1,
  "name": "John Doe",
  "title": "CEO & Founder",
  "description": "John has over 20 years of experience in financial and tax advisory services.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "facebook": "https://facebook.com/johndoe"
  },
  "image": "https://example.com/images/team/john-doe.jpg",
  "email": "john@numericatax.com",
  "phone": "01234567890",
  "order_index": 0,
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 4. Update Team Member
Updates an existing team member.

**URL**: `/admin/team/:id`  
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
  "title": "CEO & Managing Director",
  "description": "Updated description",
  "is_published": true
}
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "name": "John Doe",
  "title": "CEO & Managing Director",
  "description": "Updated description",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "facebook": "https://facebook.com/johndoe"
  },
  "image": "https://example.com/images/team/john-doe.jpg",
  "email": "john@numericatax.com",
  "phone": "01234567890",
  "order_index": 0,
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 5. Delete Team Member
Deletes a team member.

**URL**: `/admin/team/:id`  
**Method**: `DELETE`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
{
  "message": "Team member deleted successfully"
}
```

### 6. Update Team Order
Updates the order of team members.

**URL**: `/admin/team/order`  
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
  "order": [
    { "id": 1, "order_index": 2 },
    { "id": 2, "order_index": 0 },
    { "id": 3, "order_index": 1 }
  ]
}
```

**Success Response (200 OK)**:
```json
{
  "message": "Team order updated successfully"
}
```

## Public Endpoints (No Authentication Required)

### 1. Get All Published Team Members
Retrieves all published team members.

**URL**: `/public/team`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "title": "CEO & Founder",
    "description": "John has over 20 years of experience in financial and tax advisory services.",
    "social_media": {
      "linkedin": "https://linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe",
      "facebook": "https://facebook.com/johndoe"
    },
    "image": "https://example.com/images/team/john-doe.jpg",
    "email": "john@numericatax.com",
    "phone": "01234567890",
    "order_index": 0,
    "is_published": true,
    "created_at": "2023-11-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "title": "Tax Consultant",
    "description": "Jane specializes in corporate tax planning and compliance.",
    "social_media": {
      "linkedin": "https://linkedin.com/in/janesmith"
    },
    "image": "https://example.com/images/team/jane-smith.jpg",
    "email": "jane@numericatax.com",
    "phone": "01987654321",
    "order_index": 1,
    "is_published": true,
    "created_at": "2023-11-16T14:20:00.000Z"
  }
]
```

### 2. Get Published Team Member by ID
Retrieves a specific published team member by ID.

**URL**: `/public/team/:id`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "name": "John Doe",
  "title": "CEO & Founder",
  "description": "John has over 20 years of experience in financial and tax advisory services.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "facebook": "https://facebook.com/johndoe"
  },
  "image": "https://example.com/images/team/john-doe.jpg",
  "email": "john@numericatax.com",
  "phone": "01234567890",
  "order_index": 0,
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

## Postman Examples

### Admin: Create Team Member

```
POST http://localhost:3001/api/admin/team
Content-Type: application/json
Authorization: Bearer your_token_here

{
  "name": "John Doe",
  "title": "CEO & Founder",
  "description": "John has over 20 years of experience in financial and tax advisory services.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "facebook": "https://facebook.com/johndoe"
  },
  "image": "https://example.com/images/team/john-doe.jpg",
  "email": "john@numericatax.com",
  "phone": "01234567890",
  "is_published": true
}
```

### Public: Get Team Members

```
GET http://localhost:3001/api/public/team
```

### Admin: Update Team Order

```
POST http://localhost:3001/api/admin/team/order
Content-Type: application/json
Authorization: Bearer your_token_here

{
  "order": [
    { "id": 1, "order_index": 2 },
    { "id": 2, "order_index": 0 },
    { "id": 3, "order_index": 1 }
  ]
}
```

## Social Media Structure

The `social_media` field is a JSON object that can contain various social media platforms and their URLs. For example:

```json
{
  "linkedin": "https://linkedin.com/in/username",
  "twitter": "https://twitter.com/username",
  "facebook": "https://facebook.com/username",
  "instagram": "https://instagram.com/username",
  "youtube": "https://youtube.com/c/channelname"
}
```

You can include any platform you need by adding new key-value pairs to the object. 