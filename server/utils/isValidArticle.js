/**
 * 
 * isValidArticle.js
 * 
 * Checks if the article exists, and returns a Promise. If true, resolve the
 * Promise, otherwise reject the Promise.
 * 
 */

const isValidArticle = (article, topicData) => {
    let articleData = topicData.articles.find((x) => {
        return x.article == article;
    });

    return new Promise((resolve, reject) => {
        if (!articleData) {
            reject({ article: true });
        } else {
            resolve();
        }
    });
 };

 module.exports = {
    isValidArticle
 };
