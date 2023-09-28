const mongoose = require("mongoose")
const fs = require("fs")

const Movie = mongoose.model("Movie")

// add new movie
async function addMovie(movieData){
  try {
    const newMovie = new Movie(movieData)
    await newMovie.save()
    return newMovie
  } catch (error) {
    throw error
  }
}


// find movie by title
async function findMovie(movieName) {
  try {
    const movie = await Movie.findOne({ title: movieName }).populate("reviews.user");
    
    if (!movie) {
      throw new Error("Movie not found");
    }
    
    return movie;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to find movie: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}



// find all movies
async function findAllMovies(){
  try{
    const movies = await Movie.find()
    return movies
  }catch(err){
    throw err
  }
}

// read movies for a director
async function readMoviesByDirector(directorName){
  try{
    const movies = await Movie.find({director:directorName})
     if (!movies) {
      throw new Error("Movie not found");
    }
    return movies
  }catch(err){
    throw err
  }
}

//read by genre
async function readMoviesByGenre(movieGenre){
  try{
    const movies = await Movie.find({genre:{$in:[movieGenre]}})
    if (!movies) {
      throw new Error("Movie not found");
    }
    return movies
  }catch(err){
    throw err
  }
}

// read movies for a year 
async function readMoviesByYear(year){
  try{
    const movies = await Movie.find({releaseYear:year})
    console.log(`${year} movies`, movies)
  }catch(err){
    console.log(err)
  }
}

//read movies by actor
async function readMoviesByActor(actorName){
  try{
    const movies = await Movie.find({actors:{$in:[actorName]}})

     if (!movies) {
      throw new Error("Movie not found");
    }
    return movies
  }catch(err){
    throw err
  }
}

// update a movie by Id

async function updateMovie(id, updatedData){
  try{
    const updatedMovie = await Movie.findByIdAndUpdate(id,{$set:updatedData}, {new:true})
  
  if(!updatedMovie){
    throw new Error("Movie not found")
  }

  return updatedMovie
}catch(err){
  throw err
}
}

// updateMovie("64f2d663d3c3cfd630c7a474",{releaseYear:2017})

// delete movie by id
async function deleteMovieById(movieId){
  try{
    const deletedMovie = await Movie.findByIdAndDelete(movieId)
  
  if(!deletedMovie){
    throw new Error("movie not found")
  }

  return deletedMovie
}catch(err){
  throw err
}
}

// delete movie by title
async function deleteMovieByTitle(movieTitle){
  try{
    const deletedMovie = await Movie.deleteOne({title:movieTitle})
  
  if(!deletedMovie){
    return console.log("movie not found")
  }

  console.log("deleted movie", deletedMovie)
}catch(err){
  console.log(err)
}
}


// read all movies sorted by rating

async function readMoviesSortedByRating(){
  try{
  const sortedMovies = await Movie.find().sort({rating:-1})
  return sortedMovies
}catch(err){
  throw err
}
}

// read movies sorted by year
async function readMoviesSortedByYear(){
  try{
    const sortedMovies = await Movie.find().sort({releaseYear:-1})
  return sortedMovies
}catch(err){
  throw err
}
}

// add review
async function addReviewToMovie(movieId, userId, text){
  try {
    const movie = await Movie.findById(movieId)
    if(!movie){
      throw new Error("no movie with this id exists.")
    }
    movie.reviews.push({user:userId,text})
     await movie.save()
    return movie

  } catch (error) {
    throw error
  }
}

// get reviews of a movie
async function getMovieReviews(movieId) {
  try {
    const movie = await Movie.findById(movieId).populate("reviews.user");
    
    if (!movie) {
      throw new Error("Movie not found");
    }
    
    return movie.reviews;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to find movie: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}


module.exports = {
  readMoviesByDirector, findAllMovies, findMovie, addMovie, readMoviesSortedByYear, readMoviesSortedByRating,deleteMovieByTitle,deleteMovieById,updateMovie,readMoviesByActor,readMoviesByYear,readMoviesByGenre, addReviewToMovie, getMovieReviews
}