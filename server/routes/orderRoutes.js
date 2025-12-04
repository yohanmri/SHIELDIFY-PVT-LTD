const express = require('express');
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getPendingOrders,
    getCompletedOrders,
    getOrderById,
    updateOrderStatus,
    getPendingCount
} = require('../controllers/orderController');

const { protect } = require('../middleware/authMiddleware');

// Public route - create order/inquiry
router.post('/', createOrder);

// Protected routes - admin only
router.get('/', protect, getAllOrders);
router.get('/pending', protect, getPendingOrders);
router.get('/completed', protect, getCompletedOrders);
router.get('/count/pending', protect, getPendingCount);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
