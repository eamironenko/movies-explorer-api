require('dotenv').config();

const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

const secretKey = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb',
};

module.exports = secretKey;
