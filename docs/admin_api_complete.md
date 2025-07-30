# Complete Admin API Documentation

This document provides comprehensive CRUD operations for all admin endpoints. All endpoints require authentication with a JWT token.

## Authentication

Include the JWT token in the Authorization header for all admin requests:

```
Authorization: Bearer <your_jwt_token>
```

## 1. About Management

### Get All About Entries
```http
GET /api/admin/about
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "About Numérica",
    "content": "Numérica is a leading tax and accounting consulting firm...",
    "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    "mission": "To provide exceptional tax and accounting services...",
    "vision": "To be the most trusted financial partner...",
    "is_published": true,
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get About Entry by ID
```http
GET /api/admin/about/550e8400-e29b-41d4-a716-446655440000
```

### Create About Entry
```http
POST /api/admin/about
Content-Type: application/json

{
  "title": "New About Section",
  "content": "This is the content of the new about section...",
  "image_url": "https://example.com/image.jpg",
  "mission": "Our mission statement",
  "vision": "Our vision statement",
  "is_published": true
}
```

### Update About Entry
```http
PUT /api/admin/about/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "title": "Updated About Section",
  "content": "Updated content...",
  "is_published": false
}
```

### Delete About Entry
```http
DELETE /api/admin/about/550e8400-e29b-41d4-a716-446655440000
```

## 2. Categories Management

### Get All Categories
```http
GET /api/admin/categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Tax Services",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Category by ID
```http
GET /api/admin/categories/1
```

### Create Category
```http
POST /api/admin/categories
Content-Type: application/json

{
  "name": "New Category"
}
```

### Update Category
```http
PUT /api/admin/categories/1
Content-Type: application/json

{
  "name": "Updated Category Name"
}
```

### Delete Category
```http
DELETE /api/admin/categories/1
```

## 3. Services Management

### Get All Services
```http
GET /api/admin/services
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Tax Preparation & Planning",
    "description": "Comprehensive tax preparation and strategic planning services...",
    "category_id": 1,
    "features": ["Individual Tax Returns", "Business Tax Returns"],
    "icon": "tax-preparation-icon",
    "is_published": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Services by Category
```http
GET /api/admin/services/category/1
```

### Get Service by ID
```http
GET /api/admin/services/1
```

### Create Service
```http
POST /api/admin/services
Content-Type: application/json

{
  "title": "New Service",
  "description": "Service description...",
  "category_id": 1,
  "features": ["Feature 1", "Feature 2"],
  "icon": "service-icon",
  "is_published": true
}
```

### Update Service
```http
PUT /api/admin/services/1
Content-Type: application/json

{
  "title": "Updated Service Title",
  "description": "Updated description...",
  "is_published": false
}
```

### Delete Service
```http
DELETE /api/admin/services/1
```

## 4. Team Management

### Get All Team Members
```http
GET /api/admin/team
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ahmed Hassan",
    "title": "CEO & Founder",
    "description": "Ahmed has over 20 years of experience...",
    "social_media": {
      "twitter": "https://twitter.com/ahmedhassan",
      "linkedin": "https://linkedin.com/in/ahmedhassan"
    },
    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "email": "ahmed@numericatax.com",
    "phone": "+1 (555) 123-4567",
    "order_index": 1,
    "is_published": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Team Member by ID
```http
GET /api/admin/team/1
```

### Create Team Member
```http
POST /api/admin/team
Content-Type: application/json

{
  "name": "John Doe",
  "title": "Senior Accountant",
  "description": "John has 10 years of experience...",
  "social_media": {
    "twitter": "https://twitter.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe"
  },
  "image": "https://example.com/john.jpg",
  "email": "john@company.com",
  "phone": "+1 (555) 123-4568",
  "order_index": 2,
  "is_published": true
}
```

### Update Team Member
```http
PUT /api/admin/team/1
Content-Type: application/json

{
  "name": "Ahmed Hassan Updated",
  "title": "CEO & Founder",
  "is_published": false
}
```

