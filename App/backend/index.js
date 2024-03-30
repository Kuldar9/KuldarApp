// index.js
const axios = require('axios');

const SERVER_URL = 'http://90.191.79.223:25575'; // Update with your server URL

const sendMessageToServer = async (message) => {
    try {
        await axios.post(`${SERVER_URL}/api/sendMessage`, { message });
    } catch (error) {
        console.error('Error sending message to server:', error);
        throw error;
    }
};

const fetchMessagesFromServer = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/fetchMessages`);
        return response.data.messages;
    } catch (error) {
        console.error('Error fetching messages from server:', error);
        throw error;
    }
};

module.exports = {
    sendMessageToServer,
    fetchMessagesFromServer
};