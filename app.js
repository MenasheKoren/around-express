const express = require('express');

const users = require('./routes/users');

const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, (err, res) => {
  if (err) {
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
  console.log(`App listening on port ${PORT}`);
});

app.use('/', users);
app.use('/', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use((err, req, res) => {
  res.status(500).send({ message: 'An error has occurred on the server' });
});
