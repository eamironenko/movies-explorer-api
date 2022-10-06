const router = require('express').Router();

const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const { validateSignUp, validateSignIn } = require('../middlewares/validators');
const { login, createUser } = require('../controllers/users');
const NotFoundPage = require('../errors/NotFoundPage');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.use(users);
router.use(movies);
router.use('*', auth, () => {
  throw new NotFoundPage('Страница не найдена');
});

module.exports = router;
