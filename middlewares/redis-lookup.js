const redis = require('../services/redis-service');

const redisLookup = (req, res, next) => {
    if (req.originalUrl) {
        try {
            redis.get(req.originalUrl, (err, result) => {
                if (result) {
                    res.send(result);
                } else {
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