const express = require('express');
const router = express.Router();

const {
  trackVisitor,
  getDevicesLocations,
  getTotalVisitors
} = require('../controllers/analyticsController');

const { protect } = require('../middleware/authMiddleware');

// Public route - track visitor
router.post('/track', trackVisitor);

// Protected routes - admin only
router.get('/devices-locations', protect, getDevicesLocations);
router.get('/total-visitors', protect, getTotalVisitors);

module.exports = router;