const redis = require('redis');

module.exports = redis.createClient('redis://cache');