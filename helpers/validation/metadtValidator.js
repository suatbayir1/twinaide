// Libraries
const { body } = require('express-validator');

// Rules
const createMetaDTRules = () => {
    return [
        body('relations', "relations doesn't exists").exists(),
        body('relations', "relations must be array").isArray(),
    ]
}

module.exports = {
    createMetaDTRules,
}