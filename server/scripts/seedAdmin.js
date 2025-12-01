const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/adminModel');
const Role = require('../models/roleModel');

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if Super Admin role exists, if not create it
    let superAdminRole = await Role.findOne({ name: 'Super Admin' });
    
    if (!superAdminRole) {
      superAdminRole = await Role.create({
        name: 'Super Admin',
        description: 'Full system access with all permissions',
        permissions: {
          dashboard: { view: true },
          products: { view: true, create: true, edit: true, delete: true },
          bundles: { view: true, create: true, edit: true, delete: true },
          orders: { view: true, edit: true, delete: true, approve: true },
          analytics: { view: true, export: true },
          admins: { view: true, create: true, edit: true, delete: true },
          roles: { view: true, create: true, edit: true, delete: true }
        },
        isActive: true,
        isSuperAdmin: true
      });
      console.log('Super Admin role created');
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      process.exit(0);
    }

    // Create Super Admin
    const admin = await Admin.create({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: superAdminRole._id,
      isSuperAdmin: true,
      isActive: true,
      isTemporaryPassword: false // Set to false for initial admin
    });

    console.log('✅ Super Admin created successfully!');
    console.log('Email:', admin.email);
    console.log('Password:', process.env.ADMIN_PASSWORD);
    console.log('\nYou can now login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();