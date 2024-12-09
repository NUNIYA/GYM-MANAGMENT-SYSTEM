const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  isStudent: {
    type: Boolean,
    required: true
  },
  studentIdPhoto: {
    type: String,
    required: function() {
      return this.isStudent;
    }
  },
  selectedPackage: {
    type: String,
    required: true
  },
  paymentProof: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  membershipStatus: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active'
  }
});

module.exports = mongoose.model('Member', memberSchema);