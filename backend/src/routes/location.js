const express = require('express');
const router = express.Router();
const {
  findNearby,
  getUserLocation,
  updateLocation,
} = require('../controllers/locationController');
const { authenticate } = require('../middleware/auth');

router.get('/nearby', authenticate, findNearby);
router.get('/my-location', authenticate, getUserLocation);
router.put('/update-location', authenticate, updateLocation);

module.exports = router;
