require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const auth = require('./middlewares/auth');
const users = require('./routes/users');
const movies = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundPage = require('./errors/NotFoundPage');

const options = {
  origin: [
    'http://localhost:3000',
    'https://mironenko.students.nomoredomains.sbs',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
app.use('*', cors(options));
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// перед точками входа
app.use(requestLogger);

// роутеры, которые не требуют авторизации
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

// роутеры, которые требуют авторизации
app.use(users);
app.use(movies);
app.use('*', auth, () => {
  throw new NotFoundPage('Страница не найдена');
});

// блок ошибок
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err; // если у ошибки нет статуса, выставляем 500
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 // проверяем статус и выставляем сообщение в зависимости от него
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // сервер на 3000 порту
});
