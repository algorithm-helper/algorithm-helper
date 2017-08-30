/**
 * 
 * renderCategoryPage.js
 * 
 * This module is used to check if the category is valid, and return a 
 * Promise. If the category is valid, then resolve the Promise with the 
 * categoryData, otherwise, reject the Promise with an error Object.
 * 
 */

const { isValidCategory } = require('./isValidCategory');

const categoryIndex = require('./../../content/categoryIndex.json');

const renderCategoryPage = (params) => {
    let category = params.category.toLowerCase();

    return new Promise((resolve, reject) => {
        isValidCategory(category, categoryIndex)
        .then((categoryData) => {
            resolve(categoryData);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    renderCategoryPage
};
