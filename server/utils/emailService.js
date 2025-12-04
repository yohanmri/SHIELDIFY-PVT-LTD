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

/**
 * Send welcome email to new admin with login credentials
 */
const sendWelcomeEmail = async (email, name, temporaryPassword, roleName, designation) => {
  const subject = 'Welcome to SHIELDIFY Admin Panel';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .credentials { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
        .credential-row { margin: 10px 0; }
        .label { font-weight: bold; color: #667eea; }
        .value { background: #f0f0f0; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-left: 10px; }
        .button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to SHIELDIFY</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Your admin account has been created successfully. You have been assigned the role of <strong>${roleName}</strong>${designation ? ` as <strong>${designation}</strong>` : ''}.</p>
          
          <div class="credentials">
            <h3>Your Login Credentials:</h3>
            <div class="credential-row">
              <span class="label">Email:</span>
              <span class="value">${email}</span>
            </div>
            <div class="credential-row">
              <span class="label">Temporary Password:</span>
              <span class="value">${temporaryPassword}</span>
            </div>
          </div>
          
          <p><strong>Important:</strong> This is a temporary password. You will be required to change it upon your first login for security purposes.</p>
          
          <p>Please keep these credentials secure and do not share them with anyone.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.ADMIN_PANEL_URL || 'http://localhost:3000/admin'}" class="button">Login to Admin Panel</a>
          </div>
          
          <div class="footer">
            <p>If you did not expect this email, please contact the system administrator immediately.</p>
            <p>&copy; ${new Date().getFullYear()} SHIELDIFY. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Welcome to SHIELDIFY Admin Panel

Hello ${name}!

Your admin account has been created successfully.
Role: ${roleName}
${designation ? `Designation: ${designation}` : ''}

Your Login Credentials:
Email: ${email}
Temporary Password: ${temporaryPassword}

IMPORTANT: This is a temporary password. You will be required to change it upon your first login.

Please keep these credentials secure.

Login URL: ${process.env.ADMIN_PANEL_URL || 'http://localhost:3000/admin'}

If you did not expect this email, please contact the system administrator immediately.
  `;

  return sendEmail({ to: email, subject, htmlContent, textContent });
};

/**
 * Send role assigned email (for password resets)
 */
const sendRoleAssignedEmail = async (email, name, roleName, temporaryPassword) => {
  const subject = 'Your SHIELDIFY Admin Password Has Been Reset';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .credentials { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
        .value { background: #f0f0f0; padding: 8px 12px; border-radius: 4px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Your password has been reset by the system administrator.</p>
          
          <div class="credentials">
            <h3>Your New Temporary Password:</h3>
            <p class="value">${temporaryPassword}</p>
          </div>
          
          <p><strong>Important:</strong> You will be required to change this password upon your next login.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: email, subject, htmlContent, textContent: `Your new temporary password is: ${temporaryPassword}` });
};

module.exports = { sendEmail, sendWelcomeEmail, sendRoleAssignedEmail };
