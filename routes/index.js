// Libraries
const express = require('express');
const router = express.Router();

// Route modules
const auth = require('./auth');
const dt = require('./dt');

// Routers
router.use('/auth', auth);
router.use('/dt', dt);

module.exports = router;