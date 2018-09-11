const { Topic } = include('mongo/models');

const AggregationHelpers = {
  /**
   * Gets the count of the total number of TopicItems stored in MongoDB.
   */
  getTopicItemsCount: () => (
    Topic.aggregate([
      {
        $group: {
          _id: null,
          totalSize: {
            $sum: '$topicItemCount',
          },
        },
      },
    ])
      .exec()
      .then(result => ({ totalSize: result[0].totalSize }))
  ),
};

module.exports = AggregationHelpers;
