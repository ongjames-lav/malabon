import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taste-of-malabon';

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Import routes
import businessRoutes from './routes/businesses.js';
import foodRoutes from './routes/foods.js';
import cultureRoutes from './routes/culture.js';

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Taste of Malabon API',
        version: '1.0.0',
        endpoints: {
            businesses: '/api/businesses',
            foods: '/api/foods',
            culture: '/api/culture',
        },
    });
});

app.use('/api/businesses', businessRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/culture', cultureRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
