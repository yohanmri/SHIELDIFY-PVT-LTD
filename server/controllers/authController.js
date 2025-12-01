const Admin = require('../models/adminModel');

// Utils
const { generateOTP, getOTPExpiration } = require('../utils/otpGenerator');
const sendEmail = require('../utils/emailService');
const { sendTokenResponse } = require('../utils/jwtToken');

//
// =====================================================================
// REQUEST OTP
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

    // If account is locked
    if (admin.isLocked && admin.lockUntil > Date.now()) {
      const mins = Math.ceil((admin.lockUntil - Date.now()) / 60000);
      return res.status(403).json({
        success: false,
        message: `Account locked due to failed attempts. Try again in ${mins} minutes.`
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
      <h2>Welcome to SHIELDIFY</h2>
      <p>Hi ${admin.name},</p>
      <p>Your login OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.</p>
    `;

    // Send Email
    await sendEmail({
      to: admin.email,
      subject: 'Your SHIELDIFY Login OTP',
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
// LOGIN WITH OTP
// =====================================================================
//
exports.login = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({ email: normalizedEmail })
      .select('+otp +otpExpires +isLocked +lockUntil');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Invalid login credentials'
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

    // OTP correct → clear OTP
    admin.otp = undefined;
    admin.otpExpires = undefined;

    // Unlock account if needed
    admin.isLocked = false;
    admin.lockUntil = undefined;

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
// GET LOGGED-IN USER
// =====================================================================
//
exports.getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

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
    const { newPassword } = req.body;

    const admin = await Admin.findById(req.admin.id).select('+password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    admin.password = newPassword;
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
