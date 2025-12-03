const express = require('express');
const router = express.Router();

const {
  trackVisitor,
  getDevicesLocations,
  getTotalVisitors,
  getDashboardStats,
  getVisitorStats,
  getPopularPages,
  getLiveVisitors
} = require('../controllers/analyticsController');

const { protect } = require('../middleware/authMiddleware');

// Public route - track visitor
router.post('/track', trackVisitor);

// Protected routes - admin only
router.get('/dashboard-stats', protect, getDashboardStats);
router.get('/visitor-stats', protect, getVisitorStats);
router.get('/popular-pages', protect, getPopularPages);
router.get('/live-visitors', protect, getLiveVisitors);
router.get('/devices-locations', protect, getDevicesLocations);
router.get('/total-visitors', protect, getTotalVisitors);

module.exports = router;