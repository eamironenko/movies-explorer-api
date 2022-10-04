const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const AuthErr = require('../errors/AuthErr');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'пользователь с таким email уже зарегистрирован'],
    validate: [validator.isEmail, 'неправильно введен email'],
  },
  password: {
    type: String,
    required: [true, 'обязательное поле для заполнения'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthErr('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthErr('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
