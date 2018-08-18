const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, DB_NAME, CATEGORIES_COLLECTION_NAME } = require('./dbUtils');
const log = require('../../utils/log');

/**
 * Gets all of the category data from MongoDB.
 */
const getCategoryData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        reject(new Error('Error connecting to MongoDB'));
        return;
      }

      const db = client.db(DB_NAME);
      const collection = db.collection(CATEGORIES_COLLECTION_NAME);

      collection.find({}, {
        fields: {
          key: true,
          slug: true,
          title: true,
          description: true,
          colorKey: true,
          order: true,
          children: true,
        },
      }).toArray((err, result) => {
        client.close();

        if (error) {
          reject(new Error('Error retrieving Categories data from MongoDB'));
          return;
        }

        resolve(result);
      });
    });
  });
};

/**
 * Gets the category data for a specific category by key from MongoDB.
 *
 * @param {string} categoryKey
 */
const getCategoryDataByKey = categoryKey => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        reject(new Error('Error connecting to MongoDB'));
        return;
      }

      const db = client.db(DB_NAME);
      const collection = db.collection(CATEGORIES_COLLECTION_NAME);

      collection.findOne({
        key: categoryKey,
      }, {
        fields: {
          key: true,
          slug: true,
          title: true,
          description: true,
          colorKey: true,
          order: true,
          children: true,
        },
      }, (err, result) => {
        client.close();

        if (err || result === null) {
          reject(new Error('Error retrieving Category data by key from MongoDB'));
          return;
        }

        resolve(result);
      });
    });
  });
};












/**
 * Gets all of the category data by key and colorKey from MongoDB.
 */
const getCategoryColorKeyMapping = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        reject(new Error('Error connecting to MongoDB'));
        return;
      }

      const db = client.db(DB_NAME);
      const collection = db.collection(CATEGORIES_COLLECTION_NAME);

      collection.find({}, {
        fields: {
          key: true,
          slug: true,
          colorKey: true,
        },
      }).toArray((err, result) => {
        client.close();

        if (error) {
          reject(new Error('Error retrieving Catgories data from MongoDB'));
          return;
        }

        resolve(result);
      });
    });
  });
};

module.exports = {
  getCategoryData,
  getCategoryDataByKey,
  getCategoryColorKeyMapping,
};
