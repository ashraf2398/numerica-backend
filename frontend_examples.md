# Frontend Examples for Image Upload

## 1. HTML Form with File Upload

```html
<form id="bannerForm" enctype="multipart/form-data">
  <div>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required>
  </div>
  
  <div>
    <label for="subtitle">Subtitle:</label>
    <textarea id="subtitle" name="subtitle"></textarea>
  </div>
  
  <div>
    <label for="image">Image:</label>
    <input type="file" id="image" name="image" accept="image/*" required>
  </div>
  
  <button type="submit">Create Banner</button>
</form>
```

## 2. JavaScript with Fetch API

```javascript
// Create banner with image upload
async function createBanner(formData) {
  try {
    const response = await fetch('http://localhost:3001/api/admin/home-banners', {
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
    console.error('Error creating banner:', error);
  }
}

// Handle form submission
document.getElementById('bannerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('title', document.getElementById('title').value);
  formData.append('subtitle', document.getElementById('subtitle').value);
  formData.append('image', document.getElementById('image').files[0]);
  
  const result = await createBanner(formData);
  console.log('Banner created:', result);
});
```

## 3. JavaScript with Axios

```javascript
import axios from 'axios';

// Create banner with image upload
const createBanner = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/api/admin/home-banners',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${yourJWTToken}`
          // Don't set Content-Type for FormData, let axios set it
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating banner:', error);
  }
};

// Usage
const formData = new FormData();
formData.append('title', 'My Banner');
formData.append('subtitle', 'Banner subtitle');
formData.append('image', fileInput.files[0]);

const result = await createBanner(formData);
```

## 4. React Example

```jsx
import React, { useState } from 'react';
import axios from 'axios';

function BannerForm() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('image', image);

      const response = await axios.post(
        'http://localhost:3001/api/admin/home-banners',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${yourJWTToken}`
          }
        }
      );

      console.log('Banner created:', response.data);
      // Reset form
      setTitle('');
      setSubtitle('');
      setImage(null);
    } catch (error) {
      console.error('Error creating banner:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label>Subtitle:</label>
        <textarea
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      
      <div>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Banner'}
      </button>
    </form>
  );
}
```

## 5. Update Banner with Image

```javascript
// Update banner with new image
const updateBanner = async (id, formData) => {
  try {
    const response = await fetch(`http://localhost:3001/api/admin/home-banners/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${yourJWTToken}`
      },
      body: formData
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating banner:', error);
  }
};

// Usage
const formData = new FormData();
formData.append('title', 'Updated Title');
formData.append('image', newImageFile); // Optional: only if updating image

const result = await updateBanner(bannerId, formData);
```

## 6. Alternative: Create with Image URL

```javascript
// Create banner with image URL instead of file upload
const createBannerWithUrl = async (bannerData) => {
  try {
    const response = await fetch('http://localhost:3001/api/admin/home-banners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourJWTToken}`
      },
      body: JSON.stringify({
        title: bannerData.title,
        subtitle: bannerData.subtitle,
        image_url: bannerData.imageUrl
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating banner:', error);
  }
};
```

## Important Notes

1. **File Size Limit**: 5MB maximum
2. **Supported Formats**: jpg, jpeg, png, gif, webp
3. **Field Name**: Use `image` for file uploads
4. **Content-Type**: Don't set it manually for FormData, let the browser/axios handle it
5. **Authentication**: Always include your JWT token in the Authorization header
6. **Image URLs**: Uploaded images will be accessible at `/uploads/banners/filename.jpg` 