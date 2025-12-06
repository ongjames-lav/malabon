# 🔧 Troubleshooting & Support Guide

## ✅ Everything Working? Great!

If both servers are running without errors, your app is ready to use:
- **Frontend**: http://localhost:3001 ✅
- **Backend**: http://localhost:5000 ✅
- **Database**: MongoDB Connected ✅

---

## 🐛 Common Issues & Solutions

### Issue 1: Port 3000 Already in Use

**Symptom**: Error about port 3000 being in use

**Solution**: The app automatically uses port 3001
- Visit: http://localhost:3001 ✅
- Check terminal output for which port is being used

---

### Issue 2: Cannot Access on Mobile Device

**Symptom**: Mobile can't reach http://192.168.x.x:3001

**Causes & Solutions**:

1. **Different Networks**
   - Problem: Mobile on WiFi, PC on Ethernet (different networks)
   - Solution: Connect both to same WiFi network

2. **Wrong IP Address**
   - Problem: Used wrong IPv4 address
   - Solution: Run `ipconfig` and look for "IPv4 Address" (192.168.x.x)
   - Wrong: 127.0.0.1, localhost
   - Correct: 192.168.x.x

3. **Firewall Blocking**
   - Problem: Windows Firewall blocking port 3001
   - Solution: 
     - Windows Defender Firewall → Allow app through firewall
     - Or temporarily disable for testing

4. **Port Not Accessible**
   - Problem: Port 3001 not forwarded/exposed
   - Solution: Ensure router allows port access (home network is usually fine)

---

### Issue 3: App Won't Start / Port Already in Use

**Symptom**: Cannot start server because port is occupied

**Solutions**:

**Option A: Kill the Process**
```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace XXXX with PID)
taskkill /PID XXXX /F
```

**Option B: Use Different Port**
```powershell
# For client, the app auto-uses next available port
npm run dev  # Will use 3002, 3003, etc if 3001 busy
```

---

### Issue 4: MongoDB Connection Failed

**Symptom**: ❌ MongoDB not connecting

**Error Signs**:
```
❌ MongoDB connection error
❌ Cannot connect to database
```

**Solutions**:

1. **Check Connection String**
   - File: `server/.env`
   - Verify: `MONGODB_URI` is correct
   - Test: Visit the MongoDB Atlas URL

2. **Network Access**
   - Go to MongoDB Atlas Dashboard
   - Security → Network Access
   - Add your IP address (or 0.0.0.0 for development)

3. **IP Whitelist**
   - MongoDB Atlas: Add 0.0.0.0/0 (all IPs) for local dev
   - In production: Add specific IP only

4. **Connection String Format**
   ```
   ✅ Correct: mongodb+srv://user:pass@cluster.mongodb.net/dbname
   ❌ Wrong: mongodb://user:pass@localhost:27017
   ```

---

### Issue 5: Search Not Working

**Symptom**: Search returns no results or errors

**Diagnosis Steps**:

1. **Check Backend Running**
   ```
   http://localhost:5000/api/foods
   ```
   Should return JSON data

2. **Check Browser Console** (F12 → Console)
   - Look for error messages
   - Common: CORS error, 404 not found

3. **Verify API URL**
   - File: `client/.env.local`
   - Should be: `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

4. **Check Database**
   - MongoDB should have data
   - Run: `node seed.js` to add sample data

5. **Common Errors**:
   ```
   CORS Error: Backend and frontend on different origins
   → Check CORS settings in server/index.js
   
   404 Error: API endpoint not found
   → Verify API route exists (server/routes/)
   
   Network Error: Can't reach backend
   → Check backend is running on port 5000
   ```

---

### Issue 6: Images Not Loading

**Symptom**: Broken image icons instead of pictures

**Causes & Solutions**:

1. **Wrong Image Path**
   ```
   ❌ /images/food.jpg
   ✅ /assets/images/food/food.jpg
   ```

2. **Image Doesn't Exist**
   - Check: `public/assets/images/` folder
   - Add missing images or use placeholder

3. **Image Service Down**
   - Check: `server/services/imageService.js`
   - Verify: External image APIs working

4. **CORS Issue with External Images**
   - Problem: Can't load images from other domains
   - Solution: Configure CORS headers

---

### Issue 7: App Runs But Looks Bad on Mobile

**Symptom**: Layout broken or text too small on phone

**Solutions**:

1. **Clear Browser Cache**
   ```
   Desktop: Ctrl+Shift+R (Hard Refresh)
   Mobile: Settings → Clear Cache
   ```

2. **Check Viewport Setting**
   - File: `client/app/layout.tsx`
   - Should have viewport export ✅

3. **Verify Responsive Classes**
   - Inspect element (F12)
   - Check for Tailwind classes: `sm:`, `md:`, `lg:`
   - Clear browser cache if old CSS cached

4. **Test in Fresh Browser Window**
   - Sometimes CSS caching causes issues
   - Open in Incognito/Private window

---

### Issue 8: Slow Performance on Mobile

**Symptom**: App feels sluggish on mobile device

**Solutions**:

1. **Check Network Speed**
   - Use DevTools → Network tab
   - Look for slow requests
   - Mobile networks are slower than WiFi

2. **Disable Animations Temporarily**
   - DevTools → Rendering → Paint flashing
   - Check if animations are smooth

3. **Reduce Image Quality**
   - Images are main performance bottleneck
   - Use optimized/compressed images

4. **Check CPU Usage**
   - DevTools → Performance tab
   - Record a session, look for long tasks
   - Reduce JavaScript execution

5. **Network Throttling Test**
   - DevTools → Network tab
   - Select "4G" or "Slow 4G"
   - Test how app performs

---

### Issue 9: CORS Errors

**Symptom**: Console shows CORS error when accessing API

**Error**:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**: Already configured ✅

But if you still see it:

1. **Check Backend CORS**
   ```javascript
   // server/index.js should have:
   app.use(cors());
   ```

2. **Restart Backend**
   ```powershell
   npm run dev  # Restart server
   ```

3. **Verify Frontend URL**
   - Should be: `http://localhost:3001`
   - Not: `http://127.0.0.1:3001`

