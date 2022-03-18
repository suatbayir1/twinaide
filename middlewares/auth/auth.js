// Libraries
const jwt = require('jsonwebtoken');
const asyncErrorWrapper = require('express-async-handler');

// Models
const User = require('../../models/User');

// Helpers
const CustomError = require('../../helpers/error/CustomError');
const { isTokenIncluded, getAccessTokenFromHeader } = require('../../helpers/auth/tokenHelpers');

// Functions
const getAccessToRoute = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;

    if (!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized to access this route", 401))
    }

    const accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("You are not authorized to access this route", 401));
        }

        req.user = decoded;

        next();
    });
}

const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.user;

    const user = await User.findById(id);

    if (user.role !== "admin") {
        return next(new CustomError("Only admins can access this route", 403));
    }

    next();
})

module.exports = {
    getAccessToRoute,
    getAdminAccess,
}