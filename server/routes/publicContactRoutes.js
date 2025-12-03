
// ============================================
// FILE 4: routes/publicContactRoutes.js
// ============================================

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const sendEmail = require('../utils/emailService'); // Your existing Brevo email service

// POST - Create new contact inquiry (public route - no auth required)
router.post('/', async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      company,
      service,
      message,
      status: 'new'
    });

    const savedContact = await newContact.save();

    // Send confirmation email to the customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2d5f8d; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">SHIELDIFY</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Dear ${name},</p>
          
          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            Thank you for contacting SHIELDIFY! We have received your inquiry and our team will get back to you within 24 hours.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5f8d; margin-top: 0;">Your Message Summary:</h3>
            <p style="font-size: 13px; color: #666; margin: 5px 0;"><strong>Service:</strong> ${service || 'General Inquiry'}</p>
            ${company ? `<p style="font-size: 13px; color: #666; margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ''}
            <p style="font-size: 13px; color: #666; margin: 5px 0;"><strong>Message:</strong></p>
            <p style="font-size: 13px; color: #333; line-height: 1.6; white-space: pre-wrap; background: #f8f9fa; padding: 10px; border-radius: 4px;">${message}</p>
          </div>
          
          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            In the meantime, feel free to explore our website or contact us directly if you have any urgent concerns.
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

    try {
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting SHIELDIFY - We received your inquiry',
        htmlContent: confirmationHtml,
        textContent: `Dear ${name},\n\nThank you for contacting SHIELDIFY! We have received your inquiry and our team will get back to you within 24 hours.\n\nBest regards,\nSHIELDIFY Team`
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails, just log it
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: savedContact
    });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again.',
      error: err.message
    });
  }
});

module.exports = router;
