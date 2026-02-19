const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide crop name'],
    },
    scientificName: String,
    description: String,
    season: {
      type: String,
      enum: ['Kharif', 'Rabi', 'Summer', 'Year-round'],
    },
    soilType: [String],
    temperatureRange: {
      min: Number,
      max: Number,
    },
    waterRequirement: String,
    commonDiseases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crop', cropSchema);
