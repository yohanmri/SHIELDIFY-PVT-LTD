import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@esri/calcite-components/components/calcite-navigation';
import '@esri/calcite-components/components/calcite-navigation-logo';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-avatar';
import '@esri/calcite-components/components/calcite-dropdown';
import '@esri/calcite-components/components/calcite-dropdown-group';
import '@esri/calcite-components/components/calcite-dropdown-item';
import '@esri/calcite-components/components/calcite-action';
import '@esri/calcite-components/components/calcite-popover';
import '@esri/calcite-components/components/calcite-icon';
import { adminAPI } from '../../api/axios';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Fetch notifications on mount and set up polling
  useEffect(() => {
    fetchNotifications();
    fetchStats();
    
    // Poll for new notifications every 30 seconds
    const notificationInterval = setInterval(fetchNotifications, 30000);
    const statsInterval = setInterval(fetchStats, 60000);
    
    return () => {
      clearInterval(notificationInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const contactResponse = await adminAPI.get('/admin/contacts');
      const contacts = contactResponse.data.data || [];
      
      // Convert contacts to notifications
      const contactNotifications = contacts
        .filter(contact => contact.status === 'new')
        .map(contact => ({
          id: `contact-${contact._id}`,
          type: 'contact',
          title: 'New Contact Inquiry',
          message: `${contact.name} - ${contact.service || 'General Inquiry'}`,
          time: formatTimeAgo(contact.createdAt),
          icon: 'email-address',
          unread: true,
          data: contact
        }));

      // You can add other notification types here (orders, low stock, etc.)
      const allNotifications = [
        ...contactNotifications,
        // Add other notification sources here
      ];

      setNotifications(allNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch product count
      const productsResponse = await adminAPI.get('/admin/products');
      setProductCount(productsResponse.data.data?.length || 0);

      // Fetch order count (you'll need to implement this endpoint)
      // const ordersResponse = await adminAPI.get('/admin/orders');
      // setOrderCount(ordersResponse.data.data?.length || 0);
      setOrderCount(23); // Placeholder
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      try {
        await adminAPI.post('/auth/logout');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        window.location.href = '/admin/login';
      }
    }
  };

  const handleViewSite = () => {
    window.open('/', '_blank');
  };

  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  const handleSettingsClick = () => {
    navigate('/admin/settings');
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'contact') {
      navigate('/admin/contact-view');
    }
    setNotificationsOpen(false);
  };

  const clearAllNotifications = async () => {
    try {
      // Mark all contacts as read
      const contactNotifications = notifications.filter(n => n.type === 'contact');
      for (const notif of contactNotifications) {
        await adminAPI.put(`/admin/contacts/${notif.data._id}`, { status: 'read' });
      }
      fetchNotifications();
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <calcite-navigation slot="header">
      <calcite-navigation-logo
        slot="logo"
        heading="SHIELDIFY Admin"
        description="Dashboard Panel"
        thumbnail="/assets/images/shieldify-picture-logo.png"
        onClick={() => navigate('/admin/dashboard')}
        style={{ cursor: 'pointer' }}
      />

      <div slot="content-end" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '0 16px'
      }}>
        {/* Quick Stats */}
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          marginRight: '12px',
          padding: '0 12px',
          borderRight: '1px solid var(--calcite-ui-border-2)'
        }}>
          <calcite-chip scale="s" appearance="outline" icon="shopping-cart">
            {productCount} Products
          </calcite-chip>
          <calcite-chip scale="s" appearance="outline" icon="list-check">
            {orderCount} Orders
          </calcite-chip>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <calcite-action
            id="notifications-trigger"
            icon="bell"
            text="Notifications"
            indicator={unreadCount > 0}
            scale="m"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          ></calcite-action>
          
          {unreadCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              backgroundColor: '#dc2626',
              color: 'white',
              borderRadius: '10px',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: '600',
              minWidth: '18px',
              textAlign: 'center',
              pointerEvents: 'none',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              {unreadCount}
            </div>
          )}

          <calcite-popover
            reference-element="notifications-trigger"
            placement="bottom-end"
            open={notificationsOpen}
            closable
            onCalcitePopoverClose={() => setNotificationsOpen(false)}
          >
            <div style={{ width: '360px', maxHeight: '500px' }}>
              {/* Header */}
              <div style={{ 
                padding: '16px',
                borderBottom: '1px solid var(--calcite-ui-border-2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                    Notifications
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <calcite-action
                  icon="x"
                  text="Close"
                  scale="s"
                  onClick={() => setNotificationsOpen(false)}
                ></calcite-action>
              </div>

              {/* Notifications List */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ 
                    padding: '40px 20px', 
                    textAlign: 'center',
                    color: 'var(--calcite-ui-text-3)'
                  }}>
                    <calcite-icon icon="bell-off" scale="l"></calcite-icon>
                    <p style={{ margin: '12px 0 0 0', fontSize: '14px' }}>
                      No new notifications
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      style={{ 
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--calcite-ui-border-3)',
                        cursor: 'pointer',
                        backgroundColor: notification.unread ? 'var(--calcite-ui-foreground-2)' : 'transparent',
                        transition: 'background-color 0.2s',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--calcite-ui-foreground-2)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notification.unread ? 'var(--calcite-ui-foreground-2)' : 'transparent'}
                    >
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: notification.unread ? 'var(--calcite-ui-brand)' : 'var(--calcite-ui-foreground-3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <calcite-icon 
                            icon={notification.icon} 
                            scale="s"
                            style={{ color: notification.unread ? 'white' : 'var(--calcite-ui-text-3)' }}
                          ></calcite-icon>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ 
                            margin: '0 0 4px 0', 
                            fontSize: '14px', 
                            fontWeight: notification.unread ? '600' : '500',
                            color: 'var(--calcite-ui-text-1)'
                          }}>
                            {notification.title}
                          </p>
                          <p style={{ 
                            margin: '0 0 4px 0', 
                            fontSize: '13px', 
                            color: 'var(--calcite-ui-text-2)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {notification.message}
                          </p>
                          <p style={{ 
                            margin: 0, 
                            fontSize: '12px', 
                            color: 'var(--calcite-ui-text-3)'
                          }}>
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--calcite-ui-brand)',
                            flexShrink: 0,
                            marginTop: '4px'
                          }}></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div style={{ 
                  padding: '12px 16px',
                  borderTop: '1px solid var(--calcite-ui-border-2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  <calcite-button
                    appearance="outline"
                    scale="s"
                    width="half"
                    onClick={clearAllNotifications}
                  >
                    Mark All Read
                  </calcite-button>
                  <calcite-button
                    scale="s"
                    width="half"
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate('/admin/contact-view');
                    }}
                  >
                    View All
                  </calcite-button>
                </div>
              )}
            </div>
          </calcite-popover>
        </div>

        {/* View Site */}
        <calcite-action
          icon="launch"
          text="View Site"
          scale="m"
          onClick={handleViewSite}
        ></calcite-action>

        {/* Help */}
        <calcite-action
          icon="question"
          text="Help"
          scale="m"
          onClick={() => navigate('/admin/help')}
        ></calcite-action>

        {/* User Dropdown */}
        <calcite-dropdown placement="bottom-end">
          <div slot="trigger" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <calcite-avatar
              scale="m"
              username="Admin User"
              full-name="Admin User"
              style={{ cursor: 'pointer' }}
            ></calcite-avatar>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</span>
              <span style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>Administrator</span>
            </div>
            <calcite-icon icon="chevron-down" scale="s"></calcite-icon>
          </div>

          <calcite-dropdown-group>
            <calcite-dropdown-item 
              icon-start="user"
              onClick={handleProfileClick}
            >
              My Profile
            </calcite-dropdown-item>
            <calcite-dropdown-item 
              icon-start="gear"
              onClick={handleSettingsClick}
            >
              Settings
            </calcite-dropdown-item>
            <calcite-dropdown-item icon-start="information">
              Help & Support
            </calcite-dropdown-item>
            <calcite-dropdown-item icon-start="lightbulb">
              What's New
            </calcite-dropdown-item>
          </calcite-dropdown-group>

          <calcite-dropdown-group>
            <calcite-dropdown-item icon-start="key">
              Security
            </calcite-dropdown-item>
            <calcite-dropdown-item icon-start="billing">
              Billing
            </calcite-dropdown-item>
          </calcite-dropdown-group>

          <calcite-dropdown-group>
            <calcite-dropdown-item 
              icon-start="sign-out"
              onClick={handleSignOut}
            >
              Sign Out
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>

      {/* Add CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
      `}</style>
    </calcite-navigation>
  );
}