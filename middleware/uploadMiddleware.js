const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads/banners');
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
    cb(null, 'banner-' + uniqueSuffix + ext);
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  console.log('Processing file:', file.fieldname, file.originalname);
  
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Configure multer with more flexible settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Single file upload middleware
const uploadBannerImage = upload.single('image');

// Alternative: More flexible upload that accepts any single file
const uploadAnyImage = upload.any();

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
  console.log('Upload error:', err);
  console.log('Error code:', err.code);
  console.log('Error field:', err.field);
  console.log('Request files:', req.files);
  console.log('Request file:', req.file);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        error: `Unexpected file field "${err.field}". Only "image" field is allowed for file uploads.`,
        details: `Received field: ${err.field}, Expected: image`,
        suggestion: 'Make sure your form field is named "image"'
      });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Flexible upload middleware that handles any file field
const flexibleUpload = (req, res, next) => {
  uploadAnyImage(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, next);
    }
    
    // If files were uploaded, move the first one to req.file for compatibility
    if (req.files && req.files.length > 0) {
      req.file = req.files[0];
      console.log('File uploaded via flexible upload:', req.file);
    }
    
    next();
  });
};

module.exports = {
  uploadBannerImage,
  uploadAnyImage,
  flexibleUpload,
  handleUploadError
}; 