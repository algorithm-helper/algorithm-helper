'use strict';

/**
 * 
 * topic.js
 * 
 * Script for rendering article card view elements for a particular topic.
 * 
 */

$(document).ready(function () {
    // For debug purposes:
    // console.log(topicData);

    // Render title:
    $('#topic-title').html(topicData.title);

    // Render card view:
    var renderArticleCards = function renderArticleCards(callback) {
        var topicMainCardContainer = $('#topic-main-card-container');

        for (var i = 0; i < topicData.articles.length; i += 3) {
            var row = $(document.createElement('div')).addClass('row main-card-row').appendTo(topicMainCardContainer);

            if (i > topicData.articles.length) {
                break;
            }

            for (var j = 0; j < 3; j++) {
                if (!topicData.articles[i + j]) {
                    break;
                }

                var column = $(document.createElement('div')).addClass('col-md-4').appendTo(row);

                var card = $(document.createElement('div')).addClass('card').appendTo(column);

                var cardBody = $(document.createElement('div')).addClass('card-body').appendTo(card);

                var title = $(document.createElement('h4')).addClass('card-title').text(topicData.articles[i + j].title).appendTo(cardBody);

                var btn = $(document.createElement('a')).addClass('btn btn-primary card-btn').attr('href', '' + window.location.pathname + topicData.articles[i + j].url).text('View').appendTo(cardBody);
            }
        }

        callback();
    };

    renderArticleCards(function () {
        // Render footer only when finished rendering article cards:
        $('footer').css('display', 'block');
    });
});