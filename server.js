

//-------------------------------------SET UP REQUIREMENTS, EXPRESS, HANDLEBARS, ROUTES---------------------------
const express = require('express')
const hbars = require('express-handlebars')
const mongoose = require('mongoose')
const logger = require("morgan");
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
require("./routes/routes")(app);
// load the app script
require("./public/assets/js/app.js")
// ------------------------------SET UP CONNECTION TO MONGOSE NEWSSCRAPER DATABASE--------------------------------------------------
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });


// ---------------------- SET APP LISTENER -----------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on: localhost:3000`);
});
// });  