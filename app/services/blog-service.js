const mongoose = require('./mongoose-service');
const blogPost = mongoose.model("BlogPost");
const AWS = require('./aws-service');


const getListOfBlogPosts = async () => {
    return blogPost.find({}).select('title description thumb created');
}

const getBlogPostByTitle = async (title) => {
    return blogPost.where({"title":title}).findOne({}).select('title created fullText images');
}

const getImageByIdentifier = async (postTitle, identifier) => {
    
}

module.exports = {
    getListOfBlogPosts,
    getBlogPostByTitle
}