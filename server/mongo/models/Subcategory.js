const mongoose = require('mongoose');
const validator = require('validator');

const Subcategory = mongoose.model('Subcategory', {
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
  parent: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is an invalid url',
    },
  },
  children: {
    type: [String],
    required: true,
  },
}, 'Subcategories');

module.exports = Subcategory;
