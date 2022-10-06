const serverErr = ((err, req, res, next) => {
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

module.exports = serverErr;
