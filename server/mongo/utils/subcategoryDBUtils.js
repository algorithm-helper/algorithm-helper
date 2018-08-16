
const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, DB_NAME, SUBCATEGORIES_COLLECTION_NAME } = require('./dbUtils');
const log = require('../../utils/log');

const subcategoryParentToColorKey = {
  'data-structures': 1,
  'general-algorithms': 2,
  'strings': 3,
  'graphs': 4,
  'randomization': 5,
  'mathematics': 6,
  'dynamic-programming': 7,
  'algorithmic-analysis': 8,
  'software-engineering': 9,
};

/**
 * Maps each subcategory object with colorKey property.
 *
 * @param {Array} subcategories
 */
const mapSubcategoryWithColorKey = subcategories => {
  return subcategories.map(subcategory => ({
    ...subcategory,
    colorKey: subcategoryParentToColorKey[subcategory.parent],
  }));
};

/**
 * Gets all of the subcategory data from MongoDB
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
          description: true,
          imageUrl: true,
          parent: true,
        },
      }).toArray((err, result) => {
        client.close();

        if (error) {
          reject(new Error('Error retrieving Subcategories data from MongoDB'));
          return;
        }

        resolve(mapSubcategoryWithColorKey(result));
      });
    });
  });
};

module.exports = {
  getSubcategoryData,
};
