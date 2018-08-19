const MONGO_URL = process.env.MLAB_MONGO_URL || 'mongodb://localhost:27017/AlgorithmHelper';
const DB_NAME = 'AlgorithmHelper';
const CATEGORIES_COLLECTION_NAME = 'Categories';
const SUBCATEGORIES_COLLECTION_NAME = 'Subcategories';
const TOPICS_COLLECTION_NAME = 'Topics';
const COLORS_COLLECTION_NAME = 'Colors';

module.exports = {
  MONGO_URL,
  DB_NAME,
  CATEGORIES_COLLECTION_NAME,
  SUBCATEGORIES_COLLECTION_NAME,
  TOPICS_COLLECTION_NAME,
  COLORS_COLLECTION_NAME,
};
