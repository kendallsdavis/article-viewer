// reuire express, handlebars, mongoose, models
const express = require('express')
const hbars = require('express-handlebars')
const mongoose = require('mongoose')
// const db = require('./models')

// set const for express()
const app = express()
// establish port for server
const PORT = process.env.PORT || 3000

// express setup
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", hbars({ defaultLayout: "index" }));
app.set("view engine", "handlebars");

// turn on express listener
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});