import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        designation: '',
        roleId: '',
        temporaryPassword: '',
        isSuperAdmin: false
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchAdmins();
        fetchRoles();
    }, []);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const response = await API.get('/admins');
            setAdmins(response.data.data || []);
        } catch (error) {
            console.error('Error fetching admins:', error);
            alert('Failed to load admins');
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await API.get('/roles');
            setRoles(response.data.data || []);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.roleId) newErrors.roleId = 'Role is required';
        if (!formData.temporaryPassword) newErrors.temporaryPassword = 'Temporary password is required';
        if (formData.temporaryPassword && formData.temporaryPassword.length < 6) {
            newErrors.temporaryPassword = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await API.post('/admins', formData);

            if (response.data.success) {
                alert(response.data.message);
                setShowCreateModal(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    designation: '',
                    roleId: '',
                    temporaryPassword: '',
                    isSuperAdmin: false
                });
                fetchAdmins();
            }
        } catch (error) {
            console.error('Error creating admin:', error);
            alert(error.response?.data?.message || 'Failed to create admin');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        if (!window.confirm('Are you sure you want to delete this admin?')) return;

        try {
            await API.delete(`/admins/${adminId}`);
            alert('Admin deleted successfully');
            fetchAdmins();
        } catch (error) {
            console.error('Error deleting admin:', error);
            alert(error.response?.data?.message || 'Failed to delete admin');
        }
    };

    const handleToggleStatus = async (adminId) => {
        try {
            const response = await API.patch(`/admins/${adminId}/toggle-status`);
            alert(response.data.message);
            fetchAdmins();
        } catch (error) {
            console.error('Error toggling status:', error);
            alert(error.response?.data?.message || 'Failed to toggle status');
        }
    };

    return (
        <calcite-shell>
            <AdminNavbar />
            <AdminSidebar />

            <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div>
                            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
                                Admin Management
                            </h1>
                            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                                Manage admin users and their roles
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            style={{
                                padding: '12px 24px',
                                background: '#0079c1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            + Create New Admin
                        </button>
                    </div>

                    {/* Admin List */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
                    ) : (
                        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Phone</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Designation</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Role</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                                        <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin) => (
                                        <tr key={admin._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                            <td style={{ padding: '16px' }}>{admin.name}</td>
                                            <td style={{ padding: '16px' }}>{admin.email}</td>
                                            <td style={{ padding: '16px' }}>{admin.phone || 'N/A'}</td>
                                            <td style={{ padding: '16px' }}>{admin.designation || 'N/A'}</td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    background: admin.isSuperAdmin ? '#fef3c7' : '#dbeafe',
                                                    color: admin.isSuperAdmin ? '#92400e' : '#1e40af',
                                                    fontSize: '12px',
                                                    fontWeight: '600'
                                                }}>
                                                    {admin.isSuperAdmin ? 'Super Admin' : admin.role?.name || 'N/A'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    background: admin.isActive ? '#d1fae5' : '#fee2e2',
                                                    color: admin.isActive ? '#065f46' : '#991b1b',
                                                    fontSize: '12px',
                                                    fontWeight: '600'
                                                }}>
                                                    {admin.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px', textAlign: 'center' }}>
                                                <button
                                                    onClick={() => handleToggleStatus(admin._id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        marginRight: '8px',
                                                        background: '#f3f4f6',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px'
                                                    }}
                                                >
                                                    {admin.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                                {!admin.isSuperAdmin && (
                                                    <button
                                                        onClick={() => handleDeleteAdmin(admin._id)}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: '#fee2e2',
                                                            border: '1px solid #fca5a5',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px',
                                                            color: '#991b1b'
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Admin Modal */}
            {showCreateModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid #e0e0e0' }}>
                            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Create New Admin</h2>
                        </div>

                        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="Enter full name"
                                />
                                {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.name}</p>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="admin@example.com"
                                />
                                {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.email}</p>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                                    Phone Number *
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: `1px solid ${errors.phone ? '#ef4444' : '#d1d5db'}`,
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="0771234567"
                                />
                                {errors.phone && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.phone}</p>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="e.g., Senior Manager, Team Lead"
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                                    Role *
                                </label>
                                <select
                                    name="roleId"
                                    value={formData.roleId}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: `1px solid ${errors.roleId ? '#ef4444' : '#d1d5db'}`,
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                >
                                    <option value="">Select a role</option>
                                    {roles.map(role => (
                                        <option key={role._id} value={role._id}>{role.name}</option>
                                    ))}
                                </select>
                                {errors.roleId && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.roleId}</p>}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                                    Temporary Password *
                                </label>
                                <input
                                    type="text"
                                    name="temporaryPassword"
                                    value={formData.temporaryPassword}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: `1px solid ${errors.temporaryPassword ? '#ef4444' : '#d1d5db'}`,
                                        borderRadius: '6px',
                                        fontSize: '14px'
                                    }}
                                    placeholder="Minimum 6 characters"
                                />
                                {errors.temporaryPassword && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0' }}>{errors.temporaryPassword}</p>}
                                <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>
                                    This password will be sent to the user via email
                                </p>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="isSuperAdmin"
                                        checked={formData.isSuperAdmin}
                                        onChange={handleInputChange}
                                        style={{ marginRight: '8px' }}
                                    />
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Make Super Admin</span>
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    style={{
                                        padding: '10px 20px',
                                        background: '#f3f4f6',
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
                                    {loading ? 'Creating...' : 'Create Admin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </calcite-shell>
    );
};

export default AdminManagement;
