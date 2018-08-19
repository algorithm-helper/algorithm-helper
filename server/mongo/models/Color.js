const mongoose = require('mongoose');

const Color = mongoose.model('Color', {
  key: {
    type: Number,
    required: true,
    unique: true,
  },
  hexCode: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
}, 'Colors');

module.exports = Color;
