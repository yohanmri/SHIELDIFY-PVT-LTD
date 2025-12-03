import React, { useState , useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '@esri/calcite-components/components/calcite-shell-panel';
import '@esri/calcite-components/components/calcite-action-bar';
import '@esri/calcite-components/components/calcite-action';
import '@esri/calcite-components/components/calcite-action-group';
import '@esri/calcite-components/components/calcite-panel';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-list-item-group';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePanel, setActivePanel] = useState('dashboard');

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

useEffect(() => {
  if (
    location.pathname.includes('/admin/product-list') || 
    location.pathname.includes('/admin/product-add') || 
    location.pathname.includes('/admin/bundle-list') || 
    location.pathname.includes('/admin/bundle-add')
  ) {
    setActivePanel('products');

  } else if (
    location.pathname.includes('/admin/order-list') || 
    location.pathname.includes('/admin/order-completed') || 
    location.pathname.includes('/admin/order-pending') || 
    location.pathname.includes('/admin/requests-refund') ||
    location.pathname.includes('/admin/requests-cancel')
  ) {
    setActivePanel('orders');

  } else if (
    location.pathname.includes('/admin/total-visitors') ||
    location.pathname.includes('/admin/live-visitors') ||
    location.pathname.includes('/admin/popular-pages') ||
    location.pathname.includes('/admin/devices-locations')
  ) {
    setActivePanel('analytics');

  } else if (
    location.pathname.includes('/admin/roles') ||
    location.pathname.includes('/admin/settings')
  ) {
    setActivePanel('admin');

  } else if (
    location.pathname.includes('/admin/dashboard') ||
    location.pathname.includes('/admin/recent-activity') ||
    location.pathname.includes('/admin/contact-view')
  ) {
    setActivePanel('dashboard');
  }
}, [location.pathname]);

  return (
    <calcite-shell-panel slot="panel-start" position="start" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action
            text="Dashboard"
            icon="dashboard"
            active={activePanel === 'dashboard'}
            onClick={() => {
              setActivePanel('dashboard');
              handleNavigation('/admin/dashboard');
            }}
          ></calcite-action>

          <calcite-action
            text="Products"
            icon="shopping-cart"
            active={activePanel === 'products'}
            onClick={() => setActivePanel('products')}
          ></calcite-action>

          <calcite-action
            text="Orders"
            icon="list-check"
            active={activePanel === 'orders'}
            onClick={() => setActivePanel('orders')}
          ></calcite-action>

          <calcite-action
            text="Analytics"
            icon="graph-time-series"
            active={activePanel === 'analytics'}
            onClick={() => setActivePanel('analytics')}
          ></calcite-action>

          <calcite-action
            text="Admin"
            icon="user"
            active={activePanel === 'admin'}
            onClick={() => setActivePanel('admin')}
          ></calcite-action>
        </calcite-action-group>

        <calcite-action-group slot="actions-end">
          <calcite-action
            text="Settings"
            icon="gear"
            onClick={() => handleNavigation('/admin/settings')}
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
{/* Dashboard Panel */}
{activePanel === 'dashboard' && (
  <calcite-panel heading="Dashboard" description="Overview and statistics">
    <calcite-list>
      <calcite-list-item
        value="overview"
        label="Overview"
        description="Quick stats and cards"
        onClick={() => handleNavigation('/admin/dashboard')}
        style={{ cursor: 'pointer' }}
      >
        <calcite-icon slot="content-start" icon="dashboard" scale="s"></calcite-icon>
      </calcite-list-item>

      <calcite-list-item
        value="recent-activity"
        label="Recent Activity"
        description="Latest updates"
        onClick={() => handleNavigation('/admin/recent-activity')}
        style={{ cursor: 'pointer' }}
      >
        <calcite-icon slot="content-start" icon="clock" scale="s"></calcite-icon>
      </calcite-list-item>
    </calcite-list>

    {/* Contact Section */}
   <calcite-list>
      <calcite-list-item
        value="Contact"
        label="Contact View Page"
        description="Requests from page visitors"
        onClick={() => handleNavigation('/admin/contact-view')}
        style={{ cursor: 'pointer' }}
      >
        <calcite-icon slot="content-start" icon="email-address" scale="s"></calcite-icon>
      </calcite-list-item>
    </calcite-list>
  </calcite-panel>
)}

      {/* Products Panel */}
      {activePanel === 'products' && (
        <calcite-panel heading="Products" description="Manage your products">
          <calcite-list>
            <calcite-list-item-group heading="Product Management">
              <calcite-list-item
                value="product-list"
                label="All Products"
                description="View and manage products"
                onClick={() => handleNavigation('/admin/product-list')}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: isActive('/admin/product-list') ? 'var(--calcite-ui-brand)' : 'transparent',
                  color: isActive('/admin/product-list') ? 'white' : 'inherit'
                }}
              >
                <calcite-icon slot="content-start" icon="list-bullet" scale="s"></calcite-icon>
              </calcite-list-item>

              <calcite-list-item
                value="product-add"
                label="Add New Product"
                description="Create a new product"
                onClick={() => handleNavigation('/admin/product-add')}
                style={{ cursor: 'pointer' }}
              >
        <calcite-icon slot="content-start" icon="plus-circle" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>

            <calcite-list-item-group heading="Bundle Management">
              <calcite-list-item
                value="bundles"
                label="Product Bundles"
                description="Manage product bundles"
                onClick={() => handleNavigation('/admin/bundle-list')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="layer" scale="s"></calcite-icon>
              </calcite-list-item>

              <calcite-list-item
                value="bundle-add"
                label="Create Bundle"
                description="Create new bundle"
                onClick={() => handleNavigation('/admin/bundle-add')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="plus-circle" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>
          </calcite-list>
        </calcite-panel>
      )}

      {/* Orders Panel */}
      {activePanel === 'orders' && (
        <calcite-panel heading="Orders" description="Manage orders and transactions">
          <calcite-list>
            <calcite-list-item-group heading="Order Management">
              <calcite-list-item
                value="orders-all"
                label="All Orders"
                description="View all orders"
                onClick={() => handleNavigation('/admin/order-list')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="list-check" scale="s"></calcite-icon>
              </calcite-list-item>

              <calcite-list-item
                value="orders-pending"
                label="Pending Orders"
                description="Orders awaiting action"
                onClick={() => handleNavigation('/admin/order-pending')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="exclamation-mark-circle" scale="s"></calcite-icon>
              </calcite-list-item>

              <calcite-list-item
                value="orders-completed"
                label="Completed Orders"
                description="Fulfilled orders"
                onClick={() => handleNavigation('/admin/order-completed')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="check-circle" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>

            <calcite-list-item-group heading="Requests">
              <calcite-list-item
                value="refunds"
                label="Refund Requests"
                description="Handle refund requests"
                onClick={() => handleNavigation('/admin/requests-refunds')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="undo" scale="s"></calcite-icon>
              </calcite-list-item>

              <calcite-list-item
                value="cancellations"
                label="Cancel Requests"
                description="Handle cancellations"
                onClick={() => handleNavigation('/admin/requests-cancel')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="x-circle" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>
          </calcite-list>
        </calcite-panel>
      )}

      {/* Analytics Panel */}
      {activePanel === 'analytics' && (
        <calcite-panel heading="Analytics" description="Visitor and page analytics">
          <calcite-list>
            <calcite-list-item-group heading="Visitor Analytics">
              <calcite-list-item
                value="visitors-total"
                label="Total Visitors"
                description="All-time visitor stats"
                onClick={() => handleNavigation('/admin/total-visitors')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="users" scale="s"></calcite-icon>
              </calcite-list-item>

              <calcite-list-item
                value="visitors-live"
                label="Live Visitors"
                description="Current active users"
                onClick={() => handleNavigation('/admin/live-visitors')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="rss" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>

            <calcite-list-item-group heading="Page Analytics">
              <calcite-list-item
                value="popular-pages"
                label="Popular Pages"
                description="Most visited pages"
                onClick={() => handleNavigation('/admin/popular-pages')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="file" scale="s"></calcite-icon>
              </calcite-list-item>

              <calcite-list-item
                value="devices-locations"
                label="Devices & Locations"
                description="Device and geo data"
                onClick={() => handleNavigation('/admin/devices-locations')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="mobile" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>
          </calcite-list>
        </calcite-panel>
      )}

      {/* Admin Panel */}
      {activePanel === 'admin' && (
        <calcite-panel heading="Admin" description="User and role management">
          <calcite-list>
            <calcite-list-item-group heading="Role Management">
              <calcite-list-item
                value="roles"
                label="Roles & Permissions"
                description="Manage roles and permissions"
                onClick={() => handleNavigation('/admin/roles')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="shield" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>

            <calcite-list-item-group heading="Account">
              <calcite-list-item
                value="settings"
                label="Account Settings"
                description="Change password and preferences"
                onClick={() => handleNavigation('/admin/settings')}
                style={{ cursor: 'pointer' }}
              >
                <calcite-icon slot="content-start" icon="gear" scale="s"></calcite-icon>
              </calcite-list-item>
            </calcite-list-item-group>

                      
          </calcite-list>
        </calcite-panel>
      )}
    </calcite-shell-panel>
  );
}
