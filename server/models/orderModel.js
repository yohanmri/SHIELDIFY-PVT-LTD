const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    itemType: {
        type: String,
        enum: ['product', 'bundle'],
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'items.itemType'
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String
    }
});

const orderSchema = new mongoose.Schema(
    {
        // Customer Information
        customerName: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true
        },
        customerEmail: {
            type: String,
            required: [true, 'Customer email is required'],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
        },
        customerPhone: {
            type: String,
            required: [true, 'Customer phone is required'],
            trim: true
        },

        // Order Items
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: function (items) {
                    return items && items.length > 0;
                },
                message: 'Order must contain at least one item'
            }
        },

        // Order Status
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'delivered'],
            default: 'pending',
            index: true
        },

        // Pricing
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        // Notes
        notes: {
            type: String,
            trim: true,
            maxlength: 500
        },
        adminNotes: {
            type: String,
            trim: true,
            maxlength: 500
        },

        // Processing Information
        processedAt: {
            type: Date
        },
        processedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }
    },
    {
        timestamps: true
    }
);

// Indexes for efficient querying
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ customerEmail: 1 });
orderSchema.index({ createdAt: -1 });

// Virtual for order reference number
orderSchema.virtual('orderReference').get(function () {
    return `ORD-${this._id.toString().slice(-8).toUpperCase()}`;
});

// Ensure virtuals are included in JSON
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
