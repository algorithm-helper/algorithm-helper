"use strict";$(document).ready(function(){!function(e){for(var t=$("#index-main-card-container"),a=0;a<topicIndex.length;a+=3)for(var d=$(document.createElement("div")).addClass("row main-card-row").appendTo(t),n=0;n<3;n++)!function(e){var t=$(document.createElement("div")).addClass("col-md-4").appendTo(d),n=$(document.createElement("div")).addClass("card").appendTo(t),c=$(document.createElement("div")).addClass("card-body").appendTo(n);$(document.createElement("h4")).addClass("card-title").text(topicIndex[a+e].title).appendTo(c),topicIndex[a+e].tags.forEach(function(e){tagClass=e.replace(/\s/g,"-"),$(document.createElement("span")).addClass("card-tag tag-"+tagClass).text(e).appendTo(c)}),$(document.createElement("p")).addClass("card-text").text(topicIndex[a+e].description).appendTo(c),$(document.createElement("a")).addClass("btn btn-primary").attr("href",topicIndex[a+e].url).text("View").appendTo(c)}(n);e()}(function(){$("footer").css("display","block")})});