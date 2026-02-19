const express = require('express');
const router = express.Router();
const {
  detectDisease,
  getDetectionHistory,
  updateDetectionFeedback,
} = require('../controllers/diseaseDetectionController');
const { authenticate } = require('../middleware/auth');
const upload = require('../config/multer');

router.post('/detect', authenticate, upload.single('image'), detectDisease);
router.get('/history', authenticate, getDetectionHistory);
router.put('/:detectionId/feedback', authenticate, updateDetectionFeedback);

module.exports = router;
