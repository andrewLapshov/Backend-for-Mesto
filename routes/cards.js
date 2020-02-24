const cards = require('express').Router();
const {
  cardRequestCheck,
  cardIdRequestCheck,
} = require('../modules/validations');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', cardRequestCheck, createCard);
cards.delete('/:cardId', cardIdRequestCheck, deleteCard);
cards.put('/:cardId/likes', cardIdRequestCheck, likeCard);
cards.delete('/:cardId/likes', cardIdRequestCheck, dislikeCard);

module.exports = cards;
