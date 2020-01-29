const express = require('express');
const router = express.Router();

const { projectsController, contactController, blogController } = require('../controllers');

router.get('/projects', projectsController.getAllProjects);
router.get('/projects/:name', projectsController.getProjectDetails);

router.get('/blog/posts', blogController.getAllBlogPosts);
router.get('/blog/posts/:title', blogController.getBlogPost);
router.get('/blog/images/:postTitle/thumb', blogController.getThumbImage);
router.get('/blog/images/:postTitle/:identifier', blogController.getImage);

router.post('/contact', contactController.sendEmail);
router.options('/contact');

module.exports = {
    router
};