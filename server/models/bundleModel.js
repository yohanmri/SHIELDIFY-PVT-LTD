const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Bundle', bundleSchema);
