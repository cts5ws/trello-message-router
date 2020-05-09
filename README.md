# trello-message-router
<a href="https://hub.docker.com/r/schafercole24/trello-message-router">
    <img src="https://img.shields.io/docker/cloud/automated/schafercole24/trello-message-router?style=plastic" alt="Docker Cloud Automated build">
    <img src="https://img.shields.io/docker/cloud/build/schafercole24/trello-message-router?style=plastic" alt="Docker Cloud Build Status">
</a>

Never miss a great article again! Forward Messenger messages with links to a Trello board. 

### Configuration

The application expects the following environment variables:
 - FB_USERNAME: Facebook username
 - FB_PASSWORD: Facebook password
 - TRELLO_API_KEY: Trello API Key
 - TRELLO_API_TOKEN: Trello API Token
 - TRELLO_BOARD_ID: ID of the Trello board you want links added to
 
Instructions to generates Trello API Key and Token can be found [here](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/).

The Trello boardID can be found in the url of the Trello board you wish to add messages to.

### Dependencies
[facebook-chat-api](https://github.com/Schmavery/facebook-chat-api) is used to consume messages from Messenger. See their disclaimer:

_Disclaimer_: We are not responsible if your account gets banned for spammy activities such as sending lots of messages to people you don't know, sending messages very quickly, sending spammy looking URLs, logging in and out very quickly... Be responsible Facebook citizens.

Urls are identified using [get-urls](https://www.npmjs.com/package/get-urls).

### Deployment

##### Build It Yourself
 - Add file `config.env` to folder `config` at the root level of the repo
 - `bash run.sh` to start the message listener

##### Use the Docker Image
 - Pull the docker image: `docker pull schafercole24/trello-message-router`
 - Provide required environment variables however you like.

### Example Usage
##### Message Sent with Link
<img src="https://user-images.githubusercontent.com/9439778/81478920-4c812f00-91ee-11ea-8169-2baab1c6a5a0.jpeg" alt="Messenger Chat" width="250" height="500">


##### Message Posted to Trello
<img src="https://user-images.githubusercontent.com/9439778/81478923-4f7c1f80-91ee-11ea-8ac1-30aceb26e9f6.jpeg" alt="Trello Board" width="300" height="300">
