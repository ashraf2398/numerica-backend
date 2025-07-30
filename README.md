# Numérica Tax & Accounting Backend API

Complete REST API for managing tax and accounting consulting company content.

## 🚀 Quick Start

```bash
npm install
npm start
```

## 🔐 Authentication

### Get JWT Token
```http
POST /api/admin/login
{
  "email": "admin@example.com",
  "password": "password"
}
```

### Use Token
```http
Authorization: Bearer <your_jwt_token>
```

## 📋 CRUD Operations & Mandatory Fields

### 1. About Management

**Create:**
```http
POST /api/admin/about
{
  "title": "About Us",           // REQUIRED
  "content": "Content...",       // REQUIRED
  "image_url": "url",           // REQUIRED
  "mission": "Mission...",      // REQUIRED
  "vision": "Vision...",        // REQUIRED
  "is_published": true          // REQUIRED
}
```

**Update:**
```http
PUT /api/admin/about/:id
{
  "title": "Updated Title",
  "is_published": false
}
```

### 2. Categories

**Create:**
```http
POST /api/admin/categories
{
  "name": "Tax Services"        // REQUIRED
}
```

### 3. Services

**Create:**
```http
POST /api/admin/services
{
  "title": "Service Name",      // REQUIRED
  "description": "Desc...",     // REQUIRED
  "category_id": 1,            // REQUIRED
  "features": ["f1", "f2"],    // REQUIRED
  "icon": "icon-name",         // REQUIRED
  "is_published": true         // REQUIRED
}
```

### 4. Team Members

**Create:**
```http
POST /api/admin/team
{
  "name": "John Doe",          // REQUIRED
  "title": "Accountant",       // REQUIRED
  "description": "Bio...",     // REQUIRED
  "social_media": {            // REQUIRED
    "twitter": "url",
    "linkedin": "url"
  },
  "image": "image-url",        // REQUIRED
  "email": "email@domain",     // REQUIRED
  "phone": "+1234567890",      // REQUIRED
  "order_index": 1,           // REQUIRED
  "is_published": true        // REQUIRED
}
```

**Update Order:**
```http
POST /api/admin/team/order
{
  "team_members": [
    {"id": 1, "order_index": 1},
    {"id": 2, "order_index": 2}
  ]
}
```

### 5. Testimonials

**Create:**
```http
POST /api/admin/testimonials
{
  "name": "Client Name",       // REQUIRED
  "content": "Testimonial...", // REQUIRED
  "company": "Company Name",   // REQUIRED
  "position": "CEO",          // OPTIONAL
  "avatar_url": "url",        // OPTIONAL
  "display_order": 1          // AUTO if not provided
}
```

**Update Order:**
```http
PUT /api/admin/testimonials/order
{
  "testimonials": [
    {"id": 1, "display_order": 1},
    {"id": 2, "display_order": 2}
  ]
}
```

### 6. Trusted Companies

**Create:**
```http
POST /api/admin/trusted-companies
{
  "logo_url": "logo-url",     // REQUIRED
  "company_name": "Company",   // REQUIRED
  "display_order": 1          // AUTO if not provided
}
```

### 7. Articles

**Create:**
```http
POST /api/admin/articles
{
  "title": "Article Title",    // REQUIRED
  "content": "Content...",     // REQUIRED
  "author": "Author Name",     // REQUIRED
  "featured_image": "url"      // OPTIONAL
}
```

**Search:**
```http
GET /api/admin/articles/search?query=tax&author=John&limit=10&offset=0
```

### 8. Home Banners

**Create:**
```http
POST /api/admin/home-banners
{
  "image_url": "banner-url",  // REQUIRED
  "title": "Banner Title",    // REQUIRED
  "subtitle": "Subtitle"      // OPTIONAL
}
```

### 9. Contacts

**Create:**
```http
POST /api/admin/contacts
{
  "addresses": ["Address 1"], // REQUIRED
  "phones": ["+1234567890"],  // REQUIRED
  "emails": ["email@domain"], // REQUIRED
  "is_published": true        // REQUIRED
}
```

### 10. Consultation Requests

**Update Status:**
```http
PUT /api/admin/consultations/:id/status
{
  "status": "confirmed"       // pending, confirmed, completed, cancelled
}
```

## 📡 All Endpoints

### Public (No Auth)
- `GET /api/public/test` - Test endpoint
- `GET /api/public/about` - Get about content
- `GET /api/public/categories` - Get categories
- `GET /api/public/services` - Get services
- `GET /api/public/contact` - Get contact info
- `POST /api/public/consultations` - Submit consultation
- `GET /api/public/team` - Get team members
- `GET /api/public/testimonials` - Get testimonials
- `GET /api/public/trusted-companies` - Get companies
- `GET /api/public/articles` - Get articles
- `GET /api/public/home-banners` - Get banners
- `GET /api/public/home` - Get all home content

### Admin (Auth Required)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current user
- `GET/POST/PUT/DELETE /api/admin/about` - About CRUD
- `GET/POST/PUT/DELETE /api/admin/categories` - Categories CRUD
- `GET/POST/PUT/DELETE /api/admin/services` - Services CRUD
- `GET/POST/PUT/DELETE /api/admin/team` - Team CRUD
- `POST /api/admin/team/order` - Update team order
- `GET/POST/PUT/DELETE /api/admin/testimonials` - Testimonials CRUD
- `PUT /api/admin/testimonials/order` - Update testimonials order
- `GET/POST/PUT/DELETE /api/admin/trusted-companies` - Companies CRUD
- `PUT /api/admin/trusted-companies/order` - Update companies order
- `GET/POST/PUT/DELETE /api/admin/articles` - Articles CRUD
- `GET /api/admin/articles/search` - Search articles
- `GET/POST/PUT/DELETE /api/admin/home-banners` - Banners CRUD
- `PUT /api/admin/home-banners/order` - Update banners order
- `GET/POST/PUT/DELETE /api/admin/contacts` - Contacts CRUD
- `GET /api/admin/consultations` - Get consultation requests
- `PUT /api/admin/consultations/:id/status` - Update consultation status
- `DELETE /api/admin/consultations/:id` - Delete consultation

## ⚠️ Error Responses

```json
{
  "error": "Error message"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## 🔧 Environment Variables

```env
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
ALLOWED_ORIGINS=http://localhost:3000
```

## 📚 Complete Documentation

See [docs/admin_api_complete.md](./docs/admin_api_complete.md) for detailed examples and workflows.
