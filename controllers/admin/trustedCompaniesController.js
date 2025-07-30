const supabase = require('../../utils/supabaseClient');

/**
 * Get all trusted companies
 */
const getAllTrustedCompanies = async (req, res) => {
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
 * Create a trusted company with logo upload
 */
const createTrustedCompany = async (req, res) => {
  try {
    const { company_name } = req.body;
    let logo_url = null;
    if (req.file) {
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      logo_url = `${baseUrl}/uploads/trusted_companies/${req.file.filename}`;
    } else if (req.body.logo_url) {
      logo_url = req.body.logo_url;
    } else {
      return res.status(400).json({ error: 'Logo file or logo URL is required' });
    }
    if (!company_name) {
      return res.status(400).json({ error: 'Company name is required' });
    }
    // Get next display_order
    const { data: maxOrderData } = await supabase
      .from('trusted_companies')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);
    const nextOrder = maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].display_order + 1 : 1;
    const { data, error } = await supabase
      .from('trusted_companies')
      .insert([{ company_name, logo_url, display_order: nextOrder }])
      .select();
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating trusted company:', error);
    return res.status(500).json({ error: 'An error occurred while creating trusted company' });
  }
};

/**
 * Update a trusted company with optional logo upload
 */
const updateTrustedCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, logo_url: urlLogo } = req.body;
    const updateData = {};
    if (company_name !== undefined) updateData.company_name = company_name;
    if (req.file) {
      // Use environment variable for production base URL, fallback to request headers
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      updateData.logo_url = `${baseUrl}/uploads/trusted_companies/${req.file.filename}`;
    } else if (urlLogo !== undefined) {
      updateData.logo_url = urlLogo;
    }
    updateData.updated_at = new Date();
    if (Object.keys(updateData).length === 1) {
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

/**
 * Update trusted companies order
 */
const updateTrustedCompaniesOrder = async (req, res) => {
  try {
    const { companies } = req.body; // Array of {id, order}
    if (!companies || !Array.isArray(companies)) {
      return res.status(400).json({ error: 'Companies array is required' });
    }
    for (const company of companies) {
      if (!company.id || company.order === undefined) {
        return res.status(400).json({ error: 'Each company must have id and order' });
      }
      const { error } = await supabase
        .from('trusted_companies')
        .update({ display_order: company.order })
        .eq('id', company.id);
      if (error) {
        return res.status(400).json({ error: `Error updating company ${company.id}: ${error.message}` });
      }
    }
    return res.status(200).json({ message: 'Trusted companies order updated successfully' });
  } catch (error) {
    console.error('Error updating trusted companies order:', error);
    return res.status(500).json({ error: 'An error occurred while updating trusted companies order' });
  }
};

/**
 * Get trusted company by ID
 */
const getTrustedCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('trusted_companies')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) {
      return res.status(404).json({ error: 'Trusted company not found' });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting trusted company:', error);
    return res.status(500).json({ error: 'An error occurred while fetching trusted company' });
  }
};

module.exports = {
  getAllTrustedCompanies,
  getTrustedCompanyById,
  createTrustedCompany,
  updateTrustedCompany,
  deleteTrustedCompany,
  updateTrustedCompaniesOrder
}; 