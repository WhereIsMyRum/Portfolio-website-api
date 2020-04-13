const express = require('express');
const router = express.Router();

const { projectsController, contactController, blogController } = require('../controllers');

router.get('/projects', projectsController.getAllProjects);
router.get('/projects/:name', projectsController.getProjectDetails);

router.get('/blog/external-posts', blogController.getExternalPosts);
router.get('/blog/posts', blogController.getAllBlogPosts);
router.get('/blog/posts/:title', blogController.getBlogPost);
router.get('/blog/posts/:title/comments', blogController.getComments);
router.get('/blog/images/:title/thumb', blogController.getThumbImage);
router.get('/blog/images/:title/:identifier', blogController.getImage);

router.post('/blog/subscribe', blogController.postSubscribe);
router.post('/blog/posts/:title/comments', blogController.postComment);

router.patch('/blog/activate', blogController.patchActivate);

router.post('/contact', contactController.sendEmail);
router.options('/contact');

module.exports = {
    router
};