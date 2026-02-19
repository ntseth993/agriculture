const express = require('express');
const router = express.Router();
const {
  createAlert,
  getUserAlerts,
  markAsRead,
  sendWeatherAlert,
} = require('../controllers/alertController');
const { authenticate } = require('../middleware/auth');

router.post('/', createAlert);
router.get('/', authenticate, getUserAlerts);
router.put('/:alertId/read', authenticate, markAsRead);
router.post('/weather/broadcast', authenticate, sendWeatherAlert);

module.exports = router;
