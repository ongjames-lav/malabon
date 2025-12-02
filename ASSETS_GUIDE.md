# Assets & Media Guide

## 📁 Folder Structure

```
client/public/assets/
├── branding/
│   ├── malabon-logo.png          # Official Malabon City logo
│   ├── malabon-logo.svg          # Vector version (if available)
│   └── malabon-seal.png          # Official seal
│
├── images/
│   ├── food/                     # Food photos
│   │   ├── pancit-malabon/
│   │   ├── puto-malabon/
│   │   └── ...
│   │
│   ├── landmarks/                # City landmarks
│   │   ├── malabon-church.jpg
│   │   ├── heritage-houses.jpg
│   │   └── ...
│   │
│   ├── businesses/               # Restaurant/cafe photos
│   │   ├── [business-name]/
│   │   └── ...
│   │
│   └── culture/                  # Cultural events, festivals
│       ├── festivals/
│       └── traditions/
```

## 🎨 Malabon City Logo

### Download Sources

1. **Wikimedia Commons** (Recommended - Public Domain)
   - URL: https://commons.wikimedia.org/wiki/File:Ph_seal_Malabon.png
   - Format: PNG with transparent background
   - License: Public Domain
   - Download and save as: `public/assets/branding/malabon-seal.png`

2. **Seeklogo**
   - URL: https://seeklogo.com/vector-logo/398624/malabon
   - Formats: PNG, EPS, SVG
   - Save as: `public/assets/branding/malabon-logo.svg` (for vector)

3. **Icon Ape**
   - URL: https://iconape.com/malabon-logo-icon-svg-png.html
   - Formats: SVG, PNG, PSD, PDF, AI
   - Multiple sizes available

### Quick Download Instructions

**Option 1: Wikimedia Commons (Easiest)**
1. Visit: https://commons.wikimedia.org/wiki/File:Ph_seal_Malabon.png
2. Click "Download" → Select size (1024px or higher)
3. Save to: `client/public/assets/branding/malabon-seal.png`

**Option 2: Using PowerShell**
```powershell
# Download Malabon seal from Wikimedia
Invoke-WebRequest -Uri "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ph_seal_Malabon.png/1024px-Ph_seal_Malabon.png" -OutFile "public/assets/branding/malabon-seal.png"
```

## 📸 HD Images for Website

### Categories Needed

#### 1. Food Images
**Pancit Malabon**
- Search terms: "Pancit Malabon", "Filipino noodles", "Malabon noodles"
- Sources: Unsplash, Pexels, Google Images (with usage rights)
- Minimum resolution: 1920x1080px

**Puto Malabon**
- Search terms: "Puto", "Filipino rice cake", "Puto with cheese"
- Save to: `public/assets/images/food/puto-malabon/`

#### 2. Landmarks
- Malabon Church (Immaculate Conception Parish)
- Heritage houses
- Waterways and bridges
- Save to: `public/assets/images/landmarks/`

#### 3. Businesses
- Restaurant exteriors
- Cafe interiors
- Street food stalls
- Save to: `public/assets/images/businesses/`

#### 4. Cultural
- Festivals
- Traditional activities
- Community events
- Save to: `public/assets/images/culture/`

### Using Unsplash API (Automated)

The image service is already set up. To fetch images programmatically:

1. Get Unsplash API key: https://unsplash.com/developers
2. Add to `server/.env`:
   ```env
   UNSPLASH_ACCESS_KEY=your_key_here
   ```
3. Use the API endpoint:
   ```bash
   curl http://localhost:5000/api/images/search?query=pancit+malabon
   ```

### Using Pexels API (Automated)

1. Get Pexels API key: https://www.pexels.com/api/
2. Add to `server/.env`:
   ```env
   PEXELS_API_KEY=your_key_here
   ```

## 🖼️ Image Specifications

### Logo/Branding
- **Format**: PNG (transparent) or SVG
- **Resolution**: Minimum 512x512px for PNG
- **Usage**: Navbar, footer, social media

### Hero Images
- **Format**: WebP (primary), JPEG (fallback)
- **Resolution**: 1920x1080px minimum
- **Aspect Ratio**: 16:9
- **File Size**: < 500KB (optimized)

### Card Images
- **Format**: WebP
- **Resolution**: 800x600px
- **Aspect Ratio**: 4:3
- **File Size**: < 200KB

### Thumbnails
- **Format**: WebP
- **Resolution**: 400x300px
- **File Size**: < 100KB

## 🚀 Quick Setup Commands

```bash
# Navigate to client folder
cd client

# Create all asset folders
mkdir -p public/assets/branding
mkdir -p public/assets/images/food
mkdir -p public/assets/images/landmarks
mkdir -p public/assets/images/businesses
mkdir -p public/assets/images/culture

# Download Malabon seal (Windows PowerShell)
Invoke-WebRequest -Uri "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ph_seal_Malabon.png/1024px-Ph_seal_Malabon.png" -OutFile "public/assets/branding/malabon-seal.png"
```

## 📋 Checklist

- [ ] Download Malabon City seal/logo
- [ ] Create asset folder structure
- [ ] Source 5+ food images (Pancit Malabon, Puto, etc.)
- [ ] Source 3+ landmark images
- [ ] Source 3+ business/restaurant images
- [ ] Source 2+ cultural/festival images
- [ ] Optimize all images (convert to WebP)
- [ ] Update homepage to use real images

## 🔗 Useful Resources

### Free Stock Photo Sites
- **Unsplash**: https://unsplash.com/s/photos/filipino-food
- **Pexels**: https://www.pexels.com/search/filipino%20food/
- **Pixabay**: https://pixabay.com/images/search/philippines/

### Image Optimization Tools
- **Squoosh**: https://squoosh.app/ (WebP conversion)
- **TinyPNG**: https://tinypng.com/ (Compression)
- **ImageOptim**: https://imageoptim.com/ (Batch optimization)

### Google Images (with usage rights)
1. Search for your term
2. Click "Tools" → "Usage Rights" → "Creative Commons licenses"
3. Download and attribute properly

## 💡 Next Steps

After downloading assets:

1. **Update homepage** to use real logo:
   ```tsx
   import Image from 'next/image';
   
   <Image 
     src="/assets/branding/malabon-seal.png"
     alt="Malabon City"
     width={64}
     height={64}
   />
   ```

2. **Replace placeholder images** in featured cards

3. **Add image gallery** to business/food detail pages

4. **Implement lazy loading** for better performance
