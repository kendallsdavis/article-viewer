$(document).ready(function(){

// ----------------------------SEND SCRAPE RESULTS TO MAIN PAGE---------------------------------------------------

// Grab the articles as a json
$.getJSON("/all", data => {

// create placeholder html elements for the article data
let articleDiv = $("<div>")
let articleTitle = $("<p>")
let articleSumm = $("<p>")
let articleURL = $("<p>")
let blankRow = $("<hr>")

// loop through articlces array to append a new div containing each article, title, summary, url
for(var i = 0; i < 5; i++) {
  articleTitle.text = data[0].title;
  // articleSumm.text = data[0].summary;
  articleURL.text = data[0].link
  articleDiv.append(articleTitle, articleSumm, articleURL, blankRow)
  $("#article-view").append(articleDiv);

}

})
})