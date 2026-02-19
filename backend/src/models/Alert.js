const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['weather', 'pest', 'disease', 'reminder'],
      required: true,
    },
    title: String,
    message: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
    data: mongoose.Schema.Types.Mixed,
    smsSent: {
      type: Boolean,
      default: false,
    },
    smsTimestamp: Date,
    read: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
