import { usePermission } from '../context/PermissionContext';

/**
 * Custom hook for checking permissions
 * @returns {Object} Permission checking functions
 */
export const usePermissions = () => {
    const { permissions, user, loading, hasPermission, isSuperAdmin, refreshPermissions } = usePermission();

    return {
        permissions,
        user,
        loading,
        hasPermission,
        isSuperAdmin,
        refreshPermissions,

        // Convenience methods for common checks
        canView: (section) => hasPermission(section, 'view'),
        canCreate: (section) => hasPermission(section, 'create'),
        canEdit: (section) => hasPermission(section, 'edit'),
        canDelete: (section) => hasPermission(section, 'delete'),
        canApprove: (section) => hasPermission(section, 'approve'),
        canExport: (section) => hasPermission(section, 'export'),
    };
};

export default usePermissions;
