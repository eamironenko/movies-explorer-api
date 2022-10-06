const validator = require('validator');
const { isValidObjectId } = require('mongoose');
const Validation = require('../errors/Validation');

module.exports.linkErr = (value) => {
  if (!validator.isURL(value)) {
    throw new Validation('Некорректный адрес ссылки');
  } else {
    return value;
  }
};

module.exports.idErr = (value) => {
  if (!isValidObjectId(value)) {
    throw new Validation('Переданы некорректные данные');
  } else {
    return value;
  }
};
