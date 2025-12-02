import { fetchUnsplashImages, downloadImage } from './fetchImages.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    console.log('Fetching river boat image...');
    const images = await fetchUnsplashImages('Philippines river boat traditional', 1);

    if (images.length > 0) {
        const image = images[0];
        const folderPath = path.join(__dirname, '../../client/public/assets/images/culture');
        const filepath = path.join(folderPath, 'malabon-river.jpg');

        await downloadImage(image.url, filepath);
        console.log('Downloaded malabon-river.jpg');
    } else {
        console.log('No images found.');
    }
}

run();
