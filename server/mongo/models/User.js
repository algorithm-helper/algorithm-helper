const mongoose = require('mongoose');
const validator = require('validator');

const MIN_FULL_NAME_LENGTH = 1;
const MIN_EMAIL_LENGTH = 1;
const MIN_PASSWORD_LENGTH = 8;

const User = mongoose.model('User', {
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: MIN_FULL_NAME_LENGTH,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: MIN_EMAIL_LENGTH,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is an invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: MIN_PASSWORD_LENGTH,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
  completedItems: [{
    categoryKey: {
      type: String,
      required: true,
    },
    subcategoryKey: {
      type: String,
      required: true,
    },
    topicKey: {
      type: String,
      required: true,
    },
    topicItemType: {
      type: String,
      required: true,
    },
    dateCompleted: {
      type: Number,
      required: true,
    },
  }],
  bookmarks: [{
    categoryKey: {
      type: String,
      required: true,
    },
    subcategoryKey: {
      type: String,
      required: true,
    },
    topicKey: {
      type: String,
      required: true,
    },
    topicItemType: {
      type: String,
      required: true,
    },
    dateBookmarked: {
      type: Number,
      required: true,
    },
  }],
});

module.exports = { User };
