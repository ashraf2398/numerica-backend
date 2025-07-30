const supabase = require('../../utils/supabaseClient');

/**
 * Get all home banners
 */
const getHomeBanners = async (req, res) => {
  try {
    console.log('Attempting to fetch home banners from Supabase...');
    
    const { data, error } = await supabase
      .from('home_banner')
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
            image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
            title: "Professional Tax & Accounting Services",
            subtitle: "Expert financial solutions for businesses and individuals. Trust our certified professionals to handle your tax and accounting needs.",
            display_order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
            title: "Strategic Financial Planning",
            subtitle: "Plan your financial future with confidence. Our comprehensive planning services help you achieve your long-term goals.",
            display_order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 3,
            image_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200",
            title: "Business Consulting Excellence",
            subtitle: "Transform your business with our strategic consulting services. We help companies grow, optimize, and succeed.",
            display_order: 3,
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
    
    console.log(`Successfully fetched ${data ? data.length : 0} home banners`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting home banners:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: 1,
          image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
          title: "Professional Tax & Accounting Services",
          subtitle: "Expert financial solutions for businesses and individuals. Trust our certified professionals to handle your tax and accounting needs.",
          display_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
          title: "Strategic Financial Planning",
          subtitle: "Plan your financial future with confidence. Our comprehensive planning services help you achieve your long-term goals.",
          display_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          image_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200",
          title: "Business Consulting Excellence",
          subtitle: "Transform your business with our strategic consulting services. We help companies grow, optimize, and succeed.",
          display_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    }
    
    return res.status(500).json({ error: 'An error occurred while fetching home banners' });
  }
};

/**
 * Get home banner by ID
 */
const getHomeBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('home_banner')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      // If it's a network error, return mock data for the requested ID
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        const mockBanners = {
          1: {
            id: 1,
            image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
            title: "Professional Tax & Accounting Services",
            subtitle: "Expert financial solutions for businesses and individuals. Trust our certified professionals to handle your tax and accounting needs.",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          2: {
            id: 2,
            image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
            title: "Strategic Financial Planning",
            subtitle: "Plan your financial future with confidence. Our comprehensive planning services help you achieve your long-term goals.",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          3: {
            id: 3,
            image_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200",
            title: "Business Consulting Excellence",
            subtitle: "Transform your business with our strategic consulting services. We help companies grow, optimize, and succeed.",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        };
        
        if (mockBanners[id]) {
          return res.status(200).json(mockBanners[id]);
        }
      }
      
      return res.status(404).json({ error: 'Home banner not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting home banner:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      const mockBanners = {
        1: {
          id: 1,
          image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200",
          title: "Professional Tax & Accounting Services",
          subtitle: "Expert financial solutions for businesses and individuals. Trust our certified professionals to handle your tax and accounting needs.",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        2: {
          id: 2,
          image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
          title: "Strategic Financial Planning",
          subtitle: "Plan your financial future with confidence. Our comprehensive planning services help you achieve your long-term goals.",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        3: {
          id: 3,
          image_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200",
          title: "Business Consulting Excellence",
          subtitle: "Transform your business with our strategic consulting services. We help companies grow, optimize, and succeed.",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      if (mockBanners[req.params.id]) {
        return res.status(200).json(mockBanners[req.params.id]);
      }
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching home banner',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  getHomeBanners,
  getHomeBannerById
}; 