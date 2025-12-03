
// ============================================
// FILE 3: routes/adminContactRoutes.js
// ============================================

const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  replyToContact,
  getContactsByStatus,
  getContactStats
} = require('../controllers/adminContactController');
const { protect, checkTemporaryPassword } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/permissionMiddleware');

// All routes require authentication
router.use(protect);
router.use(checkTemporaryPassword);

// Get contact statistics
router.get('/stats',
  checkPermission('contacts', 'view'),
  getContactStats
);

// Get all contacts
router.get('/',
  checkPermission('contacts', 'view'),
  getAllContacts
);

// Get contacts by status
router.get('/status/:status',
  checkPermission('contacts', 'view'),
  getContactsByStatus
);

// Get single contact
router.get('/:id',
  checkPermission('contacts', 'view'),
  getContactById
);

// Update contact (status)
router.put('/:id',
  checkPermission('contacts', 'edit'),
  updateContact
);

// Delete contact
router.delete('/:id',
  checkPermission('contacts', 'delete'),
  deleteContact
);

// Reply to contact
router.post('/:id/reply',
  checkPermission('contacts', 'edit'),
  replyToContact
);

module.exports = router;