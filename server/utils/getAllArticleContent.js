/**
 * 
 * getAllArticleContent.js
 * 
 * This module maps all articles to article content.
 * 
 */

const fs = require('fs');
const { filterArticleContent } = require('./filterArticleContent');

const getAllArticleContent = (index) => {
    let result = [];
    index.forEach((category) => {
        category.topics.forEach((topic) => {
            topic.articles.forEach((article) => {
                const url = `./content${category.url}${topic.url}${article.url}.md`;

                const data = fs.readFileSync(url);

                result.push({
                    title: article.title,
                    url: `/content${category.url}${topic.url}${article.url}`,
                    content: filterArticleContent(data.toString())
                });
            });
        });
    });

    return result;
};

module.exports = {
    getAllArticleContent
};
