const getUrls = require('get-urls');
const MessageInfo = require('./app/messageInfo');
const {postMessageToTrello} = require('./app/telloClient');
const {loginWithCallback} = require('./app/login')

const listenForMessages = (err, api) => {
    if (err) throw(err);

    const messageInfo = new MessageInfo(api);

    api.listenMqtt((err, message) => {
        if (err) return console.log(err);

        if (message.type === 'message' && getUrls(message.body).size > 0) {
            messageInfo
                .getMessageInfo(message)
                .then(postMessageToTrello);
        }
    });
}

loginWithCallback(listenForMessages);
