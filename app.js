const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes/index');
const {
  signupRequestCheck,
  loginRequestCheck,
  authRequestCheck,
} = require('./modules/validations');
const { auth } = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorhandler');
const { PORT } = require('./constants/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', loginRequestCheck, login);
app.post('/signup', signupRequestCheck, createUser);

app.use(cookieParser());
app.use(authRequestCheck, auth);

app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
