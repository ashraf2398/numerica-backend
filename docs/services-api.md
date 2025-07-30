# Services API Documentation

## Base URLs
- Admin endpoints: `http://localhost:3001/api/admin`
- Public endpoints: `http://localhost:3001/api/public`

## Admin Endpoints (Require Authentication)

### 1. Get All Services
Retrieves all services, including unpublished ones.

**URL**: `/admin/services`  
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
    "title": "Financial Advisory Services",
    "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
    "category": "Numerica",
    "features": [
      "Managing Accounts Receivable",
      "Accounts Payable",
      "Payroll and General Ledger",
      "Monthly bank and credit card reconciliations",
      "Expense tracking and classification"
    ],
    "icon": "finance-icon",
    "is_published": true,
    "created_at": "2023-11-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Tax Services",
    "description": "Our Tax Services aim to boost operational efficiency and deliver strategic financial insights.",
    "category": "Tax",
    "features": [
      "E-Invoicing Compliance",
      "VAT Services",
      "Corporate Income Tax",
      "Payroll Tax Management",
      "Withholding Tax",
      "Tax Audit Representation",
      "Tax Dispute Resolution",
      "International Tax & DTAs"
    ],
    "icon": "tax-icon",
    "is_published": false,
    "created_at": "2023-11-16T14:20:00.000Z"
  }
]
```

### 2. Get Service by ID
Retrieves a specific service by ID.

**URL**: `/admin/services/:id`  
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
  "title": "Financial Advisory Services",
  "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
  "category": "Numerica",
  "features": [
    "Managing Accounts Receivable",
    "Accounts Payable",
    "Payroll and General Ledger",
    "Monthly bank and credit card reconciliations",
    "Expense tracking and classification"
  ],
  "icon": "finance-icon",
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 3. Get Services by Category
Retrieves services filtered by category.

**URL**: `/admin/services/category/:category`  
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
    "title": "Financial Advisory Services",
    "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
    "category": "Numerica",
    "features": [
      "Managing Accounts Receivable",
      "Accounts Payable",
      "Payroll and General Ledger",
      "Monthly bank and credit card reconciliations",
      "Expense tracking and classification"
    ],
    "icon": "finance-icon",
    "is_published": true,
    "created_at": "2023-11-15T10:30:00.000Z"
  }
]
```

### 4. Create Service
Creates a new service.

**URL**: `/admin/services`  
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
  "title": "Tax Services",
  "description": "Our Tax Services aim to boost operational efficiency and deliver strategic financial insights.",
  "category": "Tax",
  "features": [
    "E-Invoicing Compliance",
    "VAT Services",
    "Corporate Income Tax",
    "Payroll Tax Management",
    "Withholding Tax",
    "Tax Audit Representation",
    "Tax Dispute Resolution",
    "International Tax & DTAs"
  ],
  "icon": "tax-icon",
  "is_published": false
}
```

**Success Response (201 Created)**:
```json
{
  "id": 2,
  "title": "Tax Services",
  "description": "Our Tax Services aim to boost operational efficiency and deliver strategic financial insights.",
  "category": "Tax",
  "features": [
    "E-Invoicing Compliance",
    "VAT Services",
    "Corporate Income Tax",
    "Payroll Tax Management",
    "Withholding Tax",
    "Tax Audit Representation",
    "Tax Dispute Resolution",
    "International Tax & DTAs"
  ],
  "icon": "tax-icon",
  "is_published": false,
  "created_at": "2023-11-16T14:20:00.000Z"
}
```

### 5. Update Service
Updates an existing service.

**URL**: `/admin/services/:id`  
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
  "title": "Updated Tax Services",
  "description": "Updated description for tax services.",
  "is_published": true
}
```

**Success Response (200 OK)**:
```json
{
  "id": 2,
  "title": "Updated Tax Services",
  "description": "Updated description for tax services.",
  "category": "Tax",
  "features": [
    "E-Invoicing Compliance",
    "VAT Services",
    "Corporate Income Tax",
    "Payroll Tax Management",
    "Withholding Tax",
    "Tax Audit Representation",
    "Tax Dispute Resolution",
    "International Tax & DTAs"
  ],
  "icon": "tax-icon",
  "is_published": true,
  "created_at": "2023-11-16T14:20:00.000Z"
}
```

### 6. Delete Service
Deletes a service.

**URL**: `/admin/services/:id`  
**Method**: `DELETE`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
{
  "message": "Service deleted successfully"
}
```

## Public Endpoints (No Authentication Required)

### 1. Get All Published Services
Retrieves all published services.

**URL**: `/public/services`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Financial Advisory Services",
    "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
    "category": "Numerica",
    "features": [
      "Managing Accounts Receivable",
      "Accounts Payable",
      "Payroll and General Ledger",
      "Monthly bank and credit card reconciliations",
      "Expense tracking and classification"
    ],
    "icon": "finance-icon",
    "is_published": true,
    "created_at": "2023-11-15T10:30:00.000Z"
  }
]
```

### 2. Get Published Service by ID
Retrieves a specific published service by ID.

**URL**: `/public/services/:id`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "title": "Financial Advisory Services",
  "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
  "category": "Numerica",
  "features": [
    "Managing Accounts Receivable",
    "Accounts Payable",
    "Payroll and General Ledger",
    "Monthly bank and credit card reconciliations",
    "Expense tracking and classification"
  ],
  "icon": "finance-icon",
  "is_published": true,
  "created_at": "2023-11-15T10:30:00.000Z"
}
```

### 3. Get Published Services by Category
Retrieves published services filtered by category.

**URL**: `/public/services/category/:category`  
**Method**: `GET`  
**Auth Required**: No

**Success Response (200 OK)**:
```json
[
  {
    "id": 1,
    "title": "Financial Advisory Services",
    "description": "We ensure all business transactions are accurately recorded, categorized, and reconciled to enable informed decisions.",
    "category": "Numerica",
    "features": [
      "Managing Accounts Receivable",
      "Accounts Payable",
      "Payroll and General Ledger",
      "Monthly bank and credit card reconciliations",
      "Expense tracking and classification"
    ],
    "icon": "finance-icon",
    "is_published": true,
    "created_at": "2023-11-15T10:30:00.000Z"
  }
]
```

## Services Content Management Flow

1. **Creating Services**:
   - Admin logs in using `/api/admin/login`
   - Uses the JWT token to create service entries
   - Sets `is_published` to false for drafts

2. **Updating Services**:
   - Admin can update any field of a service
   - Only fields included in the request body will be updated

3. **Publishing Services**:
   - Admin updates a service with `is_published: true`
   - Only published services are visible through public endpoints

4. **Retrieving Services**:
   - Public users can only see published services
   - Admin can see all services (published and unpublished)

5. **Organizing Services by Category**:
   - Services can be grouped by category (e.g., "Numerica", "Tax")
   - Both admin and public endpoints support filtering by category 