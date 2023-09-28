const express = require('express')
const userControllers = require('../controllers/userController')

const userRouter = express.Router()
const {signup, login, updatePassword, updateProfilePic, updateContactDetails, findUserByPhoneNumber} = userControllers
//sign up
userRouter.post('/signup', async(req, res)=>{
   try {
    const savedUser = await signup(req.body)
    res.json(savedUser)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user account', error })
  }
})

userRouter.post('/login', async (req, res) => {
  try {
    const user = await login(req.body)
    res.json(user)
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error })
  }
})

userRouter.post('/password', async (req, res) => {
  try {
    const updatedUser = await updatePassword(req.body)
    res.json(updatedUser)
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error })
  }
})

userRouter.post('/profile', async (req, res) => {
  try {
    const { email, newProfilePictureUrl } = req.body
    const updatedUser = await updateProfilePic(email, newProfilePictureUrl)
    res.json(updatedUser)
  } catch (error) {
    res.status(404).json({ message: 'User not found', error })
  }
})

userRouter.post('/contact/:email', async (req, res) => {
  try {
    const email = req.params.email
    const updatedContactDetails = req.body
    const updatedUser = await updateContactDetails(email, updatedContactDetails)
    res.json(updatedUser)
  } catch (error) {
    res.status(404).json({ message: 'User not found', error })
  }
})

userRouter.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber
    const user = await findUserByPhoneNumber(Number(phoneNumber))
      res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error })
  }
})

module.exports = userRouter