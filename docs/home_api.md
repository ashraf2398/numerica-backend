# Home Page Content Management API

This document describes the API endpoints for managing the home page content, including home banners, testimonials, and trusted companies sections.

## Authentication

All admin endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Admin Endpoints

### Home Banners

#### Get All Home Banners

Retrieves all home banners.

- **URL**: `/api/admin/home/banners`
- **Method**: `GET`
- **Auth required**: Yes
- **Permissions required**: Admin access

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
[
  {
    "id": 1,
    "image_url": "https://example.com/banner1.jpg",
    "title": "Welcome to Our Services",
    "subtitle": "Your success is our priority",
    "created_at": "2023-06-12T12:00:00.000Z",
    "updated_at": "2023-06-12T12:00:00.000Z"
  },
  {
    "id": 2,
    "image_url": "https://example.com/banner2.jpg",
    "title": "Expert Financial Services",
    "subtitle": "We help your business grow",
    "created_at": "2023-06-13T14:00:00.000Z",
    "updated_at": "2023-06-13T14:00:00.000Z"
  }
]
```

#### Get Single Home Banner

Retrieves a specific home banner by ID.

- **URL**: `/api/admin/home/banners/:id`
- **Method**: `GET`
- **Auth required**: Yes
- **Permissions required**: Admin access

**URL Parameters:**
- `id`: ID of the banner to retrieve

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "id": 1,
  "image_url": "https://example.com/banner1.jpg",
  "title": "Welcome to Our Services",
  "subtitle": "Your success is our priority",
  "created_at": "2023-06-12T12:00:00.000Z",
  "updated_at": "2023-06-12T12:00:00.000Z"
}
```

#### Create Home Banner

Creates a new home banner.

- **URL**: `/api/admin/home/banners`
- **Method**: `POST`
- **Auth required**: Yes
- **Permissions required**: Admin access

**Request Body:**
```json
{
  "image_url": "https://example.com/new-banner.jpg",
  "title": "New Banner Title",
  "subtitle": "New banner subtitle text"
}
```

**Success Response:**
- **Code**: 201 Created
- **Content example**:
```json
{
  "id": 3,
  "image_url": "https://example.com/new-banner.jpg",
  "title": "New Banner Title",
  "subtitle": "New banner subtitle text",
  "created_at": "2023-06-14T09:30:00.000Z",
  "updated_at": "2023-06-14T09:30:00.000Z"
}
```

#### Update Home Banner

Updates an existing home banner.

- **URL**: `/api/admin/home/banners/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **Permissions required**: Admin access

**URL Parameters:**
- `id`: ID of the banner to update

**Request Body:**
```json
{
  "image_url": "https://example.com/updated-banner.jpg",
  "title": "Updated Welcome Message",
  "subtitle": "We help your business grow"
}
```

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "id": 1,
  "image_url": "https://example.com/updated-banner.jpg",
  "title": "Updated Welcome Message",
  "subtitle": "We help your business grow",
  "created_at": "2023-06-12T12:00:00.000Z",
  "updated_at": "2023-06-14T10:45:00.000Z"
}
```

#### Delete Home Banner

Deletes a home banner.

- **URL**: `/api/admin/home/banners/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **Permissions required**: Admin access

**URL Parameters:**
- `id`: ID of the banner to delete

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "message": "Home banner deleted successfully"
}
```

### Testimonials

#### Get All Testimonials

Retrieves all testimonials.

