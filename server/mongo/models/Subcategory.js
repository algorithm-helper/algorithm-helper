const mongoose = require('mongoose');
const validator = require('validator');

const Subcategory = mongoose.model('Subcategory', {
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
  parent: {
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
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is an invalid url',
    },
  },
  orderKey: {
    type: Number,
    required: true,
  },
  children: {
    type: [String],
    required: true,
  },
});

module.exports = { Subcategory };
