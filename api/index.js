const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../backend/.env')
});

const connectDB = require('../backend/src/config/database');

// Ensure DB connection
let dbConnected = false;

async function initializeDB() {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize database on first request
app.use(async (req, res, next) => {
  await initializeDB();
  next();
});

// Serve uploaded files
const uploadsPath = path.join(__dirname, '../backend/uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
try {
  app.use('/api/auth', require('../backend/src/routes/auth'));
  app.use('/api/crops', require('../backend/src/routes/crops'));
  app.use('/api/diseases', require('../backend/src/routes/diseases'));
  app.use('/api/treatments', require('../backend/src/routes/treatments'));
  app.use('/api/location', require('../backend/src/routes/location'));
  app.use('/api/alerts', require('../backend/src/routes/alerts'));
} catch (error) {
  console.warn('Warning loading routes:', error.message);
}

// Serve frontend static files
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Export for Vercel
module.exports = app;
