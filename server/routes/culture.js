import express from 'express';
import CulturalStory from '../models/CulturalStory.js';
import { generateCulturalContent } from '../services/aiService.js';
import { getMalabonImages } from '../services/imageService.js';

const router = express.Router();

/**
 * GET /api/culture
 * Get all cultural stories
 */
router.get('/', async (req, res) => {
    try {
        const { type, search, limit = 20 } = req.query;

        let query = { published: true };

        if (type) {
            query.type = type;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } },
            ];
        }

        const stories = await CulturalStory.find(query)
            .limit(parseInt(limit))
            .populate('related_foods')
            .populate('related_businesses')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: stories.length,
            data: stories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * GET /api/culture/:id
 * Get single cultural story by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const story = await CulturalStory.findById(req.params.id)
            .populate('related_foods')
            .populate('related_businesses');

        if (!story) {
            return res.status(404).json({
                success: false,
                error: 'Cultural story not found',
            });
        }

        res.json({
            success: true,
            data: story,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * POST /api/culture
 * Create a new cultural story
 */
router.post('/', async (req, res) => {
    try {
        const story = await CulturalStory.create(req.body);

        // Generate AI content if not provided
        if (!story.content || story.content.length < 100) {
            story.content = await generateCulturalContent(story.title, story.type);
            await story.save();
        }

        // Fetch images if not provided
        if (!story.image_url && story.images.length === 0) {
            const images = await getMalabonImages('culture', 3);
            if (images.length > 0) {
                story.image_url = images[0].url;
                story.images = images.map((img) => img.url);
                await story.save();
            }
        }

        res.status(201).json({
            success: true,
            data: story,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * PUT /api/culture/:id
 * Update a cultural story
 */
router.put('/:id', async (req, res) => {
    try {
        const story = await CulturalStory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!story) {
            return res.status(404).json({
                success: false,
                error: 'Cultural story not found',
            });
        }

        res.json({
            success: true,
            data: story,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * DELETE /api/culture/:id
 * Delete a cultural story
 */
router.delete('/:id', async (req, res) => {
    try {
        const story = await CulturalStory.findByIdAndDelete(req.params.id);

        if (!story) {
            return res.status(404).json({
                success: false,
                error: 'Cultural story not found',
            });
        }

        res.json({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

export default router;
