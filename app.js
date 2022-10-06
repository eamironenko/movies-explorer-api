require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverErr = require('./middlewares/serverErr');
const { MONGO_URL } = require('./utils/secretKey');
const limiter = require('./middlewares/limiter');

const options = {
  origin: [
    'http://localhost:3000',
    'https://api.mironenko.diploma.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
const { PORT = 3000 } = process.env;
mongoose.connect(MONGO_URL);
app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(serverErr);

app.listen(PORT);
