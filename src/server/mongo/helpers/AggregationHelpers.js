const { Topic } = include('mongo/models');

const AggregationHelpers = {
  /**
   * Gets the count of the total number of TopicItems stored in MongoDB.
   */
  getTopicItemsCount: () => (
    Topic.find({}, {
      key: true,
    })
      .then(result => {
        const mapCategoryKeyToCount = result.reduce((prev, curr) => {
          const [categoryKey] = curr.key.split('/');
          return {
            ...prev,
            [categoryKey]: (prev[categoryKey] || 0) + 1,
          };
        }, {});

        const total = Object.keys(mapCategoryKeyToCount).reduce((prev, curr) => (
          prev + mapCategoryKeyToCount[curr]
        ), 0);

        return { ...mapCategoryKeyToCount, total };
      })
  ),
};

module.exports = AggregationHelpers;
