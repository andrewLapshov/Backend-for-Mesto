const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const cardValidator = [
  validate({
    validator: 'isURL',
    message: 'Неверный формат ссылки',
  }),
];

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: cardValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
