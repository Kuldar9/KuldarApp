const axios = require('axios');
const readline = require('readline');
const fs = require('fs');
const FormData = require('form-data');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const DATABASE_SERVICE_URL = 'http://90.191.79.223:25576';
const APP_GATEWAY_URL = 'http://90.191.79.223:25575';

const createUser = async () => {
    const response = await axios.post(`${DATABASE_SERVICE_URL}/api/users`, {
        name: 'John Bob',
        email: 'johnny@example.com',
        password: 'password1'
    });
    console.log(response.data);
};

const authenticateUser = async () => {
    const response = await axios.post(`${DATABASE_SERVICE_URL}/api/auth`, {
        email: 'johnny@example.com',
        password: 'password1'
    });
    console.log(response.data);
};

const sendImage = async () => {
    const form = new FormData();
    form.append('email', 'johnny@example.com');
    form.append('image', fs.createReadStream('./test_image.jpg')); // Update the path to your test image
    const response = await axios.post(`${APP_GATEWAY_URL}/api/image`, form, { headers: { ...form.getHeaders() } });
    console.log(response.data);
};

rl.question('Choose an action:\n1. Create User\n2. Authenticate User\n3. Send Image\n', (answer) => {
    switch(answer.trim()) {
        case '1':
            createUser().then(() => rl.close());
            break;
        case '2':
            authenticateUser().then(() => rl.close());
            break;
        case '3':
            sendImage().then(() => rl.close());
            break;
        default:
            console.log('Invalid choice.');
            rl.close();
            break;
    }
});