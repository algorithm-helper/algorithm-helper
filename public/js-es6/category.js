/**
 * 
 * category.js
 * 
 * Script for rendering topic card view elements for a particular category.
 * 
 */

 $(document).ready(() => {
    // For debug purposes:
    console.log(categoryData);

    // Render title:
    $('#category-title').html(categoryData.title);

    // Render card view:
    const renderTopicCards = (callback) => {
        let categoryMainCardContainer = $('#category-main-card-container');

        for (let i = 0; i < categoryData.topics.length; i += 3) {
            let row = $(document.createElement('div'))
            .addClass('row main-card-row')
            .appendTo(categoryMainCardContainer);

            for (let j = 0; j < 3; j++) {
                if (!categoryData.topics[i+j]) {
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
                .text(categoryData.topics[i+j].title)
                .appendTo(cardBody);
   
                let description = $(document.createElement('p'))
                .addClass('card-text')
                .text(categoryData.topics[i+j].description)
                .appendTo(cardBody);
   
                let btn = $(document.createElement('a'))
                .addClass('btn btn-primary')
                .attr('href', `${categoryData.url}${categoryData.topics[i+j].url}`)
                .text('View')
                .appendTo(cardBody);
            }
        }

        callback();
    } 

    renderTopicCards(() => {
        // Render footer only when finished rendering index cards:
        $('footer').css('display', 'block');
    });

 });