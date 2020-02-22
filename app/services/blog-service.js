const mongoose = require('./mongoose-service');
const blogPost = mongoose.model("BlogPost");
const AWS = require('./aws-service');
const { s3config } = require('../config/config');


const getListOfBlogPosts = async () => {
    return blogPost.find({}).select('title description category thumb created colorScheme tags');
}

const getBlogPostThumbByTitle = async (title) => {
    return blogPost.where({"title":title}).findOne({}).select('thumb -_id');
}

const getBlogPostByTitle = async (title) => {
    const post = await blogPost.where({"title":title}).findOne({}).select('title thumb created fullText colorScheme images comments');
    post.comments = filterComments(post.comments);
    return post;
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
};


const postComment = async (data, postTitle) => {
    let post = await blogPost.where({"title": postTitle}).findOne({});
    const newComment = {
        nick: data.nick ? data.nick : 'Anonymous',
        text: data.text,
        date: new Date().toLocaleString(),
        isApproved: false
    }
    post.comments = [...post.comments, newComment];
    post.comments.sort((a,b) => new Date(b.date) - new Date(a.date));
    post.save();
    return filterComments(post.comments);
}

const filterComments = (comments) => {
    return comments.filter(comment => {
        if (comment.isApproved) {
            return comments;
        }
    })
}

const validate = (data) => {
    if (data.honeynick || data.honeytext) {
        return false;
    }

    return true;
};



module.exports = {
    getListOfBlogPosts,
    getBlogPostByTitle,
    getImageByIdentifier,
    getPostThumbImage,
    postComment,
    validate
}