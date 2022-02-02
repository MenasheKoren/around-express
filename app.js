require('dotenv').config({ debug: true });

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const users = require('./routes/users');

const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const { createCard } = require('./controllers/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, users);
app.use('/cards', auth, cards);

app.post('/cards', auth, createCard);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use((err, req, res) => {
  res.status(500).send({ message: 'An error has occurred on the server' });
});

module.exports = app;
