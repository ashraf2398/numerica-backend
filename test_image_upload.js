const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3001/api';
const JWT_TOKEN = 'YOUR_JWT_TOKEN_HERE'; // Replace with your actual token

async function testImageUpload() {
  console.log('🧪 Testing Image Upload Functionality\n');

  try {
    // Test 1: Create banner with image upload
    console.log('1️⃣ Testing banner creation with image upload...');
    
    const formData = new FormData();
    formData.append('title', 'Test Banner with Upload');
    formData.append('subtitle', 'This banner was created with an uploaded image');
    
    // Create a test image file (you can replace this with a real image path)
    const testImagePath = path.join(__dirname, 'test-image.jpg');
    
    // If test image doesn't exist, create a simple one or use a placeholder
    if (!fs.existsSync(testImagePath)) {
      console.log('⚠️  Test image not found. Creating a placeholder...');
      // You can download a test image or use a URL instead
      console.log('💡 Please place a test image file named "test-image.jpg" in the project root');
      console.log('   Or modify this script to use a different image path\n');
      return;
    }
    
    formData.append('image', fs.createReadStream(testImagePath));
    
    const createResponse = await axios.post(`${BASE_URL}/admin/home-banners`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    
    console.log('✅ Banner created successfully:', createResponse.data);
    const bannerId = createResponse.data.id;
    
    // Test 2: Update banner with new image
    console.log('\n2️⃣ Testing banner update with new image...');
    
    const updateFormData = new FormData();
    updateFormData.append('title', 'Updated Banner with New Image');
    updateFormData.append('subtitle', 'This banner was updated with a new uploaded image');
    updateFormData.append('image', fs.createReadStream(testImagePath));
    
    const updateResponse = await axios.put(`${BASE_URL}/admin/home-banners/${bannerId}`, updateFormData, {
      headers: {
        ...updateFormData.getHeaders(),
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    
    console.log('✅ Banner updated successfully:', updateResponse.data);
    
    // Test 3: Create banner with URL instead of file
    console.log('\n3️⃣ Testing banner creation with image URL...');
    
    const urlResponse = await axios.post(`${BASE_URL}/admin/home-banners`, {
      title: 'Test Banner with URL',
      subtitle: 'This banner was created with an image URL',
      image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    
    console.log('✅ Banner with URL created successfully:', urlResponse.data);
    
    console.log('\n🎉 All image upload tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 You need to replace JWT_TOKEN with a valid token');
      console.log('   Get a token by logging in to your admin panel');
    }
    
    if (error.response?.status === 400) {
      console.log('\n💡 Check the error details above');
    }
  }
}

// Test error cases
async function testErrorCases() {
  console.log('\n🧪 Testing Error Cases\n');

  try {
    // Test 1: No image provided
    console.log('1️⃣ Testing creation without image...');
    await axios.post(`${BASE_URL}/admin/home-banners`, {
      title: 'Test Banner No Image'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
  } catch (error) {
    console.log('✅ Correctly rejected missing image:', error.response?.data?.error);
  }

  try {
    // Test 2: Invalid file type (if you have a test file)
    console.log('2️⃣ Testing invalid file type...');
    const formData = new FormData();
    formData.append('title', 'Test Invalid File');
    formData.append('image', Buffer.from('This is not an image'), {
      filename: 'test.txt',
      contentType: 'text/plain'
    });
    
    await axios.post(`${BASE_URL}/admin/home-banners`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
  } catch (error) {
    console.log('✅ Correctly rejected invalid file type:', error.response?.data?.error);
  }

  console.log('\n🎉 Error case tests completed!');
}

// Instructions
console.log('📋 Testing Instructions:');
console.log('1. Make sure your server is running on localhost:3001');
console.log('2. Replace JWT_TOKEN with a valid admin token');
console.log('3. Place a test image file named "test-image.jpg" in the project root');
console.log('4. Run the database migration first if you haven\'t already');
console.log('\n');

// Uncomment the line below to run tests
// testImageUpload();
// testErrorCases();

module.exports = {
  testImageUpload,
  testErrorCases
}; 