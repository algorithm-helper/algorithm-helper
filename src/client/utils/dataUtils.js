export const getCategory = (data, categoryKey) => data.categories.find(category => {
  return category.key === categoryKey;
});

export const getSubcategory = (data, subcategoryKey) => data.children.find(subcategory => {
  return subcategory.key === subcategoryKey;
});

export const getTopic = (data, topicKey) => data.children.find(topic => {
  return topic.key === topicKey;
});
