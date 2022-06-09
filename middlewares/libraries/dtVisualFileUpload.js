const multer = require("multer");
const path = require("path");
const fs = require("fs");
const CustomError = require("../../helpers/error/CustomError");

// Storage
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads"));
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        req.savedVisualFile = file.originalname;
        cb(null, req.savedVisualFile);
    }
})

// File Filter
const fileFilter = (req, file, cb) => {
    let allowedMimeTypes = ["application/xml", "application/octet-stream"];

    console.log(file);

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid image file", 400), false);
    }

    if (fs.existsSync(path.join(path.join(path.dirname(require.main.filename), "/public/uploads"), file.originalname))) {
        return cb(new CustomError(`File ${file.originalname} is already uploaded!`, 400), false);
    }

    return cb(null, true);
}

const dtVisualFileUpload = multer({ storage, fileFilter });

module.exports = dtVisualFileUpload;