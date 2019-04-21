const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

console.log("\n***********************************\n" +
            "Scraping\n" +
            "\n***********************************\n");

// axios.get("https://www.newsobserver.com/").then(response => {
// // Load the HTML into cheerio and save it to a variable
// // '$' becomes a shorthand for cheerio's selector commands
// const $ = cheerio.load(response.data);
//  // An empty array to save the data that we'll scrape
// var headlines = ["a"];

// // With cheerio, find each p-tag with the "title" class
// // (i: iterator. element: the current element)
// $("article.card").each((i, element) => {
// // Save the text of the element in a "title" variable
// const headline = $(element).text();

// // const summary = $(element).children().text();
// // In the currently selected element, look at its child elements (i.e., its a-tags),
// // then save the values for any "href" attributes that the child elements may have
// // const link = $(element).children().attr("href");
// // Save these results in an object that we'll push into the results array we defined earlier
// headlines.push({
//     headline:headline,
//     // summary: summary,
//     // link: link
//   });
// });
// console.log(headlines);
// });

axios.get("https://www.newsobserver.com/").then(response => {

const $ = cheerio.load(response.data);

var articles = [];

// scrape news articles
$("h3").each((i, element) => {
const title = $(element).text();
// const time = $(element).parent().parent().attr("time").text();
const link = $(element).children().attr("href");

// push returned articles in the an array
articles.push({
    title: title,
    link: link,
    // time: time
  });
});

// console log articles to view
console.log(articles[0]);

// create placeholder html elements for the article data
  let articleDiv = $("<div>")
  let articleTitle = $("<p>")
  let articleSumm = $("<p>")
  let articleURL = $("<p>")
  let blankRow = $("<hr>")

  // loop through articlces array to append a new div containing each article, title, summary, url
  for(var i = 0; i < 5; i++) {
    articleTitle.html = articles[0].title;
    // articleSumm.html = articles[0].summary;
    articleURL.html = articles[0].link
    articleDiv.append(articleTitle, articleSumm, articleURL, blankRow)
    $("#articles").append(articleDiv);

  }

});

