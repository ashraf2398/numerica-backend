# Authentication API Documentation

## Base URL
```
http://localhost:3001/api/admin
```

## Endpoints

### 1. Register
Creates a new user account.

**URL**: `/register`  
**Method**: `POST`  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Success Response (201 Created)**:
```json
{
  "message": "Registration successful. Please check your email for confirmation.",
  "user": {
    "id": "c4a112cb-c342-4996-bb5b-872a40b4ec65",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Email and password are required"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "User already registered"
}
```

---

### 2. Login
Authenticates a user and returns a JWT token.

**URL**: `/login`  
**Method**: `POST`  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Success Response (200 OK)**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "c4a112cb-c342-4996-bb5b-872a40b4ec65",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Invalid login credentials"
}
```

---

### 3. Forgot Password
Sends a password reset email to the user.

**URL**: `/forgot-password`  
**Method**: `POST`  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Success Response (200 OK)**:
```json
{
  "message": "Password reset instructions sent to your email"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "Email is required"
}
```

---

### 4. Reset Password
Resets the user's password.

**URL**: `/reset-password`  
**Method**: `POST`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body**:
```json
{
  "password": "newSecurePassword123"
}
```

**Success Response (200 OK)**:
```json
{
  "message": "Password updated successfully"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "error": "New password is required"
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Access denied. No token provided."
}
```

---

### 5. Get Current User
Returns information about the currently authenticated user.

**URL**: `/me`  
**Method**: `GET`  
**Auth Required**: Yes (JWT Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**:
```json
{
  "user": {
    "id": "c4a112cb-c342-4996-bb5b-872a40b4ec65",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin"
  }
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "error": "Access denied. No token provided."
}
```

**Error Response (403 Forbidden)**:
```json
{
  "error": "Invalid token."
}
```

## Authentication Flow

1. **Registration**:
   - Call `/register` with email, password, and name
   - Receive user ID and confirmation message
   - Check email for verification (if email verification is enabled in Supabase)

2. **Login**:
   - Call `/login` with email and password
   - Receive JWT token
   - Store token securely for subsequent requests

3. **Password Recovery**:
   - Call `/forgot-password` with email
   - User receives email with reset link
   - User clicks link and is redirected to frontend
   - Frontend extracts token from URL
   - Frontend lets user enter new password
   - Call `/reset-password` with new password and token in Authorization header

4. **Using Protected Endpoints**:
   - Include JWT token in Authorization header for all protected endpoints
   - Example: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 