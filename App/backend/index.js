// backend/index.js

const axios = require('axios');

// Define the URL of your server backend
const SERVER_URL = 'http://your-server-backend-url';

// Function to make a request to the server backend
async function fetchDataFromServer() {
    try {
        const response = await axios.get(`${SERVER_URL}/api/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from server:', error);
        throw error;
    }
}

// Function to send data to the server backend
async function sendDataToServer(data) {
    try {
        const response = await axios.post(`${SERVER_URL}/api/send`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending data to server:', error);
        throw error;
    }
}

module.exports = {
    fetchDataFromServer,
    sendDataToServer
};