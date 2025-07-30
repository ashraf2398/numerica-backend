const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Simple test to debug upload issue
async function testSimpleUpload() {
  const BASE_URL = 'http://localhost:3001/api';
  const JWT_TOKEN = 'YOUR_JWT_TOKEN_HERE'; // Replace with your token
  
  console.log('🧪 Testing Simple Upload...\n');

  try {
    // Test 1: Simple form data without file
    console.log('1️⃣ Testing form data without file...');
    
    const formData = new FormData();
    formData.append('title', 'Test Title');
    formData.append('subtitle', 'Test Subtitle');
    
    const response1 = await axios.post(`${BASE_URL}/admin/home-banners`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    
    console.log('✅ Form data without file success:', response1.data);
  } catch (error) {
    console.log('❌ Form data without file failed:', error.response?.data || error.message);
  }

  try {
    // Test 2: JSON data
    console.log('\n2️⃣ Testing JSON data...');
    
    const response2 = await axios.post(`${BASE_URL}/admin/home-banners`, {
      title: 'Test JSON Title',
      subtitle: 'Test JSON Subtitle',
      image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    
    console.log('✅ JSON data success:', response2.data);
  } catch (error) {
    console.log('❌ JSON data failed:', error.response?.data || error.message);
  }

  try {
    // Test 3: Form data with file (if test image exists)
    console.log('\n3️⃣ Testing form data with file...');
    
    const testImagePath = './test-image.jpg';
    if (fs.existsSync(testImagePath)) {
      const formData = new FormData();
      formData.append('title', 'Test File Upload');
      formData.append('subtitle', 'Test File Upload Subtitle');
      formData.append('image', fs.createReadStream(testImagePath));
      
      const response3 = await axios.post(`${BASE_URL}/admin/home-banners`, formData, {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${JWT_TOKEN}`
        }
      });
      
      console.log('✅ File upload success:', response3.data);
    } else {
      console.log('⚠️  Test image not found, skipping file upload test');
    }
  } catch (error) {
    console.log('❌ File upload failed:', error.response?.data || error.message);
  }
}

// Instructions
console.log('📋 Instructions:');
console.log('1. Replace JWT_TOKEN with your actual token');
console.log('2. Make sure your server is running');
console.log('3. This will test different upload scenarios\n');

// Uncomment to run test
// testSimpleUpload();

module.exports = { testSimpleUpload }; 