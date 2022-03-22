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
        enum: ["MetaDT"]
    },
    relations: {
        type: Array,
        required: [true, "Please provide a relations"]
    }
})

module.exports = mongoose.model("MetaDT", MetaDTSchema);