const users = require('express').Router();
const {
  getUser,
  getAllUsers,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const {
  getUserRequestCheck,
  updateUserInfoRequestCheck,
  updateUserAvatarRequestCheck,
} = require('../modules/validations');

users.get('/:id', getUserRequestCheck, getUser);
users.get('/', getAllUsers);
users.patch('/me', updateUserInfoRequestCheck, updateUserInfo);
users.patch('/me/avatar', updateUserAvatarRequestCheck, updateUserAvatar);

module.exports = users;
