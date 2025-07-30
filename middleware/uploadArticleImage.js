const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/articles');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'article-' + uniqueSuffix + ext);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  console.log('Processing article image file:', file.fieldname, file.originalname);
  
  // Only apply filter to image files
  if (file.fieldname === 'featured_image') {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      return cb(new Error('Only image files (jpg, jpeg, png, gif, webp, svg) are allowed!'), false);
    }
  }
  cb(null, true);
};

// Configure multer to handle any files (more flexible)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Flexible upload middleware that handles form data and files
const uploadArticleImage = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      return handleArticleUploadError(err, req, res, next);
    }
    
    // If files were uploaded, move the first image to req.file for compatibility
    if (req.files && req.files.length > 0) {
      const imageFile = req.files.find(file => file.fieldname === 'featured_image');
      if (imageFile) {
        req.file = imageFile;
        console.log('Article image file uploaded:', req.file.filename);
      }
    }
    
    console.log('Article form data received:', req.body);
    console.log('Article files received:', req.files ? req.files.map(f => f.fieldname) : 'No files');
    
    next();
  });
};

// Error handling middleware for multer
const handleArticleUploadError = (err, req, res, next) => {
  console.log('Article upload error:', err);
  console.log('Error code:', err.code);
  console.log('Error field:', err.field);
  console.log('Request file:', req.file);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: `Unexpected file field "${err.field}". Only "featured_image" field is allowed for article image uploads.`,
        details: `Received field: ${err.field}, Expected: featured_image`,
        suggestion: 'Make sure your form field is named "featured_image"'
      });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = {
  uploadArticleImage,
  handleArticleUploadError
}; 