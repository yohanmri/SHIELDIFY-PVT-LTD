import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  console.log('🔒 ProtectedRoute: Checking authentication...');
  
  const token = localStorage.getItem('token');
  const admin = localStorage.getItem('admin');

  console.log('Token exists:', !!token);
  console.log('Admin exists:', !!admin);

  // If no token or admin data, redirect to login
  if (!token || !admin) {
    console.log('❌ No token or admin - redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  // Check if admin has temporary password
  try {
    const adminData = JSON.parse(admin);
    console.log('Admin data parsed:', adminData);
    console.log('Is temporary password:', adminData.isTemporaryPassword);
    console.log('Is active:', adminData.isActive);
    
    // If temporary password, redirect to change password page
    if (adminData.isTemporaryPassword) {
      console.log('❌ Temporary password - redirecting to change password');
      return <Navigate to="/admin/change-password" replace />;
    }

    // Check if admin is active
    if (!adminData.isActive) {
      console.log('❌ Admin not active - clearing storage and redirecting');
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      return <Navigate to="/admin/login" replace />;
    }

    console.log('✅ All checks passed - rendering protected component');

  } catch (error) {
    console.error('❌ Error parsing admin data:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;