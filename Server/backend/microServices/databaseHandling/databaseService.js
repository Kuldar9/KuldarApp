// databaseService.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
const { saveImageData, checkImageData, fetchAllImages, createUser, authenticateUser, logEvent } = require('./databaseHandler');

// Connecting with logging service "websocket-service.js"
const ws = new WebSocket('ws://0.0.0.0:25580'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 25576;

// WebSocket opens
ws.on('open', () => {
    console.log('Connected to WebSocket service.');
    logEvent("ServerConnections", "DatabaseService started"); // Using logEvent directly
});

function logger(message) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    } else {
        console.log('WebSocket is not connected:', message);
        // adding more logging in the future
    }
}

// Logging operations
app.post('/api/logs', async (req, res) => {
    const { category, content } = req.body;
    try {
        await logEvent(category, content);
        res.status(201).send({ message: "Log saved successfully." });
    } catch (error) {
        console.error("Failed to save log:", error);
        res.status(500).send({ message: "Failed to save log." });
    }
});

// Image operations
app.get('/api/check-image/:imageName', async (req, res) => {
    const { imageName } = req.params;
    const result = await checkImageData(imageName);
    res.json(result);
  });

app.post('/api/images', async (req, res) => {
    await saveImageData(req.body.imageName, req.body.colorCodes, logger);
    res.status(201).send({ message: "Image data processed." });
});

app.get('/api/images', async (req, res) => {
    const images = await fetchAllImages(logger);
    res.status(200).json(images);
});

// User operations
app.post('/api/users', async (req, res) => {
    const { email, password } = req.body;
    const result = await createUser(email, password, logger);
    if (result.success) {
        res.status(201).send({ message: "User created successfully." });
    } else {
        res.status(400).json({ error: result.error });
    }
});

app.post('/api/auth', async (req, res) => {
    const { email, password } = req.body;
    const result = await authenticateUser(email, password, logger);
    if (result.success) {
        res.status(200).json({ message: "User authenticated successfully.", user: result.user });
    } else {
        res.status(401).json({ error: result.error });
    }
});

app.listen(PORT, () => {
    console.log(`Database service listening on port ${PORT}`);
    // Optionally log server start directly if WebSocket might not be ready
});