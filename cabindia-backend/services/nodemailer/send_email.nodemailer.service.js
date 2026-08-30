const transporter = require("../../utils/nodemailer.util");

/**
 * Sends an email via Nodemailer.
 * @param {string} to - Recipient email address
 * @param {{ subject: string, html: string }} template - Email template
 * @param {import("nodemailer").Attachment[]} [attachments=[]] - Optional file attachments
 */
const sendEmail = async (to, template, attachments = []) => {
    try {
        const fromEmail = process.env.SMTP_USER || process.env.EMAIL_USER || 'noreply@cabindia.com';
        
        await transporter.sendMail({
            from: fromEmail,
            to: to,
            subject: template.subject,
            html: template.html,
            attachments,
        });
        
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Email send error:', error);
        throw new Error('Failed to send email: ' + error.message);
    }
}

module.exports = sendEmail;