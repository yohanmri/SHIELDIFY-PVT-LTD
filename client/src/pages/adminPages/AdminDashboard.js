//src->pages->adminPages->AdminDashboard.js

import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([
    { title: 'Total Products', value: '0', icon: 'shopping-cart', color: '#2563eb' },
    { title: 'Total Bundles', value: '0', icon: 'layers', color: '#7c3aed' },
    { title: 'Total Visitors', value: '0', icon: 'graph-time-series', color: '#dc2626' },
    { title: 'Today\'s Visitors', value: '0', icon: 'clock', color: '#059669' }
  ]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get('/analytics/dashboard-stats');

      if (response.data.success) {
        const data = response.data.data;

        // Update stats
        setStats([
          { title: 'Total Products', value: data.totalProducts.toString(), icon: 'shopping-cart', color: '#2563eb' },
          { title: 'Total Bundles', value: data.totalBundles.toString(), icon: 'layers', color: '#7c3aed' },
          { title: 'Total Visitors', value: data.totalVisitors.toLocaleString(), icon: 'graph-time-series', color: '#dc2626' },
          { title: 'Today\'s Visitors', value: data.todaysVisitors.toString(), icon: 'clock', color: '#059669' }
        ]);

        // Update recent activities
        if (data.recentActivity && data.recentActivity.length > 0) {
          const formattedActivities = data.recentActivity.map(activity => {
            const timeAgo = getTimeAgo(new Date(activity.time));
            return {
              text: `Page view: ${activity.page}`,
              time: timeAgo,
              icon: 'cursor-click',
              device: activity.device,
              location: activity.location
            };
          });
          setRecentActivities(formattedActivities);
        }
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />

      <div style={{
        padding: '24px',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'var(--calcite-ui-background)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              margin: '0 0 8px 0',
              fontSize: '32px',
              fontWeight: '600',
              color: 'var(--calcite-ui-text-1)'
            }}>
              Dashboard
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: 'var(--calcite-ui-text-3)'
            }}>
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '24px' }}>
              <div slot="message">{error}</div>
            </calcite-notice>
          )}

          {/* Loading State */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                {stats.map((stat, index) => (
                  <calcite-card key={index}>
                    <div style={{ padding: '20px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '12px'
                      }}>
                        <div>
                          <p style={{
                            margin: '0 0 8px 0',
                            fontSize: '14px',
                            color: 'var(--calcite-ui-text-3)',
                            fontWeight: '500'
                          }}>
                            {stat.title}
                          </p>
                          <h2 style={{
                            margin: 0,
                            fontSize: '28px',
                            fontWeight: '700',
                            color: 'var(--calcite-ui-text-1)'
                          }}>
                            {stat.value}
                          </h2>
                        </div>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '8px',
                          backgroundColor: `${stat.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <calcite-icon
                            icon={stat.icon}
                            scale="m"
                            style={{ color: stat.color }}
                          ></calcite-icon>
                        </div>
                      </div>
                    </div>
                  </calcite-card>
                ))}
              </div>

              {/* Recent Activity */}
              {recentActivities.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: '20px'
                }}>
                  <calcite-card>
                    <div slot="title">Recent Activity</div>
                    <div slot="subtitle">Latest page views from visitors</div>

                    <div style={{ padding: '16px' }}>
                      {recentActivities.map((activity, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 0',
                            borderBottom: index < recentActivities.length - 1
                              ? '1px solid var(--calcite-ui-border-3)'
                              : 'none'
                          }}
                        >
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--calcite-ui-foreground-2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <calcite-icon
                              icon={activity.icon}
                              scale="s"
                            ></calcite-icon>
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{
                              margin: '0 0 4px 0',
                              fontSize: '14px',
                              color: 'var(--calcite-ui-text-1)'
                            }}>
                              {activity.text}
                            </p>
                            <p style={{
                              margin: 0,
                              fontSize: '12px',
                              color: 'var(--calcite-ui-text-3)'
                            }}>
                              {activity.time} • {activity.device} • {activity.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </calcite-card>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </calcite-shell>
  );
}