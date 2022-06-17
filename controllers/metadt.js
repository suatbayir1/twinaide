// Libraries
const asyncErrorWrapper = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');

// Helpers
const CustomError = require('../helpers/error/CustomError');
const { getDTOwnerAccess, getOnlyMetaDTOwnerAccessByID } = require('../helpers/auth/accessControl');

// Models
const MetaDT = require('../models/MetaDT');
const DT = require('../models/DT');

// Functions
const createMetaDT = asyncErrorWrapper(async (req, res, next) => {
    // Put owner to documents
    const { id } = req.user;
    let params = req.body;
    params["id"] = uuidv4();
    params["owner"] = id;

    const metaDT = await MetaDT.create(params);

    res.json({
        success: true,
        message: "Meta Digital Twin relation created successfully",
        data: metaDT
    })
})

const getAllMetaDTs = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;

    const metaDTs = await MetaDT
        .find({
            $or: [{
                privacy: "public"
            }, {
                owner: userID
            }]
        })
        .select('id name displayName relations description updatedAt privacy version')
        .sort({ updatedAt: 'desc' })
        .populate({
            path: "owner",
            select: "_id name email"
        });

    res.json({
        success: true,
        data: metaDTs
    })
})

const getSingleMetaDT = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;

    if (!getDTOwnerAccess(req.metaDT, userID)) {
        return next(new CustomError("Only owner can access this Meta DT", 401));
    }

    res.json({
        success: true,
        message: "success",
        data: req.metaDT,
    })
})

const deleteMetaDT = asyncErrorWrapper(async (req, res, next) => {
    const { id: dtID } = req.params;
    const { id: userID } = req.user;

    if (!getOnlyMetaDTOwnerAccessByID(dtID, userID)) {
        return next(new CustomError("Only owner can delete this Meta Digital Twin", 401));
    }

    await MetaDT.findByIdAndDelete(dtID);

    res.json({
        success: true,
        message: "Meta DT deleted successfully",
    })
})

const updateMetaDT = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;
    const { id: dtID } = req.params;

    let metadt = await MetaDT.findById(dtID);

    if (!getOnlyMetaDTOwnerAccessByID(dtID, userID)) {
        return next(new CustomError("Only owner can access this Meta Digital Twin", 401));
    }

    Object.keys(req.body).forEach(key => {
        metadt[key] = req.body[key];
    })

    metadt = await metadt.save();

    res.json({
        success: true,
        message: "Meta DT updated successfully",
        data: metadt
    });
})

const getSingleMetaDTDetail = asyncErrorWrapper(async (req, res, next) => {
    const { id: userID } = req.user;
    const { id } = req.params;

    if (!getDTOwnerAccess(req.metaDT, userID)) {
        return next(new CustomError("Only owner can access this Meta DT", 401));
    }

    const metadt = await MetaDT
        .findById(id)
        .populate({
            path: "owner",
            select: "_id name email"
        });

    const children = [];

    for (const relation of metadt.relations) {
        const dt = await DT.findOne({ id: relation }).populate({
            path: "owner",
            select: "_id name email"
        });

        if (!dt)
            continue

        children.push(dt);
    }

    const result = { ...JSON.parse(JSON.stringify(metadt)), children };

    res.json({
        success: true,
        message: "success",
        data: result,
    })
})

module.exports = {
    createMetaDT,
    getAllMetaDTs,
    getSingleMetaDT,
    deleteMetaDT,
    updateMetaDT,
    getSingleMetaDTDetail,
}