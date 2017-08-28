'use strict';

/**
 * categories.js
 * 
 * Script for rendering list of categories, topics, articles on 
 * the categories page.
 * 
 */

$(document).ready(function () {
            // For debug purposes:
            // console.log(categoryIndex);

            var renderCategoryCards = function renderCategoryCards(callback) {
                        var categoriesMainCardContainer = $('#categories-main-card-container');

                        categoryIndex.forEach(function (category) {
                                    var categoriesMainCardRow = $(document.createElement('div')).addClass('row main-card-row').appendTo(categoriesMainCardContainer);

                                    var cardColumn = $(document.createElement('div')).addClass('col-md-4').appendTo(categoriesMainCardRow);

                                    var categoryTitleContainer = $(document.createElement('div')).appendTo(cardColumn);

                                    var categoryURL = $(document.createElement('a')).attr('href', category.url).appendTo(categoryTitleContainer);

                                    var categoryTitle = $(document.createElement('h2')).text(category.title).appendTo(categoryURL);

                                    var categoryRow = $(document.createElement('div')).addClass('col-md-8').appendTo(categoriesMainCardRow);

                                    category.topics.forEach(function (topic) {

                                                var topicRow = $(document.createElement('div')).addClass('row').appendTo(categoryRow);

                                                var topicColumn = $(document.createElement('div')).addClass('col-md-12').appendTo(topicRow);

                                                var topicTitleContainer = $(document.createElement('div')).addClass('category-title').appendTo(topicColumn);

                                                var topicURL = $(document.createElement('a')).attr('href', '' + category.url + topic.url).appendTo(topicTitleContainer);

                                                var topicTitle = $(document.createElement('h4')).text(topic.title).appendTo(topicURL);

                                                var articlesRow = $(document.createElement('div')).addClass('row main-card-row').appendTo(categoryRow);

                                                topic.articles.forEach(function (article) {

                                                            var articleColumn = $(document.createElement('div')).addClass('col-md-6').appendTo(articlesRow);

                                                            var articleTitleContainer = $(document.createElement('div')).addClass('category-item').appendTo(articleColumn);

                                                            var articleTitle = $(document.createElement('a')).attr('href', '' + category.url + topic.url + article.url).text(article.title).appendTo(articleTitleContainer);
                                                });
                                    });
                        });

                        callback();
            };

            renderCategoryCards(function () {
                        // Render footer only when finished rendering category cards:
                        $('footer').css('display', 'block');
            });
});