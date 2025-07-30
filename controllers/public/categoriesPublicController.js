const supabase = require('../../utils/supabaseClient');

/**
 * Get all categories (public)
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
 * Get category by ID (public)
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

module.exports = {
  getAllCategories,
  getCategoryById
}; 