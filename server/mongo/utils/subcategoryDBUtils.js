const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, DB_NAME, SUBCATEGORIES_COLLECTION_NAME } = require('./dbUtils');
const log = require('../../utils/log');

/**
 * Gets all of the subcategory data from MongoDB.
 */
const getSubcategoryData = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        reject(new Error('Error connecting to MongoDB'));
        return;
      }

      const db = client.db(DB_NAME);
      const collection = db.collection(SUBCATEGORIES_COLLECTION_NAME);

      collection.find({}, {
        fields: {
          key: true,
          slug: true,
          title: true,
          parent: true,
          description: true,
          imageUrl: true,
          order: true,
          children: true,
        },
      }).toArray((err, result) => {
        client.close();

        if (error) {
          reject(new Error('Error retrieving Subcategories data from MongoDB'));
          return;
        }

        resolve(result);
      });
    });
  });
};

/**
 * Gets the subcategory data for a specific subcategory by key from MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 */
const getSubcategoryDataByKey = (categoryKey, subcategoryKey) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        reject(new Error('Error connecting to MongoDB'));
        return;
      }

      const db = client.db(DB_NAME);
      const collection = db.collection(SUBCATEGORIES_COLLECTION_NAME);

      collection.findOne({
        key: `${categoryKey}/${subcategoryKey}`,
      }, {
        fields: {
          key: true,
          slug: true,
          title: true,
          parent: true,
          description: true,
          imageUrl: true,
          order: true,
          children: true,
        },
      }, (err, result) => {
        client.close();

        if (err || result === null) {
          reject(new Error('Error retrieving Subcategory data by key from MongoDB'));
          return;
        }

        resolve(result);
      });
    });
  });
};

module.exports = {
  getSubcategoryData,
  getSubcategoryDataByKey,
};
