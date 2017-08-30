/**
 * 
 * isValidCategory.js
 * 
 * Checks if the category exists, and returns a Promise. If true, resolve the
 * Promise with the categoryData, otherwise reject the Promise.
 * 
 */

 const isValidCategory = (category, categoryIndex) => {
    let categoryData = categoryIndex.find((x) => {
        return x.category == category;
    });

    return new Promise((resolve, reject) => {
        if (!categoryData) {
            reject({ category: true });
        } else {
            resolve(categoryData);
        }
    });
 };

 module.exports = {
     isValidCategory
 };
