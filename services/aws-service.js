const AWS = require('aws-sdk');
const { awsConfig } = require('../config/config');
AWS.config.update({region: awsConfig.aws.region});

module.exports = AWS;


