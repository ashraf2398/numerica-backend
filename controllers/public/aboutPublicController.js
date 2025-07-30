const supabase = require('../../utils/supabaseClient');

/**
 * Test endpoint to verify server is working
 */
const testEndpoint = async (req, res) => {
  return res.status(200).json({ 
    message: 'Server is working correctly',
    timestamp: new Date().toISOString(),
    supabaseUrl: process.env.SUPABASE_URL ? 'Configured' : 'Missing',
    supabaseKey: process.env.SUPABASE_KEY ? 'Configured' : 'Missing'
  });
};

/**
 * Get all published about entries for public access
 */
const getPublishedAboutEntries = async (req, res) => {
  try {
    console.log('Attempting to fetch about entries from Supabase...');
    
    // Try to connect to Supabase
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .eq('is_published', true)
      .order('id', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      
      // If it's a network/fetch error, return mock data for development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        return res.status(200).json([
          {
            id: "550e8400-e29b-41d4-a716-446655440000",
            title: "About Numérica",
            content: "Numérica is a leading financial services company dedicated to providing innovative solutions for businesses and individuals. With years of experience in the financial sector, we help our clients achieve their financial goals through personalized services and expert guidance.",
            image_url: "https://example.com/images/about/company.jpg",
            mission: "To empower businesses and individuals with the financial tools and knowledge they need to succeed.",
            vision: "To be the most trusted financial partner for growth and prosperity.",
            is_published: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440001",
            title: "Our Mission",
            content: "Our mission is to empower businesses and individuals with the financial tools and knowledge they need to succeed. We believe in building long-term relationships based on trust, transparency, and exceptional service.",
            image_url: "https://example.com/images/about/mission.jpg",
            mission: "To provide exceptional financial services that drive success and growth.",
            vision: "To create lasting value for our clients through innovative financial solutions.",
            is_published: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
      }
      
      return res.status(400).json({ 
        error: error.message,
        details: error.details,
        hint: error.hint
      });
    }
    
    console.log(`Successfully fetched ${data ? data.length : 0} about entries`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting published about entries:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          title: "About Numérica",
          content: "Numérica is a leading financial services company dedicated to providing innovative solutions for businesses and individuals. With years of experience in the financial sector, we help our clients achieve their financial goals through personalized services and expert guidance.",
          image_url: "https://example.com/images/about/company.jpg",
          mission: "To empower businesses and individuals with the financial tools and knowledge they need to succeed.",
          vision: "To be the most trusted financial partner for growth and prosperity.",
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440001",
          title: "Our Mission",
          content: "Our mission is to empower businesses and individuals with the financial tools and knowledge they need to succeed. We believe in building long-term relationships based on trust, transparency, and exceptional service.",
          image_url: "https://example.com/images/about/mission.jpg",
          mission: "To provide exceptional financial services that drive success and growth.",
          vision: "To create lasting value for our clients through innovative financial solutions.",
          is_published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching about data',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get single published about entry for public access
 */
const getPublishedAboutEntry = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'About entry not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting published about entry:', error);
    return res.status(500).json({ error: 'An error occurred while fetching about entry' });
  }
};

module.exports = {
  testEndpoint,
  getPublishedAboutEntries,
  getPublishedAboutEntry
}; 