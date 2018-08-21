const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const MIN_FULL_NAME_LENGTH = 1;
const MIN_EMAIL_LENGTH = 1;
const MIN_PASSWORD_LENGTH = 8;

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function() {
  const user = this;
  return _.pick(user.toObject(), ['_id', 'fullName', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
}

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (err) {
    return Promise.reject(err);
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
