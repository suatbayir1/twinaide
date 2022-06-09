// Libraries
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetaDTSchema = new Schema({
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
        default: ""
    },
    displayName: {
        type: String,
        required: [true, "Please provide a display name"]
    },
    type: {
        type: String,
        required: [true, "Please provide a type"],
        enum: ["MetaDT"],
        default: "MetaDT"
    },
    relations: {
        type: Array,
        required: [true, "Please provide a relations"]
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide a unique owner id"],
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("MetaDT", MetaDTSchema);