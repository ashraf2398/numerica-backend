# Postman Testing Guide for Railway API

## Base URL
Replace `YOUR_RAILWAY_URL` with your actual Railway deployment URL:
```
https://YOUR_RAILWAY_URL.railway.app
```

## 1. Health Check
**GET** `/health`
- **URL**: `https://YOUR_RAILWAY_URL.railway.app/health`
- **Expected Response**: 
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 2. Root Endpoint
**GET** `/`
- **URL**: `https://YOUR_RAILWAY_URL.railway.app/`
- **Expected Response**:
```json
{
  "message": "Welcome to the API",
  "version": "1.0.0",
  "endpoints": {
    "public": "/api/public",
    "admin": "/api/admin",
    "health": "/health"
  },
  "documentation": "Check the /health endpoint to verify the server is running"
}
```

## 3. About Routes Testing

### 3.1 Test Endpoint
**GET** `/api/public/test`
- **URL**: `https://YOUR_RAILWAY_URL.railway.app/api/public/test`
- **Expected Response**:
```json
{
  "message": "Server is working correctly",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "supabaseUrl": "Configured",
  "supabaseKey": "Configured"
}
```

### 3.2 Get All Published About Entries
**GET** `/api/public/about`
- **URL**: `https://YOUR_RAILWAY_URL.railway.app/api/public/about`
- **Expected Response**:
```json
[
  {
    "id": 1,
    "title": "About Numérica",
    "content": "Numérica is a leading financial services company...",
    "is_published": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Our Mission",
    "content": "Our mission is to empower businesses...",
    "is_published": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3.3 Get Single About Entry by ID
**GET** `/api/public/about/{id}`
- **URL**: `https://YOUR_RAILWAY_URL.railway.app/api/public/about/1`
- **Expected Response**:
```json
{
  "id": 1,
  "title": "About Numérica",
  "content": "Numérica is a leading financial services company...",
  "is_published": true,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## 4. Other Public Routes

### 4.1 Categories
- **GET** `/api/public/categories` - Get all categories
- **GET** `/api/public/categories/{id}` - Get category by ID

### 4.2 Services
- **GET** `/api/public/services` - Get all published services
- **GET** `/api/public/services/category/{category}` - Get services by category
- **GET** `/api/public/services/{id}` - Get service by ID

### 4.3 Contact
- **GET** `/api/public/contact` - Get published contact info
- **POST** `/api/public/consultations` - Submit consultation request

### 4.4 Team
- **GET** `/api/public/team` - Get all published team members
- **GET** `/api/public/team/{id}` - Get team member by ID

**Example Team Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "position": "CEO & Founder",
    "bio": "Experienced leader with over 15 years in the financial industry.",
    "image_url": "https://via.placeholder.com/300x300",
    "is_published": true,
    "order_index": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### 4.5 Home
- **GET** `/api/public/home` - Get home page content

## 5. Postman Collection Setup

### 5.1 Create a New Collection
1. Open Postman
2. Click "New" → "Collection"
3. Name it "Railway API Testing"

### 5.2 Set Collection Variables
1. Go to the collection settings
2. Click "Variables" tab
3. Add these variables:
   - `base_url`: `https://YOUR_RAILWAY_URL.railway.app`
   - `api_version`: `v1`

### 5.3 Create Request Folders
Create these folders in your collection:
- Health Check
- About Routes
- Categories
- Services
- Contact
- Team
- Home

## 6. Testing Steps

### Step 1: Test Health Check
1. Create a GET request to `{{base_url}}/health`
2. Send the request
3. Verify you get a 200 status with "Server is running" message

### Step 2: Test Root Endpoint
1. Create a GET request to `{{base_url}}/`
2. Send the request
3. Verify you get the API welcome message

### Step 3: Test About Routes
1. **Test Endpoint**: GET `{{base_url}}/api/public/test`
2. **All About**: GET `{{base_url}}/api/public/about`
3. **Single About**: GET `{{base_url}}/api/public/about/1`

### Step 4: Test Error Cases
1. **Invalid ID**: GET `{{base_url}}/api/public/about/999`
   - Should return 404 "About entry not found"

2. **Invalid Route**: GET `{{base_url}}/api/public/invalid`
   - Should return 404 "Resource not found"

## 7. Common Issues & Solutions

### Issue: "Resource not found" error
**Solution**: Check if your Railway URL is correct and the app is deployed

### Issue: Database connection errors
**Solution**: Verify environment variables are set in Railway dashboard

### Issue: CORS errors
**Solution**: Check if your frontend domain is in `ALLOWED_ORIGINS`

### Issue: 500 Internal Server Error
**Solution**: Check Railway logs for detailed error messages

## 8. Environment Variables Check

Before testing, ensure these are set in Railway:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `JWT_SECRET`
- `ALLOWED_ORIGINS`
- `NODE_ENV` (set to "production")

## 9. Expected Status Codes

- **200**: Success
- **400**: Bad Request
- **404**: Not Found
- **500**: Internal Server Error

## 10. Testing Checklist

- [ ] Health check endpoint works
- [ ] Root endpoint returns API info
- [ ] About routes return data
- [ ] Error handling works correctly
- [ ] CORS is configured properly
- [ ] Database connection is working 