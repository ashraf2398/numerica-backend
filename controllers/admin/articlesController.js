const supabase = require('../../utils/supabaseClient');
const { v4: uuidv4 } = require('uuid');

/**
 * Get all articles
 */
const getAllArticles = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting articles:', error);
    return res.status(500).json({ error: 'An error occurred while fetching articles' });
  }
};

/**
 * Get article by ID
 */
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting article:', error);
    return res.status(500).json({ error: 'An error occurred while fetching article' });
  }
};

/**
 * Create a new article
 */
const createArticle = async (req, res) => {
  try {
    console.log('🔍 Create Article Debug:');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request files:', req.files);
    console.log('Featured image file:', req.featuredImageFile);
    console.log('PDF file:', req.pdfFile);
    console.log('Content-Type:', req.headers['content-type']);
    
    const { title, content, author, featured_image, pdf_url, status } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    let image_url = null;
    let pdf_attachment_url = null;
    
    // Use environment variable for production base URL, fallback to request headers
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    
    // Handle uploaded featured image
    if (req.featuredImageFile) {
      image_url = `${baseUrl}/uploads/articles/${req.featuredImageFile.filename}`;
      console.log('Featured image file uploaded, URL:', image_url);
    } else if (featured_image) {
      // URL was provided instead of file upload
      image_url = featured_image;
      console.log('Featured image URL provided:', image_url);
    }

    // Handle uploaded PDF attachment
    if (req.pdfFile) {
      pdf_attachment_url = `${baseUrl}/uploads/articles/pdfs/${req.pdfFile.filename}`;
      console.log('PDF file uploaded, URL:', pdf_attachment_url);
    } else if (pdf_url) {
      // PDF URL was provided instead of file upload
      pdf_attachment_url = pdf_url;
      console.log('PDF URL provided:', pdf_attachment_url);
    }

    // Handle status field (default to false if not provided)
    const articleStatus = status !== undefined ? (status === 'true' || status === true) : false;
    console.log('Article status set to:', articleStatus);
    
    const { data, error } = await supabase
      .from('articles')
      .insert([{ 
        id: uuidv4(),
        title, 
        content, 
        author, 
        featured_image: image_url,
        pdf_url: pdf_attachment_url,
        status: articleStatus
      }])
      .select();
    
    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating article:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      code: error.code
    });
    return res.status(500).json({ 
      error: 'An error occurred while creating article',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Update an article
 */
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, featured_image, pdf_url, status } = req.body;
    
    // Debug logging
    console.log('🔍 Update Article Debug:');
    console.log('ID:', id);
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Featured image file:', req.featuredImageFile ? req.featuredImageFile.filename : 'No featured image file');
    console.log('PDF file:', req.pdfFile ? req.pdfFile.filename : 'No PDF file');
    
    // Only update fields that are provided
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (author !== undefined) updateData.author = author;
    
    // Use environment variable for production base URL, fallback to request headers
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    
    // Handle featured image update
    if (req.featuredImageFile) {
      // File was uploaded, use the uploaded file path
      updateData.featured_image = `${baseUrl}/uploads/articles/${req.featuredImageFile.filename}`;
    } else if (featured_image !== undefined) {
      // URL was provided
      updateData.featured_image = featured_image;
    }

    // Handle PDF update
    if (req.pdfFile) {
      // PDF file was uploaded, use the uploaded file path
      updateData.pdf_url = `${baseUrl}/uploads/articles/pdfs/${req.pdfFile.filename}`;
    } else if (pdf_url !== undefined) {
      // PDF URL was provided
      updateData.pdf_url = pdf_url;
    }

    // Handle status update
    if (status !== undefined) {
      updateData.status = status === 'true' || status === true;
      console.log('Article status updated to:', updateData.status);
    }
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
    
    const { data, error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Article not found or could not be updated' });
    }
    
    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating article:', error);
    return res.status(500).json({ error: 'An error occurred while updating article' });
  }
};

/**
 * Delete an article
 */
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(404).json({ error: 'Article not found or could not be deleted' });
    }
    
    return res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return res.status(500).json({ error: 'An error occurred while deleting article' });
  }
};

/**
 * Search articles
 */
const searchArticles = async (req, res) => {
  try {
    const { query, author, limit = 10, offset = 0 } = req.query;
    
    let supabaseQuery = supabase
      .from('articles')
      .select('*');
    
    // Add search filters
    if (query) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,content.ilike.%${query}%`);
    }
    
    if (author) {
      supabaseQuery = supabaseQuery.eq('author', author);
    }
    
    // Add pagination
    supabaseQuery = supabaseQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    const { data, error } = await supabaseQuery;
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error searching articles:', error);
    return res.status(500).json({ error: 'An error occurred while searching articles' });
  }
};

/**
 * Toggle article status (published/unpublished)
 */
const toggleArticleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, get the current status
    const { data: currentArticle, error: fetchError } = await supabase
      .from('articles')
      .select('status')
      .eq('id', id)
      .single();
    
    if (fetchError || !currentArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Toggle the status
    const newStatus = !currentArticle.status;
    
    const { data, error } = await supabase
      .from('articles')
      .update({ status: newStatus })
      .eq('id', id)
      .select();
    
    if (error || data.length === 0) {
      return res.status(404).json({ error: 'Article not found or could not be updated' });
    }
    
    console.log(`Article ${id} status toggled from ${currentArticle.status} to ${newStatus}`);
    
    return res.status(200).json({
      message: `Article status ${newStatus ? 'published' : 'unpublished'} successfully`,
      article: data[0]
    });
  } catch (error) {
    console.error('Error toggling article status:', error);
    return res.status(500).json({ error: 'An error occurred while toggling article status' });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  toggleArticleStatus
}; 