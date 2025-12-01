const crypto = require('crypto');

// Generate 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Temporary password generator
const generateTemporaryPassword = (length = 12) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  let password = '';

  // Ensure at least one of each type
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[crypto.randomInt(0, 26)];
  password += 'abcdefghijklmnopqrstuvwxyz'[crypto.randomInt(0, 26)];
  password += '0123456789'[crypto.randomInt(0, 10)];
  password += '!@#$%^&*'[crypto.randomInt(0, 8)];

  // Fill the remaining length
  for (let i = 4; i < length; i++) {
    password += charset[crypto.randomInt(0, charset.length)];
  }

  // Shuffle characters
  return password
    .split('')
    .sort(() => crypto.randomInt(-1, 2))
    .join('');
};

// OTP expiration helper
const getOTPExpiration = () => {
  const mins = parseInt(process.env.OTP_EXPIRE_MINUTES) || 10;
  return new Date(Date.now() + mins * 60 * 1000);
};

module.exports = {
  generateOTP,
  generateTemporaryPassword,
  getOTPExpiration
};
