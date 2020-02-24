/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');
const LoginFailedError = require('../errors/LoginFailedError');

const urlValidator = [
  validate({
    validator: 'isURL',
    message: 'Неверный формат ссылки',
  }),
];

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Неверный формат ссылки',
  }),
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    uniqueCaseInsensitive: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.plugin(
  uniqueValidator,
  new LoginFailedError('Пользователь с указанной почтой уже существует'),
);

userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(
          new LoginFailedError('Неправильные почта или пароль'),
        );
      }

      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(
            new LoginFailedError('Неправильные почта или пароль'),
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
