const supabase = require('../../utils/supabaseClient');

/**
 * Get all home banners
 */
const getAllHomeBanners = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('home_banner')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting home banners:', error);
    return res.status(500).json({ error: 'An error occurred while fetching home banners' });
  }
};

/**
 * Get home banner by id
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
      return res.status(404).json({ error: 'Home banner not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting home banner:', error);
    return res.status(500).json({ error: 'An error occurred while fetching home banner' });
  }
};

/**
 * Create a new home banner
 */
const createHomeBanner = async (req, res) => {
  try {
    const { image_url, title, subtitle } = req.body;
    
    if (!image_url || !title || !subtitle) {
      return res.status(400).json({ error: 'Image URL, title, and subtitle are required' });
    }
    
    const { data, error } = await supabase
      .from('home_banner')
      .insert([{ 
        image_url, 
        title, 
        subtitle 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating home banner:', error);
    return res.status(500).json({ error: 'An error occurred while creating home banner' });
  }
};

/**
 * Update home banner
 */
const updateHomeBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, title, subtitle } = req.body;
    
    // Only update fields that are provided
    const updateData = {};
    if (image_url !== undefined) updateData.image_url = image_url;
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    updateData.updated_at = new Date();
    
    if (Object.keys(updateData).length === 1) { // Only updated_at
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('home_banner')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Home banner not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating home banner:', error);
    return res.status(500).json({ error: 'An error occurred while updating home banner' });
  }
};

/**
 * Delete home banner
 */
const deleteHomeBanner = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('home_banner')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Home banner not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Home banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting home banner:', error);
    return res.status(500).json({ error: 'An error occurred while deleting home banner' });
  }
};

/**
 * Get all testimonials
 */
const getAllTestimonials = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting testimonials:', error);
    return res.status(500).json({ error: 'An error occurred while fetching testimonials' });
  }
};

/**
 * Create a testimonial
 */
const createTestimonial = async (req, res) => {
  try {
    const { name, content, company, position, avatar_url } = req.body;
    
    if (!name || !content || !company) {
      return res.status(400).json({ error: 'Name, content, and company are required' });
    }
    
    // Get the highest display_order value
    const { data: maxOrderData } = await supabase
      .from('testimonials')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);
      
    const nextOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order + 1 : 1;
    
    const { data, error } = await supabase
      .from('testimonials')
      .insert([{ 
        name, 
        content, 
        company, 
        position: position || null, 
        avatar_url: avatar_url || null,
        display_order: nextOrder
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return res.status(500).json({ error: 'An error occurred while creating testimonial' });
  }
};

/**
 * Update a testimonial
 */
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content, company, position, avatar_url, display_order } = req.body;
    
    // Only update fields that are provided
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (content !== undefined) updateData.content = content;
    if (company !== undefined) updateData.company = company;
    if (position !== undefined) updateData.position = position;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;
    if (display_order !== undefined) updateData.display_order = display_order;
    updateData.updated_at = new Date();
    
    if (Object.keys(updateData).length === 1) { // Only updated_at
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Testimonial not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return res.status(500).json({ error: 'An error occurred while updating testimonial' });
  }
};

/**
 * Delete a testimonial
 */
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Testimonial not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return res.status(500).json({ error: 'An error occurred while deleting testimonial' });
  }
};

/**
 * Get all trusted companies
 */
const getTrustedCompanies = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trusted_companies')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting trusted companies:', error);
    return res.status(500).json({ error: 'An error occurred while fetching trusted companies' });
  }
};

/**
 * Add a trusted company
 */
const addTrustedCompany = async (req, res) => {
  try {
    const { logo_url, company_name } = req.body;
    
    if (!logo_url || !company_name) {
      return res.status(400).json({ error: 'Logo URL and company name are required' });
    }
    
    // Get the highest display_order value
    const { data: maxOrderData } = await supabase
      .from('trusted_companies')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);
      
    const nextOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order + 1 : 1;
    
    const { data, error } = await supabase
      .from('trusted_companies')
      .insert([{ 
        logo_url, 
        company_name,
        display_order: nextOrder
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error adding trusted company:', error);
    return res.status(500).json({ error: 'An error occurred while adding trusted company' });
  }
};

/**
 * Update a trusted company
 */
const updateTrustedCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { logo_url, company_name, display_order } = req.body;
    
    // Only update fields that are provided
    const updateData = {};
    if (logo_url !== undefined) updateData.logo_url = logo_url;
    if (company_name !== undefined) updateData.company_name = company_name;
    if (display_order !== undefined) updateData.display_order = display_order;
    updateData.updated_at = new Date();
    
    if (Object.keys(updateData).length === 1) { // Only updated_at
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('trusted_companies')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Trusted company not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating trusted company:', error);
    return res.status(500).json({ error: 'An error occurred while updating trusted company' });
  }
};

/**
 * Delete a trusted company
 */
const deleteTrustedCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('trusted_companies')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Trusted company not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Trusted company deleted successfully' });
  } catch (error) {
    console.error('Error deleting trusted company:', error);
    return res.status(500).json({ error: 'An error occurred while deleting trusted company' });
  }
};

module.exports = {
  // Home Banner
  getAllHomeBanners,
  getHomeBannerById,
  createHomeBanner,
  updateHomeBanner,
  deleteHomeBanner,
  
  // Testimonials
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  
  // Trusted Companies
  getTrustedCompanies,
  addTrustedCompany,
  updateTrustedCompany,
  deleteTrustedCompany
}; 