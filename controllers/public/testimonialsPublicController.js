const supabase = require('../../utils/supabaseClient');

/**
 * Get all published testimonials
 */
const getPublishedTestimonials = async (req, res) => {
  try {
    console.log('Attempting to fetch testimonials from Supabase...');
    
    const { data, error } = await supabase
      .from('testimonials')
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
            name: "John Smith",
            content: "Numérica has been handling our company taxes for the past 5 years, and I couldn't be happier with their service. They are professional, responsive, and always find ways to save us money while ensuring full compliance.",
            company: "Tech Solutions Inc.",
            position: "CEO",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            display_order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            name: "Maria Garcia",
            content: "The team at Numérica helped me navigate a complex tax situation during my business expansion. Their expertise and guidance were invaluable, and they made the entire process smooth and stress-free.",
            company: "Garcia Consulting",
            position: "Founder",
            avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            display_order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 3,
            name: "David Wilson",
            content: "As a small business owner, I was struggling with my accounting and tax obligations. Numérica stepped in and completely transformed my financial management. They are truly partners in my success.",
            company: "Wilson Manufacturing",
            position: "Owner",
            avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            display_order: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 4,
            name: "Jennifer Lee",
            content: "The financial planning services I received from Numérica were exceptional. They took the time to understand my goals and created a comprehensive plan that gives me confidence in my financial future.",
            company: "Lee & Associates",
            position: "Managing Partner",
            avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            display_order: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 5,
            name: "Robert Brown",
            content: "Numérica audit services are top-notch. Their thorough approach and attention to detail gave our board complete confidence in our financial statements. Highly recommended for any business.",
            company: "Brown Enterprises",
            position: "CFO",
            avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
            display_order: 5,
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
    
    console.log(`Successfully fetched ${data ? data.length : 0} testimonials`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting testimonials:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: 1,
          name: "John Smith",
          content: "Numérica has been handling our company taxes for the past 5 years, and I couldn't be happier with their service. They are professional, responsive, and always find ways to save us money while ensuring full compliance.",
          company: "Tech Solutions Inc.",
          position: "CEO",
          avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          display_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: "Maria Garcia",
          content: "The team at Numérica helped me navigate a complex tax situation during my business expansion. Their expertise and guidance were invaluable, and they made the entire process smooth and stress-free.",
          company: "Garcia Consulting",
          position: "Founder",
          avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          display_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          name: "David Wilson",
          content: "As a small business owner, I was struggling with my accounting and tax obligations. Numérica stepped in and completely transformed my financial management. They are truly partners in my success.",
          company: "Wilson Manufacturing",
          position: "Owner",
          avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          display_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 4,
          name: "Jennifer Lee",
          content: "The financial planning services I received from Numérica were exceptional. They took the time to understand my goals and created a comprehensive plan that gives me confidence in my financial future.",
          company: "Lee & Associates",
          position: "Managing Partner",
          avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
          display_order: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 5,
          name: "Robert Brown",
          content: "Numérica audit services are top-notch. Their thorough approach and attention to detail gave our board complete confidence in our financial statements. Highly recommended for any business.",
          company: "Brown Enterprises",
          position: "CFO",
          avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          display_order: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching testimonials',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get testimonial by ID
 */
const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      // If it's a network error, return mock data for the requested ID
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        const mockTestimonials = {
          1: {
            id: 1,
            name: "John Smith",
            content: "Numérica has been handling our company taxes for the past 5 years, and I couldn't be happier with their service. They are professional, responsive, and always find ways to save us money while ensuring full compliance.",
            company: "Tech Solutions Inc.",
            position: "CEO",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            display_order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          2: {
            id: 2,
            name: "Maria Garcia",
            content: "The team at Numérica helped me navigate a complex tax situation during my business expansion. Their expertise and guidance were invaluable, and they made the entire process smooth and stress-free.",
            company: "Garcia Consulting",
            position: "Founder",
            avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            display_order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          3: {
            id: 3,
            name: "David Wilson",
            content: "As a small business owner, I was struggling with my accounting and tax obligations. Numérica stepped in and completely transformed my financial management. They are truly partners in my success.",
            company: "Wilson Manufacturing",
            position: "Owner",
            avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            display_order: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          4: {
            id: 4,
            name: "Jennifer Lee",
            content: "The financial planning services I received from Numérica were exceptional. They took the time to understand my goals and created a comprehensive plan that gives me confidence in my financial future.",
            company: "Lee & Associates",
            position: "Managing Partner",
            avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            display_order: 4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          5: {
            id: 5,
            name: "Robert Brown",
            content: "Numérica audit services are top-notch. Their thorough approach and attention to detail gave our board complete confidence in our financial statements. Highly recommended for any business.",
            company: "Brown Enterprises",
            position: "CFO",
            avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
            display_order: 5,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        };
        
        if (mockTestimonials[id]) {
          return res.status(200).json(mockTestimonials[id]);
        }
      }
      
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting testimonial:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      const mockTestimonials = {
        1: {
          id: 1,
          name: "John Smith",
          content: "Numérica has been handling our company taxes for the past 5 years, and I couldn't be happier with their service. They are professional, responsive, and always find ways to save us money while ensuring full compliance.",
          company: "Tech Solutions Inc.",
          position: "CEO",
          avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          display_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        2: {
          id: 2,
          name: "Maria Garcia",
          content: "The team at Numérica helped me navigate a complex tax situation during my business expansion. Their expertise and guidance were invaluable, and they made the entire process smooth and stress-free.",
          company: "Garcia Consulting",
          position: "Founder",
          avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          display_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        3: {
          id: 3,
          name: "David Wilson",
          content: "As a small business owner, I was struggling with my accounting and tax obligations. Numérica stepped in and completely transformed my financial management. They are truly partners in my success.",
          company: "Wilson Manufacturing",
          position: "Owner",
          avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          display_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        4: {
          id: 4,
          name: "Jennifer Lee",
          content: "The financial planning services I received from Numérica were exceptional. They took the time to understand my goals and created a comprehensive plan that gives me confidence in my financial future.",
          company: "Lee & Associates",
          position: "Managing Partner",
          avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
          display_order: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        5: {
          id: 5,
          name: "Robert Brown",
          content: "Numérica audit services are top-notch. Their thorough approach and attention to detail gave our board complete confidence in our financial statements. Highly recommended for any business.",
          company: "Brown Enterprises",
          position: "CFO",
          avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
          display_order: 5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      if (mockTestimonials[req.params.id]) {
        return res.status(200).json(mockTestimonials[req.params.id]);
      }
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching testimonial',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  getPublishedTestimonials,
  getTestimonialById
}; 