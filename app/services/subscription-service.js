const mongoose = require('./mongoose-service');
const md5 = require('md5')
const subscriber = mongoose.model('Subscriber')


const validateRequest = async (data) => {
    const validationObject = {
        subscriber: await filterSubscribers({'email': data.email}),
        valid: false
    }
    // check if email is unique
    if (data.honey || validationObject.subscriber) {
        return validationObject;
    }
    validationObject.valid = true;
    return validationObject;
};

const generateActivationKey = (data) => {
    return md5(data.email + new Date().toLocaleString() + Math.floor(Math.random() * 1000000).toString());
};

const filterSubscribers = async (filter) => {
    return await subscriber.where(filter).findOne({})
};

const createSubscriber = async (data) => {
    try {
        return await subscriber.create({
            email: data.email,
            activationKey: generateActivationKey(data),
            subscribed: new Date().toLocaleString()
        })
    } catch(error) {
        console.log(error);
        return false;
    }
};

const getEmailActivationLink = (subscriber) => {
    return `${process.env.ROOT_URL}/blog/activate?email=${subscriber.email}&key=${subscriber.activationKey}`
};

const getEmailActivationText = (subscriber) => {
    return `Hi!<br />
    Thanks for subscribing to my blog!<br />
    To finalize the process and receive updates on new blog posts, you need to activate your email by clicking the following link:<br/>
    ${getEmailActivationLink(subscriber)}<br/>
    Thanks and have a good day!`
};

const getConfirmationEmailData = (subscriber) => {
    return {
        recipient: subscriber.email,
        text: getEmailActivationText(subscriber),
        subject: "Wee Bit Dev blog subscription activation",
        email: 'noreply@piotrpolcik.pl'
    }
};

const activateEmail = async (data) => {
    const subscriberInstance = await filterSubscribers({'email': data.email, 'activationKey': data.key})
    if (subscriberInstance) {
        subscriberInstance.isActive = true;
        subscriberInstance.save();
        return true
    }
    return false;
}

module.exports = {
    validateRequest,
    createSubscriber,
    getConfirmationEmailData,
    activateEmail
}