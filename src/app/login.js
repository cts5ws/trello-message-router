const fs = require("fs");
const login = require("facebook-chat-api");

const credentials = {email: process.env.FB_USERNAME, password: process.env.FB_PASSWORD};
const appStateLocation = './config/appstate.json';

const loginWithCredentials = () => {
    return new Promise(
        (resolve, reject) => {
            login(
                credentials,
                (err, api) => {
                    if (err) reject(err);

                    fs.writeFileSync(appStateLocation, JSON.stringify(api.getAppState()));
                    resolve()
                });
        }
    );
}

const loginFromAppState = (callback) => login(
    {appState: JSON.parse(fs.readFileSync(appStateLocation, 'utf8'))},
    (err, api) => {
        callback(err, api);
    });

const loginWithCallback = (callback) => {

    try {
        loginFromAppState(callback);
    } catch (err) {
        console.error('Unable to login with appstate.json', err);

        console.log('Attempting to login with credentials');
        loginWithCredentials().then(() => {
            console.log('Retrying login using new appstate.json');
            loginFromAppState(callback)
        });
    }
}

module.exports = {loginWithCallback}
