const { githubService, redis } = require('../services');
const { githubGetProjectsRequest, githubGetProjectDetials } = githubService;

const getAllProjects = async (req, res, next) => {
    try {
        const data = await githubGetProjectsRequest();
        if (req.originalUrl) {
            redis.setex(req.originalUrl, 3600, JSON.stringify(data))
        }
        res.send(data);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
};

const getProjectDetails = async (req, res, next) => {
    try {
        const data = await githubGetProjectDetials(req.params.name);
        if (req.originalUrl) {
            redis.setex(req.originalUrl, 3600, JSON.stringify(data))
        }
        res.send(data);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllProjects,
    getProjectDetails
};