const { contactService } = require('../services');
const { sendSendgridRequest, validateRequest } = contactService;

const sendEmail = async (req, res, next) => {
    if (validateRequest(req.data)) {
        sendSendgridRequest(req.body) ? res.sendStatus(200) : res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
};

module.exports = {
    sendEmail
};