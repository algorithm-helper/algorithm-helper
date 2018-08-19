const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

/**
 * Gets all of the category data from MongoDB.
 */
const getCategoryData = () => (
  Category.find({}, {
    key: true,
    slug: true,
    title: true,
    description: true,
    colorKey: true,
    order: true,
    children: true,
  })
  .lean()
  .exec()
);

/**
 * Gets the category data for a specific category by key from MongoDB.
 *
 * @param {string} categoryKey
 */
const getCategoryDataByKey = categoryKey => (
  Category.findOne({
    key: categoryKey,
  }, {
    key: true,
    slug: true,
    title: true,
    description: true,
    colorKey: true,
    order: true,
    children: true,
  })
  .lean()
  .exec()
);

/**
 * Gets all of the category data with the data of its children from MongoDB.
 */
const getCategoryDataExtended = () => (
  Promise.all([
    Category.find({}, {
      key: true,
      slug: true,
      title: true,
      description: true,
      colorKey: true,
      order: true,
    })
    .lean()
    .exec(),
    Subcategory.find({}, {
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
  ])
  .then(result => {
    const [categoryData, subcategoryData] = result;

    const mapCategoryKeyToIndex = categoryData.map((category, i) => ({
      slug: category.slug,
      index: i,
    }))
    .reduce((prev, curr) => ({
      ...prev,
      [curr.slug]: curr.index,
    }), {});

    subcategoryData.forEach(subcategory => {
      const index = mapCategoryKeyToIndex[subcategory.parent];

      if (!categoryData[index].children) {
        categoryData[index].children = [];
      }

      categoryData[index].children.push(subcategory);
    });

    categoryData.forEach(category => {
      category.children = category.children.sort((a, b) => a.order - b.order);
    });

    return categoryData;
  })
);

/**
 * Gets the category data for a specific category by key with the data of its children from MongoDB.
 *
 * @param {string} categoryKey
 */
const getCategoryDataByKeyExtended = categoryKey => (
  Promise.all([
    Category.findOne({
      key: categoryKey,
    }, {
      key: true,
      slug: true,
      title: true,
      description: true,
      colorKey: true,
      order: true,
    })
    .lean()
    .exec(),
    Subcategory.find({
      parent: categoryKey
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
    .exec()
  ])
  .then(result => {
    const [categoryData, subcategoryData] = result;
    categoryData.children = subcategoryData.sort((a, b) => a.order - b.order);
    return categoryData;
  })
);

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
  getCategoryDataExtended,
  getCategoryDataByKeyExtended,
  getCategoryColorKeyMapping,
};
