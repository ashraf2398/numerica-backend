const supabase = require('../../utils/supabaseClient');

/**
 * Get home page content
 * Returns all the content needed for the home page: banners, testimonials, and trusted companies
 */
const getHomePageContent = async (req, res) => {
  try {
    // Get home banners
    const { data: banners, error: bannersError } = await supabase
      .from('home_banner')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (bannersError) {
      console.error('Error fetching banners:', bannersError);
    }
    
    // Get testimonials
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (testimonialsError) {
      console.error('Error fetching testimonials:', testimonialsError);
    }
    
    // Get trusted companies
    const { data: trustedCompanies, error: trustedCompaniesError } = await supabase
      .from('trusted_companies')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (trustedCompaniesError) {
      console.error('Error fetching trusted companies:', trustedCompaniesError);
    }
    
    // Return all content
    return res.status(200).json({
      banners: banners || [],
      testimonials: testimonials || [],
      trustedCompanies: trustedCompanies || []
    });
  } catch (error) {
    console.error('Error getting home page content:', error);
    return res.status(500).json({ error: 'An error occurred while fetching home page content' });
  }
};

module.exports = {
  getHomePageContent
}; 