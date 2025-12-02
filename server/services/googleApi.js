import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const MALABON_BOUNDS = {
    north: 14.6800,
    south: 14.6200,
    east: 120.9800,
    west: 120.9300,
};

/**
 * Verify if coordinates are within Malabon City bounds
 */
export function isWithinMalabon(lat, lng) {
    return (
        lat >= MALABON_BOUNDS.south &&
        lat <= MALABON_BOUNDS.north &&
        lng >= MALABON_BOUNDS.west &&
        lng <= MALABON_BOUNDS.east
    );
}

/**
 * Search for places in Malabon using Google Places API (Text Search)
 */
export async function searchPlaces(query, type = 'restaurant') {
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/textsearch/json',
            {
                params: {
                    query: `${query} in Malabon City, Philippines`,
                    type: type,
                    key: GOOGLE_API_KEY,
                },
            }
        );

        // Filter results to only include places within Malabon bounds
        const filteredResults = response.data.results.filter((place) => {
            const { lat, lng } = place.geometry.location;
            return isWithinMalabon(lat, lng);
        });

        return filteredResults;
    } catch (error) {
        console.error('Error searching places:', error.message);
        throw error;
    }
}

/**
 * Get place details by place_id
 */
export async function getPlaceDetails(placeId) {
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/details/json',
            {
                params: {
                    place_id: placeId,
                    fields:
                        'name,formatted_address,geometry,rating,photos,opening_hours,formatted_phone_number,website,reviews,types',
                    key: GOOGLE_API_KEY,
                },
            }
        );

        return response.data.result;
    } catch (error) {
        console.error('Error getting place details:', error.message);
        throw error;
    }
}

/**
 * Get photo URL from photo reference
 */
export function getPhotoUrl(photoReference, maxWidth = 800) {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
}

/**
 * Geocode an address to get coordinates
 */
export async function geocodeAddress(address) {
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/geocode/json',
            {
                params: {
                    address: `${address}, Malabon City, Philippines`,
                    key: GOOGLE_API_KEY,
                },
            }
        );

        if (response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
                formatted_address: response.data.results[0].formatted_address,
            };
        }

        return null;
    } catch (error) {
        console.error('Error geocoding address:', error.message);
        throw error;
    }
}

/**
 * Search for articles and content using Google Custom Search API
 */
export async function searchContent(query) {
    try {
        // Note: You'll need to set up a Custom Search Engine and get the CX ID
        const CX_ID = process.env.GOOGLE_CUSTOM_SEARCH_CX;

        if (!CX_ID) {
            console.warn('Custom Search CX not configured');
            return [];
        }

        const response = await axios.get(
            'https://www.googleapis.com/customsearch/v1',
            {
                params: {
                    q: `${query} Malabon`,
                    cx: CX_ID,
                    key: GOOGLE_API_KEY,
                    num: 10,
                },
            }
        );

        return response.data.items || [];
    } catch (error) {
        console.error('Error searching content:', error.message);
        return [];
    }
}

/**
 * Get cultural/historical context using Knowledge Graph API
 */
export async function getKnowledgeGraph(query) {
    try {
        const response = await axios.get(
            'https://kgsearch.googleapis.com/v1/entities:search',
            {
                params: {
                    query: query,
                    key: GOOGLE_API_KEY,
                    limit: 5,
                },
            }
        );

        return response.data.itemListElement || [];
    } catch (error) {
        console.error('Error getting knowledge graph:', error.message);
        return [];
    }
}
