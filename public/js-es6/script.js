/**
 * 
 * script.js 
 * 
 * Global script for fixing page behavior.
 * 
 */

const offsetAnchor = () => {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 80);
    }
}

$(window).on('hashchange', () => {
    offsetAnchor();
});

 $(document).ready(() => {
    // Fixes href with # anchor to offset the fixed navbar:
    offsetAnchor();

    // Fixes categories button to redirect to categories page only after
    // animation has finished:
    $('#link-categories').click(() => {
        setTimeout(() => {
            window.location.href = '/categories';
        }, 500);
    });
 });
