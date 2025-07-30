const jwt = require('jsonwebtoken');
const supabase = require('../../utils/supabaseClient');
require('dotenv').config();

/**
 * Login controller
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if Supabase is available
    if (!supabase) {
      console.warn('Development mode: Skipping actual authentication');
      
      // For development only - mock authentication
      const mockUser = {
        id: 'dev-user-id',
        email: email,
        role: 'admin'
      };
      
      // Create JWT token with mock data
      const token = jwt.sign(
        mockUser,
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );
      
      return res.status(200).json({
        message: 'Development login successful',
        token,
        user: {
          id: mockUser.id,
          email: mockUser.email
        }
      });
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: data.user.id, 
        email: data.user.email,
        name: data.user.user_metadata?.name,
        role: 'admin'  // You can get this from your Supabase user metadata if configured
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

/**
 * Register controller
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Register with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'admin'
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'Registration successful. Please check your email for confirmation.',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || name // Use metadata or fallback to request name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

/**
 * Forgot password controller
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: 'Password reset instructions sent to your email'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

/**
 * Reset password controller
 */
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'New password is required' });
    }

    const { error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'An error occurred while resetting your password' });
  }
};

/**
 * Get current user info
 */
const getMe = async (req, res) => {
  try {
    // The user information is already attached to the request by the auth middleware
    res.status(200).json({
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Error getting user info:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  getMe
}; 