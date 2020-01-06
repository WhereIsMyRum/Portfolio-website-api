const axios = require('axios');
const { processReadme } = require('../utils/processReadme');

const sendSendgridRequest = async (data) => {
    console.log(data);
}

const validateRequest = async (data) => {
    return true
}


module.exports = {
    sendSendgridRequest,
    validateRequest
}