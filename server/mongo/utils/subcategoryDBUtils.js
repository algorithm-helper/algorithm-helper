const Subcategory = require('../models/Subcategory');
const Topic = require('../models/Topic');

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
  .then(result => result.sort((a, b) => a.order - b.order))
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

/**
 * Gets the subcategory data for a specific subcategory by key with the data of its children from
 * MongoDB.
 *
 * @param {string} categoryKey
 * @param {string} subcategoryKey
 */
const getSubcategoryDataByKeyExtended = (categoryKey, subcategoryKey) => (
  Promise.all([
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
    })
    .lean()
    .exec(),
    Topic.find({
      parent: subcategoryKey,
    }, {
      key: true,
      slug: true,
      title: true,
      parent: true,
      description: true,
      order: true,
    })
    .lean()
    .exec()
  ])
  .then(result => {
    const [subcategoryData, topicData] = result;
    subcategoryData.children = topicData.sort((a, b) => a.order - b.order);
    return subcategoryData;
  })
);


module.exports = {
  getSubcategoryData,
  getSubcategoryDataByKey,
  getSubcategoryDataByKeyExtended,
};
