const axios = require('axios');

const { processReadme } = require('../utils/processReadme');

const githubGetProjectsRequest = async (lang) => {
    let url, data;
    if (lang !== "en") {
        return require(`../translations/${lang}.json`);
    } else {
        url = 'https://api.github.com/users/WhereIsMyRum/repos';
    }
    try {
        const res = await axios.get(url);
        data = await res.data;
        data = data.map((repo) => {
            return {
                'id': repo.id,
                'name': repo.name,
                'description': repo.description
            }
        });
    } catch (err) {
        console.log('Retrieve all projects error', err)
        throw 500;
    }
    return data;
}

const githubGetProjectDetials = async (name, lang) => {
    const url_base = 'https://api.github.com/repos/WhereIsMyRum';
    let url, res, parsedReadme;

    if (lang !== 'en') {
        url = url_base + `/${name}/contents/README_${lang}.md`;
    } else {
        url = url_base + `/${name}/readme`;
    }

    try {
        res = await axios.get(url)
    } catch {
        try {
            url = url_base + `/${name}/readme`;
            res = await axios.get(url);
        } catch (err) {
            console.log('Project details retrieving error', err, url);
            throw 500;
        }
    }

    try {
        const data = await res.data;
        parsedReadme = await processReadme(data['content']);
        parsedReadme.title['url'] = data._links.html.match(/(https:\/\/github\.com\/WhereIsMyRum\/[0-9a-zA-Z-_]*\/)/g)[0];
    } catch (err) {
        console.log('Project details parsing error', err);
        throw 500;
    }

    return parsedReadme;
}



module.exports = {
    githubGetProjectsRequest,
    githubGetProjectDetials
}