require('dotenv').config({ debug: true });

const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, (err, res) => {
    if (err) {
      res.status(500).send({ message: 'An error has occurred on the server' });
    }
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}
