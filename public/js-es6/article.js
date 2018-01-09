/**
 * 
 * article.js
 * 
 * Script for rendering article content.
 * 
 */

 $(document).ready(() => {
    // For debug purposes:
    // console.log(articlePath);

    const replaceEmWithUnderscores = (text) => {
        text = text
            .replace(/\<em\>/g, '_')
            .replace(/\<\/em\>/g, '_');
        return text;
    };

    function loadGist(element, gistId) {
        var callbackName = "gist_callback";
        window[callbackName] = function (gistData) {
            delete window[callbackName];
            var html = '<link rel="stylesheet" href="' + escapeHtml(gistData.stylesheet) + '"></link>';
            html += gistData.div;
            element.innerHTML = html;
            script.parentNode.removeChild(script);
        };
        var script = document.createElement("script");
        script.setAttribute("src", "https://gist.github.com/" + gistId + ".json?callback=" + callbackName);
        document.body.appendChild(script);
    }

    // Render article:
    $.ajax({
        url: articlePath.gcsSignedUrl,
        async: false,
        success: function (data){
            document.getElementById('article-markdown').innerHTML = 
                replaceEmWithUnderscores(marked(data));
            hljs.initHighlightingOnLoad();
        },
        error: function(err) {
            console.log(err);
        }
    });

    // Create breadcrumbs, put below first h1 occurence:
    (global => {
        let breadcrumbs = $(document.createElement('div'))
        .addClass('breadcrumbs')
        .append($(document.createElement('a'))
            .attr('href', articlePath.category.url)
            .text(`${articlePath.category.title}`))
        .append($(document.createElement('span'))
            .text(' / '))
        .append($(document.createElement('a'))
            .attr('href', articlePath.topic.url)
            .text(`${articlePath.topic.title}`))
        .append($(document.createElement('span'))
            .text(' / '))
        .append($(document.createElement('a'))
            .attr('href', articlePath.article.url)
            .text(articlePath.article.title));
        $('h1:first').after(breadcrumbs);
    })();

    // Generate table of contents dynamically from the h2-h6 
    // elements in the markdown:
    const renderTableOfContents = (callback) => {
        let headerElements = $('h2, h3, h4, h5, h6', '#article-markdown');
        let toc = $('#table-of-contents');
    
        for (let i = 0; i < headerElements.length; i++) {
            let text = $(headerElements[i]).text();
            let id = $(headerElements[i]).attr('id');
            let spaces = Array(2 * Math.abs(3 - parseInt(headerElements[i]
                .nodeName.charAt(1))))
                .join('&nbsp;');

            toc.append($(document.createElement('a'))
                .attr('href', `#${id}`)
                .append($(document.createElement('h6'))
                    .html(`${spaces}${text}`)));
        }

        callback();
    }

    renderTableOfContents(() => {
        // Render footer only when finished rendering table of contents:
        $('footer').css('display', 'block');
    });
    
 });
