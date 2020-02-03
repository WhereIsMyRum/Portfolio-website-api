const { blogService } = require('../services');


const getAllBlogPosts = async (req, res, next) => {
    try {
        const blogPostsList = await blogService.getListOfBlogPosts();
        return res.send(blogPostsList);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const getBlogPost = async (req, res, next) => {
    try {
        const blogPost = await blogService.getBlogPostByTitle(req.params.title);
        return res.send(blogPost);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const getImage = async (req, res, next) => {
    try {
        const image = await blogService.getImageByIdentifier(req.params.postTitle, req.params.identifier);
        return res.send(image.Body);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const getThumbImage = async (req, res, next) => {
    try {
        const image = await blogService.getPostThumbImage(req.params.postTitle);
        return res.send(image.Body);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = {
    getAllBlogPosts,
    getBlogPost,
    getImage,
    getThumbImage
};