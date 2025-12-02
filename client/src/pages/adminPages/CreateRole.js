import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-input-text';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-switch';

export default function CreateRole() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {
      dashboard: { view: false },
      products: { view: false, create: false, edit: false, delete: false },
      bundles: { view: false, create: false, edit: false, delete: false },
      orders: { view: false, edit: false, delete: false, approve: false },
      analytics: { view: false, export: false },
      admins: { view: false, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false }
    }
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await API.get('/roles');
      setRoles(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setIsEditing(false);
    setFormData({
      name: '',
      description: '',
      permissions: {
        dashboard: { view: false },
        products: { view: false, create: false, edit: false, delete: false },
        bundles: { view: false, create: false, edit: false, delete: false },
        orders: { view: false, edit: false, delete: false, approve: false },
        analytics: { view: false, export: false },
        admins: { view: false, create: false, edit: false, delete: false },
        roles: { view: false, create: false, edit: false, delete: false }
      }
    });
    setModalOpen(true);
  };

  const handleEdit = (role) => {
    setIsEditing(true);
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
      permissions: role.permissions
    });
    setModalOpen(true);
  };

  const handleDelete = (role) => {
    setSelectedRole(role);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/roles/${selectedRole._id}`);
      setRoles(roles.filter(r => r._id !== selectedRole._id));
      setDeleteModalOpen(false);
      setSelectedRole(null);
    } catch (err) {
      console.error('Error deleting role:', err);
      alert('Failed to delete role. Please try again.');
    }
  };

  const handlePermissionChange = (section, permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: {
          ...prev.permissions[section],
          [permission]: !prev.permissions[section][permission]
        }
      }
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData.name.trim()) {
        alert('Role name is required');
        return;
      }

      if (isEditing) {
        const response = await API.put(`/roles/${selectedRole._id}`, formData);
        setRoles(roles.map(r => r._id === selectedRole._id ? response.data.data : r));
      } else {
        const response = await API.post('/roles', formData);
        setRoles([...roles, response.data.data]);
      }

      setModalOpen(false);
      setSelectedRole(null);
    } catch (err) {
      console.error('Error saving role:', err);
      alert(`Failed to save role: ${err.response?.data?.message || err.message}`);
    }
  };

  const renderPermissionSection = (title, section, permissions) => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ 
        fontSize: '16px', 
        fontWeight: '600', 
        marginBottom: '12px',
        color: 'var(--calcite-ui-text-1)'
      }}>
        {title}
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '12px',
        padding: '16px',
        background: 'var(--calcite-ui-background)',
        borderRadius: '4px',
        border: '1px solid var(--calcite-ui-border-2)'
      }}>
        {Object.keys(permissions).map(permission => (
          <calcite-label key={permission} layout="inline">
            <calcite-switch
              checked={formData.permissions[section][permission]}
              onCalciteSwitchChange={() => handlePermissionChange(section, permission)}
            />
            {permission.charAt(0).toUpperCase() + permission.slice(1)}
          </calcite-label>
        ))}
      </div>
    </div>
  );

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
                Role Management
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Create and manage user roles and permissions
              </p>
            </div>
            <calcite-button 
              icon-start="plus-circle"
              onClick={handleCreateNew}
            >
              Create New Role
            </calcite-button>
          </div>

          {error && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading roles...
              </p>
            </div>
          )}

          {!loading && (
            <div style={{
              background: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <calcite-list>
                {roles.map((role, index) => (
                  <calcite-list-item
                    key={role._id}
                    label={role.name}
                    description={role.description || 'No description'}
                    style={{ 
                      cursor: 'pointer',
                      borderBottom: index !== roles.length - 1 ? '1px solid #f1f5f9' : 'none'
                    }}
                  >
                    <div slot="content-start" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {role.isSuperAdmin && (
                        <calcite-chip scale="s" kind="brand">Super Admin</calcite-chip>
                      )}
                      {role.isActive ? (
                        <calcite-chip scale="s" kind="success">Active</calcite-chip>
                      ) : (
                        <calcite-chip scale="s" kind="neutral">Inactive</calcite-chip>
                      )}
                    </div>

                    <div slot="content-end" style={{ display: 'flex', gap: '8px' }}>
                      <calcite-button 
                        appearance="outline" 
                        icon-start="pencil"
                        scale="s"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(role);
                        }}
                      >
                        Edit
                      </calcite-button>
                      {!role.isSuperAdmin && (
                        <calcite-button 
                          appearance="outline" 
                          kind="danger"
                          icon-start="trash"
                          scale="s"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(role);
                          }}
                        >
                          Delete
                        </calcite-button>
                      )}
                    </div>
                  </calcite-list-item>
                ))}
              </calcite-list>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <calcite-modal 
        open={modalOpen}
        onCalciteModalClose={() => setModalOpen(false)}
        width-scale="l"
      >
        <div slot="header">{isEditing ? 'Edit Role' : 'Create New Role'}</div>
        <div slot="content" style={{ padding: '20px', maxHeight: '70vh', overflow: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <calcite-label>
              Role Name
              <calcite-input-text
                value={formData.name}
                placeholder="e.g., Product Manager"
                onInput={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </calcite-label>

            <calcite-label>
              Description
              <calcite-text-area
                value={formData.description}
                placeholder="Describe the role's responsibilities"
                rows="2"
                onInput={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </calcite-label>

            <div style={{ marginTop: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                Permissions
              </h2>

              {renderPermissionSection('Dashboard', 'dashboard', formData.permissions.dashboard)}
              {renderPermissionSection('Products', 'products', formData.permissions.products)}
              {renderPermissionSection('Bundles', 'bundles', formData.permissions.bundles)}
              {renderPermissionSection('Orders', 'orders', formData.permissions.orders)}
              {renderPermissionSection('Analytics', 'analytics', formData.permissions.analytics)}
              {renderPermissionSection('Admin Management', 'admins', formData.permissions.admins)}
              {renderPermissionSection('Role Management', 'roles', formData.permissions.roles)}
            </div>
          </div>
        </div>
        <calcite-button slot="primary" onClick={handleSave}>
          {isEditing ? 'Update Role' : 'Create Role'}
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>

      {/* Delete Confirmation Modal */}
      <calcite-modal 
        open={deleteModalOpen}
        onCalciteModalClose={() => setDeleteModalOpen(false)}
        width-scale="s"
      >
        <div slot="header">Delete Role</div>
        <div slot="content" style={{ padding: '20px' }}>
          <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
            <div slot="title">Are you sure?</div>
            <div slot="message">
              This will permanently delete the role "{selectedRole?.name}". Users with this role will need to be reassigned.
            </div>
          </calcite-notice>
        </div>
        <calcite-button slot="primary" kind="danger" onClick={confirmDelete}>
          Delete Role
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setDeleteModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>
    </calcite-shell>
  );
}