### Delete Team Member
```http
DELETE /api/admin/team/1
```

### Update Team Order
```http
POST /api/admin/team/order
Content-Type: application/json

{
  "team_members": [
    {"id": 1, "order_index": 1},
    {"id": 2, "order_index": 2},
    {"id": 3, "order_index": 3}
  ]
}
```

## 5. Testimonials Management

### Get All Testimonials
```http
GET /api/admin/testimonials
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Smith",
    "content": "Numérica has been handling our company taxes for the past 5 years...",
    "company": "Tech Solutions Inc.",
    "position": "CEO",
    "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "display_order": 1,
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Testimonial by ID
```http
GET /api/admin/testimonials/1
```

### Create Testimonial
```http
POST /api/admin/testimonials
Content-Type: application/json

{
  "name": "Jane Doe",
  "content": "Excellent service and professional team...",
  "company": "Doe Enterprises",
  "position": "CFO",
  "avatar_url": "https://example.com/jane.jpg",
  "display_order": 2
}
```

### Update Testimonial
```http
PUT /api/admin/testimonials/1
Content-Type: application/json

{
  "name": "John Smith Updated",
  "content": "Updated testimonial content...",
  "display_order": 3
}
```

### Delete Testimonial
```http
DELETE /api/admin/testimonials/1
```

### Update Testimonials Order
```http
PUT /api/admin/testimonials/order
Content-Type: application/json

