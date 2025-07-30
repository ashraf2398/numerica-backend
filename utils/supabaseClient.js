const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // This should match your .env file

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Key:', supabaseKey ? 'Set' : 'Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials are missing in environment variables');
  console.error('SUPABASE_URL:', supabaseUrl);
  console.error('SUPABASE_KEY:', supabaseKey ? 'Present' : 'Missing');
  console.warn('Server will run with mock data for development');
}

const supabase = createClient(supabaseUrl || 'https://invalid.supabase.co', supabaseKey || 'invalid-key');

module.exports = supabase; 