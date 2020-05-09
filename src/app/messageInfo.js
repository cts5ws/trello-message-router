module.exports = class MessageInfo {
    constructor(api) {
        this.api = api;
    }

    threadInfoPromise = (message) => {
        const body = message.body;
        return new Promise(
            ((resolve, reject) => {
                this.api.getThreadInfo(message.threadID,
                    (err, info) => {
                        if (err) reject(err);
                        resolve({body, info});
                    });
            })
        );
    }

    participantInfoPromise = (messageInfo) => {
        const threadInfo = messageInfo.info;
        const body = messageInfo.body;

        const threadName = threadInfo.threadName;

        const participantIds = threadInfo.participantIDs.filter(id => id !== this.api.getCurrentUserID());
        return new Promise(
            ((resolve, reject) => {
                this.api.getUserInfo(participantIds,
                    (err, info) => {
                        if (err) reject(err);

                        let participants = Object.keys(info)
                            .map(participantId => info[participantId].name);

                        resolve({body, threadName, participants})
                    });
            })
        );
    }

    getMessageInfo = (message) => {
        return this.threadInfoPromise(message)
            .then(this.participantInfoPromise)
            .catch(error => {
                console.error(error);
            });
    }
}
