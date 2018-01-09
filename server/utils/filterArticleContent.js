/**
 * 
 * filterArticleContent.js
 * 
 * This module filters article content by paragraph.
 * 
 */

const filterArticleContent = (article) => {
    article = article
        .replace(/\#+.+?\n/g, '')
        .replace(/[\n\<\>]/g, '')
        .replace(/  /g, ' ')
        .replace(/\s*[\.\,]\s*/g, '\. ')
        .replace(/[\<\[\]]/g, '')
        .replace(/\(.+?\)/g, '')
        .replace(/```.+?```/g, '')
        .replace(/From Wikipedia:/g, '')
        .replace(/`/g, '')
        .replace(/ \. /g, '\. ');
    return article;
};

module.exports = {
    filterArticleContent
};
