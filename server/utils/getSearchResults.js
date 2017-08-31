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

const getSearchResults = (query) => {
    return new Promise((resolve, reject) => {
        flattenCategoryIndex()
        .then((flatIndex) => {
            let results = fuzzy.filter(query, flatIndex, {
                pre:  '<span class="highlight">',
                post: '</span>',
                extract: (item) => {
                    return item.description
                }
            });
            resolve(results);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    getSearchResults
};
