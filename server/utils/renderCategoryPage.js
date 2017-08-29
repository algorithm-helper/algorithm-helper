/**
 * 
 * renderCategoryPage.js
 * 
 * This module is used to render the category page for a valid cateogry
 * parameter, otherwise redirect to the /categories route.
 * 
 */

const categoryIndex = require('./../../content/categoryIndex.json');

const renderCategoryPage = (category, callback) => {
    category = category.toLowerCase();

    let categoryData = categoryIndex.find((x) => {
        return x.category == category;
    });

    if (!categoryData) {
        return callback(true, undefined);
    }

    return callback(undefined, categoryData);
};

module.exports = {
    renderCategoryPage
};
