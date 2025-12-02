//server->routes->authRoutes.js

const express = require('express');
const router = express.Router();

const {
  requestOTP,
  login,
  getMe,
  changePassword,
  logout,
  resetPasswordWithOTP
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', login);
router.post('/request-otp', requestOTP);
router.post('/reset-password', resetPasswordWithOTP);

// Protected routes
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

module.exports = router;