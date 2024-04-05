const WebSocket = require('ws');
const axios = require('axios');
const wss = new WebSocket.Server({ port: 25580 }); // Assuming this is the correct initialization

const DATABASE_SERVICE_URL = 'http://0.0.0.0:25576/api/logs';

wss.on('connection', (ws) => {
    console.log('Client connected to logging service.');
    ws.on('message', (message) => {
        console.log('Log received:', message);
        // Logic to handle the message, such as saving to database
        axios.post(DATABASE_SERVICE_URL, JSON.parse(message))
            .then(() => console.log('Log saved to database successfully.'))
            .catch(error => console.error('Failed to save log to database:', error));
    });
});