/* eslint-disable */
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

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

UserSchema.methods.toJSON = function () {
  const user = this;
  return _.pick(user.toObject(), ['_id', 'fullName', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
}

UserSchema.statics.findByToken = function (token) {
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

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({ email })
  .then(user => {
    if (!user) {
      return Promise.reject(new Error('User does not exist'));
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
}

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema, 'Users');

module.exports = User;
