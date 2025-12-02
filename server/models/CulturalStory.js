import mongoose from 'mongoose';

const culturalStorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            default: '',
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
        type: {
            type: String,
            enum: ['History', 'Tradition', 'Festival', 'Landmark', 'Food Culture', 'Other'],
            default: 'History',
        },
        tags: [String],
        related_foods: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
            },
        ],
        related_businesses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Business',
            },
        ],
        published: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const CulturalStory = mongoose.model('CulturalStory', culturalStorySchema);

export default CulturalStory;
