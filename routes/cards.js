const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

function readFileCards(req, res) {
  const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');
  fsPromises
    .readFile(cardsPath, { encoding: 'utf8' })
    .then((data) => {
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}
router.get('/cards', readFileCards);

module.exports = router;
