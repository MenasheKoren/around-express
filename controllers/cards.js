const Card = require('../models/card');

function getCards(req, res) {
  Card.find()
    .orFail()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
}

function createCard(req, res) {
  const { owner, name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Error (createCard): ${err}` }));
}

function deleteCardById(req, res) {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Error (deleteCardById): ${err}` }));
}

module.exports = { getCards, createCard, deleteCardById };
