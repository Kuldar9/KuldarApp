// Database service
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');

axios.defaults.httpsAgent = new https.Agent({  
  rejectUnauthorized: false // Disables SSL certificate validation
});

const app = express();
app.use(bodyParser.json());

const PORT = 25576;
const userFilePath = path.join(__dirname, 'database/User/accounts.json');
const logEntryDir = path.join(__dirname, 'database/logEntry');
const LOGGING_SERVICE_URL = 'http://90.191.79.223:25580';

const ensureDirectoryStructure = () => {
  if (!fs.existsSync(userFilePath)) {
    fs.mkdirSync(path.dirname(userFilePath), { recursive: true });
    fs.writeFileSync(userFilePath, JSON.stringify([]));
  }
  if (!fs.existsSync(logEntryDir)) {
    fs.mkdirSync(logEntryDir, { recursive: true });
  }
};
ensureDirectoryStructure();

const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

// New function to send logs to the centralized logging service
const sentLogs = [];
const sendLogToLoggingService = async (category, content) => {
  try {
    const logEntry = { category, content };
    // Check if the log entry is already sent
    if (!sentLogs.some(log => JSON.stringify(log) === JSON.stringify(logEntry) && log.category !== 'Service')) {
      await axios.post(`${LOGGING_SERVICE_URL}/log`, logEntry);
      console.log('Log sent to logging service:', logEntry);
      sentLogs.push(logEntry); // Add the log entry to the list of sent logs
    } else {
      console.log('Skipping duplicate log entry:', logEntry);
    }
  } catch (error) {
    console.error('Error sending log to logging service:', error.toJSON ? error.toJSON() : error);
  }
};

app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  const users = readJSON(userFilePath);
  if (users.some(user => user.email === email)) {
    sendLogToLoggingService("User", `Attempted to create an existing user: ${email}`);
    return res.status(400).send({ message: 'Email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword, images: [] });
  writeJSON(userFilePath, users);
  sendLogToLoggingService("User", `User created successfully: ${email}`);
  res.status(201).send({ message: 'User created successfully' });
});

app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const users = readJSON(userFilePath);
  const user = users.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    res.send({ message: 'Authenticated successfully' });
  } else {
    sendLogToLoggingService("User", `Authentication failed for email: ${email}`);
    res.status(401).send({ message: 'Authentication failed' });
  }
});

app.post('/api/save-image', (req, res) => {
  try {
    const { userInfo, imageData } = req.body;
    const { email, imageName, colorCodes } = imageData;

    // Parse userInfo JSON string to an object
    const user = JSON.parse(userInfo);

    // Log the user info received from the request
    console.log('User info received:', user);

    // Log the color codes received from the request
    console.log('Color codes received:', colorCodes);

    // Log the image data received from the request
    console.log('Image data:', imageData);

    // Check if user object is properly defined
    if (!user || !user.email) {
      console.error('User email is missing or undefined');
      return res.status(400).send({ message: 'User email is missing or undefined' });
    }

    // Extract email from user object
    const userEmail = user.email;

    // Update the user's images with the new image data
    const users = readJSON(userFilePath);
    const existingUserIndex = users.findIndex(u => u.email === userEmail);
    if (existingUserIndex !== -1) {
      const existingUser = users[existingUserIndex];
      existingUser.images.push({ imageName, colorCodes });

      // Write the updated user data to the file
      writeJSON(userFilePath, users);

      // Log and send response
      sendLogToLoggingService("Image", `Image saved successfully for user: ${userEmail}`);
      res.send({ message: 'Image saved successfully' });
    } else {
      // User not found, send appropriate response
      sendLogToLoggingService("Image", `Attempted to save image for non-existing user: ${userEmail}`);
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
app.get('/api/check-image', (req, res) => {
  const { email, imageName } = req.query;
  const users = readJSON(userFilePath);
  const user = users.find(u => u.email === email);
  const image = user?.images.find(img => img.imageName === imageName);
  if (image) {
    res.send({ exists: true, data: image });
  } else {
    res.send({ exists: false });
  }
});

app.post('/api/logs', (req, res) => {
  const { category, content } = req.body;
  sendLogToLoggingService("Log", `New log entry added to category: ${category}`);
  res.send({ message: 'Log saved successfully' });
});

app.get('/api/health', (req, res) => {
  res.status(200).send({
    status: 'OK',
    message: 'Database service is running and healthy'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Database service listening on 0.0.0.0:${PORT}`);
  sendLogToLoggingService("Service", `Database service started on port ${PORT}`);
});