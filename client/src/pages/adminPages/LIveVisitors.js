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
  const [liveCount, setLiveCount] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const [activeVisitors, setActiveVisitors] = useState([]);

  // Fetch live visitors data
  const fetchLiveVisitors = async () => {
    try {
      const response = await API.get('/analytics/live-visitors');

      if (response.data.success) {
        const data = response.data.data;
        setLiveCount(data.activeNow);

        // Format visitors data
        const formattedVisitors = data.visitors.map((visitor, index) => ({
          id: index + 1,
          page: visitor.page || 'Unknown Page',
          path: visitor.page || '/',
          location: visitor.location || 'Unknown',
          device: visitor.device || 'Unknown',
          browser: visitor.browser || 'Unknown',
          duration: getTimeSince(new Date(visitor.lastSeen)),
          timestamp: getTimeAgo(new Date(visitor.lastSeen)),
          sessionId: visitor.sessionId
        }));

        setActiveVisitors(formattedVisitors);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error('Error fetching live visitors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh effect
  useEffect(() => {
    fetchLiveVisitors();

    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchLiveVisitors();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 10) return 'Just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    return `${Math.floor(seconds / 3600)} hours ago`;
  };

  const getTimeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'Desktop': return 'monitor';
      case 'Mobile': return 'mobile';
      case 'Tablet': return 'tablet';
      default: return 'devices';
    }
  };

  const getBrowserIcon = (browser) => {
    switch (browser) {
      case 'Chrome': return 'browser';
      case 'Safari': return 'browser';
      case 'Firefox': return 'browser';
      case 'Edge': return 'browser';
      default: return 'browser';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'caret-up';
      case 'down': return 'caret-down';
      case 'stable': return 'minus';
      default: return 'minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Active Visitors List */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
                  Active Visitor Sessions
                </h2>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <calcite-loader scale="l"></calcite-loader>
                  </div>
                ) : activeVisitors.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--calcite-ui-text-3)' }}>
                    <calcite-icon icon="users" scale="l" style={{ marginBottom: '16px' }}></calcite-icon>
                    <p>No active visitors at the moment</p>
                  </div>
                ) : (
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
                )}
              </div>
            </calcite-card>
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