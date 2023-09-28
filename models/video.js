const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
  backgroundCoverURL: String,
  channelLogoURL: String,
  videoURL: String,
  videoTitle:String,
  channelName: String,
  views:Number,
  videoLength:Number,
  postedDate: Date
})

const Video = mongoose.model("Video",videoSchema)

module.exports = Video