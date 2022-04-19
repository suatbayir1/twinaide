// Libraries
const asyncErrorWrapper = require('express-async-handler');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

// Models
const DT = require('../models/DT');

// Helpers
const { getDTOwnerAccess, getOnlyDTOwnerAccessByID } = require('../helpers/auth/accessControl');
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

    const dt = await DT.create(params)

    res.json({
        success: true,
        message: "Digital Twin created successfully",
        data: dt
    })
})

const getAllDTs = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;

    const dts = await DT
        .find({
            $or: [{
                privacy: "public"
            }, {
                owner: userID
            }]
        })
        .select('id name displayName description updatedAt privacy version')
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
        return next(new CustomError("Only owner can access this Digital Twin", 401));
    }

    res.json({
        success: true,
        message: "success",
        data: req.dt
    })
})

const updateDT = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;
    const { id: dtID } = req.params;

    let dt = await DT.findById(dtID);

    if (!getOnlyDTOwnerAccessByID(dtID, userID)) {
        return next(new CustomError("Only owner can access this Digital Twin", 401));
    }

    Object.keys(req.body).forEach(key => {
        // if (key in dt) {
        dt[key] = req.body[key];
        // }
    })

    dt = await dt.save();

    res.json({
        success: true,
        message: "DT updated successfully",
        data: dt
    });
})

const replaceDTWithNewDocument = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;
    const { id: dtID } = req.params;

    let dt = await DT.findById(dtID);

    if (!getOnlyDTOwnerAccessByID(dtID, userID)) {
        return next(new CustomError("Only owner can access this Digital Twin", 401));
    }


    dt = await dt.replaceOne(req.body);

    res.json({
        success: true,
        message: "DT updated successfully",
        data: dt
    });
})


const deleteDT = asyncErrorWrapper(async (req, res, next) => {
    const { id: dtID } = req.params;
    const { id: userID } = req.user;

    if (!getOnlyDTOwnerAccessByID(dtID, userID)) {
        return next(new CustomError("Only owner can delete this Digital Twin", 401));
    }

    await DT.findByIdAndDelete(dtID);

    res.json({
        success: true,
        message: "DT deleted successfully",
    })
})

module.exports = {
    createDT,
    getAllDTs,
    getSingleDT,
    updateDT,
    deleteDT,
    replaceDTWithNewDocument,
}