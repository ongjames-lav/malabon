import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesToDownload = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/5/51/Sapin-sapin.jpg", filename: "sapin-sapin.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Crispy_Pata_Pork.jpg", filename: "crispy-pata.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Bibingka!.jpg", filename: "bibingka.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Smoked_fish_called_Tinapa.jpg", filename: "tinapa.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Vietnamese_spring_rolls.jpg", filename: "sumpia.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lady_fingers.jpg", filename: "broas.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Fried-Chicken-Set.jpg", filename: "malabon-chicken.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Baked_Oysters_01.jpg", filename: "baked-oysters.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Sapin-Sapin_2.jpg", filename: "kakanin-mix.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Burong_Isda.jpg/640px-Burong_Isda.jpg", filename: "burong-isda.jpg" }
];

const targetDir = path.join(__dirname, '../../client/public/assets/images/food');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadImage(url, filename) {
    const filepath = path.join(targetDir, filename);
    console.log(`Downloading ${filename}...`);

    try {
        const response = await axios({
            url,
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

async function run() {
    console.log("🚀 Starting downloads with headers...");
    for (const img of imagesToDownload) {
        await downloadImage(img.url, img.filename);
        // Small delay to be polite
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log("🎉 All downloads finished.");
}

run();
