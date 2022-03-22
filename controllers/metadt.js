// Libraries
const asyncErrorWrapper = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');

// Helpers
const CustomError = require('../helpers/error/CustomError');

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

module.exports = {
    createMetaDT,
}