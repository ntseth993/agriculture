const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "localhost:*", "http://localhost:*"],
    },
  },
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from frontend build
const buildPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(buildPath));

// Serve uploaded files
const uploadsPath = path.join(__dirname, '../../uploads');
app.use('/uploads', express.static(uploadsPath));

// Routes
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/crops', require('./routes/crops'));
  app.use('/api/diseases', require('./routes/diseases'));
  app.use('/api/treatments', require('./routes/treatments'));
  app.use('/api/location', require('./routes/location'));
  app.use('/api/alerts', require('./routes/alerts'));
} catch (error) {
  console.warn('Warning loading routes:', error.message);
}

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server running' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
