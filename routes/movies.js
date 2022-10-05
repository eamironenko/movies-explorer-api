const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { isValidObjectId } = require('mongoose');
const auth = require('../middlewares/auth');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const Validation = require('../errors/Validation');

const linkErr = (value) => {
  if (!validator.isURL(value)) {
    throw new Validation('Некорректный адрес ссылки');
  } else {
    return value;
  }
};

const idErr = (value) => {
  if (!isValidObjectId(value)) {
    throw new Validation('Переданы некорректные данные');
  } else {
    return value;
  }
};

router.get('/movies/', auth, getMovies);
router.post('/movies/', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(linkErr, 'custom validation'),
    trailerLink: Joi.string().required().custom(linkErr, 'custom validation'),
    thumbnail: Joi.string().required().custom(linkErr, 'custom validation'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().custom(idErr, 'custom validation'),
  }),
}), deleteMovie);

module.exports = router;
