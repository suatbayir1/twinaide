// Libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DTSchema = new Schema({
    version: {
        type: String,
        required: [true, "Please provide a version"]
    },
    privacy: {
        type: String,
        required: [true, "Please provide a privacy"],
        enum: ["public", "private"]
    },
    id: {
        type: String,
        required: [true, "Please provide a unique id"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please provide a unique name"],
        unique: true
    },
    description: {
        type: String,
        default: "",
    },
    displayName: {
        type: String,
        required: [true, "Please provide a display name"]
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a unique owner id"],
        ref: "User"
    },
    location: {
        country: { type: String },
        city: { type: String },
        address: { type: String }
    },
    type: {
        type: String,
        required: [true, "Please provide a type"],
        enum: ["Factory", "ProductionLine", "Machine"]
    },
    manufacturer: {
        name: { type: String },
        website: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    children: {
        type: Array,
        required: [true, "Please provide a children"],
    }
})


DTSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
})

module.exports = mongoose.model("DT", DTSchema);