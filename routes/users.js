const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { getUserId, updateUser } = require('../controllers/users');

router.get('/users/me', auth, getUserId);
router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required,
    email: Joi.string().email().required,
}),
}), updateUser);

module.exports = router;