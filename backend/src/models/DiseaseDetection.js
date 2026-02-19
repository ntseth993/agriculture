const mongoose = require('mongoose');

const diseaseDetectionSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    detectedDisease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disease',
    },
    confidence: Number, // 0-1 confidence score
    symptoms: [String],
    recommendedTreatments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment',
      },
    ],
    userFeedback: {
      isAccurate: Boolean,
      correctDisease: String,
      suggestions: String,
    },
    fieldLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: [Number],
    },
    status: {
      type: String,
      enum: ['pending', 'analyzed', 'treated', 'archived'],
      default: 'pending',
    },
    notes: String,
  },
  { timestamps: true }
);

diseaseDetectionSchema.index({ fieldLocation: '2dsphere' });

module.exports = mongoose.model('DiseaseDetection', diseaseDetectionSchema);
