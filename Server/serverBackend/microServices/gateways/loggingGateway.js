// Logging Gateway
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');

axios.defaults.httpsAgent = new https.Agent({  
  rejectUnauthorized: false // Disables SSL certificate validation
});

const app = express();
app.use(bodyParser.json());

const PORT = 25580;
const DATABASE_SERVICE_URL = 'http://90.191.79.223:25576/api/logs';

app.post('/log', async (req, res) => {
  try {
    // Forward the log to the database service
    const response = await axios.post(DATABASE_SERVICE_URL, req.body);
    console.log('Log forwarded to database service:', req.body);
    res.send(response.data);
  } catch (error) {
    console.error('Failed to forward log:', error);
    res.status(500).send({ message: 'Failed to forward log to database service' });
  }
});

app.listen(PORT, '0.0.0.0', () => console.log(`Logging Gateway listening on 0.0.0.0:${PORT}`));