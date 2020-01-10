const express = require('express');
const router = express.Router();

const { projectsController, contactController } = require('../controllers');

router.get('/projects', projectsController.getAllProjects);
router.get('/projects/:name', projectsController.getProjectDetails)
router.post('/contact', contactController.sendEmail)
router.options('/contact');

module.exports = {
    router
};