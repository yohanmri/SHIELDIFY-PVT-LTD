//server->controllers->authController.js

const Admin = require('../models/adminModel');

// Utils
const { generateOTP, getOTPExpiration } = require('../utils/otpGenerator');
const sendEmail = require('../utils/emailService');
const { sendTokenResponse } = require('../utils/jwtToken');

//
// =====================================================================
// LOGIN WITH EMAIL AND PASSWORD (NO OTP REQUIRED)
// =====================================================================
//
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({ email: normalizedEmail })
      .select('+password +isLocked +lockUntil')
      .populate('role');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Invalid login credentials'
      });
    }

    // Check if active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated.'
      });
    }

    // Check lock
    if (admin.isLocked && admin.lockUntil > Date.now()) {
      const mins = Math.ceil((admin.lockUntil - Date.now()) / 60000);
      return res.status(403).json({
        success: false,
        message: `Account locked. Try again in ${mins} minutes.`
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      await admin.incLoginAttempts();
      return res.status(400).json({
        success: false,
        message: 'Invalid login credentials'
      });
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    // Send JWT token
    return sendTokenResponse(admin, 200, res);

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

//
// =====================================================================
// REQUEST OTP (FOR FORGOT PASSWORD)
// =====================================================================
//
exports.requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({ email: normalizedEmail })
      .select('+password +otp +otpExpires +isLocked +lockUntil');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address'
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated.'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = getOTPExpiration();

    admin.otp = otp;
    admin.otpExpires = otpExpires;
    await admin.save();

    // Email body
    const htmlBody = `
      <h2>SHIELDIFY Password Reset</h2>
      <p>Hi ${admin.name},</p>
      <p>Your password reset OTP is:</p>
      <h1 style="color: #1e3a8a; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
      <p>This OTP will expire in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    // Send Email
    await sendEmail({
      to: admin.email,
      subject: 'SHIELDIFY Password Reset OTP',
      htmlContent: htmlBody
    });

    return res.status(200).json({
      success: true,
      message: 'OTP has been sent to your email address',
      expiresIn: process.env.OTP_EXPIRE_MINUTES || 10
    });

  } catch (error) {
    console.error('Request OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

//
// =====================================================================
// VERIFY OTP AND RESET PASSWORD
// =====================================================================
//
exports.resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP and new password are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({ email: normalizedEmail })
      .select('+otp +otpExpires +password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Invalid request'
      });
    }

    // OTP expired
    if (!admin.otp || admin.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Wrong OTP
    if (admin.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // OTP correct → update password
    admin.password = newPassword;
    admin.otp = undefined;
    admin.otpExpires = undefined;
    admin.isTemporaryPassword = false;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

//
// =====================================================================
// GET LOGGED-IN USER
// =====================================================================
//
exports.getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).populate('role');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: admin
    });

  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

//
// =====================================================================
// CHANGE PASSWORD
// =====================================================================
//
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const admin = await Admin.findById(req.admin.id).select('+password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Verify current password
    const isPasswordValid = await admin.comparePassword(currentPassword);
    
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    admin.password = newPassword;
    admin.isTemporaryPassword = false;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

//
// =====================================================================
// LOGOUT
// =====================================================================
//
exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};