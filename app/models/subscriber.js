const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
        email: {
            type: String,
            required: "Required"
        },
        isActive: {
            type: Boolean,
            default: false,
            required: "Required"
        },
        activationKey: {
            type: String,
            required: "Required"
        },
        subscribed: {
            type: Date,
            required: "Required"
        }
    }
)

module.exports = SubscriberSchema;