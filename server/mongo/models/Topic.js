const mongoose = require('mongoose');
const validator = require('validator');

{
  "description": "General overview of linear data structures, terminology, and concepts that will be covered in this topic.",
  "children": [
    {
      "type": "article",
      "resourceUrl": "https://s3.amazonaws.com/algorithm-helper/content/categories/data-structures/lists/introduction.md"
    }
  ]
},

const Topic = mongoose.model('Topic', {
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
  }]
});

module.exports = { Topic };
