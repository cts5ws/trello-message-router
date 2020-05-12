const axios = require('axios')

const trelloApiKey = process.env.TRELLO_API_KEY;
const trelloApiToken = process.env.TRELLO_API_TOKEN;
const boardId = process.env.TRELLO_BOARD_ID;

const authParams = `key=${trelloApiKey}&token=${trelloApiToken}`;
const getListsUrl = `https://api.trello.com/1/boards/${boardId}/lists?${authParams}`;

const getAddListUrl = (listName) => {
    return `https://api.trello.com/1/boards/${boardId}/lists?name=${listName}&${authParams}`;
}

const getAddCardUrl = (listId, name) => {
    return `https://api.trello.com/1/cards?idList=${listId}&name=${name}&${authParams}`;
}

const getListIdForChat = (messageInfo) => {
    const listName = messageInfo.threadName === null
        ? messageInfo.participants.join(',')
        : messageInfo.threadName;

    console.log(`Posting message: ${messageInfo.body} to ${listName}`);
    return axios.get(getListsUrl)
        .then(lists => {
            for (const list of lists.data) {
                if (list.name === listName) {
                    return list.id;
                }
            }

            return axios.post(getAddListUrl(listName))
                .then(response => response.data.id);
        });
}

const postMessageToTrello = (messageInfo) => {

    getListIdForChat(messageInfo).then(listId => {
        return axios.post(getAddCardUrl(listId, messageInfo.body));
    });

}

module.exports = {postMessageToTrello}
