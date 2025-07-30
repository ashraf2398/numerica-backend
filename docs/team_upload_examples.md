# Team Module CRUD Operations with Image Upload

This document provides complete examples for all CRUD operations on team members, including both file uploads and URL-based images.

## Authentication

All requests require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 1. Create Team Member with File Upload

### Using FormData (File Upload)
```http
POST /api/admin/team
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Form Data:
- name: "John Doe"
- title: "Senior Accountant"
- description: "John has 10 years of experience in corporate accounting and tax planning."
- email: "john@numericatax.com"
- phone: "+1 (555) 123-4568"
- order_index: 2
- is_published: true
- social_media[linkedin]: "https://linkedin.com/in/johndoe"
- social_media[twitter]: "https://twitter.com/johndoe"
- image: [file upload]
```

### Using JSON (Image URL)
```http
POST /api/admin/team
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "John Doe",
  "title": "Senior Accountant",
  "description": "John has 10 years of experience in corporate accounting and tax planning.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  },
  "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  "email": "john@numericatax.com",
  "phone": "+1 (555) 123-4568",
  "order_index": 2,
  "is_published": true
}
```

**Response:**
```json
{
  "id": 2,
  "name": "John Doe",
  "title": "Senior Accountant",
  "description": "John has 10 years of experience in corporate accounting and tax planning.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  },
  "image": "http://localhost:3001/uploads/team/team-1703123456789-123456789.jpg",
  "email": "john@numericatax.com",
  "phone": "+1 (555) 123-4568",
  "order_index": 2,
  "is_published": true,
  "created_at": "2024-01-15T10:00:00.000Z"
}
```

## 2. Read All Team Members

```http
GET /api/admin/team
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ahmed Hassan",
    "title": "CEO & Founder",
    "description": "Ahmed has over 20 years of experience in tax consulting...",
    "social_media": {
      "twitter": "https://twitter.com/ahmedhassan",
      "linkedin": "https://linkedin.com/in/ahmedhassan"
    },
    "image": "http://localhost:3001/uploads/team/team-1703123456788-987654321.jpg",
    "email": "ahmed@numericatax.com",
    "phone": "+1 (555) 123-4567",
    "order_index": 1,
    "is_published": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "name": "John Doe",
    "title": "Senior Accountant",
    "description": "John has 10 years of experience in corporate accounting...",
    "social_media": {
      "linkedin": "https://linkedin.com/in/johndoe",
      "twitter": "https://twitter.com/johndoe"
    },
    "image": "http://localhost:3001/uploads/team/team-1703123456789-123456789.jpg",
    "email": "john@numericatax.com",
    "phone": "+1 (555) 123-4568",
    "order_index": 2,
    "is_published": true,
    "created_at": "2024-01-15T10:00:00.000Z"
  }
]
```

## 3. Read Single Team Member

```http
GET /api/admin/team/2
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "id": 2,
  "name": "John Doe",
  "title": "Senior Accountant",
  "description": "John has 10 years of experience in corporate accounting and tax planning.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "twitter": "https://twitter.com/johndoe"
  },
  "image": "http://localhost:3001/uploads/team/team-1703123456789-123456789.jpg",
  "email": "john@numericatax.com",
  "phone": "+1 (555) 123-4568",
  "order_index": 2,
  "is_published": true,
  "created_at": "2024-01-15T10:00:00.000Z"
}
```

## 4. Update Team Member

### Update with New File Upload
```http
PUT /api/admin/team/2
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data

Form Data:
- name: "John Doe Updated"
- title: "Senior Tax Consultant"
- description: "Updated: John has 12 years of experience in corporate accounting and tax planning."
- email: "john.updated@numericatax.com"
- phone: "+1 (555) 123-4569"
- order_index: 3
- is_published: false
- social_media[linkedin]: "https://linkedin.com/in/johndoe_updated"
- social_media[twitter]: "https://twitter.com/johndoe_updated"
- image: [new file upload]
```

### Update with Image URL
```http
PUT /api/admin/team/2
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "title": "Senior Tax Consultant",
  "description": "Updated: John has 12 years of experience in corporate accounting and tax planning.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe_updated",
    "twitter": "https://twitter.com/johndoe_updated"
  },
  "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  "email": "john.updated@numericatax.com",
  "phone": "+1 (555) 123-4569",
  "order_index": 3,
  "is_published": false
}
```

### Partial Update (Only Specific Fields)
```http
PUT /api/admin/team/2
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Senior Tax Consultant",
  "is_published": true
}
```

**Response:**
```json
{
  "id": 2,
  "name": "John Doe Updated",
  "title": "Senior Tax Consultant",
  "description": "Updated: John has 12 years of experience in corporate accounting and tax planning.",
  "social_media": {
    "linkedin": "https://linkedin.com/in/johndoe_updated",
    "twitter": "https://twitter.com/johndoe_updated"
  },
  "image": "http://localhost:3001/uploads/team/team-1703123456790-456789123.jpg",
  "email": "john.updated@numericatax.com",
  "phone": "+1 (555) 123-4569",
  "order_index": 3,
  "is_published": false,
  "created_at": "2024-01-15T10:00:00.000Z"
}
```

## 5. Update Team Members Order

```http
POST /api/admin/team/order
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "order": [
    {"id": 1, "order_index": 1},
    {"id": 2, "order_index": 2},
    {"id": 3, "order_index": 3}
  ]
}
```

