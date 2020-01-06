const axios = require('axios');
const { processReadme } = require('../utils/processReadme');

const githubGetProjectsRequest = async () => {
    const res = await axios.get('http://api.github.com/users/WhereIsMyRum/repos');
    let data = await res.data;
    data = data.map((repo) => {
        return {
            'id': repo.id,
            'name': repo.name,
            'description': repo.description
        }
    });
    
    return data;
}

const githubGetProjectDetials = async (name) => {
    const res = await axios.get(`http://api.github.com/repos/WhereIsMyRum/${name}/readme`);
    const data = await res.data;
    const parsedReadme = await processReadme(data['content']);
    parsedReadme.title['url'] = data._links.html.match(/(https:\/\/github\.com\/WhereIsMyRum\/[0-9a-zA-Z-_]*\/)/g)[0];
    return parsedReadme;
}



module.exports = {
    githubGetProjectsRequest,
    githubGetProjectDetials
}