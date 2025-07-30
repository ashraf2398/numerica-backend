# Contacts API Documentation

## Base URLs
- Admin endpoints: `http://localhost:3001/api/admin`
- Public endpoints: `http://localhost:3001/api/public`

## Admin Endpoints (Require Authentication)

### 1. Get All Contacts
Retrieves all contact entries.

**URL**: `/admin/contacts`  
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
    "addresses": [
      "Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
      "New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
    ],
    "phones": [
      "01014550554",
      "01155435850"
    ],
    "emails": [
      "info@numericatax.com"
    ],
    "is_published": true,
    "created_at": "2023-11-15T10:30:00.000Z"
  }
]
```

### 2. Get Contact by ID
Retrieves a specific contact entry by ID.

**URL**: `/admin/contacts/:id`  
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
  "addresses": [
    "Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
    "New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
  ],
  "phones": [
    "01014550554",
    "01155435850"
  ],
  "emails": [
    "info@numericatax.com"
  ],
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 3. Create Contact
Creates a new contact entry.

**URL**: `/admin/contacts`  
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
  "addresses": [
    "Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
    "New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
  ],
  "phones": [
    "01014550554",
    "01155435850"
  ],
  "emails": [
    "info@numericatax.com"
  ],
  "is_published": true
}
```

**Success Response (201 Created)**:
```json
{
  "id": 1,
  "addresses": [
    "Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
    "New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
  ],
  "phones": [
    "01014550554",
    "01155435850"
  ],
  "emails": [
    "info@numericatax.com"
  ],
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 4. Update Contact
Updates an existing contact entry.

**URL**: `/admin/contacts/:id`  
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
  "addresses": [
    "Updated Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
    "Updated New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
  ],
  "is_published": true
}
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "addresses": [
    "Updated Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
    "Updated New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
  ],
  "phones": [
    "01014550554",
    "01155435850"
  ],
  "emails": [
    "info@numericatax.com"
  ],
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 5. Delete Contact
Deletes a contact entry.

**URL**: `/admin/contacts/:id`  
**Method**: `DELETE`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
{
  "message": "Contact deleted successfully"
}
```

### 6. Get All Consultation Requests
Retrieves all consultation requests.

**URL**: `/admin/consultations`  
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
    "email": "john@example.com",
    "phone": "01234567890",
    "preferred_date": "2023-12-01T10:00:00.000Z",
    "message": "I need help with tax planning",
    "status": "pending",
    "created_at": "2023-11-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "01987654321",
    "preferred_date": "2023-12-05T14:00:00.000Z",
    "message": "Looking for financial advisory services",
    "status": "completed",
    "created_at": "2023-11-16T14:20:00.000Z"
  }
]
```

### 7. Get Consultation Request by ID
Retrieves a specific consultation request by ID.

**URL**: `/admin/consultations/:id`  
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
  "email": "john@example.com",
  "phone": "01234567890",
  "preferred_date": "2023-12-01T10:00:00.000Z",
  "message": "I need help with tax planning",
  "status": "pending",
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 8. Update Consultation Request Status
Updates the status of a consultation request.

**URL**: `/admin/consultations/:id/status`  
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
  "status": "completed"
}
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01234567890",
  "preferred_date": "2023-12-01T10:00:00.000Z",
  "message": "I need help with tax planning",
  "status": "completed",
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 9. Delete Consultation Request
Deletes a consultation request.

**URL**: `/admin/consultations/:id`  
**Method**: `DELETE`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
{
  "message": "Consultation request deleted successfully"
}
```

## Public Endpoints (No Authentication Required)

### 1. Get Published Contact Information
Retrieves the published contact information.

**URL**: `/public/contact`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "addresses": [
    "Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
    "New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
  ],
  "phones": [
    "01014550554",
    "01155435850"
  ],
  "emails": [
    "info@numericatax.com"
  ],
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 2. Submit Consultation Request
Submits a new consultation request.

**URL**: `/public/consultations`  
**Method**: `POST`  
**Auth Required**: No

**Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01234567890",
  "preferred_date": "2023-12-01T10:00:00.000Z",
  "message": "I need help with tax planning"
}
```

**Success Response (201 Created)**:
```json
{
  "message": "Consultation request submitted successfully",
  "id": 1
}
```

## Postman Examples

### Admin: Create Contact Information

```
POST http://localhost:3001/api/admin/contacts
Content-Type: application/json
Authorization: Bearer your_token_here

{
  "addresses": [
    "Downtown Office: Office 123, Creek Building, the GrEEK Campus, Downtown, Cairo, Egypt.",
    "New Cairo Office: Sharik-Hub, 4th F, Building 334, South 90th St, New Cairo 3, Egypt."
  ],
  "phones": [
    "01014550554",
    "01155435850"
  ],
  "emails": [
    "info@numericatax.com"
  ],
  "is_published": true
}
```

### Public: Get Contact Information

```
GET http://localhost:3001/api/public/contact
```

### Public: Submit Consultation Request

```
POST http://localhost:3001/api/public/consultations
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01234567890",
  "preferred_date": "2023-12-01T10:00:00.000Z",
  "message": "I need help with tax planning"
}
```

### Admin: View All Consultation Requests

```
GET http://localhost:3001/api/admin/consultations
Authorization: Bearer your_token_here
```

### Admin: Update Consultation Request Status

```
PUT http://localhost:3001/api/admin/consultations/1/status
Content-Type: application/json
Authorization: Bearer your_token_here

{
  "status": "completed"
}
``` 