{
  "testimonials": [
    {"id": 1, "display_order": 1},
    {"id": 2, "display_order": 2},
    {"id": 3, "display_order": 3}
  ]
}
```

## 6. Trusted Companies Management

### Get All Trusted Companies
```http
GET /api/admin/trusted-companies
```

**Response:**
```json
[
  {
    "id": 1,
    "logo_url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
    "company_name": "Microsoft",
    "display_order": 1,
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Trusted Company by ID
```http
GET /api/admin/trusted-companies/1
```

### Create Trusted Company
```http
POST /api/admin/trusted-companies
Content-Type: application/json

{
  "logo_url": "https://example.com/logo.png",
  "company_name": "New Company",
  "display_order": 2
}
```

### Update Trusted Company
```http
PUT /api/admin/trusted-companies/1
Content-Type: application/json

{
  "logo_url": "https://example.com/updated-logo.png",
  "company_name": "Updated Company Name",
  "display_order": 1
}
```

### Delete Trusted Company
```http
DELETE /api/admin/trusted-companies/1
```

### Update Trusted Companies Order
```http
PUT /api/admin/trusted-companies/order
Content-Type: application/json

{
  "companies": [
    {"id": 1, "display_order": 1},
    {"id": 2, "display_order": 2},
    {"id": 3, "display_order": 3}
  ]
}
```

## 7. Articles Management

### Get All Articles
```http
GET /api/admin/articles
```

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "title": "Tax Planning Strategies for Small Businesses in 2024",
    "content": "Small businesses face unique tax challenges...",
    "author": "Ahmed Hassan",
    "featured_image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Search Articles
```http
GET /api/admin/articles/search?query=tax&author=Ahmed&limit=10&offset=0
```

### Get Article by ID
```http
GET /api/admin/articles/550e8400-e29b-41d4-a716-446655440010
```

### Create Article
```http
POST /api/admin/articles
Content-Type: application/json

{
  "title": "New Article Title",
  "content": "Article content goes here...",
  "author": "John Doe",
  "featured_image": "https://example.com/article-image.jpg"
}
```

### Update Article
```http
PUT /api/admin/articles/550e8400-e29b-41d4-a716-446655440010
Content-Type: application/json

{
  "title": "Updated Article Title",
  "content": "Updated article content...",
  "author": "Jane Smith"
}
```

### Delete Article
```http
DELETE /api/admin/articles/550e8400-e29b-41d4-a716-446655440010
```

## 8. Home Banners Management

### Get All Home Banners
```http
GET /api/admin/home-banners
```

**Response:**
```json
[
  {
    "id": 1,
    "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
    "title": "Professional Tax & Accounting Services",
    "subtitle": "Expert financial solutions for businesses and individuals...",
    "created_at": "2024-01-15T10:00:00.000Z",
    "updated_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Home Banner by ID
```http
GET /api/admin/home-banners/1
```

### Create Home Banner
```http
POST /api/admin/home-banners
Content-Type: application/json

{
  "image_url": "https://example.com/banner.jpg",
  "title": "New Banner Title",
  "subtitle": "New banner subtitle"
}
```

### Update Home Banner
```http
PUT /api/admin/home-banners/1
Content-Type: application/json

{
  "image_url": "https://example.com/updated-banner.jpg",
  "title": "Updated Banner Title",
  "subtitle": "Updated banner subtitle"
}
```

### Delete Home Banner
```http
DELETE /api/admin/home-banners/1
```

### Update Home Banners Order
```http
PUT /api/admin/home-banners/order
Content-Type: application/json

{
  "banners": [
    {"id": 1, "order": 1},
    {"id": 2, "order": 2},
    {"id": 3, "order": 3}
  ]
}
```

## 9. Contacts Management

### Get All Contacts
```http
GET /api/admin/contacts
```

**Response:**
```json
[
  {
    "id": 1,
    "addresses": ["123 Business District, Suite 100, New York, NY 10001"],
    "phones": ["+1 (555) 123-4567"],
    "emails": ["info@numericatax.com"],
    "is_published": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Contact by ID
```http
GET /api/admin/contacts/1
```

### Create Contact
```http
POST /api/admin/contacts
Content-Type: application/json

{
  "addresses": ["456 New Address, City, State 12345"],
  "phones": ["+1 (555) 987-6543"],
  "emails": ["contact@company.com"],
  "is_published": true
}
```

### Update Contact
```http
PUT /api/admin/contacts/1
Content-Type: application/json

{
  "addresses": ["789 Updated Address, City, State 12345"],
  "phones": ["+1 (555) 111-2222"],
  "is_published": false
}
```

### Delete Contact
```http
DELETE /api/admin/contacts/1
```

## 10. Consultation Requests Management

### Get All Consultation Requests
```http
GET /api/admin/consultations
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "phone": "+1 (555) 111-1111",
    "preferred_date": "2024-06-25T10:00:00.000Z",
    "message": "I need help with my small business tax planning...",
    "status": "pending",
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Consultation Request by ID
```http
GET /api/admin/consultations/1
```

### Update Consultation Request Status
```http
PUT /api/admin/consultations/1/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

### Delete Consultation Request
```http
DELETE /api/admin/consultations/1
```

## Error Responses

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "An error occurred while processing the request"
}
```

## Authentication Examples

### Login to Get Token
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "name": "Admin User"
  }
}
```

### Using the Token
```http
GET /api/admin/about
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Complete CRUD Workflow Example

Here's a complete example of managing testimonials:

### 1. Create a Testimonial
```http
POST /api/admin/testimonials
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Sarah Wilson",
  "content": "Excellent service and very professional team!",
  "company": "Wilson Corp",
  "position": "CEO",
  "avatar_url": "https://example.com/sarah.jpg",
  "display_order": 1
}
```

### 2. Get All Testimonials
```http
GET /api/admin/testimonials
Authorization: Bearer <token>
```

### 3. Update the Testimonial
```http
PUT /api/admin/testimonials/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated: Excellent service and very professional team!",
  "display_order": 2
}
```

### 4. Reorder Testimonials
```http
PUT /api/admin/testimonials/order
Authorization: Bearer <token>
Content-Type: application/json

{
  "testimonials": [
    {"id": 1, "display_order": 1},
    {"id": 2, "display_order": 2},
    {"id": 3, "display_order": 3}
  ]
}
```

### 5. Delete the Testimonial
```http
DELETE /api/admin/testimonials/1
Authorization: Bearer <token>
```

This completes the full CRUD cycle for testimonials. The same pattern applies to all other resources in the API. 