//server->middleware->authMiddleware.js

const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }
    
    // Make sure token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get admin from token
      const admin = await Admin.findById(decoded.id)
        .populate('role')
        .select('-password -otp -otpExpires');
      
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin not found'
        });
      }
      
      // Check if admin is active
      if (!admin.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Your account has been deactivated. Please contact administrator.'
        });
      }
      
      // Check if account is locked
      if (admin.isLocked) {
        return res.status(401).json({
          success: false,
          message: 'Your account is temporarily locked due to multiple failed login attempts. Please try again later.'
        });
      }
      
      // Add admin to request
      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
};

// Check if super admin
exports.isSuperAdmin = (req, res, next) => {
  if (!req.admin.isSuperAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Super Admin privileges required.'
    });
  }
  next();
};

// Force password change for temporary passwords
exports.checkTemporaryPassword = (req, res, next) => {
  if (req.admin.isTemporaryPassword) {
    return res.status(403).json({
      success: false,
      message: 'You must change your temporary password before accessing this resource.',
      requirePasswordChange: true
    });
  }
  next();
};