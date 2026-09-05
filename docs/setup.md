# Quickstart & Setup Guide

## Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v20/v24)
- npm (v9.0.0 or higher)

## Zero-Config Quickstart (Demo Mode)

You can clone and launch the entire system immediately without entering any API keys:

```bash
# 1. Install root dependencies and packages
npm install
npm --prefix backend install
npm --prefix frontend install

# 2. Launch both backend server and frontend HUD simultaneously
npm run dev
```

Your browser will launch the HUD at `http://localhost:5173`.
The backend will run on `http://localhost:5000`.

## Production Build & Launch

```bash
# Build both packages
npm run build

# Start production server
npm run start
```

## Adding OpenAI / Weather API Keys (Optional)

1. Copy `.env.example` to `backend/.env`:
   ```bash
   cp .env.example backend/.env
   ```
2. Set your keys:
   ```env
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-...
   OPENWEATHER_API_KEY=your_key_here
   ```
3. Restart backend.
