/**
 * Fixes the topicIndex by aggregating the number of distinct types of TopicItems for each topic.
 *
 * @param {array} topicIndex
 */
const fixTopicItemCount = topicIndex => {
  topicIndex = topicIndex.map(topic => {
    const distinctItems = [...new Set(topic.children.map(item => item.type))].length;
    topic.topicItemCount = distinctItems;
    return topic;
  });
  return topicIndex;
};

module.exports = fixTopicItemCount;
