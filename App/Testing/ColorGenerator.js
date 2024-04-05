const fs = require('fs');
const Vibrant = require('node-vibrant');
const { PNG } = require('pngjs');

async function extractDominantColors(imagePath, threshold) {
    try {
        const palette = await Vibrant.from(imagePath).quality(1).getPalette();

        // Check if Vibrant.swatches is available
        if (palette.Vibrant && palette.DarkVibrant && palette.LightVibrant) {
            const dominantColors = [palette.Vibrant, palette.DarkVibrant, palette.LightVibrant];
            return dominantColors;
        } else {
            console.error("Error: Vibrant swatches not available.");
            return null;
        }
    } catch (error) {
        console.error("Error extracting dominant colors:", error);
        return null;
    }
}

async function generateAndExportTheme(imagePath, threshold, outputPath) {
    try {
        const dominantColors = await extractDominantColors(imagePath, threshold);

        if (!dominantColors || dominantColors.length === 0) {
            console.error("No dominant colors found.");
            return;
        }

        // Create PNG image with the chosen colors
        const png = new PNG({ width: 100, height: 100 });

        for (let i = 0; i < dominantColors.length; i++) {
            const hexColor = dominantColors[i].getHex();
            const rgbColor = dominantColors[i].getRgb();
            for (let y = 0; y < png.height; y++) {
                for (let x = i * (png.width / dominantColors.length); x < (i + 1) * (png.width / dominantColors.length); x++) {
                    const idx = (png.width * y + x) << 2;
                    png.data[idx] = rgbColor[0];     // R
                    png.data[idx + 1] = rgbColor[1]; // G
                    png.data[idx + 2] = rgbColor[2]; // B
                    png.data[idx + 3] = 255;         // Alpha
                }
            }
        }

        const fileStream = fs.createWriteStream(outputPath);
        fileStream.on('finish', () => console.log('Image exported successfully.'));
        png.pack().pipe(fileStream);
    } catch (error) {
        console.error("Error generating and exporting theme:", error);
    }
}

// Example usage
const imagePath = './Files/image.jpg';
const outputPath = './Files/theme.png';
const threshold = 0.5; // Adjust the threshold as needed

generateAndExportTheme(imagePath, threshold, outputPath);