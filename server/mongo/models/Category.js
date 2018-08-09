const mongoose = require('mongoose');
const validator = require('validator');

const Category = mongoose.model('Category', {
  key: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  orderKey: {
    type: Number,
    required: true,
  },
  colorKey: {
    type: Number,
    required: true,
  },
  children: {
    type: [String],
    required: true,
  },
});

module.exports = { Category };
