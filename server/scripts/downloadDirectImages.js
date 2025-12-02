import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesToDownload = [
    { url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Sapin-sapin.jpg", filename: "sapin-sapin.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Crispy_Pata_Pork.jpg", filename: "crispy-pata.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Bibingka%21.jpg", filename: "bibingka.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Smoked_fish_called_Tinapa.jpg", filename: "tinapa.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Vietnamese_spring_rolls.jpg", filename: "sumpia.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Lady_fingers.jpg", filename: "broas.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Fried-Chicken-Set.jpg", filename: "malabon-chicken.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Baked_Oysters_01.jpg", filename: "baked-oysters.jpg" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Sapin-Sapin_2.jpg", filename: "kakanin-mix.jpg" }, // Using another sapin-sapin/kakanin image for variety
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Burong_Isda.jpg/640px-Burong_Isda.jpg", filename: "burong-isda.jpg" } // Trying to find a burong isda, if this fails I'll use a placeholder logic
];

const targetDir = path.join(__dirname, '../../client/public/assets/images/food');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadFile(url, filename) {
    const filepath = path.join(targetDir, filename);
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: Status Code ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✅ Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete partial file
            console.error(`❌ Error downloading ${filename}: ${err.message}`);
            reject(err);
        });
    });
}

async function run() {
    console.log("🚀 Starting direct image downloads...");
    for (const img of imagesToDownload) {
        try {
            await downloadFile(img.url, img.filename);
        } catch (e) {
            console.error(e.message);
        }
    }
    console.log("🎉 All downloads finished.");
}

run();
