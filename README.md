# 🍽️ Taste of Malabon - Food & Business Discovery Hub

A modern, animated, editorial-style web application showcasing the culinary heritage and vibrant food scene of Malabon City, Philippines.

## 🎯 Features

- **Business Directory**: Comprehensive listing of restaurants, cafés, bakeries, and street food vendors
- **Food Catalog**: Detailed information about Malabon's signature dishes and delicacies
- **Cultural Stories**: Rich historical and cultural context about Malabon's food heritage
- **Google API Integration**: Real-time data from Google Places, Geocoding, and Knowledge Graph
- **AI-Enhanced Content**: Automated descriptions and summaries using Gemini API
- **HD Images**: High-quality photos from Unsplash and Pexels
- **Premium UI**: Dark mode, glassmorphism, and smooth animations with Framer Motion

## 📸 Screenshots

### Home
![Home](client/public/assets/screenshots/home.png)

### Delicious Foods
![Foods](client/public/assets/screenshots/foods.png)

### Places to Visit
![Places](client/public/assets/screenshots/places.png)

### Culture & Heritage
![Culture](client/public/assets/screenshots/culture.png)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TailwindCSS** (Custom theme with dark mode)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **TypeScript**

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (via Mongoose)
- **Google APIs** (Places, Geocoding, Custom Search, Knowledge Graph)
- **Gemini API** (AI content generation)
- **Unsplash & Pexels APIs** (HD images)

## 📁 Project Structure

```
malfinf/
├── client/                 # Next.js Frontend
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   └── public/            # Static assets
│
└── server/                # Express Backend
    ├── models/            # Mongoose schemas
    ├── routes/            # API endpoints
    └── services/          # External API integrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running locally (or MongoDB Atlas account)
- Google API Key with Places, Geocoding, and Knowledge Graph APIs enabled

### Installation

1. **Clone the repository**
```bash
cd c:/Users/admin/OneDrive/Desktop/malfinf
```

2. **Install Server Dependencies**
```bash
cd server
npm install
```

3. **Install Client Dependencies**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/taste-of-malabon
GOOGLE_API_KEY=AIzaSyBm0gr2MBL3jXKFMLJ9oPpWbnFMgbi6CcA
PORT=5000

# Optional: For enhanced features
GEMINI_API_KEY=your_gemini_key
UNSPLASH_ACCESS_KEY=your_unsplash_key
PEXELS_API_KEY=your_pexels_key
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start the Backend Server**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

3. **Start the Frontend** (in a new terminal)
```bash
cd client
npm run dev
```
Client will run on `http://localhost:3000`

## 📡 API Endpoints

### Businesses
- `GET /api/businesses` - Get all businesses
- `GET /api/businesses/:id` - Get single business
- `POST /api/businesses` - Create business
- `POST /api/businesses/import-from-google` - Import from Google Places
- `GET /api/businesses/search/google` - Search Google Places

### Foods
- `GET /api/foods` - Get all foods
- `GET /api/foods/:id` - Get single food
- `POST /api/foods` - Create food
- `PUT /api/foods/:id` - Update food
- `DELETE /api/foods/:id` - Delete food

### Cultural Stories
- `GET /api/culture` - Get all stories
- `GET /api/culture/:id` - Get single story
- `POST /api/culture` - Create story
- `PUT /api/culture/:id` - Update story
- `DELETE /api/culture/:id` - Delete story

## 🎨 Design Features

- **Dark Mode**: Premium dark theme with custom color palette
- **Glassmorphism**: Frosted glass effects on cards and modals
- **Animations**: Scroll-triggered and hover animations
- **Responsive**: Mobile-first design
- **SEO Optimized**: Meta tags and structured data

## 📝 License

This project is for educational purposes.

## 👨‍💻 Development

Built with ❤️ for Malabon City
