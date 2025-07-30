const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware to verify JWT token
 */
const authenticateToken = (req, res, next) => {
  // Get the auth header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    // More detailed error response
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Invalid token',
        details: error.message,
        suggestion: 'Please obtain a new token by logging in again'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expired',
        details: 'Your session has expired',
        suggestion: 'Please log in again to get a new token'
      });
    }
    
    res.status(403).json({ 
      error: 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Token verification failed'
    });
  }
};

module.exports = {
  authenticateToken
}; 