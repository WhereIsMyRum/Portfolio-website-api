const mongoose = require('mongoose');

const ColorsSchema = new mongoose.Schema({
        paragraph: {
            type: String,
        },
        header: {
            type: String,
        },
        standOut: {
            type: String,
        },
        background: {
            type: String,
        }
    },
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret._id;
            }
        }
    }
)

module.exports = ColorsSchema;