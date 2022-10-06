const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/AuthErr');
const { JWT_SECRET } = require('../utils/secretKey');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthErr('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // payload = jwt.verify(token, 'some-secret-key');
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthErr('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = auth;
