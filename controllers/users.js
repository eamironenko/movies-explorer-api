const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../utils/secretKey');

const Validation = require('../errors/Validation');
const NotFoundPage = require('../errors/NotFoundPage');
const ConflictErr = require('../errors/ConflictErr');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '8d' },
      );
      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        throw new NotFoundPage('Пользователь не найден');
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'Validation') {
        next(new Validation('Переды некорректные данные пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictErr('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        throw new NotFoundPage('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'Validation') {
        return next(new Validation(err.message));
      }
      return next(err);
    });
};
