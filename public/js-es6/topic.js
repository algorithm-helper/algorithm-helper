/**
 * 
 * topic.js
 * 
 * Script for rendering article card view elements for a particular topic.
 * 
 */

 $(document).ready(() => {
    // For debug purposes:
    // console.log(topicData);

    // Render title:
    $('#topic-title').html(topicData.title);

    // Render card view:
    const renderArticleCards = (callback) => {
        let topicMainCardContainer = $('#topic-main-card-container');

        for (let i = 0; i < topicData.articles.length; i += 3) {
            let row = $(document.createElement('div'))
            .addClass('row main-card-row')
            .appendTo(topicMainCardContainer);

            if (i > topicData.articles.length) {
                break;
            }

            for (let j = 0; j < 3; j++) {
                if (!topicData.articles[i+j]) {
                    break;
                }

                let column = $(document.createElement('div'))
                .addClass('col-md-4')
                .appendTo(row);
   
                let card = $(document.createElement('div'))
                .addClass('card')
                .appendTo(column);
   
                let cardBody = $(document.createElement('div'))
                .addClass('card-body')
                .appendTo(card);
   
                let title = $(document.createElement('h4'))
                .addClass('card-title')
                .text(topicData.articles[i+j].title)
                .appendTo(cardBody);

                let description = $(document.createElement('p'))
                .addClass('card-text')
                .text(topicData.articles[i+j].description)
                .appendTo(cardBody);

                let btn = $(document.createElement('a'))
                .addClass('btn btn-primary card-btn')
                .attr('href', `${window.location.pathname}${topicData.articles[i+j].url}`)
                .text('View')
                .appendTo(cardBody);
            }
        }

        callback();
    } 

    renderArticleCards(() => {
        // Render footer only when finished rendering article cards:
        $('footer').css('display', 'block');
    });

 });