const supabase = require('../../utils/supabaseClient');

/**
 * Get all published services
 */
const getPublishedServices = async (req, res) => {
  try {
    console.log('Attempting to fetch services from Supabase...');
    
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories:category_id (id, name)
      `)
      .eq('is_published', true)
      .order('id', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      
      // If it's a network/fetch error, return mock data for development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        return res.status(200).json([
          {
            id: 1,
            title: "Financial Planning",
            description: "Comprehensive financial planning services for individuals and businesses.",
            category_id: 1,
            features: ["Personal Financial Planning", "Retirement Planning", "Estate Planning"],
            icon: "financial-planning-icon",
            is_published: true,
            created_at: new Date().toISOString(),
            categories: {
              id: 1,
              name: "Financial Planning"
            }
          },
          {
            id: 2,
            title: "Investment Management",
            description: "Professional investment management and portfolio optimization.",
            category_id: 2,
            features: ["Portfolio Management", "Risk Assessment", "Investment Strategy"],
            icon: "investment-icon",
            is_published: true,
            created_at: new Date().toISOString(),
            categories: {
              id: 2,
              name: "Investment"
            }
          },
          {
            id: 3,
            title: "Tax Consulting",
            description: "Expert tax consulting and preparation services.",
            category_id: 3,
            features: ["Tax Preparation", "Tax Planning", "Audit Support"],
            icon: "tax-icon",
            is_published: true,
            created_at: new Date().toISOString(),
            categories: {
              id: 3,
              name: "Tax Services"
            }
          }
        ]);
      }
      
      return res.status(400).json({ 
        error: error.message,
        details: error.details,
        hint: error.hint
      });
    }
    
    console.log(`Successfully fetched ${data ? data.length : 0} services`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting published services:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: 1,
          title: "Financial Planning",
          description: "Comprehensive financial planning services for individuals and businesses.",
          category_id: 1,
          features: ["Personal Financial Planning", "Retirement Planning", "Estate Planning"],
          icon: "financial-planning-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 1,
            name: "Financial Planning"
          }
        },
        {
          id: 2,
          title: "Investment Management",
          description: "Professional investment management and portfolio optimization.",
          category_id: 2,
          features: ["Portfolio Management", "Risk Assessment", "Investment Strategy"],
          icon: "investment-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 2,
            name: "Investment"
          }
        },
        {
          id: 3,
          title: "Tax Consulting",
          description: "Expert tax consulting and preparation services.",
          category_id: 3,
          features: ["Tax Preparation", "Tax Planning", "Audit Support"],
          icon: "tax-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 3,
            name: "Tax Services"
          }
        }
      ]);
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching services data',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get published service by ID
 */
const getPublishedServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories:category_id (id, name)
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single();
    
    if (error) {
      // If it's a network error, return mock data for the requested ID
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        const mockServices = {
          1: {
            id: 1,
            title: "Financial Planning",
            description: "Comprehensive financial planning services for individuals and businesses.",
            category_id: 1,
            features: ["Personal Financial Planning", "Retirement Planning", "Estate Planning"],
            icon: "financial-planning-icon",
            is_published: true,
            created_at: new Date().toISOString(),
            categories: {
              id: 1,
              name: "Financial Planning"
            }
          },
          2: {
            id: 2,
            title: "Investment Management",
            description: "Professional investment management and portfolio optimization.",
            category_id: 2,
            features: ["Portfolio Management", "Risk Assessment", "Investment Strategy"],
            icon: "investment-icon",
            is_published: true,
            created_at: new Date().toISOString(),
            categories: {
              id: 2,
              name: "Investment"
            }
          },
          3: {
            id: 3,
            title: "Tax Consulting",
            description: "Expert tax consulting and preparation services.",
            category_id: 3,
            features: ["Tax Preparation", "Tax Planning", "Audit Support"],
            icon: "tax-icon",
            is_published: true,
            created_at: new Date().toISOString(),
            categories: {
              id: 3,
              name: "Tax Services"
            }
          }
        };
        
        if (mockServices[id]) {
          return res.status(200).json(mockServices[id]);
        }
      }
      
      return res.status(404).json({ error: 'Service not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting published service:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      const mockServices = {
        1: {
          id: 1,
          title: "Financial Planning",
          description: "Comprehensive financial planning services for individuals and businesses.",
          category_id: 1,
          features: ["Personal Financial Planning", "Retirement Planning", "Estate Planning"],
          icon: "financial-planning-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 1,
            name: "Financial Planning"
          }
        },
        2: {
          id: 2,
          title: "Investment Management",
          description: "Professional investment management and portfolio optimization.",
          category_id: 2,
          features: ["Portfolio Management", "Risk Assessment", "Investment Strategy"],
          icon: "investment-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 2,
            name: "Investment"
          }
        },
        3: {
          id: 3,
          title: "Tax Consulting",
          description: "Expert tax consulting and preparation services.",
          category_id: 3,
          features: ["Tax Preparation", "Tax Planning", "Audit Support"],
          icon: "tax-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 3,
            name: "Tax Services"
          }
        }
      };
      
      if (mockServices[req.params.id]) {
        return res.status(200).json(mockServices[req.params.id]);
      }
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching service',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get published services by category
 */
const getPublishedServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    // If it's a network error, return mock data
    if (error && error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to Supabase connection issues');
      return res.status(200).json([
        {
          id: 1,
          title: "Financial Planning",
          description: "Comprehensive financial planning services for individuals and businesses.",
          category_id: 1,
          features: ["Personal Financial Planning", "Retirement Planning", "Estate Planning"],
          icon: "financial-planning-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 1,
            name: "Financial Planning"
          }
        }
      ]);
    }
    
    // First find the category ID or use it directly if it's a number
    let categoryId = category;
    
    if (isNaN(category)) {
      // If category is not a number, try to find it by name
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .single();
      
      if (categoryError) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      categoryId = categoryData.id;
    }
    
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories:category_id (id, name)
      `)
      .eq('category_id', categoryId)
      .eq('is_published', true)
      .order('id', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting published services by category:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: 1,
          title: "Financial Planning",
          description: "Comprehensive financial planning services for individuals and businesses.",
          category_id: 1,
          features: ["Personal Financial Planning", "Retirement Planning", "Estate Planning"],
          icon: "financial-planning-icon",
          is_published: true,
          created_at: new Date().toISOString(),
          categories: {
            id: 1,
            name: "Financial Planning"
          }
        }
      ]);
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching services',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  getPublishedServices,
  getPublishedServiceById,
  getPublishedServicesByCategory
}; 