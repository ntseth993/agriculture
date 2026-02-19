const Treatment = require('../models/Treatment');
const Disease = require('../models/Disease');

// Get treatments for a disease
exports.getTreatmentsForDisease = async (req, res) => {
  try {
    const { diseaseId } = req.params;
    const { type } = req.query; // Filter by 'organic' or 'chemical'

    const query = { disease: diseaseId };
    if (type) {
      query.type = type;
    }

    const treatments = await Treatment.find(query)
      .populate('disease')
      .sort({ efficacy: -1 });

    res.status(200).json({
      success: true,
      count: treatments.length,
      treatments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all treatments
exports.getAllTreatments = async (req, res) => {
  try {
    const { type, minEfficacy } = req.query;

    const query = {};
    if (type) query.type = type;
    if (minEfficacy) query.efficacy = { $gte: minEfficacy };

    const treatments = await Treatment.find(query)
      .populate('disease')
      .sort({ efficacy: -1 });

    res.status(200).json({
      success: true,
      count: treatments.length,
      treatments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get treatment by ID
exports.getTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id).populate('disease');

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    res.status(200).json({
      success: true,
      treatment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add review to treatment
exports.addReview = async (req, res) => {
  try {
    const { treatmentId } = req.params;
    const { rating, comment } = req.body;

    const treatment = await Treatment.findById(treatmentId);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    const review = {
      userId: req.user.id,
      rating,
      comment,
      date: new Date(),
    };

    treatment.reviews.push(review);
    await treatment.save();

    res.status(201).json({
      success: true,
      treatment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
