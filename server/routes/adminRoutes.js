const express = require('express');
const router = express.Router();
const {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  toggleAdminStatus,
  unlockAdmin,
  resetAdminPassword
} = require('../controllers/adminController');
const { protect, isSuperAdmin, checkTemporaryPassword } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');

// All routes require authentication and super admin or admin management permission
router.use(protect);
router.use(checkTemporaryPassword);

// Get all admins and create new admin
router.route('/')
  .get(
    checkPermission('admins', 'view'),
    getAllAdmins
  )
  .post(
    isSuperAdmin,
    createAdmin
  );

// Admin operations by ID
router.route('/:id')
  .get(
    checkPermission('admins', 'view'),
    getAdminById
  )
  .put(
    checkPermission('admins', 'edit'),
    updateAdmin
  )
  .delete(
    isSuperAdmin,
    deleteAdmin
  );

// Toggle admin active status
router.patch('/:id/toggle-status',
  checkPermission('admins', 'edit'),
  toggleAdminStatus
);

// Unlock admin account
router.patch('/:id/unlock',
  isSuperAdmin,
  unlockAdmin
);

// Reset admin password
router.post('/:id/reset-password',
  isSuperAdmin,
  resetAdminPassword
);

module.exports = router;