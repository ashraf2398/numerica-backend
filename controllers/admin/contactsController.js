const supabase = require('../../utils/supabaseClient');

/**
 * Get all contact entries
 */
const getAllContacts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting contacts:', error);
    return res.status(500).json({ error: 'An error occurred while fetching contacts data' });
  }
};

/**
 * Get contact by ID
 */
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting contact:', error);
    return res.status(500).json({ error: 'An error occurred while fetching contact' });
  }
};

/**
 * Create contact
 */
const createContact = async (req, res) => {
  try {
    const { addresses, phones, emails, is_published = false } = req.body;
    
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ 
        addresses: Array.isArray(addresses) ? addresses : [], 
        phones: Array.isArray(phones) ? phones : [], 
        emails: Array.isArray(emails) ? emails : [], 
        is_published 
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating contact:', error);
    return res.status(500).json({ error: 'An error occurred while creating contact' });
  }
};

/**
 * Update contact
 */
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { addresses, phones, emails, is_published } = req.body;
    
    // Only update fields that are provided
    const updateData = {};
    if (addresses !== undefined) updateData.addresses = Array.isArray(addresses) ? addresses : [];
    if (phones !== undefined) updateData.phones = Array.isArray(phones) ? phones : [];
    if (emails !== undefined) updateData.emails = Array.isArray(emails) ? emails : [];
    if (is_published !== undefined) updateData.is_published = is_published;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('contacts')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Contact not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({ error: 'An error occurred while updating contact' });
  }
};

/**
 * Delete contact
 */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Contact not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ error: 'An error occurred while deleting contact' });
  }
};

/**
 * Get all consultation requests
 */
const getAllConsultationRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting consultation requests:', error);
    return res.status(500).json({ error: 'An error occurred while fetching consultation requests' });
  }
};

/**
 * Get consultation request by ID
 */
const getConsultationRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('consultation_requests')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'Consultation request not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting consultation request:', error);
    return res.status(500).json({ error: 'An error occurred while fetching consultation request' });
  }
};

/**
 * Update consultation request status
 */
const updateConsultationRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    
    const { data, error } = await supabase
      .from('consultation_requests')
      .update({ status })
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Consultation request not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating consultation request:', error);
    return res.status(500).json({ error: 'An error occurred while updating consultation request' });
  }
};

/**
 * Delete consultation request
 */
const deleteConsultationRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('consultation_requests')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Consultation request not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Consultation request deleted successfully' });
  } catch (error) {
    console.error('Error deleting consultation request:', error);
    return res.status(500).json({ error: 'An error occurred while deleting consultation request' });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  getAllConsultationRequests,
  getConsultationRequestById,
  updateConsultationRequestStatus,
  deleteConsultationRequest
}; 