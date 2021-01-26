const { parse } = require('node-html-parser');

const processReadme = async (content) => {
    const root = parse(Buffer.from(content, 'base64').toString('utf-8'));
    return recurseOverDoc(root.querySelector('body'), {})
}

const recurseOverDoc = (elem, data) => {
    elem.childNodes.forEach(el => {
        if (el.tagName) {
            data[el.attributes.class] = [];
            if (el.tagName === "h1") {
                data[el.attributes.class] = {
                    'title': el.rawText
                }
            } else if (el.tagName === "h3" && el.attributes.class !== "technologies") {
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
            else if (el.tagName === "p" || el.tagName === "div") {
                data['sections'][data['sections'].length - 1]['content'] = el.innerHTML
            } else if (el.tagName === "ul") {
                data[el.attributes.class] = []
            } else if (el.tagName === "li") {
                data[el.attributes.class].push(
                    { "content": el.rawText }
                );
            }
            if (el.attributes.hover) {
                if (Array.isArray(data[el.attributes.class])) {
                    const index = data[el.attributes.class].length - 1 >= 0 ? data[el.attributes.class].length - 1 : 0;
                    data[el.attributes.class][data[el.attributes.class].length - 1].hover = el.attributes.hover;
                } else {
                    data[el.attributes.class].hover = el.attributes.hover;
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