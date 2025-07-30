const supabase = require('../../utils/supabaseClient');

/**
 * Get published contact information
 */
const getPublishedContact = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('is_published', true)
      .order('id', { ascending: false })
      .limit(1);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'No published contact information found' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error getting published contact:', error);
    return res.status(500).json({ error: 'An error occurred while fetching contact information' });
  }
};

/**
 * Submit consultation request
 */
const submitConsultationRequest = async (req, res) => {
  try {
    const { name, email, phone, preferred_date, message } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }
    
    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([{ 
        name, 
        email, 
        phone, 
        preferred_date: preferred_date || null, 
        message: message || '',
        status: 'pending'
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json({ 
      message: 'Consultation request submitted successfully',
      id: data[0].id
    });
  } catch (error) {
    console.error('Error submitting consultation request:', error);
    return res.status(500).json({ error: 'An error occurred while submitting your request' });
  }
};

module.exports = {
  getPublishedContact,
  submitConsultationRequest
}; 