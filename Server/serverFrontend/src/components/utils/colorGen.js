const fetch = require('node-fetch');
const chroma = require('chroma-js');

// Function to fetch color information from the Color API
export async function getColorInfo(hexColor) {
    console.log('function getColorInfo, file: colorGen.js');
    // Remove "#" symbol if it exists
    const cleanHexColor = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
    const url = `https://www.thecolorapi.com/id?hex=${cleanHexColor}&format=json`;
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
export function generatePalette(colorInfo, type) {
    console.log('function generatePalette, file: colorGen.js');
    const baseColor = chroma(colorInfo.hex.value);

    // Check luminance of the base color
    const isDark = baseColor.luminance() < 0.5;

    // Generate dark theme only if base color is not dark and type is 'dark'
    if (type === 'dark' && !isDark) {
        const palette = [baseColor.hex()];
        for (let i = 1; i < 5; i++) {
            const modColor = baseColor.darken(i * 0.8).desaturate(0.3);
            palette.push(modColor.hex());
        }
        return palette;
    }
    // Generate light theme only if base color is not light and type is 'light'
    else if (type === 'light' && isDark) {
        const palette = [baseColor.hex()];
        for (let i = 1; i < 6; i++) {
            const modColor = baseColor.brighten(i * 0.8).desaturate(0.3);
            palette.push(modColor.hex());
        }
        return palette;
    }
    // Return an empty array if no palette is generated
    return [];
}