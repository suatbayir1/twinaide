// Libraries
const asyncErrorWrapper = require('express-async-handler');

// Models
const DT = require('../../models/DT');
const MetaDT = require('../../models/MetaDT');

const getDTOwnerAccess = (dt, userID) => {
    if (dt.privacy == "private" && dt.owner.toString() != userID) {
        return false;
    }
    return true;
}

const getDTOwnerAccessByID = asyncErrorWrapper(async (dtID, userID) => {
    const dt = await DT.findOne({ id: dtID });

    if (!dt) {
        return false;
    }

    if (dt.privacy == "private" && dt.owner.toString() != userID) {
        return false;
    }
    return true;
})

const getOnlyDTOwnerAccessByID = asyncErrorWrapper(async (dtID, userID) => {
    const dt = await DT.findOne({ _id: dtID });

    if (!dt) {
        return false;
    }

    if (dt.owner.toString() != userID) {
        return false;
    }
    return true;
})

const getOnlyMetaDTOwnerAccessByID = asyncErrorWrapper(async (dtID, userID) => {
    const metadt = await MetaDT.findOne({ _id: dtID });

    if (!metadt) {
        return false;
    }

    if (metadt.owner.toString() != userID) {
        return false;
    }
    return true;
})

module.exports = {
    getDTOwnerAccess,
    getDTOwnerAccessByID,
    getOnlyDTOwnerAccessByID,
    getOnlyMetaDTOwnerAccessByID,
}