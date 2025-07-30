const supabase = require('../../utils/supabaseClient');

/**
 * Get dashboard statistics
 */
const getDashboardStats = async (req, res) => {
  try {
    console.log('🔍 Getting dashboard statistics...');
    
    // Get counts for different entities
    const [
      teamMembersResult,
      contactsResult,
      consultationRequestsResult,
      articlesResult,
      servicesResult,
      testimonialsResult,
      trustedCompaniesResult,
      aboutEntriesResult,
      categoriesResult
    ] = await Promise.all([
      // Team members count
      supabase
        .from('team_members')
        .select('id', { count: 'exact', head: true }),
      
      // Contacts count
      supabase
        .from('contacts')
        .select('id', { count: 'exact', head: true }),
      
      // Consultation requests count
      supabase
        .from('consultation_requests')
        .select('id', { count: 'exact', head: true }),
      
      // Articles count
      supabase
        .from('articles')
        .select('id', { count: 'exact', head: true }),
      
      // Services count
      supabase
        .from('services')
        .select('id', { count: 'exact', head: true }),
      
      // Testimonials count
      supabase
        .from('testimonials')
        .select('id', { count: 'exact', head: true }),
      
      // Trusted companies count
      supabase
        .from('trusted_companies')
        .select('id', { count: 'exact', head: true }),
      
      // About entries count
      supabase
        .from('about')
        .select('id', { count: 'exact', head: true }),
      
      // Categories count
      supabase
        .from('categories')
        .select('id', { count: 'exact', head: true })
    ]);

    // Get recent consultation requests
    const { data: recentConsultations, error: recentConsultationsError } = await supabase
      .from('consultation_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (recentConsultationsError) {
      console.error('Error fetching recent consultations:', recentConsultationsError);
    }

    // Get published vs unpublished counts
    const [
      publishedTeamMembers,
      publishedServices,
      publishedArticles,
      publishedTestimonials,
      publishedTrustedCompanies,
      publishedAboutEntries
    ] = await Promise.all([
      // Published team members
      supabase
        .from('team_members')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', true),
      
      // Published services
      supabase
        .from('services')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', true),
      
      // Published articles
      supabase
        .from('articles')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', true),
      
      // Published testimonials
      supabase
        .from('testimonials')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', true),
      
      // Published trusted companies
      supabase
        .from('trusted_companies')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', true),
      
      // Published about entries
      supabase
        .from('about')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', true)
    ]);

    // Get consultation requests by status
    const [
      pendingConsultations,
      completedConsultations,
      cancelledConsultations
    ] = await Promise.all([
      // Pending consultations
      supabase
        .from('consultation_requests')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending'),
      
      // Completed consultations
      supabase
        .from('consultation_requests')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'completed'),
      
      // Cancelled consultations
      supabase
        .from('consultation_requests')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'cancelled')
    ]);

    // Compile the statistics
    const stats = {
      total_counts: {
        team_members: teamMembersResult.count || 0,
        contacts: contactsResult.count || 0,
        consultation_requests: consultationRequestsResult.count || 0,
        articles: articlesResult.count || 0,
        services: servicesResult.count || 0,
        testimonials: testimonialsResult.count || 0,
        trusted_companies: trustedCompaniesResult.count || 0,
        about_entries: aboutEntriesResult.count || 0,
        categories: categoriesResult.count || 0
      },
      published_counts: {
        team_members: publishedTeamMembers.count || 0,
        services: publishedServices.count || 0,
        articles: publishedArticles.count || 0,
        testimonials: publishedTestimonials.count || 0,
        trusted_companies: publishedTrustedCompanies.count || 0,
        about_entries: publishedAboutEntries.count || 0
      },
      consultation_status: {
        pending: pendingConsultations.count || 0,
        completed: completedConsultations.count || 0,
        cancelled: cancelledConsultations.count || 0
      },
      recent_consultations: recentConsultations || [],
      summary: {
        total_entities: (teamMembersResult.count || 0) + 
                       (contactsResult.count || 0) + 
                       (consultationRequestsResult.count || 0) + 
                       (articlesResult.count || 0) + 
                       (servicesResult.count || 0) + 
                       (testimonialsResult.count || 0) + 
                       (trustedCompaniesResult.count || 0) + 
                       (aboutEntriesResult.count || 0) + 
                       (categoriesResult.count || 0),
        total_published: (publishedTeamMembers.count || 0) + 
                        (publishedServices.count || 0) + 
                        (publishedArticles.count || 0) + 
                        (publishedTestimonials.count || 0) + 
                        (publishedTrustedCompanies.count || 0) + 
                        (publishedAboutEntries.count || 0),
        pending_consultations: pendingConsultations.count || 0
      }
    };

    console.log('✅ Dashboard statistics retrieved successfully');
    return res.status(200).json(stats);
    
  } catch (error) {
    console.error('Error getting dashboard statistics:', error);
    return res.status(500).json({ error: 'An error occurred while fetching dashboard statistics' });
  }
};

/**
 * Get entity statistics by date range
 */
const getEntityStatsByDate = async (req, res) => {
  try {
    const { entity, start_date, end_date } = req.query;
    
    if (!entity) {
      return res.status(400).json({ error: 'Entity parameter is required' });
    }

    let query = supabase.from(entity).select('created_at');
    
    if (start_date) {
      query = query.gte('created_at', start_date);
    }
    
    if (end_date) {
      query = query.lte('created_at', end_date);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Group by date
    const statsByDate = data.reduce((acc, item) => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return res.status(200).json({
      entity,
      date_range: { start_date, end_date },
      stats: statsByDate,
      total: data.length
    });
    
  } catch (error) {
    console.error('Error getting entity stats by date:', error);
    return res.status(500).json({ error: 'An error occurred while fetching entity statistics' });
  }
};

module.exports = {
  getDashboardStats,
  getEntityStatsByDate
}; 