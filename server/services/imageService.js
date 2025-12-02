import axios from 'axios';

/**
 * Search for HD images from Unsplash
 */
export async function searchUnsplashImages(query, count = 5) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
        console.warn('Unsplash API key not configured');
        return [];
    }

    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: query,
                per_page: count,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        });

        return response.data.results.map((photo) => ({
            url: photo.urls.regular,
            url_hd: photo.urls.full,
            thumbnail: photo.urls.thumb,
            photographer: photo.user.name,
            photographer_url: photo.user.links.html,
            source: 'unsplash',
        }));
    } catch (error) {
        console.error('Error fetching Unsplash images:', error.message);
        return [];
    }
}

/**
 * Search for HD images from Pexels
 */
export async function searchPexelsImages(query, count = 5) {
    const apiKey = process.env.PEXELS_API_KEY;

    if (!apiKey) {
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
                Authorization: apiKey,
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
        console.error('Error fetching Pexels images:', error.message);
        return [];
    }
}

/**
 * Get images for a specific query (tries multiple sources)
 */
export async function getImages(query, count = 5) {
    const images = [];

    // Try Unsplash first
    const unsplashImages = await searchUnsplashImages(query, count);
    images.push(...unsplashImages);

    // If not enough images, try Pexels
    if (images.length < count) {
        const pexelsImages = await searchPexelsImages(query, count - images.length);
        images.push(...pexelsImages);
    }

    return images.slice(0, count);
}

/**
 * Get Malabon-specific images
 */
export async function getMalabonImages(category = 'city', count = 5) {
    const queries = {
        city: 'Malabon City Philippines',
        food: 'Pancit Malabon Filipino food',
        street: 'Manila street food Philippines',
        culture: 'Filipino culture tradition',
        landmark: 'Malabon church heritage Philippines',
    };

    const query = queries[category] || queries.city;
    return await getImages(query, count);
}
