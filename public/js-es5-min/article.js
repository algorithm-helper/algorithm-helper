"use strict";$(document).ready(function(){!function(t){var e=$(document.createElement("div")).addClass("breadcrumbs").append($(document.createElement("a")).attr("href",articlePath.category.url).text(""+articlePath.category.title)).append($(document.createElement("span")).text(" / ")).append($(document.createElement("a")).attr("href",articlePath.topic.url).text(""+articlePath.topic.title)).append($(document.createElement("span")).text(" / ")).append($(document.createElement("a")).attr("href",articlePath.article.url).text(articlePath.article.title));$("h1:first").after(e)}();!function(t){for(var e=$("h2, h3, h4, h5, h6","#article-markdown"),a=$("#table-of-contents"),r=0;r<e.length;r++){var c=$(e[r]).text(),n=$(e[r]).attr("id");a.append($(document.createElement("a")).attr("href","#"+n).append($(document.createElement("h6")).text(c)))}t()}(function(){$("footer").css("display","block")})});