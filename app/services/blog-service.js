const axios = require('axios');
const { parse } = require('node-html-parser');

const mongoose = require('./mongoose-service');
const AWS = require('./aws-service');
const blogPost = mongoose.model("BlogPost");
const externalPost = mongoose.model('ExternalPost');
const { s3config } = require('../config/config');


const getListOfBlogPosts = async () => {
    return blogPost.find({published: true}).select('title description category thumb created colorScheme tags');
};

const getBlogPostThumbByTitle = async (title) => {
    return blogPost.where({"title":title}).findOne({}).select('thumb -_id');
};

const getBlogPostByTitle = async (title) => {
    return blogPost.where({"title":title}).findOne({}).select('title description thumb created fullText colorScheme images');
};

const getPostThumbImage = async (title) => {
    const thumb = await getBlogPostThumbByTitle(title);
    return getImageByIdentifier(title, thumb.thumb.identifier, thumb.thumb.extension);
};

const getImageByIdentifier = async (title, identifier, extension = null) => {
    
    if (!extension){
        const post = await getBlogPostByTitle(title);
        extension = post.images.filter(image => image.identifier === identifier)[0].extension;
    }
    extension = ('.' + extension).replace(/(\.\.)/, '\.');

    const params = {
        Bucket: s3config.bucketName,
        Key: [title, identifier + extension].join('/')
    }

    const s3 = new AWS.S3();
    return s3.getObject(params).promise();
};

const getComments = async (title, query) => {
    const post = await blogPost.where({"title":title}).findOne({}).select('comments');
    const filteredComments = filterComments(post.comments);
    if (query === undefined) {
        return {
            list: filteredComments,
            total: filteredComments.length
        };
    } else {
        const offset = query.offset ? query.offset : 0;
        const number = query.number ? query.number : filteredComments.length;

        return {
            list: filteredComments.slice(offset, parseInt(number) + parseInt(offset)),
            total: filteredComments.length
        }
    }
    
};

const getExternalPosts = async () => {
    const externalPosts = await externalPost.find({active: true}).select('url added, defaults');
    return parsedPosts = await Promise.all(externalPosts.map(fetchExternalPost));
};


const postComment = async (data, title) => {
    let post = await blogPost.where({"title": title}).findOne({});
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
};



const filterComments = (comments) => {
    return comments.filter(comment => {
        if (comment.isApproved) {
            return comments;
        }
    })
};

const validate = (data) => {
    if (data.honeynick || data.honeytext) {
        return false;
    }
    return true;
};

const fetchExternalPost = async (post) => {
    const res = await axios.get(post.url);
    return scrapeExternalPost(res.data, post)
}

const scrapeExternalPost = async (content, post) => {
    return new Promise((resolve, reject) => {
        const parsedContent = parse(content);

        let [ ogTitle, ogDescription, ogImage ] = [
            parsedContent.querySelector("[property='og:title']"),
            parsedContent.querySelector("[property='og:description']"),
            parsedContent.querySelector("[property='og:image']")
        ]

        ogTitle = ogTitle ? ogTitle.getAttribute('content') : parsedContent.querySelector('title').textContent;
        ogDescription = ogDescription ? ogDescription.getAttribute('content') : parsedContent.querySelector("[name='description']").getAttribute('content');

        let og = {
            url: post.url,
            title: ogTitle ? ogTitle : '',
            description: ogDescription ? ogDescription : '',
            image: ogImage ? ogImage.getAttribute('content') : ''

        }

        resolve(injectWithDefaults(og, post));
    })
}

const injectWithDefaults = (og, post) => {
    Object.keys(og).forEach((key) => {
        og[key] = og[key] ? og[key] : post.defaults[key];
    })

    return og
}



module.exports = {
    getListOfBlogPosts,
    getBlogPostByTitle,
    getImageByIdentifier,
    getPostThumbImage,
    getComments,
    getExternalPosts,
    postComment,
    validate
}