const supabase = require('../../utils/supabaseClient');

/**
 * Get all services
 */
const getAllServices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories:category_id (id, name)
      `)
      .order('id', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting services:', error);
    return res.status(500).json({ error: 'An error occurred while fetching services data' });
  }
};

/**
 * Get service by ID
 */
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories:category_id (id, name)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting service:', error);
    return res.status(500).json({ error: 'An error occurred while fetching service' });
  }
};

/**
 * Get services by category
 */
const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    // First find the category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('id', category)
      .single();
    
    if (categoryError) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const categoryId = categoryData.id;
    
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        categories:category_id (id, name)
      `)
      .eq('category_id', categoryId)
      .order('id', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting services by category:', error);
    return res.status(500).json({ error: 'An error occurred while fetching services' });
  }
};

/**
 * Create service
 */
const createService = async (req, res) => {
  try {
    const { title, description, category_id, features, icon, is_published = false } = req.body;
    
    if (!title || !description || !category_id) {
      return res.status(400).json({ error: 'Title, description, and category_id are required' });
    }
    
    const { data, error } = await supabase
      .from('services')
      .insert([{ 
        title, 
        description, 
        category_id, 
        features: Array.isArray(features) ? features : [], 
        icon, 
        is_published 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating service:', error);
    return res.status(500).json({ error: 'An error occurred while creating service' });
  }
};

/**
 * Update service
 */
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category_id, features, icon, is_published } = req.body;
    
    // Only update fields that are provided
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (features !== undefined) updateData.features = Array.isArray(features) ? features : [];
    if (icon !== undefined) updateData.icon = icon;
    if (is_published !== undefined) updateData.is_published = is_published;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        categories:category_id (id, name)
      `);
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Service not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating service:', error);
    return res.status(500).json({ error: 'An error occurred while updating service' });
  }
};

/**
 * Delete service
 */
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Service not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return res.status(500).json({ error: 'An error occurred while deleting service' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  getServicesByCategory,
  createService,
  updateService,
  deleteService
}; 