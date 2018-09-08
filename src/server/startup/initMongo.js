const {
  Category,
  Subcategory,
  Topic,
  Color,
} = include('mongo/models');
const { log } = include('utils');

const fixTopicIndexOrder = require('./fixTopicIndexOrder');
const categoryIndex = require('../../../data/index/categoryIndex.json');
const subcategoryIndex = require('../../../data/index/subcategoryIndex.json');
const topicIndex = require('../../../data/index/topicIndex.json');
const colorIndex = require('../../../data/index/colorIndex.json');

/**
 * Initializes MongoDB with the data specified in the categoryIndex, subcategoryIndex, and
 * topicIndex.
 *
 * @param {object} options
 */
const initMongo = async options => {
  const displayMessage = msg => {
    if (!options.silent) {
      log.info(msg);
    }
  };

  // Initialize Categories:
  let promises = [];
  categoryIndex.forEach(category => {
    promises.push(new Category(category).save());
  });

  await Promise.all(promises.map(p => p.catch(e => displayMessage(e.message))));

  // Initialize Subcategories:
  promises = [];
  subcategoryIndex.forEach(subcategory => {
    promises.push(new Subcategory(subcategory).save());
  });

  await Promise.all(promises.map(p => p.catch(e => displayMessage(e.message))));

  // Initialize Topics:
  promises = [];
  const fixedTopicIndex = fixTopicIndexOrder(topicIndex);
  fixedTopicIndex.forEach(topic => {
    promises.push(new Topic(topic).save());
  });

  await Promise.all(promises.map(p => p.catch(e => displayMessage(e.message))));

  // Initialize Colors:
  promises = [];
  colorIndex.forEach(color => {
    promises.push(new Color(color).save());
  });

  await Promise.all(promises.map(p => p.catch(e => displayMessage(e.message))));
};

module.exports = initMongo;
