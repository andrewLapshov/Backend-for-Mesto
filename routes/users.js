const users = require('express').Router();
const {
  getUser,
  createUser,
  getAllUsers,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

users.get('/:id', getUser);
users.post('/', createUser);
users.get('/', getAllUsers);
users.patch('/me', updateUserInfo);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
