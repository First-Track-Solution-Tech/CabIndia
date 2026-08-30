const nodemailer = require("nodemailer");
require('dotenv').config();

// Configure transporter with fallback values
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER,
        pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASS
    },
    // Add debug option for testing
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
});

// Verify transporter configuration on startup
(async () => {
    try {
        await transporter.verify();
        console.log('✅ Email transporter configured successfully');
    } catch (error) {
        console.error('❌ Email transporter verification failed:', error.message);
        console.log('⚠️ Email will not work until SMTP is properly configured');
    }
})();

module.exports = transporter;