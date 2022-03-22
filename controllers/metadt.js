// Libraries
const asyncErrorWrapper = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');

// Helpers
const CustomError = require('../helpers/error/CustomError');
const { getDTOwnerAccess } = require('../helpers/auth/accessControl');

// Models
const MetaDT = require('../models/MetaDT');

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
        .select('id name displayName relations')
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

module.exports = {
    createMetaDT,
    getAllMetaDTs,
    getSingleMetaDT,
}