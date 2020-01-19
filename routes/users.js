const users = require('express').Router();
const usersDB = require('../data/users');

users.get('/:id', (req, res) => {
  const user = usersDB.find(item => {
    return item._id === req.params.id;
  });

  if (user) {
    res.send(user);
  } else {
    res.status(404);
    res.send({ message: 'Нет пользователя с таким id' });
  }
});

users.get('/', (req, res) => {
  res.send(usersDB);
});

module.exports = users;
