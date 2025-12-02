import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b7/5609Malabon_Heritage_City_Proper_04.jpg";
const filename = "burong-isda.jpg";
const targetDir = path.join(__dirname, '../../client/public/assets/images/food');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadImage() {
    const filepath = path.join(targetDir, filename);
    console.log(`Downloading ${filename} from ${imageUrl}...`);

    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log(`✅ Downloaded: ${filename}`);
                resolve();
            });
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`❌ Failed to download ${filename}: ${error.message}`);
    }
}

downloadImage();
