const Color = require('../models/Color');

/**
 * Gets all the color data from MongoDB.
 */
const getColorData = () => (
  Color.find({}, {
    key: true,
    hexCode: true,
    description: true,
  })
  .exec()
);

module.exports = {
  getColorData,
};
