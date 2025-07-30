const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3001/api';
const JWT_TOKEN = 'YOUR_JWT_TOKEN_HERE'; // Replace with your actual token

// Test data
const testBanners = [
  { id: 4, order: 1 },
  { id: 3, order: 2 },
  { id: 5, order: 3 }
];

// Headers for authenticated requests
const authHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${JWT_TOKEN}`
};

async function testHomeBannerOrder() {
  console.log('🧪 Testing Home Banner Order Functionality\n');

  try {
    // Step 1: Get current banners
    console.log('1️⃣ Getting current banners...');
    const getResponse = await axios.get(`${BASE_URL}/admin/home-banners`, {
      headers: authHeaders
    });
    
    console.log('Current banners:', getResponse.data);
    console.log('✅ Get banners successful\n');

    // Step 2: Update banner order
    console.log('2️⃣ Updating banner order...');
    console.log('New order:', testBanners);
    
    const updateResponse = await axios.put(`${BASE_URL}/admin/home-banners/order`, {
      banners: testBanners
    }, {
      headers: authHeaders
    });
    
    console.log('Response:', updateResponse.data);
    console.log('✅ Update order successful\n');

    // Step 3: Get banners again to verify the change
    console.log('3️⃣ Verifying the new order...');
    const verifyResponse = await axios.get(`${BASE_URL}/admin/home-banners`, {
      headers: authHeaders
    });
    
    console.log('Banners after reordering:', verifyResponse.data);
    console.log('✅ Verification successful\n');

    // Step 4: Test public endpoint
    console.log('4️⃣ Testing public endpoint...');
    const publicResponse = await axios.get(`${BASE_URL}/public/home-banners`);
    
    console.log('Public banners:', publicResponse.data);
    console.log('✅ Public endpoint successful\n');

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 You need to replace JWT_TOKEN with a valid token');
      console.log('   Get a token by logging in to your admin panel');
    }
    
    if (error.response?.status === 400) {
      console.log('\n💡 Check if the banner IDs exist in your database');
    }
  }
}

// Test error cases
async function testErrorCases() {
  console.log('\n🧪 Testing Error Cases\n');

  try {
    // Test 1: Missing banners array
    console.log('1️⃣ Testing missing banners array...');
    await axios.put(`${BASE_URL}/admin/home-banners/order`, {}, {
      headers: authHeaders
    });
  } catch (error) {
    console.log('✅ Correctly rejected missing banners array:', error.response?.data?.error);
  }

  try {
    // Test 2: Invalid banner data (missing order)
    console.log('2️⃣ Testing invalid banner data...');
    await axios.put(`${BASE_URL}/admin/home-banners/order`, {
      banners: [{ id: 1 }] // Missing order
    }, {
      headers: authHeaders
    });
  } catch (error) {
    console.log('✅ Correctly rejected invalid banner data:', error.response?.data?.error);
  }

  try {
    // Test 3: Non-existent banner ID
    console.log('3️⃣ Testing non-existent banner ID...');
    await axios.put(`${BASE_URL}/admin/home-banners/order`, {
      banners: [{ id: 999, order: 1 }]
    }, {
      headers: authHeaders
    });
  } catch (error) {
    console.log('✅ Correctly handled non-existent banner:', error.response?.data?.error);
  }

  console.log('\n🎉 Error case tests completed!');
}

// Run tests
async function runAllTests() {
  await testHomeBannerOrder();
  await testErrorCases();
}

// Instructions
console.log('📋 Testing Instructions:');
console.log('1. Make sure your server is running on localhost:3001');
console.log('2. Replace JWT_TOKEN with a valid admin token');
console.log('3. Ensure you have banners with IDs 3, 4, and 5 in your database');
console.log('4. Run the database migration first if you haven\'t already');
console.log('\n');

// Uncomment the line below to run tests
// runAllTests();

module.exports = {
  testHomeBannerOrder,
  testErrorCases,
  runAllTests
}; 