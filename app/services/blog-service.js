const mongoose = require('./mongoose-service');
const blogPost = mongoose.model("BlogPost");
const AWS = require('./aws-service');
const { s3config } = require('../config/config');


const getListOfBlogPosts = async () => {
    return blogPost.find({}).select('title description thumb created');
}

const getBlogPostThumbByTitle = async (title) => {
    return blogPost.where({"title":title}).findOne({}).select('thumb -_id');
}

const getBlogPostByTitle = async (title) => {
    return blogPost.where({"title":title}).findOne({}).select('title created fullText images');
}

const getPostThumbImage = async (title) => {
    const thumb = await getBlogPostThumbByTitle(title);
    return getImageByIdentifier(title, thumb.thumb.identifier, thumb.thumb.extension);
}

const getImageByIdentifier = async (title, identifier, extension = null) => {
    const post = await getBlogPostByTitle(title);
    extension = extension ? extension : post.images.filter(image => image.identifier === identifier)[0].extension;
    const params = {
        Bucket: s3config.bucketName,
        Key: [title, identifier + extension].join('/')
    }

    const s3 = new AWS.S3();

    return s3.getObject(params).promise();
}

module.exports = {
    getListOfBlogPosts,
    getBlogPostByTitle,
    getImageByIdentifier,
    getPostThumbImage
}