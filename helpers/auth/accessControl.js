const getDTOwnerAccess = (dt, userID) => {
    if (dt.privacy == "private" && dt.owner.toString() != userID) {
        return false;
    }
    return true;
}

module.exports = {
    getDTOwnerAccess,
}