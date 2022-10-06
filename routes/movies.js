const router = require('express').Router();
const { validateCreateMovie, validateMovieId } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies/', auth, getMovies);
router.post('/movies/', auth, validateCreateMovie, createMovie);
router.delete('/movies/:id', auth, validateMovieId, deleteMovie);

module.exports = router;
