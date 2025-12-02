import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
    {
        google_place_id: {
            type: String,
            unique: true,
            sparse: true,
        },
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
        address: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true,
            },
        },
        category: {
            type: String,
            enum: [
                'Restaurant',
                'Café',
                'Bakery',
                'Street Food',
                'Beverage Shop',
                'Fast Food',
                'Fine Dining',
                'Casual Dining',
                'Other',
            ],
            default: 'Restaurant',
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        images: [
            {
                type: String,
            },
        ],
        social_links: {
            facebook: String,
            instagram: String,
            website: String,
        },
        contact: {
            phone: String,
            email: String,
        },
        opening_hours: {
            type: Map,
            of: String,
        },
        reviews_summary: {
            type: String,
            default: '',
        },
        menu_items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Create geospatial index
businessSchema.index({ location: '2dsphere' });

const Business = mongoose.model('Business', businessSchema);

export default Business;
