const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false // Disables SSL certificate validation - use with caution
});

const PORT = 25575;
const DATABASE_SERVICE_URL = 'http://90.191.79.223:25576';
const IMAGE_PROCESSING_SERVICE_URL = 'http://90.191.79.223:25577';
const LOGGING_SERVICE_URL = 'http://90.191.79.223:25580';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Function to send logs to the logging service
const sendLogToLoggingService = async (category, message) => {
  const logData = { category, message };
  try {
    await axios.post(`${LOGGING_SERVICE_URL}/log`, logData);
    console.log('Log sent to logging service:', logData);
  } catch (error) {
    console.error('Error forwarding log to logging service:', error.toJSON ? error.toJSON() : error);
  }
};

// Service readiness checks
const checkServiceReadiness = async (url, serviceName) => {
  try {
    await axios.get(`${url}/api/health`);
    console.log(`${serviceName} service is up.`);
    sendLogToLoggingService("Info", `${serviceName} service is up.`);
  } catch (error) {
    console.log(`Waiting for ${serviceName} service... Error: ${error.message}`);
    setTimeout(() => checkServiceReadiness(url, serviceName), 5000);
  }
};

// User creation endpoint
app.post('/api/users', async (req, res) => {
  try {
    const response = await axios.post(`${DATABASE_SERVICE_URL}/api/users`, req.body);
    res.json(response.data);
    sendLogToLoggingService("User", "User created successfully");
  } catch (error) {
    sendLogToLoggingService("Error", `Error creating user: ${error.response ? error.response.data : error.message}`);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// User authentication endpoint
app.post('/api/auth', async (req, res) => {
  try {
    const response = await axios.post(`${DATABASE_SERVICE_URL}/api/auth`, req.body);
    res.json(response.data);
    sendLogToLoggingService("Auth", "User authenticated successfully");
  } catch (error) {
    sendLogToLoggingService("Error", `Authentication error: ${error.response ? error.response.data : error.message}`);
    res.status(500).json({ error: 'Authentication error' });
  }
});

// Image processing with polling
const pollForImageColorCodes = async (email, imageName, res) => {
  const maxAttempts = 20;
  let attempts = 0;
  const poll = async () => {
    try {
      const response = await axios.get(`${DATABASE_SERVICE_URL}/api/check-image`, { params: { email, imageName } });
      if (response.data.exists && response.data.data.colorCodes) {
        res.json({ message: "Image processed", data: response.data.data });
        sendLogToLoggingService("Image", `Image processed successfully: ${imageName}`);
      } else if (attempts < maxAttempts) {
        setTimeout(poll, 2000);
        attempts++;
      } else {
        throw new Error('Image processing timeout');
      }
    } catch (error) {
      sendLogToLoggingService("Error", `Polling error for image color codes: ${error.message}`);
      res.status(500).send({ error: 'Error retrieving processed image' });
    }
  };
  poll();
};

// Endpoint to receive and process an image
app.post('/api/image', upload.single('image'), async (req, res) => {
  const { email } = req.body;
  const imageName = req.file.originalname;

  try {
    const imageCheckResponse = await axios.get(`${DATABASE_SERVICE_URL}/api/check-image`, { params: { email, imageName } });
    if (imageCheckResponse.data.exists) {
      res.json({ message: "Image already processed", data: imageCheckResponse.data.data });
      sendLogToLoggingService("Image", `Attempt to re-upload existing image: ${imageName}`);
    } else {
      // Here, adjust based on how your image processing service expects to receive the image
      await axios.post(`${IMAGE_PROCESSING_SERVICE_URL}/api/process-image`, {
        email,
        imageName,
        imagePath: req.file.path
      });
      pollForImageColorCodes(email, imageName, res);
    }
  } catch (error) {
    sendLogToLoggingService("Error", `Error processing image request: ${error.message}`);
    res.status(500).send({ error: 'Error processing image request' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`App Gateway server running on 0.0.0.0:${PORT}`);
  checkServiceReadiness(DATABASE_SERVICE_URL, 'database');
  checkServiceReadiness(IMAGE_PROCESSING_SERVICE_URL, 'imageProcessing');
});