const { contactService, AWS } = require('../services');
const { sendSendgridRequest, validateRequest } = contactService;
const { emailingDetails } = require('../config/config');


const sendEmail = async (req, res, next) => {
    const data = req.body;
    data.recipient = emailingDetails.email.recipient;
    data.subject = `${req.body.subject} - ${req.body.name}`

    if (validateRequest(data)) {
        await sendSendgridRequest(data) ? res.sendStatus(200) : res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
};

module.exports = {
    sendEmail
};