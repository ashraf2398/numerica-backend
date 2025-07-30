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
      return res.status(404).json({ error: 'Home banner not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting home banner:', error);
    return res.status(500).json({ error: 'An error occurred while fetching home banner' });
  }
};

/**
 * Create a new home banner with image upload
 */
const createHomeBanner = async (req, res) => {
  try {
    console.log('🔍 Create Home Banner Debug:');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    console.log('Request file:', req.file);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('All headers:', req.headers);
    
    const { title, subtitle } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    let image_url = null;
    
    // Handle uploaded file
    if (req.file) {
      // File was uploaded, use the uploaded file path
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      image_url = `${baseUrl}/uploads/banners/${req.file.filename}`;
      console.log('File uploaded, URL:', image_url);
    } else if (req.body.image_url) {
      // URL was provided instead of file upload
      image_url = req.body.image_url;
      console.log('URL provided:', image_url);
    } else {
      return res.status(400).json({ error: 'Either image file or image URL is required' });
    }
    
    // Get the highest display_order to set the new banner at the end
    const { data: maxOrderData, error: maxOrderError } = await supabase
      .from('home_banner')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);
    
    const nextOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order + 1 : 1;
    
    const { data, error } = await supabase
      .from('home_banner')
      .insert([{ 
        image_url, 
        title, 
        subtitle: subtitle || '',
        display_order: nextOrder
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
 * Update a home banner with optional image upload
 */
const updateHomeBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image_url: urlImageUrl } = req.body;
    
    // Debug logging
    console.log('🔍 Update Home Banner Debug:');
    console.log('ID:', id);
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('File uploaded:', req.file ? req.file.filename : 'No file');
    
    // Only update fields that are provided
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    
    // Handle image update
    if (req.file) {
      // File was uploaded, use the uploaded file path
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      updateData.image_url = `${baseUrl}/uploads/banners/${req.file.filename}`;
    } else if (urlImageUrl !== undefined) {
      // URL was provided
      updateData.image_url = urlImageUrl;
    }
    
    updateData.updated_at = new Date();
    
    console.log('Update data object:', updateData);
    console.log('Update data keys length:', Object.keys(updateData).length);
    
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
 * Delete a home banner
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
 * Update home banners order
 */
const updateHomeBannersOrder = async (req, res) => {
  try {
    const { banners } = req.body; // Array of {id, order}
    
    if (!banners || !Array.isArray(banners)) {
      return res.status(400).json({ error: 'Banners array is required' });
    }
    
    // Validate that each banner has id and order
    for (const banner of banners) {
      if (!banner.id || banner.order === undefined) {
        return res.status(400).json({ error: 'Each banner must have id and order' });
      }
    }
    
    // Update each banner's display_order
    for (const banner of banners) {
      const { error } = await supabase
        .from('home_banner')
        .update({ display_order: banner.order })
        .eq('id', banner.id);
      
      if (error) {
        return res.status(400).json({ error: `Error updating banner ${banner.id}: ${error.message}` });
      }
    }
    
    return res.status(200).json({ message: 'Home banners order updated successfully' });
  } catch (error) {
    console.error('Error updating home banners order:', error);
    return res.status(500).json({ error: 'An error occurred while updating home banners order' });
  }
};

module.exports = {
  getAllHomeBanners,
  getHomeBannerById,
  createHomeBanner,
  updateHomeBanner,
  deleteHomeBanner,
  updateHomeBannersOrder
}; 