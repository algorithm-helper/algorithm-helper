"use strict";$(document).ready(function(){$("#topic-title").html(topicData.title);!function(t){for(var a=$("#topic-main-card-container"),e=0;e<topicData.articles.length;e+=3){var c=$(document.createElement("div")).addClass("row main-card-row").appendTo(a);if(e>topicData.articles.length)break;for(var d=0;d<3&&topicData.articles[e+d];d++){var n=$(document.createElement("div")).addClass("col-md-4").appendTo(c),o=$(document.createElement("div")).addClass("card").appendTo(n),r=$(document.createElement("div")).addClass("card-body").appendTo(o);$(document.createElement("h4")).addClass("card-title").text(topicData.articles[e+d].title).appendTo(r),$(document.createElement("p")).addClass("card-text").text(topicData.articles[e+d].description).appendTo(r),$(document.createElement("a")).addClass("btn btn-primary card-btn").attr("href",""+window.location.pathname+topicData.articles[e+d].url).text("View").appendTo(r)}}t()}(function(){$("footer").css("display","block")})});