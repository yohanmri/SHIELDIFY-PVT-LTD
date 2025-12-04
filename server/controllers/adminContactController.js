
// ============================================
// FILE 2: controllers/adminContactController.js
// ============================================

const Contact = require('../models/contactModel');
const { sendEmail } = require('../utils/emailService'); // Destructure sendEmail

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .populate('repliedBy', 'name email');

    res.json({
      success: true,
      data: contacts
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// GET single contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (err) {
    console.error('Error fetching contact:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// UPDATE contact (mainly for status updates)
const updateContact = async (req, res) => {
  try {
    const { status } = req.body;

    const updateData = {};
    if (status) updateData.status = status;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: updatedContact
    });
  } catch (err) {
    console.error('Error updating contact:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// REPLY to contact (send email via Brevo)
const replyToContact = async (req, res) => {
  try {
    const { message } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // HTML email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2d5f8d; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">SHIELDIFY</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Dear ${contact.name},</p>
          
          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            Thank you for contacting us. Here is our response to your inquiry:
          </p>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #2d5f8d; margin: 20px 0;">
            <p style="font-size: 14px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            If you have any further questions, please don't hesitate to reach out.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #999; margin: 5px 0;">
              <strong>SHIELDIFY (Pvt) Ltd</strong><br>
              370 Galle - Colombo Rd, Colombo 00300<br>
              Phone: +0112 575 297 | Mobile: +94 77 525 5133<br>
              Email: yohanm.ranasingha@gmail.com<br>
              Web: www.shieldifylk.com
            </p>
          </div>
        </div>
        
        <div style="background: #333; padding: 15px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} SHIELDIFY. All rights reserved.
          </p>
        </div>
      </div>
    `;

    // Send email using your existing Brevo service
    await sendEmail({
      to: contact.email,
      subject: `Re: ${contact.service || 'Your Inquiry'} - SHIELDIFY`,
      htmlContent: htmlContent,
      textContent: `Dear ${contact.name},\n\nThank you for contacting us. Here is our response:\n\n${message}\n\nBest regards,\nSHIELDIFY Team`
    });

    // Update contact status
    contact.status = 'replied';
    contact.repliedAt = new Date();
    contact.repliedBy = req.user._id; // Assuming you have user info from auth middleware
    await contact.save();

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: contact
    });
  } catch (err) {
    console.error('Error sending reply:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: err.message
    });
  }
};

// GET contacts by status
const getContactsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const contacts = await Contact.find({ status })
      .sort({ createdAt: -1 })
      .populate('repliedBy', 'name email');

    res.json({
      success: true,
      data: contacts
    });
  } catch (err) {
    console.error('Error fetching contacts by status:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// GET contact statistics
const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const readContacts = await Contact.countDocuments({ status: 'read' });
    const repliedContacts = await Contact.countDocuments({ status: 'replied' });

    res.json({
      success: true,
      data: {
        total: totalContacts,
        new: newContacts,
        read: readContacts,
        replied: repliedContacts
      }
    });
  } catch (err) {
    console.error('Error fetching contact stats:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  replyToContact,
  getContactsByStatus,
  getContactStats
};
