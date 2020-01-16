const { githubService, redis } = require('../services');
const { githubGetProjectsRequest, githubGetProjectDetials } = githubService;

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

const getLangFromCookie = (req) => {
    return req.cookies.lang ? req.cookies.lang : "en";
}

module.exports = {
    getAllProjects,
    getProjectDetails
};