const bcrypt = require('bcryptjs');

const hashPassword = async () => {
  const password = 'yohan@123';
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  console.log('Hashed Password:', hashed);
};

hashPassword();