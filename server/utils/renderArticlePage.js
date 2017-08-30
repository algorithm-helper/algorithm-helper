/**
 * 
 * renderArticlePage.js
 * 
 * This module is used to render the article page for a valid article 
 * (otherwise redirect to the corresponding /:topic route), and a valid 
 * topic (otherwise redirect to the corresponding /:category route), and 
 * a valid category (otherwise redirect to the /categories route).
 * 
 */

const categoryIndex = require('./../../content/categoryIndex.json');

 const renderArticlePage = (params, callback) => {
    let category = params.category.toLowerCase();
    let topic = params.topic.toLowerCase();
    let article = params.article.toLowerCase();

    // Check that category is valid:
    let categoryData = categoryIndex.find((x) => {
        return x.category == category;
    });
    
    if (!categoryData) {
        return callback({ category: true }, undefined);
    }

    // Check that topic is valid:
    let topicData = categoryData.topics.find((x) => {
        return x.topic == topic;
    });

    if (!topicData) {
        return callback({ topic: true }, undefined);
    }

    // Check that article is valid:
    let articleData = topicData.articles.find((x) => {
        return x.article = article;
    });

    if (!articleData) {
        return callback({ article: true }, undefined);
    }

    let articleFilePath = `content/categories/${category}/${topic}/${article}.md`;

    return callback({}, articleFilePath);
 };

 module.exports = {
     renderArticlePage
 };
