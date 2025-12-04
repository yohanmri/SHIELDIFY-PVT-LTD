import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios';

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
    const [permissions, setPermissions] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserPermissions();
    }, []);

    const fetchUserPermissions = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('[PermissionContext] No token found');
                setLoading(false);
                return;
            }

            // Get current admin user with role and permissions
            const response = await API.get('/auth/me');
            const adminUser = response.data.data;

            console.log('[PermissionContext] User loaded:', adminUser);

            setUser(adminUser);

            // Super admin has all permissions
            if (adminUser.isSuperAdmin) {
                console.log('[PermissionContext] Super Admin detected - granting all permissions');
                setPermissions('SUPER_ADMIN');
            } else if (adminUser.role && adminUser.role.permissions) {
                console.log('[PermissionContext] Role permissions loaded:', adminUser.role.permissions);
                setPermissions(adminUser.role.permissions);
            } else {
                console.log('[PermissionContext] No role or permissions found');
                setPermissions({});
            }
        } catch (error) {
            console.error('[PermissionContext] Error fetching permissions:', error);
            // Set empty permissions on error instead of failing
            setPermissions({});
        } finally {
            setLoading(false);
        }
    };

    const hasPermission = (section, action) => {
        // Super admin has all permissions
        if (permissions === 'SUPER_ADMIN') {
            console.log(`[PermissionContext] Super Admin - allowing ${section}.${action || 'any'}`);
            return true;
        }

        // No permissions loaded
        if (!permissions || typeof permissions !== 'object') {
            console.log(`[PermissionContext] No permissions object - denying ${section}.${action || 'any'}`);
            return false;
        }

        // Check if section exists
        if (!permissions[section]) {
            console.log(`[PermissionContext] Section ${section} not found - denying ${action || 'any'}`);
            return false;
        }

        // If no action specified, just check if section is accessible
        if (!action) {
            // Check if any permission in the section is true
            const hasAny = Object.values(permissions[section]).some(val => val === true);
            console.log(`[PermissionContext] Checking section ${section} - ${hasAny ? 'allowed' : 'denied'}`);
            return hasAny;
        }

        // Check specific action permission
        const allowed = permissions[section][action] === true;
        console.log(`[PermissionContext] Checking ${section}.${action} - ${allowed ? 'allowed' : 'denied'}`);
        return allowed;
    };

    const isSuperAdmin = () => {
        const result = user?.isSuperAdmin === true;
        console.log(`[PermissionContext] isSuperAdmin check - ${result}`);
        return result;
    };

    const refreshPermissions = () => {
        fetchUserPermissions();
    };

    return (
        <PermissionContext.Provider value={{
            permissions,
            user,
            loading,
            hasPermission,
            isSuperAdmin,
            refreshPermissions
        }}>
            {children}
        </PermissionContext.Provider>
    );
};

export const usePermission = () => {
    const context = useContext(PermissionContext);
    if (!context) {
        throw new Error('usePermission must be used within PermissionProvider');
    }
    return context;
};

export default PermissionContext;
