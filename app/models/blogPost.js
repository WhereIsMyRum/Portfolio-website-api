const mongoose = require('mongoose');
const ImageSchema = require('./image');
const ColorsSchema = require('./colors');
const CommentSchema = require('./comment');

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
        colorScheme: {
            type: ColorsSchema
        },
        images: [ImageSchema],
        tags: [],
        comments: [CommentSchema]
    }
)

module.exports = BlogPostSchema;