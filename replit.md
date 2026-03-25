# Crop Health Advisory App

## Overview
AI-powered crop disease detection and farm management system for farmers. Users can upload crop images, detect diseases using AI, find nearby agro-vets, receive weather/pest alerts, and chat with an AI agricultural expert.

## Architecture
- **Backend**: Express.js (Node.js) — `backend/src/server.js`, port 5000
- **Frontend**: React (Create React App) — built to `frontend/build/`, served by backend
- **Database**: MongoDB via Mongoose (optional — app runs in demo mode without it)
- **Auth**: JWT + Google OAuth (Google Identity Services); in-memory fallback when MongoDB is not configured

## Key Stack
- React 18, React Router v6, Framer Motion, Tailwind CSS
- Express 4, Mongoose 7, Helmet, CORS, Morgan
- Cloudinary (image uploads), Twilio (SMS alerts), OpenAI (disease detection + chat)
- `@react-oauth/google` for Google Sign-In

## Running the App
The backend serves both the API and the built React frontend:
```
cd backend && npm start
```
Frontend must be rebuilt after changes:
```
cd frontend && CI=false npm run build
```

## Admin Account
- **Email**: `admin@crophealth.ai`
- **Password**: `admin123`
- Auto-created on first startup when MongoDB is connected
- Admin panel at `/admin` — manage users, roles, bans

## User Roles
- `farmer` (default) — regular user
- `agro-vet` — agricultural veterinarian business
- `pharmacy` — crop/animal pharmacy
- `admin` — full admin panel access

## Features
1. **AI Crop Disease Detection** — Upload/capture crop image → OpenAI Vision analyzes with crop validation (rejects non-crop images). Falls back to realistic local database if no API key.
2. **AI Chat** — Real-time chat with agricultural AI expert at `/chat`. Supports all languages.
3. **Admin Panel** — At `/admin`, admins can view all users, change roles, ban/unban, delete users, and see platform stats.
4. **Multi-Language Support** — 8 languages: English, Kinyarwanda, Français, Kiswahili, Español, Arabic, Hindi, Português. Language switcher (🌐) in all navbars, saved to localStorage.
5. **Location Services** — Find nearby agro-vets and pharmacies on map.
6. **Alerts** — Weather and pest outbreak notifications.

## Environment Variables Required
| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string (required) |
| `JWT_SECRET` | JWT signing secret (required) |
| `OPENAI_API_KEY` | AI disease detection + chat (uses gpt-4o) |
| `OPENAI_MODEL` | Override OpenAI model name |
| `CLOUDINARY_CLOUD_NAME` | Image storage |
| `CLOUDINARY_API_KEY` | Image storage |
| `CLOUDINARY_API_SECRET` | Image storage |
| `TWILIO_ACCOUNT_SID` | SMS alerts |
| `TWILIO_AUTH_TOKEN` | SMS alerts |
| `TWILIO_PHONE_NUMBER` | SMS alerts |

## Google Sign-In Setup
Client ID: `970571415745-h2uac1cfg1hgnctre8m0pqtpttlfm83t.apps.googleusercontent.com`

**Required**: Add the Replit domain as an authorized JavaScript origin in Google Cloud Console:
`https://<YOUR_REPLIT_DOMAIN>.replit.dev`

## Pages
- `/` — Landing page (hero slideshow, features, gallery, testimonials, pricing)
- `/login` — Sign in (email/password + Google)
- `/register` — Create account (email/password + Google)
- `/dashboard` — Main user dashboard with quick actions, language switcher (protected)
- `/detect` — AI crop disease detection with crop validation (protected)
- `/chat` — AI agricultural chat assistant (protected)
- `/verify` — Crop verification (protected)
- `/locations` — Map of nearby agro-vets (protected)
- `/admin` — Admin panel for user management (admin only)

## Key Files
- `backend/src/services/aiService.js` — OpenAI vision analysis + crop validation
- `backend/src/controllers/chatController.js` — AI chat with knowledge base fallback
- `backend/src/controllers/adminController.js` — Admin user management
- `backend/src/routes/admin.js` — Admin API routes
- `backend/src/routes/chat.js` — Chat API routes
- `frontend/src/context/LanguageContext.js` — Multi-language system (8 languages)
- `frontend/src/components/LanguageSwitcher.js` — Language dropdown component
- `frontend/src/pages/AdminPage.js` — Admin panel UI
- `frontend/src/pages/ChatPage.js` — AI chat UI

## Design
Dark theme (`bg-gray-950`), green accent (`green-500`), glassmorphism cards, Unsplash agriculture imagery.
