/**
 * categories.js
 * 
 * Script for rendering list of categories, topics, articles on 
 * the categories page.
 * 
 */

 $(document).ready(() => {
     // For debug purposes:
     // console.log(categoryIndex);

     const renderCategoryCards = (callback) => {
        let categoriesMainCardContainer = $('#categories-main-card-container');
        categoryIndex.forEach((category) => {
           let categoriesMainCardRow = $(document.createElement('div'))
           .addClass('row categories-main-card-row')
           .appendTo(categoriesMainCardContainer);
   
           let cardColumn = $(document.createElement('div'))
           .addClass('col-md-4')
           .appendTo(categoriesMainCardRow);
   
           let categoryTitleContainer = $(document.createElement('div'))
           .appendTo(cardColumn);
   
           let categoryURL = $(document.createElement('a'))
           .attr('href', category.url)
           .appendTo(categoryTitleContainer);
   
           let categoryTitle = $(document.createElement('h2'))
           .text(category.title)
           .appendTo(categoryURL);
   
           let categoryRow = $(document.createElement('div'))
           .addClass('col-md-8')
           .appendTo(categoriesMainCardRow);
   
           category.topics.forEach((topic) => {
   
               let topicRow = $(document.createElement('div'))
               .addClass('row')
               .appendTo(categoryRow);
   
               let topicColumn = $(document.createElement('div'))
               .addClass('col-md-12')
               .appendTo(topicRow);
   
               let topicTitleContainer = $(document.createElement('div'))
               .addClass('category-title')
               .appendTo(topicColumn);
   
               let topicURL = $(document.createElement('a'))
               .attr('href', `${category.url}${topic.url}`)
               .appendTo(topicTitleContainer);
   
               let topicTitle = $(document.createElement('h4'))
               .text(topic.title)
               .appendTo(topicURL);
   
               let articlesRow = $(document.createElement('div'))
               .addClass('row categories-item-row')
               .appendTo(categoryRow);
   
               topic.articles.forEach((article) => {
   
                   let articleColumn = $(document.createElement('div'))
                   .addClass('col-md-6')
                   .appendTo(articlesRow);
   
                   let articleTitleContainer = $(document.createElement('div'))
                   .addClass('category-item')
                   .appendTo(articleColumn);
   
                   let articleTitle = $(document.createElement('a'))
                   .attr('href', `${category.url}${topic.url}${article.url}`)
                   .text(article.title)
                   .appendTo(articleTitleContainer);
               });
           });
        });

        callback();
    }

    renderCategoryCards(() => {
        // Render footer only when finished rendering index cards:
        $('footer').css('display', 'block');
    });

 });