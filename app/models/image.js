const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
        identifier: {
            type: String,
            required: "Required",
        },
        url: {
            type: String,
            required: "Required"
        },
        description: {
            type: String,
            required: "Required"
        },
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret._id;
            }
        }
    }
)

module.exports = ImageSchema;