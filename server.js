const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // Added for serving static files

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');

// Initialize Express app
const app = express();

// Trust proxy - essential for Railway and other reverse proxy deployments
// This allows Express to correctly detect HTTPS protocol and client IP
app.set('trust proxy', true);

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middlewares
// Add CORS headers for static files (uploads) before serving them
app.use('/uploads', (req, res, next) => {
  // Get allowed origins from environment or use defaults
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'];
  
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const origin = req.headers.origin;
  
  // In development, allow all origins
  if (isDevelopment) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    console.log('CORS: Development mode - Allowing upload access from:', origin || 'direct access');
  } else if (!origin || allowedOrigins.includes(origin)) {
    // In production, only allow specific origins
    res.header('Access-Control-Allow-Origin', origin || allowedOrigins[0]);
    console.log('CORS: Production mode - Allowing upload access from:', origin);
  } else {
    console.log('CORS: Blocked upload access from:', origin);
  }
  
  // Enhanced headers for better file serving
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Range');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
  
  // Add headers for better PDF/file handling
  if (req.path.endsWith('.pdf')) {
    res.header('Content-Type', 'application/pdf');
    res.header('Content-Disposition', 'inline');
    res.header('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.header('X-Content-Type-Options', 'nosniff');
  } else if (req.path.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    res.header('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Serve static files (uploaded images and PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [
      'http://localhost:5173', 
      'http://localhost:3000', 
      'http://localhost:3001',
      'https://numerica-website-production.up.railway.app'
    ];

// For development, allow all origins if NODE_ENV is not production
const isDevelopment = process.env.NODE_ENV !== 'production';

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (isDevelopment) {
      console.log('Development mode: Allowing origin:', origin);
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    console.log('CORS allowed origin:', origin);
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  preflightContinue: false // Ensure we handle preflight requests immediately
}));

// Enhanced preflight handling for all routes
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
  res.sendStatus(200);
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Numérica Tax & Accounting API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      public: '/api/public',
      admin: '/api/admin'
    }
  });
});

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Debug endpoint for PDF files
app.get('/uploads/articles/pdfs/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', 'articles', 'pdfs', filename);
  
  console.log(`📄 PDF Request: ${filename} from ${req.headers.origin || 'direct'}`);
  
  // Check if file exists
  if (!require('fs').existsSync(filePath)) {
    console.log(`❌ PDF not found: ${filename}`);
    return res.status(404).json({ error: 'PDF file not found' });
  }
  
  // Get file stats
  const stats = require('fs').statSync(filePath);
  console.log(`📊 PDF Stats: ${filename} - Size: ${stats.size} bytes`);
  
  // Set headers explicitly for PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', stats.size);
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  
  // Handle range requests for large PDFs
  const range = req.headers.range;
  if (range) {
    console.log(`📊 Range request for ${filename}: ${range}`);
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
    
    if (start >= stats.size) {
      res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + stats.size);
      return;
    }
    
    const chunksize = (end - start) + 1;
    const file = require('fs').createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'application/pdf',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // Send the full file
    console.log(`📤 Sending full PDF: ${filename}`);
    const file = require('fs').createReadStream(filePath);
    file.pipe(res);
  }
});

// PDF validation endpoint for debugging
app.get('/api/debug/pdf/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', 'articles', 'pdfs', filename);
  
  if (!require('fs').existsSync(filePath)) {
    return res.status(404).json({ error: 'PDF file not found' });
  }
  
  const fs = require('fs');
  const stats = fs.statSync(filePath);
  
  // Read first 100 bytes to check PDF header
  const buffer = Buffer.alloc(100);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buffer, 0, 100, 0);
  fs.closeSync(fd);
  
  const header = buffer.toString('ascii', 0, 10);
  const isPDF = header.startsWith('%PDF-');
  
  res.json({
    filename: filename,
    exists: true,
    size: stats.size,
    lastModified: stats.mtime,
    header: header,
    isPDF: isPDF,
    url: `http://localhost:${process.env.PORT || 3000}/uploads/articles/pdfs/${filename}`,
    validation: isPDF ? 'Valid PDF header' : 'Invalid PDF header'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Resource not found' });
});

// Start server
const PORT = process.env.PORT || 3000;

// Add error handling for server startup
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📚 API documentation available at: http://localhost:${PORT}/`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
}); 