const getLangFromCookie = (req) => {
    return req.cookies.lang ? req.cookies.lang : "en";
}

module.exports = {
    getLangFromCookie
}