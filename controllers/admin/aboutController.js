const supabase = require('../../utils/supabaseClient');
const { v4: uuidv4 } = require('uuid');

/**
 * Get all about entries
 */
const getAllAboutEntries = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting about entries:', error);
    return res.status(500).json({ error: 'An error occurred while fetching about data' });
  }
};

/**
 * Get single about entry
 */
const getAboutEntry = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'About entry not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting about entry:', error);
    return res.status(500).json({ error: 'An error occurred while fetching about entry' });
  }
};

/**
 * Create about entry
 */
const createAboutEntry = async (req, res) => {
  try {
    console.log('🔍 Create About Debug:');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request files:', req.files);
    console.log('Content-Type:', req.headers['content-type']);
    
    const { 
      title, 
      content, 
      mission, 
      vision, 
      is_published = false,
      values_title = "Our Core Values & Culture",
      values_subtitle = "The principles that guide our decisions and shape our company culture.",
      collaboration_title = "Collaboration",
      collaboration_description = "We believe in the power of teamwork and open communication to deliver exceptional results for our clients.",
      collaboration_link = "Learn more",
      integrity_title = "Integrity",
      integrity_description = "We operate with honesty, transparency, and the highest ethical standards in everything we do.",
      integrity_link = "Learn more",
      innovation_title = "Innovation",
      innovation_description = "We embrace change and continuously explore new ideas to deliver cutting-edge solutions.",
      innovation_link = "Learn more"
    } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    let image_url = null;
    
    // Handle uploaded file
    if (req.file) {
      // File was uploaded, use the uploaded file path
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      image_url = `${baseUrl}/uploads/about/${req.file.filename}`;
      console.log('File uploaded, URL:', image_url);
    } else if (req.body.image_url) {
      // URL was provided instead of file upload
      image_url = req.body.image_url;
      console.log('URL provided:', image_url);
    }
    
    const { data, error } = await supabase
      .from('about')
      .insert([{ 
        id: uuidv4(),
        title, 
        content, 
        mission, 
        vision, 
        image_url,
        is_published,
        values_title,
        values_subtitle,
        collaboration_title,
        collaboration_description,
        collaboration_link,
        integrity_title,
        integrity_description,
        integrity_link,
        innovation_title,
        innovation_description,
        innovation_link
      }])
      .select();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating about entry:', error);
    return res.status(500).json({ error: 'An error occurred while creating about entry' });
  }
};

/**
 * Update about entry
 */
const updateAboutEntry = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Debug logging
    console.log('🔍 Update About Debug:');
    console.log('ID:', id);
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('File uploaded:', req.file ? req.file.filename : 'No file');
    
    // Only update fields that are provided
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.content !== undefined) updateData.content = req.body.content;
    if (req.body.mission !== undefined) updateData.mission = req.body.mission;
    if (req.body.vision !== undefined) updateData.vision = req.body.vision;
    if (req.body.is_published !== undefined) updateData.is_published = req.body.is_published;
    if (req.body.values_title !== undefined) updateData.values_title = req.body.values_title;
    if (req.body.values_subtitle !== undefined) updateData.values_subtitle = req.body.values_subtitle;
    if (req.body.collaboration_title !== undefined) updateData.collaboration_title = req.body.collaboration_title;
    if (req.body.collaboration_description !== undefined) updateData.collaboration_description = req.body.collaboration_description;
    if (req.body.collaboration_link !== undefined) updateData.collaboration_link = req.body.collaboration_link;
    if (req.body.integrity_title !== undefined) updateData.integrity_title = req.body.integrity_title;
    if (req.body.integrity_description !== undefined) updateData.integrity_description = req.body.integrity_description;
    if (req.body.integrity_link !== undefined) updateData.integrity_link = req.body.integrity_link;
    if (req.body.innovation_title !== undefined) updateData.innovation_title = req.body.innovation_title;
    if (req.body.innovation_description !== undefined) updateData.innovation_description = req.body.innovation_description;
    if (req.body.innovation_link !== undefined) updateData.innovation_link = req.body.innovation_link;
    
    // Handle image update
    if (req.file) {
      // File was uploaded, use the uploaded file path
      const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
      updateData.image_url = `${baseUrl}/uploads/about/${req.file.filename}`;
    } else if (req.body.image_url !== undefined) {
      // URL was provided
      updateData.image_url = req.body.image_url;
    }
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('about')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'About entry not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating about entry:', error);
    return res.status(500).json({ error: 'An error occurred while updating about entry' });
  }
};

/**
 * Delete about entry
 */
const deleteAboutEntry = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('about')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'About entry not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'About entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting about entry:', error);
    return res.status(500).json({ error: 'An error occurred while deleting about entry' });
  }
};

module.exports = {
  getAllAboutEntries,
  getAboutEntry,
  createAboutEntry,
  updateAboutEntry,
  deleteAboutEntry
}; 