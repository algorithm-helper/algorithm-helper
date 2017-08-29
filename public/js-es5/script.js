'use strict';

/**
 * 
 * script.js 
 * 
 */

$(document).ready(function () {

    // Fixes categories button to redirect to categories page only after
    // animation has finished:
    $('#link-categories').click(function () {
        setTimeout(function () {
            window.location.href = '/categories';
        }, 500);
    });
});