/**
 * 
 * renderArticlePage.js
 * 
 * This module is used to check if the category, topic and article is valid, 
 * and return a Promise. If the category, topic and article are valid, then 
 * resolve the Promise with the article's file path, otherwise, reject the 
 * Promise with an error Object.
 * 
 */

const { isValidCategory } = require('./isValidCategory');
const { isValidTopic } = require('./isValidTopic');
const { isValidArticle } = require('./isValidArticle');

const categoryIndex = require('./../../content/categoryIndex.json');

 const renderArticlePage = (params) => {
    let category = params.category.toLowerCase();
    let topic = params.topic.toLowerCase();
    let article = params.article.toLowerCase();

    return new Promise((resolve, reject) => {
        isValidCategory(category, categoryIndex)
        .then((categoryData) => {
            return isValidTopic(topic, categoryData);
        })
        .then((topicData) => {
            return isValidArticle(article, topicData);
        })
        .then(() => {
            let articleFilePath = `content/categories/${category}/${topic}/${article}.md`;
            resolve(articleFilePath);
        })
        .catch((err) => {
            reject(err);
        });
    });
 };

 module.exports = {
     renderArticlePage
 };
