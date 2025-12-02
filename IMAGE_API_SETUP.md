# Image API Setup Guide

## 🔑 Getting API Keys

### Unsplash API (Recommended)

1. **Sign up**: Go to [https://unsplash.com/join](https://unsplash.com/join)
2. **Create app**: Visit [https://unsplash.com/oauth/applications](https://unsplash.com/oauth/applications)
3. **Click**: "New Application"
4. **Accept**: Terms and conditions
5. **Fill in**:
   - Application name: "Taste of Malabon"
   - Description: "Food and culture discovery platform for Malabon City"
6. **Copy**: Access Key
7. **Add to** `server/.env`:
   ```env
   UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

**Free Tier:**
- 50 requests per hour
- 5,000 requests per month
- Perfect for development

### Pexels API (Optional Backup)

1. **Sign up**: Go to [https://www.pexels.com/api/](https://www.pexels.com/api/)
2. **Click**: "Get Started"
3. **Fill form**: Name, email, website (can use localhost)
4. **Copy**: API Key from email
5. **Add to** `server/.env`:
   ```env
   PEXELS_API_KEY=your_api_key_here
   ```

**Free Tier:**
- 200 requests per hour
- Unlimited requests per month
- No attribution required

---

## 🚀 Quick Setup (Demo Mode)

You can test without API keys using demo mode:

```bash
cd server
node scripts/fetchImages.js
```

This will use Unsplash's demo access (limited to 50 requests/hour).

---

## 📸 Fetching Real Images

### Automatic Fetch

```bash
cd server
node scripts/fetchImages.js
```

This will download:
- ✅ Pancit Malabon photo
- ✅ Puto photo
- ✅ Street food scene
- ✅ Church/landmark
- ✅ Restaurant interior

### Manual API Testing

```bash
# Test Unsplash
curl "https://api.unsplash.com/search/photos?query=pancit+malabon&per_page=1" \
  -H "Authorization: Client-ID YOUR_KEY"

# Test Pexels
curl "https://api.pexels.com/v1/search?query=filipino+food&per_page=1" \
  -H "Authorization: YOUR_KEY"
```

---

## 🎨 Image Categories

### Food Images
- Pancit Malabon
- Puto Malabon
- Filipino street food
- Seafood dishes
- Traditional desserts

### Landmarks
- Malabon Church
- Heritage houses
- Waterways
- Bridges
- Historical sites

### Businesses
- Restaurant interiors
- Café ambiance
- Street food stalls
- Bakeries
- Market scenes

### Culture
- Festivals
- Traditional cooking
- Community gatherings
- Cultural events

---

## 📋 Current Status

**With API Keys:**
```bash
✅ Unsplash: 5,000 requests/month
✅ Pexels: Unlimited requests
✅ Auto-download script ready
```

**Without API Keys (Demo):**
```bash
⚠️  Unsplash Demo: 50 requests/hour
❌ Pexels: Requires key
✅ Can still fetch limited images
```

---

## 🔄 Integration with Database

The image service is already integrated with your API:

```javascript
// When creating a food item
POST /api/foods
{
  "name": "Pancit Malabon",
  "description": "...",
  // Images will be auto-fetched if not provided
}
```

The backend will automatically:
1. Check if images exist
2. Fetch from Unsplash/Pexels
3. Save URLs to database
4. Return food item with images

---

## 💡 Best Practices

1. **Rate Limiting**: Script includes 1-second delay between requests
2. **Fallback**: Tries Unsplash first, then Pexels
3. **Attribution**: Photographer credits are saved
4. **Caching**: Downloaded images are saved locally
5. **Error Handling**: Graceful failures with logging

---

## 🐛 Troubleshooting

### "401 Unauthorized"
- Check API key is correct
- Ensure key is in `.env` file
- Restart server after adding key

### "403 Forbidden"
- Rate limit exceeded
- Wait 1 hour or use Pexels as backup

### "No images found"
- Try different search terms
- Check internet connection
- Verify API services are online

---

## 📚 Resources

- [Unsplash API Docs](https://unsplash.com/documentation)
- [Pexels API Docs](https://www.pexels.com/api/documentation/)
- [Rate Limits Info](https://unsplash.com/documentation#rate-limiting)
