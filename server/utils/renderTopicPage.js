/**
 * 
 * renderTopicPage.js
 * 
 * This module is used to check if the category and topic is valid, and 
 * return a Promise. If the category and topic are valid, then resolve the 
 * Promise with the topicData, otherwise, reject the Promise with an error
 * Object.
 * 
 */

const { isValidCategory } = require('./isValidCategory');
const { isValidTopic } = require('./isValidTopic');

const categoryIndex = require('./../../content/index.json');

const renderTopicPage = (params) => {
    let category = params.category.toLowerCase();
    let topic = params.topic.toLowerCase();

    return new Promise((resolve, reject) => {
        isValidCategory(category, categoryIndex)
        .then((categoryData) => {
          return isValidTopic(topic, categoryData);  
        })
        .then((topicData) => {
            resolve(topicData);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    renderTopicPage
};
    