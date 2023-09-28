const mongoose = require('mongoose')

const makerSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  logo:{
    type: String,
    required: true
  },
  tagline:String
})

const Maker = mongoose.model('Maker',makerSchema)
module.exports = Maker