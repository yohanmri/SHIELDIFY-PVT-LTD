import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const admin = localStorage.getItem('admin');

  // Only redirect if we're actually ON the login page path
  // This prevents redirect loops during navigation transitions
  if (location.pathname === '/admin/login' && token && admin) {
    try {
      const adminData = JSON.parse(admin);
      
      // Check if using temporary password
      if (adminData.isTemporaryPassword) {
        return <Navigate to="/admin/change-password" replace />;
      }
      
      // Redirect to dashboard if already authenticated
      return <Navigate to="/admin/dashboard" replace />;
    } catch (error) {
      console.error('Error parsing admin data:', error);
      // Clear corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    }
  }

  // Allow access to login page if not authenticated
  return children;
};

export default PublicRoute;