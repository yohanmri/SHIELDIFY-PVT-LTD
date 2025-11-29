import React, { useState } from 'react';
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

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Order #1234', message: 'Customer placed a new order', time: '2 minutes ago', icon: 'shopping-cart', unread: true },
    { id: 2, title: 'Product Stock Low', message: 'Safety Helmet stock below 10', time: '1 hour ago', icon: 'exclamation-mark-triangle', unread: true },
    { id: 3, title: 'New User Registration', message: 'john.doe@example.com registered', time: '3 hours ago', icon: 'user-plus', unread: false },
    { id: 4, title: 'Order #1230 Shipped', message: 'Order successfully delivered', time: '5 hours ago', icon: 'check-circle', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      // Add your sign out logic here
      navigate('/');
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
    console.log('Notification clicked:', notification);
    // Handle notification click - navigate to relevant page
    setNotificationsOpen(false);
  };

  const clearAllNotifications = () => {
    console.log('Clear all notifications');
    // Implement clear all logic
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
            156 Products
          </calcite-chip>
          <calcite-chip scale="s" appearance="outline" icon="list-check">
            23 Orders
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
              pointerEvents: 'none'
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
                    You have {unreadCount} unread notifications
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
                {notifications.map((notification) => (
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
                ))}
              </div>

              {/* Footer */}
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
                  Clear All
                </calcite-button>
                <calcite-button
                  scale="s"
                  width="half"
                  onClick={() => {
                    setNotificationsOpen(false);
                    navigate('/admin/notifications');
                  }}
                >
                  View All
                </calcite-button>
              </div>
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
            <calcite-dropdown-item icon-start="まbilling">
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
    </calcite-navigation>
  );
}