const router = require('express').Router();
const users = require('./users');
const cards = require('./cards');

router.use('/users', users);
router.use('/cards', cards);
router.use((req, res, next) =>
  next({ statusCode: 404, message: 'Запрашиваемый ресурс не найден' }),
);

module.exports = router;
