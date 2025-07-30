# Dashboard Statistics API Documentation

## Base URL
- Admin endpoints: `http://localhost:3001/api/admin`

## Authentication
All dashboard endpoints require authentication with a JWT token.

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints

### 1. Get Dashboard Statistics
Retrieves comprehensive statistics for all entities in the system.

**URL**: `/admin/dashboard/stats`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Success Response (200 OK)**:
```json
{
  "total_counts": {
    "team_members": 5,
    "contacts": 3,
    "consultation_requests": 12,
    "articles": 8,
    "services": 15,
    "testimonials": 7,
    "trusted_companies": 4,
    "about_entries": 2,
    "categories": 6
  },
  "published_counts": {
    "team_members": 4,
    "services": 12,
    "articles": 6,
    "testimonials": 5,
    "trusted_companies": 3,
    "about_entries": 1
  },
  "consultation_status": {
    "pending": 8,
    "completed": 3,
    "cancelled": 1
  },
  "recent_consultations": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "preferred_date": "2024-01-15T10:00:00.000Z",
      "message": "I need help with tax planning",
      "status": "pending",
      "created_at": "2024-01-10T14:30:00.000Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+0987654321",
      "preferred_date": "2024-01-16T11:00:00.000Z",
      "message": "Looking for accounting services",
      "status": "pending",
      "created_at": "2024-01-09T16:45:00.000Z"
    }
  ],
  "summary": {
    "total_entities": 62,
    "total_published": 31,
    "pending_consultations": 8
  }
}
```

**Response Fields Explanation**:

#### `total_counts`
- `team_members`: Total number of team members
- `contacts`: Total number of contact entries
- `consultation_requests`: Total number of consultation requests
- `articles`: Total number of articles
- `services`: Total number of services
- `testimonials`: Total number of testimonials
- `trusted_companies`: Total number of trusted companies
- `about_entries`: Total number of about entries
- `categories`: Total number of categories

#### `published_counts`
- `team_members`: Number of published team members
- `services`: Number of published services
- `articles`: Number of published articles
- `testimonials`: Number of published testimonials
- `trusted_companies`: Number of published trusted companies
- `about_entries`: Number of published about entries

#### `consultation_status`
- `pending`: Number of pending consultation requests
- `completed`: Number of completed consultation requests
- `cancelled`: Number of cancelled consultation requests

#### `recent_consultations`
Array of the 5 most recent consultation requests with full details.

#### `summary`
- `total_entities`: Sum of all entity counts
- `total_published`: Sum of all published entity counts
- `pending_consultations`: Number of pending consultations (same as consultation_status.pending)

---

### 2. Get Entity Statistics by Date Range
Retrieves statistics for a specific entity grouped by date within a date range.

**URL**: `/admin/dashboard/stats/entity`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Query Parameters**:
- `entity` (required): The entity to get statistics for
  - Valid values: `team_members`, `contacts`, `consultation_requests`, `articles`, `services`, `testimonials`, `trusted_companies`, `about`, `categories`
- `start_date` (optional): Start date in ISO format (YYYY-MM-DD)
- `end_date` (optional): End date in ISO format (YYYY-MM-DD)

**Example Request**:
```bash
curl -X GET "http://localhost:3001/api/admin/dashboard/stats/entity?entity=consultation_requests&start_date=2024-01-01&end_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Success Response (200 OK)**:
```json
{
  "entity": "consultation_requests",
  "date_range": {
    "start_date": "2024-01-01",
    "end_date": "2024-01-31"
  },
  "stats": {
    "2024-01-05": 2,
    "2024-01-10": 1,
    "2024-01-15": 3,
    "2024-01-20": 1,
    "2024-01-25": 2
  },
  "total": 9
}
```

**Response Fields Explanation**:
- `entity`: The entity that was queried
- `date_range`: The date range used for the query
- `stats`: Object where keys are dates (YYYY-MM-DD) and values are counts
- `total`: Total count for the entire date range

**Error Response (400 Bad Request)**:
```json
{
  "error": "Entity parameter is required"
}
```

---

## cURL Examples

### Get Dashboard Statistics
```bash
curl -X GET http://localhost:3001/api/admin/dashboard/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Consultation Requests by Date Range
```bash
curl -X GET "http://localhost:3001/api/admin/dashboard/stats/entity?entity=consultation_requests&start_date=2024-01-01&end_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Team Members by Date Range
```bash
curl -X GET "http://localhost:3001/api/admin/dashboard/stats/entity?entity=team_members&start_date=2024-01-01" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get All Articles (no date range)
```bash
curl -X GET "http://localhost:3001/api/admin/dashboard/stats/entity?entity=articles" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Postman Collection

### Get Dashboard Statistics
- **Method**: `GET`
- **URL**: `http://localhost:3001/api/admin/dashboard/stats`
- **Headers**: 
  - `Authorization: Bearer YOUR_JWT_TOKEN`

### Get Entity Statistics by Date
- **Method**: `GET`
- **URL**: `http://localhost:3001/api/admin/dashboard/stats/entity`
- **Headers**: 
  - `Authorization: Bearer YOUR_JWT_TOKEN`
- **Query Params**:
  - `entity`: `consultation_requests`
  - `start_date`: `2024-01-01`
  - `end_date`: `2024-01-31`

---

## Use Cases

### 1. Admin Dashboard Overview
Use `/dashboard/stats` to display:
- Total counts for each entity type
- Published vs unpublished content
- Consultation request status breakdown
- Recent consultation requests
- Summary statistics

### 2. Analytics and Reporting
Use `/dashboard/stats/entity` to:
- Track growth over time
- Analyze trends by date
- Generate reports for specific periods
- Monitor consultation request patterns

### 3. Content Management
Use the statistics to:
- Identify unpublished content that needs attention
- Monitor consultation request backlogs
- Track content creation activity
- Plan content publishing schedules

---

## Performance Notes

- The dashboard statistics endpoint performs multiple database queries in parallel for optimal performance
- Recent consultations are limited to 5 records to maintain fast response times
- Date range queries are optimized with proper indexing on `created_at` fields
- All counts use Supabase's efficient count queries with `head: true` for minimal data transfer

---

## Error Handling

- **401 Unauthorized**: Invalid or missing JWT token
- **400 Bad Request**: Missing required parameters (entity)
- **500 Internal Server Error**: Database connection issues or other server errors

All errors return JSON responses with descriptive error messages. 