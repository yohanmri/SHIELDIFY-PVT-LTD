import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-loader';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('admin') || '{}');
    setAdminInfo(admin);
  }, []);

  const handleInputChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(false);
  };

  const validateForm = () => {
    if (!passwordData.currentPassword.trim()) {
      setError('Current password is required');
      return false;
    }

    if (!passwordData.newPassword.trim()) {
      setError('New password is required');
      return false;
    }

    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return false;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setError('New password must be different from current password');
      return false;
    }

    return true;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await API.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.response?.data?.message || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
              Account Settings
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
              Manage your account preferences and security
            </p>
          </div>

          {/* Account Information Card */}
          <calcite-card style={{ marginBottom: '24px' }}>
            <h2 slot="heading" style={{ fontSize: '18px', fontWeight: '600' }}>
              Account Information
            </h2>
            
            <div style={{ padding: '16px 0' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--calcite-ui-text-3)',
                    marginBottom: '4px'
                  }}>
                    Name
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {adminInfo?.name || 'N/A'}
                  </div>
                </div>

                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--calcite-ui-text-3)',
                    marginBottom: '4px'
                  }}>
                    Email
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {adminInfo?.email || 'N/A'}
                  </div>
                </div>

                <div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--calcite-ui-text-3)',
                    marginBottom: '4px'
                  }}>
                    Role
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {adminInfo?.isSuperAdmin ? 'Super Admin' : 'Admin'}
                  </div>
                </div>
              </div>
            </div>
          </calcite-card>

          {/* Change Password Card */}
          <calcite-card>
            <h2 slot="heading" style={{ fontSize: '18px', fontWeight: '600' }}>
              Change Password
            </h2>
            
            <form onSubmit={handleChangePassword} style={{ padding: '16px 0' }}>
              {success && (
                <calcite-notice 
                  open 
                  icon="check-circle" 
                  kind="success"
                  style={{ marginBottom: '20px' }}
                >
                  <div slot="title">Success</div>
                  <div slot="message">Your password has been changed successfully</div>
                </calcite-notice>
              )}

              {error && (
                <calcite-notice 
                  open 
                  icon="exclamation-mark-triangle" 
                  kind="danger"
                  style={{ marginBottom: '20px' }}
                >
                  <div slot="title">Error</div>
                  <div slot="message">{error}</div>
                </calcite-notice>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <calcite-label>
                  Current Password
                  <calcite-input
                    type="password"
                    value={passwordData.currentPassword}
                    onInput={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Enter your current password"
                    required
                    disabled={loading}
                  />
                </calcite-label>

                <calcite-label>
                  New Password
                  <calcite-input
                    type="password"
                    value={passwordData.newPassword}
                    onInput={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder="Enter your new password"
                    required
                    disabled={loading}
                  />
                  <div style={{ 
                    fontSize: '12px', 
                    color: 'var(--calcite-ui-text-3)',
                    marginTop: '4px'
                  }}>
                    Must be at least 6 characters
                  </div>
                </calcite-label>

                <calcite-label>
                  Confirm New Password
                  <calcite-input
                    type="password"
                    value={passwordData.confirmPassword}
                    onInput={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your new password"
                    required
                    disabled={loading}
                  />
                </calcite-label>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <calcite-button 
                    type="submit"
                    icon-start="key"
                    disabled={loading}
                    loading={loading}
                  >
                    {loading ? 'Changing Password...' : 'Change Password'}
                  </calcite-button>
                  
                  <calcite-button 
                    appearance="outline"
                    type="button"
                    onClick={() => {
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setError(null);
                      setSuccess(false);
                    }}
                    disabled={loading}
                  >
                    Clear
                  </calcite-button>
                </div>
              </div>
            </form>
          </calcite-card>

          {/* Security Tips */}
          <calcite-notice 
            open 
            icon="lightbulb" 
            kind="info"
            style={{ marginTop: '24px' }}
          >
            <div slot="title">Security Tips</div>
            <div slot="message">
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li>Use a strong password with a mix of letters, numbers, and symbols</li>
                <li>Don't reuse passwords from other accounts</li>
                <li>Change your password regularly</li>
                <li>Never share your password with anyone</li>
              </ul>
            </div>
          </calcite-notice>
        </div>
      </div>
    </calcite-shell>
  );
}
