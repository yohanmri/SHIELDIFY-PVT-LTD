
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/adminProductController'); // camelCase naming
const { protect, checkTemporaryPassword } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');

// All routes require authentication
router.use(protect);
router.use(checkTemporaryPassword);

// Get all products and create new product
router.route('/')
  .get(
    checkPermission('products', 'view'),
    getAllProducts
  )
  .post(
    checkPermission('products', 'create'),
    createProduct
  );

// Product operations by ID
router.route('/:id')
  .get(
    checkPermission('products', 'view'),
    getProductById
  )
  .put(
    checkPermission('products', 'edit'),
    updateProduct
  )
  .delete(
    checkPermission('products', 'delete'),
    deleteProduct
  );

// Get products by category
router.get('/category/:category',
  checkPermission('products', 'view'),
  getProductsByCategory
);

module.exports = router;