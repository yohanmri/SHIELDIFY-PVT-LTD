import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-avatar';
import '@esri/calcite-components/components/calcite-input';

export default function RecentActivity() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('today');

  const [activityStats, setActivityStats] = useState({
    totalActions: 342,
    todayActions: 48,
    criticalActions: 3,
    adminUsers: 2
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'product',
      action: 'created',
      description: 'Added new product "Safety Helmet - Yellow"',
      user: 'Admin',
      timestamp: '2 minutes ago',
      time: '3:45 PM',
      icon: 'plus-circle',
      color: '#00a884',
      severity: 'info'
    },
    {
      id: 2,
      type: 'order',
      action: 'updated',
      description: 'Updated order #ORD-2024-0156 status to "Completed"',
      user: 'Admin',
      timestamp: '8 minutes ago',
      time: '3:39 PM',
      icon: 'check-circle',
      color: '#0079c1',
      severity: 'info'
    },
    {
      id: 3,
      type: 'product',
      action: 'deleted',
      description: 'Deleted product "Old Safety Goggles"',
      user: 'Admin',
      timestamp: '15 minutes ago',
      time: '3:32 PM',
      icon: 'trash',
      color: '#dc3545',
      severity: 'critical'
    },
    {
      id: 4,
      type: 'bundle',
      action: 'created',
      description: 'Created new bundle "Construction Worker Safety Kit"',
      user: 'Admin',
      timestamp: '23 minutes ago',
      time: '3:24 PM',
      icon: 'layer',
      color: '#9333ea',
      severity: 'info'
    },
    {
      id: 5,
      type: 'order',
      action: 'refund',
      description: 'Processed refund for order #ORD-2024-0145 (LKR 15,000)',
      user: 'Admin',
      timestamp: '35 minutes ago',
      time: '3:12 PM',
      icon: 'undo',
      color: '#ffa500',
      severity: 'warning'
    },
    {
      id: 6,
      type: 'product',
      action: 'updated',
      description: 'Updated pricing for "High-Visibility Jacket - Orange"',
      user: 'Admin',
      timestamp: '1 hour ago',
      time: '2:47 PM',
      icon: 'pencil',
      color: '#0079c1',
      severity: 'info'
    },
    {
      id: 7,
      type: 'order',
      action: 'created',
      description: 'New order received #ORD-2024-0157 (LKR 45,600)',
      user: 'System',
      timestamp: '1 hour ago',
      time: '2:38 PM',
      icon: 'shopping-cart',
      color: '#00a884',
      severity: 'info'
    },
    {
      id: 8,
      type: 'product',
      action: 'updated',
      description: 'Updated stock quantity for "Safety Gloves - Leather" (+50 units)',
      user: 'Admin',
      timestamp: '2 hours ago',
      time: '1:45 PM',
      icon: 'number',
      color: '#0079c1',
      severity: 'info'
    },
    {
      id: 9,
      type: 'bundle',
      action: 'updated',
      description: 'Modified bundle "Industrial Worker Package" - Added 2 products',
      user: 'Admin',
      timestamp: '2 hours ago',
      time: '1:32 PM',
      icon: 'layer',
      color: '#9333ea',
      severity: 'info'
    },
    {
      id: 10,
      type: 'order',
      action: 'cancelled',
      description: 'Order #ORD-2024-0154 cancelled by customer',
      user: 'System',
      timestamp: '3 hours ago',
      time: '12:45 PM',
      icon: 'x-circle',
      color: '#dc3545',
      severity: 'warning'
    },
    {
      id: 11,
      type: 'product',
      action: 'created',
      description: 'Added new product "Safety Boots - Steel Toe Size 10"',
      user: 'Admin',
      timestamp: '3 hours ago',
      time: '12:23 PM',
      icon: 'plus-circle',
      color: '#00a884',
      severity: 'info'
    },
    {
      id: 12,
      type: 'settings',
      action: 'updated',
      description: 'Updated shipping rates for Colombo region',
      user: 'Admin',
      timestamp: '4 hours ago',
      time: '11:47 AM',
      icon: 'gear',
      color: '#6b6b6b',
      severity: 'critical'
    }
  ]);

  const [activitySummary, setActivitySummary] = useState([
    { type: 'Product', count: 24, icon: 'shopping-cart', color: '#00a884' },
    { type: 'Order', count: 18, icon: 'list-check', color: '#0079c1' },
    { type: 'Bundle', count: 4, icon: 'layer', color: '#9333ea' },
    { type: 'Settings', count: 2, icon: 'gear', color: '#6b6b6b' }
  ]);

  useEffect(() => {
    // fetchActivityData();
  }, [timeFilter]);

  const fetchActivityData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/admin/activity?time=${timeFilter}`);
      // setActivities(response.data.activities);
    } catch (err) {
      console.error('Error fetching activity data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesSearch = activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getActionLabel = (action) => {
    const labels = {
      created: 'Created',
      updated: 'Updated',
      deleted: 'Deleted',
      refund: 'Refunded',
      cancelled: 'Cancelled'
    };
    return labels[action] || action;
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return '#dc3545';
      case 'warning': return '#ffa500';
      case 'info': return '#0079c1';
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
                Recent Activity
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Track all administrative actions and system events
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <calcite-select
                value={timeFilter}
                onCalciteSelectChange={(e) => setTimeFilter(e.target.value)}
                style={{ width: '150px' }}
              >
                <calcite-option value="today">Today</calcite-option>
                <calcite-option value="yesterday">Yesterday</calcite-option>
                <calcite-option value="week">This Week</calcite-option>
                <calcite-option value="month">This Month</calcite-option>
              </calcite-select>
              <calcite-button
                appearance="outline"
                icon-start="arrow-left"
                onClick={() => navigate('/admin/dashboard')}
              >
                Back
              </calcite-button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Total Actions
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                  {activityStats.totalActions}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Today's Actions
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#00a884' }}>
                  {activityStats.todayActions}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Critical Actions
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#dc3545' }}>
                  {activityStats.criticalActions}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Active Admins
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#9333ea' }}>
                  {activityStats.adminUsers}
                </div>
              </div>
            </calcite-card>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
            {/* Activity Feed */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                {/* Filters */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  <calcite-input
                    type="text"
                    placeholder="Search activities..."
                    value={searchQuery}
                    onCalciteInputInput={(e) => setSearchQuery(e.target.value)}
                    icon="search"
                    style={{ flex: 1, minWidth: '200px' }}
                  />
                  <calcite-select
                    value={filterType}
                    onCalciteSelectChange={(e) => setFilterType(e.target.value)}
                    style={{ width: '150px' }}
                  >
                    <calcite-option value="all">All Types</calcite-option>
                    <calcite-option value="product">Products</calcite-option>
                    <calcite-option value="order">Orders</calcite-option>
                    <calcite-option value="bundle">Bundles</calcite-option>
                    <calcite-option value="settings">Settings</calcite-option>
                  </calcite-select>
                </div>

                {/* Activity List */}
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <calcite-loader scale="l"></calcite-loader>
                  </div>
                ) : (
                  <div style={{ maxHeight: '700px', overflow: 'auto' }}>
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map((activity) => (
                        <div key={activity.id} style={{
                          display: 'flex',
                          gap: '16px',
                          padding: '16px',
                          marginBottom: '12px',
                          background: 'var(--calcite-ui-foreground-2)',
                          borderRadius: '6px',
                          borderLeft: `4px solid ${activity.color}`,
                          transition: 'all 0.2s ease'
                        }}>
                          {/* Icon */}
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: activity.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <calcite-icon 
                              icon={activity.icon} 
                              scale="s"
                              style={{ color: 'white' }}
                            ></calcite-icon>
                          </div>

                          {/* Content */}
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                  <calcite-chip scale="s" appearance="outline">
                                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                  </calcite-chip>
                                  <calcite-chip 
                                    scale="s" 
                                    appearance="solid"
                                    style={{ 
                                      '--calcite-chip-background-color': activity.color,
                                      color: 'white'
                                    }}
                                  >
                                    {getActionLabel(activity.action)}
                                  </calcite-chip>
                                </div>
                                <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>
                                  {activity.description}
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--calcite-ui-text-3)' }}>
                                  by {activity.user} • {activity.timestamp}
                                </div>
                              </div>
                              <div style={{ 
                                fontSize: '12px', 
                                color: 'var(--calcite-ui-text-3)',
                                whiteSpace: 'nowrap'
                              }}>
                                {activity.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--calcite-ui-text-3)' }}>
                        <calcite-icon icon="information" scale="l"></calcite-icon>
                        <p style={{ marginTop: '16px' }}>No activities found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </calcite-card>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Activity Summary */}
              <calcite-card>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                    Activity Summary
                  </h3>
                  {activitySummary.map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      marginBottom: '8px',
                      background: 'var(--calcite-ui-foreground-2)',
                      borderRadius: '6px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          background: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <calcite-icon 
                            icon={item.icon} 
                            scale="s"
                            style={{ color: 'white' }}
                          ></calcite-icon>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>
                          {item.type}
                        </span>
                      </div>
                      <span style={{ fontSize: '20px', fontWeight: '700', color: item.color }}>
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </calcite-card>

              {/* Quick Actions */}
              <calcite-card>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                    Quick Actions
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <calcite-button
                      width="full"
                      appearance="outline"
                      icon-start="plus-circle"
                      onClick={() => navigate('/admin/product-add')}
                    >
                      Add Product
                    </calcite-button>
                    <calcite-button
                      width="full"
                      appearance="outline"
                      icon-start="layer"
                      onClick={() => navigate('/admin/bundle-add')}
                    >
                      Create Bundle
                    </calcite-button>
                    <calcite-button
                      width="full"
                      appearance="outline"
                      icon-start="list-check"
                      onClick={() => navigate('/admin/order-list')}
                    >
                      View Orders
                    </calcite-button>
                  </div>
                </div>
              </calcite-card>

              {/* Export Options */}
              <calcite-card>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                    Export Activity
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--calcite-ui-text-3)', marginBottom: '16px' }}>
                    Download activity logs for record keeping
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <calcite-button
                      width="full"
                      appearance="outline"
                      icon-start="download"
                    >
                      Export as CSV
                    </calcite-button>
                    <calcite-button
                      width="full"
                      appearance="outline"
                      icon-start="file-pdf"
                    >
                      Export as PDF
                    </calcite-button>
                  </div>
                </div>
              </calcite-card>
            </div>
          </div>
        </div>
      </div>
    </calcite-shell>
  );
}