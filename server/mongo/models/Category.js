const mongoose = require('mongoose');

const Category = mongoose.model('Category', {
  key: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  order: {
    type: Number,
    required: true,
  },
}, 'Categories');

module.exports = Category;
