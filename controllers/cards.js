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
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(getCards)...${err}`,
        });
      } else {
        res
          .status(500)
          .send({
            message: '(getCards)...: An error has occurred on the server',
          });
      }
    });
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
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(err.statusCode).send({
          message: `(deleteCardById)...${err}`,
        });
      } else {
        res
          .status(500)
          .send({
            message: '(deleteCardById)...: An error has occurred on the server',
          });
      }
    });
}

module.exports = { getCards, createCard, deleteCardById };
