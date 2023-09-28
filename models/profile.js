const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
  profilePicURL: String,
  profileModeURL:String,
  name:String,
  userName:String,
  About:String,
  followers:Number,
  following:Number,
  company:String,
  location:String,
  websiteURL:String,
  
})