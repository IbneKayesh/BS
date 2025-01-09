// app key
const AP_STATE_USER_LOGIN_STATE = 'USER_LOGIN_STATE';
const AP_STATE_API_AUTH_TOKEN = 'API_AUTH_TOKEN';
const AP_STATE_API_AUTH_APP_TOKEN = '';
const AP_STATE_API_BASE_URL = 'http://localhost:5117/api/Xecute/v1';

const APState = {

    GlobalSet: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    GlobalGet: function (key) {
        return localStorage.getItem(key);
    },

    GlobalGetValue: function (key) {
        return localStorage.getItem(key)?.replace(/"/g, "");
    },

    GlobalRemove: function (key) {
        localStorage.removeItem(key);
    }
}