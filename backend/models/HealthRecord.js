const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  diseaseType: {
    type: String,
    enum: ['diabetes', 'heart'],
    required: true,
  },
  inputData: {
    type: Object,
    required: true,
  },
  prediction: {
    type: Number,
    required: true,
  },
  probability: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);