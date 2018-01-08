/**
 * 
 * flattenCategoryIndex.js
 * 
 * This module flattens the category index (topic and article entries)
 * and returns a Promise that resolves to the flattened list of entries.
 * 
 */

const categoryIndex = require('./../../content/index.json');

const flattenCategoryIndex = () => {
    let flatIndex = [];

    // Flatten:
    categoryIndex.forEach((category) => {
        category.topics.forEach((topic) => {
            flatIndex.push({
                title: topic.title,
                url: `${category.url}${topic.url}`,
                description: topic.description
            });
            topic.articles.forEach((article) => {
                flatIndex.push({
                    title: article.title,
                    url: `${category.url}${topic.url}${article.url}`,
                    description: article.description
                });
            });
        });
    });

    return new Promise((resolve, reject) => {
        if (flatIndex) {
            resolve(flatIndex);
        } else {
            reject({ flatten: true });
        }
    });
};

module.exports = {
    flattenCategoryIndex
};
