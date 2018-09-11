const { Topic } = include('mongo/models');

const AggregationHelpers = {
  /**
   * Gets the count of the total number of TopicItems stored in MongoDB.
   */
  getTopicItemsCount: () => (
    Topic.find({}, {
      key: true,
      topicItemCount: true,
    })
      .then(result => {
        const mapCategoryKeyToCount = {};
        let total = 0;
        result.forEach(topic => {
          const categoryKey = topic.key.substring(0, topic.key.indexOf('/'));
          mapCategoryKeyToCount[categoryKey] = (mapCategoryKeyToCount[categoryKey] || 0)
            + topic.topicItemCount;
          total += topic.topicItemCount;
        });
        mapCategoryKeyToCount.total = total;
        return mapCategoryKeyToCount;
      })
  ),
};

module.exports = AggregationHelpers;
