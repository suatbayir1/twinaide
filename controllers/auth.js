// Libraries
const asyncErrorWrapper = require('express-async-handler');

// Helpers
const { sendJwtToClient } = require('../helpers/auth/tokenHelpers');
const { validateUserInput, comparePassword } = require('../helpers/input/inputHelpers');
const CustomError = require('../helpers/error/CustomError');

// Models
const User = require('../models/User');

const register = asyncErrorWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    sendJwtToClient(user, res);
})

const getUser = (req, res, next) => {
    res.json({
        success: true,
        data: req.user
    })
}

const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please check your inputs", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (user === null) {
        return next(new CustomError("This email is not registered", 404));
    }

    if (!comparePassword(password, user.password)) {
        return next(new CustomError("Please check your credentials", 400));
    }

    sendJwtToClient(user, res);
})

const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env;

    return res
        .status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        })
        .json({
            success: true,
            message: "Logout successfull"
        })
})

module.exports = {
    register,
    getUser,
    login,
    logout,
}