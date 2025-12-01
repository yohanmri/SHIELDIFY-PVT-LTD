const express = require('express');
const router = express.Router();

const {
  requestOTP,
  login,
  getMe,
  changePassword,
  logout
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/request-otp', requestOTP);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

module.exports = router;
