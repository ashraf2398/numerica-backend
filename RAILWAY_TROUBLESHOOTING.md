# Railway Deployment Troubleshooting Guide

## 🚨 **Critical Issues to Fix**

### **1. Environment Variables (MOST IMPORTANT)**

You MUST set these environment variables in Railway:

#### **Required Variables:**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-public-key
JWT_SECRET=your-strong-jwt-secret-key
NODE_ENV=production
```

#### **Optional but Recommended:**
```
ALLOWED_ORIGINS=https://your-frontend-domain.com
JWT_EXPIRES_IN=1d
FRONTEND_URL=https://your-frontend-domain.com
```

### **2. How to Set Environment Variables in Railway:**

1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to the "Variables" tab
4. Add each variable with its exact value

## 🔍 **Step-by-Step Debugging**

### **Step 1: Test Basic Connectivity**

Test these endpoints in order:

1. **Health Check:**
   ```
   GET https://numerica-backend-production.up.railway.app/health
   ```
   **Expected:** `{"status": "ok", "message": "Server is running"}`

2. **Root Endpoint:**
   ```
   GET https://numerica-backend-production.up.railway.app/
   ```
   **Expected:** Welcome message with API info

3. **Test Endpoint:**
   ```
   GET https://numerica-backend-production.up.railway.app/api/public/test
   ```
   **Expected:** Server status with Supabase configuration info

### **Step 2: Check Supabase Connection**

The test endpoint will show:
- `supabaseUrl: "Configured"` or `"Missing"`
- `supabaseKey: "Configured"` or `"Missing"`

If either shows "Missing", you need to set the environment variables.

### **Step 3: Test Data Endpoints**

1. **About:**
   ```
   GET https://numerica-backend-production.up.railway.app/api/public/about
   ```

2. **Team:**
   ```
   GET https://numerica-backend-production.up.railway.app/api/public/team
   ```

3. **Services:**
   ```
   GET https://numerica-backend-production.up.railway.app/api/public/services
   ```

### **Step 4: Test Login**

**Login Endpoint:**
```
POST https://numerica-backend-production.up.railway.app/api/admin/login
Content-Type: application/json

{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

## 🛠️ **Common Issues & Solutions**

### **Issue 1: "TypeError: fetch failed"**
**Cause:** Missing or incorrect Supabase credentials
**Solution:** Set `SUPABASE_URL` and `SUPABASE_KEY` in Railway

### **Issue 2: "JWT_SECRET is not defined"**
**Cause:** Missing JWT secret
**Solution:** Set `JWT_SECRET` in Railway

### **Issue 3: CORS Errors**
**Cause:** Frontend domain not in allowed origins
**Solution:** Set `ALLOWED_ORIGINS` in Railway

### **Issue 4: "Resource not found"**
**Cause:** Wrong URL or route doesn't exist
**Solution:** Check URL includes `/api/` prefix

### **Issue 5: Login fails but works locally**
**Cause:** Environment variables not set correctly
**Solution:** Verify all required variables are set

## 📋 **Environment Variables Checklist**

Before testing, ensure these are set in Railway:

- [ ] `SUPABASE_URL` - Your Supabase project URL
- [ ] `SUPABASE_KEY` - Your Supabase anon/public key
- [ ] `JWT_SECRET` - A strong secret key for JWT
- [ ] `NODE_ENV` - Set to "production"
- [ ] `ALLOWED_ORIGINS` - Your frontend domain(s)
- [ ] `JWT_EXPIRES_IN` - Token expiration (e.g., "1d")
- [ ] `FRONTEND_URL` - Your frontend URL

## 🔧 **Quick Fixes**

### **For Immediate Testing:**

1. **Set NODE_ENV to development temporarily:**
   ```
   NODE_ENV=development
   ```
   This will allow all origins and use mock data if Supabase fails.

2. **Test with mock data:**
   If Supabase connection fails, the API will return mock data instead of errors.

### **For Production:**

1. **Set all required environment variables**
2. **Set NODE_ENV to production**
3. **Verify Supabase credentials are correct**

## 📊 **Testing Checklist**

- [ ] Health check works
- [ ] Root endpoint returns API info
- [ ] Test endpoint shows Supabase is configured
- [ ] About endpoint returns data
- [ ] Team endpoint returns data
- [ ] Services endpoint returns data
- [ ] Login endpoint works
- [ ] CORS is configured properly

## 🚀 **Deployment Steps**

1. **Set all environment variables in Railway**
2. **Redeploy the application**
3. **Test each endpoint in order**
4. **Check Railway logs for errors**
5. **Verify frontend can connect**

## 📞 **If Still Having Issues**

1. **Check Railway logs** for specific error messages
2. **Verify environment variables** are set correctly
3. **Test endpoints one by one** to isolate the problem
4. **Compare local vs Railway** environment variables

## 🎯 **Most Common Solution**

The most common issue is missing environment variables. Set these in Railway:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-public-key
JWT_SECRET=your-strong-secret-key
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

After setting these, redeploy and test again! 