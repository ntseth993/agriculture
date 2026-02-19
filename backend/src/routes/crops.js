const express = require('express');
const router = express.Router();
const {
  verifyCrop,
  getCropDetails,
  getAllCrops,
  verifyAndDetect,
} = require('../controllers/cropController');
const { authenticate } = require('../middleware/auth');
const upload = require('../config/multer');

// Get all crops
router.get('/', getAllCrops);

// Get specific crop details
router.get('/:cropId', getCropDetails);

// Verify crop image
router.post('/verify', authenticate, upload.single('image'), verifyCrop);

// Verify and detect disease in one request
router.post('/verify-and-detect', authenticate, upload.single('image'), verifyAndDetect);

module.exports = router;
