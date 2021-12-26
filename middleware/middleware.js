const middleware = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;
// const cardsPath = require('../routes/cards')

function readFileData(req, res, routerFileSelector) {
  const dataPath = path.join(__dirname, '..', 'data', '${routerFileSelector}.json');
  fsPromises
    .readFile(dataPath, { encoding: 'utf8' })
    .then((data) => {
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

module.exports = {
  readFileCards,
}
