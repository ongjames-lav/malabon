import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        ai_description: {
            type: String,
            default: '',
        },
        history: {
            type: String,
            default: '',
        },
        category: {
            type: String,
            enum: [
                'Main Dish',
                'Appetizer',
                'Dessert',
                'Beverage',
                'Street Food',
                'Snack',
                'Specialty',
                'Other',
            ],
            default: 'Main Dish',
        },
        image_url: {
            type: String,
            default: '',
        },
        images: [
            {
                type: String,
            },
        ],
        price_range: {
            min: Number,
            max: Number,
        },
        is_signature: {
            type: Boolean,
            default: false,
        },
        businesses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Business',
            },
        ],
        ingredients: [String],
        cultural_significance: {
            type: String,
            default: '',
        },
        cooking_instructions: {
            type: String,
            default: '',
        },
        where_to_buy: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model('Food', foodSchema);

export default Food;
