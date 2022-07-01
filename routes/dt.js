// Libraries
const express = require('express');
const router = express.Router();

// Controllers
const {
    createDT, getAllDTs, getSingleDT, updateDT, deleteDT,
    replaceDTWithNewDocument, visualFileUpload
} = require('../controllers/dt');

// Middlewares
const { getAccessToRoute, getAdminAccess, } = require('../middlewares/auth/auth');
const { checkDTExist } = require('../middlewares/database/databaseErrorHelpers');
const { checkIfHierarchySuitable } = require('../middlewares/validation/dtValidator');
const dtVisualFileUpload = require('../middlewares/libraries/dtVisualFileUpload');

// Helpers
const { validate } = require('../helpers/validation/validator');
const { createDTRules } = require('../helpers/validation/dtValidator');

// Routes
router.post("/createDT",
    [
        createDTRules(),
        validate,
        getAccessToRoute,
        getAdminAccess,
        // checkIfHierarchySuitable
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

router.put("/:id",
    [getAccessToRoute, checkDTExist],
    updateDT
);

router.put("/:id/replace",
    [
        getAccessToRoute,
        checkDTExist,
        // checkIfHierarchySuitable
    ],
    replaceDTWithNewDocument
)

router.delete("/:id",
    [getAccessToRoute, checkDTExist],
    deleteDT
)

router.post("/:id/uploadVisualFile",
    [getAccessToRoute, checkDTExist, dtVisualFileUpload.single("file")],
    visualFileUpload
)

module.exports = router;