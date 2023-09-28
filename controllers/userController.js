const mongoose = require("mongoose")
const User = mongoose.model("User")

// signup
async function signup(userDetails){
  try {
    const user = new User(userDetails)
    const newUser = await user.save()
    return newUser
  } catch (error) {
    throw error
  }
}

// login
async function login(userDetails){
  const {email, password} = userDetails
  try {
    const user = await User.findOne({email})
    if(!user){
      throw new Error("User not found")
    }
    
    if(user.password === password){
      return user
    }else{
      throw new Error("Incorrect Password")
    }
    
  } catch (error) {
    throw error
  }
}

// update password

async function updatePassword(userDetails){

  try {
  const {email, password, newPassword} = userDetails
    const user = await User.findOne({email})
    if(!user){
      throw new Error("User not found")
    }
    if(user.password === password){
      user.password = newPassword  
    const newUser = await user.save()
      return newUser
    }else{
      throw new Error("Incorrect Password")
    }
  } catch (error) {
    throw error
  }
}

// update profile Pic

async function updateProfilePic(email, newProfileUrl){
  try {
    const user = await User.findOne({email})
    if(!user){
      throw new Error("User not found")
    }
    
    user.profilePicture = newProfileUrl
    const newUser = await user.save()
    return newUser
  } catch (error) {
    throw error
  }
}

// update contact details
async function updateContactDetails(email, updatedDetails){
  try {
    let user = await User.findOne({email})
    if(!user){
      throw new Error("User not found")
    }
    
    Object.assign(user,updatedDetails)
    const newUser = await user.save()
    return newUser
  } catch (error) {
    throw error
  }
}

//find by phone number
async function findUserByPhoneNumber(phoneNumber) {
  try {
    const userByPhoneNumber = await User.findOne({ phoneNumber })
    if (userByPhoneNumber) {
      return userByPhoneNumber
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    throw error
  }
}


module.exports = {
  signup,
  login,
  updatePassword,
  updateContactDetails,
  updateProfilePic,
  findUserByPhoneNumber
}