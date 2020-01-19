const users = require('express').Router();
const usersDB = require('../data/users');

let user = [];

const doesUserExists = (req, res, next) => {
  user = usersDB.filter(item => {
    return item._id === req.params.id;
  });

  if (user.length === 0) {
    res.status(404);
    res.send({ message: 'Нет пользователя с таким id' });
    return;
  }

  next();
};

const sendUser = (req, res, next) => {
  res.send(user);
};

users.get('/:id', doesUserExists);
users.get('/:id', sendUser);

users.get('/', (req, res) => {
  res.send(usersDB);
});

module.exports = users;
