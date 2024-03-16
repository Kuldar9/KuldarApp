const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./models/routes/userRoutes');

// Import the script to start MongoDB server
require('./scripts/startMongoDB');

const app = express();
const PORT = process.env.PORT || 25575; // Set port to necessary port

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/myapp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes); // This line should be placed after app is declared

// Default route
app.get('/', (req, res) => {
    res.send('Backend Server is running');
});

// Start the server on 0.0.0.0:25575
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Server is listening on port ${PORT}`);
});