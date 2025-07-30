const supabase = require('../../utils/supabaseClient');

/**
 * Get all team members
 */
const getAllTeamMembers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting team members:', error);
    return res.status(500).json({ error: 'An error occurred while fetching team members data' });
  }
};

/**
 * Get team member by ID
 */
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting team member:', error);
    return res.status(500).json({ error: 'An error occurred while fetching team member' });
  }
};

/**
 * Create team member
 */
const createTeamMember = async (req, res) => {
  try {
    console.log('🔍 Create Team Member Debug:');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request files:', req.files);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('All headers:', req.headers);
    console.log('Body keys:', Object.keys(req.body));
    console.log('Body values:', Object.values(req.body));
    
    const { name, title, description, social_media, image, email, phone, order_index = 0, is_published = false } = req.body;
    
    console.log('Extracted name:', name);
    console.log('Extracted title:', title);
    console.log('Name type:', typeof name);
    console.log('Title type:', typeof title);
    console.log('Name truthy:', !!name);
    console.log('Title truthy:', !!title);
    
    if (!name || !title) {
      console.log('❌ Validation failed:');
      console.log('  - name exists:', !!name);
      console.log('  - title exists:', !!title);
      console.log('  - name value:', name);
      console.log('  - title value:', title);
      return res.status(400).json({ error: 'Name and title are required' });
    }
    
    let image_url = null;
    
    // Handle uploaded file
    if (req.file) {
      // File was uploaded, use the uploaded file path
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      image_url = `${baseUrl}/uploads/team/${req.file.filename}`;
      console.log('File uploaded, URL:', image_url);
    } else if (image) {
      // URL was provided instead of file upload
      image_url = image;
      console.log('URL provided:', image_url);
    }
    
    const { data, error } = await supabase
      .from('team_members')
      .insert([{ 
        name, 
        title, 
        description, 
        social_media: typeof social_media === 'object' ? social_media : {}, 
        image: image_url, 
        email, 
        phone, 
        order_index, 
        is_published 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating team member:', error);
    return res.status(500).json({ error: 'An error occurred while creating team member' });
  }
};

/**
 * Update team member
 */
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, description, social_media, image, email, phone, order_index, is_published } = req.body;
    
    // Debug logging
    console.log('🔍 Update Team Member Debug:');
    console.log('ID:', id);
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('File uploaded:', req.file ? req.file.filename : 'No file');
    
    // Only update fields that are provided
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (social_media !== undefined) updateData.social_media = typeof social_media === 'object' ? social_media : {};
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (is_published !== undefined) updateData.is_published = is_published;
    
    // Handle image update
    if (req.file) {
      // File was uploaded, use the uploaded file path
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      updateData.image = `${baseUrl}/uploads/team/${req.file.filename}`;
    } else if (image !== undefined) {
      // URL was provided
      updateData.image = image;
    }
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('team_members')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Team member not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating team member:', error);
    return res.status(500).json({ error: 'An error occurred while updating team member' });
  }
};

/**
 * Delete team member
 */
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Team member not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return res.status(500).json({ error: 'An error occurred while deleting team member' });
  }
};

/**
 * Update team members order
 */
const updateTeamOrder = async (req, res) => {
  try {
    const { order } = req.body;
    
    if (!Array.isArray(order)) {
      return res.status(400).json({ error: 'Order must be an array of { id, order_index } objects' });
    }
    
    console.log('🔍 Update Team Order Debug:');
    console.log('Order data:', order);
    
    // Validate the order data
    for (const item of order) {
      if (!item.id || item.order_index === undefined) {
        return res.status(400).json({ 
          error: 'Each order item must have both id and order_index',
          invalid_item: item
        });
      }
    }
    
    // Update each team member's order individually
    const updatePromises = order.map(async (item) => {
      const { error } = await supabase
        .from('team_members')
        .update({ order_index: item.order_index })
        .eq('id', item.id);
      
      if (error) {
        console.error(`Error updating team member ${item.id}:`, error);
        throw new Error(`Failed to update team member ${item.id}: ${error.message}`);
      }
      
      return { id: item.id, order_index: item.order_index };
    });
    
    // Wait for all updates to complete
    const results = await Promise.all(updatePromises);
    
    console.log('✅ Team order updated successfully:', results);
    
    return res.status(200).json({ 
      message: 'Team order updated successfully',
      updated_members: results
    });
    
  } catch (error) {
    console.error('Error updating team order:', error);
    return res.status(500).json({ 
      error: 'An error occurred while updating team order',
      details: error.message
    });
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  updateTeamOrder
}; 