# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Set Up MongoDB

**Option A: MongoDB Atlas (Recommended - Free)**
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create a cluster (free tier)
4. Get connection string
5. Update `server/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taste-of-malabon
```

**Option B: Local MongoDB**
1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install and run `mongod`

### Step 2: Start Backend
```bash
cd server
npm run dev
```

### Step 3: Start Frontend
```bash
cd client  
npm run dev
```

Visit: **http://localhost:3000**

---

## 📝 Optional: Add Sample Data

```bash
cd server
node seed.js
```

This creates:
- 2 sample businesses
- 2 signature foods (Pancit Malabon, Puto Malabon)
- 2 cultural stories

---

## 🧪 Test the API

```bash
# Get all businesses
curl http://localhost:5000/api/businesses

# Get all foods
curl http://localhost:5000/api/foods

# Get cultural stories
curl http://localhost:5000/api/culture
```

---

## 🎨 What You'll See

- **Animated hero section** with gradient text
- **Glassmorphic cards** with stats
- **Dark premium theme**
- **Smooth scroll animations**

---

## 🔑 API Keys (Optional)

For enhanced features, add to `server/.env`:

```env
# AI content generation
GEMINI_API_KEY=your_key

# HD images
UNSPLASH_ACCESS_KEY=your_key
PEXELS_API_KEY=your_key
```

---

## 📚 Next Steps

1. ✅ Run the app
2. ✅ Seed sample data
3. 📝 Add more Malabon businesses
4. 🎨 Customize the design
5. 🚀 Deploy to Vercel

See `walkthrough.md` for full documentation!
