const cards = require('express').Router();
const cardsDB = require('../data/cards');

cards.get('/', (req, res) => {
  res.send(cardsDB);
});

module.exports = cards;
