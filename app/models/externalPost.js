const mongoose = require('mongoose');

const ExternalPostSchema = new mongoose.Schema({
        url: {
            type: String,
            required: "Required"
        },
        added: {
            type: Date,
            required: "Required"
        },
        active: {
            type: Boolean,
            require: "Required",
            default: false
        },
        defaults: {
            title: {
                type: String
            },
            description: {
                type: String
            },
            image: {
                type: String
            }
        }
    }
)

module.exports = ExternalPostSchema;