require('./db')
require("./models/movie")
require("./models/user")
require("./models/car")
require("./models/maker")

const express = require('express')
const app = express()
const movieRouter = require('./Routes/movieRoutes')
const userRouter = require('./Routes/userRoutes')
const carRouter = require('./Routes/carRoutes')
const cors = require('cors')
const helmet = require('helmet')

app.use(
  cors()
)

app.use(helmet())
app.use(express.json())
// routes
app.use('/api/v1/movies',movieRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/cars',carRouter)

app.get('/',(req,res)=>{
  res.send("Working fine")
})

// middlewares
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// port config
app.listen(3000, ()=>{
  console.log("Server running on 3000")
})








