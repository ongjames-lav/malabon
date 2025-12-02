import { fetchUnsplashImages, fetchPexelsImages, downloadImage } from './fetchImages.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchAndDownloadDelicacies() {
    console.log('🍽️  Fetching delicacy images...\n');

    const delicacies = [
        { query: 'Sapin Sapin Filipino dessert', filename: 'sapin-sapin.jpg' },
        { query: 'Filipino kakanin rice cake', filename: 'kakanin-mix.jpg' },
        { query: 'Filipino smoked fish tinapa', filename: 'tinapa.jpg' },
        { query: 'Fried spring rolls lumpia', filename: 'sumpia.jpg' }, // Sumpia is similar to lumpia
        { query: 'Ladyfinger biscuits broas', filename: 'broas.jpg' },
        { query: 'Crispy fried chicken', filename: 'malabon-chicken.jpg' },
        { query: 'Crispy Pata pork knuckle', filename: 'crispy-pata.jpg' },
        { query: 'Bibingka Filipino', filename: 'bibingka.jpg' },
        { query: 'Baked oysters cheese', filename: 'baked-oysters.jpg' },
        // Burong isda is hard to find, maybe use a generic rice/fish side dish or skip for now and use placeholder/generic
        { query: 'Filipino fermented rice fish', filename: 'burong-isda.jpg' }
    ];

    const folderPath = path.join(__dirname, '../../client/public/assets/images/food');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    for (const item of delicacies) {
        console.log(`📸 Fetching: ${item.query}`);
        let images = await fetchUnsplashImages(item.query, 1);

        if (images.length === 0) {
            console.log('   Trying Pexels...');
            images = await fetchPexelsImages(item.query, 1);
        }

        if (images.length > 0) {
            const filepath = path.join(folderPath, item.filename);
            try {
                await downloadImage(images[0].url, filepath);
                console.log(`   ✅ Downloaded: ${item.filename}`);
            } catch (error) {
                console.error(`   ❌ Failed to download ${item.filename}: ${error.message}`);
            }
        } else {
            console.log(`   ⚠️  No images found for ${item.query}`);
        }
        // Rate limit
        await new Promise(r => setTimeout(r, 1000));
    }
}

fetchAndDownloadDelicacies();
