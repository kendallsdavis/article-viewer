const router = require('express').Router()
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../models')
const express = require('express')

const app = express();

module.exports = (app) => {

//------------------------------- GET ROUTE FOR SCSRAPING NYT WEBSITE-------------------------------------------------
// // when the /scrape page is visited, perform an axios call against NYT.
//   // with the response data, run the response through cheerio
app.get('/', (req, res)=>{
    axios.get("https://www.nytimes.com").then(response =>{
      const $ = cheerio.load(response.data)
       // look at the div .css-6p6lnl elements
       // for each element establish a title, a link and a URL
      $("div .css-6p6lnl").each((i, element) =>{
        const result = {}
        result.title = $(element).children("a").children("div").children("h2").text()
        result.link = $(element).children("a").attr("href")
        // TODO - figure out why summary not populating
        result.summary = $(element).children("a").children("div .css-1ez5fsm").children("ul .css-1rrs2s3").text()
    
   // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
      .then(dbArticle => {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(err => {
        // If an error occurred, log it
        console.log(err);
      });
  });

    // after scraping data, send "Information Received" message
    res.send("Information Received")
    console.log("Scrape Complete")
  })
});

// ------------------------------RETRIEVE RESULTS FROM MONGO AND RENDER ON /ALL-----------------------------------------------
// Retrieve results from mongo
app.get("/all", (req, res) => {
  // Find all notes in the notes collection
  db.Article.find({}, (error, found) => {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send json of the notes back to user
      // This will fire off the success function of the ajax request
      res.json(found);
    }
  });
});




// Route for getting all Articles from the db
app.get("/articles", (req, res) => {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(dbArticle => {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(err => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


}



//   // when the /saved route is visited...
//   router.get('/saved', (req, res)=>{

//   })
//   // when the /saved route is visited...
//   router.post('/saved', (req, res)=>{
    
//   })
//   // when the /comment route is visited...
//   router.get('/comment', (req, res)=>{

//   })
//   // when the /comment route is visited...
//   router.post('/comment', (req, res)=>{

//   })

//   return router  
// };