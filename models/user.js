const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const userValidator = [
  validate({
    validator: 'isURL',
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
    validate: userValidator,
  },
});

module.exports = mongoose.model('user', userSchema);
