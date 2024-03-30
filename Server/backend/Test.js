const axios = require('axios');

const serverUrl = 'http://localhost:25575';
const data = {
  message: 'Hello from the client!'
};

axios.post(`${serverUrl}/api/sendMessage`, data)
  .then(response => {
    console.log('Message sent successfully');
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });