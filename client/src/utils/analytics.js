import { v4 as uuidv4 } from 'uuid';

// Storage keys
const SESSION_ID_KEY = 'sessionId';
const TRACKING_FLAG_KEY = 'analyticsTracked';
const TRACKING_TIMESTAMP_KEY = 'analyticsTrackedAt';

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
};

// Check if tracking was recently done (within last 5 minutes)
const wasRecentlyTracked = () => {
  const tracked = sessionStorage.getItem(TRACKING_FLAG_KEY);
  const timestamp = sessionStorage.getItem(TRACKING_TIMESTAMP_KEY);
  
  if (!tracked || !timestamp) {
    return false;
  }
  
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
  return parseInt(timestamp) > fiveMinutesAgo;
};

// Mark as tracked
const markAsTracked = () => {
  sessionStorage.setItem(TRACKING_FLAG_KEY, 'true');
  sessionStorage.setItem(TRACKING_TIMESTAMP_KEY, Date.now().toString());
};

// Detect device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
};

// Get browser info
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Other';
  let version = '';
  
  if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/(\d+)/)?.[1] || '';
  } else if (ua.indexOf('Edg') > -1) {
    browser = 'Edge';
    version = ua.match(/Edg\/(\d+)/)?.[1] || '';
  } else if (ua.indexOf('Chrome') > -1) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/(\d+)/)?.[1] || '';
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Safari';
    version = ua.match(/Version\/(\d+)/)?.[1] || '';
  }
  
  return { browser, version };
};

// Get OS info
const getOSInfo = () => {
  const ua = navigator.userAgent;
  let os = 'Other';
  let version = '';
  
  if (ua.indexOf('Win') > -1) {
    os = 'Windows';
  } else if (ua.indexOf('Mac') > -1) {
    os = 'macOS';
  } else if (ua.indexOf('Linux') > -1) {
    os = 'Linux';
  } else if (ua.indexOf('Android') > -1) {
    os = 'Android';
  } else if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) {
    os = 'iOS';
  }
  
  return { os, version };
};

// Get screen resolution
const getScreenResolution = () => {
  return `${window.screen.width}x${window.screen.height}`;
};

// Track page view
export const trackPageView = async () => {
  // Prevent duplicate tracking
  if (wasRecentlyTracked()) {
    console.log('Analytics: Already tracked recently, skipping...');
    return;
  }

  try {
    const sessionId = getSessionId();
    const { browser, version: browserVersion } = getBrowserInfo();
    const { os, version: osVersion } = getOSInfo();
    
    const data = {
      sessionId,
      device: {
        type: getDeviceType(),
        browser,
        browserVersion,
        os,
        osVersion,
        screenResolution: getScreenResolution()
      },
      location: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      page: {
        url: window.location.href,
        path: window.location.pathname,
        title: document.title,
        referrer: document.referrer
      }
    };
    
    const response = await fetch('http://localhost:3001/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      markAsTracked();
      console.log('Analytics: Page view tracked successfully');
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Clear tracking flag (useful for testing or when you want to re-track)
export const clearTrackingFlag = () => {
  sessionStorage.removeItem(TRACKING_FLAG_KEY);
  sessionStorage.removeItem(TRACKING_TIMESTAMP_KEY);
};