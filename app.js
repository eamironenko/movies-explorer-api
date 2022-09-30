const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const { requestLogger, errorLogger} = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const NotFoundPage = require('./errors/NotFoundPage');

//перед точками входа
app.use(requestLogger);

//роутеры, которые не требуют авторизации


//роутеры, которые требуют авторизации


app.use('*', auth, () => {
  throw new NotFoundPage('Страница не найдена');
});


//логгер ошибок
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // сервер на 3000 порту
});
