import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-notice';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log('Input change:', name, value); // Debug log

        setFormData({
            ...formData,
            [name]: value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('Form data on submit:', formData); // Debug log

        // Validation
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('New password must be at least 6 characters');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const response = await API.put('/auth/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            if (response.data.success) {
                setSuccess('Password changed successfully! Redirecting...');

                // Update admin data in localStorage to remove temporary password flag
                const adminData = JSON.parse(localStorage.getItem('admin'));
                adminData.isTemporaryPassword = false;
                localStorage.setItem('admin', JSON.stringify(adminData));

                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 2000);
            }
        } catch (err) {
            console.error('Change password error:', err);
            setError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <calcite-shell>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px'
            }}>
                <calcite-card style={{ width: '100%', maxWidth: '500px' }}>
                    <div slot="heading" style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                        Change Password
                    </div>
                    <div slot="description" style={{ marginBottom: '24px', color: '#666' }}>
                        You are using a temporary password. Please change it to continue.
                    </div>

                    {error && (
                        <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
                            <div slot="message">{error}</div>
                        </calcite-notice>
                    )}

                    {success && (
                        <calcite-notice open icon="check-circle" kind="success" style={{ marginBottom: '20px' }}>
                            <div slot="message">{success}</div>
                        </calcite-notice>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Current (Temporary) Password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password (min 6 characters)"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    fontSize: '14px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '12px 24px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: 'white',
                                    background: loading ? '#ccc' : '#667eea',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => !loading && (e.target.style.background = '#5568d3')}
                                onMouseLeave={(e) => !loading && (e.target.style.background = '#667eea')}
                            >
                                {loading ? 'Changing Password...' : 'Change Password'}
                            </button>
                        </div>
                    </form>

                    <div style={{ marginTop: '20px', padding: '16px', background: '#f0f9ff', borderRadius: '4px', fontSize: '14px' }}>
                        <strong>Password Requirements:</strong>
                        <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                            <li>Minimum 6 characters</li>
                            <li>Must match confirmation</li>
                        </ul>
                    </div>
                </calcite-card>
            </div>
        </calcite-shell>
    );
};

export default ChangePassword;
