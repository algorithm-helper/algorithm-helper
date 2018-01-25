'use strict';

/**
 * 
 * index.js
 * 
 * Script for rendering topic card view elements on the home page.
 * 
 */

$(document).ready(function () {
    // For debug purposes:
    // console.log(topicIndex);

    // Create card for each element, append to index-main-card-container
    var renderIndexCards = function renderIndexCards(callback) {
        var indexMainCardContainer = $('#index-main-card-container');
        for (var i = 0; i < topicIndex.length; i += 3) {
            var row = $(document.createElement('div')).addClass('row main-card-row').appendTo(indexMainCardContainer);

            var _loop = function _loop(j) {
                if (!topicIndex[i + j]) {
                    return 'break';
                }

                var column = $(document.createElement('div')).addClass('col-md-4').appendTo(row);

                var card = $(document.createElement('div')).addClass('card').appendTo(column);

                var cardBody = $(document.createElement('div')).addClass('card-body').appendTo(card);

                var title = $(document.createElement('h4')).addClass('card-title').text(topicIndex[i + j].title).appendTo(cardBody);

                topicIndex[i + j].tags.forEach(function (entry) {
                    tagClass = entry.replace(/\s/g, '-');
                    var tag = $(document.createElement('span')).addClass('card-tag tag-' + tagClass).text(entry.replace(/\-/g, ' ')).appendTo(cardBody);
                });

                var description = $(document.createElement('p')).addClass('card-text').text(topicIndex[i + j].description).appendTo(cardBody);

                var btn = $(document.createElement('a')).addClass('btn btn-primary card-btn').attr('href', topicIndex[i + j].url).text('View').appendTo(cardBody);
            };

            for (var j = 0; j < 3; j++) {
                var _ret = _loop(j);

                if (_ret === 'break') break;
            }
        }

        callback();
    };

    renderIndexCards(function () {
        // Render footer only when finished rendering index cards:
        $('footer').css('display', 'block');
    });
});