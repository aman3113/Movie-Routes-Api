const express = require('express')
const carControllers = require('../controllers/carControllers')

const carRouter = express.Router()
const { addMaker,
  addCar,
  addCarWithMaker,
  getCar,
  getAllCars,
updateCar} = carControllers

//get all cars
carRouter.get('/', async(req, res)=>{
  try{
    const cars = await getAllCars()
    res.json(cars)
  }catch(error){
    res.status(500).json({message: "Failed to fetch cars", error})
  }
})

//get car by name
carRouter.get('/:modelName', async(req, res)=>{
  try{
    const car = await getCar(req.params.modelName)
    res.json(car)
  }catch(error){
    res.status(500).json({message:"Car not found", error})
  }
})

carRouter.post('/', async(req, res)=>{
  try{
    const car = await addCar(req.body)
    res.json(car)
  }catch(error){
    res.status(500).json({message:"Failed to add car", error})
  }
})


//add maker
carRouter.post('/maker', async(req, res)=>{
  try{
    const maker = await addMaker(req.body)
    res.json(maker)
  }catch(error){
    res.status(500).json({message:"Failed to add maker", error})
  }
})

// add car with maker
carRouter.post('/car-maker', async(req, res)=>{
  try{
    const car = await addCarWithMaker(req.body)
    res.json(car)
  }catch(error){
    res.status(500).json({message:"Failed to add car", error})
  }
})

// update a car
carRouter.post('/:carId', async(req, res)=>{
  const id = req.params.carId
  const updatedData = req.body
  try{
    const car = await updateCar(id, updatedData)
    res.json(car)
  }catch(error){
    res.status(500).json({message:"Car not found", error})
  }
})
//add car





module.exports = carRouter