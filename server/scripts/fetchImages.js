import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'demo'; // Use demo for testing
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

/**
 * Download image from URL and save to file
 */
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

/**
 * Fetch images from Unsplash
 */
async function fetchUnsplashImages(query, count = 5) {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: query,
                per_page: count,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        });

        return response.data.results.map((photo) => ({
            url: photo.urls.regular,
            url_hd: photo.urls.full,
            thumbnail: photo.urls.thumb,
            photographer: photo.user.name,
            photographer_url: photo.user.links.html,
            download_url: photo.links.download_location,
            source: 'unsplash',
        }));
    } catch (error) {
        console.error('Error fetching from Unsplash:', error.message);
        return [];
    }
}

/**
 * Fetch images from Pexels
 */
async function fetchPexelsImages(query, count = 5) {
    if (!PEXELS_API_KEY) {
        console.warn('Pexels API key not configured');
        return [];
    }

    try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
            params: {
                query: query,
                per_page: count,
                orientation: 'landscape',
            },
            headers: {
                Authorization: PEXELS_API_KEY,
            },
        });

        return response.data.photos.map((photo) => ({
            url: photo.src.large,
            url_hd: photo.src.original,
            thumbnail: photo.src.medium,
            photographer: photo.photographer,
            photographer_url: photo.photographer_url,
            source: 'pexels',
        }));
    } catch (error) {
        console.error('Error fetching from Pexels:', error.message);
        return [];
    }
}

/**
 * Main function to fetch and download images
 */
async function fetchAndDownloadImages() {
    console.log('🖼️  Starting image fetch...\n');

    const categories = [
        {
            query: 'Pancit Malabon Filipino noodles',
            folder: '../client/public/assets/images/food',
            filename: 'pancit-malabon-real.jpg',
        },
        {
            query: 'Puto Filipino rice cake',
            folder: '../client/public/assets/images/food',
            filename: 'puto-malabon-real.jpg',
        },
        {
            query: 'Filipino street food market',
            folder: '../client/public/assets/images/culture',
            filename: 'street-food-real.jpg',
        },
        {
            query: 'Manila church Philippines',
            folder: '../client/public/assets/images/landmarks',
            filename: 'church-real.jpg',
        },
        {
            query: 'Filipino restaurant interior',
            folder: '../client/public/assets/images/businesses',
            filename: 'restaurant-real.jpg',
        },
    ];

    for (const category of categories) {
        console.log(`📸 Fetching: ${category.query}`);

        // Try Unsplash first
        let images = await fetchUnsplashImages(category.query, 1);

        // Fallback to Pexels if Unsplash fails
        if (images.length === 0) {
            console.log('   Trying Pexels...');
            images = await fetchPexelsImages(category.query, 1);
        }

        if (images.length > 0) {
            const image = images[0];
            const folderPath = path.join(__dirname, category.folder);
            const filepath = path.join(folderPath, category.filename);

            // Ensure folder exists
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            try {
                await downloadImage(image.url, filepath);
                console.log(`   ✅ Downloaded: ${category.filename}`);
                console.log(`   📷 By: ${image.photographer} (${image.source})\n`);
            } catch (error) {
                console.error(`   ❌ Failed to download: ${error.message}\n`);
            }
        } else {
            console.log(`   ⚠️  No images found\n`);
        }

        // Rate limiting - wait 1 second between requests
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log('🎉 Image fetch complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    fetchAndDownloadImages().catch(console.error);
}

export { fetchUnsplashImages, fetchPexelsImages, downloadImage };
