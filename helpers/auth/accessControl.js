// Libraries
const asyncErrorWrapper = require('express-async-handler');

// Models
const DT = require('../../models/DT');

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

module.exports = {
    getDTOwnerAccess,
    getDTOwnerAccessByID
}