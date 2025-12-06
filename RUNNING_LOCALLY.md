# Quick Reference - Getting Started

## 🚀 Fastest Way to Start

### Terminal 1 - Backend Server
```powershell
cd c:\Users\admin\OneDrive\Desktop\malfinf\server
npm run dev
```
✅ Runs on: **http://localhost:5000**

### Terminal 2 - Frontend Server  
```powershell
cd c:\Users\admin\OneDrive\Desktop\malfinf\client
npm run dev
```
✅ Runs on: **http://localhost:3001**

### 3. Open Browser
Visit: **http://localhost:3001**

---

## 📱 Testing on Mobile

### On Same Computer (Different Window)
Press `Ctrl+Shift+M` in Chrome to open Device Emulator

### On Actual Mobile Device
1. Get your PC IP: `ipconfig` (look for IPv4 Address)
2. On mobile browser: `http://[your-ip]:3001`
3. Example: `http://192.168.1.100:3001`

---

## 📊 What's Responsive

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| **Hero Title** | 4xl | 5xl | 8xl |
| **Hero Text** | base | lg | 2xl |
| **Stats Grid** | 1 col | 2 col | 3 col |
| **Buttons** | Full width | Full width | Auto width |
| **Navigation** | Menu icon | Menu icon | Inline |
| **Spacing** | Compact | Normal | Generous |

---

## 🎯 Key Improvements Made

✅ **Text Scaling** - All text sizes adjust for mobile  
✅ **Touch Targets** - Buttons are 44px+ for easy tapping  
✅ **Layout** - Single column on mobile, multi-column on larger screens  
✅ **Spacing** - Proper padding/margin that scales with screen  
✅ **Search** - Mobile-friendly with scrollable results  
✅ **Performance** - Optimized animations for smooth mobile UX  

---

## 🛠️ Common Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Add sample data
node seed.js

# Run linter
npm run lint
```

---

## 🔗 API Endpoints

```
http://localhost:5000/api/foods
http://localhost:5000/api/businesses
http://localhost:5000/api/culture
```

---

## 📝 Environment Variables

### Server (.env)
- ✅ MongoDB URI: **Configured**
- ✅ Google API Key: **Configured**
- ✅ Port: **5000**

### Client (.env.local)
- ✅ API URL: **http://localhost:5000/api**

---

## 🎨 Responsive Breakpoints

```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```

---

## 💡 Tips

1. **Keep browser open** while development server is running
2. **Use DevTools** (F12) to test different screen sizes
3. **Check mobile** on actual device for best testing
4. **Clear cache** if changes don't appear (Ctrl+Shift+R)
5. **Check console** (F12) for any errors

---

## ✨ Features Working

🍜 Food discovery system  
🏪 Restaurant listings  
📚 Cultural stories  
🔍 Search autocomplete  
⭐ Ratings and reviews  
📍 Location information  
✨ Smooth animations  
🌙 Dark theme  
📱 Full mobile support  

---

**Everything is ready to go! Your mobile-optimized app is live at http://localhost:3001** 🎉
