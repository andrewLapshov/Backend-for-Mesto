const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const LoginFailedError = require('../errors/LoginFailedError');

module.exports.auth = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new LoginFailedError('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new LoginFailedError('Авторизация не выполнена');
  }

  req.user = payload;

  next();
};
