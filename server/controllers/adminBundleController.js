const Bundle = require('../models/bundleModel'); // Make a separate model for bundles

// GET all bundles
const getBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find();
    res.json({ success: true, data: bundles });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET single bundle by ID
const getBundleById = async (req, res) => {
  try {
    const bundle = await Bundle.findById(req.params.id);
    if (!bundle) return res.status(404).json({ success: false, message: 'Bundle not found' });
    res.json({ success: true, data: bundle });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// CREATE bundle
const createBundle = async (req, res) => {
  try {
    const newBundle = new Bundle(req.body);
    const savedBundle = await newBundle.save();
    res.status(201).json({ success: true, data: savedBundle });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// UPDATE bundle
const updateBundle = async (req, res) => {
  try {
    const updatedBundle = await Bundle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBundle) return res.status(404).json({ success: false, message: 'Bundle not found' });
    res.json({ success: true, data: updatedBundle });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE bundle
const deleteBundle = async (req, res) => {
  try {
    const deletedBundle = await Bundle.findByIdAndDelete(req.params.id);
    if (!deletedBundle) return res.status(404).json({ success: false, message: 'Bundle not found' });
    res.json({ success: true, message: 'Bundle deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllBundles: getBundles, // rename getBundles to match the route
  getBundleById,
  createBundle,
  updateBundle,
  deleteBundle,
  getBundlesByCategory: async (req, res) => {
    try {
      const bundles = await Bundle.find({ category: req.params.category });
      res.json({ success: true, data: bundles });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};
