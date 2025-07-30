const express = require('express');
const multer = require('multer');

// Simple debug server to see what's being sent for team requests
const app = express();

// Basic multer setup for team images
const upload = multer();

app.post('/debug-team', upload.any(), (req, res) => {
  console.log('=== DEBUG TEAM REQUEST ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  console.log('Files:', req.files);
  console.log('Query:', req.query);
  
  // Check for required fields
  const name = req.body.name;
  const title = req.body.title;
  
  console.log('Name field:', name);
  console.log('Title field:', title);
  console.log('Name type:', typeof name);
  console.log('Title type:', typeof title);
  console.log('Name length:', name ? name.length : 'undefined');
  console.log('Title length:', title ? title.length : 'undefined');
  console.log('Name truthy:', !!name);
  console.log('Title truthy:', !!title);
  
  // Check all body fields
  console.log('All body fields:');
  Object.keys(req.body).forEach(key => {
    console.log(`  ${key}: "${req.body[key]}" (type: ${typeof req.body[key]})`);
  });
  
  res.json({
    success: true,
    received_data: {
      method: req.method,
      url: req.url,
      content_type: req.headers['content-type'],
      body: req.body,
      body_keys: Object.keys(req.body),
      files: req.files ? req.files.map(f => ({ 
        fieldname: f.fieldname, 
        originalname: f.originalname,
        size: f.size 
      })) : [],
      required_fields: {
        name: name,
        title: title,
        name_exists: !!name,
        title_exists: !!title,
        name_empty: name === '',
        title_empty: title === '',
        name_undefined: name === undefined,
        title_undefined: title === undefined
      }
    }
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Debug server running on http://localhost:${PORT}`);
  console.log('Send your team creation request to: http://localhost:3002/debug-team');
  console.log('This will show you exactly what data is being received.');
}); 