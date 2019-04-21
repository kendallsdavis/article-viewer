const mongoose = require("mongoose")
const Schema = mongoose.Schema

// create a mongoose schema for each article that will be saved to the database
const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
  }
})

const Article = mongoose.model("Article", articleSchema)

module.exports = Article