- **URL**: `/api/admin/home/testimonials`
- **Method**: `GET`
- **Auth required**: Yes
- **Permissions required**: Admin access

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
[
  {
    "id": 1,
    "name": "Sarah Johnson",
    "content": "Numérica transformed our financial operations and helped us save thousands in tax liability.",
    "company": "TechStart Inc.",
    "position": "CEO",
    "avatar_url": null,
    "display_order": 1,
    "created_at": "2023-06-12T12:00:00.000Z",
    "updated_at": "2023-06-12T12:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Michael Chen",
    "content": "Their financial advisory services gave us the clarity we needed to scale our business effectively.",
    "company": "GrowSmart Solutions",
    "position": "Founder",
    "avatar_url": null,
    "display_order": 2,
    "created_at": "2023-06-12T12:00:00.000Z",
    "updated_at": "2023-06-12T12:00:00.000Z"
  }
]
```

#### Create Testimonial

Adds a new testimonial.

- **URL**: `/api/admin/home/testimonials`
- **Method**: `POST`
- **Auth required**: Yes
- **Permissions required**: Admin access

**Request Body:**
```json
{
  "name": "Alicia Martinez",
  "content": "The most responsive and thorough accounting team we've ever worked with. Highly recommended!",
  "company": "Nexus Enterprises",
  "position": "CFO",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

**Success Response:**
- **Code**: 201 Created
- **Content example**:
```json
{
  "id": 3,
  "name": "Alicia Martinez",
  "content": "The most responsive and thorough accounting team we've ever worked with. Highly recommended!",
  "company": "Nexus Enterprises",
  "position": "CFO",
  "avatar_url": "https://example.com/avatar.jpg",
  "display_order": 3,
  "created_at": "2023-06-13T10:15:00.000Z",
  "updated_at": "2023-06-13T10:15:00.000Z"
}
```

#### Update Testimonial

Updates an existing testimonial.

- **URL**: `/api/admin/home/testimonials/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **Permissions required**: Admin access

**URL Parameters:**
- `id`: ID of the testimonial to update

**Request Body:**
```json
{
  "content": "Updated testimonial content.",
  "company": "Updated Company Name"
}
```

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "id": 2,
  "name": "Michael Chen",
  "content": "Updated testimonial content.",
  "company": "Updated Company Name",
  "position": "Founder",
  "avatar_url": null,
  "display_order": 2,
  "created_at": "2023-06-12T12:00:00.000Z",
  "updated_at": "2023-06-13T11:20:00.000Z"
}
```

#### Delete Testimonial

Removes a testimonial.

- **URL**: `/api/admin/home/testimonials/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **Permissions required**: Admin access

**URL Parameters:**
- `id`: ID of the testimonial to delete

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "message": "Testimonial deleted successfully"
}
```

### Trusted Companies

#### Get Trusted Companies

Retrieves all trusted companies.

- **URL**: `/api/admin/home/trusted-companies`
- **Method**: `GET`
- **Auth required**: Yes
- **Permissions required**: Admin access

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
[
  {
    "id": 1,
    "logo_url": "https://example.com/company1-logo.png",
    "company_name": "Microsoft",
    "display_order": 1,
    "created_at": "2023-06-12T12:00:00.000Z",
    "updated_at": "2023-06-12T12:00:00.000Z"
  },
  {
    "id": 2,
    "logo_url": "https://example.com/company2-logo.png",
    "company_name": "Amazon",
    "display_order": 2,
    "created_at": "2023-06-12T12:00:00.000Z",
    "updated_at": "2023-06-12T12:00:00.000Z"
  }
]
```

#### Add Trusted Company

Adds a new trusted company.

- **URL**: `/api/admin/home/trusted-companies`
- **Method**: `POST`
- **Auth required**: Yes
- **Permissions required**: Admin access

**Request Body:**
```json
{
  "logo_url": "https://example.com/company6-logo.png",
  "company_name": "Facebook"
}
```

**Success Response:**
- **Code**: 201 Created
- **Content example**:
```json
{
  "id": 6,
  "logo_url": "https://example.com/company6-logo.png",
  "company_name": "Facebook",
  "display_order": 6,
  "created_at": "2023-06-13T14:30:00.000Z",
  "updated_at": "2023-06-13T14:30:00.000Z"
}
```

#### Update Trusted Company

Updates an existing trusted company.

- **URL**: `/api/admin/home/trusted-companies/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **Permissions required**: Admin access

**URL Parameters:**
- `id`: ID of the trusted company to update

**Request Body:**
```json
{
  "logo_url": "https://example.com/updated-logo.png",
  "company_name": "Meta"
}
```

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "id": 6,
  "logo_url": "https://example.com/updated-logo.png",
  "company_name": "Meta",
  "display_order": 6,
  "created_at": "2023-06-13T14:30:00.000Z",
  "updated_at": "2023-06-13T15:45:00.000Z"
}
```

#### Delete Trusted Company

Removes a trusted company.

- **URL**: `/api/admin/home/trusted-companies/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **Permissions required**: Admin access

**URL Parameters:**
- `id`: ID of the trusted company to delete

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "message": "Trusted company deleted successfully"
}
```

## Public Endpoints

### Get Home Page Content

Retrieves all content needed for the home page: banners, testimonials, and trusted companies.

- **URL**: `/api/public/home`
- **Method**: `GET`
- **Auth required**: No

**Success Response:**
- **Code**: 200 OK
- **Content example**:
```json
{
  "banners": [
    {
      "id": 1,
      "image_url": "https://example.com/banner1.jpg",
      "title": "Welcome to Our Services",
      "subtitle": "Your success is our priority",
      "created_at": "2023-06-12T12:00:00.000Z",
      "updated_at": "2023-06-12T12:00:00.000Z"
    },
    {
      "id": 2,
      "image_url": "https://example.com/banner2.jpg",
      "title": "Expert Financial Services",
      "subtitle": "We help your business grow",
      "created_at": "2023-06-13T14:00:00.000Z",
      "updated_at": "2023-06-13T14:00:00.000Z"
    }
  ],
  "testimonials": [
    {
      "id": 1,
      "name": "Sarah Johnson",
      "content": "Numérica transformed our financial operations and helped us save thousands in tax liability.",
      "company": "TechStart Inc.",
      "position": "CEO",
      "avatar_url": null,
      "display_order": 1,
      "created_at": "2023-06-12T12:00:00.000Z",
      "updated_at": "2023-06-12T12:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Michael Chen",
      "content": "Their financial advisory services gave us the clarity we needed to scale our business effectively.",
      "company": "GrowSmart Solutions",
      "position": "Founder",
      "avatar_url": null,
      "display_order": 2,
      "created_at": "2023-06-12T12:00:00.000Z",
      "updated_at": "2023-06-12T12:00:00.000Z"
    },
    {
      "id": 3,
      "name": "Alicia Martinez",
      "content": "The most responsive and thorough accounting team we've ever worked with. Highly recommended!",
      "company": "Nexus Enterprises",
      "position": "CFO",
      "avatar_url": "https://example.com/avatar.jpg",
      "display_order": 3,
      "created_at": "2023-06-13T10:15:00.000Z",
      "updated_at": "2023-06-13T10:15:00.000Z"
    }
  ],
  "trustedCompanies": [
    {
      "id": 1,
      "logo_url": "https://example.com/company1-logo.png",
      "company_name": "Microsoft",
      "display_order": 1,
      "created_at": "2023-06-12T12:00:00.000Z",
      "updated_at": "2023-06-12T12:00:00.000Z"
    },
    {
      "id": 2,
      "logo_url": "https://example.com/company2-logo.png",
      "company_name": "Amazon",
      "display_order": 2,
      "created_at": "2023-06-12T12:00:00.000Z",
      "updated_at": "2023-06-12T12:00:00.000Z"
    }
  ]
}
``` 