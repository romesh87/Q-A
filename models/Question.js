const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  text: {
    type: String,
    required: true
  },

  answers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },

      date: {
        type: Date,
        default: Date.now
      },

      text: {
        type: String,
        required: true
      },

      upvotes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
          }
        }
      ],

      isFavourite: {
        type: Boolean,
        default: false
      }
    }
  ]
});

Schema.index({ text: 'text' });

module.exports = mongoose.model('question', Schema);
