const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide disease name'],
    },
    scientificName: String,
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
    description: String,
    symptoms: [String],
    cause: String, // 'bacterial', 'fungal', 'viral', 'pest', 'nutritional'
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe'],
    },
    imageUrl: String,
    treatments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment',
      },
    ],
    preventionTips: [String],
    affectedCropStages: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Disease', diseaseSchema);
