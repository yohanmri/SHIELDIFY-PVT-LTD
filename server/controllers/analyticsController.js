const Analytics = require('../models/analyticsModel');
const crypto = require('crypto');

// Helper function to hash IP for privacy
const hashIP = (ip) => {
  return crypto.createHash('sha256').update(ip).digest('hex');
};

// Helper function to get date range
const getDateRange = (range) => {
  const now = new Date();
  let startDate;
  
  switch (range) {
    case '24hours':
      startDate = new Date(now - 24 * 60 * 60 * 1000);
      break;
    case '7days':
      startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30days':
      startDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90days':
      startDate = new Date(now - 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
  }
  
  return { startDate, endDate: now };
};

// Track visitor (called from frontend)
exports.trackVisitor = async (req, res) => {
  try {
    const { sessionId, device, location, page } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    
    // Check if this session was tracked in the last 5 minutes (prevent duplicates)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingSession = await Analytics.findOne({
      sessionId,
      visitedAt: { $gte: fiveMinutesAgo }
    });
    
    if (existingSession) {
      // Update the last seen time instead of creating new entry
      existingSession.visitedAt = new Date();
      existingSession.page = page;
      await existingSession.save();
      
      return res.status(200).json({
        success: true,
        message: 'Session updated',
        duplicate: true
      });
    }
    
    // Create new analytics entry
    const analytics = new Analytics({
      sessionId,
      device,
      location,
      page,
      ipHash: hashIP(ip)
    });
    
    await analytics.save();
    
    return res.status(201).json({
      success: true,
      message: 'Visitor tracked successfully'
    });
  } catch (error) {
    console.error('Track visitor error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error tracking visitor',
      error: error.message
    });
  }
};

// Get device and location statistics
exports.getDevicesLocations = async (req, res) => {
  try {
    const { range = '7days' } = req.query;
    const { startDate, endDate } = getDateRange(range);
    
    // Get all unique sessions in date range
    const uniqueSessions = await Analytics.distinct('sessionId', {
      visitedAt: { $gte: startDate, $lte: endDate }
    });
    
    const totalDevices = uniqueSessions.length;
    
    // Device statistics (count unique sessions per device type)
    const deviceStats = await Analytics.aggregate([
      {
        $match: {
          visitedAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            sessionId: '$sessionId',
            deviceType: '$device.type'
          }
        }
      },
      {
        $group: {
          _id: '$_id.deviceType',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Browser statistics (count unique sessions per browser)
    const browserStats = await Analytics.aggregate([
      {
        $match: {
          visitedAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            sessionId: '$sessionId',
            browser: '$device.browser'
          }
        }
      },
      {
        $group: {
          _id: '$_id.browser',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    // OS statistics (count unique sessions per OS)
    const osStats = await Analytics.aggregate([
      {
        $match: {
          visitedAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            sessionId: '$sessionId',
            os: '$device.os'
          }
        }
      },
      {
        $group: {
          _id: '$_id.os',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Location statistics (count unique sessions per location)
    const locationStats = await Analytics.aggregate([
      {
        $match: {
          visitedAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            sessionId: '$sessionId',
            city: '$location.city',
            district: '$location.district'
          }
        }
      },
      {
        $group: {
          _id: {
            city: '$_id.city',
            district: '$_id.district'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    // Screen resolution statistics (count unique sessions per resolution)
    const screenStats = await Analytics.aggregate([
      {
        $match: {
          visitedAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            sessionId: '$sessionId',
            resolution: '$device.screenResolution'
          }
        }
      },
      {
        $group: {
          _id: '$_id.resolution',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    // Format device data with colors
    const deviceColors = {
      'Desktop': '#0079c1',
      'Mobile': '#00a884',
      'Tablet': '#9333ea'
    };
    
    const devices = deviceStats.map(stat => ({
      label: stat._id || 'Unknown',
      value: stat.count,
      color: deviceColors[stat._id] || '#6b6b6b',
      percentage: ((stat.count / totalDevices) * 100).toFixed(1)
    }));
    
    // Ensure all device types are present
    ['Desktop', 'Mobile', 'Tablet'].forEach(type => {
      if (!devices.find(d => d.label === type)) {
        devices.push({
          label: type,
          value: 0,
          color: deviceColors[type],
          percentage: 0
        });
      }
    });
    
    // Format browser data with colors
    const browserColors = {
      'Chrome': '#0079c1',
      'Safari': '#00a884',
      'Firefox': '#ffa500',
      'Edge': '#9333ea',
      'Other': '#6b6b6b'
    };
    
    const browsers = browserStats.map(stat => ({
      label: stat._id || 'Other',
      value: stat.count,
      color: browserColors[stat._id] || browserColors['Other']
    }));
    
    // Format OS data with colors
    const osColors = {
      'Windows': '#0079c1',
      'Android': '#00a884',
      'iOS': '#6b6b6b',
      'macOS': '#ffa500',
      'Linux': '#9333ea'
    };
    
    const os = osStats.map(stat => ({
      label: stat._id || 'Other',
      value: stat.count,
      color: osColors[stat._id] || '#6b6b6b'
    }));
    
    // Format location data
    const locations = locationStats.map((stat, index) => ({
      city: stat._id.city || 'Unknown',
      district: stat._id.district || 'Unknown',
      visitors: stat.count,
      percentage: ((stat.count / totalDevices) * 100).toFixed(1)
    }));
    
    // Format screen resolution data
    const screens = screenStats.map(stat => ({
      resolution: stat._id || 'Unknown',
      count: stat.count,
      percentage: ((stat.count / totalDevices) * 100).toFixed(1)
    }));
    
    return res.status(200).json({
      success: true,
      data: {
        totalDevices,
        desktopUsers: devices.find(d => d.label === 'Desktop')?.value || 0,
        mobileUsers: devices.find(d => d.label === 'Mobile')?.value || 0,
        tabletUsers: devices.find(d => d.label === 'Tablet')?.value || 0,
        devices,
        browsers,
        os,
        locations,
        screens
      }
    });
  } catch (error) {
    console.error('Get devices/locations error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching analytics data',
      error: error.message
    });
  }
};

// Get total visitors
exports.getTotalVisitors = async (req, res) => {
  try {
    const { range = '7days' } = req.query;
    const { startDate, endDate } = getDateRange(range);
    
    const totalVisitors = await Analytics.countDocuments({
      visitedAt: { $gte: startDate, $lte: endDate }
    });
    
    const uniqueVisitors = await Analytics.distinct('sessionId', {
      visitedAt: { $gte: startDate, $lte: endDate }
    });
    
    return res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        uniqueVisitors: uniqueVisitors.length
      }
    });
  } catch (error) {
    console.error('Get total visitors error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching visitor data',
      error: error.message
    });
  }
};