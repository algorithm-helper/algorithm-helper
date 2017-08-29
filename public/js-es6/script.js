/**
 * 
 * script.js 
 * 
 */

 $(document).ready(() => {

    // Fixes categories button to redirect to categories page only after
    // animation has finished:
    $('#link-categories').click(() => {
        setTimeout(() => {
            window.location.href = '/categories';
        }, 500);
    });

 });