import mongoose from 'mongoose';
import validator from 'validator';

const Topic = mongoose.model('Topic', {
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
  order: {
    type: Number,
    required: true,
  },
  children: [{
    type: {
      type: String,
      required: true,
    },
    resourceUrl: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: '{VALUE} is an invalid url',
      },
    },
    language: {
      type: String,
    },
    title: {
      type: String,
    },
  }],
}, 'Topics');

export default Topic;
