# MongoDB Atlas Setup Guide

## Step-by-Step Instructions

### 1. Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with Google, email, or GitHub
3. Complete the registration

### 2. Create a Free Cluster

1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you (e.g., Singapore for Philippines)
5. Cluster Name: `TasteOfMalabon` (or keep default)
6. Click **"Create Cluster"** (takes 3-5 minutes)

### 3. Create Database User

1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `malabonuser` (or your choice)
5. Password: Click **"Autogenerate Secure Password"** and **COPY IT**
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 4. Configure Network Access

1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0`
4. Click **"Confirm"**

### 5. Get Connection String

1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string (looks like):
   ```
   mongodb+srv://malabonuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 6. Update Your `.env` File

1. Open `server/.env`
2. Replace `<password>` with your actual password
3. Add database name before the `?`:

```env
MONGODB_URI=mongodb+srv://malabonuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taste-of-malabon?retryWrites=true&w=majority
```

**Example:**
```env
MONGODB_URI=mongodb+srv://malabonuser:MySecurePass123@cluster0.abc123.mongodb.net/taste-of-malabon?retryWrites=true&w=majority
```

### 7. Test the Connection

```bash
cd server
node seed.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Created 2 businesses
✅ Created 2 foods
✅ Created 2 cultural stories
🎉 Database seeded successfully!
```

### 8. Start Your Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## Alternative: Local MongoDB (Windows)

If you prefer local installation:

### 1. Download MongoDB
- Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Select: **Windows** → **MSI**
- Download and run installer

### 2. Install
- Choose **"Complete"** installation
- Install **MongoDB Compass** (GUI tool)
- Install as **Windows Service** (recommended)

### 3. Start MongoDB
MongoDB should start automatically as a service. If not:
```bash
net start MongoDB
```

### 4. Use Default Connection
Your `server/.env` already has:
```env
MONGODB_URI=mongodb://localhost:27017/taste-of-malabon
```

### 5. Test
```bash
cd server
node seed.js
```

---

## Troubleshooting

### Error: "Authentication failed"
- Double-check username and password in connection string
- Ensure password doesn't contain special characters (or URL encode them)

### Error: "Network timeout"
- Check Network Access in Atlas (allow 0.0.0.0/0)
- Check your internet connection

### Error: "ECONNREFUSED"
- Local MongoDB: Ensure MongoDB service is running
- Atlas: Check connection string format

---

## Quick Commands

```bash
# Seed database
cd server
node seed.js

# Start backend
cd server
npm run dev

# Start frontend (new terminal)
cd client
npm run dev
```

---

## What's Next?

After MongoDB is set up:
1. ✅ Seed the database
2. ✅ Start both servers
3. 🌐 Visit http://localhost:3000
4. 🎉 Enjoy your Taste of Malabon app!
