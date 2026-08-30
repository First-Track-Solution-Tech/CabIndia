// cabindia-backend/routes/contactRoutes.js
const express = require('express');
const { submitContact } = require('../controllers/contactController');
const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', submitContact);

// @route   GET /api/contact/test
// @desc    Test route to check if contact API is working
router.get('/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Contact API is working!',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;