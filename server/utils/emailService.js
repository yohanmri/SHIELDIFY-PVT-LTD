require('dotenv').config(); // Ensure env is loaded
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Setup Brevo (Sendinblue) client
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send transactional email via Brevo
 * @param {Object} param0
 * @param {string} param0.to - Recipient email
 * @param {string} param0.subject - Email subject
 * @param {string} param0.htmlContent - HTML content
 * @param {string} param0.textContent - Plain text content (optional)
 */
const sendEmail = async ({ to, subject, htmlContent, textContent }) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: 'SHIELDIFY Admin',
      email: process.env.EMAIL_USER // Verified Brevo sender email
    };

    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent || subject;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending email:', error.response?.body || error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
