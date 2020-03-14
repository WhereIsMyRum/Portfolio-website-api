const { blogService, subscriptionService } = require('../services');
const { sendSendgridRequest } = require('../services/contact-service');


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
        if (blogPost) {
            return res.send(blogPost);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const getImage = async (req, res, next) => {
    try {
        const image = await blogService.getImageByIdentifier(req.params.postTitle, req.params.identifier);
        return res.send(image.Body);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const getThumbImage = async (req, res, next) => {
    try {
        const image = await blogService.getPostThumbImage(req.params.postTitle);
        return res.send(image.Body);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const postSubscribe = async (req, res, next) => {
    try {
        const validatedObject = await subscriptionService.validateRequest(req.body);
        if (validatedObject.valid) {
            const subscriber = await subscriptionService.createSubscriber(req.body);
            if (subscriber) {
                console.log("sending sendgrid request");
                const confirmationEmailData = subscriptionService.getConfirmationEmailData(subscriber)
                sendSendgridRequest(confirmationEmailData);
                return res.sendStatus(200);
            } else {
                return res.sendStatus(500)
            }
        } else {
            if (validatedObject.subscriber) {
                if (validatedObject.subscriber.isActive) {
                    return res.sendStatus(304);
                } else {
                    const confirmationEmailData = subscriptionService.getConfirmationEmailData(validatedObject.subscriber)
                    sendSendgridRequest(confirmationEmailData);
                    return res.sendStatus(200);
                }
            } else {
                return res.sendStatus(200);
            }
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

const postComment = async (req, res, next) => {
    try {
        if (blogService.validate(req.body)) {
            const comments = await blogService.postComment(req.body, req.params.postTitle);
            res.send(comments);
        } else {
            return res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const patchActivate = async (req, res, next) => {
    try {
        if(await subscriptionService.activateEmail(req.body)) {
            return res.sendStatus(200);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};


module.exports = {
    getAllBlogPosts,
    getBlogPost,
    getImage,
    getThumbImage,
    postSubscribe,
    patchActivate,
    postComment
};