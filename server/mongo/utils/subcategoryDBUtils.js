const MongoClient = require('mongodb').MongoClient;
const { MONGO_URL, DB_NAME, SUBCATEGORIES_COLLECTION_NAME } = require('./dbUtils');
const log = require('../../utils/log');

const Subcategory = require('../models/Subcategory');

/**
 * Gets all of the subcategory data from MongoDB.
 */
const getSubcategoryData = () => (
  Subcategory.find({}, {
    key: true,
    slug: true,
    title: true,
    parent: true,
    description: true,
    imageUrl: true,
    order: true,
    children: true,
  })
  .lean()
  .exec()
);

/**
 * Gets the subcategory data for a specific subcategory by key from MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 */
const getSubcategoryDataByKey = (categoryKey, subcategoryKey) => (
  Subcategory.findOne({
    key: `${categoryKey}/${subcategoryKey}`,
  }, {
    key: true,
    slug: true,
    title: true,
    parent: true,
    description: true,
    imageUrl: true,
    order: true,
    children: true,
  })
  .lean()
  .exec()
);

module.exports = {
  getSubcategoryData,
  getSubcategoryDataByKey,
};
