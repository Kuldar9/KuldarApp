const express = require('express');
const bodyParser = require('body-parser');
import('node-fetch').then(({ default: fetch }) => {
  // Your code that uses fetch
}).catch(error => {
  console.error('Error importing node-fetch:', error);
});
const chroma = require('chroma-js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json());

// Function to fetch color information from the Color API
async function getColorInfo(hexColor) {
    const url = `https://www.thecolorapi.com/id?hex=${hexColor}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching color information:', error);
        throw error;
    }
}

// Function to generate a palette based on the Color API response
function generatePalette(colorInfo, type) {
    const baseColor = chroma(colorInfo.hex.value);

    // Generate dark theme
    if (type === 'dark') {
        const palette = [baseColor.hex()];
        for (let i = 1; i < 5; i++) {
            const modColor = baseColor.darken(i * 0.8).desaturate(0.3);
            palette.push(modColor.hex());
        }
        return palette;
    }
    // Generate light theme
    else if (type === 'light') {
        const palette = [baseColor.hex()];
        for (let i = 1; i < 5; i++) {
            const modColor = baseColor.brighten(i * 0.8).desaturate(0.3);
            palette.push(modColor.hex());
        }
        return palette;
    }
}

// POST endpoint to receive color and generate palettes
app.post('/generatePalettes', async (req, res) => {
    try {
        const { color } = req.body;

        // Fetch color information from the Color API
        const colorInfo = await getColorInfo(color);

        // Generate dark theme palette
        const darkPalette = generatePalette(colorInfo, 'dark');

        // Generate light theme palette
        const lightPalette = generatePalette(colorInfo, 'light');

        res.json({ darkPalette, lightPalette });
    } catch (error) {
        console.error('Error generating palettes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});