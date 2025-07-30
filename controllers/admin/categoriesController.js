const supabase = require('../../utils/supabaseClient');

/**
 * Get all categories
 */
const getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting categories:', error);
    return res.status(500).json({ error: 'An error occurred while fetching categories data' });
  }
};

/**
 * Get category by ID
 */
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting category:', error);
    return res.status(500).json({ error: 'An error occurred while fetching category' });
  }
};

/**
 * Create category
 */
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ error: 'An error occurred while creating category' });
  }
};

/**
 * Update category
 */
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }
    
    const { data, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Category not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ error: 'An error occurred while updating category' });
  }
};

/**
 * Delete category
 */
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Category not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'An error occurred while deleting category' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}; 