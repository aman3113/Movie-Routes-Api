const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique: true
  },
  password: {
    type:String,
    required:true
  },
  profilePicture:String,
  username:String,
  nickName:String,
  phoneNumber: Number,
  address:String
},{
  timeStamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User