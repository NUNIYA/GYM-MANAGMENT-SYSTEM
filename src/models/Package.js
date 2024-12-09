const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  sessions: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Package', packageSchema);