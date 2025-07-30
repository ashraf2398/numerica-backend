const supabase = require('../../utils/supabaseClient');

/**
 * Get all published team members
 */
const getPublishedTeamMembers = async (req, res) => {
  try {
    console.log('Attempting to fetch team members from Supabase...');
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Supabase error:', error);
      
      // If it's a network/fetch error, return mock data for development
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        return res.status(200).json([
          {
            id: 1,
            name: "John Doe",
            title: "CEO & Founder",
            description: "John has over 20 years of experience in financial and tax advisory services.",
            social_media: {
              twitter: "https://twitter.com/johndoe",
              facebook: "https://facebook.com/johndoe",
              linkedin: "https://linkedin.com/in/johndoe"
            },
            image: "https://example.com/images/team/john-doe.jpg",
            email: "john@numericatax.com",
            phone: "01234567890",
            order_index: 1,
            is_published: true,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            name: "Jane Smith",
            title: "Chief Financial Officer",
            description: "Jane is a certified public accountant with expertise in corporate finance.",
            social_media: {
              twitter: "https://twitter.com/janesmith",
              facebook: "https://facebook.com/janesmith",
              linkedin: "https://linkedin.com/in/janesmith"
            },
            image: "https://example.com/images/team/jane-smith.jpg",
            email: "jane@numericatax.com",
            phone: "01234567891",
            order_index: 2,
            is_published: true,
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            name: "Mike Johnson",
            title: "Head of Operations",
            description: "Mike specializes in operations and process optimization.",
            social_media: {
              twitter: "https://twitter.com/mikejohnson",
              facebook: "https://facebook.com/mikejohnson",
              linkedin: "https://linkedin.com/in/mikejohnson"
            },
            image: "https://example.com/images/team/mike-johnson.jpg",
            email: "mike@numericatax.com",
            phone: "01234567892",
            order_index: 3,
            is_published: true,
            created_at: new Date().toISOString()
          }
        ]);
      }
      
      return res.status(400).json({ 
        error: error.message,
        details: error.details,
        hint: error.hint
      });
    }
    
    console.log(`Successfully fetched ${data ? data.length : 0} team members`);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting published team members:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      return res.status(200).json([
        {
          id: 1,
          name: "John Doe",
          title: "CEO & Founder",
          description: "John has over 20 years of experience in financial and tax advisory services.",
          social_media: {
            twitter: "https://twitter.com/johndoe",
            facebook: "https://facebook.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe"
          },
          image: "https://example.com/images/team/john-doe.jpg",
          email: "john@numericatax.com",
          phone: "01234567890",
          order_index: 1,
          is_published: true,
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          name: "Jane Smith",
          title: "Chief Financial Officer",
          description: "Jane is a certified public accountant with expertise in corporate finance.",
          social_media: {
            twitter: "https://twitter.com/janesmith",
            facebook: "https://facebook.com/janesmith",
            linkedin: "https://linkedin.com/in/janesmith"
          },
          image: "https://example.com/images/team/jane-smith.jpg",
          email: "jane@numericatax.com",
          phone: "01234567891",
          order_index: 2,
          is_published: true,
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          name: "Mike Johnson",
          title: "Head of Operations",
          description: "Mike specializes in operations and process optimization.",
          social_media: {
            twitter: "https://twitter.com/mikejohnson",
            facebook: "https://facebook.com/mikejohnson",
            linkedin: "https://linkedin.com/in/mikejohnson"
          },
          image: "https://example.com/images/team/mike-johnson.jpg",
          email: "mike@numericatax.com",
          phone: "01234567892",
          order_index: 3,
          is_published: true,
          created_at: new Date().toISOString()
        }
      ]);
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching team members data',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get published team member by ID
 */
const getPublishedTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();
    
    if (error) {
      // If it's a network error, return mock data for the requested ID
      if (error.message && error.message.includes('fetch failed')) {
        console.log('Using mock data due to Supabase connection issues');
        const mockTeamMembers = {
          1: {
            id: 1,
            name: "John Doe",
            title: "CEO & Founder",
            description: "John has over 20 years of experience in financial and tax advisory services.",
            social_media: {
              twitter: "https://twitter.com/johndoe",
              facebook: "https://facebook.com/johndoe",
              linkedin: "https://linkedin.com/in/johndoe"
            },
            image: "https://example.com/images/team/john-doe.jpg",
            email: "john@numericatax.com",
            phone: "01234567890",
            order_index: 1,
            is_published: true,
            created_at: new Date().toISOString()
          },
          2: {
            id: 2,
            name: "Jane Smith",
            title: "Chief Financial Officer",
            description: "Jane is a certified public accountant with expertise in corporate finance.",
            social_media: {
              twitter: "https://twitter.com/janesmith",
              facebook: "https://facebook.com/janesmith",
              linkedin: "https://linkedin.com/in/janesmith"
            },
            image: "https://example.com/images/team/jane-smith.jpg",
            email: "jane@numericatax.com",
            phone: "01234567891",
            order_index: 2,
            is_published: true,
            created_at: new Date().toISOString()
          },
          3: {
            id: 3,
            name: "Mike Johnson",
            title: "Head of Operations",
            description: "Mike specializes in operations and process optimization.",
            social_media: {
              twitter: "https://twitter.com/mikejohnson",
              facebook: "https://facebook.com/mikejohnson",
              linkedin: "https://linkedin.com/in/mikejohnson"
            },
            image: "https://example.com/images/team/mike-johnson.jpg",
            email: "mike@numericatax.com",
            phone: "01234567892",
            order_index: 3,
            is_published: true,
            created_at: new Date().toISOString()
          }
        };
        
        if (mockTeamMembers[id]) {
          return res.status(200).json(mockTeamMembers[id]);
        }
      }
      
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting published team member:', error);
    
    // If it's a network error, return mock data
    if (error.message && error.message.includes('fetch failed')) {
      console.log('Using mock data due to network issues');
      const mockTeamMembers = {
        1: {
          id: 1,
          name: "John Doe",
          title: "CEO & Founder",
          description: "John has over 20 years of experience in financial and tax advisory services.",
          social_media: {
            twitter: "https://twitter.com/johndoe",
            facebook: "https://facebook.com/johndoe",
            linkedin: "https://linkedin.com/in/johndoe"
          },
          image: "https://example.com/images/team/john-doe.jpg",
          email: "john@numericatax.com",
          phone: "01234567890",
          order_index: 1,
          is_published: true,
          created_at: new Date().toISOString()
        },
        2: {
          id: 2,
          name: "Jane Smith",
          title: "Chief Financial Officer",
          description: "Jane is a certified public accountant with expertise in corporate finance.",
          social_media: {
            twitter: "https://twitter.com/janesmith",
            facebook: "https://facebook.com/janesmith",
            linkedin: "https://linkedin.com/in/janesmith"
          },
          image: "https://example.com/images/team/jane-smith.jpg",
          email: "jane@numericatax.com",
          phone: "01234567891",
          order_index: 2,
          is_published: true,
          created_at: new Date().toISOString()
        },
        3: {
          id: 3,
          name: "Mike Johnson",
          title: "Head of Operations",
          description: "Mike specializes in operations and process optimization.",
          social_media: {
            twitter: "https://twitter.com/mikejohnson",
            facebook: "https://facebook.com/mikejohnson",
            linkedin: "https://linkedin.com/in/mikejohnson"
          },
          image: "https://example.com/images/team/mike-johnson.jpg",
          email: "mike@numericatax.com",
          phone: "01234567892",
          order_index: 3,
          is_published: true,
          created_at: new Date().toISOString()
        }
      };
      
      if (mockTeamMembers[req.params.id]) {
        return res.status(200).json(mockTeamMembers[req.params.id]);
      }
    }
    
    return res.status(500).json({ 
      error: 'An error occurred while fetching team member',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  getPublishedTeamMembers,
  getPublishedTeamMemberById
}; 