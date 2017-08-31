'use strict';

/**
 * 
 * script.js 
 * 
 * Global script for fixing page behavior.
 * 
 */

var offsetAnchor = function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 80);
    }
};

$(window).on('hashchange', function () {
    offsetAnchor();
});

$(document).ready(function () {
    // Fixes href with # anchor to offset the fixed navbar:
    offsetAnchor();

    // Fixes categories button to redirect to categories page only after
    // animation has finished:
    $('#link-categories').click(function () {
        setTimeout(function () {
            window.location.href = '/categories';
        }, 500);
    });
});