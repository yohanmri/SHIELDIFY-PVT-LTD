const express = require('express');
const router = express.Router();
const {
  getBundles,
  getBundleById,
  getBundlesByCategory
} = require('../controllers/bundleController');

// Public routes - no authentication required
router.get('/', getBundles);
router.get('/:id', getBundleById);
router.get('/category/:category', getBundlesByCategory);

module.exports = router;