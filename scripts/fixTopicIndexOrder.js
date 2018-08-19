const fs = require('fs');

/**
 * Fixes the topicIndex by adding the correct 'order' property to each grouping of topics (i.e.
 * topics with the same parent should have ascending order starting from 0 in EXACTLY the same
 * order as it is in the index).
 */
const fixTopicIndexOrder = () => {
  let topicIndex = require('../data/index/topicIndex.json');
  let currentParent;
  let currentOrder;
  topicIndex = topicIndex.map(topic => {
    if (!currentParent) {
      currentParent = topic.parent;
      currentOrder = 1;
      topic.order = 0;
      return topic;
    }

    if (currentParent === topic.parent) {
      topic.order = currentOrder;
      currentOrder++;
    } else {
      currentParent = topic.parent;
      currentOrder = 1;
      topic.order = 0;
    }

    return topic;
  });
  return topicIndex;
};

module.exports = fixTopicIndexOrder;
