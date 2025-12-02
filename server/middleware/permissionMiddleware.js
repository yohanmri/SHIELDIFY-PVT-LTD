//server->middleware->permissionMiddleware.js

// Check if user has specific permission
const checkPermission = (resource, action) => {
  return (req, res, next) => {
    // Super admins have all permissions
    if (req.admin.isSuperAdmin) {
      return next();
    }
    
    // Check if admin has role populated
    if (!req.admin.role || !req.admin.role.permissions) {
      return res.status(403).json({
        success: false,
        message: 'Role permissions not found'
      });
    }
    
    // Check if role is active
    if (!req.admin.role.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your role has been deactivated. Please contact administrator.'
      });
    }
    
    const permissions = req.admin.role.permissions;
    
    // Check if resource exists in permissions
    if (!permissions[resource]) {
      return res.status(403).json({
        success: false,
        message: `No permissions defined for ${resource}`
      });
    }
    
    // Check if admin has the specific action permission
    if (!permissions[resource][action]) {
      return res.status(403).json({
        success: false,
        message: `You don't have permission to ${action} ${resource}`
      });
    }
    
    next();
  };
};

// Check multiple permissions (admin needs at least one)
const checkAnyPermission = (permissionChecks) => {
  return (req, res, next) => {
    // Super admins have all permissions
    if (req.admin.isSuperAdmin) {
      return next();
    }
    
    if (!req.admin.role || !req.admin.role.permissions) {
      return res.status(403).json({
        success: false,
        message: 'Role permissions not found'
      });
    }
    
    const permissions = req.admin.role.permissions;
    
    // Check if admin has any of the required permissions
    const hasPermission = permissionChecks.some(({ resource, action }) => {
      return permissions[resource] && permissions[resource][action];
    });
    
    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: 'You don\'t have the required permissions for this action'
      });
    }
    
    next();
  };
};

// Check all permissions (admin needs all)
const checkAllPermissions = (permissionChecks) => {
  return (req, res, next) => {
    // Super admins have all permissions
    if (req.admin.isSuperAdmin) {
      return next();
    }
    
    if (!req.admin.role || !req.admin.role.permissions) {
      return res.status(403).json({
        success: false,
        message: 'Role permissions not found'
      });
    }
    
    const permissions = req.admin.role.permissions;
    
    // Check if admin has all required permissions
    const hasAllPermissions = permissionChecks.every(({ resource, action }) => {
      return permissions[resource] && permissions[resource][action];
    });
    
    if (!hasAllPermissions) {
      return res.status(403).json({
        success: false,
        message: 'You don\'t have all the required permissions for this action'
      });
    }
    
    next();
  };
};

module.exports = {
  checkPermission,
  checkAnyPermission,
  checkAllPermissions
};