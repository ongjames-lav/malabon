# Deployment Guide - Taste of Malabon

This guide covers the steps to deploy the **Taste of Malabon** application to production. The project consists of a **Next.js Frontend** (`/client`) and an **Express.js Backend** (`/server`).

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB Database** (MongoDB Atlas recommended for production)
- **Git**

## Environment Variables

You need to set up environment variables for both the client and server.

### Backend (`/server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taste-of-malabon
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend (`/client/.env.local`)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

---

## Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) [Recommended]

This is the easiest way to deploy modern web apps.

#### 1. Deploy Backend (Railway/Render)
1.  Push your code to GitHub.
2.  Create a new project on **Railway** or **Render**.
3.  Connect your GitHub repository.
4.  Set the **Root Directory** to `server`.
5.  Add your **Environment Variables** (`MONGODB_URI`, `GOOGLE_API_KEY`, etc.).
6.  Deploy. You will get a URL (e.g., `https://malabon-api.up.railway.app`).

#### 2. Deploy Frontend (Vercel)
1.  Go to **Vercel** and import your GitHub repository.
2.  Set the **Root Directory** to `client`.
3.  Add the **Environment Variable**:
    - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://malabon-api.up.railway.app/api`).
4.  Deploy.

### Option 2: VPS (DigitalOcean, AWS, Linode)

For full control, you can deploy both on a single VPS using Docker or PM2.

#### Using PM2 (Process Manager)

1.  **SSH into your VPS**.
2.  **Clone the repository**:
    ```bash
    git clone https://github.com/ongjames-lav/malabon.git
    cd malabon
    ```
3.  **Setup Backend**:
    ```bash
    cd server
    npm install
    # Create .env file
    npm run start
    # Or use PM2
    pm2 start index.js --name "malabon-api"
    ```
4.  **Setup Frontend**:
    ```bash
    cd ../client
    npm install
    # Create .env.local file
    npm run build
    npm start
    # Or use PM2
    pm2 start npm --name "malabon-client" -- start
    ```
5.  **Setup Nginx** as a reverse proxy to serve the frontend on port 80/443 and backend on `/api`.

---

## Database Setup (MongoDB Atlas)

1.  Create a free account on [MongoDB Atlas](https://www.mongodb.com/atlas).
2.  Create a new Cluster (Shared/Free tier is fine).
3.  Create a Database User (Username/Password).
4.  Get the **Connection String** (Select "Connect your application").
5.  Replace `<password>` with your user password in the connection string.
6.  Use this string as your `MONGODB_URI`.

## Seeding Production Data

After deploying the backend, you can populate the production database by running the seed script:

```bash
# Locally, pointing to production DB
MONGODB_URI=your_production_mongo_uri node server/seed.js
```

Or run it directly on the server console if you have access.
