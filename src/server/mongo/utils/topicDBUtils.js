const Topic = require('../models/Topic');

/**
 * Gets the topic data for a specific topic by key from MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 * @param {string} topicKey
 */
const getTopicDataByKey = (categoryKey, subcategoryKey, topicKey) => (
  Topic.findOne({
    key: `${categoryKey}/${subcategoryKey}/${topicKey}`,
  }, {
    key: true,
    slug: true,
    title: true,
    parent: true,
    description: true,
    order: true,
    children: true,
  })
  .lean()
  .exec()
);

module.exports = {
  getTopicDataByKey,
};
