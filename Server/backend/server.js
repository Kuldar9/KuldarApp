// Server.js for starting the server
/*
    Just open git bash in the same folder as server.js
    run server: node ./server.js
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./models/routes/userRoutes');

// Import the script to start MongoDB server
const { mongoDBDataDir } = require('./scripts/startMongoDB');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 25575;

// Create a writable stream to log to a file
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database1')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    });

// Middleware to log requests
app.use((req, res, next) => {
    const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
    logStream.write(logEntry + '\n');
    console.log(logEntry);
    next();
});

app.use(bodyParser.json());

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Backend Server is running');
});

app.post('/api/sendMessage', async (req, res) => {
    try {
        const { message } = req.body;
        // Log the received message
        console.log('Received message from client:', message);
        // Return a success response
        res.send({ message: 'Message received successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/fetchMessages', async (req, res) => {
    try {
        // Here you can fetch messages from the database
        // Replace this with actual database operation
        const messages = ['Message 1', 'Message 2', 'Message 3']; // Example messages
        res.json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Server is listening on port ${PORT}`);
});