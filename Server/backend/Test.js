const axios = require('axios');

const PROCESS_IMAGE_URL = 'http://0.0.0.0:25575/api/process-image';
const FETCH_IMAGE_DATA_URL = 'http://0.0.0.0:25575/api/images/';

async function processImageAndFetchData(imageName) {
    try {
        const processResponse = await axios.post(PROCESS_IMAGE_URL, { imageName });
        console.log(`Image processed successfully: ${imageName}`, processResponse.data);
        
    } catch (error) {
        console.error(`Error processing image "${imageName}":`, error.response.data);
        return;
    }

    try {
        const fetchDataResponse = await axios.get(`${FETCH_IMAGE_DATA_URL}${imageName}`);
        console.log(`Fetched data for image "${imageName}":`, fetchDataResponse.data);
    } catch (error) {
        console.error(`Error fetching data for image "${imageName}":`, error.response.data);
    }
}

processImageAndFetchData('sampleImage.jpg');