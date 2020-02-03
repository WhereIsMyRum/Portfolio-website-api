const mongoose = require('mongoose');
const ImageSchema = require('./image');

const BlogPostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: "Required"
        },
        description: {
            type: String,
            required: "Required"
        },
        category: {
            type: String,
            required: "Required"
        },
        thumb: {
            type: ImageSchema,
            required: "Required"
        },
        created: {
            type: Date,
            required: "Required"
        },
        fullText: {
            type: String,
            required: "Required"
        },
        images: [ImageSchema],
        tags: []
    }
)

module.exports = BlogPostSchema;