import { Category, Subcategory, Topic } from 'mongo/models';

const CategoryHelpers = {
  /**
   * Gets all of the category data from MongoDB.
   */
  getCategoryData: () => (
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
    .then(result => result.sort((a, b) => a.order - b.order))
  ),

  /**
   * Gets the category data for a specific category by key from MongoDB.
   *
   * @param {string} categoryKey
   */
  getCategoryDataByKey: categoryKey => (
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
  ),

  /**
   * Gets all of the category data with the data of its children from MongoDB.
   */
  getCategoryDataExtended: () => (
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

      return categoryData.sort((a, b) => a.order - b.order);
    })
  ),

  /**
   * Gets the category data for a specific category by key with the data of its children from MongoDB.
   *
   * @param {string} categoryKey
   */
  getCategoryDataByKeyExtended: categoryKey => (
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
      .exec(),
    ])
    .then(result => {
      const [categoryData, subcategoryData] = result;
      categoryData.children = subcategoryData.sort((a, b) => a.order - b.order);
      return categoryData;
    })
  ),

  /**
   * Gets all of the category data by key and colorKey from MongoDB.
   */
  getCategoryColorKeyMapping: () => (
    Category.find({}, {
      key: true,
      colorKey: true,
    })
    .lean()
    .exec()
    .then(result => result.reduce((prev, curr) => ({
      ...prev,
      [curr.key]: curr.colorKey,
    }), {}))
  ),
};

export default CategoryHelpers;
