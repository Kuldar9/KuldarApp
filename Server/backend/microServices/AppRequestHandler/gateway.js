const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 25575;

const DATABASE_SERVICE = 'http://0.0.0.0:25576';
const IMAGE_PROCESSING_SERVICE = 'http://0.0.0.0:25577';

const ws = new WebSocket('ws://0.0.0.0:25580');

ws.on('open', () => {
    console.log('Connected to WebSocket for logging.');
});

function logMessage(category, content) {
    if (ws.readyState === WebSocket.OPEN) {
        const message = { category, content };
        ws.send(JSON.stringify(message));
    }
}

const POLL_INTERVAL = 1000;
const MAX_POLL_ATTEMPTS = 30;

async function pollForProcessedData(imageName, attempts = 0) {
    if (attempts >= MAX_POLL_ATTEMPTS) {
        throw new Error('Max polling attempts reached, image data might not be available yet.');
    }
    try {
        const { data } = await axios.get(`${DATABASE_SERVICE}/api/images/${imageName}`);
        if (data && data.exists) {
            return data;
        }
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
        return pollForProcessedData(imageName, attempts + 1);
    } catch (error) {
        console.error(`Error polling for processed image data: ${error.message}`);
        throw error;
    }
}

app.use('/api/process-image', async (req, res, next) => {
    const { imageName } = req.body;
    try {
        // Forward the request to the image processing service
        await axios.post(`${IMAGE_PROCESSING_SERVICE}/api/process-image`, { imageName });
        logMessage('ServerRequest', `Processing request sent for image: ${imageName}`);
        const processedData = await pollForProcessedData(imageName);
        res.json({ message: 'Image processed and data retrieved successfully', data: processedData });
    } catch (error) {
        logMessage('ServerError', `Error processing image ${imageName}: ${error.message}`);
        res.status(500).send({ message: 'Error processing image', error: error.message });
    }
});

// Proxy other routes to the database service
app.use('/api/users', createProxyMiddleware({ target: DATABASE_SERVICE, changeOrigin: true }));
// Add more proxy routes as needed

app.listen(PORT, () => {
    console.log(`Gateway server running on port ${PORT}`);
});