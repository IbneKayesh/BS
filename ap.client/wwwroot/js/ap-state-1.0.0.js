//app key
const AP_STATE_USER_ID = 'AP_STATE_USER_ID';
const AP_STATE_API_AUTH_TOKEN = 'AP_STATE_API_AUTH_TOKEN';
const AP_STATE_API_BASE_URL = 'AP_STATE_API_BASE_URL';

const AP_STATE_USER = '';
const AP_STATE_URLS = '';

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