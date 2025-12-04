//server->routes->rolseRoutes.js

const express = require('express');
const router = express.Router();

const {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
    toggleRoleStatus
} = require('../controllers/rolseController');

const { protect, authorize } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// GET all roles
router.get('/', getAllRoles);

// GET role by ID
router.get('/:id', getRoleById);

// POST create new role (Super Admin only)
router.post('/', createRole);

// PUT update role (Super Admin only)
router.put('/:id', updateRole);

// DELETE role (Super Admin only)
router.delete('/:id', deleteRole);

// PATCH toggle role status (Super Admin only)
router.patch('/:id/toggle-status', toggleRoleStatus);

module.exports = router;
