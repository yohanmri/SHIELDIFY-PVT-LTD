const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Safety Helmets',
        'Gum Boots',
        'Safety Hand Gloves',
        'Safety Jacket',
        'Safety Goggles',
        'Ear Muff',
        'First Aid Boxes',
        'Eye Protection',
        'Dust Mask',
        'Welders Hand Gloves',
        'Safty Belt',
        'Protection pants',
        'CPR Mask',
        'Face shield',
        'Safty sing bords'
      ]
    },
    workerType: {
      type: String,
      required: [true, 'Worker type is required'],
      enum: [
        'Engineer',
        'Construction Worker',
        'Electrician',
        'Supervisor',
        'Visitor',
        'Factory Worker',
        'Welder',
        'Safety Officer',
        'All Workers'
      ]
    },
    color: {
      type: String,
      required: [true, 'Color is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    features: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      required: [true, 'Product image is required']
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
productSchema.index({ category: 1, workerType: 1 });
productSchema.index({ name: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;