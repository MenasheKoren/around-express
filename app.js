require('dotenv').config({ debug: true });

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const users = require('./routes/users');

const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middleware/auth');
const { createCard } = require('./controllers/cards');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, (err, res) => {
  if (err) {
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

// app.use(auth);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '61d497d3012853c437420687',
//   };
//
//   next();
// });

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.post('/cards', auth, createCard);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use((err, req, res) => {
  res.status(500).send({ message: 'An error has occurred on the server' });
});
