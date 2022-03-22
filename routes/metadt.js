// Libraries
const express = require('express');
const router = express.Router();

// Controllers
const { createMetaDT, getAllMetaDTs, getSingleMetaDT } = require('../controllers/metadt')

// Middlewares
const { getAccessToRoute, getAdminAccess } = require('../middlewares/auth/auth');
const { checkAccessToDTsByUser } = require('../middlewares/validation/metadtValidator');
const { checkMetaDTExist } = require('../middlewares/database/databaseErrorHelpers')

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

router.get("/",
    getAccessToRoute,
    getAllMetaDTs
)

router.get("/:id",
    [getAccessToRoute, checkMetaDTExist],
    getSingleMetaDT
)

module.exports = router;