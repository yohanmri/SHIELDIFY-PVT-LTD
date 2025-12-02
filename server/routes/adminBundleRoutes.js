const express = require('express');
const router = express.Router();
const {
  getAllBundles,
  getBundleById,
  createBundle,
  updateBundle,
  deleteBundle,
  getBundlesByCategory
} = require('../controllers/adminBundleController'); // camelCase naming
const { protect, checkTemporaryPassword } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');

// All routes require authentication
router.use(protect);
router.use(checkTemporaryPassword);

// Get all bundles and create new bundle
router.route('/')
  .get(
    checkPermission('bundles', 'view'),
    getAllBundles
  )
  .post(
    checkPermission('bundles', 'create'),
    createBundle
  );

// Bundle operations by ID
router.route('/:id')
  .get(
    checkPermission('bundles', 'view'),
    getBundleById
  )
  .put(
    checkPermission('bundles', 'edit'),
    updateBundle
  )
  .delete(
    checkPermission('bundles', 'delete'),
    deleteBundle
  );

// Get bundles by category
router.get('/category/:category',
  checkPermission('bundles', 'view'),
  getBundlesByCategory
);

module.exports = router;
