const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/adminModel');

dotenv.config();

const testAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Test 1: Find admin without email normalization
    const admin1 = await Admin.findOne({ email: 'yohanm.ranasingha@gmail.com' });
    console.log('\n1. Direct query result:', admin1 ? 'FOUND' : 'NOT FOUND');
    if (admin1) {
      console.log('   Email in DB:', admin1.email);
      console.log('   Name:', admin1.name);
    }

    // Test 2: Find admin with lowercase
    const admin2 = await Admin.findOne({ email: 'yohanm.ranasingha@gmail.com'.toLowerCase() });
    console.log('\n2. Lowercase query result:', admin2 ? 'FOUND' : 'NOT FOUND');

    // Test 3: Count all admins
    const count = await Admin.countDocuments();
    console.log('\n3. Total admins in database:', count);

    // Test 4: Get all admins
    const allAdmins = await Admin.find({}).select('email name');
    console.log('\n4. All admin emails in database:');
    allAdmins.forEach(admin => {
      console.log('   -', admin.email, '(Name:', admin.name + ')');
    });

    // Test 5: Check raw collection
    const db = mongoose.connection.db;
    const rawAdmins = await db.collection('admins').find({}).toArray();
    console.log('\n5. Raw admins from collection:');
    rawAdmins.forEach(admin => {
      console.log('   - Email:', admin.email);
      console.log('     Has password:', !!admin.password);
      console.log('     Has role:', !!admin.role);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testAdmin();