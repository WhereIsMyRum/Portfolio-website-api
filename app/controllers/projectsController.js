const { githubService, redis } = require('../services');
const { githubGetProjectsRequest, githubGetProjectDetials } = githubService;
const { getLangFromCookie } = require('../utils/cookies');

const getAllProjects = async (req, res, next) => {
    try {
        const lang = getLangFromCookie(req);
        const data = await githubGetProjectsRequest(lang);
        if (req.originalUrl) {
            redis.setex(req.originalUrl + lang, 172800, JSON.stringify(data))
        }
        res.send(data);
    } catch (err) {
        console.log("Status: ", err);
        res.sendStatus(500);
    }
};

const getProjectDetails = async (req, res, next) => {
    try {
        const lang = getLangFromCookie(req);
        const data = await githubGetProjectDetials(req.params.name, lang);
        if (req.originalUrl) { 
            redis.setex(req.originalUrl + lang, 172800, JSON.stringify(data))
        }
        res.send(data);
    } catch (err) {
        console.log("Status: ", err);
        res.sendStatus(500);
    }
}


module.exports = {
    getAllProjects,
    getProjectDetails
};