---

### Issue 10: Terminal Keeps Printing Errors

**Symptom**: Lots of warnings/errors in terminal

**Most Are Safe** ✅
- NextJS compilation warnings
- Metadata viewport warnings (fixed)
- Unused variables (non-critical)

**What To Watch For** ⚠️
```
Server Error: ❌ Critical
Cannot find module: ❌ Critical
MongoDB error: ❌ Critical

Others: ⚠️ Usually safe
```

---

## 📊 Debugging Tips

### 1. Browser Console (F12)
```
Errors in red = Critical issues
Warnings in yellow = Can usually ignore
Right-click → Copy full message for debugging
```

### 2. Network Tab (F12 → Network)
```
Red = Failed requests (errors)
Yellow/Green = Successful requests
Check: Status codes (200 = good, 404 = not found, 500 = server error)
```

### 3. Terminal Output
```
✅ "Ready" = App successfully started
✅ "MongoDB Connected" = Database connected
❌ "Error" = Critical issue (red text)
⚠️ "Warning" = Usually safe (yellow text)
```

### 4. Mobile DevTools
```
F12 on desktop:
- Device emulation (Ctrl+Shift+M)
- Touch event simulation
- Network throttling
- Performance recording
```

---

## 🔍 Quick Diagnostics

### Check Backend Health
```powershell
curl http://localhost:5000/api/foods
# Should return JSON array, not error
```

### Check Frontend Loading
```
Open http://localhost:3001
# Should show Taste of Malabon homepage
```

### Check Database Connection
```
Look at backend terminal
Should show: "✅ MongoDB Connected"
```

### Check Mobile Accessibility
```
Get IP: ipconfig
Open: http://[your-ip]:3001
# Should load on mobile
```

---

## 📝 Error Messages & What They Mean

### "Port 3000/3001 is in use"
- **Meaning**: Another app is using that port
- **Fix**: Kill the process or use next available port

### "Cannot connect to database"
- **Meaning**: MongoDB connection failed
- **Fix**: Check connection string in .env, verify network access

### "404 not found"
- **Meaning**: URL doesn't exist
- **Fix**: Check API endpoint path, verify route exists

### "CORS error"
- **Meaning**: Browser blocked cross-origin request
- **Fix**: Ensure CORS enabled in backend

### "Image not found"
- **Meaning**: Image path is wrong or file missing
- **Fix**: Check public/assets/ folder, verify path

---

## ✅ Verification Checklist

Run through these to verify everything works:

- [ ] Backend server runs: `npm run dev` in server folder
- [ ] Frontend server runs: `npm run dev` in client folder
- [ ] Can access: http://localhost:3001
- [ ] MongoDB shows "Connected" in terminal
- [ ] App loads without errors (F12 console)
- [ ] Search works (type in search bar)
- [ ] Navigation works (click links)
- [ ] Mobile view works (Ctrl+Shift+M)
- [ ] Images load (not broken)
- [ ] Buttons clickable (not disabled)

---

## 📞 Need More Help?

### What to Check First
1. Terminal output (both windows)
2. Browser console (F12)
3. Network tab (F12)
4. Environment variables (.env files)
5. Port availability (netstat)

### Information to Collect
- Exact error message
- Steps to reproduce
- Expected vs actual result
- System info (Windows/Mac, Node version)

### If Still Stuck
1. Restart both servers
2. Clear browser cache (Ctrl+Shift+R)
3. Check all .env files
4. Verify MongoDB connection
5. Check firewalls

---

## 🚀 Everything Working?

If all checks pass:
✅ **Your app is ready to use!**

Visit: **http://localhost:3001**

Enjoy your mobile-optimized Taste of Malabon app! 🎉
