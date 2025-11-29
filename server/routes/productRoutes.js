const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/productController');

// IMPORTANT: Specific routes must come BEFORE parameterized routes
// Get products by category (must be before /:id route)
router.get('/category/:category', getProductsByCategory);

// General routes
router.route('/')
  .get(getAllProducts)
  .post(createProduct);

// Parameterized routes (must be last)
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;