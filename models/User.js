const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  passwordChangedAt: {
    type: Date
  },

  passwordResetToken: {
    type: String
  },

  passwordResetExpiresIn: {
    type: Date
  },

  avatar: {
    type: String,
    default: 'default.jpg'
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', Schema);
