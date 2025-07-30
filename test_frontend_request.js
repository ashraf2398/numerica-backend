const axios = require('axios');

// Test different request formats
async function testRequestFormats() {
  const baseURL = 'http://localhost:3001/api/admin/home-banners/3';
  const JWT_TOKEN = 'YOUR_JWT_TOKEN_HERE'; // Replace with your token
  
  const testData = {
    title: "Professional Tax & Accountings",
    subtitle: "Expert financial solutions for businesses and individuals. Trust our certified professionals to handle your tax and accounting needs.",
    image_url: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };

  console.log('🧪 Testing different request formats...\n');

  // Test 1: JSON format
  try {
    console.log('1️⃣ Testing JSON format...');
    const response1 = await axios.put(baseURL, testData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    console.log('✅ JSON format success:', response1.data);
  } catch (error) {
    console.log('❌ JSON format failed:', error.response?.data || error.message);
  }

  // Test 2: URL-encoded format
  try {
    console.log('\n2️⃣ Testing URL-encoded format...');
    const formData = new URLSearchParams();
    formData.append('title', testData.title);
    formData.append('subtitle', testData.subtitle);
    formData.append('image_url', testData.image_url);
    
    const response2 = await axios.put(baseURL, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    console.log('✅ URL-encoded format success:', response2.data);
  } catch (error) {
    console.log('❌ URL-encoded format failed:', error.response?.data || error.message);
  }

  // Test 3: FormData format
  try {
    console.log('\n3️⃣ Testing FormData format...');
    const formData = new FormData();
    formData.append('title', testData.title);
    formData.append('subtitle', testData.subtitle);
    formData.append('image_url', testData.image_url);
    
    const response3 = await axios.put(baseURL, formData, {
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
        // Note: Don't set Content-Type for FormData, let axios set it
      }
    });
    console.log('✅ FormData format success:', response3.data);
  } catch (error) {
    console.log('❌ FormData format failed:', error.response?.data || error.message);
  }
}

// Instructions
console.log('📋 Instructions:');
console.log('1. Replace JWT_TOKEN with your actual token');
console.log('2. Make sure your server is running');
console.log('3. This will test different ways to send data to the API\n');

// Uncomment to run tests
// testRequestFormats();

module.exports = { testRequestFormats }; 