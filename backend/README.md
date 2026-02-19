# Smart Crop-Health Advisory App - Backend API

A comprehensive Node.js/Express backend for an AI-powered agricultural advisory system that helps farmers detect crop diseases, get treatment recommendations, and receive weather alerts.

## Features

- **User Management**: Registration and authentication for farmers, agro-vets, and pharmacies
- **Disease Detection**: AI-powered crop disease detection using image analysis
- **Treatment Recommendations**: Database of organic and chemical treatments with efficacy ratings
- **Location Services**: Find nearby agro-vets and pharmacies
- **SMS Alerts**: Weather and pest alerts via Twilio SMS
- **Geolocation**: Store and query based on geographic coordinates

## Prerequisites

- Node.js (v14+)
- MongoDB
- Environment variables (see .env.example)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

## Running the Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Disease Detection
- `POST /api/diseases/detect` - Detect disease from image
- `GET /api/diseases/history` - Get detection history
- `PUT /api/diseases/:detectionId/feedback` - Provide feedback

### Treatments
- `GET /api/treatments` - Get all treatments
- `GET /api/treatments/disease/:diseaseId` - Get treatments for disease
- `GET /api/treatments/:id` - Get treatment details
- `POST /api/treatments/:treatmentId/review` - Add review

### Location
- `GET /api/location/nearby` - Find nearby agro-vets/pharmacies
- `GET /api/location/my-location` - Get user location
- `PUT /api/location/update-location` - Update location

### Alerts
- `GET /api/alerts` - Get user alerts
- `POST /api/alerts` - Create alert
- `PUT /api/alerts/:alertId/read` - Mark alert as read
- `POST /api/alerts/weather/broadcast` - Broadcast weather alert

## Database Models

- **User**: Farmers, agro-vets, pharmacies
- **Crop**: Crop types and details
- **Disease**: Crop diseases and symptoms
- **Treatment**: Treatment options
- **DiseaseDetection**: Detection records
- **Alert**: Notifications

## Environment Variables Required

```
PORT
NODE_ENV
MONGODB_URI
JWT_SECRET
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
DISEASE_DETECTION_API_KEY
DISEASE_DETECTION_API_URL
GOOGLE_MAPS_API_KEY
FRONTEND_URL
```

## License

ISC
