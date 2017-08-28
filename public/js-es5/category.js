'use strict';

/**
 * 
 * category.js
 * 
 * Script for rendering topic card view elements for a particular category.
 * 
 */

$(document).ready(function () {
    // For debug purposes:
    console.log(categoryData);

    // Render title:
    $('#category-title').html(categoryData.title);

    // Render card view:
    var renderTopicCards = function renderTopicCards(callback) {
        var categoryMainCardContainer = $('#category-main-card-container');

        for (var i = 0; i < categoryData.topics.length; i += 3) {
            var row = $(document.createElement('div')).addClass('row main-card-row').appendTo(categoryMainCardContainer);

            for (var j = 0; j < 3; j++) {
                if (!categoryData.topics[i + j]) {
                    break;
                }

                var column = $(document.createElement('div')).addClass('col-md-4').appendTo(row);

                var card = $(document.createElement('div')).addClass('card').appendTo(column);

                var cardBody = $(document.createElement('div')).addClass('card-body').appendTo(card);

                var title = $(document.createElement('h4')).addClass('card-title').text(categoryData.topics[i + j].title).appendTo(cardBody);

                var description = $(document.createElement('p')).addClass('card-text').text(categoryData.topics[i + j].description).appendTo(cardBody);

                var btn = $(document.createElement('a')).addClass('btn btn-primary').attr('href', '' + categoryData.url + categoryData.topics[i + j].url).text('View').appendTo(cardBody);
            }
        }

        callback();
    };

    renderTopicCards(function () {
        // Render footer only when finished rendering index cards:
        $('footer').css('display', 'block');
    });
});