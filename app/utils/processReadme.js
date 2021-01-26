const { parse } = require('node-html-parser');

const processReadme = async (content) => {
    const root = parse(Buffer.from(content, 'base64').toString('utf-8'));
    return recurseOverDoc(root.querySelector('body'), {})
}

const recurseOverDoc = (elem, data) => {
    elem.childNodes.forEach(el => {
        if (el.rawTagName) {
            if (el.rawTagName === "h1") {
                data[el.classNames[0]] = {
                    'title': el.rawText
                }
            } else if (el.rawTagName === "h3" && el.classNames[0] !== "technologies") {
                try {
                    data["sections"].push({
                        'title': el.rawText,
                        'content': ''
                    })
                } catch (err) {
                    data["sections"] = [];
                    data["sections"].push({
                        'title': el.rawText,
                        'content': ''
                    })
                }
            }
            else if (el.rawTagName === "p" || el.rawTagName === "div") {
                data['sections'][data['sections'].length - 1]['content'] = el.innerHTML
            } else if (el.rawTagName === "ul") {
                data[el.classNames[0]] = []
            } else if (el.rawTagName === "li") {
                data[el.classNames[0]].push(
                    { "content": el.rawText }
                );
            }
            if (el.attributes.hover) {
                if (Array.isArray(data[el.classNames[0]])) {
                    data[el.classNames[0]][data[el.classNames[0]].length - 1].hover = el.attributes.hover
                } else {
                    data[el.classNames[0]].hover = el.attributes.hover
                }
            }
            if (el.childNodes.length > 1) {
                data = recurseOverDoc(el, data);
            }
        };
    })
    return data;
}

module.exports = {
    processReadme
};