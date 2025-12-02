const jwt = require('jsonwebtoken');

// Create JWT
const generateToken = (payload, expiresIn = process.env.JWT_EXPIRE || '7d') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Create Refresh Token
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d'
  });
};

// Verify Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Send token to client
const sendTokenResponse = (admin, statusCode, res) => {
  const payload = {
    id: admin._id,
    email: admin.email,
    isSuperAdmin: admin.isSuperAdmin
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      refreshToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isSuperAdmin: admin.isSuperAdmin,
        isTemporaryPassword: admin.isTemporaryPassword,
        isActive: admin.isActive  // ADD THIS LINE!
      }
    });
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  sendTokenResponse
};
