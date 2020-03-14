const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
        nick: {
            type: String,
            required: "Required"
        },
        text: {
            type: String,
            required: "Required"
        },
        date: {
            type: Date,
            required: "Required"
        },
        isApproved: {
            type: Boolean,
            default: false,
            required: "Required"
        },
    }
)

module.exports = CommentSchema;