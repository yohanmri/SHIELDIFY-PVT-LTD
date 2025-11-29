import React from 'react';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-icon';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Products', value: '156', icon: 'shopping-cart', color: '#2563eb' },
    { title: 'Total Users', value: '1,234', icon: 'users', color: '#7c3aed' },
    { title: 'Total Visitors', value: '12,456', icon: 'graph-time-series', color: '#dc2626' },
    { title: 'Today\'s Visitors', value: '342', icon: 'clock', color: '#059669' }
  ];

  const recentActivities = [
    { text: 'New order #1234 placed', time: '2 minutes ago', icon: 'shopping-cart' },
    { text: 'Product "GPS Device" updated', time: '15 minutes ago', icon: 'pencil' },
    { text: 'New user registered', time: '1 hour ago', icon: 'user-plus' },
    { text: 'Order #1230 shipped', time: '2 hours ago', icon: 'check-circle' }
  ];

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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px'
          }}>
            <calcite-card>
              <div slot="title">Recent Activity</div>
              <div slot="subtitle">Latest updates from your store</div>
              
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
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </calcite-card>

            {/* Quick Stats */}
            <calcite-card>
              <div slot="title">Today's Quick Stats</div>
              <div slot="subtitle">Real-time metrics</div>
              
              <div style={{ padding: '16px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-2)' }}>
                      Visitors
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>342</span>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '68%',
                      backgroundColor: '#059669',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-2)' }}>
                      Orders
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>28</span>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '45%',
                      backgroundColor: '#2563eb',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>

                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-2)' }}>
                      Revenue
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>$2,840</span>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: '82%',
                      backgroundColor: '#7c3aed',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
              </div>
            </calcite-card>
          </div>
        </div>
      </div>
    </calcite-shell>
  );
}