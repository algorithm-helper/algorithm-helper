/**
 * 
 * index.js
 * 
 * Script for rendering topic elements on the home page.
 * 
 */

 $(document).ready(() => {
     // For debug purposes:
     // console.log(topicIndex);

     // Create card for each element, append to index-main-card-container
     let indexMainCardContainer = $('#index-main-card-container');
     for (let i = 0; i < topicIndex.length; i += 3) {
         let row = $(document.createElement('div'))
         .addClass('row index-main-card-row')
         .appendTo(indexMainCardContainer);

         for (let j = 0; j < 3; j++) {
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
             .text(topicIndex[i+j].title)
             .appendTo(cardBody);

             topicIndex[i+j].tags.forEach((entry) => {
                 tagClass = entry.replace(/\s/g, '-');                
                 let tag = $(document.createElement('span'))
                 .addClass(`card-tag tag-${tagClass}`)
                 .text(entry)
                 .appendTo(cardBody);
             });

             let description = $(document.createElement('p'))
             .addClass('card-text')
             .text(topicIndex[i+j].description)
             .appendTo(cardBody);

             let btn = $(document.createElement('a'))
             .addClass('btn btn-primary')
             .attr('href', topicIndex[i+j].url)
             .text('View')
             .appendTo(cardBody);
         }
     }
 });