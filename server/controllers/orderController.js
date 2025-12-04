const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Bundle = require('../models/bundleModel');

// Create new order/inquiry (Public route)
exports.createOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, items, notes } = req.body;

        // Validate required fields
        if (!customerName || !customerEmail || !customerPhone) {
            return res.status(400).json({
                success: false,
                message: 'Customer name, email, and phone are required'
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item'
            });
        }

        // Validate and enrich items with current prices
        const enrichedItems = [];
        let totalAmount = 0;

        for (const item of items) {
            let itemData;

            if (item.itemType === 'product') {
                itemData = await Product.findById(item.itemId);
            } else if (item.itemType === 'bundle') {
                itemData = await Bundle.findById(item.itemId);
            }

            if (!itemData) {
                return res.status(404).json({
                    success: false,
                    message: `${item.itemType} with ID ${item.itemId} not found`
                });
            }

            const price = item.itemType === 'product' ? itemData.price : itemData.discountPrice;
            const itemTotal = price * item.quantity;
            totalAmount += itemTotal;

            enrichedItems.push({
                itemType: item.itemType,
                itemId: item.itemId,
                itemName: itemData.name,
                quantity: item.quantity,
                price: price,
                image: itemData.image
            });
        }

        // Create order
        const order = await Order.create({
            customerName,
            customerEmail,
            customerPhone,
            items: enrichedItems,
            totalAmount,
            notes,
            status: 'pending'
        });

        return res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: {
                orderId: order._id,
                orderReference: order.orderReference,
                customerEmail: order.customerEmail,
                customerPhone: order.customerPhone
            }
        });
    } catch (error) {
        console.error('Create order error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const { status, search, page = 1, limit = 20 } = req.query;

        const query = {};

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { customerName: { $regex: search, $options: 'i' } },
                { customerEmail: { $regex: search, $options: 'i' } },
                { customerPhone: { $regex: search, $options: 'i' } }
            ];
        }

        const orders = await Order.find(query)
            .populate('processedBy', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Order.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: {
                orders,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                totalOrders: count
            }
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

// Get pending orders (Admin)
exports.getPendingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'pending' })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Get pending orders error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching pending orders',
            error: error.message
        });
    }
};

// Get completed orders (Admin) - Only delivered orders
exports.getCompletedOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            status: 'delivered'
        })
            .populate('processedBy', 'name email')
            .sort({ processedAt: -1 });

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Get completed orders error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching completed orders',
            error: error.message
        });
    }
};

// Get single order by ID (Admin)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('processedBy', 'name email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Get order by ID error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, adminNotes } = req.body;
        const orderId = req.params.id;

        if (!['approved', 'rejected', 'delivered'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be "approved", "rejected", or "delivered"'
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Validate status transitions
        if (order.status === 'pending' && !['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Pending orders can only be approved or rejected'
            });
        }

        if (order.status === 'approved' && status !== 'delivered') {
            return res.status(400).json({
                success: false,
                message: 'Approved orders can only be marked as delivered'
            });
        }

        if (['rejected', 'delivered'].includes(order.status)) {
            return res.status(400).json({
                success: false,
                message: 'This order has already been processed and cannot be updated'
            });
        }

        order.status = status;
        order.processedAt = new Date();
        order.processedBy = req.admin.id;

        if (adminNotes) {
            order.adminNotes = adminNotes;
        }

        await order.save();

        return res.status(200).json({
            success: true,
            message: `Order ${status} successfully`,
            data: order
        });
    } catch (error) {
        console.error('Update order status error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
};

// Get pending orders count (Admin - for notifications)
exports.getPendingCount = async (req, res) => {
    try {
        const count = await Order.countDocuments({ status: 'pending' });

        return res.status(200).json({
            success: true,
            data: { count }
        });
    } catch (error) {
        console.error('Get pending count error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching pending count',
            error: error.message
        });
    }
};
