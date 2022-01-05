const Card = require('../models/card');
const {
  onFailNotFoundErrorHandler,
  getCardsErrorHandlerSelector,
  getCardByIdErrorHandlerSelector,
} = require('../errors/not-found-error');

function getCards(req, res) {
  Card.find()
    .orFail(() => {
      onFailNotFoundErrorHandler(getCardsErrorHandlerSelector);
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(err.statusCode).send({
      message: `(getCards)...${err}`,
    }));
}

function createCard(req, res) {
  const { owner, name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Error (createCard): ${err}` }));
}

function deleteCardById(req, res) {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      onFailNotFoundErrorHandler(getCardByIdErrorHandlerSelector);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(err.statusCode).send({
      message: `(deleteCardById)...${err}`,
    }));
}

module.exports = { getCards, createCard, deleteCardById };
