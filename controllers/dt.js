// Libraries
const asyncErrorWrapper = require('express-async-handler');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

// Models
const DT = require('../models/DT');

// Helpers
const { getDTOwnerAccess } = require('../helpers/auth/accessControl');
const CustomError = require('../helpers/error/CustomError');

// Functions
const createDT = asyncErrorWrapper(async (req, res, next) => {
    // Check if the request params are correct
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
            message: helper.errorsToString(errors.array())
        })
    }

    // Put owner to DT documents
    const { id } = req.user;
    let params = req.body;
    params["id"] = uuidv4();
    params["owner"] = id;

    const dt = await DT.create(req.body)

    res.json({
        success: true,
        message: "Digital Twin created successfully",
        data: dt
    })
})

const getAllDTs = asyncErrorWrapper(async (req, res, next) => {
    const dts = await DT
        .find({
            privacy: "public"
        })
        .select('id name displayName')
        .sort({ updatedAt: 'desc' })
        .populate({
            path: "owner",
            select: "_id name email"
        });

    res.json({
        success: true,
        data: dts
    })
})

const getSingleDT = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;

    if (!getDTOwnerAccess(req.dt, userID)) {
        return next(new CustomError("Only owner can access this Digital Twin"));
    }

    res.json({
        success: true,
        message: "success",
        data: req.dt
    })
})

module.exports = {
    createDT,
    getAllDTs,
    getSingleDT,
}