const AWS = require('./aws-service');
const { emailingDetails } = require('../config/config');

const sendSendgridRequest = async (data) => {
    try {
        const params = getAWSMessage(data);
        await new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
        return true;
    } catch (err) {
        console.log(err, err.stack);
        return false;
    }
}

const validateRequest = (data) => {
    if (data.honeyname || data.honeyemail || data.honeysubject || data.honeytext) {
        return false;
    } else {
        return true;
    }
}

const getAWSMessage = (data) => {
    const params = {
        Destination: {
            CcAddresses: [],
            ToAddresses: [
                emailingDetails.email.recipient,
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: emailingDetails.email.defaultCharset,
                    Data: data.text
                },
                Text: {
                    Charset: emailingDetails.email.defaultCharset,
                    Data: ""
                }
            },
            Subject: {
                Charset: emailingDetails.email.defaultCharset,
                Data: `${data.subject} - ${data.name}`
            }
        },
        Source: emailingDetails.email.source,
        ReplyToAddresses: [data.email],
    };
    return params;
}

module.exports = {
    sendSendgridRequest,
    validateRequest
}