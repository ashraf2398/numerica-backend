const supabase = require('../../utils/supabaseClient');

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
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting testimonial:', error);
    return res.status(500).json({ error: 'An error occurred while fetching testimonial' });
  }
};

/**
 * Create a new testimonial
 */
const createTestimonial = async (req, res) => {
  try {
    const { name, content, company, position, avatar_url, display_order } = req.body;
    
    if (!name || !content || !company) {
      return res.status(400).json({ error: 'Name, content, and company are required' });
    }
    
    // Get the highest display_order value if not provided
    let order = display_order;
    if (!order) {
      const { data: maxOrderData } = await supabase
        .from('testimonials')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);
        
      order = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order + 1 : 1;
    }
    
    let finalAvatarUrl = null;
    
    // Handle uploaded file
    if (req.file) {
      // File was uploaded, use the uploaded file path
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      finalAvatarUrl = `${baseUrl}/uploads/testimonials/${req.file.filename}`;
    } else if (avatar_url) {
      // URL was provided instead of file upload
      finalAvatarUrl = avatar_url;
    }
    
    const { data, error } = await supabase
      .from('testimonials')
      .insert([{ 
        name, 
        content, 
        company, 
        position, 
        avatar_url: finalAvatarUrl,
        display_order: order
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
    
    // Only update fields that are provided
    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.content !== undefined) updateData.content = req.body.content;
    if (req.body.company !== undefined) updateData.company = req.body.company;
    if (req.body.position !== undefined) updateData.position = req.body.position;
    if (req.body.display_order !== undefined) updateData.display_order = req.body.display_order;
    updateData.updated_at = new Date();
    
    // Handle image update
    if (req.file) {
      // File was uploaded, use the uploaded file path
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      updateData.avatar_url = `${baseUrl}/uploads/testimonials/${req.file.filename}`;
    } else if (req.body.avatar_url !== undefined) {
      // URL was provided
      updateData.avatar_url = req.body.avatar_url;
    }
    
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
 * Update testimonial order
 */
const updateTestimonialOrder = async (req, res) => {
  try {
    const { testimonials } = req.body; // Array of {id, display_order}
    
    if (!testimonials || !Array.isArray(testimonials)) {
      return res.status(400).json({ error: 'Testimonials array is required' });
    }
    
    // Update each testimonial's display order
    for (const testimonial of testimonials) {
      const { error } = await supabase
        .from('testimonials')
        .update({ display_order: testimonial.display_order })
        .eq('id', testimonial.id);
      
      if (error) {
        return res.status(400).json({ error: `Error updating testimonial ${testimonial.id}: ${error.message}` });
      }
    }
    
    return res.status(200).json({ message: 'Testimonial order updated successfully' });
  } catch (error) {
    console.error('Error updating testimonial order:', error);
    return res.status(500).json({ error: 'An error occurred while updating testimonial order' });
  }
};

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateTestimonialOrder
}; 