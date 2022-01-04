const Card = require('../models/card');

function getCards(req, res) {
  console.log('123');
  Card.find()
    .orFail()
    .then((data) => {
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

function createCard(req, res) {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Error (createCard): ${err}` }));
}

module.exports = { getCards, createCard };
