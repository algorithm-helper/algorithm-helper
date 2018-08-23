import { TOPIC_ITEM_TYPES, TOPIC_ITEM_TYPES_TITLE } from './utils';

export const getTopicItemTypes = topicItems => {
  const types = {};
  topicItems.forEach(topicItem => {
    types[topicItem.type] = true;
  });

  const topicItemTypes = [];
  TOPIC_ITEM_TYPES.forEach(type => {
    if (types[type]) {
      topicItemTypes.push({
        title: TOPIC_ITEM_TYPES_TITLE[type],
        type,
      });
    }
  });

  return topicItemTypes;
};
