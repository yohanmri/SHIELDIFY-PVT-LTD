const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Role name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Role name cannot exceed 50 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot exceed 200 characters']
    },
    permissions: {
      // Dashboard Permissions
      dashboard: {
        view: { type: Boolean, default: false }
      },
      // Product Permissions
      products: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
      },
      // Bundle Permissions
      bundles: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
      },
      // Order Permissions
      orders: {
        view: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        approve: { type: Boolean, default: false }
      },
      // Analytics Permissions
      analytics: {
        view: { type: Boolean, default: false },
        export: { type: Boolean, default: false }
      },
      // Admin Management Permissions (Super Admin only)
      admins: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
      },
      // Role Management Permissions (Super Admin only)
      roles: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
      }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true
  }
);



const Role = mongoose.model('Role', roleSchema);

module.exports = Role;