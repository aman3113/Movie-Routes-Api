const express = require('express')
const movieControllers = require('../controllers/movieControllers')
const movieRouter = express.Router()

const { addMovie, findAllMovies, findMovie, readMoviesByActor, readMoviesByDirector, readMoviesByGenre, updateMovie, deleteMovieById, readMoviesSortedByRating, readMoviesSortedByYear, addReviewToMovie, getMovieReviews } = movieControllers

// sort movie by rating
movieRouter.get('/ratings', async (req, res) => {
  try {
    console.log("route found")
    const movies = await readMoviesSortedByRating();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error });
  }
});

// sort by release year
movieRouter.get('/releaseYear', async (req, res) => {
  try {
    const movies = await readMoviesSortedByYear();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error });
  }
});


// get all movies
movieRouter.get('/', async (req, res) => {
  try {
    const allMovies = await findAllMovies()
    res.json(allMovies)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
})

// add a movie
movieRouter.post('/', async (req, res) => {
  try {
    console.log("reached here")
    const savedMovie = await addMovie(req.body)
    res.status(201).json({ message: "movie added", movie: savedMovie })

  } catch (error) {
    resp.status(400).json({ error })
  }
})

// get particular movies by title
movieRouter.get('/:title', async (req, res) => {
  const movieName = req.params.title
  try {
    const movie = await findMovie(movieName)
    res.json(movie)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
})

// get movie reviews
movieRouter.get('/:movieId/reviews', async (req, res) => {
  const id = req.params.movieId
  try {
    const reviews = await getMovieReviews(id)
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
})

// get particular movies by actor name
movieRouter.get('/actor/:actorName', async (req, res) => {
  const { actorName } = req.params
  try {
    const movies = await readMoviesByActor(actorName)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies', message: error });
  }
})


// get movie by director name
movieRouter.get('/director/:directorName', async (req, res) => {
  const { directorName } = req.params
  try {
    const movies = await readMoviesByDirector(directorName)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies', message: error });
  }
})

// get movie by genre name
movieRouter.get('/genre/:genreName', async (req, res) => {
  const { genreName } = req.params
  try {
    const movies = await readMoviesByGenre(genreName)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies', message: error });
  }
})

// update a movie 
movieRouter.post('/:movieId', async (req, res) => {
  const { movieId } = req.params
  const updatedData = req.body
  try {
    if (!updatedData) {
      return res.status(400).json({ error: 'Request body is empty or missing' });
    }
    const updatedMovie = await updateMovie(movieId, updatedData)
    res.status(201).json({ message: "movie updated", movie: updatedMovie })

  } catch (error) {
    resp.status(400).json({ error })
  }
})

//delete a movie
movieRouter.delete('/:movieId', async (req, res) => {
  const { movieId } = req.params
  try {
    const deletedMovie = await deleteMovieById(movieId)
    res.status(201).json({ message: "movie deleted", movie: deletedMovie })
  } catch (error) {
    resp.status(400).json({ error })
  }
})

// add a review
movieRouter.post('/:movieId/reviews', async (req, res) => {
  const { movieId } = req.params
  const { userId } = req.query
  const { reviewText } = req.body
  try {
    if (!userId) {
      res.status(401).json({ error: "userId should be passed as query." })
    }
    if (!reviewText) {
      res.status(401).json({ error: "review text should be passed in body." })
    }
    const updatedMovie = await addReviewToMovie(movieId, userId, reviewText)
    res.status(201).json({ message: "review added", movie: updatedMovie })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch movies', error });

  }
})


module.exports = movieRouter