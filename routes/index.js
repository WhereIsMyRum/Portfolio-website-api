const express = require('express');
const cors = require('cors')
const router = express.Router();
const { projectsController, contactController } = require('../controllers');

const corsSettings = {
    origin: 'http://frontend.docker'
}
router.get('/projects', cors(), projectsController.getAllProjects);
router.get('/projects/:name', cors(), projectsController.getProjectDetails )
router.post('/contact', cors(corsSettings), contactController.sendEmail )
router.options('/contact', cors(corsSettings));

module.exports = { 
    router
};