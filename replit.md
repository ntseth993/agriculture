# Crop Health Advisory App

## Overview
AI-powered crop disease detection and farm management system for farmers. Users can upload crop images, detect diseases using AI, find nearby agro-vets, and receive weather/pest alerts.

## Architecture
- **Backend**: Express.js (Node.js) — `backend/src/server.js`, port 5000
- **Frontend**: React (Create React App) — built to `frontend/build/`, served by backend
- **Database**: MongoDB via Mongoose
- **Auth**: JWT + Google OAuth (Google Identity Services)

## Key Stack
- React 18, React Router v6, Framer Motion, Tailwind CSS
- Express 4, Mongoose 7, Helmet, CORS, Morgan
- Cloudinary (image uploads), Twilio (SMS alerts), OpenAI (disease detection)
- `@react-oauth/google` for Google Sign-In

## Running the App
The backend serves both the API and the built React frontend:
```
cd backend && npm start
```
Frontend must be rebuilt after changes:
```
cd frontend && npm run build
```

## Environment Variables Required
| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string (required) |
| `JWT_SECRET` | JWT signing secret (required) |
| `OPENAI_API_KEY` | AI disease detection |
| `OPENAI_MODEL` | OpenAI model name |
| `CLOUDINARY_CLOUD_NAME` | Image storage |
| `CLOUDINARY_API_KEY` | Image storage |
| `CLOUDINARY_API_SECRET` | Image storage |
| `TWILIO_ACCOUNT_SID` | SMS alerts |
| `TWILIO_AUTH_TOKEN` | SMS alerts |
| `TWILIO_PHONE_NUMBER` | SMS alerts |
| `GOOGLE_TRANSLATE_API_KEY` | Multi-language support |

## Google Sign-In Setup
Client ID: `970571415745-h2uac1cfg1hgnctre8m0pqtpttlfm83t.apps.googleusercontent.com`

**Required**: Add the Replit domain as an authorized JavaScript origin in Google Cloud Console:
`https://<YOUR_REPLIT_DOMAIN>.replit.dev`

## Pages
- `/` — Landing page (hero slideshow, features, gallery, testimonials, pricing)
- `/login` — Sign in (email/password + Google)
- `/register` — Create account (email/password + Google)
- `/dashboard` — Main user dashboard (protected)
- `/detect` — AI disease detection (protected)
- `/verify` — Crop verification (protected)
- `/locations` — Map of nearby agro-vets (protected)

## Design
Dark theme (`bg-gray-950`), green accent (`green-500`), glassmorphism cards, Unsplash agriculture imagery.
