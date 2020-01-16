const axios = require('axios');

const { processReadme } = require('../utils/processReadme');

const githubGetProjectsRequest = async (lang) => {
    let url;
    if (lang !== "en") {
        return require(`../translations/${lang}.json`);
    } else {
        url = 'https://api.github.com/users/WhereIsMyRum/repos';
    }
    const res = await axios.get(url);
    if (res.status != 200) {
        throw res.status;
    }
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

const githubGetProjectDetials = async (name, lang) => {
    let url;
    if (lang !== "en") {
        url = `https://api.github.com/repos/WhereIsMyRum/${name}/contents/README_${lang}.md`;
    } else {
        url = `https://api.github.com/repos/WhereIsMyRum/${name}/readme`;
    }
    const res = await axios.get(url)
    if (res.status != 200) {
        throw res.status;
    }
    const data = await res.data;
    const parsedReadme = await processReadme(data['content']);
    parsedReadme.title['url'] = data._links.html.match(/(https:\/\/github\.com\/WhereIsMyRum\/[0-9a-zA-Z-_]*\/)/g)[0];
    return parsedReadme;
}



module.exports = {
    githubGetProjectsRequest,
    githubGetProjectDetials
}