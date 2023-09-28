const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  releaseYear:{
    type:Number,
    required:true
  },
  genre:[{
    type: String,
    enum:['Action', 'Drama', 'Comedy',"Thriller",'Romance','Fantasy',"Sports","Musical"]
  }],
  director:{
    type:String,
    required: true
  },
  actors:[String],
  language:{
    type:String,
    required: true
  },
  country:{
    type:String,
    default: "India"
  },
  rating:{
    type:Number,
    min:0,
    max:10,
    default:0
  },
  reviews:[{
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    text: String
  }],
  plot: String,
  awards:String,
  postedURL:String,
  trailerURL:String
})

const Movie = mongoose.model("Movie",movieSchema)
module.exports = Movie