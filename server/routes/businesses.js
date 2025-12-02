import express from 'express';
import Business from '../models/Business.js';
import { searchPlaces, getPlaceDetails, getPhotoUrl } from '../services/googleApi.js';
import { enhanceBusinessDescription, summarizeReviews } from '../services/aiService.js';

const router = express.Router();

/**
 * GET /api/businesses
 * Get all businesses with optional filters
 */
router.get('/', async (req, res) => {
    try {
        const { category, search, limit = 20 } = req.query;

        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const businesses = await Business.find(query)
            .limit(parseInt(limit))
            .populate('menu_items')
            .sort({ rating: -1 });

        res.json({
            success: true,
            count: businesses.length,
            data: businesses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * GET /api/businesses/:id
 * Get single business by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const business = await Business.findById(req.params.id).populate('menu_items');

        if (!business) {
            return res.status(404).json({
                success: false,
                error: 'Business not found',
            });
        }

        res.json({
            success: true,
            data: business,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * POST /api/businesses
 * Create a new business
 */
router.post('/', async (req, res) => {
    try {
        const business = await Business.create(req.body);

        // Generate AI description if not provided
        if (!business.ai_description) {
            business.ai_description = await enhanceBusinessDescription(
                business.name,
                business.category,
                business.address
            );
            await business.save();
        }

        res.status(201).json({
            success: true,
            data: business,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * POST /api/businesses/import-from-google
 * Import business from Google Places
 */
router.post('/import-from-google', async (req, res) => {
    try {
        const { place_id } = req.body;

        if (!place_id) {
            return res.status(400).json({
                success: false,
                error: 'place_id is required',
            });
        }

        // Check if already exists
        const existing = await Business.findOne({ google_place_id: place_id });
        if (existing) {
            return res.json({
                success: true,
                data: existing,
                message: 'Business already exists',
            });
        }

        // Fetch from Google
        const placeDetails = await getPlaceDetails(place_id);

        // Extract photos
        const images = placeDetails.photos
            ? placeDetails.photos.slice(0, 5).map((photo) => getPhotoUrl(photo.photo_reference))
            : [];

        // Create business
        const business = await Business.create({
            google_place_id: place_id,
            name: placeDetails.name,
            description: placeDetails.editorial_summary?.overview || '',
            address: placeDetails.formatted_address,
            location: {
                type: 'Point',
                coordinates: [
                    placeDetails.geometry.location.lng,
                    placeDetails.geometry.location.lat,
                ],
            },
            rating: placeDetails.rating || 0,
            images: images,
            contact: {
                phone: placeDetails.formatted_phone_number,
            },
            social_links: {
                website: placeDetails.website,
            },
        });

        // Generate AI description
        business.ai_description = await enhanceBusinessDescription(
            business.name,
            business.category,
            'Malabon City'
        );
        await business.save();

        res.status(201).json({
            success: true,
            data: business,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * GET /api/businesses/search/google
 * Search Google Places for businesses in Malabon
 */
router.get('/search/google', async (req, res) => {
    try {
        const { query, type = 'restaurant' } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                error: 'query parameter is required',
            });
        }

        const results = await searchPlaces(query, type);

        res.json({
            success: true,
            count: results.length,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * POST /api/businesses/:id/generate-summary
 * Generate AI summary of reviews
 */
router.post('/:id/generate-summary', async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);

        if (!business) {
            return res.status(404).json({
                success: false,
                error: 'Business not found',
            });
        }

        if (!business.google_place_id) {
            return res.status(400).json({
                success: false,
                error: 'Business does not have a Google Place ID',
            });
        }

        // Fetch reviews from Google
        const placeDetails = await getPlaceDetails(business.google_place_id);

        if (!placeDetails.reviews || placeDetails.reviews.length === 0) {
            return res.json({
                success: true,
                data: 'No reviews available to summarize.',
            });
        }

        // Generate summary
        const summary = await summarizeReviews(placeDetails.reviews);

        // Update business
        business.reviews_summary = summary;
        await business.save();

        res.json({
            success: true,
            data: summary,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

export default router;
