/**
 * 
 * constructArticleSrcDestUrls.js
 * 
 * This module flattens the index.json to an array of Objects containing the article src url and
 * dest url.
 * 
 */

const constructArticleSrcDestUrls = (index) => {
  let result = [];
  index.forEach((category) => {
      category.topics.forEach((topic) => {
          topic.articles.forEach((article) => {
            result.push({
              src: `./content${category.url}${topic.url}${article.url}.md`,
              dest: `${category.url}${topic.url}${article.url}.md`
            });
          });
      });
  });
  return result;
};

module.exports = {
  constructArticleSrcDestUrls
};
