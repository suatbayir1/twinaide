// Libraries
const express = require('express');
const router = express.Router();

// Route modules
const auth = require('./auth');
const dt = require('./dt');
const metadt = require('./metadt');

// Routers
router.use('/auth', auth);
router.use('/dt', dt);
router.use('/metadt', metadt);

module.exports = router;