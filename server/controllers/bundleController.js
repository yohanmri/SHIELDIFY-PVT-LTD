const Bundle = require('../models/bundleModel');

// GET all active bundles (public)
const getBundles = async (req, res) => {
  try {
    // Only return active bundles for public API
    const bundles = await Bundle.find({ isActive: true });
    res.json({ success: true, data: bundles });
  } catch (err) {
    console.error('Error fetching bundles:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET single bundle by ID (public)
const getBundleById = async (req, res) => {
  try {
    const bundle = await Bundle.findById(req.params.id);
    
    // Check if bundle exists and is active
    if (!bundle || !bundle.isActive) {
      return res.status(404).json({ success: false, message: 'Bundle not found' });
    }
    
    res.json({ success: true, data: bundle });
  } catch (err) {
    console.error('Error fetching bundle:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET bundles by category (public)
const getBundlesByCategory = async (req, res) => {
  try {
    const bundles = await Bundle.find({ 
      category: req.params.category,
      isActive: true 
    });
    res.json({ success: true, data: bundles });
  } catch (err) {
    console.error('Error fetching bundles by category:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getBundles,
  getBundleById,
  getBundlesByCategory
};