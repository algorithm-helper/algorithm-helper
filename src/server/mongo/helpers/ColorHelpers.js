import { Color } from 'mongo/models';

const ColorHelpers = {
  /**
   * Gets all the color data from MongoDB.
   */
  getColorData: () => (
    Color.find({}, {
      key: true,
      hexCode: true,
      description: true,
    })
    .lean()
    .exec()
  ),
};

export default ColorHelpers;
