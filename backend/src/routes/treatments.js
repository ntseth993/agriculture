const express = require('express');
const router = express.Router();
const {
  getTreatmentsForDisease,
  getAllTreatments,
  getTreatment,
  addReview,
} = require('../controllers/treatmentController');
const { authenticate } = require('../middleware/auth');

router.get('/', getAllTreatments);
router.get('/disease/:diseaseId', getTreatmentsForDisease);
router.get('/:id', getTreatment);
router.post('/:treatmentId/review', authenticate, addReview);

module.exports = router;
