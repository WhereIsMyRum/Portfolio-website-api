const { contactService, AWS } = require('../services');
const { sendSendgridRequest, validateRequest } = contactService;

const sendEmail = async (req, res, next) => {
    if (validateRequest(req.body)) {
        await sendSendgridRequest(req.body) ? res.sendStatus(200) : res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
};

module.exports = {
    sendEmail
};