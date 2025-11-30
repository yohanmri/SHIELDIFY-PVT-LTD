import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-avatar';
import '@esri/calcite-components/components/calcite-icon';

export default function LiveVisitors() {
  const navigate = useNavigate();
  const [liveCount, setLiveCount] = useState(47);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [activeVisitors, setActiveVisitors] = useState([
    { id: 1, page: 'Products Page', path: '/products', location: 'Colombo, Sri Lanka', device: 'Desktop', browser: 'Chrome', duration: '2m 34s', timestamp: '2 seconds ago' },
    { id: 2, page: 'Home Page', path: '/', location: 'Kandy, Sri Lanka', device: 'Mobile', browser: 'Safari', duration: '45s', timestamp: '5 seconds ago' },
    { id: 3, page: 'About Page', path: '/about', location: 'Galle, Sri Lanka', device: 'Desktop', browser: 'Firefox', duration: '1m 12s', timestamp: '8 seconds ago' },
    { id: 4, page: 'Contact Page', path: '/contact', location: 'Jaffna, Sri Lanka', device: 'Tablet', browser: 'Chrome', duration: '34s', timestamp: '12 seconds ago' },
    { id: 5, page: 'Products Page', path: '/products', location: 'Negombo, Sri Lanka', device: 'Mobile', browser: 'Chrome', duration: '3m 21s', timestamp: '15 seconds ago' },
    { id: 6, page: 'Services Page', path: '/services', location: 'Matara, Sri Lanka', device: 'Desktop', browser: 'Edge', duration: '1m 45s', timestamp: '18 seconds ago' },
    { id: 7, page: 'Home Page', path: '/', location: 'Kurunegala, Sri Lanka', device: 'Mobile', browser: 'Samsung Internet', duration: '56s', timestamp: '22 seconds ago' },
    { id: 8, page: 'Products Page', path: '/products', location: 'Anuradhapura, Sri Lanka', device: 'Desktop', browser: 'Chrome', duration: '2m 8s', timestamp: '28 seconds ago' }
  ]);

  const [pageActivity, setPageActivity] = useState([
    { page: 'Products Page', viewers: 18, trend: 'up' },
    { page: 'Home Page', viewers: 12, trend: 'up' },
    { page: 'About Page', viewers: 8, trend: 'stable' },
    { page: 'Services Page', viewers: 5, trend: 'down' },
    { page: 'Contact Page', viewers: 4, trend: 'up' }
  ]);

  const [deviceBreakdown, setDeviceBreakdown] = useState([
    { device: 'Desktop', count: 23, percentage: 48.9 },
    { device: 'Mobile', count: 19, percentage: 40.4 },
    { device: 'Tablet', count: 5, percentage: 10.6 }
  ]);

  const [recentActions, setRecentActions] = useState([
    { action: 'Page View', page: 'Products Page', user: 'Visitor #1247', time: 'Just now' },
    { action: 'Button Click', page: 'Contact Page', user: 'Visitor #1246', time: '3s ago' },
    { action: 'Page View', page: 'Home Page', user: 'Visitor #1245', time: '7s ago' },
    { action: 'Form Submit', page: 'Contact Page', user: 'Visitor #1244', time: '12s ago' },
    { action: 'Page View', page: 'About Page', user: 'Visitor #1243', time: '18s ago' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Randomly fluctuate live count
      setLiveCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(35, Math.min(65, prev + change));
      });
      
      setLastUpdate(new Date());
      
      // Update timestamps
      setActiveVisitors(prev => prev.map(v => ({
        ...v,
        timestamp: updateTimestamp(v.timestamp)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const updateTimestamp = (oldTimestamp) => {
    const match = oldTimestamp.match(/(\d+)\s*(second|minute)s?\s*ago/);
    if (!match) return oldTimestamp;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    if (unit === 'second') {
      const newValue = value + 5;
      if (newValue >= 60) return '1 minute ago';
      return `${newValue} seconds ago`;
    }
    
    return `${value + 1} minutes ago`;
  };

  const getDeviceIcon = (device) => {
    switch(device) {
      case 'Desktop': return 'monitor';
      case 'Mobile': return 'mobile';
      case 'Tablet': return 'tablet';
      default: return 'devices';
    }
  };

  const getBrowserIcon = (browser) => {
    switch(browser) {
      case 'Chrome': return 'browser';
      case 'Safari': return 'browser';
      case 'Firefox': return 'browser';
      case 'Edge': return 'browser';
      default: return 'browser';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return 'caret-up';
      case 'down': return 'caret-down';
      case 'stable': return 'minus';
      default: return 'minus';
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return '#00a884';
      case 'down': return '#dc3545';
      case 'stable': return '#6b6b6b';
      default: return '#6b6b6b';
    }
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto', background: 'var(--calcite-ui-background)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
                Live Visitors
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Real-time visitor activity and engagement
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <calcite-button
                appearance={autoRefresh ? 'solid' : 'outline'}
                icon-start="refresh"
                scale="s"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
              </calcite-button>
              <calcite-button
                appearance="outline"
                icon-start="arrow-left"
                onClick={() => navigate('/admin/dashboard')}
              >
                Back
              </calcite-button>
            </div>
          </div>

          {/* Live Count Hero */}
          <calcite-card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #0079c1 0%, #00a884 100%)' }}>
            <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: '#00ff88',
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 0 20px #00ff88'
                }}></div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600', opacity: 0.9 }}>
                  Active Visitors Right Now
                </h2>
              </div>
              <div style={{ fontSize: '72px', fontWeight: '700', marginBottom: '8px' }}>
                {liveCount}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </calcite-card>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Active Visitors List */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
                  Active Visitor Sessions
                </h2>
                <div style={{ maxHeight: '600px', overflow: 'auto' }}>
                  {activeVisitors.map((visitor) => (
                    <div key={visitor.id} style={{ 
                      padding: '16px',
                      marginBottom: '12px',
                      background: 'var(--calcite-ui-foreground-2)',
                      borderRadius: '6px',
                      borderLeft: '4px solid #0079c1'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>
                            {visitor.page}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                            {visitor.path}
                          </div>
                        </div>
                        <calcite-chip scale="s" appearance="outline">
                          {visitor.timestamp}
                        </calcite-chip>
                      </div>
                      
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '12px',
                        fontSize: '13px',
                        color: 'var(--calcite-ui-text-2)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <calcite-icon icon="map-pin" scale="s"></calcite-icon>
                          {visitor.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <calcite-icon icon={getDeviceIcon(visitor.device)} scale="s"></calcite-icon>
                          {visitor.device}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <calcite-icon icon="clock" scale="s"></calcite-icon>
                          {visitor.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </calcite-card>

            {/* Right Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Page Activity */}
              <calcite-card>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                    Active Pages
                  </h3>
                  {pageActivity.map((page, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: index < pageActivity.length - 1 ? '1px solid var(--calcite-ui-border-3)' : 'none'
                    }}>
                      <div style={{ fontSize: '14px' }}>{page.page}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#0079c1' }}>
                          {page.viewers}
                        </span>
                        <calcite-icon 
                          icon={getTrendIcon(page.trend)} 
                          scale="s"
                          style={{ color: getTrendColor(page.trend) }}
                        ></calcite-icon>
                      </div>
                    </div>
                  ))}
                </div>
              </calcite-card>

              {/* Device Breakdown */}
              <calcite-card>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                    Devices
                  </h3>
                  {deviceBreakdown.map((device, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <calcite-icon icon={getDeviceIcon(device.device)} scale="s"></calcite-icon>
                          <span style={{ fontSize: '14px' }}>{device.device}</span>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>
                          {device.count}
                        </span>
                      </div>
                      <div style={{ 
                        width: '100%', 
                        height: '6px', 
                        background: 'var(--calcite-ui-foreground-2)', 
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: `${device.percentage}%`, 
                          height: '100%', 
                          background: '#0079c1',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </calcite-card>

              {/* Recent Actions */}
              <calcite-card>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                    Recent Actions
                  </h3>
                  {recentActions.map((action, index) => (
                    <div key={index} style={{ 
                      padding: '10px 0',
                      borderBottom: index < recentActions.length - 1 ? '1px solid var(--calcite-ui-border-3)' : 'none'
                    }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                        {action.action}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                        {action.page} • {action.time}
                      </div>
                    </div>
                  ))}
                </div>
              </calcite-card>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </calcite-shell>
  );
}