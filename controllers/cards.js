const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NoPermissions = require('../errors/NoPermissions');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then(card => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(card => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findOne({ _id: cardId })
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then(cardInfo => {
      if (String(cardInfo.owner) !== req.user._id) {
        throw new NoPermissions('Нет прав на удаление чужой карточки');
      }
      Card.findByIdAndRemove(cardId)
        .then(card => res.status(200).send({ data: card }))
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Неверный запрос');
    })
    .then(card => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Неверный запрос');
    })
    .then(card => res.status(200).send({ data: card }))
    .catch(next);
};
