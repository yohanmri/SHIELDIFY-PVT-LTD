const Role = require('../models/roleModel');
const Admin = require('../models/adminModel');

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private (Super Admin or roles:view permission)
exports.getAllRoles = async (req, res) => {
  try {
    const { search, status } = req.query;
    
    let query = {};
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Filter by status
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }
    
    const roles = await Role.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    console.error('Get all roles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching roles',
      error: error.message
    });
  }
};

// @desc    Get role by ID
// @route   GET /api/roles/:id
// @access  Private (Super Admin or roles:view permission)
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    // Get count of admins with this role
    const adminCount = await Admin.countDocuments({ role: role._id });
    
    res.status(200).json({
      success: true,
      data: {
        ...role.toObject(),
        adminCount
      }
    });
  } catch (error) {
    console.error('Get role by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching role',
      error: error.message
    });
  }
};

// @desc    Create new role
// @route   POST /api/roles
// @access  Private (Super Admin only)
exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide role name'
      });
    }
    
    // Check if role name already exists
    const existingRole = await Role.findOne({ name: name.trim() });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: 'Role name already exists'
      });
    }
    
    // Create role
    const role = await Role.create({
      name: name.trim(),
      description: description?.trim(),
      permissions: permissions || {},
      createdBy: req.admin.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: role
    });
  } catch (error) {
    console.error('Create role error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating role',
      error: error.message
    });
  }
};

// @desc    Update role
// @route   PUT /api/roles/:id
// @access  Private (Super Admin only)
exports.updateRole = async (req, res) => {
  try {
    const { name, description, permissions, isActive } = req.body;
    
    let role = await Role.findById(req.params.id);
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    // Check if role name is being changed and if it's already taken
    if (name && name.trim() !== role.name) {
      const existingRole = await Role.findOne({ name: name.trim() });
      if (existingRole) {
        return res.status(400).json({
          success: false,
          message: 'Role name already exists'
        });
      }
    }
    
    // Update fields
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (permissions) updateData.permissions = permissions;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    role = await Role.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: role
    });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating role',
      error: error.message
    });
  }
};

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private (Super Admin only)
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    // Check if any admins are using this role
    const adminCount = await Admin.countDocuments({ role: role._id });
    if (adminCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete role. ${adminCount} admin(s) are assigned to this role. Please reassign them first.`
      });
    }
    
    await Role.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Role deleted successfully'
    });
  } catch (error) {
    console.error('Delete role error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting role',
      error: error.message
    });
  }
};

// @desc    Toggle role active status
// @route   PATCH /api/roles/:id/toggle-status
// @access  Private (Super Admin only)
exports.toggleRoleStatus = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }
    
    role.isActive = !role.isActive;
    await role.save();
    
    res.status(200).json({
      success: true,
      message: `Role ${role.isActive ? 'activated' : 'deactivated'} successfully`,
      data: role
    });
  } catch (error) {
    console.error('Toggle role status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling role status',
      error: error.message
    });
  }
};