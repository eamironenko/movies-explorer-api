const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const { requestLogger, errorLogger} = require('./middlewares/logger');
app.use(requestLogger);




app.use(errorLogger);
//другие ошибки

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // сервер на 3000 порту
});
