const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cv: {
    type: String,
    required: true
  },
  applicationLetter: {
    type: String,
    required: true
  },
  preferredCampus: {
    type: String,
    enum: ['4kilo', '6kilo'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Trainer', trainerSchema);