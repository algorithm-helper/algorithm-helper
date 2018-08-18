const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, DB_NAME, COLORS_COLLECTION_NAME } = require('./dbUtils');

const Colors = require('../models/Colors');
const log = require('../../utils/log');

/**
 * Gets all the color data from MongoDB.
 */
const getColorData = () => {
  return new Promise((resolve, reject) => {
    Colors.find({}, {
      key: 1,
      hexCode: 1,
      description: 1,
    })
    .then(result => {
      if (result === null) {
        reject(new Error('Error retrieving Color data by key from MongoDB'));
        return;
      }

      console.log(test);

      resolve(result);

    })
    .catch(err => {
      if (err) {
        reject(new Error('Error retrieving Color data by key from MongoDB'));
        return;
      }

      reject(err);
    });
  });
};

module.exports = {
  getColorData,
};
