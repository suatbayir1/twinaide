// Libraries
const asyncErrorWrapper = require('express-async-handler');

// Helpers
const CustomError = require('../../helpers/error/CustomError');

// Models
const DT = require('../../models/DT');
const MetaDT = require('../../models/MetaDT');

const checkDTExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const dt = await DT.findById(id);

    if (!dt) {
        return next(new CustomError("There is no such DT with that id", 404))
    }

    req.dt = dt;

    next();
})

const checkMetaDTExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const metaDT = await MetaDT.findById(id);

    if (!metaDT) {
        return next(new CustomError("There is no such Meta DT with that id", 404))
    }

    req.metaDT = metaDT;

    next();
})

module.exports = {
    checkDTExist,
    checkMetaDTExist,
}