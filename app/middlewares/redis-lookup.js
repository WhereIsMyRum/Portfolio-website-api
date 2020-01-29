const redis = require('../services/redis-service');
const { getLangFromCookie } = require('../utils/cookies');

const redisLookup = (req, res, next) => {
    if (req.originalUrl) {
        const lang = getLangFromCookie(req);
        try {
            redis.get(req.originalUrl + lang, (err, result) => {
                if (result) {
                    console.log("redis hit")
                    res.send(result);
                } else {
                    console.log("redis not hit")
                    next();
                }
            })
        } catch (err) {
            console.log(err);
            next();
        }

    } else {
        next();
    }
}

module.exports = redisLookup