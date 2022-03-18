// Libraries
const asyncErrorWrapper = require('express-async-handler');

// Helpers
const CustomError = require('../../helpers/error/CustomError');

// Models
const DT = require('../../models/DT');


const checkDTExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const dt = await DT.findById(id);

    if (!dt) {
        return next(new CustomError("There is no such dt with that id", 400))
    }

    req.dt = dt;

    next();
})

module.exports = {
    checkDTExist,
}