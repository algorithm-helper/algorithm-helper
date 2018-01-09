/**
 * 
 * getSearchResults.js
 * 
 * This module gets search results by using the fuzzy.js library to do an 
 * approximate string search on all of the entries (topics and articles),
 * and wraps matching substrings with a span highlight, and returns a 
 * Promise. If the search is successful, it resolves the Promise, otherwise
 * it rejects the Promise.
 * 
 */

const fuzzy = require('fuzzy');

const { flattenCategoryIndex } = require('./flattenCategoryIndex'); 

const getSearchResults = (query, articleContent) => {
    return new Promise((resolve, reject) => {
        if (!articleContent) {
            reject();
        } else {
            let fuzzyResults = fuzzy.filter(query, articleContent, {
                pre:  '<span class="highlight">',
                post: '</span>',
                extract: (item) => {
                    return item.content
                }
            });

            let results = [];
            fuzzyResults.forEach((result) => {
                let str = result.string.substr(result.string.indexOf('<span'), 
                    result.string.length);
                str = str.substr(0, Math.min(300, str.length));

                results.push({
                    title: result.original.title,
                    url: result.original.url.substr(8, result.original.url.length),
                    string: `...${str}...`
                });
            });
            resolve(results);
        }
    });
};

module.exports = {
    getSearchResults
};
