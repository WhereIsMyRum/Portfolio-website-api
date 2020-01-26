const { blogService } = require('../services');
const { getListOfBlogPosts, getBlogPostByTitle, getImageByIdentifier } = blogService

const getAllBlogPosts = async (req, res, next) => {
    try {
        const blogPostsList = await getListOfBlogPosts();
        return res.send(blogPostsList);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const getBlogPost = async (req, res, next) => {
    try {
        const blogPost = await getBlogPostByTitle(req.params.title);
        return res.send(blogPost);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const getImage = async (req, res, next) => {
    try {
        const image = await getImageByIdentifier(req.params.postTitle, req.params.identifier);
        return res.send(image);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = {
    getAllBlogPosts,
    getBlogPost,
    getImage
};