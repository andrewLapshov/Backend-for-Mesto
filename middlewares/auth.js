const jwt = require('jsonwebtoken');
const LoginFailedError = require('../errors/LoginFailedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new LoginFailedError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    throw new LoginFailedError('Авторизация не выполнена');
  }

  req.user = payload;

  next();
};