**Response:**
```json
{
  "message": "Team order updated successfully"
}
```

## 6. Delete Team Member

```http
DELETE /api/admin/team/2
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "message": "Team member deleted successfully"
}
```

## Frontend Examples

### JavaScript with Fetch API

#### Create Team Member with File Upload
```javascript
async function createTeamMemberWithFile(formData) {
  try {
    const response = await fetch('http://localhost:3001/api/admin/team', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${yourJWTToken}`
        // Don't set Content-Type for FormData, let browser set it
      },
      body: formData
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating team member:', error);
  }
}

// Handle form submission
document.getElementById('teamForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('title', document.getElementById('title').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('phone', document.getElementById('phone').value);
  formData.append('order_index', document.getElementById('order_index').value);
  formData.append('is_published', document.getElementById('is_published').checked);
  formData.append('social_media[linkedin]', document.getElementById('linkedin').value);
  formData.append('social_media[twitter]', document.getElementById('twitter').value);
  formData.append('image', document.getElementById('image').files[0]);
  
  const result = await createTeamMemberWithFile(formData);
  console.log('Team member created:', result);
});
```

#### Create Team Member with Image URL
```javascript
async function createTeamMemberWithUrl(teamData) {
  try {
    const response = await fetch('http://localhost:3001/api/admin/team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourJWTToken}`
      },
      body: JSON.stringify(teamData)
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating team member:', error);
  }
}

// Usage
const teamData = {
  name: "John Doe",
  title: "Senior Accountant",
  description: "John has 10 years of experience...",
  social_media: {
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  },
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  email: "john@numericatax.com",
  phone: "+1 (555) 123-4568",
  order_index: 2,
  is_published: true
};

const result = await createTeamMemberWithUrl(teamData);
```

### React Example

```jsx
import React, { useState } from 'react';

function TeamMemberForm() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    order_index: 0,
    is_published: false,
    social_media: {
      linkedin: '',
      twitter: ''
    }
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [useFileUpload, setUseFileUpload] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (useFileUpload && imageFile) {
        // File upload
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key === 'social_media') {
            Object.keys(formData.social_media).forEach(socialKey => {
              formDataToSend.append(`social_media[${socialKey}]`, formData.social_media[socialKey]);
            });
          } else {
            formDataToSend.append(key, formData[key]);
          }
        });
        formDataToSend.append('image', imageFile);

        const response = await fetch('http://localhost:3001/api/admin/team', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${yourJWTToken}`
          },
          body: formDataToSend
        });

        const result = await response.json();
        console.log('Team member created with file:', result);
      } else if (!useFileUpload && imageUrl) {
        // URL upload
        const response = await fetch('http://localhost:3001/api/admin/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${yourJWTToken}`
          },
          body: JSON.stringify({
            ...formData,
            image: imageUrl
          })
        });

        const result = await response.json();
        console.log('Team member created with URL:', result);
      }
    } catch (error) {
      console.error('Error creating team member:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      
      <div>
        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>
      
      <div>
        <label>Image Upload Method:</label>
        <select value={useFileUpload} onChange={(e) => setUseFileUpload(e.target.value === 'true')}>
          <option value="true">File Upload</option>
          <option value="false">Image URL</option>
        </select>
      </div>
      
      {useFileUpload ? (
        <div>
          <label>Image File:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>
      ) : (
        <div>
          <label>Image URL:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
      )}
      
      <div>
        <label>LinkedIn:</label>
        <input
          type="url"
          value={formData.social_media.linkedin}
          onChange={(e) => setFormData({
            ...formData, 
            social_media: {...formData.social_media, linkedin: e.target.value}
          })}
        />
      </div>
      
      <div>
        <label>Twitter:</label>
        <input
          type="url"
          value={formData.social_media.twitter}
          onChange={(e) => setFormData({
            ...formData, 
            social_media: {...formData.social_media, twitter: e.target.value}
          })}
        />
      </div>
      
      <div>
        <label>Order Index:</label>
        <input
          type="number"
          value={formData.order_index}
          onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
        />
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
          />
          Published
        </label>
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Team Member'}
      </button>
    </form>
  );
}
```

## Important Notes

1. **File Size Limit**: 5MB maximum
2. **Supported Formats**: jpg, jpeg, png, gif, webp
3. **Field Name**: Use `image` for file uploads
4. **Content-Type**: Don't set it manually for FormData, let the browser handle it
5. **Authentication**: Always include your JWT token in the Authorization header
6. **Image URLs**: Uploaded images will be accessible at `/uploads/team/filename.jpg`
7. **Social Media**: The `social_media` field accepts any JSON object with platform URLs
8. **Partial Updates**: You can update only specific fields without providing all data

## Error Handling

### 400 Bad Request (Invalid Data)
```json
{
  "error": "Name and title are required"
}
```

### 400 Bad Request (File Too Large)
```json
{
  "error": "File too large. Maximum size is 5MB."
}
```

### 400 Bad Request (Invalid File Type)
```json
{
  "error": "Only image files are allowed!"
}
```

### 404 Not Found (Team Member Doesn't Exist)
```json
{
  "error": "Team member not found"
}
```

### 401 Unauthorized (Missing Token)
```json
{
  "error": "Access token required"
}
```

This completes the full CRUD cycle for team members with both file upload and URL-based image support! 