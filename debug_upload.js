const express = require('express');
const multer = require('multer');

// Simple debug server to see what's being sent
const app = express();

// Basic multer setup
const upload = multer();

app.post('/debug', upload.any(), (req, res) => {
  console.log('=== DEBUG UPLOAD ===');
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  console.log('Headers:', req.headers);
  
  res.json({
    body: req.body,
    files: req.files ? req.files.map(f => ({ fieldname: f.fieldname, originalname: f.originalname })) : [],
    headers: req.headers
  });
});

app.listen(3002, () => {
  console.log('Debug server running on port 3002');
  console.log('Send your Postman request to: http://localhost:3002/debug');
}); 