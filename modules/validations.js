const { celebrate, Joi } = require('celebrate');

const signupRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string()
      .required()
      .uri(),
    about: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8),
  }),
});

const loginRequestCheck = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(8),
  }),
});

const authRequestCheck = celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
});

const getUserRequestCheck = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .alphanum()
      .length(24),
  }),
});

const updateUserInfoRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    about: Joi.string().required(),
  }),
});

const updateUserAvatarRequestCheck = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .uri(),
  }),
});

const cardRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .required()
      .uri(),
  }),
});

const cardIdRequestCheck = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .alphanum()
      .length(24),
  }),
});

module.exports = {
  signupRequestCheck,
  loginRequestCheck,
  authRequestCheck,
  getUserRequestCheck,
  updateUserInfoRequestCheck,
  updateUserAvatarRequestCheck,
  cardRequestCheck,
  cardIdRequestCheck,
};
