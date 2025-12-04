//server->controllers->adminController.js

const Admin = require('../models/adminModel');
const Role = require('../models/roleModel');
const { generateTemporaryPassword } = require('../utils/otpGenerator');
const { sendWelcomeEmail, sendRoleAssignedEmail } = require('../utils/emailService');

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private (Super Admin or admins:view permission)
exports.getAllAdmins = async (req, res) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;

    let query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by role
    if (role && role !== 'all') {
      query.role = role;
    }

    // Filter by status
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    const skip = (page - 1) * limit;

    const admins = await Admin.find(query)
      .populate('role', 'name description')
      .populate('createdBy', 'name email')
      .select('-password -otp -otpExpires')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Admin.countDocuments(query);

    res.status(200).json({
      success: true,
      count: admins.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: admins
    });
  } catch (error) {
    console.error('Get all admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admins',
      error: error.message
    });
  }
};

// @desc    Get admin by ID
// @route   GET /api/admins/:id
// @access  Private (Super Admin or admins:view permission)
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
      .populate('role')
      .populate('createdBy', 'name email')
      .select('-password -otp -otpExpires');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Get admin by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching admin',
      error: error.message
    });
  }
};

// @desc    Create new admin
// @route   POST /api/admins
// @access  Private (Super Admin only)
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, phone, designation, roleId, temporaryPassword, isSuperAdmin } = req.body;

    // Validate required fields
    if (!name || !email || !roleId || !temporaryPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, role, and temporary password'
      });
    }

    // Phone is recommended but not strictly required for backward compatibility
    if (!phone) {
      console.warn('Creating admin without phone number - not recommended');
    }

    // Validate password length
    if (temporaryPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Temporary password must be at least 6 characters'
      });
    }

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check if role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    // Create admin
    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      designation: designation || '',
      password: temporaryPassword,
      role: roleId,
      isSuperAdmin: isSuperAdmin || false,
      isTemporaryPassword: true,
      createdBy: req.admin.id
    });

    // Send welcome email with credentials
    try {
      await sendWelcomeEmail(admin.email, admin.name, temporaryPassword, role.name, designation);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Continue even if email fails
    }

    // Populate role before sending response
    await admin.populate('role');

    res.status(201).json({
      success: true,
      message: 'Admin created successfully. Welcome email sent with login credentials.',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        designation: admin.designation,
        role: admin.role,
        isSuperAdmin: admin.isSuperAdmin
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating admin',
      error: error.message
    });
  }
};

// @desc    Update admin
// @route   PUT /api/admins/:id
// @access  Private (Super Admin or admins:edit permission)
exports.updateAdmin = async (req, res) => {
  try {
    const { name, email, roleId, isSuperAdmin } = req.body;

    let admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Prevent non-super-admins from updating super admin status
    if (isSuperAdmin !== undefined && !req.admin.isSuperAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Only super admins can modify super admin status'
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email.toLowerCase() !== admin.email) {
      const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    // Check if role exists (if being updated)
    if (roleId) {
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: 'Role not found'
        });
      }
    }

    // Update fields
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (roleId) updateData.role = roleId;
    if (isSuperAdmin !== undefined) updateData.isSuperAdmin = isSuperAdmin;

    admin = await Admin.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('role');

    res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: admin
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating admin',
      error: error.message
    });
  }
};

// @desc    Delete admin
// @route   DELETE /api/admins/:id
// @access  Private (Super Admin only)
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Prevent deleting own account
    if (admin._id.toString() === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await Admin.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting admin',
      error: error.message
    });
  }
};

// @desc    Toggle admin active status
// @route   PATCH /api/admins/:id/toggle-status
// @access  Private (Super Admin or admins:edit permission)
exports.toggleAdminStatus = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Prevent deactivating own account
    if (admin._id.toString() === req.admin.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account'
      });
    }

    admin.isActive = !admin.isActive;
    await admin.save();

    res.status(200).json({
      success: true,
      message: `Admin ${admin.isActive ? 'activated' : 'deactivated'} successfully`,
      data: admin
    });
  } catch (error) {
    console.error('Toggle admin status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling admin status',
      error: error.message
    });
  }
};

// @desc    Unlock admin account
// @route   PATCH /api/admins/:id/unlock
// @access  Private (Super Admin only)
exports.unlockAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    await admin.resetLoginAttempts();

    res.status(200).json({
      success: true,
      message: 'Admin account unlocked successfully'
    });
  } catch (error) {
    console.error('Unlock admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Error unlocking admin account',
      error: error.message
    });
  }
};

// @desc    Reset admin password
// @route   POST /api/admins/:id/reset-password
// @access  Private (Super Admin only)
exports.resetAdminPassword = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).populate('role');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Generate new temporary password
    const temporaryPassword = generateTemporaryPassword();

    admin.password = temporaryPassword;
    admin.isTemporaryPassword = true;
    await admin.save();

    // Send email with new password
    try {
      await sendRoleAssignedEmail(admin.email, admin.name, admin.role.name, temporaryPassword);
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Password reset successfully. New temporary password sent to admin email.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password',
      error: error.message
    });
  }
};