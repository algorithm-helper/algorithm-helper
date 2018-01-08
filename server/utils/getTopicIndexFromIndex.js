/**
 * 
 * getTopicIndexFromIndex.js
 * 
 * This module flattens the index (from index.json) to be suitable for the home page.
 * 
 */

const getTopicIndexFromIndex = (index) => {
    let result = [];
    index.forEach((category) => {
        let tag = category.category;
        let url = category.url;

        category.topics.forEach((topic) => {
            result.push({
                title: topic.title,
                tags: [tag],
                description: topic.description,
                url: `${url}${topic.url}`
            });
        });
    });
    return result;
};

module.exports = {
    getTopicIndexFromIndex
};
