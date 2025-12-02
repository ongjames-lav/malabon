import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Puto_Bumbong_outside_Our_Lady_of_the_Abandoned_Sta_Ana-2.jpg';
const outputPath = path.join(__dirname, '../../client/public/assets/images/food/puto-bumbong.jpg');

async function downloadImage() {
    try {
        console.log('📥 Downloading Puto Bumbong image...');

        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const stats = fs.statSync(outputPath);
        console.log(`✅ Downloaded: ${outputPath}`);
        console.log(`📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

downloadImage();
