// Libraries
const asyncErrorWrapper = require('express-async-handler');

// Helpers
const CustomError = require('../../helpers/error/CustomError');
const { getDTOwnerAccessByID } = require('../../helpers/auth/accessControl');

const checkAccessToDTsByUser = asyncErrorWrapper(async (req, res, next) => {
    const { relations } = req.body;
    const { id: userID } = req.user;

    for (const relation of relations) {
        const keys = Object.keys(relation);

        for (const key of keys) {
            const accessible = await getDTOwnerAccessByID(relation[key], userID);

            if (!accessible)
                return next(new CustomError(`You cannot access to this DT: ${relation[key]}`, 400))
        }
    }

    next();
});

module.exports = {
    checkAccessToDTsByUser,
}