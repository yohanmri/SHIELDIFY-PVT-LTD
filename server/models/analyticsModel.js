const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    // Session Information
    sessionId: {
      type: String,
      required: true,
      index: true
    },
    
    // Device Information
    device: {
      type: {
        type: String,
        enum: ['Desktop', 'Mobile', 'Tablet'],
        required: true
      },
      browser: String,
      browserVersion: String,
      os: String,
      osVersion: String,
      screenResolution: String
    },
    
    // Location Information
    location: {
      country: String,
      city: String,
      district: String,
      region: String,
      latitude: Number,
      longitude: Number,
      timezone: String
    },
    
    // Page Information
    page: {
      url: String,
      path: String,
      title: String,
      referrer: String
    },
    
    // Visit Information
    visitedAt: {
      type: Date,
      default: Date.now,
      index: true
    },
    duration: Number, // in seconds
    
    // IP Address (hashed for privacy)
    ipHash: String
  },
  {
    timestamps: true
  }
);

// Indexes for efficient querying
analyticsSchema.index({ visitedAt: -1 });
analyticsSchema.index({ 'device.type': 1 });
analyticsSchema.index({ 'location.city': 1 });
analyticsSchema.index({ sessionId: 1, visitedAt: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;