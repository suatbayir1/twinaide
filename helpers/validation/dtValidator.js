// Libraries
const { body } = require('express-validator');

// Rules
const createDTRules = () => {
    return [
        body('name', "name doesn't exists").exists(),
    ]
}

const iterateHierarchy = (object) => {
    try {
        let result = false;

        if (object.type && object.type == "Field") {
            if (object.children) {
                return false;
            }
            result = true;
        }

        if (object.children && typeof object.children == 'object') {
            for (child of object.children) {
                return iterateHierarchy(child)
            }
        }

        return result;
    } catch (err) {
        return false;
    }
}


module.exports = {
    createDTRules,
    iterateHierarchy,
}