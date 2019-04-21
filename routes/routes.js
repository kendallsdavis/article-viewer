// const router = require('express').Router()
// const axios = require('axios')
// const cheerio = require('cheerio')
// const db = require('../models')
// const express = require('express')

// const app = express();

// module.exports = (app) => {

// // when the /scrape page is visited, perform an axios call against NYT.
//   // with the response data, run the response through cheerio
//   app.get('/scrape', (req, res)=>{
//     axios.get("https://www.nytimes.com").then(response =>{
//       const $ = cheerio.load(response.data)
//       // look at the div .css-6p6lnl elements
//       // for each element establish a title, a link and a URL
//       // TODO - look at this hierarchy in the console
//       $("div .css-6p6lnl").each((i, element) =>{
//         const result = {}
//         results.title = $(element).children("a").children("div").children("h2").text()
//         results.link = $(element).children("a").attr("href")
        
//         // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//       .then(dbArticle => {
//         // View the added result in the console
//         console.log(dbArticle);
//       })
//       .catch(err => {
//         // If an error occurred, log it
//         console.log(err);
//       });
//   });

//     // after scraping data, send "Information Received" message
//     res.send("Information Received")
//     console.log("Scrape Complete")
//   })
// });




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