/**
 * 
 * renderTopicPage.js
 * 
 * This module is used to render the topic page for a valid topic
 * parameter, otherwise redirect to the corresponding /categories/<category>
 * route.
 * 
 */

const categoryIndex = require('./../../content/categoryIndex.json');

const renderTopicPage = (category, topic, callback) => {
    category = category.toLowerCase();
    topic = topic.toLowerCase();

    let categoryData = categoryIndex.find((x) => {
        return x.category == category;
    });
    
    if (!categoryData) {
        return callback(true, undefined, undefined);
    }

    let topicData = categoryData.topics.find((x) => {
        return x.topic == topic;
    });

    if (!topicData) {
        return callback(undefined, true, undefined);
    }

    return callback(undefined, undefined, topicData);
};

module.exports = {
    renderTopicPage
};
    