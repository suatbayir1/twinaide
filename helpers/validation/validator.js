// Libraries
const { body, validationResult } = require('express-validator');

// Rules
const createDTRules = () => {
    return [
        body('name', "name doesn't exists").exists(),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors
    })
}

module.exports = {
    createDTRules,
    validate
}