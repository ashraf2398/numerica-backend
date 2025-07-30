# Railway Deployment Setup Guide

## Required Environment Variables

Make sure to set these environment variables in your Railway project dashboard:

### Database Configuration
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon/public key

### JWT Configuration
- `JWT_SECRET` - A strong secret key for JWT token signing
- `JWT_EXPIRES_IN` - JWT token expiration time (e.g., "1d", "7d")

### CORS Configuration
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins (e.g., "https://yourdomain.com,https://www.yourdomain.com")

### Frontend Configuration
- `FRONTEND_URL` - Your frontend application URL

### Optional
- `NODE_ENV` - Set to "production" for production deployment
- `PORT` - Railway will set this automatically

## How to Set Environment Variables in Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to the "Variables" tab
4. Add each environment variable with its corresponding value

## Testing Your Deployment

After deployment, test these endpoints:

1. **Health Check**: `https://your-railway-url.railway.app/health`
2. **Root Endpoint**: `https://your-railway-url.railway.app/`
3. **Public API**: `https://your-railway-url.railway.app/api/public/test`

## Common Issues

1. **"Resource not found" error**: Usually means the app is running but the route doesn't exist
2. **Database connection errors**: Check if `SUPABASE_URL` and `SUPABASE_KEY` are set correctly
3. **CORS errors**: Verify `ALLOWED_ORIGINS` includes your frontend domain 

## 🚨 **Important Notes:**

1. **For Production**: Always set specific allowed origins, don't use wildcard `*`
2. **Include all variations**: If your frontend can be accessed via `www` and non-`www`, include both
3. **Check Railway Logs**: The updated code will log CORS decisions to help debug

## **To Debug Further:**

Check your Railway logs to see:
- What origin is being blocked
- What origins are currently allowed
- Whether the request is reaching your server

**What's your frontend URL?** I can help you set the exact `ALLOWED_ORIGINS` value you need.

## Quick Test

You can also test if the API is accessible by making a request directly to:

```
https://numerica-backend-production.up.railway.app/health
```

If this works but your frontend still gets CORS errors, then it's definitely a CORS configuration issue. 