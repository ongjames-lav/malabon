import express from 'express';
import Food from '../models/Food.js';
import { enhanceFoodDescription } from '../services/aiService.js';
import { getImages } from '../services/imageService.js';

const router = express.Router();

/**
 * GET /api/foods
 * Get all foods with optional filters
 */
router.get('/', async (req, res) => {
    try {
        const { category, search, signature, limit = 20 } = req.query;

        let query = {};

        if (category) {
            query.category = category;
        }

        if (signature === 'true') {
            query.is_signature = true;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const foods = await Food.find(query)
            .limit(parseInt(limit))
            .populate('businesses')
            .sort({ is_signature: -1, name: 1 });

        res.json({
            success: true,
            count: foods.length,
            data: foods,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * GET /api/foods/:id
 * Get single food by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id).populate('businesses');

        if (!food) {
            return res.status(404).json({
                success: false,
                error: 'Food not found',
            });
        }

        res.json({
            success: true,
            data: food,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * POST /api/foods
 * Create a new food item
 */
router.post('/', async (req, res) => {
    try {
        const food = await Food.create(req.body);

        // Generate AI description if not provided
        if (!food.ai_description) {
            food.ai_description = await enhanceFoodDescription(
                food.name,
                food.ingredients?.join(', '),
                food.history
            );
            await food.save();
        }

        // Fetch images if not provided
        if (!food.image_url && food.images.length === 0) {
            const images = await getImages(food.name, 3);
            if (images.length > 0) {
                food.image_url = images[0].url;
                food.images = images.map((img) => img.url);
                await food.save();
            }
        }

        res.status(201).json({
            success: true,
            data: food,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * PUT /api/foods/:id
 * Update a food item
 */
router.put('/:id', async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!food) {
            return res.status(404).json({
                success: false,
                error: 'Food not found',
            });
        }

        res.json({
            success: true,
            data: food,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * DELETE /api/foods/:id
 * Delete a food item
 */
router.delete('/:id', async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                error: 'Food not found',
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
