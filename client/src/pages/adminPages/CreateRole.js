import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';

const CreateRole = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {
      dashboard: { view: false },
      products: { view: false, create: false, edit: false, delete: false },
      bundles: { view: false, create: false, edit: false, delete: false },
      orders: { view: false, edit: false, approve: false },
      analytics: { view: false },
      admins: { view: false, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false }
    }
  });

  useEffect(() => {
    if (isEditMode) {
      fetchRole();
    }
  }, [id]);

  const fetchRole = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/roles/${id}`);
      const role = response.data.data;
      setFormData({
        name: role.name,
        description: role.description || '',
        permissions: role.permissions
      });
    } catch (error) {
      console.error('Error fetching role:', error);
      alert('Failed to load role');
      navigate('/admin/role-management');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSectionToggle = (section) => {
    const allPermissions = Object.keys(formData.permissions[section]);
    const allChecked = allPermissions.every(p => formData.permissions[section][p]);

    const newSectionPermissions = {};
    allPermissions.forEach(p => {
      newSectionPermissions[p] = !allChecked;
    });

    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [section]: newSectionPermissions
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Role name is required');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await API.put(`/roles/${id}`, formData);
        alert('Role updated successfully');
      } else {
        await API.post('/roles', formData);
        alert('Role created successfully');
      }
      navigate('/admin/role-management');
    } catch (error) {
      console.error('Error saving role:', error);
      alert(error.response?.data?.message || 'Failed to save role');
    } finally {
      setLoading(false);
    }
  };

  const renderPermissionSection = (title, section, icon) => {
    const permissions = formData.permissions[section];
    const permissionKeys = Object.keys(permissions);
    const allChecked = permissionKeys.every(p => permissions[p]);
    const someChecked = permissionKeys.some(p => permissions[p]) && !allChecked;

    return (
      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e5e7eb',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <input
            type="checkbox"
            checked={allChecked}
            ref={input => {
              if (input) input.indeterminate = someChecked;
            }}
            onChange={() => handleSectionToggle(section)}
            style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', flex: 1 }}>
            {icon} {title}
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '12px',
          paddingLeft: '30px'
        }}>
          {permissionKeys.map(permission => (
            <label
              key={permission}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                background: permissions[permission] ? '#eff6ff' : '#f9fafb',
                border: `1px solid ${permissions[permission] ? '#3b82f6' : '#e5e7eb'}`,
                transition: 'all 0.2s'
              }}
            >
              <input
                type="checkbox"
                checked={permissions[permission]}
                onChange={() => handlePermissionChange(section, permission)}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: permissions[permission] ? '#1e40af' : '#4b5563'
              }}>
                {permission.charAt(0).toUpperCase() + permission.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />

      <div style={{ padding: '24px', height: '100%', overflow: 'auto', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={() => navigate('/admin/role-management')}
              style={{
                padding: '8px 16px',
                background: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Back to Role Management
            </button>

            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
              {isEditMode ? 'Edit Role' : 'Create New Role'}
            </h1>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              {isEditMode ? 'Update role details and permissions' : 'Define a new role with specific permissions'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #e5e7eb'
            }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
                Basic Information
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                  Role Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Product Manager, Sales Admin"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the role's responsibilities and access level"
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Permissions */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600' }}>
                Permissions
              </h2>
              <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
                Select which sections and actions this role can access. Click the section checkbox to toggle all permissions.
              </p>

              {renderPermissionSection('Dashboard', 'dashboard', '📊')}
              {renderPermissionSection('Products', 'products', '📦')}
              {renderPermissionSection('Bundles', 'bundles', '🎁')}
              {renderPermissionSection('Orders', 'orders', '📋')}
              {renderPermissionSection('Analytics', 'analytics', '📈')}
              {renderPermissionSection('Admin Management', 'admins', '👥')}
              {renderPermissionSection('Role Management', 'roles', '🔐')}
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                type="button"
                onClick={() => navigate('/admin/role-management')}
                style={{
                  padding: '10px 20px',
                  background: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  background: loading ? '#9ca3af' : '#0079c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Role' : 'Create Role')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </calcite-shell>
  );
};

export default CreateRole;
