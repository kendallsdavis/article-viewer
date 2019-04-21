//-------------------------------------SET UP REQUIREMENTS, EXPRESS, HANDLEBARS, ROUTES---------------------------
const express = require('express')
const hbars = require('express-handlebars')
const mongoose = require('mongoose')
const logger = require("morgan");
const models = require('./models')
const axios = require("axios");
const cheerio = require("cheerio");
const app = express()
const PORT = process.env.PORT || 3000
// Require all models
const db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads
app.use(express.json());
// Serve images, CSS files, and JavaScript files in a directory named public. Can now load files located in public directory
app.use(express.static("public"));
// integrates handlebars into app
app.engine("handlebars", hbars({ defaultLayout: "main" }));
// use the handlebar view engine
app.set("view engine", "handlebars");
// load the routes module into the app
// app.use(require('./routes/routes')(db))

require("./routes/routes")
// ------------------------------SET UP CONNECTION TO MONGOSE NEWSSCRAPER DATABASE--------------------------------------------------
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

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

// ----------------------------SEND SCRAPE RESULTS TO PAGE---------------------------------------------------
// // Loads results onto the page
// function getResults() {
//   // Empty any results currently on the page
//   $("#results").empty();
//   // Grab all of the current notes
//   $.getJSON("/all", (data) => {
//     // For each note...
//     for (let i = 0; i < data.length; i++) {
//       // ...populate #results with a p-tag that includes the note's title and object id
//       $("#results").prepend("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
//         data[i]._id + ">" + data[i].title + "</span><span class=delete>X</span></p>");
//     }
//   });
// }

// getResults();



// ---------------------- SET APP LISTENER -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});