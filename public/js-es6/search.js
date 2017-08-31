/**
 * 
 * search.js
 * 
 * Script for checking if search query is empty, if so then do nothing.
 * 
 */

$(document).ready(() => {
    // Event handler for search form:
    $('#search-form').submit(function (event){
        let searchQuery = $('#search').val();

        // Do nothing with empty search:
        if (!searchQuery || searchQuery.length == 0) {
            return event.preventDefault();
        }
     });
});


