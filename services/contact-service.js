const axios = require('axios');
const AWS  = require('./aws-service');

const sendSendgridRequest = async (data) => {
    try {
          const params = getAWSMessage(data);
          await new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
          return true;
      } catch(err) {
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
                'polcik.piotr@gmail.com',
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: data.text
                },
                Text: {
                    Charset: "UTF-8",
                    Data: ""
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `${data.subject} - ${data.name}`
            }
        },
        Source: 'p.polcik1@gmail.com',
        ReplyToAddresses: [data.email],
    };
    return params;
}

module.exports = {
    sendSendgridRequest,
    validateRequest
}