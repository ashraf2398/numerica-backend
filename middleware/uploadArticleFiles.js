const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../uploads/articles');
const pdfDir = path.join(__dirname, '../uploads/articles/pdfs');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use different directories for images and PDFs
    if (file.fieldname === 'pdf_attachment') {
      cb(null, pdfDir);
    } else {
      cb(null, uploadDir);
    }
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    
    if (file.fieldname === 'pdf_attachment') {
      cb(null, 'article-pdf-' + uniqueSuffix + ext);
    } else {
      cb(null, 'article-' + uniqueSuffix + ext);
    }
  }
});

// File filter to accept images and PDFs
const fileFilter = (req, file, cb) => {
  console.log('Processing article file:', file.fieldname, file.originalname);
  
  // Handle featured image
  if (file.fieldname === 'featured_image') {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      return cb(new Error('Only image files (jpg, jpeg, png, gif, webp, svg) are allowed for featured_image!'), false);
    }
  }
  // Handle PDF attachment
  else if (file.fieldname === 'pdf_attachment') {
    if (!file.originalname.match(/\.pdf$/i)) {
      return cb(new Error('Only PDF files are allowed for pdf_attachment!'), false);
    }
  }
  
  cb(null, true);
};

// Configure multer to handle multiple file types
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 80 * 1024 * 1024 // 80MB limit for PDFs, smaller for images but this covers both
  }
});

// Flexible upload middleware that handles form data and files
const uploadArticleFiles = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      return handleArticleUploadError(err, req, res, next);
    }
    
    // Process uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (file.fieldname === 'featured_image') {
          req.featuredImageFile = file;
          console.log('Article featured image uploaded:', file.filename);
        } else if (file.fieldname === 'pdf_attachment') {
          req.pdfFile = file;
          console.log('Article PDF uploaded:', file.filename);
        }
      });
    }
    
    console.log('Article form data received:', req.body);
    console.log('Article files received:', req.files ? req.files.map(f => `${f.fieldname}: ${f.filename}`) : 'No files');
    
    next();
  });
};

// Error handling middleware for multer
const handleArticleUploadError = (err, req, res, next) => {
  console.log('Article upload error:', err);
  console.log('Error code:', err.code);
  console.log('Error field:', err.field);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        error: 'File too large. Maximum size is 10MB for PDFs and 5MB for images.' 
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: `Unexpected file field "${err.field}". Only "featured_image" and "pdf_attachment" fields are allowed.`,
        details: `Received field: ${err.field}, Expected: featured_image or pdf_attachment`,
        suggestion: 'Make sure your form fields are named "featured_image" for images and "pdf_attachment" for PDFs'
      });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = {
  uploadArticleFiles,
  handleArticleUploadError
}; 