// Libraries
const express = require('express');
const router = express.Router();

// Controllers
const { createDT, getAllDTs, getSingleDT } = require('../controllers/dt');

// Middlewares
const { getAccessToRoute, getAdminAccess, } = require('../middlewares/auth/auth');
const { checkDTExist } = require('../middlewares/database/databaseErrorHelpers');
const { checkIfHierarchySuitable } = require('../middlewares/validation/dtValidator');

// Helpers
const { createDTRules, validate } = require('../helpers/validation/validator');

// Routes
router.post("/createDT",
    [
        createDTRules(),
        validate,
        getAccessToRoute,
        getAdminAccess,
        checkIfHierarchySuitable
    ],
    createDT
);

router.get("/",
    getAccessToRoute,
    getAllDTs
)

router.get("/:id",
    [getAccessToRoute, checkDTExist],
    getSingleDT
)

module.exports = router;