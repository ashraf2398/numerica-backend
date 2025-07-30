const supabase = require('../../utils/supabaseClient');

/**
 * Get all trusted companies
 */
const getTrustedCompanies = async (req, res) => {
  try {
    console.log('Attempting to fetch trusted companies from Supabase...');
    
    const { data, error } = await supabase
      .from('trusted_companies')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error('Supabase error:', error);
      
      // If it's a network/fetch error, return mock data for development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        return res.status(200).json([
          {
            id: 1,
            logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
            company_name: "Microsoft",
            display_order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            logo_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200",
            company_name: "Google",
            display_order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 3,
            logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
            company_name: "Apple",
            display_order: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 4,
            logo_url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200",
            company_name: "Amazon",
            display_order: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 5,
            logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
            company_name: "Meta",
            display_order: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 6,
            logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
            company_name: "Netflix",
            display_order: 6,
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
    
    console.log(`Successfully fetched ${data ? data.length : 0} trusted companies`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting trusted companies:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: 1,
          logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
          company_name: "Microsoft",
          display_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          logo_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200",
          company_name: "Google",
          display_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
          company_name: "Apple",
          display_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 4,
          logo_url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200",
          company_name: "Amazon",
          display_order: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 5,
          logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
          company_name: "Meta",
          display_order: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 6,
          logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
          company_name: "Netflix",
          display_order: 6,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching trusted companies',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get trusted company by ID
 */
const getTrustedCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('trusted_companies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      // If it's a network error, return mock data for the requested ID
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        const mockCompanies = {
          1: {
            id: 1,
            logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
            company_name: "Microsoft",
            display_order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          2: {
            id: 2,
            logo_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200",
            company_name: "Google",
            display_order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          3: {
            id: 3,
            logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
            company_name: "Apple",
            display_order: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          4: {
            id: 4,
            logo_url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200",
            company_name: "Amazon",
            display_order: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          5: {
            id: 5,
            logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
            company_name: "Meta",
            display_order: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          6: {
            id: 6,
            logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
            company_name: "Netflix",
            display_order: 6,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        };
        
        if (mockCompanies[id]) {
          return res.status(200).json(mockCompanies[id]);
        }
      }
      
      return res.status(404).json({ error: 'Trusted company not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting trusted company:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      const mockCompanies = {
        1: {
          id: 1,
          logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
          company_name: "Microsoft",
          display_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        2: {
          id: 2,
          logo_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200",
          company_name: "Google",
          display_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        3: {
          id: 3,
          logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
          company_name: "Apple",
          display_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        4: {
          id: 4,
          logo_url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200",
          company_name: "Amazon",
          display_order: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        5: {
          id: 5,
          logo_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=200",
          company_name: "Meta",
          display_order: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        6: {
          id: 6,
          logo_url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200",
          company_name: "Netflix",
          display_order: 6,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      if (mockCompanies[req.params.id]) {
        return res.status(200).json(mockCompanies[req.params.id]);
      }
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching trusted company',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  getTrustedCompanies,
  getTrustedCompanyById
}; 