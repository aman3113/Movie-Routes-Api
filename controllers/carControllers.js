const mongoose = require("mongoose")
const Car = mongoose.model("Car")
const Maker = mongoose.model("Maker")

// add a maker
async function addMaker(makerData){
  try{
  const maker = new Maker(makerData)
    await maker.save()
    return maker
  }catch(err){
    throw err
  }
}

// add a car
async function addCar(carData){
  try{
    const maker = await Maker.findOne({name:carData.maker})

    if(!maker){
      throw new Error("No maker with this name found. ")
    }
    let newCarData = {...carData, maker: maker._id}
     const car = new Car(newCarData)
    await car.save()
    return car
    
  }catch(error){
    throw error
  }
}

// add a car with maker
async function addCarWithMaker({makerData, carData}){
  if(!makerData || !carData){
    throw new Error("Car and maker Details are required.")
  }
  try {
    const maker = new Maker(makerData)
    await maker.save()

    let newCarData = {...carData, maker: maker._id}

    const car = new Car(newCarData)
    await car.save()
    return car
  } catch (error) {
    throw error
  }
}

// get car by name
async function getCar(modelName){
  console.log(modelName)
  try {
    const carWithMaker = await Car.find({model:modelName}).populate("maker")
    if(!carWithMaker){
      throw new Error ("Car not found.")
    }
    return carWithMaker
  } catch (error) {
    throw error
  }
}

// get all cars
async function getAllCars(){
  try {
    const cars = await Car.find().populate("maker")
    return cars
  } catch (error) {
    throw error
  }
}

//update car
async function updateCar(id, updatedData){
  try{
    const updatedCar = await Car.findByIdAndUpdate(id,{$set:updatedData}, {new:true})
  
  if(!updatedCar){
    throw new Error("Movie not found")
  }

  return updatedCar
}catch(err){
  throw err
}
}

module.exports = {
  addMaker,
  addCar,
  addCarWithMaker,
  getCar,
  getAllCars,
  updateCar
}