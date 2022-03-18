// Libraries
const asyncErrorWrapper = require('express-async-handler');

// Helpers
const { iterateHierarchy } = require('../../helpers/validation/dtValidator');
const CustomError = require('../../helpers/error/CustomError');

const checkIfHierarchySuitable = asyncErrorWrapper(async (req, res, next) => {
    if (!iterateHierarchy(req.body)) {
        return next(new CustomError("Your digital twin hierarchy is invalid. Please check the documentation"));
    }

    next();
})

module.exports = {
    checkIfHierarchySuitable,
}