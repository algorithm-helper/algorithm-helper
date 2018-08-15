const Promise = require('bluebird');
const mongoose = require('mongoose');

const categoryIndex = require('../data/index/categoryIndex.json');
const subcategoryIndex = require('../data/index/subcategoryIndex.json');
const topicIndex = require('../data/index/topicIndex.json');

const Category = require('../server/mongo/models/Category');
const Subcategory = require('../server/mongo/models/Subcategory');
const Topic = require('../server/mongo/models/Topic');

const log = require('../server/utils/log');

const MONGO_URL = 'mongodb://localhost:27017/AlgorithmHelper';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

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
};

module.exports = initMongo;
