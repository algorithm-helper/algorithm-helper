/**
 * 
 * replaceEmWithUnderscores.js
 * 
 * The marked renderer and MathJax have a problem with rendering subscripts, because the underscore
 * character (_) in marked denotes italics with the <em> and </em> tags, but MathJax/Latex uses 
 * them for subscripts. This module replaces all <em> and </em> tags in the text with underscores.
 * 
 */

const replaceEmWithUnderscores = (text) => {
    text = text
    .replace(/\<em\>/g, '_')
    .replace(/\<\/em\>/g, '_');
    return text;
};

module.exports = {
    replaceEmWithUnderscores
};
