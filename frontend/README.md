# Smart Crop-Health Advisory App - Frontend

A React-based web application for farmers to detect crop diseases, find nearby agro-services, and receive agricultural alerts.

## Features

- **Disease Detection**: Capture images and get AI-powered disease diagnosis
- **Treatment Recommendations**: View organic and chemical treatment options
- **Location Services**: Find nearby agro-vets and pharmacies on interactive maps
- **Alerts Dashboard**: Receive and manage weather and pest alerts
- **User Authentication**: Secure login and registration

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with backend API URL:
```bash
REACT_APP_API_URL=http://localhost:5000
```

## Running the App

Development:
```bash
npm start
```

Production build:
```bash
npm build
```

## Project Structure

```
src/
├── context/          # Auth context and state management
├── pages/           # Page components
├── components/      # Reusable components
├── services/        # API services
├── utils/           # Utility functions
└── App.js          # Main app component
```

## Key Components

- **AuthContext**: Handles user authentication
- **CameraComponent**: Camera capture for disease detection
- **MapComponent**: Interactive map using Leaflet
- **AlertsPanel**: Displays user alerts

## Dependencies

- react-router-dom: Navigation
- axios: HTTP client
- react-leaflet: Maps integration
- tailwindcss: Styling
- react-hot-toast: Notifications
- react-icons: Icon library

## License

ISC
