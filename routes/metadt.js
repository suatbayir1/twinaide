// Libraries
const express = require('express');
const router = express.Router();

// Controllers
const { createMetaDT } = require('../controllers/metadt')

// Middlewares
const { getAccessToRoute, getAdminAccess } = require('../middlewares/auth/auth');
const { checkAccessToDTsByUser } = require('../middlewares/validation/metadtValidator');

// Helpers
const { createMetaDTRules } = require('../helpers/validation/metadtValidator');
const { validate } = require('../helpers/validation/validator');

// Routes
router.post("/",
    [
        createMetaDTRules(),
        validate,
        getAccessToRoute,
        getAdminAccess,
        checkAccessToDTsByUser
    ],
    createMetaDT
)

module.exports = router;