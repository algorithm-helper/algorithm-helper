const Promise = require('bluebird');
const mongoose = require('mongoose');

const categoryIndex = require('../data/index/categoryIndex.json');
const subcategoryIndex = require('../data/index/subcategoryIndex.json');
const topicIndex = require('../data/index/topicIndex.json');
const colorIndex = require('../data/index/colorIndex.json');

const Category = require('../server/mongo/models/Category');
const Subcategory = require('../server/mongo/models/Subcategory');
const Topic = require('../server/mongo/models/Topic');
const Color = require('../server/mongo/models/Colors');

const log = require('../server/utils/log');
const { MONGO_URL } = require('../server/mongo/utils/dbUtils');

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL, { useNewUrlParser: true });

/**
 * Initializes MongoDB with the data specified in the categoryIndex, subcategoryIndex, and
 * topicIndex.
 */
const initMongo = async () => {
  // Initialize Categories:
  let promises = [];
  categoryIndex.forEach(category => {
    promises.push(new Category(category).save());
  });

  await Promise.all(promises.map(p => p.catch(e => log.info(e.message))));

  // Initialize Subcategories:
  promises = [];
  subcategoryIndex.forEach(subcategory => {
    promises.push(new Subcategory(subcategory).save());
  });

  await Promise.all(promises.map(p => p.catch(e => log.info(e.message))));

  // Initialize Topics:
  promises = [];
  topicIndex.forEach(topic => {
    promises.push(new Topic(topic).save());
  });

  await Promise.all(promises.map(p => p.catch(e => log.info(e.message))));

  // Initialize Colors:
  promises = [];
  colorIndex.forEach(color => {
    promises.push(new Color(color).save());
  });

  await Promise.all(promises.map(p => p.catch(e => log.info(e.message))));
};

initMongo()
  .then(() => {
    mongoose.disconnect();
  })
  .catch(() => {
    mongoose.disconnect();
  });

module.exports = initMongo;
