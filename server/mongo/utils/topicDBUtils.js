const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, DB_NAME, TOPICS_COLLECTION_NAME } = require('./dbUtils');
const log = require('../../utils/log');

/**
 * Gets the topic data for a specific topic by key from MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 * @param {string} topicKey
 */
const getTopicDataByKey = (categoryKey, subcategoryKey, topicKey) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (error, client) => {
      if (error) {
        reject(new Error('Error connecting to MongoDB'));
        return;
      }

      const db = client.db(DB_NAME);
      const collection = db.collection(TOPICS_COLLECTION_NAME);

      collection.findOne({
        key: `${categoryKey}/${subcategoryKey}/${topicKey}`,
      }, {
        fields: {
          key: true,
          slug: true,
          title: true,
          parent: true,
          description: true,
          children: true,
        },
      }, (err, result) => {
        client.close();

        if (err || result === null) {
          reject(new Error('Error retrieving Topic data by key from MongoDB'));
          return;
        }

        resolve(result);
      });
    });
  });
};

module.exports = {
  getTopicDataByKey,
};
