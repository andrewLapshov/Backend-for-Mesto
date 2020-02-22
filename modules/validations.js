const { celebrate, Joi } = require('celebrate');

const userRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string().required(),
    about: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8),
  }),
});

const cardRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string().required(),
  }),
});

module.exports = { userRequestCheck, cardRequestCheck };
