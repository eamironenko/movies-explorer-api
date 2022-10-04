const Movie = require('../models/movies');
const NotFoundPage = require('../errors/NotFoundPage');
const DeleteErr = require('../errors/DeleteErr');
const Validation = require('../errors/Validation');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'Validation') {
        return next(new Validation(err.message));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundPage('Фильм не найден');
      }
      const movieOwner = movie.owner.toString();
      if (movieOwner !== req.user._id) {
        throw new DeleteErr('Фильм нельзя удалить');
      }
      return Movie.findByIdAndRemove(req.params.id)
        .then((movieDel) => {
          res.send({ movieDel });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Validation('Переданы некорректные данные'));
      }
      return next(err);
    });
};
