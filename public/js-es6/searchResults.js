/**
 * 
 * searchResults.js
 * 
 * This script renders the search result elements.
 * 
 */

$(document).ready(() => {
    // For debug purposes:
    console.log(results);

    // Display the number of search results:
    (global => {
        if (results.length === 0) {
            $('#search-articles-found').text('0 articles found.');
        } else if (results.length === 1) {
            $('#search-articles-found').text('1 article found.');
        } else {
            $('#search-articles-found').text(`${results.length} articles found.`);
        }
    })();

    // Render the search results:
    const renderSearchResults = (callback) => {
        let searchContainer = $('#search-container');
        results.forEach((result) => {
            searchContainer
            .append($(document.createElement('div'))
                .addClass('search-result')
                .append($(document.createElement('div'))
                    .addClass('search-title')
                    .append($(document.createElement('a'))
                        .attr('href', result.original.url)
                        .append($(document.createElement('h4'))
                            .text(result.original.title))))
                .append($(document.createElement('div'))
                    .addClass('search-desc')
                    .append($(document.createElement('p'))
                        .html(result.string))));
        });
        callback();
    };

    renderSearchResults(() => {
        // Render footer only when finished rendering category cards:
        $('footer').css('display', 'block');
    });

});