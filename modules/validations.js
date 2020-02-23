const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const signupRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .required()
      .uri(),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
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
  cookies: Joi.object()
    .keys({
      jwt: Joi.string().required(),
    })
    .unknown(),
});

const getUserRequestCheck = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
});

const updateUserInfoRequestCheck = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
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
    cardId: Joi.objectId().required(),
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
