const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide treatment name'],
    },
    type: {
      type: String,
      enum: ['organic', 'chemical'],
      required: true,
    },
    disease: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disease',
      required: true,
    },
    activeIngredient: String,
    dosage: {
      amount: Number,
      unit: String, // 'ml', 'g', 'kg', 'liters'
      perArea: String, // 'per hectare', 'per acre'
    },
    applicationMethod: String,
    frequency: String,
    daysUntilHarvest: Number,
    cost: Number,
    availability: String,
    sideEffects: [String],
    instructions: String,
    efficacy: Number, // 0-100 percentage
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Treatment', treatmentSchema);
